import {
  world,
  system,
  ItemStack,
  GameMode,
  EnchantmentTypes,
  BlockPermutation,
} from "@minecraft/server";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";

const DYNAMIC_PROPS = {
  ROLE: "werewolf:role",
  STATUS: "werewolf:status",
};

const GAME_ITEM_ID = "minecraft:ender_eye";
const GAME_ITEM_NAME = "§5§lCon Mắt Tà Thuật";

const GAME_SETTINGS = {
  INVITE_RADIUS: 2000,
  CLASSIC_MIN_PLAYERS: 4,
  HUNT_MODE_PLAYER_COUNT: 3,
  NIGHT_DURATION_SECONDS: 90,
  DAY_DISCUSSION_SECONDS: 180,
  VOTING_DURATION_SECONDS: 60,
  HUNT_ARENA_RADIUS: 150,
  HUNT_BEACON_COUNT: 3,
  HUNT_DAY_DURATION_SECONDS: 180,
  HUNT_NIGHT_DURATION_SECONDS: 120,
};

export const activeWerewolfGames = new Map();

function getGameForPlayer(player) {
  if (!player || !player.isValid) return null;
  for (const game of activeWerewolfGames.values()) {
    if (game.players.has(player.nameTag)) {
      return game;
    }
  }
  return null;
}

function broadcastToGame(gameState, message, sound) {
  for (const playerName of gameState.players.keys()) {
    const player = world.getPlayers({ name: playerName })[0];
    if (player) {
      player.sendMessage(message);
      if (sound) player.playSound(sound);
    }
  }
}

function broadcastToRole(gameState, role, message) {
  for (const [playerName, data] of gameState.players.entries()) {
    if (data.role === role && data.status === "alive") {
      const player = world.getPlayers({ name: playerName })[0];
      if (player) player.sendMessage(message);
    }
  }
}

function giveWerewolfItem(player) {
  const item = new ItemStack(GAME_ITEM_ID, 1);
  item.nameTag = GAME_ITEM_NAME;
  item.setLore([
    "§7Vật phẩm định mệnh, chứa đựng vai trò của bạn.",
    "§fChuột phải để mở giao diện chức năng.",
    "§8Vật phẩm hệ thống, sẽ bị thu hồi khi trò chơi kết thúc.",
  ]);
  const inventory = player.getComponent("inventory");
  if (inventory && inventory.container) {
    inventory.container.addItem(item);
  }
}

function revokeWerewolfItem(player) {
  try {
    const inventory = player.getComponent("inventory");
    if (!inventory || !inventory.container) return;
    
    for (let i = 0; i < inventory.container.size; i++) {
      const item = inventory.container.getItem(i);
      if (item?.typeId === GAME_ITEM_ID && item.nameTag === GAME_ITEM_NAME) {
        inventory.container.setItem(i, undefined);
        break;
      }
    }
    player.setDynamicProperty(DYNAMIC_PROPS.ROLE, undefined);
    player.setDynamicProperty(DYNAMIC_PROPS.STATUS, undefined);
  } catch (e) {
    console.warn(`Error revoking item from ${player.nameTag}:`, e);
  }
}

function eliminatePlayer(playerName, gameState, cause) {
  const playerData = gameState.players.get(playerName);
  if (!playerData || playerData.status === "dead") return;

  playerData.status = "dead";
  const player = world.getPlayers({ name: playerName })[0];

  if (player) {
    revokeWerewolfItem(player);
    if (gameState.gameType === "hunt") {
      broadcastToGame(gameState, `§c${playerName} đã bị hạ gục!`);
    } else {
      try {
        player.teleport(gameState.purgatoryPoint);
        player.addEffect("slowness", 20000000, {
          amplifier: 255,
          showParticles: false,
        });
        player.addEffect("jump_boost", 20000000, {
          amplifier: 128,
          showParticles: false,
        });
      } catch (e) {
        console.warn(`Error teleporting eliminated player ${playerName}:`, e);
      }
    }
  }

  if (gameState.gameType === "classic") {
    let causeMessage = "";
    switch (cause) {
      case "werewolf":
        causeMessage = `§c...nạn nhân của Ma Sói đêm qua.`;
        break;
      case "vote":
        causeMessage = `§e...đã bị làng biểu quyết treo cổ.`;
        break;
      case "hunter":
        causeMessage = `§4...bị Thợ Săn kéo theo xuống mồ!`;
        break;
      case "witch":
        causeMessage = `§5...đã uống phải một liều thuốc độc chết người.`;
        break;
      case "leave":
        causeMessage = "§7...đã rời bỏ trận đấu.";
        break;
    }

    broadcastToGame(
      gameState,
      `§c§lTHÔNG BÁO TỬ VONG\n§rNgười chơi §f${playerName} §cđã bị loại, ${causeMessage}`
    );
    system.runTimeout(() => {
      if (activeWerewolfGames.has(gameState.hostName)) {
        broadcastToGame(
          gameState,
          `§7Vai trò của họ là: §l${playerData.role.toUpperCase()}`
        );
      }
    }, 40);

    if (playerData.role === "Thợ Săn" && player) {
      system.run(() => {
        if (activeWerewolfGames.has(gameState.hostName)) {
          showHunterFinalShotForm(player, gameState);
        }
      });
    }
  }

  checkWinConditions(gameState);
}

export async function startWerewolfLobby(host) {
  if (getGameForPlayer(host)) {
    return host.sendMessage("§cBạn đã đang trong một ván đấu hoặc sảnh chờ!");
  }
  if (activeWerewolfGames.size > 0) {
    return host.sendMessage(
      "§cHiện đã có một ván Ma Sói khác đang diễn ra. Vui lòng chờ."
    );
  }

  const allPlayers = world.getAllPlayers();
  const nearbyPlayers = [];

  const Vector = {
    magnitude: (v) => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z),
    subtract: (v1, v2) => ({ x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z }),
  };

  for (const player of allPlayers) {
    if (player.nameTag === host.nameTag) continue;
    if (player.dimension.id !== host.dimension.id) continue;

    const distance = Vector.magnitude(
      Vector.subtract(player.location, host.location)
    );

    if (distance <= GAME_SETTINGS.INVITE_RADIUS) {
      nearbyPlayers.push(player);
    }
  }

  const hostName = host.nameTag;
  const gameState = {
    hostName,
    phase: "lobby",
    day: 0,
    players: new Map(),
    gatherPoint: host.location,
    purgatoryPoint: {
      x: host.location.x,
      y: host.location.y + 100,
      z: host.location.z,
    },
    dimensionId: host.dimension.id,
    nightData: {},
    timers: {},
    witchState: {
      healPotion: true,
      poisonPotion: true,
      protectedLastNight: null,
    },
    gameType: "classic",
    arenaBounds: null,
    beacons: [],
    isWolfTransformed: false,
  };

  activeWerewolfGames.set(hostName, gameState);
  addPlayerToGame(host, gameState);

  host.sendMessage(
    "§aBạn đã tạo một sảnh Ma Sói. Đang mời người chơi xung quanh..."
  );

  for (const player of nearbyPlayers) {
    try {
      const form = new MessageFormData()
        .title("§5§lLời Mời Ma Sói")
        .body(`§fNgười chơi §e${hostName}§f mời bạn tham gia một ván Ma Sói.`)
        .button1("§aTừ chối")
        .button2("§cChấp nhận");

      const { selection, canceled } = await form.show(player);
      if (!canceled && selection === 1) {
        if (
          activeWerewolfGames.has(hostName) &&
          activeWerewolfGames.get(hostName).phase === "lobby"
        ) {
          player.teleport(gameState.gatherPoint);
          addPlayerToGame(player, gameState);
        }
      }
    } catch (e) {
      console.warn(`Error inviting player ${player.nameTag}:`, e);
    }
  }
}

function cancelLobby(hostName) {
  const gameState = activeWerewolfGames.get(hostName);
  if (!gameState || gameState.phase !== "lobby") return;

  broadcastToGame(
    gameState,
    "§c§lSảnh chờ đã bị chủ phòng giải tán!",
    "note.bass"
  );

  for (const playerName of gameState.players.keys()) {
    const player = world.getPlayers({ name: playerName })[0];
    if (player) {
      revokeWerewolfItem(player);
    }
  }

  activeWerewolfGames.delete(hostName);
}

function addPlayerToGame(player, gameState) {
  gameState.players.set(player.nameTag, { role: null, status: "alive" });
  giveWerewolfItem(player);
  player.setDynamicProperty(DYNAMIC_PROPS.STATUS, "alive");
  broadcastToGame(
    gameState,
    `§e${player.nameTag} đã tham gia sảnh chờ. (${gameState.players.size} người)`
  );
}

function startGame(hostName) {
  const gameState = activeWerewolfGames.get(hostName);
  if (!gameState || gameState.phase !== "lobby") return;

  gameState.phase = "starting";

  const rolesToAssign = assignRoles(gameState.players.size, gameState);
  const shuffledPlayers = Array.from(gameState.players.keys()).sort(
    () => Math.random() - 0.5
  );

  for (let i = 0; i < shuffledPlayers.length; i++) {
    const playerName = shuffledPlayers[i];
    const assignedRole = rolesToAssign[i];
    gameState.players.get(playerName).role = assignedRole;
    const player = world.getPlayers({ name: playerName })[0];
    if (player) player.setDynamicProperty(DYNAMIC_PROPS.ROLE, assignedRole);
  }

  if (gameState.gameType === "hunt") {
    setupHuntMode(gameState);
    startHuntDayPhase(gameState);
  } else {
    broadcastToRole(
      gameState,
      "Ma Sói",
      "§cNhững kẻ săn mồi đã lộ diện. Đồng bọn của bạn là: " +
        shuffledPlayers
          .filter((p) => gameState.players.get(p).role === "Ma Sói")
          .join(", ")
    );
    broadcastToGame(
      gameState,
      "§aTrò chơi bắt đầu! Hãy kiểm tra vai trò của mình qua 'Con Mắt Tà Thuật'."
    );
    system.runTimeout(() => {
      if (activeWerewolfGames.has(gameState.hostName)) {
        startClassicNightPhase(gameState);
      }
    }, 100);
  }
}

function startClassicNightPhase(gameState) {
  // ✅ FIX: Dùng system.clearRun cho runId
  if (gameState.timers.dayTimer) {
    system.clearRun(gameState.timers.dayTimer);
    gameState.timers.dayTimer = null;
  }
  if (gameState.timers.voteTimer) {
    system.clearRun(gameState.timers.voteTimer);
    gameState.timers.voteTimer = null;
  }

  gameState.phase = "night_classic";
  gameState.day++;
  gameState.nightData = {
    wolfTarget: null,
    killConfirmed: false,
    protectedTarget: null,
    seerChoice: null,
    witchHealUsed: false,
    witchPoisonTarget: null,
  };
  gameState.witchState.protectedLastNight = null;

  broadcastToGame(
    gameState,
    `§8§lĐÊM THỨ ${gameState.day}\n§r§7Hãy cẩn thận với những gì ẩn nấp trong bóng tối.`
  );

  let wolves = Array.from(gameState.players.entries()).filter(
    ([name, data]) => data.role === "Ma Sói" && data.status === "alive"
  );
  if (wolves.length > 0) {
    broadcastToRole(
      gameState,
      "Ma Sói",
      "§c'Con Mắt' đã được cập nhật. Hãy chọn nạn nhân, sau đó tiến hành cuộc săn."
    );
    gameState.timers.nightTimer = system.runTimeout(() => {
      if (gameState.phase === "night_classic" && activeWerewolfGames.has(gameState.hostName)) {
        proceedWithClassicNightRoles(gameState);
      }
    }, GAME_SETTINGS.NIGHT_DURATION_SECONDS * 20);
  } else {
    proceedWithClassicNightRoles(gameState);
  }
}

function proceedWithClassicNightRoles(gameState) {
  for (const [playerName, data] of gameState.players.entries()) {
    if (data.role === "Ma Sói" && data.status === "alive") {
      const player = world.getPlayers({ name: playerName })[0];
      if (player) {
        try {
          const inv = player.getComponent("inventory").container;
          for (let i = 0; i < inv.size; i++) {
            const item = inv.getItem(i);
            if (
              item?.nameTag === "§cMóng Vuốt Sói" ||
              item?.typeId === "minecraft:bow" ||
              item?.typeId === "minecraft:tipped_arrow" ||
              item?.typeId === "minecraft:arrow"
            ) {
              inv.setItem(i, undefined);
            }
          }
        } catch (e) {
          console.warn(`Error clearing wolf items for ${playerName}:`, e);
        }
      }
    }
  }

  if (
    gameState.nightData.killConfirmed === false &&
    gameState.nightData.wolfTarget !== null
  ) {
    broadcastToRole(
      gameState,
      "Ma Sói",
      `§cCuộc săn thất bại! Bạn không thể tiếp cận ${gameState.nightData.wolfTarget}.`
    );
  }

  system.runTimeout(() => {
    if (activeWerewolfGames.has(gameState.hostName)) {
      startClassicDayPhase(gameState);
    }
  }, 10 * 20);
}

function startClassicDayPhase(gameState) {
  if (gameState.timers.nightTimer) {
    system.clearRun(gameState.timers.nightTimer);
    gameState.timers.nightTimer = null;
  }
  
  gameState.phase = "day_classic";

  const {
    wolfTarget,
    killConfirmed,
    protectedTarget,
    witchHealUsed,
    witchPoisonTarget,
  } = gameState.nightData;
  let deathsToday = [];

  if (killConfirmed && wolfTarget !== protectedTarget && !witchHealUsed) {
    deathsToday.push({ name: wolfTarget, cause: "werewolf" });
  }
  if (
    witchPoisonTarget &&
    !deathsToday.some((d) => d.name === witchPoisonTarget)
  ) {
    deathsToday.push({ name: witchPoisonTarget, cause: "witch" });
  }

  for (const [name, data] of gameState.players.entries()) {
    if (data.status === "alive") {
      const player = world.getPlayers({ name: name })[0];
      if (player) {
        try {
          player.teleport(gameState.gatherPoint);
        } catch (e) {
          console.warn(`Error teleporting ${name} to gather point:`, e);
        }
      }
    }
  }
  
  broadcastToGame(
    gameState,
    "§e§lBÌNH MINH\n§r§fCả làng tập trung tại quảng trường để tìm ra sự thật."
  );

  system.runTimeout(() => {
    if (!activeWerewolfGames.has(gameState.hostName)) return;
    
    if (deathsToday.length === 0) {
      broadcastToGame(
        gameState,
        "§aĐêm qua là một đêm yên bình, không ai thiệt mạng."
      );
    } else {
      for (const death of deathsToday) {
        eliminatePlayer(death.name, gameState, death.cause);
        if (!activeWerewolfGames.has(gameState.hostName)) return;
      }
    }

    if (!activeWerewolfGames.has(gameState.hostName)) return;
    broadcastToGame(
      gameState,
      `§eBắt đầu §f${GAME_SETTINGS.DAY_DISCUSSION_SECONDS}§e giây thảo luận!`
    );
    gameState.timers.dayTimer = system.runTimeout(() => {
      if (activeWerewolfGames.has(gameState.hostName)) {
        startVotingPhase(gameState);
      }
    }, GAME_SETTINGS.DAY_DISCUSSION_SECONDS * 20);
  }, 60);
}

function startVotingPhase(gameState) {
  if (gameState.timers.dayTimer) {
    system.clearRun(gameState.timers.dayTimer);
    gameState.timers.dayTimer = null;
  }
  
  gameState.phase = "voting_classic";
  gameState.votes = new Map();
  
  // Clear previous votes
  for (const [playerName, playerData] of gameState.players.entries()) {
    playerData.vote = null;
  }
  
  broadcastToGame(
    gameState,
    "§6Đã hết giờ thảo luận! Hãy dùng 'Con Mắt Tà Thuật' để tiến hành bỏ phiếu."
  );
  gameState.timers.voteTimer = system.runTimeout(() => {
    if (activeWerewolfGames.has(gameState.hostName)) {
      tallyVotesAndExecute(gameState);
    }
  }, GAME_SETTINGS.VOTING_DURATION_SECONDS * 20);
}

function tallyVotesAndExecute(gameState) {
  if (gameState.phase !== "voting_classic") return;
  
  if (gameState.timers.voteTimer) {
    system.clearRun(gameState.timers.voteTimer);
    gameState.timers.voteTimer = null;
  }
  
  gameState.phase = "post-vote";

  let maxVotes = 0;
  let playersToExecute = [];
  const voteCounts = new Map();

  for (const [voterName, voterData] of gameState.players.entries()) {
    if (voterData.vote && voterData.status === "alive") {
      const current = voteCounts.get(voterData.vote) || 0;
      voteCounts.set(voterData.vote, current + 1);
    }
  }

  for (const [votedPlayer, count] of voteCounts.entries()) {
    if (count > maxVotes) {
      maxVotes = count;
      playersToExecute = [votedPlayer];
    } else if (count > 0 && count === maxVotes) {
      playersToExecute.push(votedPlayer);
    }
  }

  if (playersToExecute.length !== 1) {
    broadcastToGame(
      gameState,
      "§eBiểu quyết bất thành, không ai bị treo cổ hôm nay."
    );
  } else {
    eliminatePlayer(playersToExecute[0], gameState, "vote");
    if (!activeWerewolfGames.has(gameState.hostName)) return;
  }

  if (!activeWerewolfGames.has(gameState.hostName)) return;
  system.runTimeout(() => {
    if (activeWerewolfGames.has(gameState.hostName)) {
      startClassicNightPhase(gameState);
    }
  }, 200);
}

function checkWinConditions(gameState) {
  let alivePlayers = Array.from(gameState.players.values()).filter(
    (p) => p.status === "alive"
  );
  if (alivePlayers.length <= 0) {
    endGame(gameState, "draw");
    return;
  }

  if (gameState.gameType === "hunt") {
    const beaconsCleansed = gameState.beacons.filter((b) => b.cleansed).length;
    if (beaconsCleansed >= GAME_SETTINGS.HUNT_BEACON_COUNT) {
      endGame(gameState, "villager_win_hunt");
      return;
    }
    let survivors = alivePlayers.filter(
      (p) => p.role === "Dân Sinh Tồn"
    ).length;
    if (survivors === 0) {
      endGame(gameState, "werewolf_win_hunt");
      return;
    }
  } else {
    let wolves = alivePlayers.filter(
      (p) => p.role === "Ma Sói" || p.role === "Sói Ngu"
    ).length;
    let villagers = alivePlayers.length - wolves;

    if (wolves === 0) {
      endGame(gameState, "villager_win_classic");
    } else if (wolves >= villagers) {
      endGame(gameState, "werewolf_win_classic");
    }
  }
}

function endGame(gameState, reason) {
  let message = "§e§lTRÒ CHƠI KẾT THÚC";
  switch (reason) {
    case "villager_win_classic":
      message += "\n§a§lPHE DÂN LÀNG THẮNG!\n§rTất cả Ma Sói đã bị tiêu diệt.";
      break;
    case "werewolf_win_classic":
      message +=
        "\n§c§lPHE MA SÓI THẮNG!\n§rLàng đã chìm trong bóng tối vĩnh viễn.";
      break;
    case "villager_win_hunt":
      message +=
        "\n§a§lDÂN SINH TỒN THẮNG!\n§rBạn đã thanh tẩy thành công tất cả Hải Đăng.";
      break;
    case "werewolf_win_hunt":
      message += "\n§c§lSÓI SĂN MỒI THẮNG!\n§rKhông còn con mồi nào sống sót.";
      break;
    default:
      message += `\n§7${reason}`;
      break;
  }

  broadcastToGame(gameState, message, "random.levelup");
  
  // Khôi phục người chơi
  try {
    const dimension = world.getDimension(gameState.dimensionId);
    for (const playerName of gameState.players.keys()) {
      const player = world.getPlayers({ name: playerName })[0];
      if (player) {
        revokeWerewolfItem(player);
        try {
          player.teleport(gameState.gatherPoint, { dimension: dimension });
        } catch (e) {
          console.warn(`Error teleporting ${playerName} after game end:`, e);
        }
        player.removeEffect("slowness");
        player.removeEffect("jump_boost");
        player.removeEffect("mining_fatigue");
        player.removeEffect("speed");
        player.removeEffect("strength");
        if (player.gameMode !== GameMode.Survival) {
          player.setGameMode(GameMode.Survival);
        }
      }
    }
  } catch (e) {
    console.error("Error during player restoration:", e);
  }

  // Dọn dẹp hunt mode
  if (gameState.gameType === "hunt" && gameState.beacons) {
    try {
      const dimension = world.getDimension(gameState.dimensionId);
      const air = BlockPermutation.resolve("minecraft:air");
      gameState.beacons.forEach((beacon) => {
        try {
          const block = dimension.getBlock(beacon.location);
          if (block && block.typeId === "minecraft:lodestone") {
            block.setPermutation(air);
          }
        } catch (e) {
          console.warn(`Cannot remove beacon at ${beacon.location.x}, ${beacon.location.y}, ${beacon.location.z}:`, e);
        }
      });
    } catch (e) {
      console.error("Error cleaning up beacons:", e);
    }
  }

  // ✅ FIXED: Dùng system.clearRun cho các runId
  if (gameState.timers) {
    if (gameState.timers.dayTimer) {
      system.clearRun(gameState.timers.dayTimer);
    }
    if (gameState.timers.nightTimer) {
      system.clearRun(gameState.timers.nightTimer);
    }
    if (gameState.timers.voteTimer) {
      system.clearRun(gameState.timers.voteTimer);
    }
    if (gameState.timers.huntDayTimer) {
      system.clearRun(gameState.timers.huntDayTimer);
    }
    if (gameState.timers.huntNightTimer) {
      system.clearRun(gameState.timers.huntNightTimer);
    }
  }

  // ✅ CRITICAL: Xóa game khỏi Map cuối cùng
  activeWerewolfGames.delete(gameState.hostName);
  console.log(`Game ${gameState.hostName} ended and removed. Active games: ${activeWerewolfGames.size}`);
}

async function showMainInterface(player) {
  const gameState = getGameForPlayer(player);
  if (!gameState) return;

  const playerData = gameState.players.get(player.nameTag);
  if (!playerData || playerData.status !== "alive") return;

  try {
    const form = new ActionFormData();
    form.title(GAME_ITEM_NAME);

    let body = `§7Vai trò của bạn: §l${playerData.role}\n`;
    let livingPlayers = Array.from(gameState.players.values()).filter(
      (p) => p.status === "alive"
    ).length;
    body += `§7Người chơi còn lại: §e${livingPlayers}§f/${gameState.players.size}\n\n`;

    const actions = [];

    if (gameState.gameType === "hunt") {
      const beaconsCleansed = gameState.beacons.filter((b) => b.cleansed).length;
      body += `§bHải Đăng đã thanh tẩy: ${beaconsCleansed} / ${GAME_SETTINGS.HUNT_BEACON_COUNT}\n\n`;
      if (playerData.role === 'Dân Sinh Tồn') {
        body += "§e--- VỊ TRÍ HẢI ĐĂNG CẦN KÍCH HOẠT ---\n";
        gameState.beacons.forEach((beacon, index) => {
          const status = beacon.cleansed 
            ? "§7(Đã Thanh Tẩy)" 
            : "§a(Còn Hoạt Động)";
          const loc = beacon.location;
          
          body += `§f[${index + 1}] §bX:${loc.x}, Y:${loc.y}, Z:${loc.z} ${status}\n`;
        });
        body += "\n";
      }
      if (gameState.phase === "day_hunt")
        body += "§aBây giờ là ban ngày. Hãy tìm và kích hoạt Hải Đăng!";
      if (gameState.phase === "night_hunt")
        body += "§cMàn đêm đã xuống. Cuộc săn bắt đầu!";

      if (
        playerData.role === "Sói Săn Mồi" &&
        gameState.phase === "night_hunt" &&
        !gameState.isWolfTransformed
      ) {
        actions.push({
          text: "§4§lHÓA SÓI",
          action: () => transformWolf(player, gameState),
        });
      }
    } else {
      body +=
        "§eNgười chơi còn sống:\n§f" +
        Array.from(gameState.players.keys())
          .filter((name) => gameState.players.get(name).status === "alive")
          .join(", ");
      switch (gameState.phase) {
        case "lobby":
          if (player.nameTag === gameState.hostName)
            actions.push({
              text: "§a§lBắt Đầu Trò Chơi",
              action: () => startGame(gameState.hostName),
            });
          actions.push({ 
            text: "§c§lHủy Sảnh Chờ", 
            action: () => cancelLobby(gameState.hostName) 
          }); 
          break;
        case "night_classic":
          if (playerData.role === "Ma Sói" && !gameState.nightData.wolfTarget)
            actions.push({
              text: "§cChọn Nạn Nhân",
              action: () => showWolfTargetForm(player, gameState),
            });
          else if (
            playerData.role === "Tiên Tri" &&
            !gameState.nightData.seerChoice
          )
            actions.push({
              text: "§bSoi một người",
              action: () => showSeerChoiceForm(player, gameState),
            });
          else if (
            playerData.role === "Bảo Vệ" &&
            !gameState.nightData.protectedTarget
          )
            actions.push({
              text: "§aBảo vệ một người",
              action: () => showGuardianChoiceForm(player, gameState),
            });
          else if (playerData.role === "Phù Thủy")
            actions.push({
              text: "§5Dùng thuốc",
              action: () => showWitchChoiceForm(player, gameState),
            });
          break;
        case "voting_classic":
          actions.push({
            text: "§6§lBỎ PHIẾU TREO CỔ",
            action: () => showVotingForm(player, gameState),
          });
          break;
      }
    }
    
    if (gameState.phase !== 'lobby') {
      actions.push({ 
        text: "§cRời Trò Chơi", 
        action: () => leaveMidGame(player, gameState) 
      });
    }
    
    if (player.nameTag === gameState.hostName && gameState.phase !== 'lobby') {
      actions.push({ 
        text: "§4§lHỦY TRÒ CHƠI (ADMIN)", 
        action: () => forceEndGame(gameState.hostName) 
      });
    }
    
    form.body(body);
    actions.forEach((a) => form.button(a.text));
    
    const response = await form.show(player);
    if (!response.canceled && actions[response.selection]) {
      actions[response.selection].action();
    }
  } catch (e) {
    console.error(`Error showing main interface to ${player.nameTag}:`, e);
  }
}

async function showWolfTargetForm(player, gameState) {
  try {
    const form = new ActionFormData().title("§c§lChọn Nạn Nhân Săn Đuổi");
    const targets = Array.from(gameState.players.entries())
      .filter(([name, data]) => data.status === "alive" && data.role !== "Ma Sói")
      .map(([name, data]) => name);
    if (targets.length === 0)
      return player.sendMessage("§cKhông có mục tiêu nào để săn.");

    targets.forEach((t) => form.button(t));
    const response = await form.show(player);
    if (response.canceled) return;

    const targetName = targets[response.selection];
    gameState.nightData.wolfTarget = targetName;

    const sword = new ItemStack("minecraft:netherite_sword", 1);
    sword.nameTag = "§cMóng Vuốt Sói";
    const bow = new ItemStack("minecraft:bow", 1);
    const arrow = new ItemStack("minecraft:arrow", 16);

    const inventory = player.getComponent("inventory");
    if (inventory && inventory.container) {
      inventory.container.addItem(sword);
      inventory.container.addItem(bow);
      inventory.container.addItem(arrow);
    }

    broadcastToRole(
      gameState,
      "Ma Sói",
      `§c§lMục tiêu đã được chọn: §e${targetName}§c. Hãy tiến hành cuộc săn!`
    );
  } catch (e) {
    console.error(`Error in wolf target form for ${player.nameTag}:`, e);
  }
}

async function showSeerChoiceForm(player, gameState) {
  try {
    const form = new ActionFormData().title("§b§lTiên Tri");
    const targets = Array.from(gameState.players.keys()).filter(
      (name) =>
        gameState.players.get(name).status === "alive" && name !== player.nameTag
    );
    if (targets.length === 0)
      return player.sendMessage("§cKhông có ai khác để soi.");

    targets.forEach((t) => form.button(t));
    const response = await form.show(player);
    if (response.canceled) return;

    const targetName = targets[response.selection];
    gameState.nightData.seerChoice = targetName;
    const targetData = gameState.players.get(targetName);
    const isWolf = targetData.role === "Ma Sói" || targetData.role === "Sói Ngu";

    player.sendMessage(
      isWolf
        ? `§c[Soi] Cẩn thận, ${targetName} là Ma Sói!`
        : `§a[Soi] ${targetName} thuộc phe Dân Làng.`
    );
  } catch (e) {
    console.error(`Error in seer choice form for ${player.nameTag}:`, e);
  }
}

async function showGuardianChoiceForm(player, gameState) {
  try {
    const form = new ActionFormData().title("§a§lBảo Vệ");
    const targets = Array.from(gameState.players.keys()).filter(
      (name) =>
        gameState.players.get(name).status === "alive" &&
        name !== gameState.witchState.protectedLastNight
    );
    if (targets.length === 0)
      return player.sendMessage("§cKhông có ai để bảo vệ.");

    targets.forEach((t) => form.button(t));
    const response = await form.show(player);
    if (response.canceled) return;

    const targetName = targets[response.selection];
    gameState.nightData.protectedTarget = targetName;
    gameState.witchState.protectedLastNight = targetName;
    player.sendMessage(`§aBạn đã chọn bảo vệ ${targetName} đêm nay.`);
  } catch (e) {
    console.error(`Error in guardian choice form for ${player.nameTag}:`, e);
  }
}

async function showWitchChoiceForm(player, gameState) {
  try {
    const form = new ActionFormData().title("§5§lPhù Thủy");
    const actions = [];
    let body = "Bạn muốn dùng lọ thuốc nào đêm nay?";

    const targetName = gameState.nightData.wolfTarget;
    if (gameState.witchState.healPotion && targetName) {
      body += `\n§7(Sói đã tấn công: ${targetName})`;
      actions.push({ text: `§aCứu ${targetName}`, action: "heal" });
    }

    if (gameState.witchState.poisonPotion) {
      actions.push({ text: `§cĐầu độc một người`, action: "poison" });
    }

    if (actions.length === 0)
      return player.sendMessage("§cBạn đã dùng hết thuốc.");
    
    form.body(body);
    actions.forEach((a) => form.button(a.text));

    const response = await form.show(player);
    if (response.canceled) return;

    const chosenAction = actions[response.selection].action;
    if (chosenAction === "heal") {
      gameState.nightData.witchHealUsed = true;
      gameState.witchState.healPotion = false;
      player.sendMessage(`§aBạn đã cứu sống ${targetName}.`);
    } else if (chosenAction === "poison") {
      const poisonForm = new ActionFormData().title("§cChọn người để đầu độc");
      const targets = Array.from(gameState.players.keys()).filter(
        (name) =>
          gameState.players.get(name).status === "alive" &&
          name !== player.nameTag
      );
      targets.forEach((t) => poisonForm.button(t));
      const poisonResponse = await poisonForm.show(player);
      if (poisonResponse.canceled) return;

      const poisonTarget = targets[poisonResponse.selection];
      gameState.nightData.witchPoisonTarget = poisonTarget;
      gameState.witchState.poisonPotion = false;
      player.sendMessage(`§cBạn đã chọn đầu độc ${poisonTarget}.`);
    }
  } catch (e) {
    console.error(`Error in witch choice form for ${player.nameTag}:`, e);
  }
}

async function showVotingForm(player, gameState) {
  try {
    const form = new ActionFormData().title("§6§lBỏ Phiếu Treo Cổ");
    const targets = Array.from(gameState.players.keys()).filter(
      (name) =>
        gameState.players.get(name).status === "alive" && name !== player.nameTag
    );
    if (targets.length === 0)
      return player.sendMessage("§cKhông còn ai để bỏ phiếu.");

    targets.forEach((t) => form.button(t));
    const response = await form.show(player);
    if (response.canceled) return;

    const targetName = targets[response.selection];
    gameState.players.get(player.nameTag).vote = targetName;
    player.sendMessage(`§eBạn đã bỏ phiếu cho ${targetName}.`);
  } catch (e) {
    console.error(`Error in voting form for ${player.nameTag}:`, e);
  }
}

async function showHunterFinalShotForm(player, gameState) {
  try {
    const form = new ActionFormData()
      .title("§4§lPhát Bắn Cuối Cùng")
      .body("Bạn là Thợ Săn. Khi chết, bạn được quyền kéo một người theo cùng.");
    const targets = Array.from(gameState.players.keys()).filter(
      (name) => gameState.players.get(name).status === "alive"
    );
    if (targets.length === 0) return;

    targets.forEach((t) => form.button(t));
    const response = await form.show(player);
    if (response.canceled) {
      system.run(() => {
        if (activeWerewolfGames.has(gameState.hostName)) {
          showHunterFinalShotForm(player, gameState);
        }
      });
      return;
    }
    const targetName = targets[response.selection];
    eliminatePlayer(targetName, gameState, "hunter");
  } catch (e) {
    console.error(`Error in hunter final shot form for ${player.nameTag}:`, e);
  }
}

function assignRoles(playerCount, gameState) {
  const roles = [];
  if (playerCount <= GAME_SETTINGS.HUNT_MODE_PLAYER_COUNT) {
    gameState.gameType = "hunt";
    roles.push("Sói Săn Mồi");
    while (roles.length < playerCount) roles.push("Dân Sinh Tồn");
  } else {
    gameState.gameType = "classic";
    if (playerCount >= 4 && playerCount < 7) {
      roles.push("Ma Sói", "Tiên Tri", "Bảo Vệ");
      while (roles.length < playerCount) roles.push("Dân Làng");
      if (playerCount >= 6) roles.push("Ma Sói");
    } else {
      roles.push(
        "Ma Sói",
        "Ma Sói",
        "Tiên Tri",
        "Bảo Vệ",
        "Phù Thủy",
        "Thợ Săn"
      );
      while (roles.length < playerCount) roles.push("Dân Làng");
    }
  }
  return roles.sort(() => Math.random() - 0.5);
}

// ✅ FIXED: Hoàn toàn sửa lại setupHuntMode để tránh lỗi block chưa load
function setupHuntMode(gameState) {
  const center = gameState.gatherPoint;
  const dimensionId = gameState.dimensionId;
  
  gameState.arenaBounds = {
    minX: center.x - GAME_SETTINGS.HUNT_ARENA_RADIUS,
    maxX: center.x + GAME_SETTINGS.HUNT_ARENA_RADIUS,
    minZ: center.z - GAME_SETTINGS.HUNT_ARENA_RADIUS,
    maxZ: center.z + GAME_SETTINGS.HUNT_ARENA_RADIUS,
    dimensionId: dimensionId,
  };
  
  try {
    const dimension = world.getDimension(dimensionId);
    let successfulBeacons = 0;
    let attempts = 0;
    const maxAttempts = GAME_SETTINGS.HUNT_BEACON_COUNT * 3; // Tối đa 3 lần thử cho mỗi beacon
    
    while (successfulBeacons < GAME_SETTINGS.HUNT_BEACON_COUNT && attempts < maxAttempts) {
      attempts++;
      
      // Tạo tọa độ ngẫu nhiên gần center hơn để tránh chunk chưa load
      const radius = Math.min(GAME_SETTINGS.HUNT_ARENA_RADIUS, 500); // Giảm bán kính
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * radius;
      
      const x = Math.floor(center.x + Math.cos(angle) * distance);
      const z = Math.floor(center.z + Math.sin(angle) * distance);
      
      // Tìm ground level an toàn
      let groundY = Math.floor(center.y);
      
      try {
        // Kiểm tra từ trên xuống để tìm mặt đất
        for (let y = Math.min(center.y + 20, 100); y >= Math.max(center.y - 20, -30); y--) {
          const checkBlock = dimension.getBlock({x, y, z});
          if (checkBlock && !checkBlock.isAir) {
            groundY = y + 1;
            break;
          }
        }
        
        const beaconLocation = { x, y: groundY, z };
        const targetBlock = dimension.getBlock(beaconLocation);
        
        if (targetBlock) {
          // Kiểm tra không đặt trùng vị trí
          const tooClose = gameState.beacons.some(existingBeacon => {
            const dx = existingBeacon.location.x - x;
            const dz = existingBeacon.location.z - z;
            return Math.sqrt(dx * dx + dz * dz) < 20; // Tối thiểu 20 block cách nhau
          });
          
          if (!tooClose) {
            targetBlock.setPermutation(BlockPermutation.resolve("minecraft:lodestone"));
            gameState.beacons.push({ 
              location: beaconLocation, 
              cleansed: false, 
              id: `beacon_${successfulBeacons}` 
            });
            successfulBeacons++;
            console.log(`Beacon ${successfulBeacons} placed at ${x}, ${groundY}, ${z}`);
          }
        }
      } catch (blockError) {
        console.warn(`Failed to place beacon at ${x}, ${groundY}, ${z}:`, blockError.message);
        continue;
      }
    }
    
    // Nếu không tạo được beacon nào, tạo fallback tại gather point
    if (gameState.beacons.length === 0) {
      console.warn("No beacons could be placed, creating fallback beacon");
      try {
        const fallbackLocation = {
          x: Math.floor(center.x),
          y: Math.floor(center.y + 2),
          z: Math.floor(center.z + 5)
        };
        
        const fallbackBlock = dimension.getBlock(fallbackLocation);
        if (fallbackBlock) {
          fallbackBlock.setPermutation(BlockPermutation.resolve("minecraft:lodestone"));
          gameState.beacons.push({ 
            location: fallbackLocation, 
            cleansed: false, 
            id: 'beacon_fallback' 
          });
        }
      } catch (e) {
        console.error("Cannot create fallback beacon:", e);
        // Nếu không thể tạo beacon, chuyển về classic mode
        gameState.gameType = "classic";
        broadcastToGame(gameState, "§cKhông thể tạo Hunt Mode, chuyển về Classic Mode!");
        return;
      }
    }
    
    console.log(`Hunt mode setup complete. Created ${gameState.beacons.length} beacons`);
  } catch (e) {
    console.error("Error in setupHuntMode:", e);
    gameState.gameType = "classic";
    broadcastToGame(gameState, "§cLỗi setup Hunt Mode, chuyển về Classic Mode!");
    return;
  }

  broadcastToGame(gameState, "§c§lTRÒ CHƠI SĂN ĐUỔI BẮT ĐẦU!");
  broadcastToRole(
    gameState,
    "Dân Sinh Tồn",
    `§aNhiệm vụ: Tìm và kích hoạt ${gameState.beacons.length} Ngọn Hải Đăng vào ban ngày để chiến thắng!`
  );
  broadcastToRole(
    gameState,
    "Sói Săn Mồi",
    "§cBạn là kẻ đi săn. Chờ đến đêm, hóa sói và tiêu diệt tất cả Dân!"
  );
}

function startHuntDayPhase(gameState) {
  gameState.phase = "day_hunt";
  gameState.isWolfTransformed = false;
  for (const [name, data] of gameState.players.entries()) {
    if (data.role === "Sói Săn Mồi" && data.status === "alive") {
      const wolfPlayer = world.getPlayers({ name: name })[0];
      if (wolfPlayer) {
        wolfPlayer.removeEffect("speed");
        wolfPlayer.removeEffect("strength");
        wolfPlayer.removeEffect("jump_boost");
      }
    }
  }

  broadcastToGame(
    gameState,
    `§eMặt trời đã lên. Bạn có ${GAME_SETTINGS.HUNT_DAY_DURATION_SECONDS} giây an toàn.`
  );
  gameState.timers.huntDayTimer = system.runTimeout(() => {
    if (activeWerewolfGames.has(gameState.hostName)) {
      startHuntNightPhase(gameState);
    }
  }, GAME_SETTINGS.HUNT_DAY_DURATION_SECONDS * 20);
}

function startHuntNightPhase(gameState) {
  if (!activeWerewolfGames.has(gameState.hostName)) return;
  gameState.phase = "night_hunt";
  broadcastToGame(gameState, "§4§lCUỘC SĂN BẮT ĐẦU!", "ambient.cave");
  broadcastToRole(
    gameState,
    "Sói Săn Mồi",
    "§cTrời đã tối! Dùng 'Con Mắt' để Hóa Sói!"
  );
  gameState.timers.huntNightTimer = system.runTimeout(() => {
    if (activeWerewolfGames.has(gameState.hostName)) {
      checkWinConditions(gameState);
      if (activeWerewolfGames.has(gameState.hostName)) {
        startHuntDayPhase(gameState);
      }
    }
  }, GAME_SETTINGS.HUNT_NIGHT_DURATION_SECONDS * 20);
}

function transformWolf(player, gameState) {
  gameState.isWolfTransformed = true;
  player.addEffect("speed", GAME_SETTINGS.HUNT_NIGHT_DURATION_SECONDS * 20, {
    amplifier: 1,
    showParticles: false,
  });
  player.addEffect("strength", GAME_SETTINGS.HUNT_NIGHT_DURATION_SECONDS * 20, {
    amplifier: 2,
    showParticles: false,
  });
  player.addEffect(
    "jump_boost",
    GAME_SETTINGS.HUNT_NIGHT_DURATION_SECONDS * 20,
    { amplifier: 1, showParticles: false }
  );
  player.playSound("entity.wolf.howl", { location: player.location });
  player.sendMessage("§4Bạn đã hóa Sói! Hãy săn con mồi!");
}

// ✅ FIXED: Thêm try-catch cho tất cả event handlers
export function handleItemUse(event) {
  try {
    const { source: player, itemStack } = event;
    if (
      itemStack?.typeId === GAME_ITEM_ID &&
      itemStack?.nameTag === GAME_ITEM_NAME
    ) {
      event.cancel = true;
      system.run(() => showMainInterface(player));
    }
  } catch (e) {
    console.error("Error in handleItemUse:", e);
  }
}

export function handlePlayerLeave(event) {
  try {
    const gameState = getGameForPlayer(event.player);
    if (gameState) {
      broadcastToGame(gameState, `§c${event.player.nameTag} đã rời trận đấu!`);
      eliminatePlayer(event.player.nameTag, gameState, "leave");
    }
  } catch (e) {
    console.error("Error in handlePlayerLeave:", e);
  }
}

export function handleEntityHurt(event) {
  try {
    const { hurtEntity, damageSource } = event;
    if (
      hurtEntity?.typeId !== "minecraft:player" ||
      !damageSource?.damagingEntity ||
      damageSource.damagingEntity.typeId !== "minecraft:player"
    )
      return;

    const attacker = damageSource.damagingEntity;
    const victim = hurtEntity;
    const gameState = getGameForPlayer(attacker);

    if (!gameState) return;
    const attackerData = gameState.players.get(attacker.nameTag);
    const victimData = gameState.players.get(victim.nameTag);

    if (!attackerData || !victimData) return;

    if (gameState.gameType === "hunt") {
      if (
        attackerData.role === "Sói Săn Mồi" &&
        victimData.role === "Dân Sinh Tồn" &&
        gameState.isWolfTransformed &&
        gameState.phase === "night_hunt"
      ) {
        eliminatePlayer(victim.nameTag, gameState, "werewolf");
      }
    } else {
      if (
        gameState.phase === "night_classic" &&
        gameState.nightData.wolfTarget === victim.nameTag
      ) {
        if (attackerData.role === "Ma Sói") {
          gameState.nightData.killConfirmed = true;
          broadcastToRole(
            gameState,
            "Ma Sói",
            `§a§lXác nhận!§r §e${victim.nameTag}§a đã bị tấn công.`
          );
          attacker.playSound("random.orb");
        }
      }
    }
  } catch (e) {
    console.error("Error in handleEntityHurt:", e);
  }
}

export function handlePlayerInteractWithBlock(event) {
  try {
    const { player, block } = event;
    
    // ✅ THÊM: Debug logs để theo dõi
    console.log(`[WEREWOLF-DEBUG] Player ${player.nameTag} interacted with ${block.typeId} at ${block.location.x}, ${block.location.y}, ${block.location.z}`);
    
    const gameState = getGameForPlayer(player);
    if (!gameState) {
      console.log("[WEREWOLF-DEBUG] No game found for player");
      return;
    }

    console.log(`[WEREWOLF-DEBUG] Game found: type=${gameState.gameType}, phase=${gameState.phase}`);

    if (gameState.gameType !== "hunt") {
      console.log("[WEREWOLF-DEBUG] Not in hunt mode");
      return;
    }

    if (gameState.phase !== "day_hunt") {
      console.log(`[WEREWOLF-DEBUG] Wrong phase: ${gameState.phase}`);
      return;
    }

    if (block?.typeId !== "minecraft:lodestone") {
      console.log(`[WEREWOLF-DEBUG] Wrong block type: ${block?.typeId}`);
      return;
    }

    const playerData = gameState.players.get(player.nameTag);
    if (playerData?.role !== "Dân Sinh Tồn") {
      console.log(`[WEREWOLF-DEBUG] Wrong role: ${playerData?.role}`);
      player.sendMessage("§cChỉ Dân Sinh Tồn mới có thể kích hoạt Hải Đăng!");
      return;
    }

    console.log("[WEREWOLF-DEBUG] All conditions met, checking beacons...");

    // ✅ IMPROVED: Kiểm tra tọa độ chính xác hơn
    for (let i = 0; i < gameState.beacons.length; i++) {
      const beacon = gameState.beacons[i];
      const loc = beacon.location;
      
      // So sánh tọa độ chính xác
      const blockX = Math.floor(block.location.x);
      const blockY = Math.floor(block.location.y);
      const blockZ = Math.floor(block.location.z);
      const beaconX = Math.floor(loc.x);
      const beaconY = Math.floor(loc.y);
      const beaconZ = Math.floor(loc.z);
      
      console.log(`[WEREWOLF-DEBUG] Checking beacon ${i}: Block(${blockX},${blockY},${blockZ}) vs Beacon(${beaconX},${beaconY},${beaconZ}), cleansed=${beacon.cleansed}`);
      
      if (blockX === beaconX && blockY === beaconY && blockZ === beaconZ) {
        if (beacon.cleansed) {
          player.sendMessage("§eHải đăng này đã được thanh tẩy rồi!");
          return;
        }
        
        console.log(`[WEREWOLF-DEBUG] ✅ Beacon ${i} matched and not cleansed, activating...`);
        beacon.cleansed = true;
        
        try {
          // Tạo hiệu ứng
          player.dimension.spawnEntity("minecraft:lightning_bolt", {
            x: blockX + 0.5,
            y: blockY + 1,
            z: blockZ + 0.5
          });
          
          player.dimension.spawnParticle("minecraft:totem_particle", {
            x: blockX + 0.5,
            y: blockY + 1.5,
            z: blockZ + 0.5,
          });
          
          player.playSound("random.levelup");
        } catch (effectError) {
          console.warn("[WEREWOLF-DEBUG] Error spawning effects:", effectError);
        }

        const cleansedCount = gameState.beacons.filter((b) => b.cleansed).length;
        broadcastToGame(
          gameState,
          `§a§l${player.nameTag} đã thanh tẩy Hải Đăng! (${cleansedCount}/${GAME_SETTINGS.HUNT_BEACON_COUNT})`
        );
        
        console.log(`[WEREWOLF-DEBUG] ✅ Beacon cleansed successfully! Total: ${cleansedCount}/${GAME_SETTINGS.HUNT_BEACON_COUNT}`);
        
        // ✅ FIXED: Delay check win conditions để đảm bảo state được cập nhật
        system.run(() => {
          if (activeWerewolfGames.has(gameState.hostName)) {
            checkWinConditions(gameState);
          }
        });
        return;
      }
    }
    
    console.log("[WEREWOLF-DEBUG] ❌ No matching beacon found for this interaction");
  } catch (e) {
    console.error("[WEREWOLF-DEBUG] Error in handlePlayerInteractWithBlock:", e);
    console.error("[WEREWOLF-DEBUG] Stack trace:", e.stack);
  }
}

export function handleChatSend(event) {
  try {
    const { sender: player, message } = event;
    const gameState = getGameForPlayer(player);
    if (!gameState) return;

    const playerData = gameState.players.get(player.nameTag);
    if (!playerData) return;

    // Kênh chat của Ma
    if (playerData.status === "dead" && gameState.gameType === "classic") {
      event.cancel = true;
      const ghostMessage = `§8[MA] §7${player.nameTag}: ${message}`;
      for (const [name, data] of gameState.players.entries()) {
        if (data.status === "dead") {
          const ghostPlayer = world.getPlayers({ name })[0];
          if (ghostPlayer) {
            ghostPlayer.sendMessage(ghostMessage);
          }
        }
      }
      return;
    }

    // Kênh chat của Sói (chỉ hoạt động vào ban đêm)
    if (
      playerData.role === "Ma Sói" &&
      gameState.phase === "night_classic" &&
      message.startsWith("!s ")
    ) {
      event.cancel = true;
      const wolfMessage = `§c[SÓI] §e${player.nameTag}: ${message.substring(3)}`;
      broadcastToRole(gameState, "Ma Sói", wolfMessage);
      return;
    }
  } catch (e) {
    console.error("Error in handleChatSend:", e);
  }
}

function forceEndGame(hostName) {
  const gameState = activeWerewolfGames.get(hostName);
  if (!gameState || gameState.phase === 'lobby') return;
  endGame(gameState, "§cTrò chơi đã bị chủ phòng hủy bỏ.");
}

function leaveMidGame(player, gameState) {
  if (!gameState || !gameState.players.has(player.nameTag)) return;
  broadcastToGame(gameState, `§eNgười chơi §f${player.nameTag}§e đã chủ động rời khỏi trận đấu.`);
  eliminatePlayer(player.nameTag, gameState, 'leave');
}

// ✅ Debug functions để kiểm tra và dọn dẹp
export function debugActiveGames() {
  console.log(`Số game đang hoạt động: ${activeWerewolfGames.size}`);
  for (const [hostName, gameState] of activeWerewolfGames.entries()) {
    console.log(`- Game ${hostName}: phase=${gameState.phase}, players=${gameState.players.size}`);
  }
}

export function forceCleanAllGames() {
  console.log(`Đang xóa ${activeWerewolfGames.size} games...`);
  
  for (const [hostName, gameState] of activeWerewolfGames.entries()) {
    try {
      // Dọn dẹp timers
      if (gameState.timers) {
        Object.values(gameState.timers).forEach(timer => {
          if (timer) system.clearRun(timer);
        });
      }
      
      // Khôi phục người chơi
      for (const playerName of gameState.players.keys()) {
        const player = world.getPlayers({ name: playerName })[0];
        if (player) {
          revokeWerewolfItem(player);
          player.removeEffect("slowness");
          player.removeEffect("jump_boost");
          player.removeEffect("mining_fatigue");
          player.removeEffect("speed");
          player.removeEffect("strength");
        }
      }
      
      // Dọn dẹp beacons
      if (gameState.gameType === "hunt" && gameState.beacons) {
        try {
          const dimension = world.getDimension(gameState.dimensionId);
          const air = BlockPermutation.resolve("minecraft:air");
          gameState.beacons.forEach((beacon) => {
            try {
              const block = dimension.getBlock(beacon.location);
              if (block && block.typeId === "minecraft:lodestone") {
                block.setPermutation(air);
              }
            } catch (e) {
              // Ignore individual beacon cleanup errors
            }
          });
        } catch (e) {
          console.warn("Error cleaning beacons:", e);
        }
      }
    } catch (e) {
      console.error(`Error cleaning game ${hostName}:`, e);
    }
  }
  
  activeWerewolfGames.clear();
  console.log("Đã xóa tất cả games thành công.");
}

// ✅ Hàm kiểm tra health của game
export function checkGameHealth() {
  for (const [hostName, gameState] of activeWerewolfGames.entries()) {
    console.log(`=== Game ${hostName} ===`);
    console.log(`Phase: ${gameState.phase}`);
    console.log(`Type: ${gameState.gameType}`);
    console.log(`Day: ${gameState.day}`);
    console.log(`Players: ${gameState.players.size}`);
    
    let aliveCount = 0;
    let deadCount = 0;
    for (const [playerName, data] of gameState.players.entries()) {
      if (data.status === "alive") {
        aliveCount++;
      } else {
        deadCount++;
      }
    }
    console.log(`Alive: ${aliveCount}, Dead: ${deadCount}`);
    
    if (gameState.timers) {
      const activeTimers = Object.keys(gameState.timers).filter(
        key => gameState.timers[key] !== null && gameState.timers[key] !== undefined
      );
      console.log(`Active timers: ${activeTimers.join(", ")}`);
    }
    
    if (gameState.gameType === "hunt") {
      const cleansedBeacons = gameState.beacons?.filter(b => b.cleansed).length || 0;
      console.log(`Beacons: ${cleansedBeacons}/${gameState.beacons?.length || 0} cleansed`);
    }
    console.log("================");
  }
}
// ✅ Debug function để xem thông tin beacon
export function debugWerewolfBeacons(playerName) {
  const player = world.getPlayers({ name: playerName })[0];
  if (!player) {
    console.log(`[WEREWOLF-DEBUG] Player ${playerName} not found`);
    return;
  }

  const gameState = getGameForPlayer(player);
  if (!gameState) {
    console.log(`[WEREWOLF-DEBUG] No game found for player ${playerName}`);
    return;
  }

  console.log("=== WEREWOLF BEACON DEBUG INFO ===");
  console.log(`Game Type: ${gameState.gameType}`);
  console.log(`Phase: ${gameState.phase}`);
  console.log(`Player Role: ${gameState.players.get(playerName)?.role}`);
  console.log(`Total Beacons: ${gameState.beacons?.length || 0}`);
  console.log(`Player Location: ${Math.floor(player.location.x)}, ${Math.floor(player.location.y)}, ${Math.floor(player.location.z)}`);
  
  if (gameState.beacons) {
    gameState.beacons.forEach((beacon, index) => {
      const loc = beacon.location;
      const distance = Math.sqrt(
        Math.pow(player.location.x - loc.x, 2) + 
        Math.pow(player.location.z - loc.z, 2)
      );
      console.log(`Beacon ${index}: X:${loc.x}, Y:${loc.y}, Z:${loc.z}, Cleansed: ${beacon.cleansed}, Distance: ${distance.toFixed(1)} blocks`);
      
      // Kiểm tra block tại vị trí beacon
      try {
        const dimension = world.getDimension(gameState.dimensionId);
        const block = dimension.getBlock(loc);
        console.log(`  Block at beacon location: ${block?.typeId || "null/unloaded"}`);
      } catch (e) {
        console.log(`  Cannot check block: ${e.message}`);
      }
    });
  }
  console.log("=================================");
}

// ✅ Debug function để tìm lodestone gần player
export function findNearbyLodestones(playerName, radius = 100) {
  const player = world.getPlayers({ name: playerName })[0];
  if (!player) {
    console.log(`[WEREWOLF-DEBUG] Player ${playerName} not found`);
    return;
  }

  console.log(`=== SEARCHING FOR LODESTONES WITHIN ${radius} BLOCKS ===`);
  const playerLoc = player.location;
  let foundCount = 0;
  
  for (let x = -radius; x <= radius; x += 5) {
    for (let y = -10; y <= 10; y++) {
      for (let z = -radius; z <= radius; z += 5) {
        try {
          const checkLoc = {
            x: Math.floor(playerLoc.x) + x,
            y: Math.floor(playerLoc.y) + y,
            z: Math.floor(playerLoc.z) + z
          };
          const block = player.dimension.getBlock(checkLoc);
          if (block?.typeId === "minecraft:lodestone") {
            const distance = Math.sqrt(x*x + z*z);
            console.log(`Found lodestone at: ${checkLoc.x}, ${checkLoc.y}, ${checkLoc.z} (${distance.toFixed(1)} blocks away)`);
            foundCount++;
          }
        } catch (e) {
          // Ignore block access errors
        }
      }
    }
  }
  
  console.log(`Total lodestones found: ${foundCount}`);
  console.log("==========================================");
}

// ✅ Force activate beacon (để test)
export function forceActivateBeaconAt(playerName, x, y, z) {
  const player = world.getPlayers({ name: playerName })[0];
  if (!player) return;

  const gameState = getGameForPlayer(player);
  if (!gameState) {
    console.log("[WEREWOLF-DEBUG] No game state found");
    return;
  }

  console.log(`[WEREWOLF-DEBUG] Trying to force activate beacon at ${x}, ${y}, ${z}`);
  
  for (let i = 0; i < gameState.beacons.length; i++) {
    const beacon = gameState.beacons[i];
    const loc = beacon.location;
    
    if (Math.floor(loc.x) === x && Math.floor(loc.y) === y && Math.floor(loc.z) === z) {
      if (beacon.cleansed) {
        console.log("[WEREWOLF-DEBUG] Beacon already cleansed");
        return;
      }
      
      beacon.cleansed = true;
      const cleansedCount = gameState.beacons.filter((b) => b.cleansed).length;
      
      broadcastToGame(
        gameState,
        `§c[DEBUG] Beacon force activated at ${x},${y},${z}! (${cleansedCount}/${GAME_SETTINGS.HUNT_BEACON_COUNT})`
      );
      
      checkWinConditions(gameState);
      console.log(`[WEREWOLF-DEBUG] ✅ Beacon ${i} force activated`);
      return;
    }
  }
  
  console.log("[WEREWOLF-DEBUG] ❌ No beacon found at that location");
}

// ===== CUỐI FILE werewolf_game.js, THÊM DÒNG NÀY =====
console.log("[WEREWOLF] Debug functions loaded. Available commands:");
console.log("- debugWerewolfBeacons('playerName')");
console.log("- findNearbyLodestones('playerName', radius)");
console.log("- forceActivateBeaconAt('playerName', x, y, z)");
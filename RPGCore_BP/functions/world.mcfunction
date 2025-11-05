scoreboard objectives add wiki:world dummy
scoreboard players add .Initialised wiki:world 0
execute if score .Initialised wiki:world matches 0 run scoreboard objectives add rdmitem dummy rdmitem
execute if score .Initialised wiki:world matches 0 run scoreboard objectives add rdmitemtick dummy rdmitemtick
execute if score .Initialised wiki:world matches 0 run scoreboard objectives add item dummy item
execute if score .Initialised wiki:world matches 0 run scoreboard objectives add eattick dummy eattick
execute if score .Initialised wiki:world matches 0 run scoreboard objectives add newb_food dummy newb_food
execute if score .Initialised wiki:world matches 0 run scoreboard objectives add reaction dummy reaction
execute if score .Initialised wiki:world matches 0 run scoreboard objectives add select dummy select
execute if score .Initialised wiki:world matches 0 run scoreboard objectives add cooldown dummy cooldown
execute if score .Initialised wiki:world matches 0 run scoreboard objectives add need_count dummy need_count
execute if score .Initialised wiki:world matches 0 run scoreboard objectives add blocking dummy blocking
execute if score .Initialised wiki:world matches 0 run gamerule commandblockoutput false
scoreboard players set .Initialised wiki:world 1
playanimation @e[type=dhh:newb,tag=is_greeting_sneaking] animation.humanoid.sneakingb
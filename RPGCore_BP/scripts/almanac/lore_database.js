export const LORE_DATABASE = {
  entities: {
    "minecraft:villager": {
      displayName: "§2Dân Làng",
      description:
        "Người xây dựng cộng đồng, những người canh giữ tri thức cổ xưa về nghề nghiệp. Tiếng 'hmm' của họ là ngôn ngữ của thương mại và cuộc sống.",
      lore: "Mỗi chiếc mũi là một định mệnh, mỗi bộ trang phục là một lời kêu gọi.",
      properties: [
        { name: "Chức năng", value: "Trao đổi vật phẩm dựa trên nghề nghiệp" },
      ],
    },
    "minecraft:pig": {
      displayName: "§dHeo",
      description:
        "Một biểu tượng màu hồng của sự đơn giản và no đủ. Nó vui vẻ lang thang trên khắp thế giới, tìm kiếm những củ cà rốt.",
      lore: "Nó tìm thấy niềm vui trong những củ cà rốt và những vũng bùn tưởng tượng.",
      properties: [
        { name: "Nguồn cung cấp", value: "Thịt lợn sống" },
        { name: "Đặc tính", value: "Có thể cưỡi bằng yên và cần câu cà rốt" },
      ],
    },
    "minecraft:cow": {
      displayName: "§fBò",
      description:
        "Một người bạn hiền lành của đồng cỏ, cung cấp sữa, da và thịt. Ánh mắt của nó chứa đựng sự bình yên của những cánh đồng xanh.",
      lore: "Đôi mắt của nó phản chiếu bầu trời rộng lớn.",
      properties: [{ name: "Nguồn cung cấp", value: "Thịt bò, da, sữa" }],
    },
    "minecraft:sheep": {
      displayName: "§fCừu",
      description:
        "Những đám mây biết đi, lang thang trên những ngọn đồi. Bộ lông của chúng là một tấm canvas chờ đợi được tô màu.",
      lore: "Chúng ăn cỏ để vẽ lại màu sắc cho bộ lông của mình.",
      properties: [
        { name: "Nguồn cung cấp", value: "Thịt cừu, len" },
        { name: "Chức năng", value: "Có thể xén lông và nhuộm màu" },
      ],
    },
    "minecraft:chicken": {
      displayName: "§fGà",
      description:
        "Một sinh vật nhỏ bé, luôn bận rộn, để lại những món quà hình bầu dục trên đường đi. Tiếng cục tác của nó là bản nhạc nền của mỗi trang trại.",
      lore: "Nó vỗ cánh nhưng không bao giờ thực sự bay xa, một giấc mơ về bầu trời.",
      properties: [
        { name: "Nguồn cung cấp", value: "Thịt gà, lông vũ, trứng" },
      ],
    },
    "minecraft:horse": {
      displayName: "§eNgựa",
      description:
        "Một sinh vật cao quý và tự do, hiện thân của tốc độ và sự phiêu lưu. Khi được thuần hóa, nó trở thành người bạn đồng hành đáng tin cậy nhất trên những chặng đường dài.",
      lore: "Tiếng gió rít qua tai khi phi nước đại là bài ca của nó.",
      properties: [
        { name: "Chức năng", value: "Phương tiện di chuyển nhanh" },
        { name: "Đặc tính", value: "Có thể trang bị yên và giáp" },
      ],
    },
    "minecraft:donkey": {
      displayName: "§0Lừa",
      description:
        "Một người vận chuyển khiêm tốn và chăm chỉ. Tuy không nhanh bằng ngựa, nhưng nó có thể mang theo hành lý, san sẻ gánh nặng của người lữ hành.",
      lore: "Lưng của nó được tạo ra để mang vác những câu chuyện.",
      properties: [{ name: "Chức năng", value: "Có thể mang theo rương" }],
    },
    "minecraft:rabbit": {
      displayName: "§fThỏ",
      description:
        "Một sinh vật nhỏ bé, nhanh nhẹn, luôn nhảy nhót giữa các bụi cây. Chúng là những linh hồn vui tươi của khu rừng và sa mạc.",
      lore: "Mỗi cú nhảy của nó là một sự thách thức với trọng lực.",
      properties: [
        { name: "Nguồn cung cấp", value: "Thịt thỏ, da thỏ, chân thỏ" },
      ],
    },
    "minecraft:axolotl": {
      displayName: "§dAxolotl",
      description:
        "Chiến binh đáng yêu của hang động ngập nước. Với nụ cười vĩnh cửu, nó sẽ chiến đấu cùng bạn chống lại các mối đe dọa dưới nước và có thể giả chết để tự chữa lành.",
      lore: "Nó là một nụ cười giữa bóng tối của vực sâu.",
      properties: [
        { name: "Chức năng", value: "Hỗ trợ người chơi chiến đấu dưới nước" },
        { name: "Đặc tính", value: "Có thể tái tạo sinh lực" },
      ],
    },
    "minecraft:fox": {
      displayName: "§cáo",
      description:
        "Một kẻ săn đêm tinh ranh của rừng taiga. Với bộ lông màu cam rực rỡ, nó di chuyển nhanh nhẹn và có thể tha những vật phẩm trong miệng.",
      lore: "Nó tin tưởng vào màn đêm và sự im lặng.",
      properties: [
        { name: "Đặc tính", value: "Nhặt và giữ vật phẩm trong miệng" },
        { name: "Hành vi", value: "Săn gà và thỏ" },
      ],
    },
    "minecraft:frog": {
      displayName: "§2Ếch",
      description:
        "Sinh vật của đầm lầy, nó lớn lên từ nòng nọc và mang màu sắc của nơi nó sinh ra. Lưỡi của nó có thể tóm gọn những con mồi nhỏ.",
      lore: "Nó hát bài ca của mưa.",
      properties: [
        {
          name: "Chức năng",
          value: "Tạo ra Khối Đèn Ếch khi ăn Magma Cube nhỏ",
        },
      ],
    },
    "minecraft:ocelot": {
      displayName: "§eMèo Rừng",
      description:
        "Bóng ma của rừng rậm, nhút nhát và khó tiếp cận. Chúng di chuyển một cách duyên dáng và luôn cảnh giác với sự hiện diện của con người.",
      lore: "Để nhìn thấy một con mèo rừng là một dấu hiệu của sự may mắn.",
      properties: [{ name: "Hành vi", value: "Xua đuổi Creeper" }],
    },
    "minecraft:parrot": {
      displayName: "§cẹt",
      description:
        "Viên ngọc biết bay của rừng rậm. Nó có thể bắt chước âm thanh của các sinh vật khác, một bản giao hưởng sống của môi trường xung quanh.",
      lore: "Nó là tiếng vọng của khu rừng.",
      properties: [
        { name: "Chức năng", value: "Bắt chước âm thanh, cảnh báo kẻ địch" },
        { name: "Đặc tính", value: "Có thể đậu trên vai người chơi" },
      ],
    },
    "minecraft:squid": {
      displayName: "§1Mực",
      description:
        "Một sinh vật lặng lẽ của đại dương, trôi dạt theo dòng hải lưu. Khi bị đe dọa, nó phun ra một đám mây mực, một màn che của sự bối rối.",
      lore: "Nó viết những câu chuyện vô hình trong nước.",
      properties: [{ name: "Nguồn cung cấp", value: "Túi mực" }],
    },
    "minecraft:turtle": {
      displayName: "§2Rùa Biển",
      description:
        "Một nhà du hành cổ xưa của đại dương. Nó chậm chạp trên cạn nhưng lại duyên dáng dưới nước. Nó luôn nhớ đường về bãi biển nơi nó được sinh ra để đẻ trứng.",
      lore: "Chiếc mai của nó là một tấm bản đồ của các đại dương.",
      properties: [
        { name: "Nguồn cung cấp", value: "Vảy rùa (khi lớn lên)" },
        { name: "Chức năng", value: "Đẻ trứng trên bãi cát quê hương" },
      ],
    },
    // == PHẦN 2: SINH VẬT TRUNG LẬP (NEUTRAL MOBS)
    // =================================================================
    "minecraft:bee": {
      displayName: "§eOng",
      description:
        "Người thợ cần mẫn của thế giới, bay từ bông hoa này sang bông hoa khác, mang theo phấn hoa và tạo ra mật ngọt. Chúng chỉ tấn công khi tổ của chúng bị đe dọa.",
      lore: "Tiếng vo ve của chúng là nhịp điệu của sự sinh trưởng.",
      properties: [
        { name: "Hành vi", value: "Tấn công theo bầy khi bị khiêu khích" },
        { name: "Chức năng", value: "Thụ phấn cho cây trồng, tạo ra mật ong" },
      ],
    },
    "minecraft:wolf": {
      displayName: "§fSói",
      description:
        "Thợ săn của rừng rậm, di chuyển theo bầy. Đôi mắt của nó thể hiện lòng trung thành tuyệt đối khi được thuần hóa, biến nó thành một người bạn đồng hành dũng cảm.",
      lore: "Tiếng hú của nó là một lời kêu gọi đến những người anh em.",
      properties: [
        { name: "Đặc tính", value: "Có thể được thuần hóa bằng xương" },
        { name: "Hành vi", value: "Tấn công theo bầy khi bị khiêu khích" },
      ],
    },
    "minecraft:polar_bear": {
      displayName: "§fGấu Bắc Cực",
      description:
        "Người cai trị im lặng của vùng lãnh nguyên băng giá. Nó là một người mẹ bảo vệ con mình một cách quyết liệt. Đừng đến quá gần con của nó.",
      lore: "Nó mang trong mình sự lạnh lẽo và sức mạnh của mùa đông vĩnh cửu.",
      properties: [
        { name: "Hành vi", value: "Tấn công khi người chơi ở gần con non" },
      ],
    },
    "minecraft:llama": {
      displayName: "§eLạc Đà Không Bướu",
      description:
        "Lữ khách của những ngọn núi. Với tính cách kiêu hãnh, nó sẽ nhổ nước bọt vào bất cứ ai làm phiền nó. Chúng có thể tạo thành một đoàn lữ hành để vận chuyển hàng hóa.",
      lore: "Mỗi tấm thảm trên lưng nó là một câu chuyện về những chuyến đi.",
      properties: [
        { name: "Chức năng", value: "Tạo đoàn lữ hành, mang theo rương" },
        { name: "Hành vi", value: "Nhổ nước bọt khi bị tấn công" },
      ],
    },
    "minecraft:panda": {
      displayName: "§fPanda",
      description:
        "Một sinh vật hiền lành của rừng tre, với nhiều tính cách khác nhau. Chúng thích tre và lười biếng lăn lộn. Tuy nhiên, một con panda giận dữ là một cảnh tượng đáng sợ.",
      lore: "Trong đôi mắt đen của nó là sự bình yên của rừng tre.",
      properties: [
        {
          name: "Đặc tính",
          value: "Có nhiều tính cách: lười biếng, lo lắng, vui tươi, v.v.",
        },
        { name: "Hành vi", value: "Tấn công lại khi bị đánh" },
      ],
    },
    "minecraft:goat": {
      displayName: "§fDê",
      description:
        "Bậc thầy của những vách đá, có khả năng nhảy cao đáng kinh ngạc. Đôi khi, sự tinh nghịch của nó biến thành một cú húc bất ngờ.",
      lore: "Nó nhìn thế giới từ trên cao.",
      properties: [
        {
          name: "Hành vi",
          value: "Thỉnh thoảng húc người chơi và các sinh vật khác",
        },
        { name: "Nguồn cung cấp", value: "Sừng dê" },
      ],
    },
    "minecraft:iron_golem": {
      displayName: "§fNgười Sắt",
      description:
        "Người bảo vệ được tạo ra từ sắt và bí ngô, một vệ binh thầm lặng của các ngôi làng. Nó bước đi nặng nề, sẵn sàng hy sinh bản thân để bảo vệ dân làng khỏi hiểm nguy.",
      lore: "Trái tim của nó là lòng trung thành, được rèn từ ý chí bảo vệ.",
      properties: [
        { name: "Chức năng", value: "Bảo vệ dân làng, tấn công quái vật" },
        {
          name: "Hành vi",
          value: "Trung lập với người chơi trừ khi bị tấn công",
        },
      ],
    },
    "minecraft:zombified_piglin": {
      displayName: "§dPiglin Xác Sống",
      description:
        "Một cư dân của Nether đã đi lạc vào Overworld và bị biến đổi. Chúng lang thang thành từng nhóm, mang theo những thanh kiếm vàng, quên mất quá khứ của mình.",
      lore: "Chúng là một tiếng vọng đau buồn của một nền văn hóa.",
      properties: [
        {
          name: "Hành vi",
          value: "Tấn công theo bầy khi một cá thể bị khiêu khích",
        },
      ],
    },
    "minecraft:enderman": {
      displayName: "§5Enderman",
      description:
        "Một sinh vật cao lớn, bí ẩn từ một chiều không gian khác. Nó di chuyển các khối một cách vô định, và sẽ trở nên giận dữ nếu bạn dám nhìn thẳng vào mắt nó.",
      lore: "Nó mang trong mình một mảnh của Hư Không.",
      properties: [
        { name: "Chức năng", value: "Dịch chuyển tức thời, nhặt các khối" },
        { name: "Điểm yếu", value: "Nước" },
      ],
    },
    "minecraft:spider": {
      displayName: "§8Nhện",
      description:
        "Một thợ săn tám chân của bóng đêm. Ban ngày, nó trở nên thờ ơ, nhưng khi mặt trời lặn, đôi mắt đỏ rực của nó tìm kiếm con mồi.",
      lore: "Nó dệt nên những cái bẫy từ bóng tối.",
      properties: [
        {
          name: "Hành vi",
          value: "Thù địch vào ban đêm, trung lập vào ban ngày",
        },
        { name: "Đặc tính", value: "Có thể leo tường" },
      ],
    },

    // =================================================================
    // == PHẦN 3: QUÁI VẬT THÙ ĐỊCH - PHẦN A (CLASSIC OVERWORLD HOSTILES)
    // =================================================================
    "minecraft:zombie": {
      displayName: "§2Zombie",
      description:
        "Xác chết biết đi, một mối đe dọa không ngừng nghỉ trong bóng tối. Nó bị thu hút bởi sự sống và sẽ không dừng lại cho đến khi bị tiêu diệt.",
      lore: "Nó là một cái vỏ rỗng, chỉ còn lại cơn đói.",
      properties: [
        { name: "Đặc tính", value: "Bốc cháy dưới ánh nắng mặt trời" },
        { name: "Hành vi", value: "Có thể gọi thêm zombie khi tấn công" },
      ],
    },
    "minecraft:creeper": {
      displayName: "§2Creeper",
      description:
        "Một biểu tượng của sự im lặng chết người. Nó tiếp cận con mồi một cách lặng lẽ và kết thúc bằng một vụ nổ hủy diệt. Tiếng 'ssssss' là lời cảnh báo cuối cùng.",
      lore: "Nó là nỗi sợ hãi được khoác lên mình một lớp da xanh.",
      properties: [
        { name: "Hành vi", value: "Phát nổ khi đến gần người chơi" },
        { name: "Điểm yếu", value: "Sợ mèo rừng và mèo" },
      ],
    },
    "minecraft:skeleton": {
      displayName: "§fSkeleton",
      description:
        "Một cung thủ xương xẩu, tiếng lách cách của nó vang vọng trong đêm. Những mũi tên của nó bay chính xác và không ngừng nghỉ.",
      lore: "Nó là một chiến binh không bao giờ quên mục tiêu của mình.",
      properties: [
        { name: "Đặc tính", value: "Bốc cháy dưới ánh nắng mặt trời" },
        { name: "Vũ khí", value: "Cung tên" },
      ],
    },
    "minecraft:cave_spider": {
      displayName: "§8Nhện Hang",
      description:
        "Một phiên bản nhỏ hơn và nguy hiểm hơn của nhện, ẩn nấp trong các mỏ bỏ hoang. Nọc độc của nó có thể làm suy yếu cả những chiến binh dũng cảm nhất.",
      lore: "Nó mang trong mình cái chết từ từ.",
      properties: [
        { name: "Hành vi", value: "Gây hiệu ứng độc" },
        { name: "Môi trường sống", value: "Mỏ bỏ hoang" },
      ],
    },
    "minecraft:slime": {
      displayName: "§2Slime",
      description:
        "Một khối chất nhờn màu xanh lá cây, nhảy tưng tưng qua các đầm lầy và hang động sâu. Khi bị tiêu diệt, nó phân tách thành các phiên bản nhỏ hơn.",
      lore: "Nó là một câu đố sống.",
      properties: [
        {
          name: "Hành vi",
          value: "Phân chia thành các cá thể nhỏ hơn khi bị tấn công",
        },
      ],
    },
    "minecraft:drowned": {
      displayName: "§3Kẻ Chết Đuối",
      description:
        "Linh hồn của những người đã chìm xuống đáy sông và đại dương. Chúng là những thây ma của biển cả, đôi khi mang theo đinh ba và kho báu bị mất.",
      lore: "Tiếng rên rỉ của chúng là bài ca của vực thẳm.",
      properties: [
        { name: "Môi trường sống", value: "Dưới nước" },
        { name: "Vũ khí", value: "Đinh ba (hiếm)" },
      ],
    },
    "minecraft:husk": {
      displayName: "§eXác Ướp",
      description:
        "Một biến thể của zombie đã thích nghi với sức nóng của sa mạc. Ánh nắng mặt trời không còn là mối đe dọa với nó, và cú chạm của nó mang lại một cơn đói cồn cào.",
      lore: "Nó là cơn khát của sa mạc được ban cho sự sống.",
      properties: [
        { name: "Hành vi", value: "Gây hiệu ứng đói" },
        { name: "Đặc tính", value: "Không cháy dưới ánh nắng mặt trời" },
      ],
    },
    "minecraft:stray": {
      displayName: "§0Kẻ Lạc Lối",
      description:
        "Một bộ xương bị nguyền rủa bởi cái lạnh của vùng băng giá. Những mũi tên của nó được tẩm băng, làm chậm con mồi trong giá rét.",
      lore: "Nó là tiếng thì thầm của một cơn bão tuyết.",
      properties: [
        { name: "Hành vi", value: "Bắn tên làm chậm" },
        { name: "Môi trường sống", value: "Vùng băng giá" },
      ],
    },
    "minecraft:witch": {
      displayName: "§5Phù Thủy",
      description:
        "Một bậc thầy về độc dược, sống trong những túp lều hẻo lánh. Tiếng cười của bà ta báo hiệu những lọ thuốc độc và những lời nguyền khó chịu.",
      lore: "Cái vạc của bà ta chứa đựng cả sự chữa lành và sự hủy diệt.",
      properties: [
        { name: "Hành vi", value: "Ném thuốc độc, sử dụng thuốc hồi phục" },
      ],
    },

    // =================================================================
    // == PHẦN 4: QUÁI VẬT THÙ ĐỊCH - PHẦN B (ILLAGERS & SPECIAL HOSTILES)
    // =================================================================
    "minecraft:pillager": {
      displayName: "§8Kẻ Cướp",
      description:
        "Thành viên của tộc Illager, một tay nỏ thủ tàn nhẫn. Chúng tuần tra thế giới và tham gia vào các cuộc đột kích vào làng mạc.",
      lore: "Lá cờ của chúng là một lời tuyên chiến.",
      properties: [
        { name: "Vũ khí", value: "Nỏ" },
        { name: "Hành vi", value: "Tham gia vào các cuộc đột kích (Raid)" },
      ],
    },
    "minecraft:vindicator": {
      displayName: "§8Kẻ Báo Thù",
      description:
        "Một Illager cuồng chiến, lao vào trận chiến với một chiếc rìu sắt. Tiếng 'Johnny!' là một lời cảnh báo về sự hung hãn không thể ngăn cản của nó.",
      lore: "Sự tức giận là vũ khí duy nhất của nó.",
      properties: [
        { name: "Vũ khí", value: "Rìu sắt" },
        { name: "Hành vi", value: "Tấn công điên cuồng" },
      ],
    },
    "minecraft:evoker": {
      displayName: "§dPháp Sư",
      description:
        "Bậc thầy ma thuật của tộc Illager. Nó không trực tiếp chiến đấu, mà triệu hồi những chiếc hàm ma quái từ mặt đất và những linh hồn gây phiền nhiễu.",
      lore: "Nó ra lệnh cho những thế lực vô hình.",
      properties: [
        { name: "Hành vi", value: "Triệu hồi Vex và Fangs" },
        { name: "Nguồn cung cấp", value: "Totem of Undying" },
      ],
    },
    "minecraft:vex": {
      displayName: "§fVex",
      description:
        "Một linh hồn nhỏ bé, giận dữ được triệu hồi bởi Pháp Sư. Nó bay xuyên qua các bức tường, cầm một thanh kiếm nhỏ và tấn công không ngừng nghỉ.",
      lore: "Nó là hiện thân của sự phiền toái và đau đớn.",
      properties: [
        { name: "Đặc tính", value: "Có thể bay xuyên tường" },
        { name: "Hành vi", value: "Tấn công theo lệnh của Evoker" },
      ],
    },
    "minecraft:ravager": {
      displayName: "§8Kẻ Tàn Phá",
      description:
        "Cỗ máy chiến tranh sống của tộc Illager, một con thú khổng lồ có thể phá hủy mùa màng và hất tung kẻ thù. Tiếng gầm của nó làm rung chuyển mặt đất.",
      lore: "Nó là một cơn thịnh nộ không thể kiềm chế.",
      properties: [
        { name: "Hành vi", value: "Phá hủy lá cây, húc ngã kẻ thù" },
      ],
    },
    "minecraft:phantom": {
      displayName: "§1Phantom",
      description:
        "Bóng ma của bầu trời đêm, bị thu hút bởi sự mất ngủ. Chúng lượn vòng trên cao và lao xuống tấn công những người chơi đã thức quá lâu.",
      lore: "Chúng là hiện thân của sự mệt mỏi và hoang tưởng.",
      properties: [
        {
          name: "Điều kiện xuất hiện",
          value: "Người chơi không ngủ trong 3 ngày",
        },
      ],
    },
    "minecraft:guardian": {
      displayName: "§3Guardian",
      description:
        "Người canh gác của các Di Tích Đại Dương. Con mắt duy nhất của nó bắn ra một chùm tia năng lượng mạnh mẽ, trừng phạt những kẻ xâm phạm lãnh thổ của nó.",
      lore: "Nó là con mắt của biển cả.",
      properties: [
        { name: "Hành vi", value: "Tấn công bằng chùm tia laze" },
        {
          name: "Đặc tính",
          value: "Gai của nó gây sát thương khi bị tấn công",
        },
      ],
    },
    "minecraft:elder_guardian": {
      displayName: "§5Elder Guardian",
      description:
        "Một phiên bản cổ xưa và mạnh mẽ hơn của Guardian, người cai quản Di Tích Đại Dương. Sự hiện diện của nó gây ra một lời nguyền làm chậm việc khai thác, và chùm tia của nó còn mạnh hơn.",
      lore: "Nó là ký ức của một thành phố đã chìm.",
      properties: [
        {
          name: "Hành vi",
          value: "Gây hiệu ứng Mining Fatigue cho người chơi ở gần",
        },
      ],
    },
    "minecraft:shulker": {
      displayName: "§dShulker",
      description:
        "Một sinh vật giống như một chiếc hộp, ẩn mình trong các Thành Phố End. Nó bắn ra những viên đạn ma thuật khiến mục tiêu bay lên không trung.",
      lore: "Nó là một cái bẫy và một người bảo vệ.",
      properties: [
        { name: "Hành vi", value: "Bắn đạn gây hiệu ứng Levitation" },
        { name: "Đặc tính", value: "Ngụy trang thành một khối" },
      ],
    },
    "minecraft:silverfish": {
      displayName: "§0Cá Bạc",
      description:
        "Một loài côn trùng nhỏ bé, khó chịu, ẩn nấp bên trong các khối đá ở các thành trì. Khi bị làm phiền, nó sẽ gọi bầy đàn của mình ra khỏi các bức tường.",
      lore: "Nó là sự mục ruỗng của đá.",
      properties: [
        { name: "Hành vi", value: "Gọi thêm cá bạc từ các khối lân cận" },
        { name: "Môi trường sống", value: "Stronghold" },
      ],
    },
    // == PHẦN 5: SINH VẬT NETHER & END
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   "minecraft:ghast": {
      displayName: "§fGhast",
      description: "Linh hồn đau khổ của Nether. Khi yên tĩnh, nó nhắm mắt trôi nổi như một đám mây buồn bã. Nhưng khi phát hiện con mồi, đôi mắt đỏ rực và miệng của nó sẽ mở ra, báo hiệu một tiếng thét và một quả cầu lửa sắp tới.",
      lore: "Tiếng khóc của nó là nỗi buồn của một chiều không gian bị mắc kẹt.",
      properties: [
        { name: "Hành vi", value: "Bắn cầu lửa phát nổ" },
        { name: "Trạng thái", value: "Hiền hòa khi không có mục tiêu, hung dữ khi tấn công" },
        { name: "Đặc tính", value: "Có thể làm chệch hướng cầu lửa của nó" },
      ],
    },
    "minecraft:magma_cube": {
      displayName: "§cMagma Cube",
      description:
        "Slime của địa ngục, được tạo thành từ dung nham đông đặc. Nó có khả năng nhảy cao hơn Slime thông thường và không bị sát thương khi rơi.",
      lore: "Trái tim của nó là một lõi magma nóng chảy.",
      properties: [
        { name: "Hành vi", value: "Phân chia khi bị tấn công" },
        { name: "Đặc tính", value: "Miễn nhiễm với sát thương lửa và rơi" },
      ],
    },
    "minecraft:blaze": {
      displayName: "§eBlaze",
      description:
        "Một tinh linh lửa, bao bọc trong một cơn lốc các thanh kim loại rực cháy. Nó là người bảo vệ các Pháo Đài Nether, bắn ra những loạt cầu lửa thiêu đốt.",
      lore: "Nó là cơn thịnh nộ của ngọn lửa vĩnh cửu.",
      properties: [
        { name: "Hành vi", value: "Bắn ba quả cầu lửa cùng lúc" },
        { name: "Nguồn cung cấp", value: "Que Quỷ" },
      ],
    },
    "minecraft:wither_skeleton": {
      displayName: "§8Wither Skeleton",
      description:
        "Một phiên bản cao lớn và đáng sợ hơn của Skeleton, cầm một thanh kiếm đá. Cú đánh của nó gây ra hiệu ứng 'Khô Héo', làm mục ruỗng sự sống.",
      lore: "Nó là bóng ma của một chiến binh cổ đại đã ngã xuống.",
      properties: [
        { name: "Hành vi", value: "Gây hiệu ứng Wither" },
        { name: "Nguồn cung cấp", value: "Đầu lâu Wither Skeleton (hiếm)" },
      ],
    },
    "minecraft:piglin": {
      displayName: "§ePiglin",
      description:
        "Một nền văn minh lợn hình người của Nether, bị ám ảnh bởi vàng. Chúng sẽ tấn công nếu bạn không mặc áo giáp vàng, nhưng lại sẵn sàng trao đổi nếu bạn cho chúng vàng.",
      lore: "Vàng là ngôn ngữ và tôn giáo của chúng.",
      properties: [
        {
          name: "Hành vi",
          value: "Thù địch nếu người chơi không mặc giáp vàng",
        },
        { name: "Chức năng", value: "Trao đổi vật phẩm lấy thỏi vàng" },
      ],
    },
    "minecraft:hoglin": {
      displayName: "§cHoglin",
      description:
        "Một con lợn rừng hung dữ của Nether, nguồn thực phẩm chính của các Piglin. Chúng rất hiếu chiến và sẽ hất tung bất cứ ai cản đường.",
      lore: "Nó là cơn thịnh nộ nguyên thủy của Rừng Đỏ Thẫm.",
      properties: [
        { name: "Hành vi", value: "Húc ngã người chơi" },
        { name: "Điểm yếu", value: "Sợ Nấm Cong Vẹo" },
      ],
    },
    "minecraft:strider": {
      displayName: "§cStrider",
      description:
        "Sinh vật duy nhất có thể đi lại trên biển dung nham một cách an toàn. Với khuôn mặt run rẩy vì lạnh khi ở trên cạn, nó là phương tiện di chuyển độc đáo của Nether.",
      lore: "Nó tìm thấy sự ấm áp trong những thứ có thể giết chết người khác.",
      properties: [
        { name: "Chức năng", value: "Phương tiện di chuyển trên dung nham" },
        { name: "Đặc tính", value: "Bị sát thương bởi nước và mưa" },
      ],
    },
    "minecraft:piglin_brute": {
      displayName: "§4Piglin Dã Man",
      description:
        "Chiến binh tinh nhuệ của tộc Piglin, người bảo vệ các Tàn Tích Pháo Đài. Nó không bị phân tâm bởi vàng và sẽ tấn công tất cả những kẻ xâm nhập bằng chiếc rìu vàng của mình.",
      lore: "Lòng trung thành của nó không thể mua được.",
      properties: [
        { name: "Hành vi", value: "Luôn thù địch, không trao đổi" },
        { name: "Môi trường sống", value: "Tàn Tích Pháo Đài" },
      ],
    },

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // == PHẦN 6: TRÙM, VỆ BINH & SINH VẬT ĐẶC BIỆT
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    "minecraft:ender_dragon": {
      displayName: "§5Ender Dragon",
      description:
        "Nữ hoàng của Hư Không, người cai trị chiều không gian End. Một con rồng khổng lồ, thở ra ngọn lửa ma thuật và được chữa lành bởi các tinh thể End. Đánh bại nó là hoàn thành chương cuối của cuộc hành trình.",
      lore: "Nó là cả nhà tù và tù nhân của The End.",
      properties: [
        { name: "Vai trò", value: "Trùm cuối của game" },
        { name: "Chức năng", value: "Tạo cổng thoát khỏi End khi bị đánh bại" },
      ],
    },
    "minecraft:wither": {
      displayName: "§8Wither",
      description:
        "Một thực thể được triệu hồi từ cát linh hồn và đầu lâu, một cơn bão của sự mục ruỗng. Nó bắn ra những chiếc đầu lâu phát nổ, phá hủy mọi thứ trên đường đi và hấp thụ sự sống.",
      lore: "Nó là một lời nguyền do chính người chơi tạo ra.",
      properties: [
        { name: "Vai trò", value: "Trùm tùy chọn (summonable boss)" },
        { name: "Hành vi", value: "Phá hủy các khối, gây hiệu ứng Wither" },
        { name: "Nguồn cung cấp", value: "Sao Nether" },
      ],
    },
    "minecraft:warden": {
      displayName: "§1Warden",
      description:
        "Người cai ngục của Vực Sâu Cổ Đại, một thế lực của thiên nhiên được triệu hồi bởi tiếng hét. Mù lòa nhưng có thể cảm nhận rung động, nó là một trong những sinh vật đáng sợ nhất, có khả năng giết chết người chơi chỉ bằng vài cú đánh.",
      lore: "Nó không phải là một sinh vật, nó là một phản ứng.",
      properties: [
        { name: "Vai trò", value: "Trùm nhỏ (mini-boss)" },
        { name: "Đặc tính", value: "Bị mù, săn mồi bằng âm thanh và mùi" },
        { name: "Hành vi", value: "Bắn ra một chùm tia âm thanh xuyên giáp" },
      ],
    },
    "minecraft:snow_golem": {
      displayName: "§fNgười Tuyết",
      description:
        "Một người bạn được tạo ra từ tuyết và bí ngô. Nó vui vẻ ném những quả cầu tuyết vào kẻ thù, một người bảo vệ mong manh nhưng đầy tinh thần.",
      lore: "Nó mang trong mình niềm vui của ngày tuyết đầu mùa.",
      properties: [
        { name: "Chức năng", value: "Ném cầu tuyết vào quái vật" },
        { name: "Đặc tính", value: "Để lại vệt tuyết trên mặt đất" },
      ],
    },
    "minecraft:armor_stand": {
      displayName: "§6Giá Treo Giáp",
      description:
        "Một hình nhân vô hồn dùng để trưng bày những bộ giáp quý giá. Nó đứng yên, một lời nhắc nhở về những trận chiến đã qua và những cuộc phiêu lưu sắp tới.",
      lore: "Nó mặc lấy vinh quang của người khác.",
      properties: [
        { name: "Chức năng", value: "Trưng bày áo giáp, mũ và vật phẩm" },
      ],
    },
    "minecraft:item_frame": {
      displayName: "§eKhung Vật Phẩm",
      description:
        "Một khung gỗ đơn giản để trưng bày những vật phẩm và chiến lợi phẩm yêu thích. Nó biến một vật phẩm thành một tác phẩm nghệ thuật.",
      lore: "Nó đóng khung một khoảnh khắc, một thành tựu.",
      properties: [
        { name: "Chức năng", value: "Hiển thị một vật phẩm duy nhất" },
      ],
    },
    "minecraft:painting": {
      displayName: "§eBức Tranh",
      description:
        "Một cửa sổ nhìn ra một thế giới khác, được vẽ bằng những điểm ảnh. Nó mang nghệ thuật và bí ẩn vào những bức tường trống rỗng.",
      lore: "Đằng sau một vài bức tranh có những lối đi bí mật.",
      properties: [
        { name: "Chức năng", value: "Khối trang trí, có nhiều biến thể" },
      ],
    },
    "minecraft:minecart": {
      displayName: "§0Xe Mỏ",
      description:
        "Người vận chuyển bằng sắt trên những đường ray. Nó là huyết mạch của các mỏ sâu, chuyên chở cả thợ mỏ và kho báu.",
      lore: "Tiếng kêu cọt kẹt của nó là bài ca của sự khai thác.",
      properties: [
        {
          name: "Chức năng",
          value: "Vận chuyển người chơi và vật phẩm trên đường ray",
        },
      ],
    },
    "minecraft:boat": {
      displayName: "§6Thuyền",
      description:
        "Một phương tiện đơn giản để chinh phục biển cả và sông ngòi. Được làm từ gỗ, nó cho phép người chơi đi đến những vùng đất mới.",
      lore: "Nó là một lời hứa về những gì nằm ở phía bên kia bờ.",
      properties: [
        { name: "Chức năng", value: "Vận chuyển người chơi trên mặt nước" },
      ],
    },
     "minecraft:camel": {
        displayName: "§eLạc Đà",
        description: "Người khổng lồ hiền lành của sa mạc. Với dáng đi khoan thai và khả năng chở hai người, nó là một phương tiện di chuyển tuyệt vời qua những vùng đất khô cằn.",
        lore: "Nó đi qua sa mạc với sự kiên nhẫn của chính những hạt cát.",
        properties: [
            { name: "Chức năng", value: "Chở được hai người chơi" },
            { name: "Đặc tính", value: "Có thể lướt nhanh về phía trước" },
            { name: "Ưu điểm", value: "Chiều cao giúp người cưỡi an toàn trước nhiều quái vật cận chiến" }
        ]
    },
    "minecraft:sniffer": {
        displayName: "§cSniffer (Đánh Hơi)",
        description: "Một sinh vật cổ đại được hồi sinh từ những quả trứng bị lãng quên. Cơ thể khổng lồ và hiền lành của nó dành thời gian để đánh hơi mặt đất, tìm kiếm hạt giống của những loài thực vật đã tuyệt chủng từ lâu.",
        lore: "Nó là một ký ức sống, ngửi thấy mùi hương của một thế giới đã mất.",
        properties: [
            { name: "Chức năng", value: "Đào tìm Hạt Giống Hoa Đuốc (Torchflower) và Cây Nắp Ấm (Pitcher Plant)" },
            { name: "Nguồn gốc", value: "Nở ra từ Trứng Sniffer được tìm thấy trong tàn tích đại dương ấm" }
        ]
    },
    "minecraft:allay": {
        displayName: "§bAllay (Tiên Bay)",
        description: "Một linh hồn thân thiện màu xanh lam, yêu thích âm nhạc và việc thu thập vật phẩm. Nếu bạn đưa cho nó một vật phẩm, nó sẽ tìm kiếm những vật phẩm tương tự gần đó và mang chúng về cho bạn hoặc một Khối Âm Nhạc đang phát.",
        lore: "Nó là một nốt nhạc được ban cho đôi cánh và một trái tim trung thành.",
        properties: [
            { name: "Chức năng", value: "Thu thập và vận chuyển vật phẩm" },
            { name: "Hành vi", value: "Bị thu hút bởi các Khối Âm Nhạc đang hoạt động" }
        ]
    },
    "minecraft:armadillo": {
        displayName: "§6Armadillo (Tatu)",
        description: "Một sinh vật nhỏ bé, nhút nhát của các quần xã sinh vật ấm áp. Khi cảm thấy bị đe dọa bởi chạy nước rút, nó sẽ cuộn tròn thành một khối có mai che chắn, trở nên miễn nhiễm với hầu hết các sát thương.",
        lore: "Chiếc mai của nó là một tấm khiên được dệt từ cát và ánh nắng.",
        properties: [
            { name: "Hành vi", value: "Cuộn tròn khi gặp nguy hiểm" },
            { name: "Nguồn cung cấp", value: "Vảy Tatu (Scute), dùng để chế tạo Giáp Sói" }
        ]
    },
    "minecraft:bogged": {
      displayName: "§2Bogged (Bộ Xương Đầm Lầy)",
      description:
        "Một biến thể mới của Skeleton, bị bao phủ trong rêu và nấm. Lẩn khuất trong các đầm lầy và Phòng Thử Thách, những mũi tên của nó không chỉ gây đau đớn mà còn mang theo nọc độc chết người.",
      lore: "Nó là tiếng rên rỉ của đầm lầy được ban cho hình hài.",
      properties: [
        { name: "Vũ khí", value: "Cung tên độc" },
        { name: "Môi trường sống", value: "Đầm lầy, Phòng Thử Thách (Trial Chambers)" },
        { name: "Điểm yếu", value: "Kéo (Shears) có thể loại bỏ nấm trên người nó" },
      ],
    },
    "minecraft:breeze": {
      displayName: "§bBreeze (Cơn Gió Lốc)",
      description:
        "Một thực thể nguyên tố hỗn loạn, được tạo thành từ gió và sự tinh nghịch. Nó nhảy xung quanh chiến trường như một cơn lốc, bắn ra những luồng Gió Nén (Wind Charge) mạnh mẽ có thể hất tung mục tiêu và kích hoạt các cơ chế redstone.",
      lore: "Nó là một cơn lốc xoáy được ban cho ý chí.",
      properties: [
        { name: "Hành vi", value: "Bắn ra Gió Nén gây hiệu ứng đẩy lùi và kích hoạt block" },
        { name: "Đặc tính", value: "Hầu hết các loại đạn bắn (projectile) sẽ bị nó làm chệch hướng" },
        { name: "Môi trường sống", value: "Phòng Thử Thách (Trial Chambers)" },
      ],
    },
      "minecraft:wandering_trader": {
      displayName: "§bThương Nhân Lang Thang",
      description:
        "Một nhà du hành bí ẩn, xuất hiện và biến mất không báo trước, luôn đi cùng với hai chú lạc đà được trang hoàng lộng lẫy. Hắn mang theo những món hàng kỳ lạ từ khắp các vùng đất xa xôi.",
      lore: "Hắn không có nhà, con đường là bản đồ của hắn.",
      properties: [
        { name: "Chức năng", value: "Bán các vật phẩm tự nhiên và hiếm" },
        { name: "Hành vi", value: "Uống thuốc tàng hình vào ban đêm để trốn quái vật" },
        { name: "Đặc tính", value: "Sẽ biến mất sau một khoảng thời gian" },
      ],
    },
    "minecraft:trader_llama": {
      displayName: "§eLạc Đà Chở Hàng",
      description:
        "Người bạn đồng hành và vệ sĩ trung thành của Thương Nhân Lang Thang. Được trang trí bằng những tấm thảm độc đáo, nó sẽ không ngần ngại nhổ nước bọt vào bất kỳ mối đe dọa nào đến gần chủ nhân của nó.",
      lore: "Lưng của nó mang theo kho báu, còn trái tim nó mang theo lòng trung thành.",
      properties: [
        { name: "Chức năng", value: "Vệ sĩ của Thương Nhân Lang Thang" },
        { name: "Hành vi", value: "Thù địch với quái vật và bất cứ ai tấn công chủ" },
      ],
    },
    "minecraft:zombie_villager": {
      displayName: "§2Zombie Dân Làng",
      description:
        "Bi kịch của một cộng đồng. Một dân làng đã gục ngã trước bóng tối, nhưng một tia hy vọng vẫn còn. Trí tuệ bị chôn vùi của họ vẫn có thể được cứu rỗi bằng một nghi thức chữa lành cổ xưa.",
      lore: "Đằng sau tiếng gầm gừ đó là một tiếng 'hmm' bị lãng quên.",
      properties: [
        { name: "Đặc tính", value: "Giữ lại một phần ngoại hình của nghề nghiệp cũ" },
        { name: "Hy vọng", value: "Có thể được chữa lành bằng Quả Táo Vàng và Thuốc Suy Yếu" },
        { name: "Lòng biết ơn", value: "Sẽ giảm giá sâu sau khi được chữa khỏi" },
      ],
    },
       "minecraft:illusioner": {
      displayName: "§dIllusioner (Ảo Thuật Sư)",
      description:
        "Một bậc thầy về lừa dối của tộc Illager, chỉ tồn tại trong các tệp của trò chơi. Hắn không tấn công trực diện mà tạo ra các ảo ảnh của chính mình để làm con mồi bối rối, trong khi bắn những mũi tên từ một cây cung ma thuật.",
      lore: "Làm sao bạn có thể chiến đấu với một kẻ mà bạn không thể tìm thấy?",
      properties: [
        { name: "Trạng thái", value: "Không được sử dụng trong game (Unused Mob)" },
        { name: "Kỹ năng", value: "Tạo ra các bản sao ảo, gây mù lòa cho mục tiêu" },
        { name: "Vũ khí", value: "Cung" },
      ],
    },
        "minecraft:glow_squid": {
      displayName: "§bMực Phát Sáng",
      description: "Một sinh vật huyền ảo của những vực nước tối tăm. Nó không tạo ra ánh sáng, mà chỉ khiến bản thân phát sáng, như một ngôi sao di động trong lòng đại dương. Túi mực của nó cũng mang theo ánh sáng kỳ diệu đó.",
      lore: "Nó là một giấc mơ của vực sâu.",
      properties: [
        { name: "Nguồn cung cấp", value: "Túi Mực Phát Sáng" }
      ]
    },
    "minecraft:cod": {
      displayName: "§fCá Tuyết",
      description: "Loài cá phổ biến nhất trong các đại dương, bơi thành từng đàn. Chúng là một nguồn thực phẩm đáng tin cậy cho những thủy thủ và những chú gấu Bắc Cực.",
      lore: "Chúng là bạc của biển cả.",
      properties: [{ name: "Hành vi", value: "Bơi theo đàn" }]
    },
    "minecraft:salmon": {
      displayName: "§cCá Hồi",
      description: "Một loài cá mạnh mẽ, thường được tìm thấy ở các con sông và đại dương lạnh giá. Chúng có thể bơi ngược dòng nước, một hành trình đầy nỗ lực để trở về cội nguồn.",
      lore: "Nó mang trong mình sức mạnh của dòng chảy.",
      properties: [{ name: "Hành vi", value: "Có thể bơi ngược thác nước" }]
    },
    "minecraft:pufferfish": {
      displayName: "§eCá Nóc",
      description: "Một sinh vật biển nhỏ bé với cơ chế phòng thủ đáng gờm. Khi gặp nguy hiểm, nó sẽ phồng lên, để lộ ra những chiếc gai độc, sẵn sàng trừng phạt bất cứ kẻ nào dám đến gần.",
      lore: "Một lời cảnh báo sống: Đừng chọc giận những gì nhỏ bé.",
      properties: [
        { name: "Hành vi", value: "Phồng lên và gây độc khi người chơi đến gần" }
      ]
    },
    "minecraft:tropical_fish": {
      displayName: "§6á Nhiệt Đới",
      description: "Vũ điệu của màu sắc dưới làn nước. Với hàng nghìn biến thể về hình dạng và màu sắc, chúng là những viên ngọc sống của các rạn san hô.",
      lore: "Mỗi con cá là một tác phẩm nghệ thuật độc nhất.",
      properties: [
        { name: "Đặc tính", value: "Có 2700 biến thể được tạo ra tự nhiên" }
      ]
    },
    "minecraft:bat": {
        displayName: "§0Dơi",
        description: "Sinh vật nhỏ bé của màn đêm, thường treo ngược mình trên trần các hang động. Tiếng kêu chít chít của nó là âm thanh duy nhất phá vỡ sự im lặng của những nơi sâu thẳm.",
        lore: "Nó là một bóng tối biết bay.",
        properties: [
            { name: "Đặc tính", value: "Vô hại, chỉ bay xung quanh và kêu" }
        ]
    },
     "minecraft:endermite": {
      displayName: "§5Endermite",
      description: "Một sinh vật ký sinh nhỏ bé, đôi khi xuất hiện từ sự méo mó của không gian khi một Enderman dịch chuyển hoặc một viên Ngọc Ender được ném đi. Chúng là kẻ thù tự nhiên của Enderman.",
      lore: "Nó là một lỗi trong ma trận của sự dịch chuyển.",
      properties: [
        { name: "Hành vi", value: "Bị Enderman tấn công" },
        { name: "Tuổi thọ", value: "Tự biến mất sau một thời gian ngắn" }
      ]
    },
    "minecraft:zoglin": {
      displayName: "§cZoglin",
      description: "Sự điên loạn hóa thành xương thịt. Một Hoglin đi lạc vào Overworld sẽ biến thành một Zoglin - một sinh vật xác sống không ngừng tấn công mọi thứ nó nhìn thấy, kể cả đồng loại cũ của nó.",
      lore: "Nó là một cơn thịnh nộ không còn lý trí.",
      properties: [
        { name: "Hành vi", value: "Tấn công tất cả các sinh vật khác một cách mù quáng" }
      ]
    },
    "minecraft:item_frame": { // Có thể bạn đã có mục này, tôi thêm glow_item_frame
      displayName: "§eKhung Vật Phẩm",
      description: "Một khung gỗ đơn giản để trưng bày những vật phẩm và chiến lợi phẩm yêu thích. Một phiên bản phát sáng có thể được tạo ra bằng Túi Mực Phát Sáng.",
      lore: "Nó đóng khung một khoảnh khắc, một thành tựu.",
      properties: [
        { name: "Chức năng", value: "Hiển thị một vật phẩm duy nhất" },
        { name: "Biến thể", value: "Khung Vật Phẩm Phát Sáng" }
      ]
    },
    "minecraft:end_crystal": {
      displayName: "§dTinh Thể End",
      description: "Trái tim sức mạnh của Ender Dragon. Những tinh thể này liên tục chữa lành cho con rồng, và phải bị phá hủy trước khi nó có thể bị đánh bại. Chúng cũng là chìa khóa để hồi sinh nó.",
      lore: "Nó là một quả tim được tạo ra từ Hư Không và Thủy Tinh.",
      properties: [
        { name: "Chức năng", value: "Chữa lành cho Ender Dragon, có thể dùng để hồi sinh rồng" },
        { name: "Nguy hiểm", value: "Phát nổ dữ dội khi bị phá hủy" }
      ]
    },
    "minecraft:arrow": {
      displayName: "§fMũi Tên",
      description: "Sứ giả của cây cung, một đường thẳng chết chóc bay trong không khí. Nó có thể được tẩm thêm các loại thuốc để mang lại những hiệu ứng bất ngờ cho mục tiêu.",
      lore: "Một tiếng rít, sau đó là sự im lặng.",
      properties: [
        { name: "Chức năng", value: "Đạn cho Cung và Nỏ" }
      ]
    },
    "minecraft:lightning_bolt": {
      displayName: "§eTia Sét",
      description: "Cơn thịnh nộ của bầu trời được ngưng tụ lại thành một khoảnh khắc ánh sáng chói lòa và âm thanh long trời lở đất. Nó có sức mạnh biến đổi một số sinh vật và gây ra hỏa hoạn.",
      lore: "Một vết sẹo trên bầu trời.",
      properties: [
        { name: "Hiệu ứng", value: "Gây cháy, biến Creeper thành Creeper tích điện, Dân làng thành Phù thủy, Heo thành Piglin xác sống" }
      ]
    },
    "minecraft:experience_orb": {
      displayName: "§aQuả Cầu Kinh Nghiệm",
      description: "Bản chất của sự sống và tri thức được cô đọng lại. Những quả cầu nhỏ bé này bị hút về phía bạn, truyền cho bạn sức mạnh để sửa chữa và phù phép trang bị.",
      lore: "Những mảnh vỡ của một linh hồn, những bài học đã được học.",
      properties: [
        { name: "Chức năng", value: "Cung cấp điểm kinh nghiệm cho người chơi" }
      ]
    },
    "minecraft:tadpole": {
      displayName: "§2Nòng Nọc",
      description: "Sự khởi đầu của một bài hát. Sinh vật mỏng manh này là giai đoạn đầu tiên trong vòng đời của một con ếch, một dấu chấm phẩy biết bơi trong mã nguồn của sự sống. Nó lớn lên theo thời gian, biến đổi tùy thuộc vào nhiệt độ của nơi nó trưởng thành.",
      lore: "Nó mang trong mình lời hứa về một bài ca của mưa.",
      properties: [
        { name: "Chức năng", value: "Phát triển thành Ếch (Frog)" },
        { name: "Đặc tính", value: "Loại Ếch trưởng thành phụ thuộc vào quần xã sinh vật (ấm, lạnh, ôn đới)" },
        { name: "Điểm yếu", value: "Cực kỳ mỏng manh, có thể được thu thập bằng Xô Nước" },
      ],
    },
  },
  blocks: {
    // =================================================================
    // == BLOCKS CHỨC NĂNG (FUNCTIONAL BLOCKS)
    // =================================================================
    "minecraft:crafting_table": {
      displayName: "§6Bàn Chế Tạo",
      description:
        "Trái tim của sự sáng tạo, một bàn thờ nơi ý tưởng thô sơ được định hình thành thực tế. Bề mặt của nó đã chứng kiến sự ra đời của vô số kỳ quan.",
      lore: "Những ký hiệu trên đó là một ngôn ngữ nguyên thủy của sự sáng tạo.",
      properties: [{ name: "Chức năng", value: "Tạo vật phẩm 3x3" }],
    },
    "minecraft:furnace": {
      displayName: "§0Lò Nung",
      description:
        "Dạ dày của sự biến đổi, nơi nhiệt độ biến vật chất thành dạng tinh khiết hơn. Tiếng kêu của nó là bài hát của sự thay đổi.",
      lore: "Ngọn lửa bên trong nó không bao giờ thực sự tắt, chỉ đang chờ đợi.",
      properties: [
        { name: "Chức năng", value: "Nung chảy quặng và thực phẩm" },
      ],
    },
    "minecraft:blast_furnace": {
      displayName: "§8Lò Luyện Kim",
      description:
        "Một lò nung được tối ưu hóa, trái tim của nó đập nhanh hơn, chỉ dành cho việc tinh luyện kim loại. Nó là hiện thân của hiệu quả công nghiệp.",
      lore: "Nó biến đá thành thép với một tốc độ đáng kinh ngạc.",
      properties: [
        { name: "Chức năng", value: "Nung chảy quặng nhanh gấp đôi" },
      ],
    },
    "minecraft:smoker": {
      displayName: "§6Lò Hun Khói",
      description:
        "Bếp trưởng của nhà bếp, được thiết kế để chế biến thực phẩm một cách hoàn hảo. Mùi thơm tỏa ra từ nó là lời hứa về một bữa ăn thịnh soạn.",
      lore: "Nó truyền hương vị của lửa vào từng thớ thịt.",
      properties: [
        { name: "Chức năng", value: "Nấu chín thức ăn nhanh gấp đôi" },
      ],
    },
    "minecraft:chest": {
      displayName: "§eRương",
      description:
        "Một người bảo vệ im lặng của kho báu. Nó giữ những gì quý giá, bảo vệ chúng khỏi sự tàn phá của thời gian và những bàn tay tò mò.",
      lore: "Mỗi chiếc rương đều có một câu chuyện về những gì nó chứa đựng.",
      properties: [{ name: "Chức năng", value: "Lưu trữ 27 ô vật phẩm" }],
    },
    "minecraft:barrel": {
      displayName: "§6Thùng",
      description:
        "Một giải pháp lưu trữ mộc mạc, có thể mở ngay cả khi bị chặn phía trên. Nó là sự lựa chọn của ngư dân và người nấu rượu.",
      lore: "Tiếng cọt kẹt khi mở nắp là âm thanh của sự ngăn nắp.",
      properties: [{ name: "Chức năng", value: "Lưu trữ 27 ô vật phẩm" }],
    },
    "minecraft:enchanting_table": {
      displayName: "§5Bàn Phù Phép",
      description:
        "Một mối liên kết giữa thế giới vật chất và huyền bí, cho phép những lời thì thầm của vũ trụ được khắc vào trang bị.",
      lore: "Ngôn ngữ trong cuốn sách của nó không thể dịch được, chỉ có thể cảm nhận.",
      properties: [
        { name: "Chức năng", value: "Phù phép vật phẩm" },
        { name: "Sức mạnh", value: "Tăng cường bởi giá sách" },
      ],
    },
    "minecraft:anvil": {
      displayName: "§8Cái Đe",
      description:
        "Một minh chứng cho sự bền bỉ. Nó định hình lại kim loại, sửa chữa những gì đã hỏng và đặt tên cho những gì chưa có tên, tất cả đều phải trả giá bằng kinh nghiệm.",
      lore: "Nó mang trên mình những vết sẹo của mọi nhát búa đã giáng xuống.",
      properties: [
        { name: "Chức năng", value: "Sửa chữa, kết hợp và đổi tên vật phẩm" },
      ],
    },
    "minecraft:brewing_stand": {
      displayName: "§eGiàn Pha Thuốc",
      description:
        "Bàn làm việc của nhà giả kim, nơi năng lượng của Nether được chưng cất thành các loại độc dược mạnh mẽ.",
      lore: "Mỗi bong bóng bốc lên là một khả năng đang được sinh ra.",
      properties: [{ name: "Chức năng", value: "Pha chế thuốc" }],
    },
    "minecraft:cauldron": {
      displayName: "§0Cái Vạc",
      description:
        "Một chiếc chậu sắt lớn, dùng để chứa chất lỏng. Từ nước trong lành đến dung nham nóng chảy, hay những lọ thuốc đang sôi sục.",
      lore: "Nó là một cái giếng nhỏ trong nhà.",
      properties: [
        { name: "Chức năng", value: "Chứa nước, dung nham, thuốc, bột tuyết" },
      ],
    },
    "minecraft:ender_chest": {
      displayName: "§5Rương Ender",
      description:
        "Một chiếc rương vượt ra ngoài không gian. Những gì được đặt bên trong không ở đó, mà ở mọi nơi cùng một lúc, chỉ có thể truy cập bởi người sở hữu.",
      lore: "Bên trong nó là một túi không gian, được dệt từ chính Hư Không.",
      properties: [
        { name: "Chức năng", value: "Kho chứa đồ cá nhân, liên kết" },
      ],
    },
    "minecraft:shulker_box": {
      displayName: "§dHộp Shulker",
      description:
        "Một chiếc rương đã học được bí mật của việc di chuyển. Nó gói ghém không gian bên trong mình, cho phép mang cả kho báu đi khắp nơi.",
      lore: "Vỏ của nó thì thầm những câu chuyện về Thành Phố End.",
      properties: [
        {
          name: "Chức năng",
          value: "Lưu trữ vật phẩm, không rơi ra khi bị phá",
        },
      ],
    },
    "minecraft:beacon": {
      displayName: "§bĐèn Hiệu",
      description:
        "Một thấu kính của năng lượng tinh tú, tập trung sức mạnh từ một kim tự tháp hy sinh để chiếu một chùm ánh sáng vào thiên đường, ban phước lành cho những người xung quanh.",
      lore: "Ánh sáng của nó là một lời cầu nguyện gửi đến các vì sao.",
      properties: [
        {
          name: "Chức năng",
          value: "Cung cấp hiệu ứng trạng thái trong khu vực",
        },
      ],
    },
    "minecraft:jukebox": {
      displayName: "§6Hộp Nhạc",
      description:
        "Một chiếc hộp gỗ biến những đĩa nhạc im lặng thành giai điệu. Âm nhạc của nó có thể lấp đầy sự im lặng của những nơi cô đơn nhất.",
      lore: "Nó chơi lại ký ức của thế giới.",
      properties: [{ name: "Chức năng", value: "Phát đĩa nhạc" }],
    },
    "minecraft:note_block": {
      displayName: "§6Khối Âm Nhạc",
      description:
        "Một khối gỗ có thể hát. Mỗi cú chạm là một nốt nhạc, và loại vật liệu bên dưới nó quyết định nhạc cụ.",
      lore: "Nó cho phép các nhà xây dựng trở thành nhạc sĩ.",
      properties: [
        { name: "Chức năng", value: "Phát ra âm thanh có thể tùy chỉnh" },
      ],
    },

    // =================================================================
    // == QUẶNG VÀ KHOÁNG SẢN (ORES & MINERALS)
    // =================================================================
    "minecraft:coal_ore": {
      displayName: "§8Quặng Than",
      description:
        "Bóng tối bị nén lại, nhiên liệu của những ngọn lửa đầu tiên và cuộc cách mạng công nghiệp.",
      lore: "Nó là ánh sáng mặt trời bị chôn vùi từ một thời đại đã qua.",
    },
    "minecraft:iron_ore": {
      displayName: "§fQuặng Sắt",
      description:
        "Huyết mạch của Trái đất, nền tảng của các công cụ và áo giáp chắc chắn.",
      lore: "Nó khao khát ngọn lửa của lò nung.",
    },
    "minecraft:copper_ore": {
      displayName: "§cQuặng Đồng",
      description:
        "Mạch máu màu xanh của đá, một kim loại của sự chuyển tiếp. Nó thay đổi theo thời gian, khoác lên mình lớp gỉ sét của lịch sử.",
      lore: "Nó mang trong mình câu chuyện về mưa và gió.",
    },
    "minecraft:gold_ore": {
      displayName: "§eQuặng Vàng",
      description:
        "Sự quyến rũ của mặt trời bị mắc kẹt trong đá. Đẹp đẽ nhưng mềm yếu, một chất dẫn tuyệt vời cho cả điện và ma thuật.",
      lore: "Các Piglin tôn thờ ánh sáng của nó.",
    },
    "minecraft:lapis_ore": {
      displayName: "§1Quặng Lưu Ly",
      description:
        "Một mảnh của bầu trời đêm bị chôn vùi, chứa đựng ma thuật của những điều bí ẩn.",
      lore: "Nó là loại bột màu được các pháp sư sử dụng để viết nên các bùa chú.",
    },
    "minecraft:redstone_ore": {
      displayName: "§cQuặng Redstone",
      description:
        "Nhịp đập của Trái đất, một mạch máu rực sáng mang năng lượng và logic. Nó là tâm trí của các cỗ máy.",
      lore: "Nó sáng lên khi được chạm vào, như thể nó còn sống.",
    },
    "minecraft:diamond_ore": {
      displayName: "§bQuặng Kim Cương",
      description:
        "Ánh sáng hy vọng lấp lánh trong bóng tối. Biểu tượng của sự giàu có, quyền lực và sự không thể phá hủy.",
      lore: "Các thợ mỏ cổ đại tin rằng mỗi viên kim cương là một giọt nước mắt hóa đá của một ngôi sao.",
      properties: [
        { name: "Độ hiếm", value: "Rất hiếm" },
        { name: "Công cụ", value: "Cuốc Sắt trở lên" },
      ],
    },
    "minecraft:emerald_ore": {
      displayName: "§2Quặng Ngọc Lục Bảo",
      description:
        "Viên ngọc của thương mại, chỉ được tìm thấy dưới những ngọn núi hùng vĩ. Màu xanh của nó là màu của sự sống và sự tin tưởng.",
      lore: "Dân làng coi nó là thiêng liêng, một biểu tượng của cộng đồng.",
    },
    "minecraft:nether_quartz_ore": {
      displayName: "§fQuặng Thạch Anh Nether",
      description:
        "Những tinh thể ánh sáng bị mắc kẹt trong đá địa ngục. Chúng là những mảnh vỡ của trật tự trong một chiều không gian hỗn loạn.",
      lore: "Nó là nguồn năng lượng cho những cỗ máy phức tạp.",
    },
    "minecraft:nether_gold_ore": {
      displayName: "§eQuặng Vàng Nether",
      description:
        "Vàng đã bị biến chất bởi sức nóng của Nether, trở nên giòn và dễ vỡ. Các Piglin bị ám ảnh bởi việc thu thập từng mảnh vụn của nó.",
      lore: "Nó không phải là sự giàu có, mà là một sự ám ảnh.",
    },
    "minecraft:ancient_debris": {
      displayName: "§4Mảnh Vụn Cổ Đại",
      description:
        "Tàn tích của một nền văn minh đã sụp đổ, bị nén dưới sức nặng của Nether. Nó là vật liệu duy nhất chịu được ngọn lửa vĩnh cửu.",
      lore: "Nó chứa đựng những tiếng vọng của một thời đại đã mất.",
      properties: [
        { name: "Độ hiếm", value: "Cực hiếm" },
        { name: "Công cụ", value: "Cuốc Kim Cương trở lên" },
      ],
    },

    // =================================================================
    // == CÁC LOẠI GỖ (WOOD TYPES)
    // =================================================================

    // --- GỖ SỒI (OAK) ---
    "minecraft:oak_log": {
      displayName: "§6Gỗ Sồi",
      description:
        "Xương sống của khu rừng ôn đới. Sức mạnh của nó đã xây dựng nên những ngôi nhà và công cụ đầu tiên.",
      lore: "Các vòng tuổi của nó kể một câu chuyện về thời gian.",
    },
    "minecraft:oak_planks": {
      displayName: "§6Ván Gỗ Sồi",
      description:
        "Gỗ sồi được xẻ thành những tấm ván chắc chắn và đáng tin cậy. Vật liệu xây dựng cơ bản, mang vẻ đẹp vượt thời gian.",
      lore: "Nền tảng của vô số công trình.",
    },
    "minecraft:oak_stairs": {
      displayName: "§6Bậc Thang Gỗ Sồi",
      description:
        "Một con đường đi lên, được tạo ra từ gỗ sồi đáng tin cậy. Mỗi bước chân là một sự tiến bộ.",
      lore: "Chúng dẫn đến những tầm cao mới.",
    },
    "minecraft:oak_slab": {
      displayName: "§6Phiến Gỗ Sồi",
      description:
        "Một nửa chiều cao, nhưng vẫn giữ nguyên sự vững chãi của gỗ sồi. Hoàn hảo cho những lối đi tinh tế và mái nhà.",
      lore: "Ít hơn đôi khi lại là nhiều hơn.",
    },
    "minecraft:oak_fence": {
      displayName: "§6Hàng Rào Gỗ Sồi",
      description:
        "Một ranh giới đơn giản được dựng lên từ gỗ sồi. Nó phân định không gian, bảo vệ mùa màng và giữ an toàn cho gia súc.",
      lore: "Nó biến một mảnh đất thành một ngôi nhà.",
    },
    "minecraft:oak_fence_gate": {
      displayName: "§6Cổng Hàng Rào Gỗ Sồi",
      description:
        "Một lối đi qua ranh giới. Cánh cổng gỗ sồi đơn giản mời gọi hoặc ngăn cản, tùy thuộc vào người điều khiển.",
      lore: "Nó là một lời chào hoặc một lời tạm biệt.",
    },
    "minecraft:oak_door": {
      displayName: "§6Cửa Gỗ Sồi",
      description:
        "Ngưỡng cửa của một ngôi nhà, được làm từ gỗ sồi cổ điển. Nó ngăn cách sự an toàn bên trong và sự hoang dã bên ngoài.",
      lore: "Mỗi lần mở ra là một cuộc phiêu lưu mới.",
    },
    "minecraft:oak_trapdoor": {
      displayName: "§6Cửa Sập Gỗ Sồi",
      description:
        "Một cánh cửa nằm ngang, che giấu những lối đi bí mật xuống hầm hoặc lên gác mái.",
      lore: "Nó là người canh giữ những bí mật.",
    },

    // --- GỖ VÂN SAM (SPRUCE) ---
    "minecraft:spruce_log": {
      displayName: "§6Gỗ Vân Sam",
      description:
        "Gỗ của những khu rừng taiga lạnh giá, cao vút. Màu sẫm của nó mang lại cảm giác ấm cúng và bền bỉ.",
      lore: "Mùi hương của nó là mùi của mùa đông.",
    },
    "minecraft:spruce_planks": {
      displayName: "§6Ván Gỗ Vân Sam",
      description:
        "Những tấm ván sẫm màu, mang hơi thở của vùng taiga. Hoàn hảo cho những căn nhà gỗ ấm cúng giữa tuyết trắng.",
      lore: "Chúng giữ lại hơi ấm của ngọn lửa.",
    },
    "minecraft:spruce_stairs": {
      displayName: "§6Bậc Thang Gỗ Vân Sam",
      description:
        "Những bậc thang chắc chắn, màu sẫm, dẫn lối lên những căn gác xép hoặc vọng lâu nhìn ra khu rừng tuyết.",
      lore: "Chúng mang trong mình sự tĩnh lặng của rừng rậm.",
    },
    "minecraft:spruce_slab": {
      displayName: "§6Phiến Gỗ Vân Sam",
      description:
        "Phiến gỗ vân sam sẫm màu, lý tưởng để tạo ra các chi tiết kiến trúc mộc mạc và vững chãi.",
      lore: "Một nét chấm phá của vùng đất phương Bắc.",
    },
    "minecraft:spruce_fence": {
      displayName: "§6Hàng Rào Gỗ Vân Sam",
      description:
        "Một hàng rào chắc chắn, sẫm màu, gợi lên hình ảnh của những trang trại ở vùng biên giới.",
      lore: "Nó đứng vững trước những cơn gió lạnh.",
    },
    "minecraft:spruce_fence_gate": {
      displayName: "§6Cổng Hàng Rào Gỗ Vân Sam",
      description:
        "Cánh cổng mộc mạc mở ra con đường dẫn vào khu rừng vân sam sâu thẳm.",
      lore: "Một lời mời gọi đến với sự hoang dã.",
    },
    "minecraft:spruce_door": {
      displayName: "§6Cửa Gỗ Vân Sam",
      description:
        "Cánh cửa nặng và chắc chắn, như thể được làm cho một ngôi nhà của thợ săn. Nó bảo vệ khỏi cái lạnh của đêm dài.",
      lore: "Đằng sau nó là sự ấm áp của lò sưởi.",
    },
    "minecraft:spruce_trapdoor": {
      displayName: "§6Cửa Sập Gỗ Vân Sam",
      description:
        "Một cửa sập chắc chắn, hoàn hảo để che đậy một kho chứa cá hoặc một lối thoát hiểm bí mật.",
      lore: "Nó che giấu những gì cần được bảo vệ.",
    },

    // --- GỖ BẠCH DƯƠNG (BIRCH) ---
    "minecraft:birch_log": {
      displayName: "§fGỗ Bạch Dương",
      description:
        "Thân cây sáng màu với những vệt đen đặc trưng. Vẻ đẹp thanh lịch của nó mang lại ánh sáng cho những khu rừng rậm rạp.",
      lore: "Vỏ của nó giống như những trang giấy ghi lại lịch sử của khu rừng.",
    },
    "minecraft:birch_planks": {
      displayName: "§fVán Gỗ Bạch Dương",
      description:
        "Những tấm ván sáng màu và sạch sẽ. Chúng mang lại cảm giác hiện đại và thoáng đãng cho bất kỳ công trình nào.",
      lore: "Chúng phản chiếu ánh sáng và xua tan bóng tối.",
    },
    "minecraft:birch_stairs": {
      displayName: "§fBậc Thang Gỗ Bạch Dương",
      description:
        "Những bậc thang thanh lịch, sáng màu, như thể được tạo ra cho một thư viện hoặc một phòng trưng bày nghệ thuật.",
      lore: "Mỗi bước đi đều nhẹ nhàng và thanh thoát.",
    },
    "minecraft:birch_slab": {
      displayName: "§fPhiến Gỗ Bạch Dương",
      description:
        "Phiến gỗ bạch dương nhạt màu, hoàn hảo để tạo ra những đồ nội thất hiện đại và những bề mặt sáng sủa.",
      lore: "Vẻ đẹp nằm trong sự đơn giản.",
    },
    "minecraft:birch_fence": {
      displayName: "§fHàng Rào Gỗ Bạch Dương",
      description:
        "Một hàng rào sáng màu, mang lại vẻ đẹp tinh tế cho những khu vườn và sân hiên.",
      lore: "Nó không phải để ngăn cản, mà là để trang trí.",
    },
    "minecraft:birch_fence_gate": {
      displayName: "§fCổng Hàng Rào Gỗ Bạch Dương",
      description:
        "Cánh cổng sáng sủa, chào đón bạn vào một không gian yên bình và thanh lịch.",
      lore: "Nó mở ra một khu vườn của sự tĩnh lặng.",
    },
    "minecraft:birch_door": {
      displayName: "§fCửa Gỗ Bạch Dương",
      description:
        "Cánh cửa sáng màu mang lại cảm giác thân thiện và cởi mở. Nó là cánh cửa của một ngôi nhà hiện đại và đầy ánh sáng.",
      lore: "Nó mời gọi ánh nắng vào nhà.",
    },
    "minecraft:birch_trapdoor": {
      displayName: "§fCửa Sập Gỗ Bạch Dương",
      description:
        "Một cửa sập trang nhã, thường được dùng làm cửa sổ chớp hoặc các chi tiết trang trí tinh tế.",
      lore: "Nó thêm một nét duyên dáng cho các bức tường.",
    },

    // --- GỖ RỪNG (JUNGLE) ---
    "minecraft:jungle_log": {
      displayName: "§6Gỗ Rừng",
      description:
        "Gỗ từ những cây khổng lồ trong rừng rậm, phủ đầy rêu và dây leo. Nó mang trong mình sức sống mãnh liệt của vùng nhiệt đới.",
      lore: "Nó vẫn còn nghe thấy tiếng gọi của các loài vẹt.",
    },
    "minecraft:jungle_planks": {
      displayName: "§6Ván Gỗ Rừng",
      description:
        "Những tấm ván có màu hồng cam đặc trưng, mang theo hơi ẩm và sự ấm áp của rừng rậm.",
      lore: "Chúng có khả năng chống lại sự ẩm ướt.",
    },
    "minecraft:jungle_stairs": {
      displayName: "§6Bậc Thang Gỗ Rừng",
      description:
        "Những bậc thang dẫn lên những ngôi nhà trên cây hoặc những ngôi đền cổ bị lãng quên trong rừng sâu.",
      lore: "Chúng đã chứng kiến nhiều nhà thám hiểm.",
    },
    "minecraft:jungle_slab": {
      displayName: "§6Phiến Gỗ Rừng",
      description:
        "Phiến gỗ nhiệt đới, hoàn hảo cho việc xây dựng những cây cầu treo và sàn nhà trong một môi trường ẩm ướt.",
      lore: "Nó mang trong mình sự dẻo dai.",
    },
    "minecraft:jungle_fence": {
      displayName: "§6Hàng Rào Gỗ Rừng",
      description:
        "Một hàng rào mang màu sắc ấm áp, lý tưởng để vây quanh một đồn điền cacao hoặc một khu vườn nhiệt đới.",
      lore: "Nó hòa mình vào thảm thực vật xung quanh.",
    },
    "minecraft:jungle_fence_gate": {
      displayName: "§6Cổng Hàng Rào Gỗ Rừng",
      description:
        "Cánh cổng mở ra một thế giới của cây cối rậm rạp và những âm thanh kỳ lạ.",
      lore: "Một cuộc phiêu lưu đang chờ đợi.",
    },
    "minecraft:jungle_door": {
      displayName: "§6Cửa Gỗ Rừng",
      description:
        "Một cánh cửa chắc chắn với một ô cửa sổ nhỏ, được thiết kế để chịu được khí hậu khắc nghiệt của rừng rậm.",
      lore: "Nó bảo vệ khỏi những gì ẩn nấp trong bóng tối.",
    },
    "minecraft:jungle_trapdoor": {
      displayName: "§6Cửa Sập Gỗ Rừng",
      description:
        "Một cửa sập chắc chắn, trông giống như một tấm lưới, cho phép không khí lưu thông trong những ngôi nhà trên cây.",
      lore: "Nó để cho làn gió của rừng rậm thổi qua.",
    },

    // --- GỖ KEO (ACACIA) ---
    "minecraft:acacia_log": {
      displayName: "§cGỗ Keo",
      description:
        "Gỗ từ những cây keo mọc trên các thảo nguyên nắng cháy, với lớp vỏ xám và lõi màu cam rực rỡ.",
      lore: "Nó mang màu sắc của hoàng hôn châu Phi.",
    },
    "minecraft:acacia_planks": {
      displayName: "§cVán Gỗ Keo",
      description:
        "Những tấm ván màu cam rực rỡ, mang lại sự sống động và năng lượng cho mọi công trình.",
      lore: "Màu sắc của chúng không bao giờ phai nhạt.",
    },
    "minecraft:acacia_stairs": {
      displayName: "§cBậc Thang Gỗ Keo",
      description:
        "Những bậc thang màu cam nổi bật, như thể được tắm trong ánh nắng hoàng hôn của thảo nguyên.",
      lore: "Chúng dẫn đến một nơi đầy ấm áp.",
    },
    "minecraft:acacia_slab": {
      displayName: "§cPhiến Gỗ Keo",
      description:
        "Phiến gỗ keo màu cam sáng, tạo ra những điểm nhấn kiến trúc táo bạo và đầy sức sống.",
      lore: "Một tia nắng trong thiết kế của bạn.",
    },
    "minecraft:acacia_fence": {
      displayName: "§cHàng Rào Gỗ Keo",
      description:
        "Một hàng rào màu cam rực rỡ, nổi bật trên nền cảnh quan và tạo ra một tuyên bố mạnh mẽ.",
      lore: "Nó không thể bị bỏ qua.",
    },
    "minecraft:acacia_fence_gate": {
      displayName: "§cCổng Hàng Rào Gỗ Keo",
      description:
        "Cánh cổng màu cam chào đón bạn đến một nơi tràn đầy năng lượng và sự sáng tạo.",
      lore: "Nó là một lời tuyên bố về phong cách.",
    },
    "minecraft:acacia_door": {
      displayName: "§cCửa Gỗ Keo",
      description:
        "Một cánh cửa hiện đại, với những đường nét táo bạo và màu cam đặc trưng, thể hiện sự tự tin và phong cách.",
      lore: "Đằng sau nó là một không gian đầy cảm hứng.",
    },
    "minecraft:acacia_trapdoor": {
      displayName: "§cCửa Sập Gỗ Keo",
      description:
        "Một cửa sập với các thanh ngang dày, mang lại vẻ ngoài mạnh mẽ và hiện đại.",
      lore: "Nó là một sự kết hợp giữa chức năng và nghệ thuật.",
    },

    // --- GỖ SỒI SẪM (DARK OAK) ---
    "minecraft:dark_oak_log": {
      displayName: "§4Gỗ Sồi Sẫm",
      description:
        "Gỗ từ những cây sồi sẫm mọc thành cụm trong các khu rừng rậm rạp. Thân cây dày và màu sắc đậm của nó tạo ra một cảm giác uy nghiêm.",
      lore: "Những khu rừng này ẩn chứa nhiều bí mật.",
    },
    "minecraft:dark_oak_planks": {
      displayName: "§4Ván Gỗ Sồi Sẫm",
      description:
        "Những tấm ván sẫm màu và sang trọng, gần giống như sô cô la. Hoàn hảo cho các biệt thự và thư viện lớn.",
      lore: "Chúng mang lại cảm giác của sự giàu có và tri thức.",
    },
    "minecraft:dark_oak_stairs": {
      displayName: "§4Bậc Thang Gỗ Sồi Sẫm",
      description:
        "Những bậc thang uy nghi, dẫn đến các phòng khách lớn hoặc các hành lang bí mật trong một dinh thự.",
      lore: "Chúng thì thầm những câu chuyện về quyền lực.",
    },
    "minecraft:dark_oak_slab": {
      displayName: "§4Phiến Gỗ Sồi Sẫm",
      description:
        "Phiến gỗ sẫm màu, lý tưởng để tạo ra các chi tiết trang trí phức tạp và đồ nội thất sang trọng.",
      lore: "Sự tinh tế trong từng chi tiết.",
    },
    "minecraft:dark_oak_fence": {
      displayName: "§4Hàng Rào Gỗ Sồi Sẫm",
      description:
        "Một hàng rào trang trọng, bao quanh các khu đất rộng lớn hoặc những khu vườn được chăm sóc cẩn thận.",
      lore: "Nó là một biểu tượng của sự uy nghiêm.",
    },
    "minecraft:dark_oak_fence_gate": {
      displayName: "§4Cổng Hàng Rào Gỗ Sồi Sẫm",
      description:
        "Cánh cổng nặng nề, mở ra một con đường dẫn đến một nơi quan trọng và được bảo vệ.",
      lore: "Nó đòi hỏi sự tôn trọng.",
    },
    "minecraft:dark_oak_door": {
      displayName: "§4Cửa Gỗ Sồi Sẫm",
      description:
        "Cánh cửa của một dinh thự, dày và được trang trí công phu. Nó gợi lên cảm giác về sự bí ẩn và sang trọng.",
      lore: "Nó bảo vệ những kho báu lớn.",
    },
    "minecraft:dark_oak_trapdoor": {
      displayName: "§4Cửa Sập Gỗ Sồi Sẫm",
      description:
        "Một cửa sập chắc chắn, trông giống như một tấm ván gỗ đơn giản, hoàn hảo để che giấu những lối đi không ai ngờ tới.",
      lore: "Nó ẩn mình trong tầm nhìn.",
    },

    // --- GỖ ĐƯỚC (MANGROVE) ---
    "minecraft:mangrove_log": {
      displayName: "§cGỗ Đước",
      description:
        "Gỗ từ những cây đước mọc trong đầm lầy, với bộ rễ phức tạp và màu đỏ đặc trưng. Nó đã quen với việc sống chung với nước.",
      lore: "Lõi của nó có màu của đất bùn và hoàng hôn.",
    },
    "minecraft:mangrove_planks": {
      displayName: "§cVán Gỗ Đước",
      description:
        "Những tấm ván màu đỏ sẫm, mang vẻ đẹp ấm áp và độc đáo của vùng đầm lầy.",
      lore: "Chúng mang trong mình sự kiên cường của cây đước.",
    },
    "minecraft:mangrove_stairs": {
      displayName: "§cBậc Thang Gỗ Đước",
      description:
        "Những bậc thang dẫn lên những ngôi nhà sàn được xây dựng giữa vùng đầm lầy lầy lội.",
      lore: "Chúng giữ cho đôi chân của bạn khô ráo.",
    },
    "minecraft:mangrove_slab": {
      displayName: "§cPhiến Gỗ Đước",
      description:
        "Phiến gỗ màu đỏ, lý tưởng để xây dựng cầu cảng và các công trình ven sông.",
      lore: "Nó không sợ nước.",
    },
    "minecraft:mangrove_fence": {
      displayName: "§cHàng Rào Gỗ Đước",
      description:
        "Hàng rào màu đỏ, được dùng để quây các khu vực trong đầm lầy hoặc làm lan can cho các cây cầu.",
      lore: "Nó nổi bật giữa màu xanh của đầm lầy.",
    },
    "minecraft:mangrove_fence_gate": {
      displayName: "§cCổng Hàng Rào Gỗ Đước",
      description:
        "Cánh cổng dẫn lối vào những con đường mòn xuyên qua khu rừng ngập mặn.",
      lore: "Hãy cẩn thận với bùn lầy.",
    },
    "minecraft:mangrove_door": {
      displayName: "§cCửa Gỗ Đước",
      description:
        "Một cánh cửa được thiết kế với những hoa văn tinh xảo, gợi nhớ đến bộ rễ phức tạp của cây đước.",
      lore: "Nó là một tác phẩm nghệ thuật của đầm lầy.",
    },
    "minecraft:mangrove_trapdoor": {
      displayName: "§cCửa Sập Gỗ Đước",
      description:
        "Một cửa sập với những lỗ tròn, cho phép bạn nhìn trộm những gì bên dưới trong vùng nước đục.",
      lore: "Nó là một cửa sổ nhìn xuống thế giới bí ẩn.",
    },

    // --- GỖ ANH ĐÀO (CHERRY) ---
    "minecraft:cherry_log": {
      displayName: "§dGỗ Anh Đào",
      description:
        "Gỗ từ những cây anh đào duyên dáng, với sắc hồng nhẹ nhàng và hương thơm tinh tế. Nó là hiện thân của mùa xuân.",
      lore: "Những cánh hoa màu hồng vẫn còn vương trên vỏ cây.",
    },
    "minecraft:cherry_planks": {
      displayName: "§dVán Gỗ Anh Đào",
      description:
        "Những tấm ván màu hồng nhạt, mang lại cảm giác yên bình và thơ mộng cho bất kỳ không gian nào.",
      lore: "Chúng mang lại sự thanh thản.",
    },
    "minecraft:cherry_stairs": {
      displayName: "§dBậc Thang Gỗ Anh Đào",
      description:
        "Những bậc thang duyên dáng, như thể được lấy ra từ một ngôi nhà trong truyện cổ tích.",
      lore: "Mỗi bước chân đều nhẹ như một cánh hoa.",
    },
    "minecraft:cherry_slab": {
      displayName: "§dPhiến Gỗ Anh Đào",
      description:
        "Phiến gỗ màu hồng tinh tế, hoàn hảo để tạo ra các chi tiết trang trí nhẹ nhàng và lãng mạn.",
      lore: "Một nét chấm phá của sự dịu dàng.",
    },
    "minecraft:cherry_fence": {
      displayName: "§dHàng Rào Gỗ Anh Đào",
      description:
        "Một hàng rào trang nhã, bao quanh một khu vườn Nhật Bản hoặc một hồ nước yên tĩnh.",
      lore: "Nó là một khung cảnh của sự bình yên.",
    },
    "minecraft:cherry_fence_gate": {
      displayName: "§dCổng Hàng Rào Gỗ Anh Đào",
      description:
        "Cánh cổng mở ra một không gian của vẻ đẹp và sự tĩnh lặng, dưới những tán hoa anh đào.",
      lore: "Chào mừng đến với mùa xuân.",
    },
    "minecraft:cherry_door": {
      displayName: "§dCửa Gỗ Anh Đào",
      description:
        "Một cánh cửa thanh lịch với thiết kế tinh xảo, gợi lên hình ảnh của kiến trúc phương Đông.",
      lore: "Nó là lối vào một thế giới của sự hài hòa.",
    },
    "minecraft:cherry_trapdoor": {
      displayName: "§dCửa Sập Gỗ Anh Đào",
      description:
        "Một cửa sập với thiết kế lưới chéo, thường được dùng làm vách ngăn hoặc cửa sổ trang trí.",
      lore: "Nó tạo ra những bóng nắng đẹp mắt.",
    },

    // --- GỖ NETHER (CRIMSON & WARPED) ---
    "minecraft:crimson_stem": {
      displayName: "§cThân Cây Đỏ Thẫm",
      description:
        "Thân cây của những cây nấm khổng lồ từ Rừng Đỏ Thẫm. Nó không phải là gỗ, mà là một loại nấm bền chắc, rung động với năng lượng của Nether.",
      lore: "Nó không cháy trong lửa.",
    },
    "minecraft:crimson_planks": {
      displayName: "§cVán Gỗ Đỏ Thẫm",
      description:
        "Những tấm ván có màu đỏ tươi của máu, được tạo ra từ thân cây nấm Nether. Chúng mang lại một vẻ ngoài kỳ lạ và đáng sợ.",
      lore: "Chúng được nhuộm bởi màu sắc của địa ngục.",
    },
    "minecraft:crimson_stairs": {
      displayName: "§cBậc Thang Đỏ Thẫm",
      description:
        "Những bậc thang màu đỏ rực, như thể được xây dựng trong một pháo đài của Nether.",
      lore: "Chúng dẫn đến những nơi nguy hiểm.",
    },
    "minecraft:crimson_slab": {
      displayName: "§cPhiến Gỗ Đỏ Thẫm",
      description:
        "Phiến gỗ màu đỏ đáng sợ, có khả năng chống cháy, hoàn hảo cho việc xây dựng trong môi trường khắc nghiệt nhất.",
      lore: "Nó được sinh ra từ lửa.",
    },
    "minecraft:crimson_door": {
      displayName: "§cCửa Đỏ Thẫm",
      description:
        "Một cánh cửa kỳ lạ, mang màu sắc và kết cấu của Nether. Nó trông như thể có thể dẫn đến một chiều không gian khác.",
      lore: "Nó canh giữ những bí mật của Nether.",
    },
    "minecraft:warped_stem": {
      displayName: "§3Thân Cây Cong Vẹo",
      description:
        "Thân cây của những cây nấm khổng lồ từ Rừng Cong Vẹo. Màu xanh lam của nó là một sự bất thường trong Nether, một ốc đảo của sự kỳ lạ.",
      lore: "Nó phát ra một ánh sáng ma mị.",
    },
    "minecraft:warped_planks": {
      displayName: "§3Ván Gỗ Cong Vẹo",
      description:
        "Những tấm ván màu xanh ngọc lam, mang vẻ đẹp ma mị và khác thường của Rừng Cong Vẹo.",
      lore: "Màu sắc của chúng thách thức ngọn lửa.",
    },
    "minecraft:warped_stairs": {
      displayName: "§3Bậc Thang Cong Vẹo",
      description:
        "Những bậc thang màu xanh kỳ lạ, như thể được tạo ra bởi một pháp sư điên rồ.",
      lore: "Chúng dẫn đến những nơi không thể tưởng tượng được.",
    },
    "minecraft:warped_slab": {
      displayName: "§3Phiến Gỗ Cong Vẹo",
      description:
        "Phiến gỗ màu xanh lam chống cháy, một vật liệu xây dựng độc đáo từ một thế giới khác.",
      lore: "Nó mang trong mình sự ma mị của Enderman.",
    },
    "minecraft:warped_door": {
      displayName: "§3Cửa Cong Vẹo",
      description:
        "Một cánh cửa màu xanh lam, với những hoa văn xoáy kỳ lạ, như thể nó đang liên tục biến đổi.",
      lore: "Nó là một cánh cổng dẫn đến sự điên rồ.",
    },

    // =================================================================
    // == CÁC LOẠI ĐÁ VÀ BIẾN THỂ (STONE TYPES & VARIANTS)
    // =================================================================

    "minecraft:stone": {
      displayName: "§0Đá",
      description: "Bộ xương của thế giới. Lạnh lẽo, cứng rắn và lâu đời.",
      lore: "Bên trong nó là lịch sử của các ngọn núi.",
    },
    "minecraft:cobblestone": {
      displayName: "§0Đá Cuội",
      description:
        "Vết sẹo của thế giới, còn sót lại sau mỗi cú cuốc. Nó là nền tảng của những nơi trú ẩn đầu tiên, một biểu tượng của sự sống sót và thích nghi.",
      lore: "Mỗi khối đều mang dấu ấn của công cụ đã tạo ra nó.",
    },
    "minecraft:stone_bricks": {
      displayName: "§0Gạch Đá",
      description:
        "Đá đã được đẽo gọt và sắp xếp một cách trật tự. Vật liệu của các pháo đài, thành trì và những công trình trường tồn.",
      lore: "Nó là biểu tượng của nền văn minh.",
    },
    "minecraft:mossy_stone_bricks": {
      displayName: "§0Gạch Đá Rêu Phong",
      description:
        "Gạch đá đã bị thời gian và thiên nhiên chiếm hữu. Rêu xanh mọc trong các kẽ hở, kể câu chuyện về sự lãng quên.",
      lore: "Thiên nhiên luôn tìm được đường đi của mình.",
    },
    "minecraft:cracked_stone_bricks": {
      displayName: "§0Gạch Đá Nứt Nẻ",
      description:
        "Những viên gạch đá đã chịu đựng sức nặng của thời gian hoặc những trận chiến khốc liệt. Những vết nứt của chúng là những vết sẹo của lịch sử.",
      lore: "Chúng đã chứng kiến sự sụp đổ của các vương quốc.",
    },
    "minecraft:chiseled_stone_bricks": {
      displayName: "§0Gạch Đá Chạm Khắc",
      description:
        "Một viên gạch đá được trang trí với những hoa văn cổ xưa. Nó là dấu ấn của một người thợ thủ công tài hoa.",
      lore: "Một tác phẩm nghệ thuật bị chôn vùi.",
    },
    "minecraft:andesite": {
      displayName: "§0Đá Andesit",
      description:
        "Một loại đá mácma màu xám lốm đốm, thường được tìm thấy thành từng mảng lớn dưới lòng đất.",
      lore: "Nó là một biến thể tinh tế của đá thông thường.",
    },
    "minecraft:diorite": {
      displayName: "§fĐá Diorit",
      description:
        "Một loại đá sáng màu, lốm đốm đen, giống như bánh quy kem. Các kiến trúc sư yêu thích vẻ ngoài sạch sẽ của nó.",
      lore: "Một số người gọi nó là 'phân chim'.",
    },
    "minecraft:granite": {
      displayName: "§cĐá Hoa Cương",
      description:
        "Một loại đá có màu hồng ấm áp, mang lại sự tương phản với màu xám lạnh của hang động.",
      lore: "Nó mang trong mình một chút hơi ấm của lõi Trái đất.",
    },

    "minecraft:deepslate": {
      displayName: "§8Đá Phiến Sâu",
      description:
        "Đá từ vực thẳm của thế giới, bị nén bởi sức nặng không thể tưởng tượng. Nó cứng hơn đá thông thường, là người canh giữ những kho báu sâu nhất.",
      lore: "Nó nghe thấy nhịp đập của lõi thế giới.",
    },
    "minecraft:cobbled_deepslate": {
      displayName: "§8Đá Cuội Phiến Sâu",
      description:
        "Đá phiến sâu thô, được khai thác trực tiếp từ vực thẳm. Bề mặt của nó gồ ghề và nguyên thủy.",
      lore: "Nó mang dấu ấn của áp suất và thời gian.",
    },
    "minecraft:deepslate_bricks": {
      displayName: "§8Gạch Đá Phiến Sâu",
      description:
        "Những viên gạch sẫm màu, được cắt từ đá phiến sâu. Chúng tạo ra những công trình vững chãi và mang vẻ đẹp u ám.",
      lore: "Nền móng của những thành phố dưới lòng đất.",
    },
    "minecraft:deepslate_tiles": {
      displayName: "§8Gạch Men Đá Phiến Sâu",
      description:
        "Những viên gạch nhỏ hơn, tạo thành một hoa văn tinh xảo. Hoàn hảo cho sàn nhà và mái của các công trình ngầm.",
      lore: "Sự sang trọng trong bóng tối.",
    },

    // =================================================================
    // == BLOCKS ĐẶC BIỆT (SPECIAL BLOCKS)
    // =================================================================
    "minecraft:obsidian": {
      displayName: "§5Hắc Diện Thạch",
      description:
        "Nước mắt của núi lửa, sinh ra từ sự kết hợp của lửa và nước. Một rào cản giữa các thế giới, cứng rắn và lạnh lẽo.",
      lore: "Nó rung động với năng lượng của các chiều không gian khác.",
      properties: [
        { name: "Chức năng", value: "Xây cổng Nether" },
        { name: "Độ cứng", value: "Cực kỳ khó phá" },
      ],
    },
    "minecraft:bedrock": {
      displayName: "§8Đá Nền",
      description:
        "Nền tảng của thế giới, một vật liệu tồn tại ngoài các quy tắc vật lý. Nó là giới hạn không thể vượt qua.",
      lore: "Nó không phải là một khối, mà là một ý tưởng về sự vĩnh cửu.",
      properties: [{ name: "Đặc tính", value: "Không thể phá hủy" }],
    },
    "minecraft:soul_sand": {
      displayName: "§4Cát Linh Hồn",
      description:
        "Một vùng đất đau khổ, bao gồm các linh hồn bị mắc kẹt. Mỗi bước chân trên nó đều bị kéo xuống bởi sự tuyệt vọng.",
      lore: "Những khuôn mặt mờ nhạt có thể được nhìn thấy đang la hét trong kết cấu của nó.",
      properties: [
        { name: "Hiệu ứng", value: "Làm chậm chuyển động" },
        { name: "Chức năng", value: "Triệu hồi Wither" },
      ],
    },
    "minecraft:soul_soil": {
      displayName: "§4Đất Linh Hồn",
      description:
        "Phần còn lại của những linh hồn đã bị thiêu rụi thành tro. Bề mặt của nó ổn định hơn cát, nhưng ngọn lửa cháy trên nó có màu xanh ma quái.",
      lore: "Nó là nhiên liệu cho ngọn lửa linh hồn.",
    },
    "minecraft:amethyst_geode": {
      displayName: "§dTú Tinh Thạch Anh Tím",
      description:
        "Trái tim bí mật của thế giới, một cái hang kết tinh. Không khí bên trong nó vang lên với một giai điệu du dương.",
      lore: "Mỗi mảnh vỡ đều hát một nốt nhạc trong bản giao hưởng của Trái đất.",
      properties: [{ name: "Đặc tính", value: "Phát ra âm thanh khi đi lại" }],
    },
    "minecraft:sculk_shrieker": {
      displayName: "§1Máy Hú Sculk",
      description:
        "Hệ thống báo động của Vực Sâu. Tiếng hét của nó xuyên qua sự im lặng, một lời triệu tập gửi đến người cai ngục đang ngủ say.",
      lore: "Nó khuếch đại nỗi sợ hãi của những kẻ xâm nhập.",
      properties: [{ name: "Chức năng", value: "Triệu hồi Warden" }],
    },
    "minecraft:spawner": {
      displayName: "§8Lồng Triệu Hồi",
      description:
        "Một nhà tù và một tử cung. Chiếc lồng này bẻ cong các quy tắc của sự sống và cái chết, triệu hồi những sinh vật từ hư không với ngọn lửa nhỏ bên trong.",
      lore: "Nó là một tiếng vọng không bao giờ tắt của một thực thể.",
      properties: [{ name: "Chức năng", value: "Tạo ra quái vật liên tục" }],
    },
    "minecraft:dirt": {
      displayName: "§6Đất",
      description:
        "Vật chất cơ bản, khiêm tốn của sự sống. Từ nó, mọi thứ đều phát triển.",
      lore: "Nó nhớ mọi hạt mưa và mọi bước chân.",
    },
    "minecraft:grass_block": {
      displayName: "§2Khối Cỏ",
      description:
        "Đất được ban phước bởi ánh sáng mặt trời, khoác lên mình một tấm áo choàng xanh tươi. Nó là bề mặt của thế giới sống.",
      lore: "Nó thở cùng với các mùa.",
    },

    "minecraft:coal_block": {
      displayName: "§8Khối Than",
      description:
        "Năng lượng được nén chặt, một khối nhiên liệu đậm đặc có thể cháy trong một thời gian rất dài. Nó là trái tim đen của ngành công nghiệp.",
      lore: "Nó cháy với một sức nóng chậm rãi và ổn định, như một lời hứa về sự bền bỉ.",
      properties: [
        { name: "Chức năng", value: "Lưu trữ than, nhiên liệu hiệu quả" },
      ],
    },
    "minecraft:iron_block": {
      displayName: "§fKhối Sắt",
      description:
        "Sức mạnh và sự bền bỉ được đúc thành một khối. Lạnh lẽo khi chạm vào, nó là nền tảng của các công trình vững chắc và những cỗ máy phức tạp.",
      lore: "Nó là biểu tượng của sự chăm chỉ và sức mạnh công nghiệp.",
      properties: [
        {
          name: "Chức năng",
          value: "Lưu trữ sắt, cấp năng lượng cho Đèn Hiệu",
        },
      ],
    },
    "minecraft:gold_block": {
      displayName: "§eKhối Vàng",
      description:
        "Sự giàu có được cô đọng. Một khối vàng ròng, tỏa ra ánh sáng ấm áp của quyền lực và sự xa hoa.",
      lore: "Nó nặng hơn vẻ bề ngoài, mang sức nặng của những đế chế.",
      properties: [
        {
          name: "Chức năng",
          value: "Lưu trữ vàng, cấp năng lượng cho Đèn Hiệu",
        },
      ],
    },
    "minecraft:diamond_block": {
      displayName: "§bKhối Kim Cương",
      description:
        "Sự hoàn hảo kết tinh. Một khối vật chất gần như không thể phá hủy, phản chiếu ánh sáng thành một vũ điệu của các màu sắc. Nó là đỉnh cao của sự giàu có.",
      lore: "Nhìn vào nó là nhìn vào trái tim của một ngôi sao.",
      properties: [
        {
          name: "Chức năng",
          value: "Lưu trữ kim cương, cấp năng lượng cho Đèn Hiệu",
        },
      ],
    },
    "minecraft:emerald_block": {
      displayName: "§2Khối Ngọc Lục Bảo",
      description:
        "Sự thịnh vượng của dân làng được đúc thành một khối. Màu xanh lục của nó là biểu tượng của sự sống, thương mại và cộng đồng.",
      lore: "Nó rung động với năng lượng của sự trao đổi.",
      properties: [
        {
          name: "Chức năng",
          value: "Lưu trữ ngọc lục bảo, cấp năng lượng cho Đèn Hiệu",
        },
      ],
    },
    "minecraft:lapis_block": {
      displayName: "§1Khối Lưu Ly",
      description:
        "Bầu trời đêm được nén lại thành một khối rắn. Những đốm vàng lấp lánh như những vì sao xa xôi, chứa đựng tiềm năng ma thuật to lớn.",
      lore: "Nó là màu của những giấc mơ và những lời tiên tri.",
      properties: [
        { name: "Chức năng", value: "Lưu trữ lưu ly, khối trang trí" },
      ],
    },
    "minecraft:redstone_block": {
      displayName: "§cKhối Redstone",
      description:
        "Năng lượng tinh khiết được đông đặc lại. Nó phát ra một tín hiệu không bao giờ tắt, một trái tim vĩnh cửu cho các cỗ máy phức tạp.",
      lore: "Nó là một nguồn năng lượng không cần nghỉ ngơi.",
      properties: [
        {
          name: "Chức năng",
          value: "Lưu trữ redstone, nguồn năng lượng liên tục",
        },
      ],
    },
    "minecraft:copper_block": {
      displayName: "§cKhối Đồng",
      description:
        "Một khối kim loại ấm áp, mới mẻ và sáng bóng. Nhưng thời gian sẽ để lại dấu ấn của nó, biến màu cam rực rỡ thành màu xanh ngọc của tuổi tác.",
      lore: "Nó kể câu chuyện về sự thay đổi qua quá trình oxy hóa.",
      properties: [
        {
          name: "Chức năng",
          value: "Lưu trữ đồng, thay đổi màu sắc theo thời gian",
        },
      ],
    },
    "minecraft:netherite_block": {
      displayName: "§4Khối Netherite",
      description:
        "Vật liệu tối thượng, được rèn trong lửa địa ngục và được củng cố bằng vàng. Nó không cháy, không bị đẩy bởi pít-tông và miễn nhiễm với hầu hết mọi loại sát thương. Nó là hiện thân của sự bất khả xâm phạm.",
      lore: "Nó hấp thụ ánh sáng và âm thanh, một khối của sự im lặng và sức mạnh tuyệt đối.",
      properties: [
        {
          name: "Chức năng",
          value: "Lưu trữ Netherite, cấp năng lượng cao nhất cho Đèn Hiệu",
        },
      ],
    },

    // =================================================================
    // == KHỐI REDSTONE (REDSTONE BLOCKS)
    // =================================================================
    "minecraft:piston": {
      displayName: "§0Pít-tông",
      description:
        "Cơ bắp của máy móc. Với một cú đẩy mạnh mẽ, nó di chuyển thế giới, một khối tại một thời điểm.",
      lore: "Nó không biết đến sự mệt mỏi, chỉ biết đến mệnh lệnh.",
      properties: [{ name: "Chức năng", value: "Đẩy các khối" }],
    },
    "minecraft:sticky_piston": {
      displayName: "§2Pít-tông Dính",
      description:
        "Một pít-tông với khả năng giữ lại. Nó không chỉ đẩy mà còn kéo, cho phép tạo ra những cánh cửa ẩn và các cỗ máy phức tạp hơn.",
      lore: "Nó được ban cho một cái ôm không thể tách rời.",
      properties: [{ name: "Chức năng", value: "Đẩy và kéo các khối" }],
    },
    "minecraft:observer": {
      displayName: "§0Máy Quan Sát",
      description:
        "Con mắt không bao giờ chớp của máy móc. Nó theo dõi khối trước mặt và phát ra tín hiệu khi có bất kỳ sự thay đổi nào.",
      lore: "Nó thấy những gì chúng ta không thể.",
      properties: [{ name: "Chức năng", value: "Phát hiện cập nhật khối" }],
    },
    "minecraft:repeater": {
      displayName: "§cBộ Lặp Redstone",
      description:
        "Trái tim của các mạch điện phức tạp. Nó làm mới và trì hoãn tín hiệu, cho phép các kỹ sư tạo ra nhịp điệu và logic.",
      lore: "Nó là ký ức ngắn hạn của một cỗ máy.",
      properties: [
        {
          name: "Chức năng",
          value: "Tăng cường và trì hoãn tín hiệu Redstone",
        },
      ],
    },
    "minecraft:comparator": {
      displayName: "§cBộ So Sánh Redstone",
      description:
        "Bộ não của máy móc. Nó có thể đọc trạng thái của các thùng chứa, so sánh cường độ tín hiệu và thực hiện các phép toán logic đơn giản.",
      lore: "Nó biến dữ liệu thành hành động.",
      properties: [
        { name: "Chức năng", value: "So sánh và duy trì cường độ tín hiệu" },
      ],
    },
    "minecraft:dispenser": {
      displayName: "§0Máy Phân Phát",
      description:
        "Một bàn tay cơ học. Nó có thể bắn tên, ném thuốc, sử dụng xô nước, và thực hiện nhiều hành động khác thay cho người chơi.",
      lore: "Nó là một người hầu trung thành nhưng vô hồn.",
      properties: [{ name: "Chức năng", value: "Sử dụng hoặc ném vật phẩm" }],
    },
    "minecraft:dropper": {
      displayName: "§0Máy Nhả",
      description:
        "Một phiên bản đơn giản hơn của Máy Phân Phát. Nó chỉ nhẹ nhàng thả vật phẩm ra, thay vì sử dụng chúng.",
      lore: "Nó là một người giao hàng, không phải là một chiến binh.",
      properties: [{ name: "Chức năng", value: "Thả vật phẩm ra ngoài" }],
    },
    "minecraft:tnt": {
      displayName: "§cThuốc Nổ",
      description:
        "Sự im lặng trước cơn bão. Một khối chứa đựng sức mạnh có thể định hình lại cảnh quan hoặc phá hủy công trình trong chớp mắt.",
      lore: "Tiếng rít của nó là lời đếm ngược đến sự thay đổi mạnh mẽ.",
      properties: [{ name: "Chức năng", value: "Gây ra một vụ nổ lớn" }],
    },
    "minecraft:lever": {
      displayName: "§0Cần Gạt",
      description:
        "Công tắc đơn giản nhất. Bật và tắt, một quyết định nhị phân điều khiển số phận của các cỗ máy.",
      lore: "Nó là ý chí của người điều khiển được thể hiện ra.",
      properties: [{ name: "Chức năng", value: "Bật/tắt tín hiệu Redstone" }],
    },
    "minecraft:stone_button": {
      displayName: "§0Nút Bấm Đá",
      description:
        "Một cú nhấn tạm thời. Nó gửi đi một xung năng lượng ngắn, một mệnh lệnh tức thời rồi lại trở về trạng thái im lặng.",
      lore: "Nó là một khoảnh khắc của hành động.",
      properties: [
        { name: "Chức năng", value: "Phát ra một tín hiệu Redstone ngắn" },
      ],
    },

    // =================================================================
    // == KHỐI CHIẾU SÁNG (LIGHTING BLOCKS)
    // =================================================================
    "minecraft:torch": {
      displayName: "§eĐuốc",
      description:
        "Ngọn lửa thuần hóa, vũ khí đầu tiên chống lại bóng tối. Ánh sáng ấm áp của nó mang lại sự an toàn và hy vọng.",
      lore: "Nó là một ngôi sao nhỏ trong tay bạn.",
      properties: [
        { name: "Chức năng", value: "Nguồn sáng, ngăn quái vật xuất hiện" },
      ],
    },
    "minecraft:soul_torch": {
      displayName: "§bĐuốc Linh Hồn",
      description:
        "Một ngọn lửa màu xanh lam kỳ lạ, được nuôi dưỡng bởi cát linh hồn. Ánh sáng của nó lạnh lẽo và không xua đuổi tất cả bóng tối, đặc biệt là Piglin.",
      lore: "Nó cháy bằng những linh hồn đã mất.",
      properties: [
        { name: "Chức năng", value: "Nguồn sáng yếu hơn, xua đuổi Piglin" },
      ],
    },
    "minecraft:lantern": {
      displayName: "§eĐèn Lồng",
      description:
        "Một ngọn đuốc được bảo vệ trong một chiếc lồng sắt. Ánh sáng của nó sáng hơn và có thể được treo lên, trang trí cho những con đường và ngôi nhà.",
      lore: "Nó là một ngọn hải đăng nhỏ cho những người đi lạc.",
      properties: [{ name: "Chức năng", value: "Nguồn sáng mạnh hơn đuốc" }],
    },
    "minecraft:sea_lantern": {
      displayName: "§bĐèn Biển",
      description:
        "Trái tim phát sáng của một Di Tích Đại Dương. Ánh sáng của nó lạnh lẽo và sống động, một viên ngọc được dệt từ những tinh thể và ma thuật của biển sâu.",
      lore: "Nó chứa đựng ánh sáng của vực thẳm.",
      properties: [
        { name: "Chức năng", value: "Nguồn sáng mạnh dưới nước và trên cạn" },
      ],
    },
    "minecraft:glowstone": {
      displayName: "§eĐá Phát Sáng",
      description:
        "Một cụm ánh sáng bị mắc kẹt, được thu hoạch từ trần của địa ngục. Ánh sáng ấm áp của nó xua tan những bóng tối sâu thẳm nhất.",
      lore: "Người ta nói nó được tạo thành từ những linh hồn đã tìm thấy sự bình yên.",
      properties: [{ name: "Chức năng", value: "Nguồn sáng mạnh" }],
    },
    "minecraft:shroomlight": {
      displayName: "§eĐèn Nấm",
      description:
        "Một khối nấm phát quang tự nhiên từ những cây nấm khổng lồ của Nether. Ánh sáng của nó ấm áp và hữu cơ, mang lại cảm giác sống động.",
      lore: "Nó là quả của một cái cây không bao giờ nhìn thấy mặt trời.",
      properties: [{ name: "Chức năng", value: "Nguồn sáng tự nhiên" }],
    },

    // =================================================================
    // == KHỐI TỰ NHIÊN & TRANG TRÍ (NATURAL & DECORATIVE BLOCKS)
    // =================================================================
    "minecraft:glass": {
      displayName: "§fKính",
      description:
        "Cát được tái sinh trong lửa, một rào cản trong suốt giữa an toàn và thế giới bên ngoài. Nó cho phép ánh sáng vào nhưng giữ lại màn đêm.",
      lore: "Nhìn qua nó là nhìn thấy thế giới mà không bị nó chạm vào.",
      properties: [{ name: "Đặc tính", value: "Trong suốt, dễ vỡ" }],
    },
    "minecraft:white_wool": {
      displayName: "§fLen Trắng",
      description:
        "Sợi lông cừu mềm mại, được dệt thành một khối ấm áp và có thể nhuộm màu. Nó là tấm canvas của người xây dựng.",
      lore: "Nó hấp thụ âm thanh, mang lại sự yên tĩnh.",
      properties: [
        {
          name: "Chức năng",
          value: "Khối xây dựng trang trí, có thể nhuộm màu",
        },
      ],
    },
    "minecraft:bookshelf": {
      displayName: "§6Giá Sách",
      description:
        "Kiến thức được đóng thành bìa và sắp xếp gọn gàng. Sự hiện diện của nó truyền sức mạnh cho những lời phù phép, cung cấp từ ngữ cho ma thuật.",
      lore: "Mỗi cuốn sách đều chứa một thế giới.",
      properties: [
        { name: "Chức năng", value: "Tăng sức mạnh cho Bàn Phù Phép" },
      ],
    },
    "minecraft:clay": {
      displayName: "§0Đất Sét",
      description:
        "Đất mềm và dẻo, được tìm thấy dưới lòng các con sông và hồ. Nó là vật liệu thô cho gạch và đồ gốm.",
      lore: "Nó chờ đợi bàn tay của người thợ để được định hình.",
      properties: [
        { name: "Chức năng", value: "Nung thành gạch, chế tạo đất nung" },
      ],
    },
    "minecraft:terracotta": {
      displayName: "§6Đất Nung",
      description:
        "Đất sét đã được nung cứng trong lửa. Nó mang màu cam tự nhiên của đất và có thể được nhuộm thành nhiều màu sắc rực rỡ.",
      lore: "Nó là đất đã được ban cho sự vĩnh cửu.",
      properties: [
        { name: "Chức năng", value: "Khối xây dựng cứng, có thể nhuộm màu" },
      ],
    },
    "minecraft:sand": {
      displayName: "§eCát",
      description:
        "Thời gian bị nghiền nát thành từng hạt. Nó trôi đi dưới chân và đầu hàng trọng lực, luôn tìm kiếm nơi thấp nhất.",
      lore: "Mỗi hạt cát từng là một phần của một tảng đá lớn hơn.",
    },
    "minecraft:gravel": {
      displayName: "§0Sỏi",
      description:
        "Những mảnh đá vỡ, không ổn định và luôn sẵn sàng sụp đổ. Đôi khi, sự kiên nhẫn khi đào bới nó sẽ được đền đáp bằng một mảnh đá lửa.",
      lore: "Nó là một lời nhắc nhở rằng không phải mọi thứ đều vững chắc.",
      properties: [{ name: "Đặc tính", value: "Bị ảnh hưởng bởi trọng lực" }],
    },
    "minecraft:pumpkin": {
      displayName: "§6Bí Ngô",
      description:
        "Linh hồn của mùa thu. Có thể được chạm khắc thành một khuôn mặt đáng sợ để xua đuổi tà ma, hoặc chế biến thành một chiếc bánh thơm ngon.",
      lore: "Nó mỉm cười ngay cả trong bóng tối.",
      properties: [
        { name: "Chức năng", value: "Tạo Golem Sắt, đội lên đầu, làm thức ăn" },
      ],
    },
    "minecraft:hay_bale": {
      displayName: "§eKiện Rơm",
      description:
        "Bản chất của mùa hè được bó lại. Mùi của nó là mùi của những cánh đồng vàng và ánh nắng mặt trời.",
      lore: "Nó là một bữa tiệc cho ngựa và một chiếc đệm cho những cú nhảy.",
      properties: [
        { name: "Chức năng", value: "Thức ăn cho ngựa, giảm sát thương rơi" },
      ],
    },

    // =================================================================
    // == KHỐI NETHER & END (NETHER & END BLOCKS)
    // =================================================================
    "minecraft:netherrack": {
      displayName: "§4Đá Nether",
      description:
        "Thịt da của địa ngục, một loại đá rỉ máu và không bao giờ nguội. Ngọn lửa bám vào nó như một ký ức vĩnh cửu.",
      lore: "Nó thì thầm những câu chuyện về sự đau khổ.",
      properties: [{ name: "Đặc tính", value: "Cháy mãi mãi" }],
    },
    "minecraft:magma_block": {
      displayName: "§cKhối Magma",
      description:
        "Một khối dung nham đang nguội dần, bề mặt của nó nứt nẻ với những đường rãnh rực lửa. Nó gây bỏng cho những ai bất cẩn.",
      lore: "Nó là một cái bẫy nóng bỏng.",
      properties: [{ name: "Hiệu ứng", value: "Gây sát thương khi đứng lên" }],
    },
    "minecraft:blackstone": {
      displayName: "§8Đá Đen",
      description:
        "Một loại đá sẫm màu, cứng rắn được tìm thấy ở Nether. Nó là một sự thay thế tuyệt vời cho đá cuội, mang một vẻ đẹp u ám và trang trọng.",
      lore: "Nó được sinh ra trong bóng tối và lửa.",
      properties: [
        { name: "Chức năng", value: "Vật liệu xây dựng, chế tạo công cụ đá" },
      ],
    },
    "minecraft:end_stone": {
      displayName: "§eĐá End",
      description:
        "Một loại đá nhợt nhạt, đảo ngược từ một thực tại khác. Bề mặt của nó giống như bề mặt của một mặt trăng xa lạ, cằn cỗi và im lặng.",
      lore: "Nó là nền móng của Hư Không.",
      properties: [{ name: "Đặc tính", value: "Miễn nhiễm với Ender Dragon" }],
    },
    "minecraft:purpur_block": {
      displayName: "§dKhối Purpur",
      description:
        "Đá End đã được nấu chảy và chế tác lại. Nó mang một màu tím đặc trưng và được trang trí bằng những hoa văn kỳ lạ, vật liệu xây dựng chính của các Thành Phố End.",
      lore: "Nó được xây dựng bởi một nền văn minh của những người dịch chuyển.",
      properties: [{ name: "Chức năng", value: "Khối xây dựng trang trí" }],
    },
    "minecraft:end_rod": {
      displayName: "§dThanh End",
      description:
        "Một nguồn sáng kỳ lạ, phát ra ánh sáng trắng tinh khiết. Nó được tạo ra từ quả Chorus đã nổ, một mảnh nhỏ của năng lượng End.",
      lore: "Ánh sáng của nó không có bóng.",
      properties: [{ name: "Chức năng", value: "Nguồn sáng mạnh" }],
    },
    "minecraft:dragon_egg": {
      displayName: "§5Trứng Rồng",
      description:
        "Chiến lợi phẩm tối thượng. Một quả trứng bí ẩn, rung động với năng lượng của Hư Không, rơi ra sau khi Ender Dragon bị đánh bại. Nó không thể được khai thác, chỉ có thể được dịch chuyển.",
      lore: "Nó là một lời hứa, hoặc một lời cảnh báo, về sự trở lại.",
      properties: [{ name: "Đặc tính", value: "Dịch chuyển khi bị tác động" }],
    },
    "minecraft:ice": {
      displayName: "§bBăng",
      description:
        "Nước đã ngủ yên dưới cái lạnh buốt giá. Bề mặt của nó là một tấm gương trơn trượt, phản chiếu bầu trời mùa đông, nhưng lại yếu đuối trước hơi ấm.",
      lore: "Nó giữ lại ký ức của cơn bão tuyết cuối cùng.",
      properties: [
        { name: "Đặc tính", value: "Trơn trượt" },
        { name: "Điểm yếu", value: "Tan chảy khi gần nguồn sáng" },
      ],
    },
    "minecraft:packed_ice": {
      displayName: "§bBăng Nén",
      description:
        "Băng đã được nén lại bởi sức nặng của chính nó qua hàng thiên niên kỷ. Nó giữ lại sự lạnh giá và trơn trượt, nhưng không còn tan chảy trước ánh sáng.",
      lore: "Bên trong nó, thời gian đã đóng băng.",
      properties: [
        { name: "Đặc tính", value: "Trơn trượt" },
        { name: "Ưu điểm", value: "Không tan chảy" },
      ],
    },
    "minecraft:blue_ice": {
      displayName: "§1Băng Xanh",
      description:
        "Dạng băng tinh khiết và cổ xưa nhất, được nén chặt đến mức ánh sáng bị bẻ cong thành màu xanh thẳm của đại dương sâu thẳm. Bề mặt của nó gần như không có ma sát.",
      lore: "Nó lạnh hơn cả sự im lặng.",
      properties: [
        { name: "Đặc tính", value: "Cực kỳ trơn trượt, nhanh nhất cho thuyền" },
        { name: "Ưu điểm", value: "Không tan chảy" },
      ],
    },
    "minecraft:frosted_ice": {
      displayName: "§fBăng Sương",
      description:
        "Một lớp băng mỏng manh được tạo ra bởi phép thuật của đôi giày đi trên băng. Nó là một cây cầu tạm thời trên mặt nước, sẽ biến mất khi hơi ấm quay trở lại.",
      lore: "Nó là dấu chân của mùa đông.",
      properties: [
        { name: "Đặc tính", value: "Tạm thời, sẽ tan dần theo thời gian" },
        { name: "Nguồn gốc", value: "Tạo ra bởi phù phép Frost Walker" },
      ],
    },
    "minecraft:snow_block": {
      displayName: "§fKhối Tuyết",
      description:
        "Sự im lặng của mùa đông được nén lại. Mềm mại, lạnh lẽo và tinh khiết, nó là vật liệu xây nên những pháo đài tạm thời và những ngôi nhà tuyết ấm cúng.",
      lore: "Mỗi khối chứa hàng triệu bông tuyết, không bông nào giống bông nào.",
      properties: [
        { name: "Đặc tính", value: "Có thể thu hoạch bằng xẻng" },
        { name: "Điểm yếu", value: "Tan chảy khi gần nguồn sáng" },
      ],
    },
    "minecraft:snow": {
      displayName: "§fLớp Tuyết",
      description:
        "Tấm chăn mỏng manh của mùa đông, phủ lên thế giới một lớp áo choàng trắng xóa. Nó làm dịu đi những góc cạnh và mang lại sự yên tĩnh.",
      lore: "Nó là một trang giấy trắng, chờ đợi những dấu chân đầu tiên của một cuộc phiêu lưu mới.",
      properties: [
        { name: "Đặc tính", value: "Có thể xếp chồng thành nhiều lớp" },
      ],
    },
    "minecraft:powder_snow": {
      displayName: "§fBột Tuyết",
      description:
        "Một cái bẫy lạnh giá và mềm mại. Trông có vẻ chắc chắn, nhưng nó sẽ nuốt chửng những ai bất cẩn, nhấn chìm họ trong cái lạnh tê cóng.",
      lore: "Nó là hơi thở của những đỉnh núi cao nhất, nơi không khí quá loãng để giữ lại hình dạng.",
      properties: [
        { name: "Hiệu ứng", value: "Gây đóng băng, có thể bị rơi xuyên qua" },
        { name: "Giải pháp", value: "Giày da giúp đi lại trên bề mặt" },
      ],
    },

    // =================================================================
    // == KHỐI DUNG NHAM (LAVA & MAGMA BLOCKS)
    // =================================================================
    "minecraft:lava": {
      displayName: "§cDung Nham",
      description:
        "Cơn thịnh nộ nóng chảy của Trái đất. Nó vừa phá hủy vừa tạo ra, một lực lượng nguyên thủy của sự hủy diệt và tái sinh.",
      lore: "Ánh sáng của nó là một lời cảnh báo.",
      properties: [
        { name: "Đặc tính", value: "Gây cháy, lan rộng và biến nước thành đá" },
      ],
    },
    "minecraft:magma_block": {
      displayName: "§cKhối Magma",
      description:
        "Một khối dung nham đang nguội dần, bề mặt của nó nứt nẻ với những đường rãnh rực lửa. Nó gây bỏng cho những ai bất cẩn chạm vào.",
      lore: "Nó là một cái bẫy nóng bỏng, một lời nhắc nhở về sức nóng bên dưới.",
      properties: [
        { name: "Hiệu ứng", value: "Gây sát thương lửa khi đứng lên" },
        { name: "Dưới nước", value: "Tạo cột bong bóng kéo xuống" },
      ],
    },
    "minecraft:water": {
      displayName: "§9Nước",
      description:
        "Dòng máu của thế giới. Nó tạo ra sự sống, dập tắt lửa, và khắc sâu vào đá một cách kiên nhẫn.",
      lore: "Nó không có hình dạng, nhưng lại định hình mọi thứ.",
      properties: [{ name: "Đặc tính", value: "Chảy và tạo ra các khối mới" }],
    },
    "minecraft:sandstone": {
      displayName: "§eĐá Cát",
      description:
        "Cát của sa mạc được nén lại bởi thời gian. Bề mặt của nó mang những lớp trầm tích của những cơn bão cát đã qua.",
      lore: "Nó là ký ức của một đại dương đã cạn.",
      properties: [
        { name: "Chức năng", value: "Vật liệu xây dựng của sa mạc" },
      ],
    },
    "minecraft:prismarine": {
      displayName: "§bĐá Prismarine",
      description:
        "Vật liệu xây dựng nên các Di Tích Đại Dương, một loại đá sống động liên tục thay đổi màu sắc. Nó rung động với năng lượng của biển sâu.",
      lore: "Nó được tạo ra từ ma thuật và áp suất của vực thẳm.",
      properties: [
        { name: "Đặc tính", value: "Thay đổi màu sắc theo thời gian" },
      ],
    },
    "minecraft:terracotta": {
      displayName: "§6Đất Nung",
      description:
        "Đất sét đã được nung cứng trong lửa. Nó mang màu cam tự nhiên của đất và có thể được nhuộm thành nhiều màu sắc rực rỡ.",
      lore: "Nó là đất đã được ban cho sự vĩnh cửu.",
      properties: [
        { name: "Chức năng", value: "Khối xây dựng cứng, có thể nhuộm 16 màu" },
      ],
    },
    "minecraft:mycelium": {
      displayName: "§dHệ Nấm",
      description:
        "Một loại đất kỳ lạ, bị xâm chiếm bởi một hệ sợi nấm màu tím. Nó là môi trường sống duy nhất cho những cây nấm khổng lồ.",
      lore: "Nó là một vùng đất sống, thở và lan rộng.",
      properties: [
        {
          name: "Đặc tính",
          value: "Ngăn chặn quái vật thù địch (trừ creeper) xuất hiện",
        },
      ],
    },
    "minecraft:podzol": {
      displayName: "§6Đất Podzol",
      description:
        "Lớp đất mặt của những khu rừng taiga khổng lồ, được bao phủ bởi một lớp lá kim mục nát. Nó là một mảnh đất màu mỡ cho những cây nấm.",
      lore: "Nó mang mùi hương của những cây thông cổ thụ và mưa.",
      properties: [{ name: "Chức năng", value: "Trồng được mọi loại cây con" }],
    },
    "minecraft:bricks": {
      displayName: "§cGạch",
      description:
        "Đất sét được nung trong lửa và xếp lại một cách ngay ngắn. Biểu tượng của sự ấm cúng, bền bỉ và những ngôi nhà kiên cố.",
      lore: "Mỗi viên gạch là một lời hứa về một mái ấm.",
      properties: [{ name: "Chức năng", value: "Khối xây dựng trang trí" }],
    },
    "minecraft:nether_bricks": {
      displayName: "§4Gạch Nether",
      description:
        "Vật liệu sẫm màu và đáng sợ, được rèn từ bùn Nether trong các pháo đài. Chúng lạnh lẽo và dường như hấp thụ ánh sáng.",
      lore: "Chúng được gắn kết với nhau bằng nỗi sợ hãi và tro tàn.",
      properties: [{ name: "Đặc tính", value: "Chống nổ tốt" }],
    },
    "minecraft:quartz_block": {
      displayName: "§fKhối Thạch Anh",
      description:
        "Thạch anh Nether được tinh chế, tạo ra một vật liệu xây dựng màu trắng tinh khôi và sang trọng. Nó là sự lựa chọn của các kiến trúc sư muốn tạo ra vẻ đẹp hiện đại và sạch sẽ.",
      lore: "Nó là trật tự được mang về từ một thế giới hỗn loạn.",
      properties: [
        { name: "Chức năng", value: "Khối xây dựng trang trí cao cấp" },
      ],
    },
    "minecraft:concrete_powder": {
      displayName: "§0Bột Bê Tông",
      description:
        "Cát, sỏi và thuốc nhuộm được trộn lẫn, tạo ra một loại bột mịn. Nó chỉ chờ đợi nước để được đánh thức và trở nên cứng rắn.",
      lore: "Nó là một tiềm năng đang chờ đợi.",
      properties: [
        {
          name: "Đặc tính",
          value: "Bị ảnh hưởng bởi trọng lực, cứng lại khi gặp nước",
        },
      ],
    },
    "minecraft:concrete": {
      displayName: "§8Bê Tông",
      description:
        "Một vật liệu xây dựng hiện đại, mịn màng và chắc chắn với màu sắc sống động. Hoàn hảo cho các công trình đô thị và các thiết kế táo bạo.",
      lore: "Nó là biểu tượng của sự sáng tạo có chủ đích.",
      properties: [
        { name: "Chức năng", value: "Khối xây dựng rắn chắc, có 16 màu" },
      ],
    },
    "minecraft:oak_leaves": {
      displayName: "§2Lá Sồi",
      description:
        "Tán lá của cây sồi, rung rinh trong gió và là nơi trú ẩn cho các loài chim. Chúng là lá phổi của khu rừng.",
      lore: "Mỗi chiếc lá là một tấm pin mặt trời nhỏ bé.",
      properties: [
        { name: "Đặc tính", value: "Phân hủy khi không còn thân cây gần đó" },
      ],
    },
    "minecraft:dandelion": {
      displayName: "§eBồ Công Anh",
      description:
        "Một mặt trời nhỏ bé mọc trên mặt đất, những cánh hoa của nó có thể được nghiền thành thuốc nhuộm màu vàng rực rỡ.",
      lore: "Nó là một lời chúc sẽ được gió mang đi.",
      properties: [{ name: "Chức năng", value: "Chế tạo thuốc nhuộm vàng" }],
    },
    "minecraft:poppy": {
      displayName: "§cHoa Anh Túc",
      description:
        "Một đốm lửa màu đỏ trên những cánh đồng cỏ. Vẻ đẹp mỏng manh của nó che giấu một lịch sử phức tạp.",
      lore: "Nó là một giọt máu của Trái đất.",
      properties: [{ name: "Chức năng", value: "Chế tạo thuốc nhuộm đỏ" }],
    },
    "minecraft:wheat": {
      displayName: "§eLúa Mì",
      description:
        "Những hạt giống của nền văn minh, mọc lên từ đất và ánh nắng. Khi chín vàng, nó là lời hứa về những ổ bánh mì nóng hổi.",
      lore: "Nó là vàng của người nông dân.",
      properties: [
        { name: "Chức năng", value: "Chế tạo bánh mì, nuôi động vật" },
      ],
    },
    "minecraft:carrots": {
      displayName: "§6Cà Rốt",
      description:
        "Một loại củ màu cam ngọt ngào, ẩn mình dưới lớp đất. Nó là món ăn yêu thích của heo và thỏ, và là một nguồn thực phẩm bổ dưỡng.",
      lore: "Nó là một kho báu bị chôn giấu.",
      properties: [
        { name: "Chức năng", value: "Thực phẩm, nhân giống heo và thỏ" },
      ],
    },
    "minecraft:potatoes": {
      displayName: "§eKhoai Tây",
      description:
        "Một loại củ khiêm tốn nhưng linh hoạt. Có thể ăn sống, nướng chín, hoặc thậm chí là bị nhiễm độc một cách ngẫu nhiên.",
      lore: "Nó có nhiều cách để tồn tại.",
      properties: [
        { name: "Chức năng", value: "Thực phẩm, có thể bị nhiễm độc" },
      ],
    },
    "minecraft:sugar_cane": {
      displayName: "§2Mía",
      description:
        "Một loại cây cao và mảnh mai mọc bên bờ nước. Thân của nó chứa đầy vị ngọt, là nguyên liệu cho đường và giấy.",
      lore: "Nó là những cột trụ của vị ngọt và tri thức.",
      properties: [{ name: "Chức năng", value: "Chế tạo đường và giấy" }],
    },
    "minecraft:cactus": {
      displayName: "§2Xương Rồng",
      description:
        "Người lính canh của sa mạc, được bao bọc trong gai nhọn. Nó tự bảo vệ mình khỏi thế giới, phá hủy bất cứ thứ gì chạm vào nó.",
      lore: "Nó là một cái ôm nguy hiểm.",
      properties: [{ name: "Hiệu ứng", value: "Gây sát thương khi chạm vào" }],
    },
    "minecraft:spruce_leaves": {
      displayName: "§2Lá Vân Sam",
      description:
        "Những tán lá kim sẫm màu của rừng taiga. Chúng dày đặc, cứng cỏi và chịu được cái lạnh của mùa đông khắc nghiệt.",
      lore: "Chúng giữ lại tuyết của mùa đông và thì thầm khi gió thổi qua.",
    },
    "minecraft:birch_leaves": {
      displayName: "§2Lá Bạch Dương",
      description:
        "Tán lá sáng màu của cây bạch dương, lốm đốm ánh nắng. Chúng mang lại một cảm giác nhẹ nhàng và thoáng đãng cho khu rừng.",
      lore: "Chúng là những chiếc quạt giấy của khu rừng.",
    },
    "minecraft:jungle_leaves": {
      displayName: "§2Lá Rừng",
      description:
        "Tán lá rộng và dày đặc của rừng rậm, một mái nhà xanh che chở khỏi những cơn mưa nhiệt đới.",
      lore: "Ẩn sau chúng là những bí mật của những ngôi đền cổ.",
    },
    "minecraft:acacia_leaves": {
      displayName: "§2Lá Keo",
      description:
        "Những tán lá nhỏ và thưa thớt của cây keo, được thiết kế để tồn tại dưới cái nắng gay gắt của thảo nguyên.",
      lore: "Chúng vươn ra để hứng từng giọt nước quý giá.",
    },
    "minecraft:dark_oak_leaves": {
      displayName: "§2Lá Sồi Sẫm",
      description:
        "Tán lá rậm rạp của những cây sồi sẫm. Chúng tạo ra một mái vòm gần như không thể xuyên thủng, che giấu mặt đất trong bóng tối.",
      lore: "Chúng tạo ra một bóng tối sâu thẳm, nơi những bí ẩn có thể ẩn náu.",
    },
    "minecraft:mangrove_leaves": {
      displayName: "§2Lá Đước",
      description:
        "Những tán lá lớn và xanh tươi của cây đước, thích nghi với cuộc sống trong môi trường ngập mặn.",
      lore: "Chúng quen với vị mặn của nước và tiếng kêu của ếch.",
    },
    "minecraft:cherry_leaves": {
      displayName: "§dLá Anh Đào",
      description:
        "Tán lá màu hồng và xanh tuyệt đẹp của cây anh đào, thả những cánh hoa màu hồng trôi theo gió như một cơn mưa nhẹ nhàng.",
      lore: "Chúng là hơi thở của mùa xuân.",
      properties: [
        { name: "Đặc tính", value: "Rơi ra các hạt cánh hoa anh đào" },
      ],
    },
    "minecraft:azalea_leaves": {
      displayName: "§2Lá Đỗ Quyên",
      description:
        "Tán lá có hoa của cây đỗ quyên, một dấu hiệu cho thấy có một thiên đường ẩn giấu bên dưới.",
      lore: "Nó là lời hứa về một thế giới ngầm đầy sức sống.",
    },
    "minecraft:nether_wart_block": {
      displayName: "§cKhối Bướu Nether",
      description:
        "Bề mặt màu đỏ rực của Rừng Đỏ Thẫm, không phải lá cây mà là một khối nấm dày đặc.",
      lore: "Nó là da thịt của Rừng Đỏ Thẫm.",
    },
    "minecraft:warped_wart_block": {
      displayName: "§3Khối Bướu Cong Vẹo",
      description:
        "Tán 'lá' màu xanh lam kỳ lạ của Rừng Cong Vẹo, một loại nấm đã bị biến đổi bởi năng lượng của End.",
      lore: "Nó rung động với một năng lượng khác thường.",
    },
    "minecraft:vine": {
      displayName: "§2Dây Leo",
      description:
        "Những cánh tay xanh của thiên nhiên, từ từ bao bọc lấy cây cối và những công trình bị lãng quên, kéo chúng trở về với đất mẹ.",
      lore: "Nó là vòng tay của thời gian, từ từ ôm lấy những gì đã bị lãng quên.",
      properties: [{ name: "Đặc tính", value: "Có thể leo trèo" }],
    },
    "minecraft:weeping_vines": {
      displayName: "§cDây Leo Than Khóc",
      description:
        "Những sợi dây leo màu đỏ thẫm nhỏ nước mắt của Nether, tạo thành một tấm rèm lửa rủ xuống từ trần hang.",
      lore: "Chúng là nước mắt của Rừng Đỏ Thẫm.",
      properties: [{ name: "Đặc tính", value: "Mọc từ trên xuống dưới" }],
    },
        "minecraft:pink_petals": {
      displayName: "§dThảm Cánh Hoa Anh Đào",
      description: "Không phải một hiệu ứng, mà là một khối vật lý hữu hình được tạo nên từ những cánh hoa mỏng manh. Nó trải một tấm thảm màu hồng trên mặt đất, và có thể được xếp chồng lên nhau, tạo ra những lớp hoa dày mỏng khác nhau.",
      lore: "Nó không phải là một khối, nó là một khoảnh khắc của mùa xuân được giữ lại trên mặt đất.",
      properties: [
        { name: "Chức năng", value: "Khối trang trí, có thể xếp chồng 4 lớp" },
        { name: "Nguồn gốc", value: "Tự nhiên sinh ra dưới cây Anh Đào, rơi ra từ Lá Anh Đào" },
        { name: "Công cụ", value: "Có thể thu thập và đặt lại, dùng Kéo (Shears) hiệu quả nhất" }
      ],
    },
    "minecraft:moss_carpet": {
      displayName: "§2Thảm Rêu",
      description: "Một lớp rêu mỏng manh, mềm mại trải trên mặt đất, một phiên bản màu xanh của thảm cánh hoa. Nó là một mảnh ghép của sự sống trong các hang động tươi tốt (Lush Caves), mọc lan ra từ những Khối Rêu.",
      lore: "Nó là một tấm thảm được dệt từ hơi ẩm và ánh sáng le lói của những viên địa y.",
      properties: [
        { name: "Chức năng", value: "Khối trang trí, có thể đặt trên mọi bề mặt" },
        { name: "Nguồn gốc", value: "Mọc ra khi dùng Bột Xương trên Khối Rêu" }
      ],
    },
      "minecraft:leaf_litter": {
      displayName: "§6Lá Khô Rụng (Leaf Litter)",
      description: "Tàn dư của mùa thu, một lớp lá khô mỏng manh trải trên mặt đất. Nó không chỉ tạo nên vẻ đẹp hoang sơ cho khu rừng mà còn là một nguồn nhiên liệu khiêm tốn cho những người sống sót.",
      lore: "Nó là tiếng thì thầm cuối cùng của chiếc lá trước khi trở về với tro bụi.",
      properties: [
        { name: "Chức năng", value: "Có thể dùng làm nhiên liệu đốt trong lò" },
        { name: "Đặc tính", value: "Rất dễ cháy và có thể lan lửa nhanh" },
        { name: "Nguồn gốc", value: "Thường xuất hiện tự nhiên dưới các tán cây trong rừng" }
      ],
    },
    "minecraft:twisting_vines": {
      displayName: "§3Dây Leo Xoắn",
      description:
        "Một loại dây leo kỳ lạ mọc thẳng lên trời, thách thức trọng lực của Nether. Chúng là những chiếc thang tự nhiên dẫn đến những nơi cao hơn.",
      lore: "Chúng là những chiếc thang dẫn đến hư không.",
      properties: [{ name: "Đặc tính", value: "Mọc từ dưới lên trên" }],
    },
    "minecraft:glow_lichen": {
      displayName: "§2Địa Y Phát Sáng",
      description:
        "Một loại địa y phát quang sinh học, bám vào bề mặt của những hang động tối tăm nhất, tạo ra một bầu trời sao dưới lòng đất.",
      lore: "Nó là ánh sáng yếu ớt của hy vọng trong bóng tối.",
      properties: [
        { name: "Chức năng", value: "Nguồn sáng yếu, có thể điều chỉnh" },
      ],
    },
    "minecraft:grass": {
      displayName: "§2Cỏ",
      description:
        "Những ngọn cỏ mềm mại mọc lên từ đất, nhảy múa trong gió. Nó là tấm thảm của thế giới.",
      lore: "Nó là tiếng thì thầm của Trái đất.",
    },
    "minecraft:fern": {
      displayName: "§2Dương Xỉ",
      description:
        "Một loại cây cổ xưa, với những chiếc lá đối xứng tinh xảo. Nó mang lại cảm giác của một khu rừng nguyên sinh.",
      lore: "Nó nhớ về thời đại của khủng long.",
    },
    "minecraft:blue_orchid": {
      displayName: "§bHoa Lan Xanh",
      description:
        "Một bông hoa hiếm và thanh tú, chỉ mọc trong môi trường ẩm ướt của đầm lầy. Vẻ đẹp của nó là một kho báu ẩn giấu.",
      lore: "Nó là giọt nước mắt của bầu trời đọng lại trên mặt đất.",
    },
    "minecraft:allium": {
      displayName: "§dHoa Hành",
      description:
        "Một bông hoa màu tím hình cầu, thuộc họ hành. Vẻ đẹp của nó đi kèm với một mùi hương đặc trưng.",
      lore: "Nó là một viên ngọc của vườn rau.",
    },
    "minecraft:azure_bluet": {
      displayName: "§fThủy Cúc Lam",
      description:
        "Một bông hoa nhỏ bé, mỏng manh với nhụy vàng, mang lại một nét chấm phá tinh tế cho những đồng cỏ.",
      lore: "Nó là một ngôi sao nhỏ bé đã rơi xuống đất.",
    },
    "minecraft:tulip": {
      displayName: "§cHoa Tulip",
      description:
        "Những bông hoa hình chuông với nhiều màu sắc rực rỡ, báo hiệu sự trở lại của mùa xuân.",
      lore: "Mỗi màu sắc là một cảm xúc khác nhau.",
    },
    "minecraft:oxeye_daisy": {
      displayName: "§fCúc Mắt Bò",
      description:
        "Một bông hoa đơn giản và thân thuộc, với những cánh trắng và nhụy vàng. Nó là nụ cười của đồng cỏ.",
      lore: "Trẻ con thường dùng nó để bói tình yêu.",
    },
    "minecraft:cornflower": {
      displayName: "§1Hoa Thanh Cúc",
      description:
        "Một bông hoa màu xanh lam sâu thẳm, màu của bầu trời lúc chạng vạng. Nó là nguồn cung cấp cho loại thuốc nhuộm xanh quý giá.",
      lore: "Nó chứa đựng màu xanh của những viên lưu ly.",
    },
    "minecraft:lily_of_the_valley": {
      displayName: "§fHoa Linh Lan",
      description:
        "Những chùm hoa trắng hình chuông nhỏ bé, mang một vẻ đẹp trong sáng nhưng lại chứa đựng độc tố.",
      lore: "Vẻ đẹp của nó là một lời cảnh báo.",
      properties: [
        { name: "Đặc tính", value: "Gây hiệu ứng độc khi chế tạo thuốc" },
      ],
    },
    "minecraft:sunflower": {
      displayName: "§eHoa Hướng Dương",
      description:
        "Một bông hoa cao lớn và rực rỡ, luôn hướng về phía ánh sáng. Nó là một biểu tượng của sự lạc quan và niềm vui.",
      lore: "Nó là khuôn mặt của mặt trời trên mặt đất.",
      properties: [{ name: "Đặc tính", value: "Luôn quay về hướng đông" }],
    },
    "minecraft:lilac": {
      displayName: "§dHoa Tử Đinh Hương",
      description:
        "Những chùm hoa màu tím thơm ngát, cao và duyên dáng. Nó mang lại một cảm giác lãng mạn cho bất kỳ khu vườn nào.",
      lore: "Mùi hương của nó là ký ức của mùa hè.",
    },
    "minecraft:rose_bush": {
      displayName: "§cụi Hồng",
      description:
        "Một bụi cây đầy gai góc nhưng lại nở ra những bông hoa hồng đỏ thắm, biểu tượng của tình yêu và đam mê.",
      lore: "Vẻ đẹp của nó cần được bảo vệ.",
    },
    "minecraft:peony": {
      displayName: "§dHoa Mẫu Đơn",
      description:
        "Những bông hoa lớn màu hồng, với nhiều lớp cánh mềm mại. Nó là hiện thân của sự sang trọng và thịnh vượng.",
      lore: "Nó là nữ hoàng của các loài hoa.",
    },
    "minecraft:wither_rose": {
      displayName: "§8Hoa Hồng Wither",
      description:
        "Một bông hoa sinh ra từ cái chết, mọc lên nơi một sinh vật bị Wither giết chết. Vẻ đẹp của nó là một cái bẫy chết người.",
      lore: "Nó là bóng tối được kết thành hoa.",
      properties: [
        {
          name: "Hiệu ứng",
          value: "Gây hiệu ứng Wither cho những ai chạm vào",
        },
      ],
    },
    "minecraft:spore_blossom": {
      displayName: "§dHoa Bào Tử",
      description:
        "Một bông hoa lớn treo trên trần hang, liên tục tỏa ra những bào tử xanh lơ, lấp đầy không khí với một vẻ đẹp huyền ảo.",
      lore: "Nó là hơi thở của một khu vườn bí mật.",
      properties: [
        { name: "Hiệu ứng", value: "Tạo ra các hạt bào tử trong không khí" },
      ],
    },
     "minecraft:grass": {
      displayName: "§2Cỏ",
      description:
        "Những ngọn cỏ mềm mại mọc lên từ đất, nhảy múa trong gió. Nó là tấm thảm của thế giới. Thỉnh thoảng, phá vỡ nó có thể tìm thấy những hạt giống bị lãng quên.",
      lore: "Nó là tiếng thì thầm của Trái đất.",
      properties: [{ name: "Nguồn cung cấp", value: "Hạt giống (hiếm)" }],
    },
    "minecraft:torchflower": {
      displayName: "§cHoa Đuốc",
      description:
        "Một loài hoa cổ đại với màu sắc rực rỡ như ngọn lửa. Ánh sáng nhẹ nhàng của nó không thực sự chiếu sáng, nhưng vẻ đẹp của nó thắp sáng bất kỳ khu vườn nào.",
      lore: "Nó mang trong mình ánh hoàng hôn của một thế giới đã mất.",
      properties: [
        { name: "Nguồn gốc", value: "Trồng từ Hạt Giống Hoa Đuốc do Sniffer tìm thấy" },
      ],
    },
    "minecraft:pitcher_plant": {
      displayName: "§3Cây Nắp Ấm",
      description:
        "Một loài cây tiền sử khác đã được hồi sinh. Cấu trúc hai phần độc đáo của nó là một lời nhắc nhở về sự đa dạng đã từng tồn tại trên thế giới.",
      lore: "Nó nhớ những cơn mưa từ một thời đại khác.",
      properties: [
        { name: "Nguồn gốc", value: "Trồng từ Cây Non Nắp Ấm do Sniffer tìm thấy" },
      ],
    },
    "minecraft:trial_spawner": {
      displayName: "§cMáy Triệu Hồi Thử Thách",
      description:
        "Một phiên bản nâng cao và đáng sợ hơn của Lồng Triệu Hồi. Nó không chỉ sinh ra quái vật mà còn theo dõi số lượng người chơi, điều chỉnh độ khó của thử thách và nhả ra phần thưởng xứng đáng sau khi hoàn thành.",
      lore: "Nó không chỉ sinh ra thử thách, nó còn đếm số người dám đối mặt.",
      properties: [
        { name: "Chức năng", value: "Tạo ra một làn sóng quái vật dựa trên số người chơi" },
        { name: "Phần thưởng", value: "Nhả ra vật phẩm sau khi tiêu diệt hết quái vật" },
      ],
    },
    "minecraft:vault": {
      displayName: "§eRương Thử Thách (Vault)",
      description:
        "Một chiếc rương bí ẩn chứa đầy kho báu, chỉ có thể được mở khóa bằng Chìa Khóa Thử Thách (Trial Key). Mỗi người chơi có thể nhận phần thưởng từ nó một lần, biến nó thành một phần thưởng công bằng cho cả nhóm.",
      lore: "Nó chỉ mở ra cho những người đã chứng tỏ được giá trị của mình.",
      properties: [
        { name: "Chức năng", value: "Mở khóa bằng Chìa Khóa Thử Thách" },
        { name: "Đặc tính", value: "Mỗi người chơi có thể nhận thưởng một lần duy nhất" },
      ],
    },
    "minecraft:decorated_pot": {
        displayName: "§6Bình Gốm Trang Trí",
        description: "Một mảnh vỡ của quá khứ được tái tạo. Bốn mặt của nó có thể được trang trí bằng các Mảnh Gốm khác nhau, mỗi mảnh kể một phần của một câu chuyện đã bị lãng quên.",
        lore: "Nó là một cuốn sách được viết bằng đất sét.",
        properties: [{ name: "Chức năng", value: "Khối trang trí, có thể tùy chỉnh hình ảnh từ Mảnh Gốm" }]
    },
    "minecraft:suspicious_sand": {
        displayName: "§eCát Khả Nghi",
        description: "Thoạt nhìn, nó giống như cát bình thường, nhưng một con mắt tinh tường sẽ nhận thấy kết cấu hơi khác biệt. Hãy dùng Chổi Quét một cách nhẹ nhàng, và bạn có thể khám phá ra những kho báu bị chôn vùi bên trong.",
        lore: "Nó chứa đựng những bí mật mà sa mạc đã nuốt chửng.",
        properties: [{ name: "Chức năng", value: "Có thể quét bằng Chổi Quét để tìm vật phẩm" }]
    },
        "minecraft:sculk": {
      displayName: "§1Khối Sculk",
      description: "Da thịt của Vực Sâu. Một khối vật chất sống, lan rộng nhờ những linh hồn đã khuất. Nó không nguy hiểm, nhưng sự hiện diện của nó báo hiệu một mối nguy hiểm còn lớn hơn đang ẩn nấp gần đó.",
      lore: "Nó là đất được nuôi dưỡng bằng kinh nghiệm và sự im lặng.",
      properties: [
        { name: "Chức năng", value: "Lan rộng khi quái vật chết gần Máy Xúc Tác Sculk" },
        { name: "Tài nguyên", value: "Cung cấp nhiều kinh nghiệm khi bị phá" }
      ]
    },
    "minecraft:sculk_vein": {
      displayName: "§1Mạch Sculk",
      description: "Những tĩnh mạch của Vực Sâu, từ từ lan rộng trên bề mặt của các khối khác. Chúng là dấu hiệu đầu tiên của sự xâm lấn, một lớp màng mỏng manh nhưng đầy điềm báo.",
      lore: "Nó là một lời thì thầm của bóng tối, dần dần bao phủ lấy ánh sáng.",
      properties: [
        { name: "Đặc tính", value: "Lan rộng từ Máy Xúc Tác Sculk, có thể đặt trên mọi mặt" }
      ]
    },
    "minecraft:sculk_sensor": {
      displayName: "§1Cảm Biến Sculk",
      description: "Đôi tai của Vực Sâu. Cơ quan nhạy cảm này không nhìn thấy, mà 'nghe' thấy các rung động - từ bước chân, tiếng đặt khối, đến cả một mũi tên bay. Khi bị kích hoạt, nó gửi một tín hiệu đến những khối Sculk khác.",
      lore: "Nó nghe thấy cả những bí mật mà bạn cố giấu.",
      properties: [
        { name: "Chức năng", value: "Phát hiện rung động và phát ra tín hiệu Redstone" },
        { name: "Kích hoạt", value: "Có thể kích hoạt Máy Hú Sculk gần đó" }
      ]
    },
    "minecraft:sculk_catalyst": {
      displayName: "§1Máy Xúc Tác Sculk",
      description: "Trái tim của sự lây lan. Khối kỳ lạ này nở hoa khi có một sinh vật mang lại kinh nghiệm chết gần đó. Nó tiêu thụ linh hồn đó để biến những khối xung quanh thành Sculk, mở rộng lãnh địa của Vực Sâu.",
      lore: "Nó biến cái chết thành sự sống... một dạng sống khác.",
      properties: [
        { name: "Chức năng", value: "Biến đổi các khối xung quanh thành Sculk khi có sinh vật chết gần đó" }
      ]
    },

    // PHẦN 2: CÁC LOẠI RƯƠNG VÀ LƯU TRỮ CÒN THIẾU
    "minecraft:trapped_chest": {
      displayName: "§eRương Bẫy",
      description: "Một kẻ lừa đảo tinh vi. Trông gần như giống hệt một chiếc rương bình thường, nhưng việc mở nó sẽ gửi đi một tín hiệu Redstone. Hoàn hảo cho những cái bẫy và các hệ thống bí mật.",
      lore: "Một lời cảnh báo tinh tế cho những kẻ tham lam: luôn để ý đến vòng kim loại màu đỏ.",
      properties: [
        { name: "Chức năng", value: "Phát ra tín hiệu Redstone khi được mở" },
        { name: "Đặc tính", value: "Không thể đặt cạnh một Rương Bẫy khác để tạo thành rương lớn" }
      ]
    },
    
    // PHẦN 3: CÁC BÀN CHẾ TÁC VÀ KHỐI CHỨC NĂNG
    "minecraft:smithing_table": {
      displayName: "§8Bàn Rèn",
      description: "Bàn làm việc của những thợ rèn bậc thầy. Chỉ tại đây, sức mạnh của kim cương mới có thể được kết hợp với sự bền bỉ của Netherite. Nó cũng dùng để gắn các Mẫu Rèn lên trang bị.",
      lore: "Nơi trang bị tốt trở nên huyền thoại.",
      properties: [
        { name: "Chức năng", value: "Nâng cấp trang bị Kim Cương lên Netherite, áp dụng Mẫu Rèn" },
        { name: "Nghề nghiệp", value: "Toolsmith (Thợ Rèn Công Cụ) của Dân Làng" }
      ]
    },
    "minecraft:grindstone": {
      displayName: "§0Đá Mài",
      description: "Một công cụ đa năng cho mọi nhà thám hiểm. Nó có thể sửa chữa hai vật phẩm cùng loại, hoặc loại bỏ tất cả các phù phép (trừ lời nguyền) khỏi một vật phẩm, hoàn lại một phần kinh nghiệm.",
      lore: "Nơi ma thuật bị xóa bỏ và những sai lầm được sửa chữa.",
      properties: [
        { name: "Chức năng", value: "Sửa chữa vật phẩm, loại bỏ phù phép" },
        { name: "Nghề nghiệp", value: "Weaponsmith (Thợ Rèn Vũ Khí) của Dân Làng" }
      ]
    },
    "minecraft:stonecutter": {
      displayName: "§0Bàn Cắt Đá",
      description: "Công cụ của một kiến trúc sư thực thụ. Nó cho phép chế tác các biến thể của đá (bậc thang, phiến, tường) một cách hiệu quả hơn nhiều so với Bàn Chế Tạo, chỉ với một khối duy nhất.",
      lore: "Độ chính xác và hiệu quả được khắc vào đá.",
      properties: [
        { name: "Chức năng", value: "Chế tác các khối đá một cách tiết kiệm" },
        { name: "Nghề nghiệp", value: "Mason (Thợ Xây) của Dân Làng" }
      ]
    },
    "minecraft:cartography_table": {
      displayName: "§6Bàn Bản Đồ",
      description: "Bàn làm việc của những nhà thám hiểm. Nó giúp sao chép, mở rộng và khóa các bản đồ, cũng như đặt tên cho chúng để ghi dấu những cuộc hành trình vĩ đại.",
      lore: "Nơi thế giới được vẽ lại trên giấy.",
      properties: [
        { name: "Chức năng", value: "Sao chép, khóa và phóng to bản đồ" },
        { name: "Nghề nghiệp", value: "Cartographer (Người Vẽ Bản Đồ) của Dân Làng" }
      ]
    },
    "minecraft:loom": {
      displayName: "§6Khung Dệt",
      description: "Nơi những lá cờ được dệt nên. Với một chút thuốc nhuộm, một biểu ngữ đơn giản có thể được biến thành một tác phẩm nghệ thuật phức tạp, biểu tượng cho một bang hội, một vương quốc, hoặc một lời tuyên chiến.",
      lore: "Những sợi chỉ kể chuyện.",
      properties: [
        { name: "Chức năng", value: "Tạo và tùy chỉnh các mẫu Cờ Hiệu (Banner)" },
        { name: "Nghề nghiệp", value: "Shepherd (Người Chăn Cừu) của Dân Làng" }
      ]
    },
    "minecraft:lectern": {
      displayName: "§6Bục Đọc Sách",
      description: "Một nơi trang trọng để đặt những cuốn sách ghi chép. Nhiều người có thể đọc cùng một cuốn sách từ đây. Nó là trung tâm của một thư viện hoặc một nhà thờ.",
      lore: "Nơi tri thức được chia sẻ.",
      properties: [
        { name: "Chức năng", value: "Giữ Sách & Bút, phát tín hiệu Redstone dựa trên trang đang đọc" },
        { name: "Nghề nghiệp", value: "Librarian (Thủ Thư) của Dân Làng" }
      ]
    },
    "minecraft:fletching_table": {
      displayName: "§6Bàn Làm Tên",
      description: "Bàn làm việc của một người thợ làm cung tên chuyên nghiệp. Mặc dù hiện tại nó không có chức năng đặc biệt cho người chơi, nó vẫn là nơi dân làng tạo ra những mũi tên sắc bén.",
      lore: "Một lời hứa về độ chính xác và tầm xa.",
      properties: [
        { name: "Chức năng", value: "Chưa có cho người chơi" },
        { name:"Nghề nghiệp", value: "Fletcher (Người Làm Tên) của Dân Làng" }
      ]
    },
        "minecraft:bell": {
      displayName: "§eChuông Làng",
      description: "Trái tim âm thanh của một ngôi làng. Một tiếng chuông vang lên sẽ gọi tất cả dân làng vào nhà an toàn. Nó cũng có thể làm nổi bật những mối đe dọa gần đó, khiến chúng phát sáng.",
      lore: "Tiếng chuông của nó là tiếng gọi của sự đoàn kết và cảnh giác.",
      properties: [
        { name: "Chức năng", value: "Cảnh báo dân làng, làm lộ diện kẻ địch trong các cuộc đột kích" }
      ]
    },
    "minecraft:composter": {
      displayName: "§6Thùng Ủ Phân",
      description: "Một công cụ kỳ diệu biến rác thải hữu cơ thành tài nguyên quý giá. Bằng cách vứt bỏ thực vật và hạt giống dư thừa vào đó, bạn sẽ nhận lại được bột xương.",
      lore: "Nơi sự mục rữa trở thành sự tái sinh.",
      properties: [
        { name: "Chức năng", value: "Tạo Bột Xương từ các vật phẩm thực vật" },
        { name: "Nghề nghiệp", value: "Farmer (Nông Dân) của Dân L làng" }
      ]
    },
    "minecraft:lodestone": {
      displayName: "§8Đá Từ Tính",
      description: "Một khối đá được truyền từ tính, có khả năng 'ghi nhớ' vị trí của nó. Một chiếc la bàn được sử dụng trên khối đá này sẽ không còn chỉ về điểm spawn, mà sẽ mãi mãi chỉ về phía khối đá này, dù ở bất kỳ chiều không gian nào.",
      lore: "Nó là một mỏ neo trong không gian, một ngôi sao dẫn đường do chính tay bạn tạo ra.",
      properties: [
        { name: "Chức năng", value: "Định hướng La Bàn đến một vị trí cụ thể" }
      ]
    },
    "minecraft:respawn_anchor": {
      displayName: "§dMỏ Neo Hồi Sinh",
      description: "Một thiết bị nguy hiểm nhưng vô giá cho các nhà thám hiểm Nether. Được sạc bằng Đá Phát Sáng, nó cho phép bạn đặt điểm hồi sinh ngay tại địa ngục. Nhưng hãy cẩn thận, sử dụng nó ở Overworld sẽ gây ra một hậu quả thảm khốc.",
      lore: "Nó bẻ cong các quy tắc của sự sống và cái chết, nhưng phải trả giá.",
      properties: [
        { name: "Chức năng", value: "Đặt điểm hồi sinh ở Nether" },
        { name: "Cảnh báo", value: "Sẽ phát nổ nếu sử dụng ở Overworld hoặc The End" }
      ]
    },
        "minecraft:dripstone_block": {
      displayName: "§6Khối Thạch Nhũ",
      description: "Vật liệu chính tạo nên các Hang Động Thạch Nhũ, một loại đá được hình thành qua hàng ngàn năm bởi nước nhỏ giọt. Từ nó, những măng đá và thạch nhũ sắc nhọn có thể mọc ra.",
      lore: "Nó là bằng chứng cho sự kiên nhẫn của nước.",
      properties: [
        { name: "Chức năng", value: "Cho phép Măng đá và Thạch nhũ mọc từ đó" }
      ]
    },
    "minecraft:pointed_dripstone": {
      displayName: "§6Thạch Nhũ Sắc Nhọn",
      description: "Một cái răng bằng đá của Trái Đất, có thể mọc từ trên xuống hoặc từ dưới lên. Rơi xuống hoặc nhảy lên nó đều là một ý tưởng tồi, vì sự sắc nhọn của nó có thể gây chết người.",
      lore: "Một giọt nước rơi xuống. Một ngàn năm sau, một ngọn giáo được hình thành.",
      properties: [
        { name: "Hiệu ứng", value: "Gây sát thương khi rơi hoặc nhảy lên" },
        { name: "Chức năng", value: "Có thể hứng nước hoặc dung nham từ trên cao" }
      ]
    },
  },
  
};

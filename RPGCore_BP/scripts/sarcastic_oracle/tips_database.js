// --- START OF FILE sarcastic_oracle/tips_database.js ---

/**
 * SARCASTIC_TIPS DATABASE
 * Cơ sở dữ liệu chứa các câu nói châm biếm, được phân loại theo các trigger (hành động kích hoạt).
 * Mỗi key đại diện cho một loại hành động trong game.
 */
export const SARCASTIC_TIPS = {
    DIG_STRAIGHT_DOWN: [
        "Ngươi đào thẳng xuống vì tin vào vận may mù quáng, rồi lại lớn tiếng đổ lỗi cho định mệnh nghiệt ngã khi thân xác chìm dần trong dung nham. Kẻ ngu dốt luôn có xu hướng gọi hậu quả tất yếu của sự lười biếng là 'xui rủi'.",
        "Ngươi đứng trên một khối cát mỏng manh và đào ngay khối đá dưới chân mình, hoàn toàn phớt lờ định luật vật lý cơ bản nhất. Ngươi đã vi phạm quy tắc đầu tiên, không phải của thế giới này, mà là của sự tồn tại có ý thức.",
        "Mỗi khối ngươi đào xuống là một bước tiến gần hơn đến kho báu tiềm tàng, hoặc một bước trượt dài hơn vào sự ngu ngốc vô tận. Vũ trụ đang hồi hộp quan sát xem bản năng tham lam hay lý trí mỏng manh của ngươi sẽ chiến thắng.",
        "Âm thanh của sỏi rơi lạo xạo bên dưới không phải là điềm báo xui xẻo, nó là một định luật vật lý đang chuẩn bị dạy cho ngươi một bài học đắt giá về sự kiên nhẫn, một đức tính mà ngươi rõ ràng đã bỏ qua trong sách giáo khoa của mình.",
        "Ngươi phó thác toàn bộ mạng sống và gia tài của mình cho một khối đá duy nhất, thứ ngăn cách ngươi với một cái chết nóng bỏng và tức tưởi. Đó không phải là lòng dũng cảm phi thường, đó là một canh bạc liều lĩnh với tỷ lệ cược tồi tệ nhất vũ trụ."
    ],
    LOW_HUNGER_WITH_FOOD: [
        "Ngươi đang chết đói trong khi túi đồ của ngươi chứa cả một bữa tiệc thịt sống. Lò nung không chỉ là một vật trang trí, nó là ranh giới mỏng manh giữa một kẻ sinh tồn thông thái và một bữa ăn di động béo bở cho lũ zombie.",
        "Ngươi có thể tạo ra những cỗ máy redstone phức tạp đến mức đáng kinh ngạc, nhưng lại không thể nhớ nổi một hành động cơ bản là phải ăn. Một thiên tài với cái dạ dày rỗng tuếch, đang mải mê theo đuổi những mục tiêu vĩ đại trong khi chính cơ thể mình đang dần sụp đổ từ bên trong.",
        "Thanh thức ăn của ngươi đang biểu tình một cách dữ dội, nó là tiếng nói cuối cùng của cơ thể trước khi nó quyết định đình công vĩnh viễn. Có lẽ ngươi nên lắng nghe nó, thay vì cố gắng đào thêm 'chỉ một khối nữa thôi'.",
        "Ngươi sở hữu cả một kho lương thực khổng lồ, đủ để nuôi sống cả một ngôi làng, nhưng lại sống trong nỗi sợ hãi thường trực của cơn đói. Sự giàu có thực sự không nằm ở những gì ngươi tích trữ, mà ở sự khôn ngoan để sử dụng chúng đúng lúc, đúng chỗ.",
        "Đói ư? Và ngươi quyết định ăn thịt thối. Cơn đói thể xác sẽ qua đi, nhưng cảm giác ghê tởm về sự lựa chọn đường cùng của ngươi sẽ còn mãi. Đó là một bài học cay đắng về tầm quan trọng của việc chuẩn bị, một bài học mà ngươi vừa phải trả giá bằng nhân phẩm của mình."
    ],
    WRONG_TOOL_USAGE: [
        "Ngươi dùng một chiếc cuốc gỗ ọp ẹp để cố gắng khai thác kim cương, rồi lại than vãn vì sao nó không rơi ra. Đó là lời từ chối nhẹ nhàng của vũ trụ trước một hành động ngu xuẩn đến mức gần như trở thành một loại hình nghệ thuật.",
        "Ngươi vung kiếm liên tục vào cái khiên vững chắc của kẻ địch, trong khi chiếc rìu trên lưng ngươi đang gào thét trong câm lặng về công dụng thật sự của nó. Nhưng ta đoán rằng tiếng gào đó không thể nào to bằng sự im lặng trống rỗng trong đầu ngươi.",
        "Ngươi cố gắng chiến đấu với một con Ghast lơ lửng ở xa bằng một thanh kiếm. Một nỗ lực thật đáng khen ngợi, nếu mục tiêu của ngươi là làm trò cười cho toàn bộ Nether và chứng minh rằng khái niệm về 'khoảng cách' hoàn toàn xa lạ với ngươi.",
        "Dùng xẻng để chặt cây không làm ngươi trở thành một nhà đổi mới sáng tạo. Nó chỉ chứng tỏ rằng ngươi sẵn sàng lãng phí gấp đôi thời gian và độ bền của công cụ cho một việc mà thế giới này đã có một giải pháp hoàn hảo từ lâu.",
        "Mỗi công cụ được sinh ra là một câu trả lời cho một vấn đề cụ thể. Việc ngươi cố tình dùng sai câu trả lời cho thấy ngươi thậm chí còn không hiểu được câu hỏi đặt ra là gì, một sự thiếu hiểu biết ở mức độ cơ bản nhất."
    ],
    POOR_LIGHTING: [
        "Ngươi cắm đuốc cách nhau cả một quãng đường rồi lại ngây thơ tự hỏi vì sao quái vật vẫn xuất hiện. Chúng không sinh ra từ bóng tối thuần túy, chúng được sinh ra từ chính sự kết hợp giữa keo kiệt và lười biếng của ngươi.",
        "Ngươi xây một bức tường kiên cố bao quanh làng, nhưng lại quên thắp sáng những con hẻm tối tăm bên trong. Ngươi không tạo ra một pháo đài an toàn, ngươi chỉ tạo ra một cái lồng spawner khổng lồ, một đấu trường sinh tử cho những dân làng vô tội.",
        "Bóng tối tự nó không phải là kẻ thù, nó chỉ là một khoảng trống chờ được lấp đầy. Kẻ thù thực sự là những thứ ghê rợn mà sự lười biếng của ngươi đã cho phép chúng lấp đầy khoảng trống đó, ngay trước ngưỡng cửa nhà ngươi.",
        "Một ngọn đuốc chỉ tốn một mẩu than và một que củi. Sự an toàn của cả một công trình kiến trúc, của cả một đêm dài sinh tồn, lại không đáng giá bằng từng đó sao? Sự tính toán của ngươi thật sự đáng quan ngại.",
        "Ngươi không sợ bóng tối, ngươi chỉ sợ những hậu quả khủng khiếp của việc không chuẩn bị cho nó. Một nỗi sợ hoàn toàn có thể tránh được, nhưng không, ngươi lại chọn cách đối mặt với nó mỗi khi mặt trời lặn."
    ],
    FALL_NEAR_EDGE: [
        "Nút Shift không chỉ dùng để đi chậm, nó là một lời cam kết với sự an toàn, một tính năng được thiết kế riêng cho những kẻ có xu hướng tự gieo mình vào không trung một cách bốc đồng và vô nghĩa.",
        "Ngươi mang theo xô nước như một món phụ kiện trang trí, thay vì nhớ rằng nó có thể xóa đi toàn bộ hậu quả của một cú ngã ngu ngốc. Trọng lực là một định luật không thể thay đổi, còn MLG là một kỹ năng cần luyện tập. Ngươi không có cả hai.",
        "Ngươi tự hào gọi đó là một 'lối tắt', một con đường mạo hiểm dành cho kẻ dũng cảm. Ta thì gọi đó là một con đường ngắn hơn dẫn đến màn hình 'Bạn đã chết', một sự tối ưu hóa hoàn hảo cho con đường dẫn đến thất bại.",
        "Khoảng không luôn luôn kiên nhẫn hơn ngươi. Nó sẽ chờ đợi cái khoảnh khắc ngươi mất tập trung, cái khoảnh khắc ngươi tự tin thái quá vào một cú nhảy mà ngươi chưa bao giờ thực hành. Và nó luôn luôn chiến thắng.",
        "Ngươi đã cất công xây một cây cầu an toàn, nhưng lại quyết định đi bộ trên dải rìa mỏng manh của nó, chỉ cách sự an toàn đúng một khối. Một hành động nhỏ nhoi để chứng tỏ sự liều lĩnh vô nghĩa, và một lời mời gọi công khai dành cho thảm họa."
    ],
    SLEEP_NEAR_MONSTERS: [
        "Ngươi cố gắng đi ngủ trong khi có quái vật ở gần. Game không cho phép, không phải vì nó là một hệ thống cứng nhắc, mà vì nó đang cố gắng bảo vệ ngươi khỏi chính sự thờ ơ đến mức nguy hiểm của ngươi.",
        "Giấc ngủ là một trạng thái dễ bị tổn thương nhất của mọi sinh vật. Thế giới này chỉ đơn giản là không cho phép ngươi được phép yếu đuối khi nguy hiểm còn đang rình rập ngay bên ngoài. Hãy biết ơn lời cảnh báo đó.",
        "'Bạn không thể nghỉ ngơi bây giờ, có quái vật ở gần.' - Đây không phải là một thông báo lỗi khó chịu, nó là một bản báo cáo chi tiết về tình trạng an ninh yếu kém của chính nơi mà ngươi gọi là 'nhà'.",
        "Thế giới muốn ngươi được nghỉ ngơi để có sức mạnh đối mặt với ngày mai. Nhưng trước hết, nó muốn ngươi phải dùng trí tuệ của mình để đảm bảo rằng mình sẽ có một 'ngày mai' để mà đối mặt đã.",
        "Con quái vật dưới gầm giường không còn là chuyện cổ tích nữa. Việc ngươi cố gắng phớt lờ nó và trùm chăn đi ngủ chỉ cho thấy ngươi giỏi chạy trốn khỏi vấn đề hơn là dũng cảm đối mặt và giải quyết chúng."
    ],
    IGNORE_CREEPER: [
        "Ngươi nghe thấy tiếng 'sss…' và quyết định chạy, nhưng cả cuộc đời ngươi vẫn không thể chạy thoát khỏi cái thói quen xem thường những cảnh báo nhỏ bé cho đến khi chúng phát nổ ngay trước mặt ngươi.",
        "Ngươi thấy một con Creeper đang lảng vảng gần căn nhà gỗ tâm huyết của mình và tự nhủ sẽ 'xử lý sau'. 'Sau' thường là khoảnh khắc ngươi đang đứng chết lặng chiêm ngưỡng một cái hố khổng lồ thay cho phòng khách, một bài học cực kỳ đắt giá về sự trì hoãn.",
        "Creeper không hề ghét ngươi. Nó chỉ là một thực thể được lập trình để tìm kiếm và phá hủy trong im lặng. Giống như sự tự mãn của ngươi vậy, nó lặng lẽ tiến đến và phá hủy mọi thành quả mà ngươi đã dày công xây dựng.",
        "Chạy đi, hoặc dũng cảm chiến đấu với một tấm khiên giơ cao. Đứng yên và hy vọng nó sẽ tự động bỏ đi không phải là một chiến thuật sinh tồn, đó là một lời cầu nguyện trong tuyệt vọng của một kẻ sắp thất bại.",
        "Mỗi cái hố trên mặt đất không phải là một tai nạn tự nhiên. Nó là một bia tưởng niệm trang trọng cho một ai đó đã từng ngây thơ nghĩ rằng 'mình có đủ thời gian để phản ứng'. Thời gian là thứ mà một con Creeper luôn tính toán chính xác hơn ngươi."
    ],
    GEAR_DOESNT_HELP: [
        "Một thanh kiếm Netherite lấp lánh không thể biến một kẻ hèn nhát thành một anh hùng huyền thoại. Nó chỉ có thể biến một cái chết rẻ tiền, đáng quên thành một bi kịch vô cùng đắt đỏ và đáng tiếc.",
        "Ngươi mang một tấm khiên để che chắn cho thân thể, nhưng đáng tiếc là chẳng có tấm khiên nào trên thế giới này đủ lớn để che nổi khoảng trống mênh mông giữa hai tai của ngươi, nơi mà những quyết định tồi tệ liên tục được sinh ra.",
        "Bộ giáp Netherite của ngươi có thể chống lại lửa và những cú đánh trời giáng, nhưng nó hoàn toàn bất lực trước định luật vạn vật hấp dẫn. Nó chỉ khiến cú va chạm của ngươi với thực tại trở nên đắt đỏ hơn mà thôi.",
        "Ngươi mặc trên người bộ giáp tốt nhất, thứ vũ khí mạnh nhất, nhưng lại quên mang theo một xô nước đơn giản. Một chiến binh hùng mạnh sắp bị thiêu rụi bởi một hồ dung nham rộng ba khối. Thật là một cái kết lãng xẹt và đáng xấu hổ.",
        "Trang bị của ngươi hét lên 'huyền thoại sống', nhưng chiến thuật của ngươi lại thì thầm 'nạn nhân tiếp theo'. Khoảng cách giữa vẻ bề ngoài hào nhoáng và thực tại phũ phàng của ngươi thật sự rất đáng buồn."
    ],
    PHANTOM_SPAWN: [
        "Phantom không phải là quái vật, chúng là hiện thân hữu hình của sự vô kỷ luật. Thế giới này chỉ nhẹ nhàng nhắc nhở ngươi đi ngủ, nhưng không, ngươi lại chọn cách bị tấn công từ trên trời bởi những cơn ác mộng biết bay.",
        "Bầu trời đang phán xét sự thiếu ngủ trầm trọng của ngươi. Mỗi con Phantom lao xuống là một lời buộc tội đanh thép cho việc ngươi đã coi thường nhịp sinh học cơ bản nhất của sự sống.",
        "Chúng là một lời nhắc nhở sống động rằng mọi hành động đều có hậu quả tương xứng. Và hậu quả của việc thức trắng ba đêm liền không phải là quầng thâm mắt, mà là một cơn ác mộng biết bay đang săn lùng ngươi.",
        "Một chiếc giường đơn giản có thể giải quyết toàn bộ vấn đề này. Nhưng có vẻ như ngươi lại thích một cuộc chiến không cân sức trên không hơn là một giấc ngủ yên bình. Một lựa chọn thật sự rất kỳ lạ.",
        "Đừng nhìn lên trời, không phải vì sợ hãi. Mà là để dũng cảm thừa nhận rằng vấn đề không nằm ở trên đó, nó nằm ở việc ngươi đã cố tình từ chối chiếc giường ấm áp của mình hết lần này đến lần khác."
    ],
    LOOK_AT_ENDERMAN: [
        "Nhìn thẳng vào mắt một Enderman là một lời mời đánh nhau mà ngươi không có cơ hội chiến thắng. Chúng chỉ khao khát sự riêng tư trong không gian của mình, còn ngươi thì lại muốn chứng minh rằng sự tò mò có thể giết chết một kẻ ngốc một cách nhanh chóng.",
        "Cắt một quả bí ngô và đội lên đầu sẽ giúp ngươi tránh được ánh mắt chết người của Enderman. Trông ngươi sẽ cực kỳ ngớ ngẩn, nhưng thà ngớ ngẩn mà sống sót còn hơn là ngầu mà chết trong một cuộc chiến vô nghĩa và không cần thiết.",
        "Hắn chỉ đang đứng đó, trầm ngâm suy tư về bản chất của các khối vuông và sự tồn tại. Và rồi ngươi đến, nhìn chằm chằm vào hắn như một kẻ mất lịch sự nhất vũ trụ. Giờ thì hãy nhận lấy bài học về không gian cá nhân của người khác đi.",
        "Giao tiếp bằng mắt là một nghệ thuật tinh tế trong xã hội. Với Enderman, đó là một lời tuyên chiến không thể nào rút lại. Ngươi vừa vô tình bắt đầu một cuộc chiến mà ngươi không hề có sự chuẩn bị nào.",
        "Chúng có thể dịch chuyển tức thời xuyên qua không gian. Ngươi thì phải chạy bộ một cách nặng nhọc. Hãy dành một giây suy nghĩ về lợi thế chiến thuật đó trước khi quyết định nhìn vào mắt một thực thể cao, gầy và cực kỳ dễ nổi nóng."
    ],
    NO_GOLD_IN_NETHER: [
        "Lũ Piglin không tấn công vì chúng ghét bỏ ngươi, chúng tấn công vì chúng ghét cay ghét đắng gu thời trang thiếu vàng của ngươi. Một miếng vàng nhỏ để mua lấy sự tôn trọng và an toàn, một bài học xã giao đơn giản nhưng có vẻ quá khó cho ngươi.",
        "Chúng là những nhà tư bản tàn nhẫn trong một thế giới rực lửa và hỗn loạn. Không có vàng, không có bạn bè, chỉ có những chiếc nỏ lạnh lùng đang nhắm thẳng vào ngươi từ mọi phía.",
        "Ngươi ngang nhiên bước vào nhà của chúng mà không mang theo quà, tự tiện mở những chiếc rương của chúng và rồi lại ngây thơ tự hỏi tại sao chúng lại tức giận. Sự ngây thơ của ngươi thật đáng kinh ngạc và cũng thật nguy hiểm.",
        "Cả một pháo đài rộng lớn đầy những sinh vật yêu vàng đến ám ảnh, và ngươi lại không mang theo dù chỉ một thỏi để giữ an toàn cho bản thân. Sự chuẩn bị của ngươi không chỉ thiếu sót, nó còn là một lời mời gọi công khai dành cho thảm họa.",
        "Chúng chỉ muốn giao dịch một cách hòa bình và khoe khoang sự giàu có của mình. Ngươi lại đến với hai bàn tay trắng và một thanh kiếm sắc bén, như một kẻ đến để phá hoại bữa tiệc. Và chúng thì không bao giờ thích những kẻ phá hoại."
    ],
    TRIGGER_TRAP: [
        "Ngươi nhìn thấy một ngôi đền cổ và lao thẳng vào mà không thèm nhìn xuống chân. Những cái bẫy này được tạo ra không phải để thử thách những người hùng vĩ đại, mà là để thanh lọc những kẻ ngu ngốc ra khỏi vòng lặp sinh tồn của thế giới.",
        "Tiếng 'click' khô khốc mà ngươi vừa nghe thấy không phải là một lời chào mừng. Nó là âm thanh của sự bất cẩn của ngươi đang được chuyển hóa một cách hoàn hảo thành sát thương vật lý sắp xảy ra.",
        "Kho báu vĩ đại luôn đi kèm với một cái giá tương xứng. Đôi khi cái giá đó chỉ đơn giản là sự cẩn trọng và quan sát, một thứ mà ngươi dường như đã để quên ở nhà cùng với trí thông minh của mình.",
        "Ngươi đã nhìn thấy rõ ràng cái bẫy đó, nhưng vẫn cố tình bước vào, chỉ để 'xem nó hoạt động như thế nào'. Sự tò mò của ngươi vừa được thỏa mãn một cách trọn vẹn bằng một mũi tên găm sâu vào lưng.",
        "Cảm giác bị tấn công bởi một bức tường mà ngươi tin là vô tri vô giác. Đó là một lời nhắc nhở sâu sắc rằng thế giới này luôn nguy hiểm hơn ngươi nghĩ rất nhiều, đặc biệt là khi ngươi ngừng suy nghĩ và bắt đầu hành động theo bản năng."
    ],
    SLEEP_IN_NETHER_END: [
        "Đừng bao giờ đặt giường của ngươi ở Nether. Đó là một lời khuyên đơn giản, một quy tắc cơ bản đã được truyền lại qua bao thế hệ. Nhưng có vẻ như một số người chỉ có thể học được bài học khi bị thổi bay cùng với toàn bộ đồ đạc và lòng tự trọng.",
        "Ngươi mang theo một chiếc giường đến The End, một chiều không gian không hề có khái niệm ngày và đêm. Một hành động vô nghĩa đến mức nó gần như đã trở thành một tác phẩm nghệ thuật trừu tượng về sự ngu ngốc của con người.",
        "Một vụ nổ kinh hoàng. Thật là một bất ngờ lớn, phải không? Ai mà có thể ngờ được rằng một vật phẩm dùng để định vị lại điểm hồi sinh ở Overworld lại có một phản ứng hoàn toàn khác ở một chiều không gian khác chứ. Thật khó đoán.",
        "Giường và Nether là hai khái niệm không bao giờ thuộc về nhau, chúng là hai mặt đối lập của sự tồn tại. Giống như trí tuệ và hành động vừa rồi của ngươi vậy. Đặt chúng cạnh nhau chỉ có thể tạo ra sự hủy diệt mà thôi.",
        "Ngươi đã thành công biến một biểu tượng của sự bình yên, an toàn và nghỉ ngơi thành một quả bom hẹn giờ có sức công phá khủng khiếp. Một tài năng thật đặc biệt trong việc biến những thứ tốt đẹp nhất thành thảm họa tồi tệ nhất."
    ],
    FIGHT_WARDEN: [
        "Warden không nghe thấy bước chân của ngươi, nó nghe thấy sự ngu ngốc của ngươi khi quyết định gây ồn ào ở một nơi đáng lẽ phải im lặng tuyệt đối. Còn ta, ta chỉ nghe thấy tiếng vọng của một thất bại không thể tránh khỏi đang đến gần.",
        "Ngươi đã đánh thức một thứ nên được để yên trong bóng tối vĩnh hằng của lòng đất. Giờ thì hãy cố gắng sống sót qua cơn thịnh nộ nguyên thủy của nó, một cơn thịnh nộ mà chính ngươi đã tốn công mời gọi.",
        "Nó có thể mù, nhưng nó không hề ngu ngốc. Hoàn toàn không giống như kẻ đã quyết định rằng chiến đấu với một thực thể cổ đại hùng mạnh trong một cái hang chật hẹp, tối tăm là một ý tưởng hay ho.",
        "Shriek. Shriek. Shriek. Đó là ba lời cảnh báo cuối cùng, ba cơ hội quý giá để ngươi rút lui trong im lặng. Ngươi đã phớt lờ cả ba để đổi lấy một cuộc đối đầu mà ngươi không có bất kỳ cơ hội nào để chiến thắng.",
        "Chiến đấu với nó không phải là một bài kiểm tra về sức mạnh của trang bị. Nó là một bài kiểm tra về sự kiên nhẫn, khôn ngoan và khả năng kiểm soát bản thân. Và ngươi vừa nộp một bài thi giấy trắng."
    ],
    FIGHT_ENDER_DRAGON: [
        "Ender Dragon thậm chí còn chẳng buồn nhìn xuống ngươi, bởi vì ngay cả thất bại của ngươi cũng không đủ tầm vóc để nó phải bận tâm. Đối với nó, ngươi chỉ là một sự phiền nhiễu thoáng qua, một con côn trùng ồn ào trong lãnh địa của nó.",
        "Ngươi đến đây để giải phóng The End khỏi sự cai trị của nó, hay chỉ để chứng minh cho cả thế giới thấy rằng ngươi có thể bị hất văng vào hư vô từ một độ cao đáng kinh ngạc bởi một cú vẫy đuôi nhẹ nhàng?",
        "Nó thở ra một loại ma thuật có thể hủy diệt mọi thứ, một hơi thở của sự hỗn loạn. Ngươi thì thở ra sự hoảng sợ tột độ khi cố gắng đổ một xô nước để leo lên cột. Một trận đấu thực sự rất cân bằng.",
        "Phá hủy những viên pha lê hồi máu đó đi, trước khi ngươi nhận ra mình đã dành cả nửa giờ đồng hồ chỉ để đứng nhìn thanh máu của con rồng nhảy múa lên xuống một cách trêu ngươi.",
        "Ngươi đã đến được đây, vượt qua bao nhiêu thử thách để đối mặt với nó. Thật đáng tiếc nếu tất cả nỗ lực đó kết thúc chỉ vì ngươi quên mang theo vài chai nước rỗng để hứng lấy hơi thở ma thuật của nó, một sai lầm sơ đẳng đến đáng thương."
    ],
    HOARDING_ITEMS: [
        "Ngươi tự hỏi vì sao đồ đạc của mình rơi ra nhiều đến vậy sau mỗi lần thất bại. Bởi vì ngươi đã đầu tư tất cả mọi thứ vào việc tích trữ trong kho đồ, và không đầu tư một chút nào vào trí óc để giữ cho chúng được an toàn.",
        "Ngươi tích trữ hàng chục chồng đá cuội trong những chiếc rương, với lý do 'phòng khi cần'. Giống hệt như cách ngươi giữ lại hàng trăm tab trình duyệt đang mở, với lời hứa hão huyền rằng một ngày nào đó sẽ đọc chúng. Cả hai đều là biểu hiện của sự hỗn loạn được ngụy trang thành sự chuẩn bị.",
        "Ngươi cất giữ mọi thứ, kể cả những chiếc cuốc đá gần hỏng hay những hạt giống mà ngươi không bao giờ trồng. Ngươi không phải là một nhà sưu tầm có tổ chức, ngươi chỉ là một người không nỡ vứt bỏ quá khứ, dù cho nó có vô dụng và đang chiếm hết không gian sống của ngươi.",
        "Ngươi có một cái rương riêng chỉ để chứa những thứ 'có thể hữu ích sau này'. 'Sau này' là một vùng đất thần tiên không bao giờ tồn tại, một cái cớ hoàn hảo cho sự thiếu quyết đoán của ngươi ở thời điểm hiện tại.",
        "Rương của ngươi đầy ắp đến mức không thể chứa thêm, nhưng tâm trí của ngươi thì lại trống rỗng những kế hoạch thực tế. Ngươi giống như một con rồng già đang canh giữ một kho báu khổng lồ mà nó không hề biết phải làm gì với nó."
    ],
    DESTROY_SPAWNER: [
        "Ngươi cảm thấy hả hê khi phá hủy một cái lồng spawner, nhưng lại hoàn toàn làm ngơ trước những thói quen tồi tệ đang sinh sôi nảy nở không ngừng trong tâm trí mình. Ngươi giỏi dọn dẹp thế giới bên ngoài hơn là thế giới bên trong của chính ngươi.",
        "Ngươi vừa phá hủy một nguồn tài nguyên có khả năng tái tạo vô hạn để đổi lấy vài điểm kinh nghiệm ít ỏi và sự im lặng tạm thời. Đó là một giao dịch tồi tệ, được thực hiện bởi một thương nhân thiển cận và thiếu tầm nhìn.",
        "Nó có thể trở thành một trang trại kinh nghiệm tự động, một nguồn cung cấp vật phẩm vô tận cho tương lai. Nhưng không, ngươi lại chọn biến nó thành một ký ức đáng quên. Một lựa chọn của sự đơn giản hóa, và cũng là của sự thiển cận.",
        "Chỉ cần vài ngọn đuốc là có thể vô hiệu hóa nó một cách an toàn, giữ lại tiềm năng của nó cho những kế hoạch trong tương lai. Nhưng ngươi lại chọn giải pháp bạo lực và vĩnh viễn, phá hủy mọi thứ. Thật giống với phong cách của ngươi.",
        "Cảm giác thỏa mãn khi phá vỡ nó thật ngắn ngủi và vô nghĩa. Cảm giác hối tiếc khi ngươi nhận ra mình cần xương để thuần hóa một đàn sói hay cần thuốc súng cho Elytra sẽ kéo dài hơn rất, rất nhiều."
    ],
    USE_ELYTRA: [
        "Ngươi say mê tốc độ và sự tự do của Elytra, nhưng hãy nhớ rằng không đôi cánh nào có thể nâng nổi một trí tuệ vẫn đang ì ạch lê bước dưới mặt đất. Càng bay lên cao, cú ngã của ngươi sẽ càng thêm ngoạn mục và đau đớn.",
        "Ngươi dùng pháo hoa để bay với Elytra, nhưng lại quên chế tạo loại không có ngôi sao nổ. Một chuyến bay ngắn ngủi, đầy màu sắc, kết thúc bằng một kết cục đau đớn. Thật là một cảnh tượng thơ mộng và bi thảm.",
        "Cảm giác tự do khi bay lượn trên bầu trời thật tuyệt vời, cho đến khi ngươi nhận ra mình đã bay quá xa khỏi căn cứ và không mang theo la bàn hay bản đồ. Giờ thì ngươi là một kẻ tự do, và cũng là một kẻ hoàn toàn lạc lõng giữa hư vô.",
        "Elytra không phải là đôi cánh thần kỳ, nó chỉ là một công cụ để lướt đi trong không trung. Nó phụ thuộc hoàn toàn vào kỹ năng và sự chuẩn bị của ngươi. Khi ngươi đâm sầm vào một ngọn núi, hãy nhớ rằng đó là lỗi của phi công, không phải của công cụ.",
        "Ngươi bay vút qua những cảnh quan hùng vĩ, những kỳ quan thiên nhiên độc đáo, nhưng lại không hề dừng lại để chiêm ngưỡng. Ngươi không đang du hành, ngươi chỉ đang di chuyển từ điểm A đến điểm B một cách nhanh nhất có thể, bỏ lỡ tất cả mọi thứ đẹp đẽ ở giữa."
    ],
    WASTEFUL_ACTIONS: [
        "Ngươi dùng cả một quả táo vàng quý giá chỉ để hồi lại nửa thanh thức ăn đang thiếu. Đó là một sự lãng phí tài nguyên ở mức độ vũ trụ, một hành động mà mọi dân làng đều phải lắc đầu ngán ngẩm.",
        "Ngươi phù phép một chiếc cuốc gỗ với Efficiency V. Đó là đỉnh cao của việc tối ưu hóa sự vô dụng, một thành tựu đáng kinh ngạc trong việc lãng phí điểm kinh nghiệm và tài nguyên.",
        "Ngươi uống một lọ thuốc Tăng sức mạnh cấp II chỉ để giết một con gà. Đó là sự lạm dụng quyền lực ở quy mô nhỏ nhất, và cũng là đáng buồn và lố bịch nhất.",
        "Ngươi ném thuốc Độc vào một con zombie. Xin chúc mừng, ngươi vừa chữa lành cho nó. Đôi khi, lòng tốt được đặt sai chỗ của ngươi lại trở nên tàn nhẫn một cách kỳ lạ.",
        "Ngươi dùng TNT để khai khoáng. Một phương pháp tuyệt vời để tìm kim cương, và cũng là cách nhanh nhất để thổi bay chúng cùng với chính ngươi và mọi thứ xung quanh. Hiệu quả một cách tàn khốc."
    ],
    LAZINESS_AND_PROCRASTINATION: [
        "Việc ngươi để lại một cái cây lơ lửng sau khi chặt gỗ không phải là một tội ác. Nó chỉ là một bằng chứng công khai, một tượng đài cho thấy sự lười biếng của ngươi đã chiến thắng hoàn toàn ý thức chung và mỹ quan.",
        "Ngươi tự nhủ rằng 'để mai farm', nhưng 'ngày mai' của một game thủ là một khái niệm trừu tượng, một vùng đất thần tiên không bao giờ tồn tại trong dòng thời gian thực tế.",
        "Ngươi đặt một cái giường ở một nơi tạm bợ, thiếu an toàn và gọi đó là 'căn cứ'. Giống hệt như cách ngươi gọi sự trì hoãn của mình là 'đang lên kế hoạch chi tiết'.",
        "Ngươi không bao giờ phá khối cuối cùng của một mỏ khoáng sản, để lại một vết sẹo xấu xí trong lòng đất. Giống như cách ngươi bỏ dở mọi việc ngoài đời khi sự hứng thú ban đầu đã phai nhạt.",
        "Ngươi xây một trang trại tự động nhưng lại quên xây hệ thống thu thập. Ngươi đã tạo ra sự giàu có, nhưng lại quá lười biếng để vươn tay ra lấy nó, để rồi nó thối rữa ngay trước mắt."
    ],
    BUILDING_BIG_EMPTY_HOUSES: [
        "Ngươi dành hàng giờ đồng hồ để xây một bức tượng khổng lồ về chính mình, nhưng lại không dành dù chỉ một phút nào để xây dựng một kế hoạch sinh tồn ra hồn cho bản thân.",
        "Ngươi xây một căn nhà rộng lớn nhưng hoàn toàn trống rỗng bên trong. Một không gian vật lý khổng lồ được tạo ra chỉ để bù đắp cho một mục tiêu không hề tồn tại trong tâm trí ngươi.",
        "Ngươi xây một con đường lát đá cẩm thạch tuyệt đẹp dẫn đến một túp lều bằng đất. Ngươi giỏi trang trí cho sự tầm thường hơn là nỗ lực để cải thiện nó từ gốc rễ.",
        "Ngươi đi lạc trong chính căn cứ của mình. Một công trình phức tạp đến mức chính người tạo ra nó cũng không thể hiểu nổi. Một kiệt tác của sự rối rắm và thiếu quy hoạch.",
        "Ngươi dành hàng giờ để trang trí một căn phòng bí mật mà không ai biết, trong khi lối vào chính của nhà ngươi còn chẳng có nổi một cái cửa. Sự ưu tiên của ngươi thật khó hiểu."
    ],
    STEAL_FROM_VILLAGERS: [
        "Ngươi vui mừng khôn xiết khi tìm thấy một ngôi làng, không phải vì muốn giao dịch và xây dựng cộng đồng, mà vì muốn trộm hết giường và lúa mì của họ. Lòng tham của ngươi thật nguyên thủy và đáng buồn.",
        "Ngươi lấy đi mọi thứ từ dân làng mà không hề trao lại thứ gì. Ngươi không phải là một nhà thám hiểm, ngươi là một tai họa di động đối với những cộng đồng yên bình.",
        "Bọn họ chào đón ngươi, và ngươi đáp lại bằng cách lấy đi chiếc giường duy nhất của họ. Một bài học sâu sắc về lòng tin và sự phản bội.",
        "Một chồng lúa mì có thể cứu ngươi khỏi cơn đói, nhưng nó cũng biến ngươi thành kẻ trộm trong mắt những người vô tội. Một cái giá phải trả cho sự sống còn.",
        "Ngươi đã biến một nơi trú ẩn tiềm năng, một trung tâm giao dịch sầm uất thành một thị trấn ma chỉ sau một đêm. Tài năng phá hoại của ngươi thật đáng nể."
    ],
    POOR_PRIORITIES: [
        "Ngươi mang theo 64 khối đất trong thanh công cụ chính nhưng lại không có một miếng thức ăn nào. Ngươi đã chuẩn bị rất kỹ cho việc xây dựng, nhưng lại hoàn toàn quên mất việc phải tồn tại đã.",
        "Ngươi dành cả một ngày dài chỉ để tìm kiếm một con Axolotl xanh lam cực hiếm, trong khi căn cứ của ngươi còn chưa có nổi một cái mái che tử tế để tránh mưa. Sự ưu tiên của ngươi thật sự rất đáng ngưỡng mộ.",
        "Ngươi bỏ cả một chồng kim cương vào rương mà không thèm sửa lại cây cuốc sắp hỏng của mình. Ngươi tích lũy sự giàu có, nhưng lại sống trong nỗi sợ hãi thường trực của sự thiếu thốn và bất tiện.",
        "Ngươi không sợ Ender Dragon, nhưng ngươi lại sợ khoảng không vô định bao la bên dưới nó. Thực ra, ngươi không sợ thất bại, ngươi chỉ sợ những hậu quả không thể phục hồi của nó.",
        "Ngươi dành nhiều thời gian hơn để đặt tên cho công cụ của mình hơn là sử dụng chúng một cách hiệu quả. Một cái tên kêu không thể bù đắp cho một chiến lược yếu kém."
    ],
    KILL_RARE_MOB: [
        "Ngươi thấy một con cừu hồng quý hiếm và giết nó ngay lập tức. Ngươi không biết trân trọng sự hiếm có, ngươi chỉ biết biến nó thành một miếng len và hai miếng thịt. Thật thực dụng, và cũng thật trống rỗng.",
        "Một con Mooshroom nâu, một kỳ quan của tự nhiên, và phản ứng đầu tiên của ngươi là rút kiếm ra. Trí tò mò của ngươi đã bị bản năng sát thủ lấn át hoàn toàn.",
        "Ngươi đã xóa sổ một sự tồn tại độc nhất khỏi thế giới này chỉ để đổi lấy vài vật phẩm tầm thường. Một giao dịch mà chỉ có kẻ thiển cận mới cho là có lời.",
        "Thay vì xây một khu bảo tồn cho nó, ngươi lại chọn biến nó thành战利品. Ngươi là một nhà chinh phục, không phải một người bảo vệ.",
        "Thế giới này vừa mất đi một chút màu sắc, và tất cả là nhờ vào sự vô tâm của ngươi. Hy vọng miếng thịt đó ngon miệng."
    ],
    ABANDON_PET: [
        "Ngươi thuần hóa một con sói trung thành và bắt nó ngồi một chỗ mãi mãi. Ngươi không thực sự cần một người bạn đồng hành, ngươi chỉ cần một món đồ trang trí biết sủa để lấp đầy sự cô đơn.",
        "Ngươi dành hàng giờ đồng hồ để tìm kiếm một con ngựa hoàn hảo với chỉ số tốt nhất, rồi lại để nó đứng yên trong chuồng và tiếp tục chạy bộ khắp nơi. Ngươi khao khát tiềm năng, nhưng lại quá lười biếng để khai thác nó.",
        "Con vẹt trên vai ngươi không chỉ bắt chước âm thanh của quái vật. Nó đang âm thầm phán xét mọi quyết định tồi tệ mà ngươi đưa ra, và nó đã thấy rất nhiều.",
        "Ngươi đặt tên cho con chó của mình, yêu thương nó, rồi lại dắt nó lao vào một cuộc chiến mà ngươi biết rõ nó sẽ không thể sống sót. Tình cảm của ngươi thật tiện lợi và cũng thật tàn nhẫn.",
        "Nó sẽ ngồi đó, chờ đợi ngươi quay lại, qua ngày, qua đêm, qua các mùa. Một biểu tượng sống cho những lời hứa bị lãng quên của ngươi."
    ],
    ORGANIZING_OBSESSION: [
        "Ngươi dành nhiều thời gian để sắp xếp những chiếc rương của mình một cách hoàn hảo hơn là để thực sự khám phá thế giới rộng lớn ngoài kia. Ngươi đã biến một cuộc phiêu lưu vĩ đại thành một công việc văn phòng nhàm chán.",
        "Ngươi sắp xếp từng chiếc rương một cách hoàn hảo đến từng chi tiết, một trật tự vi mô trong một thế giới hỗn loạn vô hạn. Đó không phải là sự tổ chức, đó là một nỗ lực tuyệt vọng để kiểm soát một thứ gì đó, khi mà cuộc sống thực của ngươi thì không.",
        "Hệ thống lưu trữ của ngươi là một kiệt tác về logic và hiệu quả. Thật đáng tiếc khi những vật phẩm mà nó chứa đựng lại được thu thập một cách hỗn loạn và không có kế hoạch.",
        "Ngươi có thể tìm thấy một khối đá cuội trong vòng 3 giây, nhưng lại mất 3 ngày để quyết định nên làm gì tiếp theo. Ngươi là một thủ thư xuất sắc, nhưng lại là một nhà thám hiểm tồi.",
        "Sự ngăn nắp của ngươi thật đáng ngưỡng mộ. Nó là một cái vỏ bọc hoàn hảo cho sự thiếu mục tiêu và phương hướng trong cuộc hành trình của ngươi."
    ],
    META_GAMING_AND_PHILOSOPHY: [
        "Ngươi chế tạo một tấm bản đồ, không phải để tìm đường đi, mà chỉ để lấp đầy nó bằng những bước chân của mình. Ngươi bị ám ảnh bởi việc hoàn thành một cách máy móc, chứ không phải bởi chính cuộc hành trình.",
        "Ngươi không thực sự muốn khám phá thế giới này. Ngươi chỉ muốn tìm kiếm tài nguyên một cách hiệu quả nhất. Cuộc phiêu lưu vĩ đại của ngươi chỉ là một danh sách mua sắm được ngụy trang một cách vụng về.",
        "Ngươi xem hàng giờ hướng dẫn trên YouTube để xây một trang trại phức tạp, rồi lại xây sai một chi tiết nhỏ và bỏ cuộc. Ngươi giỏi tiêu thụ kiến thức của người khác hơn là kiên trì áp dụng nó.",
        "Ngươi phàn nàn rằng thế giới này 'nhàm chán', sau khi đã dành 500 giờ chỉ để làm đi làm lại một việc duy nhất. Vấn đề không nằm ở thế giới, nó nằm ở sự cạn kiệt của trí tưởng tượng trong ngươi.",
        "Ngươi giết Ender Dragon và cảm thấy trống rỗng. Bởi vì mục tiêu không bao giờ thực sự là con rồng. Cuộc săn đuổi và quá trình chuẩn bị luôn thú vị hơn chính chiến thắng. Chào mừng đến với sự thật phũ phàng của người trưởng thành."
    ],
    USE_COMPASS_IN_NETHER_END: [
        "Ngươi nhìn vào một chiếc la bàn trong Nether và thấy nó quay cuồng một cách vô định. Nó không hề bị hỏng. Nó chỉ đang cố gắng phản ánh một cách chính xác trạng thái tâm trí của ngươi khi ở một nơi như thế này.",
        "La bàn không chỉ về hướng Bắc, nó chỉ về nơi ngươi hồi sinh lần cuối. Nó không phải là một công cụ giúp ngươi tìm đường tiến lên, nó là một công cụ chỉ cho ngươi tìm lại nơi ngươi đã thất bại hết lần này đến lần khác.",
        "Một thỏi sắt và một viên đá đỏ, được chế tạo thành một công cụ hoàn toàn vô dụng ở hai trong ba chiều không gian của thế giới này. Một sự đầu tư thật khôn ngoan.",
        "Nó quay điên cuồng, như một lời cảnh báo rằng những quy luật mà ngươi biết không còn áp dụng ở đây nữa. Ngươi nên lắng nghe nó.",
        "Ngươi hy vọng nó sẽ chỉ cho ngươi một lối thoát, nhưng nó chỉ cho ngươi thấy sự hỗn loạn. Một tấm gương phản chiếu hoàn hảo cho tình cảnh của ngươi."
    ],
    USELESS_CRAFTING: [
        "Ngươi mang theo một chiếc đồng hồ, không phải để thực sự xem ngày đêm, mà chỉ để tự hỏi vì sao mình lại lãng phí một thỏi vàng và một viên đá đỏ quý giá cho một thứ mà bầu trời đã thể hiện một cách rõ ràng và miễn phí.",
        "Ngươi chế tạo một cây cung Vô Hạn nhưng lại quên mang theo dù chỉ một mũi tên duy nhất. Sức mạnh không nằm ở tiềm năng vô hạn của công cụ, nó nằm ở sự chuẩn bị cơ bản nhất của người sử dụng.",
        "Ngươi chế tạo một cái bánh, không phải để ăn mừng một thành tựu nào đó, mà chỉ để lấp đầy thanh đói một cách kém hiệu quả. Ngươi đã biến một biểu tượng của lễ hội và niềm vui thành một phương tiện sinh tồn tầm thường.",
        "Ngươi đã chế tạo ra một cái đe, chỉ để rồi nhận ra rằng ngươi không có đủ điểm kinh nghiệm để sử dụng nó. Một lời nhắc nhở rằng để sửa chữa sai lầm, ngươi cần phải có kinh nghiệm, cả trong game và ngoài đời.",
        "Một cái phễu dẫn vào một cái rương đã đầy. Ngươi đã tạo ra một hệ thống tự động hóa sự lãng phí. Thật ấn tượng."
    ],
    INEFFICIENT_TRAVEL: [
        "Ngươi bơi qua cả một đại dương rộng lớn mà không có thuyền, chỉ để chứng tỏ sự kiên trì phi thường của mình. Không, đó là một minh chứng hùng hồn cho việc ngươi không biết cách sắp xếp năm miếng gỗ lại với nhau.",
        "Ngươi chế tạo một chiếc thuyền nhưng lại quên mất cách làm thế nào để xuống nước một cách an toàn. Đôi khi, vấn đề không nằm ở phương tiện hiện đại, mà là ở người điều khiển quá thô sơ.",
        "Ngươi đi bộ hàng ngàn khối vuông, trong khi con ngựa mà ngươi đã thuần hóa đang đứng buồn bã trong chuồng. Lòng trung thành của nó thật đáng ngưỡng mộ, còn sự lười biếng của ngươi thì thật đáng thất vọng.",
        "Ngươi dùng ngọc Ender để di chuyển qua một khoảng cách ngắn mà ngươi hoàn toàn có thể đi bộ. Một cách tuyệt vời để đánh đổi máu và tài nguyên quý giá lấy vài giây tiết kiệm thời gian.",
        "Ngươi xây một hệ thống đường ray phức tạp và tốn kém, nhưng lại chỉ sử dụng nó đúng một lần. Ngươi yêu quá trình sáng tạo hơn là sự hữu ích thực tế của nó. Một nghệ sĩ, không phải một kỹ sư."
    ],
    FARMING_INEFFICIENCY: [
        "Ngươi trồng cả một khu rừng và chặt phá chúng không thương tiếc, nhưng không bao giờ trồng lại một cây non nào. Ngươi đối xử với thế giới này như một nguồn tài nguyên vô tận, và thế giới sẽ sớm đối xử với ngươi như một sự tồn tại không cần thiết.",
        "Ngươi xây một trang trại tự động cực kỳ phức tạp nhưng lại quên xây dựng hệ thống thu thập vật phẩm. Ngươi đã tạo ra sự giàu có, nhưng lại quá lười biếng để vươn tay ra lấy nó, để rồi nó thối rữa và biến mất ngay trước mắt.",
        "Ngươi cố gắng trồng cây ở dưới lòng đất mà hoàn toàn không có đuốc hay bất kỳ nguồn sáng nào. Hạt giống cần ánh sáng để nảy mầm và phát triển, giống như bộ não của ngươi vậy.",
        "Ngươi thu hoạch lúa mì nhưng lại quên trồng lại hạt giống. Một hành động nhỏ, nhưng nó nói lên rất nhiều điều về tầm nhìn ngắn hạn của ngươi.",
        "Trang trại của ngươi thật hỗn loạn. Cà rốt mọc lẫn với khoai tây, lúa mì chen chúc với củ dền. Nó là một hình ảnh phản chiếu hoàn hảo cho sự thiếu quy hoạch trong tâm trí ngươi."
    ],
    BAD_BUILDING_CHOICES: [
        "Ngươi xây một căn nhà hoàn toàn bằng len. Một lựa chọn kiến trúc thật tuyệt vời và mềm mại, cho đến khi một tia sét đi lạc tình cờ ghé thăm và quyết định tổ chức một bữa tiệc BBQ.",
        "Ngươi xây một cây cầu hoành tráng và phức tạp để đi qua một con lạch chỉ rộng hai khối. Đó không phải là kỹ thuật xây dựng, đó là sự phô trương nỗi sợ hãi của ngươi trước một cú nhảy đơn giản.",
        "Ngươi xây nhà bằng đất, ngay bên cạnh một khu rừng đầy gỗ và một ngọn núi đầy đá. Sự lựa chọn này không nói lên sự tối giản, nó nói lên sự lười biếng ở mức độ cao nhất.",
        "Cánh cửa nhà ngươi mở vào trong, đẩy con vật cưng của ngươi ra ngoài. Một chi tiết thiết kế nhỏ, nhưng nó cho thấy sự thiếu quan tâm của ngươi đến những người bạn đồng hành.",
        "Ngươi xây nhà ngay trên bãi biển. Thật lãng mạn, cho đến khi màn đêm buông xuống và ngươi nhận ra mình đang sống trong một cái lồng spawner Drowned khổng lồ."
    ],
    POINTLESS_FLEX: [
        "Ngươi xây một ngọn hải đăng (Beacon) và chỉ chọn hiệu ứng Tăng tốc. Ngươi có thể chạy nhanh hơn, nhưng ngươi vẫn không thể nào chạy thoát khỏi những lựa chọn tồi tệ của chính mình.",
        "Ngươi tự hào khoe khoang về ngôi nhà được xây hoàn toàn bằng khối kim cương của mình. Nhưng chỉ một cái hố nhỏ của Creeper cũng đủ để chứng minh rằng, sự an toàn không đến từ vật liệu đắt tiền, mà đến từ trí tuệ. Ngươi thiếu cả hai.",
        "Ngươi đã dùng một quả trứng rồng, vật phẩm độc nhất vô nhị, chỉ để làm vật trang trí trên nóc nhà. Một hành động cuối cùng của sự khoe khoang, và cũng là sự trống rỗng.",
        "Ngươi có một bộ giáp được trang trí đầy đủ, nhưng lại không dám đi ra ngoài vào ban đêm. Một chiến binh trong vỏ bọc, một kẻ hèn nhát trong tâm hồn.",
        "Ngươi đã đánh bại Wither, nhưng lại đặt ngọn hải đăng ở một nơi mà ngươi không bao giờ đến. Nó không còn là một biểu tượng của sức mạnh, nó là một tượng đài cho sự lãng quên."
    ],
    DEATH_BY_STUPIDITY: [
        "Ngươi đã cố gắng bơi ngược lên một thác dung nham. Đó là một ý tưởng tồi tệ ngay cả trên lý thuyết, và thực tế còn chứng minh nó tồi tệ hơn nhiều.",
        "Ngươi chết vì một con cá nóc. Không phải một con rồng hùng mạnh, không phải một con quái vật ba đầu cổ đại, mà là một sinh vật nhỏ bé, gai góc và chậm chạp. Thất bại của ngươi thật độc đáo và đáng xấu hổ.",
        "Ngươi cố gắng leo lên một cây xương rồng, chỉ để xem nó đau đến mức nào. Sự tò mò khoa học của ngươi thật đáng khen, nhưng kết quả thì không.",
        "Ngươi thấy một con Shulker và lao thẳng vào đánh nó ở cự ly gần. Chúc mừng, giờ thì ngươi đang bay lơ lửng trong không trung. Hy vọng ngươi thích cảm giác bất lực tuyệt đối.",
        "Ngươi đã ăn một thứ gì đó mà ngươi không biết là gì, chỉ để 'xem nó có tác dụng gì'. Giờ thì ngươi đã biết. Nó có tác dụng giết chết những kẻ liều lĩnh."
    ],
    GENERIC_FAILURE: [
        "Ngươi không thực sự thua cuộc. Ngươi chỉ đơn giản là vừa tìm ra một cách hoàn toàn mới để thất bại một cách ngoạn mục mà thôi.",
        "Ngươi tự hào gọi thất bại là 'trải nghiệm quý giá'. Không, nó chỉ là học phí cho một bài học mà ngươi vẫn chưa chịu tiếp thu. Kẻ nào chịu học thì mới tốt nghiệp, còn ngươi thì đang nợ môn vĩnh viễn.",
        "Ngươi treo những tấm bảng thành tích nhỏ nhoi trên tường nhà, trong khi thất bại lại đang khắc tên ngươi một cách trang trọng lên tận lớp nền đá Bedrock của thế giới này.",
        "Thế giới này không hề ghét ngươi, nó chỉ đơn giản là hoàn toàn thờ ơ với sự tồn tại của ngươi. Mỗi cái chết chỉ là một lời nhắc nhở nhẹ nhàng rằng ngươi cần phải trở nên thông minh hơn, chứ không phải may mắn hơn.",
        "Ngươi đã cố gắng hết sức, và đó là điều đáng buồn nhất. Bởi vì 'hết sức' của ngươi vẫn dẫn đến kết quả này."
    ]
};
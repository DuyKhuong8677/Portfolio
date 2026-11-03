// Chuyển đổi Việt / Anh: từ điển EN khóa theo đúng câu tiếng Việt trong trang.
// Chuỗi nào không có trong từ điển sẽ giữ nguyên tiếng Việt.
const EN = {
  // Menu
  "Điều hướng hồ sơ": "Portfolio navigation",
  "Giới thiệu": "About",
  "Về mình": "About me",
  "Mục tiêu": "Goals",
  "Kỹ năng": "Skills",
  "Học vấn": "Education",
  "Hành trình": "Journey",
  "Dự án": "Projects",
  "Chứng chỉ": "Certificates",
  "Sở thích": "Hobbies",
  "Ảnh": "Photos",
  "Liên hệ": "Contact",
  "Chuyển giao diện sáng / tối": "Switch light / dark theme",
  "Mở menu": "Open menu",
  "Đóng menu": "Close menu",
  "Cuộn lên đầu trang": "Scroll to top",
  "Đóng": "Close",
  "Xem ảnh lớn": "View full image",

  // Banner
  "Sinh viên Trường Đại học Giao thông vận tải TP.HCM · Định hướng": "Student at the University of Transport, Ho Chi Minh City · Aiming to be a",
  "“Mỗi ngày học một chút, như cây lớn từng chút một.”": "“Learn a little every day, like a tree growing bit by bit.”",
  "Mình là sinh viên Trường Đại học Giao thông vận tải TP.HCM (UTH), học ngành Công nghệ thông tin với định hướng trở thành Full-stack Developer. Mình thích xây dựng website và phần mềm từ giao diện đến xử lý phía sau, và luyện kỹ năng qua các dự án thực hành.": "I am a student at the University of Transport, Ho Chi Minh City (UTH), majoring in Information Technology and aiming to become a Full-stack Developer. I enjoy building websites and software from the interface to the back end, and I practise my skills through hands-on projects.",
  "Xem dự án": "View projects",
  "Mẹo: bấm vào những chiếc lá đang rơi để biết thêm về mình.": "Tip: click the falling leaves to learn more about me.",
  "Ảnh đại diện Nguyễn Đình Duy Khương": "Profile photo of Nguyen Dinh Duy Khuong",
  "Duy Khương cùng bạn bè": "Duy Khuong with friends",
  "Ngành học": "Major",
  "Công nghệ thông tin": "Information Technology",
  "Định hướng": "Career direction",
  "Trường": "University",
  "Đại học GTVT TP.HCM": "UTH – University of Transport HCMC",
  "Công nghệ": "Technologies",

  // Số liệu nhanh
  "Số liệu nhanh": "Quick stats",
  "Năm bắt đầu viết code": "Year I started coding",
  "Dự án đã làm": "Projects built",
  "Kỹ năng đang học": "Skills in progress",
  "Người trong Nhóm 4": "People in Group 4",

  // Về mình
  "Ngoài lý lịch, đây là con người thật của mình.": "Beyond the résumé, this is the real me.",
  "Duy Khương dang tay giữa khu rừng xanh, ánh nắng xuyên qua tán lá": "Duy Khuong with arms spread in a green forest, sunlight streaming through the leaves",
  "Mình lớn lên ở vùng nông thôn, nơi công nghệ không phải thứ ở ngay trước mắt. Nhưng mình vốn là người thích khám phá, tìm tòi và học hỏi, nên càng hiểu biết thêm về công nghệ, mình càng bị cuốn hút. Đến đầu năm 2024, mình mới bắt đầu tìm hiểu về lập trình và viết những dòng code đầu tiên của mình. Biết đến code muộn hơn nhiều bạn, nhưng đó cũng chính là lý do mình học bằng tất cả sự háo hức và quyết tâm.": "I grew up in the countryside, where technology was not right in front of me. But I have always loved exploring, searching and learning, so the more I learned about technology, the more it drew me in. It was only in early 2024 that I started learning to program and wrote my first lines of code. I came to code later than many of my peers, but that is exactly why I learn with all my enthusiasm and determination.",
  "Khi làm việc nhóm, mình là người biết lắng nghe và có trách nhiệm với phần việc mình nhận: đã nhận thì mình làm đến nơi đến chốn. Khi gặp lỗi hoặc một bài toán khó, mình thường ngồi suy nghĩ khoảng 3–5 phút để tự tìm hướng đi trước, rồi mới bắt đầu tra cứu trên internet và hỏi AI để tìm lời giải. Mình tin rằng tự suy nghĩ trước giúp mình hiểu vấn đề sâu hơn, còn các công cụ chỉ là người đồng hành.": "When working in a team, I listen well and take responsibility for the tasks I accept: once I accept, I see it through. When I hit a bug or a hard problem, I usually sit and think for about 3–5 minutes to find a direction on my own, and only then search the internet and ask AI for solutions. I believe thinking first helps me understand the problem more deeply, while tools are just companions.",
  "Điều mình muốn bạn nhớ về mình: mình là người không ngại công việc. Nếu bạn có một dự án hay một cơ hội phù hợp, cứ liên hệ với mình nhé (nói vui một chút thôi, nhưng mình nói thật lòng đấy!).": "What I want you to remember about me: I am not afraid of hard work. If you have a project or a suitable opportunity, feel free to contact me (said with a smile, but I mean it!).",
  "Vài điều thú vị (bấm vào thẻ để lật)": "A few fun facts (click a card to flip it)",
  "Món ăn mình mê nhất?": "My favourite food?",
  "Mì cay Sasin": "Sasin spicy noodles",
  "Game mình hay chơi?": "Games I often play?",
  "Liên Quân, hoặc các game thử thách cùng bạn bè trên Steam": "Arena of Valor, or challenge games with friends on Steam",
  "Nơi mình muốn đến nhất?": "Where I most want to go?",
  "Hà Nội — thủ đô của đất nước mình, nơi mình mong sớm có dịp ghé thăm": "Hanoi — the capital of my country, which I hope to visit soon",

  // Mục tiêu
  "Mục tiêu nghề nghiệp": "Career goals",
  "Lớn lên từng bước, từ kiến thức nền tảng đến khả năng xây dựng sản phẩm thực tế.": "Growing step by step, from foundational knowledge to building real products.",
  "Hiện tại": "Now",
  "Sinh viên Công nghệ thông tin": "Information Technology student",
  "Học kiến thức nền tảng về lập trình, luyện tư duy giải quyết vấn đề và làm quen với phát triển web.": "Learning programming fundamentals, practising problem solving and getting familiar with web development.",
  "Ngắn hạn": "Short term",
  "Hoàn thiện nền tảng": "Strengthen the foundation",
  "Hoàn thành tốt các học phần, luyện lập trình thường xuyên, học cách dùng Git và hoàn thiện bài tập thành dự án có thể trình bày.": "Do well in my courses, practise coding regularly, learn Git and turn assignments into projects I can present.",
  "Dài hạn": "Long term",
  "Trở thành Full-stack Developer": "Become a Full-stack Developer",
  "Có nền tảng lập trình vững chắc, xây dựng được ứng dụng web hoàn chỉnh từ giao diện đến máy chủ, làm việc nhóm tốt và viết code dễ bảo trì.": "Have a solid programming foundation, build complete web applications from the interface to the server, work well in a team and write maintainable code.",
  "Mình chọn Full-stack vì muốn hiểu trọn vẹn một sản phẩm, từ giao diện người dùng thấy được đến phần xử lý phía sau. Trong 1 năm tới, mình muốn tự làm được một website hoàn chỉnh có cả giao diện lẫn xử lý dữ liệu, và dùng Git thành thạo để quản lý dự án.": "I chose Full-stack because I want to understand a product end to end, from the interface users see to the processing behind it. Within the next year, I want to build a complete website on my own with both an interface and data handling, and use Git confidently to manage projects.",

  // Kỹ năng
  "Các công nghệ mình đang học và sử dụng. Mình chưa tự chấm điểm phần trăm để tránh số liệu thiếu thực tế.": "The technologies I am learning and using. I have not rated myself with percentages to avoid unrealistic numbers.",
  "Giao diện": "Interface",
  "Dựng cấu trúc trang, bố cục Flexbox/Grid và giao diện responsive.": "Building page structure, Flexbox/Grid layouts and responsive interfaces.",
  "Đang học": "Learning",
  "Tương tác": "Interaction",
  "Xử lý DOM và sự kiện để tạo tương tác cho website.": "Using the DOM and events to make websites interactive.",
  "Lập trình": "Programming",
  "Luyện tư duy lập trình và giải quyết bài toán.": "Practising programming thinking and problem solving.",
  "Viết ứng dụng desktop và kết nối mạng qua TCP trong game cờ Caro nhiều người chơi.": "Building a desktop app with TCP networking for a multiplayer Caro (Gomoku) game.",
  "Đã dùng trong dự án": "Used in a project",
  "Công cụ": "Tools",
  "Lưu và quản lý mã nguồn các dự án cá nhân và dự án nhóm.": "Storing and managing source code for personal and group projects.",
  "Kỹ năng mềm": "Soft skills",
  "Làm việc nhóm": "Teamwork",
  "Phân chia công việc, trao đổi và hỗ trợ các thành viên trong Nhóm 4.": "Dividing tasks, communicating and supporting the members of Group 4.",
  "Đang rèn luyện": "Practising",

  // Học vấn
  "Học vấn và hoạt động": "Education and activities",
  "Những thông tin chưa có sẽ được ghi rõ là chưa cập nhật.": "Anything I do not have yet is clearly marked as not available.",
  "Trường Đại học Giao thông vận tải TP.HCM": "University of Transport, Ho Chi Minh City",
  "Đang học ngành Công nghệ thông tin, định hướng Full-stack Developer.": "Studying Information Technology, aiming to become a Full-stack Developer.",
  "Trước đó": "Previously",
  "THPT Võ Lai": "Vo Lai High School",
  "Thời gian": "Period",
  "Hoạt động": "Activities",
  "Thành viên Nhóm 4": "Member of Group 4",
  "Cùng nhóm làm bài tập giữa kỳ: xây dựng trang chủ nhóm và portfolio cá nhân cho từng thành viên.": "Working with the group on the midterm assignment: building the group homepage and a personal portfolio for each member.",
  "Vai trò": "Role",
  "Trưởng nhóm": "Group leader",
  "Kinh nghiệm / Thành tích": "Experience / Achievements",
  "Chưa có": "None yet",
  "Chưa có kinh nghiệm làm việc hoặc thành tích nổi bật. Mình sẽ bổ sung khi có.": "No work experience or notable achievements yet. I will add them when I have some.",

  // Hành trình
  "Từng chặng đường đưa mình đến với ngành CNTT.": "The steps that brought me to Information Technology.",
  "Hạt giống · Trước 2024": "Seed · Before 2024",
  "Môn Toán là môn mình thích nhất, và năm cuối cấp để lại cho mình nhiều kỷ niệm đáng nhớ, trong đó có giải Ba môn bóng chuyền năm lớp 12. Lúc ấy mình đã xác định sẽ học ngành CNTT, dù chưa có lộ trình rõ ràng.": "Maths was my favourite subject, and my final year left me with many memories, including third prize in volleyball in grade 12. By then I had already decided to study IT, even though I had no clear roadmap yet.",
  "Nảy mầm · 2024": "Sprouting · 2024",
  "Bước vào Đại học GTVT TP.HCM": "Starting at UTH, Ho Chi Minh City",
  "Từ quê nhà Bình Định, mình vào TP.HCM nhập học tại Đại học Giao thông vận tải. Mọi thứ đều mới mẻ và có phần bỡ ngỡ, nhưng cũng đầy háo hức, vì đây là nơi mình được học lập trình một cách bài bản. Đợt học quân sự năm nhất cũng là một kỷ niệm đáng nhớ: mình học được tính kỷ luật, sự chịu khó và có thêm nhiều người bạn mới.": "From my hometown of Binh Dinh, I moved to Ho Chi Minh City to enrol at the University of Transport. Everything was new and a little overwhelming, but also exciting, because this is where I get to learn programming properly. The first-year military training was also a memorable experience: I learned discipline and perseverance, and made many new friends.",
  "Duy Khương cùng cả lớp trước cổng trường THPT Võ Lai": "Duy Khuong with the whole class in front of Vo Lai High School gate",
  "Cùng cả lớp trước cổng trường THPT Võ Lai": "With the whole class in front of Vo Lai High School gate",
  "Duy Khương cùng các bạn trong đợt học quân sự":"Duy Khuong with classmates during military training",
  "Cùng các bạn trong đợt học quân sự": "With classmates during military training",
  "Vươn thân · Hiện nay": "Growing tall · Now",
  "Trưởng nhóm — Nhóm 4": "Group leader — Group 4",
  "Mình cùng Nhóm 4 làm bài giữa kỳ: xây dựng trang chủ nhóm và portfolio cá nhân cho từng thành viên. Làm trưởng nhóm giúp mình học cách lắng nghe, chia việc rõ ràng và chịu trách nhiệm với phần việc của cả nhóm.": "I worked with Group 4 on the midterm assignment: building the group homepage and a personal portfolio for each member. Leading the group taught me to listen, divide tasks clearly and take responsibility for the whole group's work.",

  // Dự án
  "Các sản phẩm cá nhân và dự án nhóm mình đã thực hiện.": "The personal products and group projects I have worked on.",
  "Lọc dự án": "Filter projects",
  "Tất cả": "All",
  "Nhóm": "Group",
  "Cá nhân": "Personal",
  "Ảnh chụp trang web Quỳnh Chi - Bánh cuốn Tây Sơn": "Screenshot of the Quynh Chi - Tay Son Banh Cuon website",
  "Shop bánh cuốn": "Banh cuon shop",
  "Website bán bánh cuốn Quỳnh Chi - Bánh cuốn Tây Sơn: banner giới thiệu, danh sách sản phẩm nổi bật và giỏ hàng.": "A website selling Quynh Chi - Tay Son banh cuon (steamed rice rolls): an intro banner, featured products and a shopping cart.",
  "Xem mô tả": "View details",
  "Mở trang": "Open site",
  "Ảnh chụp trang portfolio cá nhân của Nguyễn Đình Duy Khương": "Screenshot of Nguyen Dinh Duy Khuong's personal portfolio",
  "Portfolio cá nhân": "Personal portfolio",
  "Chính trang bạn đang xem: giới thiệu bản thân, mục tiêu, kỹ năng, dự án và form liên hệ.": "The very page you are viewing: self-introduction, goals, skills, projects and a contact form.",
  "Về đầu trang": "Back to top",
  "Minh họa trang chủ Nhóm 4 gồm sáu thẻ thành viên": "Illustration of the Group 4 homepage with six member cards",
  "Trang chủ Nhóm 4": "Group 4 homepage",
  "Trang giới thiệu nhóm và danh sách thành viên; mỗi thẻ dẫn đến trang cá nhân của một người.": "A group introduction page with a member list; each card links to one person's personal page.",
  "Ảnh chụp giao diện game cờ Caro nhiều người chơi": "Screenshot of the multiplayer Caro game interface",
  "Game cờ Caro": "Caro game",
  "Game cờ Caro nhiều người chơi: đăng nhập, danh sách người chơi online, mời đấu, xem trận, tính điểm và khung trò chuyện.": "A multiplayer Caro game: login, online player list, match invitations, spectating, scoring and a chat panel.",
  // Cửa sổ mô tả dự án
  "Website bán bánh cuốn Quỳnh Chi - Bánh cuốn Tây Sơn với banner giới thiệu, mục sản phẩm nổi bật (bánh cuốn Tây Sơn, bánh cuốn đặc biệt, bún thịt nướng) và giỏ hàng. Viết bằng HTML, CSS và JavaScript, đăng tải trên Netlify.": "A website for Quynh Chi - Tay Son banh cuon with an intro banner, featured products (Tay Son banh cuon, special banh cuon, grilled pork vermicelli) and a shopping cart. Built with HTML, CSS and JavaScript and hosted on Netlify.",
  "Trang giới thiệu bản thân gồm banner, mục tiêu, kỹ năng, học vấn, dự án và form liên hệ. Có menu di động, chế độ sáng/tối, lọc dự án, cửa sổ mô tả, nút lên đầu trang và kiểm tra form bằng JavaScript.": "A self-introduction page with a banner, goals, skills, education, projects and a contact form. It includes a mobile menu, light/dark mode, project filtering, detail dialogs, a scroll-to-top button and form validation with JavaScript.",
  "Trang giới thiệu nhóm và danh sách sáu thành viên; mỗi thẻ dẫn đến trang cá nhân. Có chế độ sáng/tối, hiệu ứng hover và bố cục responsive, viết bằng HTML, CSS và JavaScript thuần.": "A group introduction page with a list of six members; each card links to a personal page. It has light/dark mode, hover effects and a responsive layout, built with plain HTML, CSS and JavaScript.",
  "Game cờ Caro nhiều người chơi trên máy tính: kết nối tới máy chủ qua TCP, đăng nhập, xem danh sách người chơi online, mời đấu, xem trận, tính điểm và có khung trò chuyện/nhật ký.": "A multiplayer Caro game on desktop: connects to a server over TCP, with login, an online player list, match invitations, spectating, scoring and a chat/log panel.",
  "Khó khăn": "Challenges",
  "Học được": "Lessons learned",
  "Dự án cá nhân: mình tự làm toàn bộ, từ thiết kế giao diện đến viết code và đăng tải lên Netlify.": "Personal project: I did everything myself, from interface design to coding and deploying on Netlify.",
  "Làm giỏ hàng bằng JavaScript: cập nhật số lượng và tính lại tổng tiền mỗi khi khách thêm hoặc bớt món, đồng thời giữ giao diện gọn gàng trên màn hình điện thoại.": "Building the cart in JavaScript: updating quantities and recalculating the total whenever a customer adds or removes an item, while keeping the interface tidy on phone screens.",
  "Cách dùng DOM và sự kiện để trang web tương tác được, cách chia nhỏ vấn đề thành từng bước để dễ sửa lỗi, và cách đưa một website lên mạng cho mọi người cùng xem.": "How to use the DOM and events to make a page interactive, how to break problems into steps to debug them more easily, and how to put a website online for everyone to see.",
  "Dự án cá nhân: mình tự làm toàn bộ, từ ý tưởng, thiết kế giao diện đến viết HTML, CSS và JavaScript.": "Personal project: I did everything myself, from the idea and interface design to writing the HTML, CSS and JavaScript.",
  "Làm cho trang hiển thị đẹp trên cả máy tính, máy tính bảng và điện thoại, đồng thời giữ chế độ sáng/tối và các hiệu ứng chạy mượt mà.": "Making the page look good on desktop, tablet and phone while keeping light/dark mode and the effects running smoothly.",
  "Cách dùng Flexbox và Grid để chia bố cục, cách dùng JavaScript để tạo menu, lọc dự án và kiểm tra form, và cách giữ code gọn gàng để dễ chỉnh sửa về sau.": "How to use Flexbox and Grid for layout, how to use JavaScript for menus, project filtering and form validation, and how to keep code tidy so it is easy to change later.",
  "Trưởng nhóm: mình tự làm toàn bộ trang chủ của Nhóm 4, từ bố cục, giao diện đến code, rồi kết nối với trang cá nhân của từng thành viên.": "Group leader: I built the entire Group 4 homepage myself, from layout and interface to code, then linked it to each member's personal page.",
  "Thiết kế sao cho sáu thẻ thành viên đồng đều, dễ nhìn, và các liên kết dẫn đúng đến từng trang cá nhân.": "Designing the six member cards to be even and easy to read, and making sure each link goes to the right personal page.",
  "Cách tổ chức một trang có nhiều liên kết, cách thống nhất giao diện chung cho cả nhóm, và cách điều phối công việc để các trang riêng khớp với trang chủ.": "How to organise a page with many links, how to keep a consistent look across the group, and how to coordinate work so the individual pages fit the homepage.",
  "Dự án nhóm: mình phụ trách phần cơ sở dữ liệu và queue writer, tức hàng đợi ghi dữ liệu của game.": "Group project: I was responsible for the database and the queue writer, the queue that writes the game's data.",
  "Nhiều người chơi cùng gửi dữ liệu một lúc nên cần ghi vào cơ sở dữ liệu đúng thứ tự và không bị mất hay trùng.": "Many players send data at the same time, so it had to be written to the database in the right order without being lost or duplicated.",
  "Cách thiết kế và làm việc với cơ sở dữ liệu, cách dùng hàng đợi để xử lý nhiều yêu cầu cùng lúc, và cách phối hợp với các bạn phụ trách phần giao diện và kết nối mạng.": "How to design and work with a database, how to use a queue to handle many requests at once, and how to coordinate with teammates handling the interface and networking.",

  // Chứng chỉ
  "Chứng chỉ và giải thưởng": "Certificates and awards",
  "Giải thưởng": "Awards",
  "Mình sẽ cập nhật khi có chứng chỉ.": "I will update this when I have a certificate.",
  "Mình sẽ cập nhật khi có giải thưởng.": "I will update this when I have an award.",

  // Sở thích
  "Tay cầm chơi game": "A game controller",
  "Trò chơi điện tử": "Video games",
  "Thích chơi game để giải trí và học cách tư duy chiến thuật.": "I enjoy gaming to relax and to practise strategic thinking.",
  "Mình hay chơi Liên Quân và các game thử thách cùng bạn bè trên Steam.": "I often play Arena of Valor and challenge games with friends on Steam.",
  "Nhóm bạn đá bóng cùng nhau trên sân cỏ buổi tối": "A group of friends playing football together on a grass pitch in the evening",
  "Các môn thể thao": "Sports",
  "Chơi thể thao để rèn luyện sức khỏe và tinh thần đồng đội.": "I play sports to stay healthy and build team spirit.",
  "Mình hay đá bóng và chơi cầu lông cùng bạn bè.": "I often play football and badminton with friends.",
  "Duy Khương cùng bạn bè trên đường leo núi Bà Đen": "Duy Khuong with friends on the trail up Ba Den Mountain",
  "Du lịch": "Travel",
  "Thích khám phá những nơi mới, văn hóa mới và gặp gỡ nhiều người.": "I love exploring new places and cultures and meeting new people.",
  "Nơi mình mong muốn đến nhất là Hà Nội, thủ đô của đất nước mình mà chưa có điều kiện ghé thăm. Còn gần đây, mình cùng những người bạn ở quê lên đã chinh phục núi Bà Đen.": "The place I most want to go is Hanoi, my country's capital, which I have not had the chance to visit. Recently, I climbed Ba Den Mountain with friends who came up from my hometown.",
  "Tai nghe và nốt nhạc": "Headphones and music notes",
  "Nghe nhạc": "Music",
  "Nghe nhạc mỗi ngày để thư giãn và có thêm năng lượng làm việc.": "I listen to music every day to relax and recharge for work.",
  "Mình thích nghe nhạc trẻ.": "I like listening to Vietnamese pop.",

  // Quiz
  "Bạn là loài cây nào?": "Which tree are you?",
  "Trả lời 4 câu hỏi nhanh để xem tính cách của bạn giống loài cây nào, rồi so với mình nhé.": "Answer 4 quick questions to see which tree your personality resembles, then compare with mine.",
  "Câu": "Question",
  "Bạn giống: ": "You are most like: ",
  "Làm lại": "Try again",
  "Cây tre": "Bamboo",
  "Bạn mềm mỏng nhưng bền bỉ: gió lớn đến đâu cũng chỉ uốn mình rồi đứng thẳng lại. Bạn hợp với công việc nhóm và kiên trì theo đuổi mục tiêu dài hạn.": "You are flexible yet resilient: however strong the wind, you only bend and then stand tall again. You thrive in teamwork and persist toward long-term goals.",
  "Phượng vĩ": "Flame tree",
  "Bạn rực rỡ và giàu cảm xúc, thích tạo dấu ấn riêng. Bạn mang năng lượng tích cực đến cho mọi người xung quanh.": "You are vibrant and full of feeling, and you like to leave your own mark. You bring positive energy to everyone around you.",
  "Cây sồi": "Oak",
  "Bạn chậm mà chắc, vững vàng và đáng tin cậy. Bạn thích xây nền tảng tốt trước khi bứt phá.": "You are slow but steady, solid and dependable. You like to build a good foundation before breaking through.",
  "Hoa sen": "Lotus",
  "Bạn điềm tĩnh, giữ được sự thanh thản dù hoàn cảnh ồn ào. Bạn học rất nhanh nhờ biết lắng nghe.": "You are calm and stay serene even when things get noisy. You learn very quickly because you know how to listen.",
  "Cuối tuần lý tưởng của bạn?": "Your ideal weekend?",
  "Đi chơi cùng nhóm bạn": "Going out with friends",
  "Ở nhà đọc sách, nghe nhạc": "Staying in to read or listen to music",
  "Luyện một kỹ năng mới": "Practising a new skill",
  "Đi dã ngoại, khám phá nơi mới": "Going on an outing, exploring somewhere new",
  "Khi gặp khó khăn, bạn thường…": "When you face difficulty, you usually…",
  "Bình tĩnh nghĩ cách": "Stay calm and think it through",
  "Kiên trì thử đi thử lại": "Keep trying again and again",
  "Lên kế hoạch từng bước": "Plan it step by step",
  "Nhờ bạn bè cùng giải quyết": "Ask friends to solve it together",
  "Trong nhóm, bạn hay đóng vai trò…": "In a group, you usually play the role of…",
  "Người truyền cảm hứng": "The inspirer",
  "Người điều phối, giữ nhịp": "The coordinator who keeps the pace",
  "Người hỗ trợ thầm lặng": "The quiet supporter",
  "Người linh hoạt, việc gì cũng làm": "The flexible all-rounder",
  "Bạn muốn mọi người nhớ về mình là…": "You want to be remembered as…",
  "Người đáng tin cậy": "A reliable person",
  "Người vui vẻ, nhiều năng lượng": "A cheerful, energetic person",
  "Người dịu dàng, thấu hiểu": "A gentle, understanding person",
  "Người không bao giờ bỏ cuộc": "Someone who never gives up",

  // Thư viện ảnh
  "Thư viện ảnh": "Photo gallery",
  "Một vài khoảnh khắc của mình. Bấm vào ảnh để xem lớn.": "A few moments from my life. Click a photo to see it larger.",
  "Duy Khương đang chạy thử game cờ Caro với hai người chơi": "Duy Khuong testing the Caro game with two players",
  "Chạy thử game cờ Caro": "Testing the Caro game",
  "Chơi cầu lông cùng bạn bè trong nhà thi đấu": "Playing badminton with friends in the sports hall",
  "Chơi cầu lông cùng bạn bè": "Playing badminton with friends",

  // Liên hệ
  "Bạn muốn trao đổi về học tập, công nghệ hoặc dự án? Hãy để lại lời nhắn.": "Want to talk about studies, technology or projects? Leave me a message.",
  "Họ và tên": "Full name",
  "Nhập họ tên": "Enter your name",
  "Chủ đề": "Subject",
  "Bạn muốn trao đổi về điều gì?": "What would you like to talk about?",
  "Nội dung": "Message",
  "Viết lời nhắn của bạn...": "Write your message...",
  "Kiểm tra và gửi": "Validate and send",
  "Vui lòng nhập họ tên (ít nhất 2 ký tự).": "Please enter your name (at least 2 characters).",
  "Vui lòng nhập email hợp lệ, ví dụ ten@example.com.": "Please enter a valid email, for example name@example.com.",
  "Chủ đề cần có ít nhất 3 ký tự.": "The subject needs at least 3 characters.",
  "Nội dung cần có ít nhất 10 ký tự.": "The message needs at least 10 characters.",
  "Bạn hãy kiểm tra lại các trường được đánh dấu.": "Please check the highlighted fields again.",
  "Thông tin hợp lệ. Đây là bản demo nên lời nhắn chưa được gửi đi.": "Your details are valid. This is a demo, so the message has not been sent.",

  // Lá rơi
  "Mình là trưởng nhóm của Nhóm 4 trong bài giữa kỳ này.": "I am the leader of Group 4 for this midterm assignment.",
  "Mình học ngành Công nghệ thông tin tại Đại học GTVT TP.HCM (UTH).": "I study Information Technology at the University of Transport HCMC (UTH).",
  "Game cờ Caro của nhóm mình chơi được qua mạng nhờ giao thức TCP.": "Our Caro game can be played over the network thanks to the TCP protocol.",
  "Shop bánh cuốn là website đầu tay của mình, đang chạy thật trên Netlify.": "The banh cuon shop is my first website, running live on Netlify.",
  "Trang này có phong cảnh ban ngày và ban đêm — thử bấm nút mặt trăng nhé!": "This page has day and night scenery — try clicking the moon button!",
  "Mục tiêu của mình: trở thành Full-stack Developer.": "My goal: to become a Full-stack Developer.",

  // Meta
  "Portfolio cá nhân của Nguyễn Đình Duy Khương — sinh viên Công nghệ thông tin, định hướng Full-stack Developer.": "Personal portfolio of Nguyen Dinh Duy Khuong — Information Technology student aiming to become a Full-stack Developer."
};

let lang = "vi";
try { lang = localStorage.getItem("khuong-lang") === "en" ? "en" : "vi"; } catch (e) {}

// Dịch một chuỗi (dùng cho chuỗi tạo bằng JS)
function t(text) {
  return lang === "en" && EN[text] ? EN[text] : text;
}

const TEXT_ORIGINAL = new WeakMap();
const ATTRS = ["alt", "aria-label", "placeholder", "title"];

function translateNode(node, toEn) {
  if (!TEXT_ORIGINAL.has(node)) {
    const key = node.nodeValue.trim();
    if (!key || !EN[key]) return;
    TEXT_ORIGINAL.set(node, node.nodeValue);
  }
  const original = TEXT_ORIGINAL.get(node);
  const lead = original.match(/^\s*/)[0];
  const trail = original.match(/\s*$/)[0];
  node.nodeValue = toEn ? lead + EN[original.trim()] + trail : original;
}

function translateAttrs(el, toEn) {
  ATTRS.forEach((attr) => {
    if (!el.hasAttribute(attr)) return;
    const store = `data-vi-${attr}`;
    if (!el.hasAttribute(store)) {
      if (!EN[el.getAttribute(attr)]) return;
      el.setAttribute(store, el.getAttribute(attr));
    }
    const original = el.getAttribute(store);
    el.setAttribute(attr, toEn ? EN[original] : original);
  });
}

function applyLang() {
  const toEn = lang === "en";
  document.documentElement.lang = lang;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement.closest("script, style") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((n) => translateNode(n, toEn));
  document.querySelectorAll("[alt], [aria-label], [placeholder], [title]").forEach((el) => translateAttrs(el, toEn));

  const meta = document.querySelector('meta[name="description"]');
  if (!meta.dataset.vi) meta.dataset.vi = meta.content;
  meta.content = toEn ? EN[meta.dataset.vi] : meta.dataset.vi;

  const button = document.querySelector(".lang-toggle");
  button.textContent = toEn ? "VI" : "EN";
  button.setAttribute("aria-label", toEn ? "Chuyển sang tiếng Việt" : "Switch to English");
  document.dispatchEvent(new Event("langchange"));
}

document.querySelector(".lang-toggle").addEventListener("click", () => {
  lang = lang === "en" ? "vi" : "en";
  try { localStorage.setItem("khuong-lang", lang); } catch (e) {}
  applyLang();
});
if (lang === "en") applyLang();
else document.querySelector(".lang-toggle").setAttribute("aria-label", "Switch to English");

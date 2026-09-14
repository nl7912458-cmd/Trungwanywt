// FILE NÀY ĐƯỢC TÁCH RIÊNG ĐỂ BẢO MẬT LINK DRIVE VÀ DỮ LIỆU SHOPEE

const KHO_DU_LIEU = {
    // 1. LINK GOOGLE DRIVE (Mã hóa Base64)
    driveLinks: {
        
        "tai_lieu_1": "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xbEtaWjVOMnZIaU9RUi1BUExaX2lwT0tsRDNRU0F4Vjgvdmlldz91c3A9ZHJpdmVzZGs=",
        "tai_lieu_2": "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xUjFFRnpQclRJSTF5cmdWRXNXb2NMQmZHT3l0dzlNdW8vdmlldz91c3A9ZHJpdmVzZGs=",

        // === Các phần tách nhỏ của "100 Từ vựng HSK" cho giao diện đa nhiệm (task-switcher) ===
        // ĐỔI 4 link base64 dưới đây thành link Drive thật của từng phần (dùng hàm btoa("link that") trong console trình duyệt để mã hoá)
        "hsk_p1": "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xbEtaWjVOMnZIaU9RUi1BUExaX2lwT0tsRDNRU0F4Vjgvdmlldz91c3A9ZHJpdmVzZGs=",
        "hsk_p2": "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xbEtaWjVOMnZIaU9RUi1BUExaX2lwT0tsRDNRU0F4Vjgvdmlldz91c3A9ZHJpdmVzZGs=",
        "hsk_p3": "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xbEtaWjVOMnZIaU9RUi1BUExaX2lwT0tsRDNRU0F4Vjgvdmlldz91c3A9ZHJpdmVzZGs=",
        "hsk_p4": "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xbEtaWjVOMnZIaU9RUi1BUExaX2lwT0tsRDNRU0F4Vjgvdmlldz91c3A9ZHJpdmVzZGs=",

        // === Các phần tách nhỏ của "Mẫu câu giao tiếp cơ bản" ===
        // ĐỔI 3 link base64 dưới đây thành link Drive thật của từng phần
        "giaotiep_p1": "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xUjFFRnpQclRJSTF5cmdWRXNXb2NMQmZHT3l0dzlNdW8vdmlldz91c3A9ZHJpdmVzZGs=",
        "giaotiep_p2": "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xUjFFRnpQclRJSTF5cmdWRXNXb2NMQmZHT3l0dzlNdW8vdmlldz91c3A9ZHJpdmVzZGs=",
        "giaotiep_p3": "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xUjFFRnpQclRJSTF5cmdWRXNXb2NMQmZHT3l0dzlNdW8vdmlldz91c3A9ZHJpdmVzZGs="
    },

    // === Nhóm tài liệu hiển thị trong giao diện đa nhiệm (task-switcher) ===
    // Mỗi "group" tương ứng với 1 nút Lấy Link Tải Về ngoài trang chủ.
    // Mỗi phần tử trong mảng là 1 thẻ (card) sẽ hiện ra để người dùng vuốt chọn.
    docGroups: {
        "hsk100": [
            { id: "hsk_p1", title: "Phần 1: Từ 1 - 25",  subtitle: "100 Từ vựng HSK miễn phí", color: "#0071e3" },
            { id: "hsk_p2", title: "Phần 2: Từ 26 - 50", subtitle: "100 Từ vựng HSK miễn phí", color: "#34c759" },
            { id: "hsk_p3", title: "Phần 3: Từ 51 - 75", subtitle: "100 Từ vựng HSK miễn phí", color: "#ff9500" },
            { id: "hsk_p4", title: "Phần 4: Từ 76 - 100", subtitle: "100 Từ vựng HSK miễn phí", color: "#ff3b30" }
        ],
        "giaotiep": [
            { id: "giaotiep_p1", title: "Phần 1: Chào hỏi",      subtitle: "Mẫu câu giao tiếp cơ bản", color: "#0071e3" },
            { id: "giaotiep_p2", title: "Phần 2: Công việc",     subtitle: "Mẫu câu giao tiếp cơ bản", color: "#34c759" },
            { id: "giaotiep_p3", title: "Phần 3: Mua sắm",       subtitle: "Mẫu câu giao tiếp cơ bản", color: "#ff9500" }
        ]
    },

    // 2. KHO ĐÁP ÁN GIẢ CHUNG
    fakeAnswers: [
        "Sổ tay ghi chú", "Bút chì kim", "Tẩy gôm", "Thước kẻ", 
        "Hộp bút", "Bút dạ quang", "Băng dính", "Lót chuột", 
        "Giá đỡ điện thoại", "Quạt mini để bàn", "Cáp sạc đa năng", 
        "Chuột không dây", "Tai nghe có dây", "Giấy nhớ",
        "Bút mực tự bay màu", "Thẻ Flashcard trắng", "Bàn phím cơ dán Pinyin",
        "Vở luyện viết tiếng Trung", "Bút scan dịch văn bản",
        "Set 5 bút Gel basic", "Mắt kính cận Korea style", "Sữa dưỡng thể Snail Gold",
        "Móc khóa thú bông Hải Cẩu", "Kẹo viên Milo Cube", "Thắt lưng da nam khóa tự động",
        "Hộp đựng bút cá voi xanh", "Giấy thấm dầu Mayan",
        "Quạt tích điện cầm tay Yoobao", "Bình nước giữ nhiệt bằng thép",
        "Set 300 tờ giấy Note nhiều màu", "Túi đựng tài liệu Hikoma", 
        "Pin dự phòng Philips", "Đồng hồ điện tử treo túi", "Máy sấy tóc ion âm CWELL",
        "Dây cáp sạc DOSEN PD 20W", "Thẻ nhớ Micro SD", "Máy in phun màu Canon Pixma G1010",
        "Bộ áo mưa đi xe máy Unisex", "Đèn học để bàn thông minh", "Đồng hồ thông minh GOOJODOQ"
    ],

    // 3. KHO LINK SHOPEE
    shopeePool: [
        {
            link: "https://s.shopee.vn/3B7NdXFOB9",
            correctName: "Vở luyện viết tiếng Trung"
        },
        {
            link: "https://s.shopee.vn/9fKrNlzjbP",
            correctName: "Set 5 bút Gel basic"
        },
        {
            link: "https://s.shopee.vn/5q88p16v3S",
            correctName: "Mắt kính cận Korea style"
        },
        {
            link: "https://s.shopee.vn/8KpTnfj4HA",
            correctName: "Sữa dưỡng thể Snail Gold"
        },
        {
            link: "https://s.shopee.vn/1BMJGYQBia",
            correctName: "Móc khóa thú bông Hải Cẩu"
        },
        {
            link: "https://s.shopee.vn/9peHaX52oy",
            correctName: "Kẹo viên Milo Cube"
        },
        {
            link: "https://s.shopee.vn/7Kwwbz6XnU",
            correctName: "Thắt lưng da nam khóa tự động"
        },
        {
            link: "https://s.shopee.vn/W6cTTYiNX",
            correctName: "Hộp đựng bút cá voi xanh"
        },
        {
            link: "https://s.shopee.vn/9fKrONtWld",
            correctName: "Giấy thấm dầu Mayan"
        },
        {
            link: "https://s.shopee.vn/1qc0429DEP",
            correctName: "Quạt tích điện cầm tay Yoobao"
        },
        {
            link: "https://s.shopee.vn/1BMJGrRAuN",
            correctName: "Bình nước giữ nhiệt bằng thép"
        },
        {
            link: "https://s.shopee.vn/8plkP03AbT",
            correctName: "Set 300 tờ giấy Note nhiều màu"
        },
        {
            link: "https://s.shopee.vn/9fKrOabyFZ",
            correctName: "Túi đựng tài liệu Hikoma"
        },
        {
            link: "https://s.shopee.vn/50Z1q4VVGe",
            correctName: "Pin dự phòng Philips"
        },
        {
            link: "https://s.shopee.vn/qjSsV0KH1",
            correctName: "Đồng hồ điện tử treo túi"
        },
        {
            link: "https://s.shopee.vn/20vQGhlT9e",
            correctName: "Máy sấy tóc ion âm CWELL"
        },
        {
            link: "https://s.shopee.vn/W6cU1TA45",
            correctName: "Dây cáp sạc DOSEN PD 20W"
        },
        {
            link: "https://s.shopee.vn/5foidaz16K",
            correctName: "Thẻ nhớ Micro SD"
        },
        {
            link: "https://s.shopee.vn/5LBsF1lKCG",
            correctName: "Máy in phun màu Canon Pixma G1010"
        },
        {
            link: "https://s.shopee.vn/9zxhne2Uzz",
            correctName: "Bộ áo mưa đi xe máy Unisex"
        },
        {
            link: "https://s.shopee.vn/2gB74DkfLx",
            correctName: "Đèn học để bàn thông minh"
        },
        {
            link: "https://s.shopee.vn/2BEqTLXx5x",
            correctName: "Đồng hồ thông minh GOOJODOQ"
        }
    ]
};

/* =========================================================
   BROWSER GUARD
   Chỉ cho phép trang chạy trên Chrome / Safari (trình duyệt thật).
   Nếu phát hiện đang mở trong webview của Zalo, Facebook, Messenger,
   TikTok, Instagram, Line, WeChat... thì chặn lại và hướng dẫn người
   dùng mở bằng trình duyệt ngoài, kèm nút Copy link để dán.
   ========================================================= */
(function () {
    var ua = navigator.userAgent || navigator.vendor || window.opera || "";

    // Danh sách nhận diện các "app" mở link bằng webview riêng
    var APPS = [
        { key: "zalo",       name: "Zalo",             re: /Zalo/i },
        { key: "messenger",  name: "Messenger",        re: /FB_IAB\/MESSENGER|MessengerForiOS|MessengerLiteForiOS/i },
        { key: "facebook",   name: "Facebook",         re: /FBAN|FBAV|FB_IAB|FBSN|FBSS|FB4A|FBIOS/i },
        { key: "tiktok",     name: "TikTok",           re: /BytedanceWebview|musical_ly|TikTok/i },
        { key: "instagram",  name: "Instagram",        re: /Instagram/i },
        { key: "line",       name: "Line",             re: /Line\//i },
        { key: "wechat",     name: "WeChat",           re: /MicroMessenger/i }
    ];

    var detected = null;
    for (var i = 0; i < APPS.length; i++) {
        if (APPS[i].re.test(ua)) { detected = APPS[i]; break; }
    }

    // Phòng trường hợp không khớp app cụ thể nhưng vẫn là webview lạ
    // (không phải Safari/Chrome thật) trên iOS: bỏ qua để tránh chặn nhầm
    // các trình duyệt hợp lệ như Cốc Cốc, Edge, Firefox, Samsung Internet...
    if (!detected) return;

    var isAndroid = /Android/i.test(ua);
    var pageUrl = window.location.href;

    function buildOverlay() {
        var overlay = document.createElement("div");
        overlay.id = "browser-guard-overlay";

        var stepsByApp = {
            zalo:      "Chạm vào biểu tượng <b>⋮ / •••</b> ở góc trên bên phải &rarr; chọn <b>“Mở bằng trình duyệt”</b>.",
            messenger: "Chạm vào biểu tượng <b>•••</b> ở góc trên bên phải &rarr; chọn <b>“Mở bằng trình duyệt ngoài”</b>.",
            facebook:  "Chạm vào biểu tượng <b>•••</b> ở góc trên bên phải &rarr; chọn <b>“Mở bằng Chrome/Safari”</b>.",
            tiktok:    "Chạm vào biểu tượng <b>•••</b> ở góc trên bên phải &rarr; chọn <b>“Mở bằng trình duyệt”</b>.",
            instagram: "Chạm vào biểu tượng <b>•••</b> ở góc trên bên phải &rarr; chọn <b>“Mở bằng trình duyệt ngoài”</b>.",
            line:      "Chạm vào biểu tượng menu &rarr; chọn <b>“Mở bằng trình duyệt ngoài”</b>.",
            wechat:    "Chạm vào biểu tượng <b>•••</b> ở góc trên bên phải &rarr; chọn <b>“Mở trong trình duyệt”</b>."
        };
        var stepText = stepsByApp[detected.key] || "Chạm vào menu (thường là <b>•••</b> hoặc <b>⋮</b>) ở góc trên bên phải &rarr; chọn <b>“Mở bằng trình duyệt ngoài”</b>.";

        overlay.innerHTML =
            '<div class="bg-box">' +
                '<h3>Vui lòng mở bằng Chrome hoặc Safari</h3>' +
                '<p>Trang đang được mở trong ứng dụng <b>' + detected.name + '</b>. ' +
                'Một số tính năng (tải tài liệu, mở link) có thể không hoạt động đúng trong trình duyệt của ứng dụng này.</p>' +

                '<div class="bg-step">' +
                    '<span class="bg-step-num">1</span>' +
                    '<span>Bấm nút <b>“Copy link trang”</b> bên dưới.</span>' +
                '</div>' +
                '<div class="bg-step">' +
                    '<span class="bg-step-num">2</span>' +
                    '<span>' + stepText + ' Hoặc mở Chrome/Safari và dán link vào.</span>' +
                '</div>' +

                '<button id="bg-copy-btn" class="bg-copy-btn">📋 Copy link trang</button>' +
                (isAndroid ? '<button id="bg-open-chrome-btn" class="bg-open-btn">Mở bằng Chrome</button>' : '') +
                '<p class="bg-note" id="bg-copy-note"></p>' +
            '</div>';

        document.documentElement.appendChild(overlay);
        document.documentElement.style.overflow = "hidden";
        if (document.body) document.body.style.overflow = "hidden";

        document.getElementById("bg-copy-btn").addEventListener("click", copyLink);
        var chromeBtn = document.getElementById("bg-open-chrome-btn");
        if (chromeBtn) chromeBtn.addEventListener("click", openInChrome);
    }

    function copyLink() {
        var note = document.getElementById("bg-copy-note");
        function ok() { note.textContent = "✅ Đã copy link! Giờ hãy dán vào Chrome/Safari."; }
        function fail() { note.textContent = "Link: " + pageUrl; }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(pageUrl).then(ok).catch(function () {
                fallbackCopy();
            });
        } else {
            fallbackCopy();
        }

        function fallbackCopy() {
            try {
                var ta = document.createElement("textarea");
                ta.value = pageUrl;
                ta.style.position = "fixed";
                ta.style.opacity = "0";
                document.body.appendChild(ta);
                ta.focus();
                ta.select();
                var success = document.execCommand("copy");
                document.body.removeChild(ta);
                success ? ok() : fail();
            } catch (e) {
                fail();
            }
        }
    }

    // Chỉ hoạt động trên Android (dùng Chrome Custom Intent).
    // Trên iOS, Apple không cho phép webview mở thẳng Safari nên chỉ dùng Copy link.
    function openInChrome() {
        var withoutScheme = pageUrl.replace(/^https?:\/\//, "");
        var intentUrl = "intent://" + withoutScheme +
            "#Intent;scheme=https;package=com.android.chrome;end";
        window.location.href = intentUrl;
    }

    if (document.body) {
        buildOverlay();
    } else {
        document.addEventListener("DOMContentLoaded", buildOverlay);
    }
})();

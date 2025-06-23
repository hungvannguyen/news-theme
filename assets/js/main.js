(function () {
    document.addEventListener("DOMContentLoaded", () => {

        setupDropdownBehavior();

        window.addEventListener("resize", () => {
            setupDropdownBehavior();
        });

        // Search bar behavior
        document.querySelectorAll('[data-behavior="search"]').forEach((searchBar) => {
            const toggleBtn = searchBar.querySelector(".search__btn");
            const searchInput = searchBar.querySelector(".search__input");
            const closeBtn = searchBar.querySelector(".search__close");

            if (!toggleBtn || !searchInput) return;

            // Toggle khi click nút search
            toggleBtn.addEventListener("click", (e) => {
                e.preventDefault();
                console.log("Search button clicked");
                searchInput.classList.toggle("active");
            });

            // Đóng khi click nút close
            if (closeBtn) {
                closeBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    searchInput.classList.remove("active");
                });
            }

            // Đóng khi click ra ngoài
            document.addEventListener("click", (e) => {
                const isClickInside = searchBar.contains(e.target);
                if (!isClickInside) {
                    searchInput.classList.remove("active");
                }
            });
        });

        // Theme switcher
        const themeSwitcher = document.querySelector(".theme__switcher");
        const html = document.documentElement;
        const iconLight = themeSwitcher.querySelector(".icon-light");
        const iconDark = themeSwitcher.querySelector(".icon-dark");

        // Hàm để cập nhật icon
        const updateIcons = () => {
            const isDark = html.classList.contains("dark");
            iconLight.classList.toggle("hidden", isDark);
            iconDark.classList.toggle("hidden", !isDark);
        };

        // Assign click event to the theme switcher
        themeSwitcher.addEventListener("click", () => {
            html.classList.toggle("dark");
            updateIcons();

            // Save the current theme to localStorage
            const isDark = html.classList.contains("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });

        // Restore the theme from localStorage on page load
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
        updateIcons();

        //     Open and close sidebar

        const toggleBtn = document.getElementById("sidebar-toggle");
        const sidebar = document.getElementById("sidebar");
        const closeBtn = document.querySelector(".mobile__close");

        function openSidebar() {
            sidebar.classList.remove("-translate-x-full");
            sidebar.classList.add("translate-x-0");
        }

        function closeSidebar() {
            sidebar.classList.add("-translate-x-full");
            sidebar.classList.remove("translate-x-0");
        }

        if (toggleBtn) {
            toggleBtn.addEventListener("click", (e) => {
                e.preventDefault();
                openSidebar();
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener("click", (e) => {
                e.preventDefault();
                closeSidebar();
            });
        }

        const scrollProgressCircle = document.querySelector(
            ".progress-circle-fill",
        );
        const radius = parseFloat(scrollProgressCircle.getAttribute("r"));
        const circumference = 2 * Math.PI * radius;

        // Đặt biến CSS tùy chỉnh cho chu vi
        document.documentElement.style.setProperty(
            "--circumference",
            circumference,
        );

        // Cập nhật thuộc tính stroke-dashoffset ban đầu
        scrollProgressCircle.style.strokeDasharray = circumference;
        scrollProgressCircle.style.strokeDashoffset = circumference; // Ban đầu ẩn hoàn toàn

        const scrollToTopBtn = document.querySelector(".scroll-to-top");

        // Hàm cập nhật tiến độ
        const updateScrollProgress = () => {
            // Chiều cao tổng của nội dung trang
            const documentHeight = document.documentElement.scrollHeight;
            // Chiều cao của cửa sổ trình duyệt (viewport)
            const viewportHeight = window.innerHeight;
            // Vị trí cuộn hiện tại
            const scrollTop = window.scrollY;

            // Tính toán chiều cao khả dụng để cuộn (total scrollable height)
            // Đây là tổng chiều cao của tài liệu trừ đi chiều cao của viewport
            const scrollableHeight = documentHeight - viewportHeight;

            // Đảm bảo không chia cho 0 nếu trang không cuộn được
            if (scrollableHeight <= 0) {
                scrollProgressCircle.style.strokeDashoffset = circumference; // Đặt về ban đầu nếu không cuộn
                scrollToTopBtn.style.opacity = "0"; // Ẩn nút nếu không cuộn
                return;
            }

            // Tính toán phần trăm đã cuộn
            // Ví dụ: cuộn 50% trang thì scrollPercentage = 0.5
            const scrollPercentage = Math.min(
                1,
                Math.max(0, scrollTop / scrollableHeight),
            );

            // Tính toán giá trị stroke-dashoffset
            // Khi scrollPercentage = 0, dashoffset = circumference (không hiển thị)
            // Khi scrollPercentage = 1, dashoffset = 0 (hiển thị đầy đủ)
            const dashoffset = circumference * (1 - scrollPercentage);

            scrollProgressCircle.style.strokeDashoffset = dashoffset;

            // Hiển thị/ẩn nút scroll-to-top dựa trên vị trí cuộn
            if (scrollTop > 100) {
                // Hiển thị khi cuộn xuống 100px
                scrollToTopBtn.style.opacity = "1";
                scrollToTopBtn.style.pointerEvents = "auto"; // Cho phép click
            } else {
                scrollToTopBtn.style.opacity = "0";
                scrollToTopBtn.style.pointerEvents = "none"; // Vô hiệu hóa click khi ẩn
            }
        };

        // Gắn sự kiện cuộn (scroll) vào cửa sổ
        window.addEventListener("scroll", updateScrollProgress);

        // Xử lý sự kiện click để cuộn về đầu trang
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth", // Cuộn mượt mà
            });
        });

        // Gọi hàm một lần khi tải trang để thiết lập trạng thái ban đầu
        updateScrollProgress();
    });

    function setupDropdownBehavior() {
        document.querySelectorAll('[data-behavior="dropdown"]').forEach((item) => {
            let trigger = item.querySelector(".menu__link");
            const subMenu = item.querySelector(".sub__menu");
            const icon = item.querySelector(".dropdown-icon");

            if (!trigger || !subMenu) return;

            // Clear old event listeners (nếu có)
            const newTrigger = trigger.cloneNode(true);
            trigger.parentNode.replaceChild(newTrigger, trigger);
            trigger = newTrigger;

            const useClick = window.innerWidth <= 992;

            if (useClick) {
                [trigger, icon].forEach((el) => {
                    if (!el) return;

                    el.addEventListener("click", (e) => {
                        e.preventDefault();
                        subMenu.classList.toggle("active");
                        icon.classList.toggle("active");
                    });
                });
            } else {
                item.addEventListener("mouseenter", () => {
                    subMenu.classList.add("active");
                });
                item.addEventListener("mouseleave", () => {
                    subMenu.classList.remove("active");
                });
            }
        });
    }
})();

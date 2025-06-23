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

document.addEventListener("DOMContentLoaded", () => {
    let visible = 8;

    // ------------------------- ELEMENTS -------------------------
    const allItems = [...document.querySelectorAll(".episode-card")];
    let filteredItems = [...allItems];

    const btn = document.querySelector(".episodes-load-more");
    const image = document.querySelector(".episodes-image-holder");
    const episodesNameInput = document.querySelector(".episodes-name-input");

    const seasonSelector = document.querySelector(".episode-season-searcher");
    const dropdown = document.querySelector(".season-selector-holder");
    const options = [...document.querySelectorAll(".episode-season-option")];

    // Modal elements
    const modal = document.getElementById("episodeModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalSeason = document.getElementById("modalSeason");
    const modalAirdate = document.getElementById("modalAirdate");
    const modalClose = document.getElementById("modalClose");

    // ------------------------- INIT -------------------------
    if (!allItems.length) return; // Nothing to do if no episodes

    // Activate first season option
    if (options.length > 0) options[0].classList.add("episode-season-option-active");

    // ------------------------- RENDER -------------------------
    function renderEpisodes() {
        // Hide all first
        allItems.forEach(item => item.style.display = "none");

        // Show filtered items up to `visible`
        filteredItems.slice(0, visible).forEach(item => item.style.display = "block");

        // Load more button visibility
        if (btn) btn.style.display = filteredItems.length > visible ? "block" : "none";

        // No results image visibility
        if (image) {
            const searchText = episodesNameInput?.value.trim() || "";
            image.style.display = filteredItems.length === 0 && searchText !== "" ? "block" : "none";
        }
    }

    // ------------------------- FILTER LOGIC -------------------------
    function applyFilters() {
        const searchText = episodesNameInput?.value.toUpperCase() || "";
        const activeOption = options.find(opt => opt.classList.contains("episode-season-option-active"));
        const seasonText = activeOption?.textContent.toLowerCase() || "all season";

        filteredItems = allItems.filter(item => {
            const episodeDiv = item.querySelector(".episode");
            const isSeasonTwo = episodeDiv?.classList.contains("season-two") || false;

            const matchesSeason = seasonText === "all season" ||
                                  (seasonText === "1 season" && !isSeasonTwo) ||
                                  (seasonText === "2 season" && isSeasonTwo);

            const title = item.querySelector(".episode-title")?.textContent.toUpperCase() || "";
            const matchesSearch = title.includes(searchText);

            return matchesSeason && matchesSearch;
        });

        visible = 8; // reset visible count
        renderEpisodes();
    }

    // ------------------------- EVENTS -------------------------

    // Load more
    btn?.addEventListener("click", () => {
        visible += 8;
        renderEpisodes();
    });

    // Search input
    episodesNameInput?.addEventListener("input", applyFilters);

    // Season filter dropdown
    if (dropdown && seasonSelector) {
        dropdown.addEventListener("click", (e) => {
            const clicked = e.target;
            if (!clicked.classList.contains("episode-season-option")) return;

            options.forEach(opt => opt.classList.remove("episode-season-option-active"));
            clicked.classList.add("episode-season-option-active");

            seasonSelector.textContent = clicked.textContent;
            applyFilters();
        });
    }

    // ------------------------- MODAL -------------------------
    if (modal && modalTitle && modalSeason && modalAirdate && modalClose) {
        allItems.forEach(card => {
            card.addEventListener("click", () => {
                modalTitle.textContent = card.querySelector(".episode-title")?.textContent || "";
                modalSeason.textContent = card.querySelector(".episode-season")?.textContent || "";
                modalAirdate.textContent = card.querySelector(".episode-airdate")?.textContent || "";

                modal.style.display = "flex";
                document.body.classList.add("no-scroll");
            });
        });

        modalClose.addEventListener("click", () => {
            modal.style.display = "none";
            document.body.classList.remove("no-scroll");
        });

        modal.addEventListener("click", e => {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.classList.remove("no-scroll");
            }
        });
    }

    // ------------------------- INITIAL RENDER -------------------------
    renderEpisodes();
});

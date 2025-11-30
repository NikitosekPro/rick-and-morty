let visible = 8;
const items = document.querySelectorAll(".episode");
const btn = document.querySelector(".episodes-load-more");
const image = document.querySelector(".episodes-image-holder");
const episodesNameInput = document.querySelector(".episodes-name-input");
const firstElement = document.querySelector("#first-episode");
firstElement.classList.add("episode-season-option-active");

showItems(visible);

// ------------------ SHOW ITEMS ------------------ //
function showItems(count) {
    const activeOption = document.querySelector(".episode-season-option-active");
    const seasonText = activeOption ? activeOption.textContent.toLowerCase() : "all season";
    const filter = episodesNameInput.value.toUpperCase();

    let shown = 0;
    let filteredCount = 0;
    let foundAny = false;

    items.forEach(item => {
        const isSeasonTwo = item.classList.contains("season-two");
        let matchesSeason = false;

        if (seasonText === "all season") matchesSeason = true;
        else if (seasonText === "1 season" && !isSeasonTwo) matchesSeason = true;
        else if (seasonText === "2 season" && isSeasonTwo) matchesSeason = true;

        const title = item.querySelector(".episode-title").textContent.toUpperCase();
        const matchesSearch = title.indexOf(filter) > -1;

        if (matchesSeason && matchesSearch) filteredCount++;

        if (matchesSeason && matchesSearch && shown < count) {
            item.style.display = "block";
            shown++;
            foundAny = true;
        } else {
            item.style.display = "none";
        }
    });

    btn.style.display = (shown < filteredCount) ? "block" : "none";
    image.style.display = (filter && !foundAny) ? "block" : "none";
}

// ------------------ LOAD MORE ------------------ //
btn.addEventListener("click", () => {
    visible += 8;
    showItems(visible);
});

// ------------------ SEARCH ------------------ //
episodesNameInput.addEventListener("input", () => {
    visible = 8;
    showItems(visible);
});

// ------------------ FILTER SEASON ------------------ //
const seasonSelector = document.querySelector(".episode-season-searcher");
const dropdown = document.querySelector(".season-selector-holder");
const options = document.querySelectorAll(".episode-season-option");

dropdown.addEventListener("click", (event) => {
    const clicked = event.target;
    if (!clicked.classList.contains("episode-season-option")) return;

    options.forEach(opt => opt.classList.remove("episode-season-option-active"));
    clicked.classList.add("episode-season-option-active");

    seasonSelector.textContent = clicked.textContent;
    visible = 6;
    showItems(visible);
});

// ------------------ OPEN MODAL ------------------ //
const modal = document.getElementById("episodeModal");
const modalTitle = document.getElementById("modalTitle");
const modalSeason = document.getElementById("modalSeason");
const modalAirdate = document.getElementById("modalAirdate");
const modalClose = document.getElementById("modalClose");

const episodeCards = document.querySelectorAll(".episode-card");

episodeCards.forEach(card => {
    card.addEventListener("click", () => {
        modalTitle.textContent = card.querySelector(".episode-title").textContent.trim();
        modalSeason.textContent = card.querySelector(".episode-season").textContent.trim();
        modalAirdate.textContent = card.querySelector(".episode-airdate").textContent.trim();

        modal.style.display = "flex";
        document.body.classList.add("no-scroll");
    });
});

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.classList.remove("no-scroll");
    }
});

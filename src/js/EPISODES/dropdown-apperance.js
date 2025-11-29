
// DROPDOWN APPERANCE

const seasonSelector = document.querySelector(".episode-season-searcher");
const dropdown = document.querySelector(".season-selector-holder");
const dropdownElement = document.querySelector(".episode-season-option");



    if (seasonSelector && dropdown) {
        seasonSelector.addEventListener("click" , () => {
            dropdown.classList.toggle("season-selector-holder-active");
        })
    }



// DROPDOWN ANIMATION


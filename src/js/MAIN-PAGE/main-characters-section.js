import rickImg from "../../img/Rick-Sanchez-desktop.png"
import mortyImg from "../../img/Morty-Smith-desktop.png"
import summerImg from "../../img/Summer-Smith-desktop.png"
import bethImg from "../../img/Beth-Smith-desktop.png"
import jerrykImg from "../../img/Jerry-Smith-desktop.png"

document.addEventListener("DOMContentLoaded", () => {

    const rick = document.querySelector(".rick");
    const morty = document.querySelector(".morty");
    const summer = document.querySelector(".summer");
    const beth = document.querySelector(".beth");
    const jerry = document.querySelector(".jerry");
    const image = document.querySelector(".character-selected-image");

    // If these elements do NOT exist on this page → STOP the script
    if (!rick || !morty || !summer || !beth || !jerry || !image) {
        return;
    }

    // --- event handlers ---
    changeImageRick();

    rick.addEventListener("click", changeImageRick);
    morty.addEventListener("click", changeImageMorty);
    summer.addEventListener("click", changeImageSummer);
    beth.addEventListener("click", changeImageBeth);
    jerry.addEventListener("click", changeImageJerry);

    function changeImageRick() {
        rick.style.color = "rgba(161, 215, 55, 1)";
        image.src = rickImg;
        resetOthers(morty, summer, beth, jerry);
    }

    function changeImageMorty() {
        morty.style.color = "rgba(161, 215, 55, 1)";
        image.src = mortyImg;
        resetOthers(rick, summer, beth, jerry);
    }

    function changeImageSummer() {
        summer.style.color = "rgba(161, 215, 55, 1)";
        image.src = summerImg;
        resetOthers(rick, morty, beth, jerry);
    }

    function changeImageBeth() {
        beth.style.color = "rgba(161, 215, 55, 1)";
        image.src = bethImg;
        resetOthers(rick, morty, summer, jerry);
    }

    function changeImageJerry() {
        jerry.style.color = "rgba(161, 215, 55, 1)";
        image.src = jerrykImg;
        resetOthers(rick, morty, summer, beth);
    }

    function resetOthers(...els) {
        els.forEach(el => el.style.color = "black");
    }

});

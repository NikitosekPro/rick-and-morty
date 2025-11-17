const rick = document.querySelector(".rick");
const morty = document.querySelector(".morty");
const summer = document.querySelector(".summer");
const beth = document.querySelector(".beth");
const jerry = document.querySelector(".jerry");
const image = document.querySelector(".character-selected-image")




changeImageRick()




rick.addEventListener("click" , changeImageRick)
morty.addEventListener("click" , changeImageMorty)
summer.addEventListener("click" , changeImageSummer)
beth.addEventListener("click" , changeImageBeth)
jerry.addEventListener("click" , changeImageJerry)

function changeImageRick() {
    rick.style.color="rgba(161, 215, 55, 1)"
    image.src = "./img/Rick-Sanchez.png"


    morty.style.color="black"
    summer.style.color="black"
    beth.style.color="black"
    jerry.style.color="black"


    if (image.style.display = "none") {
        image.src = "./img/Rick-Sanchez-desktop.png"
        image.style.display = "block"
        image.style.marginRight = "40px"
    }

}

function changeImageMorty() {
    image.src = "./img/Morty-Smith.png"
    morty.style.color="rgba(161, 215, 55, 1)"
    image.src = "./img/Morty-Smith.png"


    rick.style.color="black"
    summer.style.color="black"
    beth.style.color="black"
    jerry.style.color="black"


    if (image.style.display = "none") {
        image.src = "./img/Morty-Smith-desktop.png"
        image.style.display = "block"
    }

}


function changeImageSummer() {
    summer.style.color="rgba(161, 215, 55, 1)"
    image.src = "./img/Summer-Smith.png"


    morty.style.color="black"
    rick.style.color="black"
    beth.style.color="black"
    jerry.style.color="black"


    if (image.style.display = "none") {
        image.src = "./img/Summer-Smith-desktop.png"
        image.style.display = "block"
    }

}

function changeImageBeth() {
    beth.style.color="rgba(161, 215, 55, 1)"
    image.src = "./img/Beth-Smith.png"


    summer.style.color="black"
    rick.style.color="black"
    morty.style.color="black"
    jerry.style.color="black"


    if (image.style.display = "none") {
        image.src = "./img/Beth-Smith-desktop.png"
        image.style.display = "block"
    }

}


function changeImageJerry() {
    jerry.style.color="rgba(161, 215, 55, 1)"
    image.src = "./img/Jerry-Smith.png"


    morty.style.color="black"
    summer.style.color="black"
    beth.style.color="black"
    rick.style.color="black"


    if (image.style.display = "none") {
        image.src = "./img/Jerry-Smith-desktop.png"
        image.style.display = "block"
    }

}
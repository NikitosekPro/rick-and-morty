import rickImg from "../../img/Rick-Sanchez-desktop.png"
import mortyImg from "../../img/Morty-Smith-desktop.png"
import summerImg from "../../img/Summer-Smith-desktop.png"
import bethImg from "../../img/Beth-Smith-desktop.png"
import jerrykImg from "../../img/Jerry-Smith-desktop.png"


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
    image.src = rickImg


    morty.style.color="black"
    summer.style.color="black"
    beth.style.color="black"
    jerry.style.color="black"


    

}

function changeImageMorty() {
    image.src = mortyImg
    morty.style.color="rgba(161, 215, 55, 1)"


    rick.style.color="black"
    summer.style.color="black"
    beth.style.color="black"
    jerry.style.color="black"


    

}


function changeImageSummer() {
    summer.style.color="rgba(161, 215, 55, 1)"
    image.src = summerImg


    morty.style.color="black"
    rick.style.color="black"
    beth.style.color="black"
    jerry.style.color="black"


    

}

function changeImageBeth() {
    beth.style.color="rgba(161, 215, 55, 1)"
    image.src = bethImg


    summer.style.color="black"
    rick.style.color="black"
    morty.style.color="black"
    jerry.style.color="black"


    

}


function changeImageJerry() {
    jerry.style.color="rgba(161, 215, 55, 1)"
    image.src = jerrykImg


    morty.style.color="black"
    summer.style.color="black"
    beth.style.color="black"
    rick.style.color="black"


    

}
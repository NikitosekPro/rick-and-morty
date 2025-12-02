import"./main-D3DmZq5u.js";const y="https://rickandmortyapi.com/api/character",u=document.querySelector(".filter-item input"),h=document.querySelectorAll(".filter-item select"),a=document.querySelector(".load-more"),p=document.querySelector(".characters-main-flex");let s=document.querySelector(".cards-list");s||(s=document.createElement("div"),s.className="cards-list",a?p.insertBefore(s,a):p.appendChild(s));let i=1,l=1,r={name:"",status:"",species:"",type:"",gender:""};function v(e,t){const n=t.trim().toLowerCase();return n==="all"||n==="none"||n==="other"?"":n}function L(e,t=350){let n;return(...g)=>{clearTimeout(n),n=setTimeout(()=>e(...g),t)}}async function d(e=1){const t=new URLSearchParams;t.set("page",e),r.name&&t.set("name",r.name),r.status&&t.set("status",r.status),r.species&&t.set("species",r.species),r.type&&t.set("type",r.type),r.gender&&t.set("gender",r.gender);try{const n=await fetch(`${y}?${t.toString()}`);if(!n.ok){if(n.status===404)return{info:{pages:0},results:[]};throw new Error("Network error")}return await n.json()}catch(n){return console.error("Fetch error",n),{info:{pages:0},results:[]}}}function o(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function S(e){const t=document.createElement("div");return t.className="char-card",t.dataset.id=e.id,t.innerHTML=`
    <img src="${e.image}" alt="${o(e.name)}" />
    <div class="content">
      <h3>${o(e.name)}</h3>
      <p>Status: ${o(e.status)}</p>
      <p>Species: ${o(e.species)}</p>
      <p>Gender: ${o(e.gender)}</p>
    </div>
  `,t}function m(e,t=!1){if(t||(s.innerHTML=""),!e.length){s.innerHTML=`
      <div class="no-results">
        <img src="../img/try-looking-for-something-else.png" alt="No results" />
        <p>Oops! Try looking for something else...</p>
      </div>
    `;return}e.forEach(n=>{s.appendChild(S(n))})}async function c(){i=1;const e=await d(i);l=e.info.pages,m(e.results),f()}c();async function w(){if(i>=l)return;i++;const e=await d(i);m(e.results,!0),f()}function f(){i>=l?a.style.display="none":a.style.display="block"}a==null||a.addEventListener("click",w);u.addEventListener("input",L(()=>{r.name=u.value.trim().toLowerCase(),c()},400));h.forEach(e=>{e.addEventListener("change",()=>{const t=e.previousElementSibling.textContent.trim().toLowerCase(),n=v(t,e.value);r[t]=n,c()})});

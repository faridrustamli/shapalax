const shapalaxBtn = document.getElementById("shapalaxBtn");
const resetBtn = document.getElementById("resetBtn");
const counterEl = document.getElementById("counter");
const emojiContainer = document.getElementById("emojiContainer");
const sound = document.getElementById("shapalaxSound");
const amountInput = document.getElementById("amountInput");
const loginNotice = document.getElementById("loginNotice");

let loggedIn = localStorage.getItem("shapalaxLogin")==="true";

if(!loggedIn) loginNotice.style.display="block";

// Günlük istatistikleri çek
function loadStats(){
  fetch("/api/stats")
  .then(res=>res.json())
  .then(data=>{ counterEl.textContent = data.total; });
}
loadStats();

// Şapalax ekle
shapalaxBtn.addEventListener("click",()=>{
  if(!loggedIn){ alert("Giriş yapmadan şapalax ekleyemezsiniz!"); return; }

  let amount = Number(amountInput.value) || 1;

  fetch("/api/add",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({amount})
  })
  .then(res=>res.json())
  .then(data=>{
    counterEl.textContent = data.total;

    sound.currentTime=0;
    sound.play();

    for(let i=0;i<amount;i++){
      const emoji = document.createElement("div");
      emoji.classList.add("emoji");
      emoji.textContent = "👏";
      emoji.style.left = Math.random()*80 + "%";
      emojiContainer.appendChild(emoji);
      setTimeout(()=>emoji.remove(),2000);
    }
  });
  amountInput.value="";
});

// Reset butonu
resetBtn.addEventListener("click",()=>{
  if(!loggedIn){ alert("Giriş yapmadan reset yapamazsınız!"); return; }
  fetch("/api/add",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({amount:-Number(counterEl.textContent)})
  })
  .then(res=>res.json())
  .then(data=>{ counterEl.textContent = data.total; });
});

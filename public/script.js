document.addEventListener("DOMContentLoaded", () => {
  const statsList = document.getElementById("statsList");
  const shapalaxBtn = document.getElementById("shapalaxBtn");
  const shapalaxSound = document.getElementById("shapalaxSound");

  // Günlük istatistikleri getir
  fetch("/stats")
    .then(res => res.json())
    .then(data => {
      statsList.innerHTML = "";
      Object.keys(data).forEach(day => {
        const li = document.createElement("li");
        li.textContent = `${day} - ${data[day]} Shapalax`;
        statsList.appendChild(li);
      });
    });

  // Eğer buton varsa çalışsın
  if (shapalaxBtn) {
    shapalaxBtn.addEventListener("click", () => {
      shapalaxSound.play();
      fetch("/shapalax", { method: "POST" })
        .then(res => res.json())
        .then(data => {
          console.log("Shapalax sayısı:", data.count);
          location.reload();
        });
    });
  }
});

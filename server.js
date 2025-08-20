const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// stats.json dosyası
const statsFile = path.join(__dirname, "stats.json");

// Eğer yoksa boş oluştur
if (!fs.existsSync(statsFile)) {
  fs.writeFileSync(statsFile, JSON.stringify({}), "utf8");
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Ana sayfa (butonlu şapalax)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Login sayfası
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// İstatistik sayfası
app.get("/statistics", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "statistics.html"));
});

// API: Şapalax çalındığında güncelle
app.post("/api/shapalax", (req, res) => {
  let stats = JSON.parse(fs.readFileSync(statsFile, "utf8"));
  let today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  if (!stats[today]) stats[today] = 0;
  stats[today]++;

  fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2), "utf8");
  res.json({ success: true, today, count: stats[today] });
});

// API: İstatistikleri getir
app.get("/api/stats", (req, res) => {
  let stats = JSON.parse(fs.readFileSync(statsFile, "utf8"));
  res.json(stats);
});

// Server başlat
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const statsFile = path.join(__dirname, "data", "stats.json");

// Başlangıçta stats.json yoksa oluştur
if (!fs.existsSync(statsFile)) {
  fs.writeFileSync(statsFile, JSON.stringify({ total: 0 }));
}

// Günlük istatistikleri al
app.get("/api/stats", (req, res) => {
  const data = JSON.parse(fs.readFileSync(statsFile));
  res.json(data);
});

// Şapalax ekle (login kontrol frontend’de)
app.post("/api/add", (req, res) => {
  const { amount } = req.body;
  const data = JSON.parse(fs.readFileSync(statsFile));
  data.total += Number(amount || 1);
  fs.writeFileSync(statsFile, JSON.stringify(data));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

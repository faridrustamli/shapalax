const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Session ayarı
app.use(session({
  secret: "supersecretshapalax",
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Günlük istatistik
let dailyStats = {};

// Basınca istatistik ekleme
app.post("/shapalax", (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(403).json({ error: "Login gerekli!" });
  }
  const today = new Date().toISOString().split("T")[0];
  if (!dailyStats[today]) dailyStats[today] = 0;
  dailyStats[today]++;
  res.json({ success: true, count: dailyStats[today] });
});

// İstatistik endpoint
app.get("/stats", (req, res) => {
  res.json(dailyStats);
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    req.session.loggedIn = true;
    return res.redirect("/");
  }
  res.send("Yanlış giriş! <a href='/login.html'>Tekrar dene</a>");
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

// Ana sayfa yönlendirme
app.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    res.sendFile(path.join(__dirname, "public", "guest.html"));
  }
});

app.listen(PORT, () => console.log(`✅ Server ${PORT} portunda çalışıyor`));

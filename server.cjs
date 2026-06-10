const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const SWIGGY_HEADERS = {
  "Referer": "https://www.swiggy.com/",
  "Origin": "https://www.swiggy.com",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
};

app.get("/api/restaurants", async (req, res) => {
  const { lat = "12.9351929", lng = "77.6244807" } = req.query;
  try {
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
    const response = await fetch(url, { headers: SWIGGY_HEADERS });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

app.get("/api/menu", async (req, res) => {
  const { id, lat = "12.9351929", lng = "77.6244807" } = req.query;
  if (!id) return res.status(400).json({ error: "ID required" });
  try {
    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}`;
    const response = await fetch(url, { headers: SWIGGY_HEADERS });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

app.get("/proxy-image", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("URL required");
  try {
    const response = await fetch(url, {
      headers: { ...SWIGGY_HEADERS, Accept: "image/webp,image/*,*/*;q=0.8" },
    });
    const buffer = await response.buffer();
    res.set("Content-Type", response.headers.get("content-type") || "image/jpeg");
    res.set("Cache-Control", "public, max-age=86400");
    res.send(buffer);
  } catch (err) {
    res.status(500).send("Image failed");
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

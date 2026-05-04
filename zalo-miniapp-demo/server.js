const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ZALO_ME_ENDPOINT = process.env.ZALO_ME_ENDPOINT || "https://graph.zalo.me/v2.0/me";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "zalo-miniapp-demo" });
});

app.post("/api/zalo/me", async (req, res) => {
  try {
    const { accessToken } = req.body || {};
    if (!accessToken) {
      return res.status(400).json({
        ok: false,
        message: "Thieu accessToken."
      });
    }

    const endpoint = new URL(ZALO_ME_ENDPOINT);
    endpoint.searchParams.set("access_token", accessToken);
    endpoint.searchParams.set("fields", "id,name,picture");

    const zaloResp = await fetch(endpoint.toString(), {
      method: "GET",
      headers: { Accept: "application/json" }
    });

    const rawText = await zaloResp.text();
    let payload;
    try {
      payload = JSON.parse(rawText);
    } catch {
      payload = { raw: rawText };
    }

    if (!zaloResp.ok) {
      return res.status(zaloResp.status).json({
        ok: false,
        message: "Goi API Zalo that bai.",
        status: zaloResp.status,
        zalo: payload
      });
    }

    return res.json({
      ok: true,
      source: "zalo",
      profile: payload
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Loi server.",
      error: String(error?.message || error)
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

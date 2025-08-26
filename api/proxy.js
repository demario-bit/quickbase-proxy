export default async function handler(req, res) {
  const { path, body } = req.body;

  // 🔎 Debug log - will show in Vercel Runtime Logs
  if (process.env.QB_TOKEN) {
    const masked = process.env.QB_TOKEN.substring(0, 6) + "...[hidden]";
    console.log("QB_TOKEN loaded ✅:", masked);
  } else {
    console.log("QB_TOKEN missing ❌");
  }

  try {
    const response = await fetch(`https://api.quickbase.com/v1/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `QB-USER-TOKEN ${process.env.QB_TOKEN}`,
        "QB-Realm-Hostname": "kimberlywood.quickbase.com"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
}

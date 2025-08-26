export default async function handler(req, res) {
  const { path, body } = req.body;

  // 🔎 Debug log - will show in Vercel Runtime Logs
  console.log("QB_TOKEN (masked):", process.env.QB_TOKEN ? "Loaded ✅" : "Missing ❌");

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

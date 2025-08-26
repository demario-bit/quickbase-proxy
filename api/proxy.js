export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { path, body } = req.body;

    const qbRes = await fetch(`https://api.quickbase.com/v1/${path}`, {
      method: "POST",
      headers: {
        "QB-Realm-Hostname": "kimberlywood.quickbase.com",
        "Authorization": `QB-USER-TOKEN ${process.env.QB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await qbRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 


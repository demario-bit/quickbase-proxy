export default async function handler(req, res) {
  try {
    const { path, body } = req.body;

    const response = await fetch(`https://api.quickbase.com/v1/${path}`, {
      method: "POST",
      headers: {
        "Authorization": `QB-USER-TOKEN ${process.env.QB_TOKEN}`,
        "QB-Realm-Hostname": "kimberlywood.quickbase.com",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

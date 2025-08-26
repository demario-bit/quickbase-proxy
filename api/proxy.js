export default async function handler(req, res) {
  console.log("QB_TOKEN from env:", process.env.QB_TOKEN ? "Loaded" : "MISSING");

  const { path, body } = req.body;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `QB-USER-TOKEN ${process.env.QB_TOKEN}`,
    "QB-Realm-Hostname": "kimberlywood.quickbase.com"
  };

  console.log("=== Outgoing Headers ===", {
    "Content-Type": headers["Content-Type"],
    "Authorization": headers["Authorization"]?.substring(0, 20) + "...",
    "QB-Realm-Hostname": headers["QB-Realm-Hostname"]
  });


  // Debug: print headers (without leaking full token)
  console.log("=== Quickbase Request Headers ===");
  console.log({
    "Content-Type": headers["Content-Type"],
    "Authorization": headers["Authorization"]?.substring(0, 20) + "...",
    "QB-Realm-Hostname": headers["QB-Realm-Hostname"]
  });

  try {
    const response = await fetch(`https://api.quickbase.com/v1/${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // Return both data and debug info
    res.status(response.status).json({
      status: response.status,
      sentHeaders: headers,
      quickbaseResponse: data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { META_PIXEL_ID, META_ACCESS_TOKEN } = process.env;
  const endpoint = `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`;

  try {
    const fbRes = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const result = await fbRes.json();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

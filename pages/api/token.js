export default async function handler(req, res) {
  const code = req.query.code;
  const client_id = process.env.AMAZON_CLIENT_ID;
  const client_secret = process.env.AMAZON_CLIENT_SECRET;
  const redirect_uri = process.env.AMAZON_REDIRECT_URI;

  if (!code) {
    return res.status(400).json({ error: 'Code não fornecido' });
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("client_id", client_id);
  params.append("client_secret", client_secret);
  params.append("redirect_uri", redirect_uri);

  try {
    const response = await fetch("https://api.amazon.com/auth/o2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: params.toString(),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar token", details: err.message });
  }
}
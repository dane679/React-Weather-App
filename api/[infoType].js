export default async function handler(req, res) {
  const { infoType, ...searchParams } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const url = new URL(`https://api.openweathermap.org/data/2.5/${infoType}`);
    url.search = new URLSearchParams({ ...searchParams, appid: apiKey, units: "metric" });
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch weather data" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch weather \n ${err.message}` });
  }
}
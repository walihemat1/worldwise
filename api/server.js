export default function handler(req, res) {
  try {
    const filePath = join(process.cwd(), "data/cities.json");
    const data = JSON.parse(readFileSync(filePath, "utf8"));

    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET" && req.query.id) {
      const city = data.cities.find((c) => c.id === Number(req.query.id));
      return res.status(200).json(city || { error: "City not found" });
    }

    if (req.method === "GET") {
      return res.status(200).json(data.cities);
    }

    if (req.method === "POST") {
      const newCity = JSON.parse(req.body);
      data.cities.push(newCity);
      return res.status(201).json(newCity);
    }

    if (req.method === "DELETE" && req.query.id) {
      data.cities = data.cities.filter((c) => c.id !== Number(req.query.id));
      return res.status(204).end();
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to load data", details: error.message });
  }
}

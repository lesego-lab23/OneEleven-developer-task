export default function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { data } = req.body;

  // Validate input
  if (!data || typeof data !== "string") {
    return res.status(400).json({
      error: "'data' must be a string"
    });
  }

  // Convert string → array
  const charArray = data.split("");

  // Sort alphabetically
  const sortedArray = charArray.sort((a, b) =>
    a.localeCompare(b)
  );

  return res.status(200).json({
    word: sortedArray
  });
}
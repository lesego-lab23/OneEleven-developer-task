// api/sort.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = await req.json();
    const { data } = body;

    if (!data || typeof data !== 'string') {
      return res.status(400).json({ error: 'Field "data" must be a string.' });
    }

    const word = data.split('').sort();
    return res.status(200).json({ word });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
}
// api/sort-string.js
// Vercel serverless function for the junior developer task

export default function handler(req, res) {
  // Set CORS headers to allow cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Extract the data from the request body
    const { data } = req.body;

    // Validate that data field exists and is a string
    if (!data || typeof data !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid input. Expected JSON with "data" field containing a string.' 
      });
    }

    // Convert string to array of characters
    const charArray = data.split('');

    // Sort the array alphabetically
    const sortedArray = charArray.sort();

    // Return the sorted array as specified in the task
    return res.status(200).json({
      word: sortedArray
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
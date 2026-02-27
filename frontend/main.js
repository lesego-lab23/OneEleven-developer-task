async function validate() {
  const email = document.getElementById('email').value.trim();
  const url = document.getElementById('url').value.trim();
  const data = document.getElementById('data').value.trim();
  const btn = document.getElementById('btn');
  const resultEl = document.getElementById('result');

  if (!email || !url || !data) {
    resultEl.textContent = 'Please fill in all fields.';
    return;
  }

  btn.disabled = true;
  resultEl.textContent = 'Loading...';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });

    const body = await res.json();
    resultEl.textContent = JSON.stringify(body, null, 2);
  } catch (err) {
    resultEl.textContent = `Error: ${err.message}`;
  } finally {
    btn.disabled = false;
  }
}
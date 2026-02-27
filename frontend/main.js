async function validate() {
  const email = document.getElementById('email').value.trim();
  const url   = document.getElementById('url').value.trim();
  const data  = document.getElementById('data').value.trim();
  const btn   = document.getElementById('btn');
  const resultEl = document.getElementById('result');

  if (!email || !url || !data) {
    showResult('error', 'Missing fields', 'Please fill in all fields.');
    return;
  }

  btn.disabled = true;
  btn.classList.add('loading');
  resultEl.innerHTML = '';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });

    const body = await res.json();
    const ok = res.ok && body.word;

    showResult(ok ? 'success' : 'error', ok ? '✓ Validation Passed' : '✗ Validation Failed', JSON.stringify(body, null, 2));
  } catch (err) {
    showResult('error', 'Network Error', err.message);
  } finally {
    btn.disabled = false;
    btn.classList.remove('loading');
  }
}

function showResult(type, label, body) {
  document.getElementById('result').innerHTML = `
    <div class="result ${type}">
      <div class="result-label">${label}</div>
      <pre class="result-body">${body}</pre>
    </div>`;
}
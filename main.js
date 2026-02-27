async function validate() {
  const email = document.getElementById('email').value.trim();
  const url   = document.getElementById('url').value.trim();
  const btn   = document.getElementById('btn');
  const resultEl = document.getElementById('result');

  if (!email || !url) {
    showResult('error', 'Missing fields', 'Please fill in both email and API URL.');
    return;
  }

  btn.disabled = true;
  btn.classList.add('loading');
  resultEl.innerHTML = '';

  const validationURL = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=${encodeURIComponent(url)}&email=${encodeURIComponent(email)}`;

  try {
    const res  = await fetch(validationURL);
    const text = await res.text();
    let body;
    try { body = JSON.parse(text); } catch { body = text; }

    const pretty = typeof body === 'object'
      ? JSON.stringify(body, null, 2)
      : body;

    const ok = res.ok || (typeof body === 'object' && !body.error);
    showResult(ok ? 'success' : 'error', ok ? '✓ Validation passed' : '✗ Validation failed', pretty);
  } catch (err) {
    showResult('error', 'Network error', err.message);
  } finally {
    btn.disabled = false;
    btn.classList.remove('loading');
  }
}

function showResult(type, label, body) {
  document.getElementById('result').innerHTML = `
    <div class="result ${type}">
      <div class="result-label">${label}</div>
      <pre class="result-body">${escapeHtml(body)}</pre>
    </div>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') validate();
});
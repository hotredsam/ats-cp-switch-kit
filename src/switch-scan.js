// Switch Kit: step focus through interactive elements so a single switch can select them.
// Press the configured key once to move, hold it (or press a second key) to select.
export function startScanning(options = {}) {
  const key = options.key ?? " ";
  const interval = options.intervalMs ?? 1500;
  const items = () => [...document.querySelectorAll("button, a[href], input, select, textarea")].filter((el) => !el.disabled);
  let index = -1;
  let timer = null;
  function highlight(i) {
    const list = items();
    if (!list.length) return;
    index = (i + list.length) % list.length;
    list[index].focus();
  }
  function step() { highlight(index + 1); }
  function select() { const el = items()[index]; if (el) el.click(); }
  document.addEventListener("keydown", (e) => { if (e.key === key) { e.preventDefault(); select(); } });
  timer = setInterval(step, interval);
  step();
  return { stop() { clearInterval(timer); } };
}

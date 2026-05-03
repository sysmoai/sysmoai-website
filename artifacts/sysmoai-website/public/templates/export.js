(function () {
  const btn = document.createElement('button');
  btn.className = 'export-toggle';
  btn.type = 'button';
  btn.textContent = 'Export size 1080×1920';
  btn.title =
    'Toggle 1:1 export sizing. With this on, right-click the frame in ' +
    'DevTools → Capture node screenshot for a pixel-perfect 1080×1920 PNG.';
  btn.addEventListener('click', function () {
    document.body.classList.toggle('export');
  });
  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(btn);
  });
})();

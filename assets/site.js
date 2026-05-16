// nafiz95.github.io — shared vanilla JS
// count-up animation, pub/project filtering, abstract toggle

// ============================================================
// COUNT-UP ANIMATION
// ============================================================
function initCountUp() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-countup]').forEach(function(el) {
    var target = parseInt(el.dataset.countup, 10);
    if (prefersReduced) { el.textContent = target; return; }
    var duration = 800;
    var start = performance.now();
    function tick(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  });
}

// ============================================================
// PUBLICATION TAG FILTERING
// ============================================================
function initPubFilter() {
  var bar = document.getElementById('pub-filter-bar');
  if (!bar) return;

  var chips    = bar.querySelectorAll('[data-filter]');
  var cards    = document.querySelectorAll('[data-pub-tags]');
  var countEl  = document.getElementById('pub-showing-count');
  var groups   = document.querySelectorAll('.year-group');

  function setFilter(f) {
    // update chip active state
    chips.forEach(function(c) {
      c.classList.toggle('active', c.dataset.filter === f);
    });

    // show/hide individual pub cards
    var visible = 0;
    cards.forEach(function(card) {
      var tags = card.dataset.pubTags.split(',');
      var show = f === 'all' || tags.indexOf(f) !== -1;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (countEl) countEl.textContent = visible;

    // hide year-group headings when all papers in the group are hidden
    groups.forEach(function(g) {
      var anyVisible = Array.from(g.querySelectorAll('[data-pub-tags]'))
        .some(function(c) { return c.style.display !== 'none'; });
      g.style.display = anyVisible ? '' : 'none';
    });
  }

  chips.forEach(function(chip) {
    chip.addEventListener('click', function() { setFilter(chip.dataset.filter); });
  });
}

// ============================================================
// PROJECT AREA FILTERING
// ============================================================
function initProjectFilter() {
  var bar = document.getElementById('proj-filter-bar');
  if (!bar) return;

  var chips   = bar.querySelectorAll('[data-area-filter]');
  var cards   = document.querySelectorAll('[data-project-area]');
  var countEl = document.getElementById('proj-count');

  function setFilter(f) {
    chips.forEach(function(c) {
      c.classList.toggle('active', c.dataset.areaFilter === f);
    });

    var visible = 0;
    cards.forEach(function(card) {
      var show = f === 'all' || card.dataset.projectArea === f;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (countEl) countEl.textContent = visible;
  }

  chips.forEach(function(chip) {
    chip.addEventListener('click', function() { setFilter(chip.dataset.areaFilter); });
  });
}

// ============================================================
// ABSTRACT EXPAND / COLLAPSE
// ============================================================
function initAbstractToggles() {
  document.querySelectorAll('.pub-abstract-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var body  = btn.closest('.pub-body');
      var panel = body && body.querySelector('.pub-abstract-panel');
      if (!panel) return;
      var open = panel.classList.toggle('open');
      btn.textContent = open ? '▾ hide abstract' : '▸ show abstract';
    });
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  initCountUp();
  initPubFilter();
  initProjectFilter();
  initAbstractToggles();
});

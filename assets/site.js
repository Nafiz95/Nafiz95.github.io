// Shared interactions for the static portfolio.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu');
  const menu = document.querySelector('.navlinks');

  if (menuButton && menu) {
    const closeMenu = () => {
      menu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    };

    menuButton.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });

    menu.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  const setupFilter = (barId, buttonAttribute, cardAttribute, countId) => {
    const bar = document.getElementById(barId);
    if (!bar) return;

    const buttons = [...bar.querySelectorAll('button[' + buttonAttribute + ']')];
    const cards = [...document.querySelectorAll('[' + cardAttribute + ']')];
    const count = document.getElementById(countId);
    const groups = [...document.querySelectorAll('[data-filter-group]')];

    const apply = value => {
      let visible = 0;
      cards.forEach(card => {
        const terms = (card.getAttribute(cardAttribute) || '').split(',').map(term => term.trim());
        const show = value === 'all' || terms.includes(value);
        card.hidden = !show;
        if (show) visible += 1;
      });

      buttons.forEach(button => {
        button.setAttribute('aria-pressed', String(button.getAttribute(buttonAttribute) === value));
      });

      groups.forEach(group => {
        group.hidden = ![...group.querySelectorAll('[' + cardAttribute + ']')].some(card => !card.hidden);
      });

      if (count) count.textContent = String(visible);
    };

    buttons.forEach(button => {
      button.addEventListener('click', () => apply(button.getAttribute(buttonAttribute)));
    });

    const selected = buttons.find(button => button.getAttribute('aria-pressed') === 'true');
    apply(selected ? selected.getAttribute(buttonAttribute) : 'all');
  };

  const publicationFilters = document.getElementById('pub-filter-bar');
  if (publicationFilters) {
    const yearSelect = document.getElementById('pub-year-filter');
    const topicSelect = document.getElementById('pub-topic-filter');
    const count = document.getElementById('pub-showing-count');
    const empty = document.getElementById('pub-empty');
    const groups = [...document.querySelectorAll('#publications [data-filter-group]')];
    const papers = [...document.querySelectorAll('#publications .pub-entry')];

    const applyPublicationFilters = () => {
      let visible = 0;
      papers.forEach(paper => {
        const topics = (paper.dataset.pubTags || '').split(',');
        const matchYear = yearSelect.value === 'all' || paper.dataset.pubYear === yearSelect.value;
        const matchTopic = topicSelect.value === 'all' || topics.includes(topicSelect.value);
        paper.hidden = !(matchYear && matchTopic);
        if (!paper.hidden) visible += 1;
      });
      groups.forEach(group => {
        group.hidden = ![...group.querySelectorAll('.pub-entry')].some(paper => !paper.hidden);
      });
      count.textContent = String(visible);
      empty.hidden = visible !== 0;
    };

    yearSelect.addEventListener('change', applyPublicationFilters);
    topicSelect.addEventListener('change', applyPublicationFilters);
    applyPublicationFilters();
  }
  setupFilter('proj-filter-bar', 'data-area-filter', 'data-project-area', 'proj-count');

  const openLinkedSummary = () => {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const details = target?.closest('details');
    if (details) {
      details.open = true;
      requestAnimationFrame(() => target.scrollIntoView());
    }
  };
  openLinkedSummary();
  window.addEventListener('hashchange', openLinkedSummary);
});

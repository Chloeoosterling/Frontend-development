// Elementen
const html = document.documentElement;
const menu = document.getElementById('site-menu');
const scrim = document.getElementById('scrim');
const openBtn = document.querySelector('button[aria-controls="site-menu"]');
const closeBtn = document.querySelector('#site-menu > div > button[aria-label="Sluit menu"]');

function openMenu() {
  if (!menu) return;
  // 1) zichtbaar maken (nog dicht)
  menu.hidden = false;
  scrim.hidden = false;

  // 2) wacht 1 frame zodat de browser de beginstaat (translateX(-100%)) kan “leggen”
  requestAnimationFrame(() => {
    menu.setAttribute('data-open', 'true');      // -> CSS: translateX(0)
    openBtn?.setAttribute('aria-expanded', 'true');
    html.setAttribute('data-menu-open', 'true');
    menu.querySelector('a')?.focus();
  });
}

function closeMenu() {
  if (!menu) return;
  console.log('klikt');
  menu.removeAttribute('data-open');             // start de slide-out
  openBtn?.setAttribute('aria-expanded', 'false');
  html.removeAttribute('data-menu-open');

  // Verberg pas ná de transition
  const after = () => {
    menu.hidden = true;
    scrim.hidden = true;
    menu.removeEventListener('transitionend', after);
  };
  menu.addEventListener('transitionend', after, { once: true });

  openBtn?.focus();
}

// Events (veilig met optional chaining)
openBtn?.addEventListener('click', openMenu);
closeBtn?.addEventListener('click', closeMenu);
scrim?.addEventListener('click', closeMenu);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu?.getAttribute('data-open') === 'true') closeMenu();
});


// Alleen één accordion open in sectie 16
const sect16 = document.querySelector('main > section:nth-of-type(16)');
if (sect16) {
  sect16.addEventListener('toggle', (e) => {
    if (e.target.tagName !== 'DETAILS' || !e.target.open) return;
    sect16.querySelectorAll('details[open]').forEach(d => {
      if (d !== e.target) d.open = false;
    });
  });
}

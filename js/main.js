// ============================================
// AGENCYLEAD — main.js
// ============================================

// --- Menú hamburguesa ---
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });
  // Cerrar al hacer click en un link
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });
}

// --- Navbar compacta al hacer scroll ---
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.padding = '10px 0';
    } else {
      navbar.style.padding = '18px 0';
    }
  });
}

// --- Formulario de contacto ---
const contactForm = document.getElementById('contactForm');
const successMsg  = document.getElementById('successMsg');

if (contactForm && successMsg) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = contactForm.querySelector('input[type="text"]').value.trim();
    const tel    = contactForm.querySelector('input[type="tel"]').value.trim();
    const negocio = contactForm.querySelectorAll('input[type="text"]')[1]?.value.trim() || '';

    if (!nombre || !tel) return;

    // Armar mensaje para WhatsApp
    const msg = encodeURIComponent(
      `Hola! Me llamo ${nombre}.\n` +
      `Mi negocio es: ${negocio}\n` +
      `Quiero saber cómo conseguir más clientes.`
    );

    // Mostrar mensaje de éxito
    contactForm.style.display = 'none';
    successMsg.style.display  = 'block';

    // Abrir WhatsApp luego de 1 segundo
    setTimeout(() => {
      window.open(`https://wa.me/595976261267?text=${msg}`, '_blank');
    }, 1000);
  });
}

// --- Animación suave al hacer scroll (fade-in) ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});

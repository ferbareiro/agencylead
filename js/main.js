// ============================================
// AGENCYLEAD — main.js
// ============================================

// --- EmailJS config ---
const EMAILJS_SERVICE_ID  = 'service_rs3sgpo';
const EMAILJS_TEMPLATE_ID = 'template_55cc55s';
const EMAILJS_PUBLIC_KEY  = '-QkLUyFo_yuDCYU2V';
// --- Menú hamburguesa ---
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });
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
    navbar.style.padding = window.scrollY > 60 ? '10px 0' : '18px 0';
  });
}

// --- Formulario de contacto ---
const contactForm = document.getElementById('contactForm');
const successMsg  = document.getElementById('successMsg');
const submitBtn   = contactForm?.querySelector('button[type="submit"]');

if (contactForm && successMsg) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Recoger todos los campos
    const fields   = contactForm.querySelectorAll('input, select, textarea');
    const nombre   = fields[0]?.value.trim();
    const telefono = fields[1]?.value.trim();
    const email    = fields[2]?.value.trim();
    const negocio  = fields[3]?.value.trim();
    const servicio = fields[4]?.value;
    const presupuesto = fields[5]?.value;
    const mensaje  = fields[6]?.value.trim();

    if (!nombre || !telefono || !negocio) {
      alert('Por favor completá los campos obligatorios: nombre, WhatsApp y negocio.');
      return;
    }

    // Estado de carga
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    const templateParams = {
      nombre,
      telefono,
      email:      email      || '(no ingresado)',
      negocio,
      servicio:   servicio   || '(no seleccionado)',
      presupuesto: presupuesto || '(no seleccionado)',
      mensaje:    mensaje    || '(sin mensaje)',
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);

      // Éxito — mostrar mensaje de confirmación
      contactForm.style.display = 'none';
      successMsg.style.display  = 'block';

    } catch (err) {
      console.error('EmailJS error:', err);
      alert('Hubo un error al enviar. Por favor escribinos directo por WhatsApp.');
      submitBtn.textContent = 'Enviar y recibir diagnóstico →';
      submitBtn.disabled = false;
    }
  });
}

// --- Animación fade-in en cards ---
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
  card.style.opacity    = '0';
  card.style.transform  = 'translateY(24px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});

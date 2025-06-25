/* =========================================================
   AMRBH25 LLC — Front-end interactions
   Last update: 2025-06-25
   ========================================================= */

/* ---------- Ultra-Advanced Mobile Navigation Toggle ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu   = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    /* Fecha menu ao clicar em qualquer link */
    document.querySelectorAll('.nav-link').forEach(link =>
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      })
    );
  }
});

/* ---------- Ultra-Premium Scroll Effects ---------- */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 100);
});

/* ---------- Ultra-Sophisticated Smooth Scrolling ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- Active Navigation Highlighting ---------- */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 200)
      current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* ---------- Floating Call-to-Action ---------- */
function createFloatingCTA() {
  const cta = document.createElement('div');
  cta.className = 'floating-cta';
  cta.innerHTML = `
    <div class="floating-cta-content">
      <span class="floating-cta-text">Ready to Start?</span>
      <span class="floating-cta-subtext">Contact our team</span>
    </div>
    <i class="fas fa-arrow-right floating-cta-icon"></i>
  `;
  cta.addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  });
  document.body.appendChild(cta);

  window.addEventListener('scroll', () => {
    cta.classList.toggle('visible', window.scrollY > 500);
  });
}

/* ---------- Contact Form (Formspree integration) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const contactForm   = document.getElementById('contactForm');
  const FORMSPREE_URL = 'https://formspree.io/f/mdkzpawq';

  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    /* ----- Gather & validate data ----- */
    const formData = {
      name:         contactForm.querySelector('[name="name"]').value.trim(),
      email:        contactForm.querySelector('[name="email"]').value.trim(),
      phone:        contactForm.querySelector('[name="phone"]').value.trim(),
      organization: contactForm.querySelector('[name="organization"]').value.trim(),
      inquiry:      contactForm.querySelector('[name="inquiry"]').value,
      message:      contactForm.querySelector('[name="message"]').value.trim()
    };

    const errors = validateForm(formData);
    if (errors.length) {
      showNotification(errors.join('<br>'), 'error');
      return;
    }

    /* ----- UI: loading state ----- */
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    /* ----- Send to Formspree ----- */
    try {
      const response = await fetch(FORMSPREE_URL, {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept'      : 'application/json'
        },
        body   : JSON.stringify(formData)
      });

      if (response.ok) {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        showNotification(data.error || 'An error occurred. Please try again later.', 'error');
      }
    } catch (err) {
      console.error(err);
      showNotification('Network error. Please try again later.', 'error');
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
});

/* ---------- Notification System ---------- */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${
        type === 'success' ? 'fa-check-circle'
      : type === 'error'   ? 'fa-exclamation-circle'
      :                      'fa-info-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close"><i class="fas fa-times"></i></button>
  `;
  document.body.appendChild(notification);

  /* Show */
  setTimeout(() => notification.classList.add('show'), 20);

  /* Auto-hide */
  const autoHide = setTimeout(() => hideNotification(notification), 5000);

  /* Manual close */
  notification.querySelector('.notification-close').addEventListener('click', () => {
    clearTimeout(autoHide);
    hideNotification(notification);
  });
}
function hideNotification(el) {
  el.classList.remove('show');
  setTimeout(() => el.remove(), 300);
}

/* ---------- Basic Form Validation ---------- */
function validateForm(f) {
  const errors = [];
  if (!f.name)        errors.push('Name is required.');
  if (!f.email)       errors.push('Email is required.');
  if (!f.inquiry)     errors.push('Inquiry type is required.');
  if (!f.message)     errors.push('Message is required.');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (f.email && !emailRegex.test(f.email)) errors.push('Invalid email address.');

  const phoneRegex = /^[\+]?[1-9]\d{0,15}$/;
  if (f.phone && !phoneRegex.test(f.phone.replace(/[\s\-().]/g, '')))
    errors.push('Invalid phone number.');

  return errors;
}

/* ---------- Initialise extras ---------- */
document.addEventListener('DOMContentLoaded', () => {
  createFloatingCTA();

  /* Scroll-reveal animation */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-in');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('section, .service-card, .partnership-category')
          .forEach(el => observer.observe(el));
});

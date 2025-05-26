/**
 * Sets up the contact form functionality
 */
export function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletter-form');
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const name = contactForm.querySelector('#name').value;
      const email = contactForm.querySelector('#email').value;
      const subject = contactForm.querySelector('#subject').value;
      const message = contactForm.querySelector('#message').value;
      
      // In a real application, you would send this data to a server
      console.log('Contact form submitted:', { name, email, subject, message });
      
      // Show success message
      const formContainer = contactForm.parentElement;
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <div class="success-icon"><i class="fas fa-check-circle"></i></div>
        <h3>Thank you for your message!</h3>
        <p>We've received your inquiry and will respond shortly.</p>
      `;
      
      // Add success styles
      successMessage.style.backgroundColor = 'var(--success-color)';
      successMessage.style.color = 'white';
      successMessage.style.padding = 'var(--spacing-lg)';
      successMessage.style.borderRadius = 'var(--border-radius-lg)';
      successMessage.style.textAlign = 'center';
      successMessage.style.animation = 'fadeIn 0.5s ease';
      
      // Replace form with success message
      formContainer.innerHTML = '';
      formContainer.appendChild(successMessage);
    });
  }
  
  // Newsletter form submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get email
      const email = newsletterForm.querySelector('input[type="email"]').value;
      
      // In a real application, you would send this to a server
      console.log('Newsletter signup:', email);
      
      // Show success message
      const btn = newsletterForm.querySelector('button');
      const originalText = btn.textContent;
      
      btn.textContent = 'Subscribed!';
      btn.style.backgroundColor = 'var(--success-color)';
      
      // Reset form
      newsletterForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
      }, 3000);
    });
  }
}
/**
 * Sets up animations for various elements on the page
 */
export function setupAnimations() {
  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-level');
  
  // Check if we're on a page with skill bars
  if (skillBars.length > 0) {
    // Reset skill bar widths initially
    skillBars.forEach(bar => {
      bar.style.width = '0%';
    });

    // Function to animate skill bars when they're in view
    const animateSkillBars = () => {
      const skillsSection = document.querySelector('.skills-section');
      
      if (!skillsSection) return;
      
      const sectionPosition = skillsSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (sectionPosition < screenPosition) {
        skillBars.forEach(bar => {
          const targetWidth = bar.parentElement.previousElementSibling.lastElementChild.textContent;
          bar.style.width = targetWidth;
        });
        
        // Remove the scroll event listener once animated
        window.removeEventListener('scroll', animateSkillBars);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', animateSkillBars);
    // Trigger once on load in case section is already in view
    animateSkillBars();
  }

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .certification-card, .gallery-item, .contact-form, .contact-info');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        if (!element.classList.contains('animated')) {
          element.classList.add('animated');
          element.style.animation = 'fadeIn 0.8s ease forwards';
        }
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  // Trigger once on load
  animateOnScroll();
}
/**
 * Sets up the main navigation functionality including mobile menu toggle
 * and smooth scrolling for anchor links
 */
export function setupNavigation() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const lessonsLink = document.getElementById('lessons-link');
  const footerLessonsLink = document.getElementById('footer-lessons-link');
  const languageModal = document.getElementById('language-modal');

  // Mobile menu toggle
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Toggle hamburger to X
      const bars = mobileMenuToggle.querySelectorAll('.bar');
      bars[0].style.transform = navLinks.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' 
        : 'none';
      bars[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
      bars[2].style.transform = navLinks.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -7px)' 
        : 'none';
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') !== '#') {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Close mobile menu if it's open
          if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const bars = mobileMenuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
          }
          
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for header
            behavior: 'smooth'
          });
        }
      });
    }
  });

  // Setup Lessons link to open language modal
  if (lessonsLink) {
    lessonsLink.addEventListener('click', (e) => {
      e.preventDefault();
      languageModal.style.display = 'flex';
    });
  }

  // Footer lessons link
  if (footerLessonsLink) {
    footerLessonsLink.addEventListener('click', (e) => {
      e.preventDefault();
      languageModal.style.display = 'flex';
    });
  }
  
  // Get started button
  const getStartedBtn = document.getElementById('get-started-btn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      languageModal.style.display = 'flex';
    });
  }
}
/**
 * Sets up the language selection modal functionality
 */
export function setupLanguageModal() {
  const modal = document.getElementById('language-modal');
  const closeBtn = modal.querySelector('.close-modal');
  const languageOptions = modal.querySelectorAll('.language-option');

  // Close modal when clicking the X
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Close modal when clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Handle language selection
  languageOptions.forEach(option => {
    option.addEventListener('click', () => {
      const language = option.dataset.language;
      
      // Save selected language to localStorage
      localStorage.setItem('selectedLanguage', language);
      
      // Redirect to the appropriate grades page
      window.location.href = `grades.html?lang=${language}`;
    });
  });
}
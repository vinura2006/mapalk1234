import '../style.css';
import { setupNavigation } from './navigation.js';
import { setupLanguageModal } from './languageModal.js';
import { setupTestimonials } from './testimonials.js';
import { setupContactForm } from './contact.js';
import { setupAnimations } from './animations.js';

// Initialize modules
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupLanguageModal();
  setupTestimonials();
  setupContactForm();
  setupAnimations();
});
/**
 * Sets up the testimonials slider functionality
 */
export function setupTestimonials() {
  const testimonialsContainer = document.getElementById('testimonials-container');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  
  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      text: "My English skills have improved dramatically since I started learning with this program. The teacher makes complex grammar concepts easy to understand!",
      name: "Priya Kumar",
      title: "Grade 9 Student",
      rating: 5,
      image: "https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      text: "The Tamil lessons are structured perfectly for beginners like me. I've gone from knowing nothing to being able to read and write basic Tamil in just a few months.",
      name: "Raj Patel",
      title: "Grade 7 Student",
      rating: 4,
      image: "https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      text: "The interactive exercises and games made learning both English and Tamil fun for my child. She looks forward to her lessons each week!",
      name: "Maya Singh",
      title: "Parent",
      rating: 5,
      image: "https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];
  
  let currentTestimonialIndex = 0;
  
  // Function to render testimonials
  function renderTestimonials() {
    if (!testimonialsContainer) return;
    
    testimonialsContainer.innerHTML = '';
    
    testimonials.forEach((testimonial, index) => {
      const testimonialSlide = document.createElement('div');
      testimonialSlide.classList.add('testimonial-slide');
      
      if (index === currentTestimonialIndex) {
        testimonialSlide.classList.add('active');
      }
      
      // Create stars based on rating
      const stars = Array(5).fill('').map((_, i) => {
        return i < testimonial.rating ? '★' : '☆';
      }).join('');
      
      testimonialSlide.innerHTML = `
        <div class="testimonial-card">
          <p class="testimonial-text">${testimonial.text}</p>
          <div class="testimonial-author">
            <img src="${testimonial.image}" alt="${testimonial.name}">
            <div class="testimonial-author-name">${testimonial.name}</div>
            <div class="testimonial-author-title">${testimonial.title}</div>
            <div class="testimonial-rating">${stars}</div>
          </div>
        </div>
      `;
      
      testimonialsContainer.appendChild(testimonialSlide);
    });
  }
  
  // Initialize testimonials
  renderTestimonials();
  
  // Add event listeners for prev/next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonials();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      renderTestimonials();
    });
  }
  
  // Auto-rotate testimonials
  setInterval(() => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    renderTestimonials();
  }, 6000);
}
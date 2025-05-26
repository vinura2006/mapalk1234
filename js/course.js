import { setupNavigation } from './navigation.js';
import { setupLanguageModal } from './languageModal.js';
import { setupContactForm } from './contact.js';
import { courseData } from './courseData.js';

let currentLanguage;
let currentGrade;
let currentLessonIndex = null;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupLanguageModal();
  setupContactForm();
  
  // Get language and grade from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  currentLanguage = urlParams.get('lang') || localStorage.getItem('selectedLanguage') || 'english';
  currentGrade = parseInt(urlParams.get('grade')) || 1;
  
  // Save the selected language to localStorage
  localStorage.setItem('selectedLanguage', currentLanguage);
  
  // Setup course header
  setupCourseHeader();
  
  // Render lesson list
  renderLessonList();
  
  // Setup related materials
  setupRelatedMaterials();
  
  // Setup lesson navigation
  setupLessonNavigation();
  
  // Initialize progress from localStorage
  initializeProgress();
  
  // Setup track progress button
  document.getElementById('track-progress-btn').addEventListener('click', toggleProgressTracking);
});

/**
 * Sets up the course header based on selected language and grade
 */
function setupCourseHeader() {
  const courseHeader = document.getElementById('course-header');
  
  if (!courseHeader) return;
  
  // Find course data for current language and grade
  const allGradeData = courseData[currentLanguage] || [];
  const gradeData = allGradeData.find(g => g.grade === currentGrade);
  
  if (!gradeData) return;
  
  // Add language-specific class
  courseHeader.classList.add(currentLanguage);
  
  // Set header content
  courseHeader.innerHTML = `
    <div class="container">
      <h2>${gradeData.title}</h2>
      <p>${gradeData.description}</p>
      
      <div class="course-stats">
        <div class="course-stat">
          <div class="stat-value">${gradeData.lessons}</div>
          <div class="stat-label">Lessons</div>
        </div>
        <div class="course-stat">
          <div class="stat-value">${gradeData.topics.length}</div>
          <div class="stat-label">Topics</div>
        </div>
        <div class="course-stat">
          <div class="stat-value">24</div>
          <div class="stat-label">Hours</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders the lesson list in the sidebar
 */
function renderLessonList() {
  const lessonList = document.getElementById('lesson-list');
  
  if (!lessonList) return;
  
  // Get lessons for current grade and language
  const lessons = courseData[currentLanguage]?.find(g => g.grade === currentGrade)?.lessonDetails || [];
  
  lessonList.innerHTML = '';
  
  lessons.forEach((lesson, index) => {
    const lessonItem = document.createElement('li');
    lessonItem.className = 'lesson-list-item';
    
    // Get lesson status from localStorage
    const progressKey = `${currentLanguage}_grade${currentGrade}_lesson${index + 1}`;
    const lessonStatus = localStorage.getItem(progressKey) || 'not-started';
    
    let statusIcon = '';
    if (lessonStatus === 'completed') {
      statusIcon = '<i class="fas fa-check-circle lesson-status completed"></i>';
    } else if (lessonStatus === 'in-progress') {
      statusIcon = '<i class="fas fa-spinner lesson-status in-progress"></i>';
    } else {
      statusIcon = '<i class="far fa-circle lesson-status"></i>';
    }
    
    lessonItem.innerHTML = `
      <a href="#" data-lesson-index="${index}" class="lesson-link">
        ${statusIcon} Lesson ${index + 1}: ${lesson.title}
      </a>
    `;
    
    lessonList.appendChild(lessonItem);
  });
  
  // Add event listeners to lesson links
  document.querySelectorAll('.lesson-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Load lesson content
      const lessonIndex = parseInt(link.dataset.lessonIndex);
      currentLessonIndex = lessonIndex;
      loadLessonContent(lessonIndex);
      
      // Update lesson status to in-progress
      const progressKey = `${currentLanguage}_grade${currentGrade}_lesson${lessonIndex + 1}`;
      if (localStorage.getItem(progressKey) !== 'completed') {
        localStorage.setItem(progressKey, 'in-progress');
      }
      
      // Update progress circle
      updateProgressCircle();
      
      // Enable/disable navigation buttons
      updateNavigationButtons();
    });
  });
}

/**
 * Loads the content for a specific lesson
 * @param {number} lessonIndex - The index of the lesson to load
 */
function loadLessonContent(lessonIndex) {
  const lessonContent = document.getElementById('lesson-content');
  
  if (!lessonContent) return;
  
  // Get lesson data
  const lessons = courseData[currentLanguage]?.find(g => g.grade === currentGrade)?.lessonDetails || [];
  const lesson = lessons[lessonIndex];
  
  if (!lesson) return;
  
  // Create lesson content
  let content = `
    <h2 class="lesson-title">Lesson ${lessonIndex + 1}: ${lesson.title}</h2>
    
    <div class="lesson-section">
      <h3><i class="fas fa-book-open"></i> Introduction</h3>
      <p>${lesson.introduction}</p>
    </div>
  `;
  
  // Add video content if available
  if (lesson.videoUrl) {
    content += `
      <div class="lesson-section">
        <h3><i class="fas fa-video"></i> Video Lesson</h3>
        <div class="video-container">
          <iframe width="560" height="315" src="${lesson.videoUrl}" 
            title="${lesson.title}" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>
        </div>
      </div>
    `;
  }
  
  // Add PDF materials if available
  if (lesson.pdfMaterials && lesson.pdfMaterials.length > 0) {
    content += `
      <div class="lesson-section">
        <h3><i class="fas fa-file-pdf"></i> Downloadable Materials</h3>
    `;
    
    lesson.pdfMaterials.forEach(pdf => {
      content += `
        <div class="pdf-download">
          <div class="pdf-icon">
            <i class="fas fa-file-pdf"></i>
          </div>
          <div class="pdf-info">
            <h4>${pdf.title}</h4>
            <p>${pdf.description}</p>
          </div>
          <a href="#" class="download-btn">
            <i class="fas fa-download"></i> Download
          </a>
        </div>
      `;
    });
    
    content += `</div>`;
  }
  
  // Add interactive exercise if available
  if (lesson.exercise) {
    content += `
      <div class="lesson-section">
        <h3><i class="fas fa-tasks"></i> Interactive Exercise</h3>
        <div class="interactive-exercise" data-exercise-id="${lessonIndex + 1}">
          <h4 class="exercise-title">
            <i class="fas fa-pencil-alt"></i> ${lesson.exercise.title}
          </h4>
          <p class="exercise-question">${lesson.exercise.question}</p>
          <div class="exercise-options">
    `;
    
    lesson.exercise.options.forEach((option, optIndex) => {
      content += `
        <div class="exercise-option" data-option="${optIndex}">
          <input type="radio" id="option${optIndex}" name="exercise${lessonIndex}" value="${optIndex}">
          <label for="option${optIndex}">${option}</label>
        </div>
      `;
    });
    
    content += `
          </div>
          <button class="submit-exercise" data-correct="${lesson.exercise.correctOption}">Submit Answer</button>
          <div class="exercise-feedback"></div>
        </div>
      </div>
    `;
  }
  
  // Add mark as complete button
  content += `
    <div class="lesson-section">
      <button class="btn btn-primary mark-complete-btn" data-lesson="${lessonIndex + 1}">
        <i class="fas fa-check-circle"></i> Mark as Complete
      </button>
    </div>
  `;
  
  // Set content
  lessonContent.innerHTML = content;
  
  // Add event listeners to exercise
  setupExerciseListeners();
  
  // Add event listener to mark complete button
  setupMarkCompleteButton(lessonIndex);
}

/**
 * Sets up event listeners for the interactive exercises
 */
function setupExerciseListeners() {
  const submitButtons = document.querySelectorAll('.submit-exercise');
  
  submitButtons.forEach(button => {
    button.addEventListener('click', () => {
      const exerciseContainer = button.closest('.interactive-exercise');
      const correctOption = parseInt(button.dataset.correct);
      const selectedOption = exerciseContainer.querySelector('input:checked');
      const feedbackElement = exerciseContainer.querySelector('.exercise-feedback');
      
      if (!selectedOption) {
        feedbackElement.textContent = 'Please select an answer';
        feedbackElement.className = 'exercise-feedback error';
        return;
      }
      
      const selectedValue = parseInt(selectedOption.value);
      
      // Reset all options
      exerciseContainer.querySelectorAll('.exercise-option').forEach(option => {
        option.classList.remove('correct', 'incorrect');
      });
      
      // Mark correct and incorrect options
      const selectedOptionEl = exerciseContainer.querySelector(`[data-option="${selectedValue}"]`);
      const correctOptionEl = exerciseContainer.querySelector(`[data-option="${correctOption}"]`);
      
      correctOptionEl.classList.add('correct');
      
      if (selectedValue === correctOption) {
        feedbackElement.textContent = 'Correct! Well done!';
        feedbackElement.className = 'exercise-feedback success';
      } else {
        selectedOptionEl.classList.add('incorrect');
        feedbackElement.textContent = 'Incorrect. Try again!';
        feedbackElement.className = 'exercise-feedback error';
      }
    });
  });
}

/**
 * Sets up the Mark as Complete button functionality
 * @param {number} lessonIndex - The index of the current lesson
 */
function setupMarkCompleteButton(lessonIndex) {
  const markCompleteBtn = document.querySelector('.mark-complete-btn');
  
  if (markCompleteBtn) {
    const progressKey = `${currentLanguage}_grade${currentGrade}_lesson${lessonIndex + 1}`;
    const lessonStatus = localStorage.getItem(progressKey);
    
    // Update button text if lesson is already completed
    if (lessonStatus === 'completed') {
      markCompleteBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
      markCompleteBtn.classList.add('btn-success');
    }
    
    markCompleteBtn.addEventListener('click', () => {
      // Mark lesson as completed
      localStorage.setItem(progressKey, 'completed');
      
      // Update button
      markCompleteBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
      markCompleteBtn.classList.add('btn-success');
      
      // Update sidebar
      updateLessonStatus(lessonIndex);
      
      // Update progress circle
      updateProgressCircle();
    });
  }
}

/**
 * Updates the status icon for a lesson in the sidebar
 * @param {number} lessonIndex - The index of the lesson to update
 */
function updateLessonStatus(lessonIndex) {
  const lessonLink = document.querySelector(`.lesson-link[data-lesson-index="${lessonIndex}"]`);
  
  if (lessonLink) {
    const statusIcon = lessonLink.querySelector('.lesson-status');
    statusIcon.className = 'fas fa-check-circle lesson-status completed';
  }
}

/**
 * Updates the progress circle based on completed lessons
 */
function updateProgressCircle() {
  const progressCircle = document.querySelector('.progress-circle');
  
  if (!progressCircle) {
    // Create progress circle if it doesn't exist
    createProgressCircle();
    return;
  }
  
  // Get total lessons and completed lessons
  const totalLessons = courseData[currentLanguage]?.find(g => g.grade === currentGrade)?.lessonDetails?.length || 0;
  let completedLessons = 0;
  
  for (let i = 0; i < totalLessons; i++) {
    const progressKey = `${currentLanguage}_grade${currentGrade}_lesson${i + 1}`;
    if (localStorage.getItem(progressKey) === 'completed') {
      completedLessons++;
    }
  }
  
  // Calculate percentage
  const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  
  // Update circle fill
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const fillPercentage = (percentage / 100) * circumference;
  const dashOffset = circumference - fillPercentage;
  
  const progressFill = progressCircle.querySelector('.progress-fill');
  const progressText = progressCircle.querySelector('.progress-text');
  
  progressFill.style.strokeDasharray = `${circumference} ${circumference}`;
  progressFill.style.strokeDashoffset = dashOffset;
  progressText.textContent = `${percentage}%`;
}

/**
 * Creates the progress circle in the sidebar
 */
function createProgressCircle() {
  const progressContainer = document.getElementById('course-progress');
  
  if (!progressContainer) return;
  
  // Get total lessons and completed lessons
  const totalLessons = courseData[currentLanguage]?.find(g => g.grade === currentGrade)?.lessonDetails?.length || 0;
  let completedLessons = 0;
  
  for (let i = 0; i < totalLessons; i++) {
    const progressKey = `${currentLanguage}_grade${currentGrade}_lesson${i + 1}`;
    if (localStorage.getItem(progressKey) === 'completed') {
      completedLessons++;
    }
  }
  
  // Calculate percentage
  const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  
  // Create progress circle
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const fillPercentage = (percentage / 100) * circumference;
  const dashOffset = circumference - fillPercentage;
  
  progressContainer.innerHTML = `
    <div class="progress-circle">
      <svg viewBox="0 0 120 120">
        <circle class="progress-bg" cx="60" cy="60" r="${radius}" stroke-width="10" />
        <circle class="progress-fill" cx="60" cy="60" r="${radius}" stroke-width="10" 
                style="stroke-dasharray: ${circumference} ${circumference}; stroke-dashoffset: ${dashOffset};" />
      </svg>
      <div class="progress-text">${percentage}%</div>
    </div>
    <div class="progress-label">${completedLessons} of ${totalLessons} lessons completed</div>
  `;
}

/**
 * Sets up the related materials section
 */
function setupRelatedMaterials() {
  const relatedMaterialsContainer = document.getElementById('related-materials');
  
  if (!relatedMaterialsContainer) return;
  
  // Get related materials for current grade and language
  const relatedMaterials = courseData[currentLanguage]?.find(g => g.grade === currentGrade)?.relatedMaterials || [];
  
  relatedMaterialsContainer.innerHTML = '';
  
  if (relatedMaterials.length === 0) {
    relatedMaterialsContainer.innerHTML = `
      <div class="no-materials">
        <p>No related materials available for this course yet.</p>
      </div>
    `;
    return;
  }
  
  relatedMaterials.forEach(material => {
    const materialCard = document.createElement('div');
    materialCard.className = 'material-card';
    
    let icon;
    let typeClass;
    
    if (material.type === 'video') {
      icon = 'fas fa-video';
      typeClass = 'video';
    } else if (material.type === 'pdf') {
      icon = 'fas fa-file-pdf';
      typeClass = 'pdf';
    } else {
      icon = 'fas fa-tasks';
      typeClass = 'exercise';
    }
    
    materialCard.innerHTML = `
      <a href="${material.url}">
        <div class="material-image">
          <img src="${material.image}" alt="${material.title}">
        </div>
        <div class="material-content">
          <span class="material-type ${typeClass}">${material.type}</span>
          <h3><i class="${icon}"></i> ${material.title}</h3>
          <p>${material.description}</p>
        </div>
      </a>
    `;
    
    relatedMaterialsContainer.appendChild(materialCard);
  });
}

/**
 * Sets up the lesson navigation buttons
 */
function setupLessonNavigation() {
  const prevLessonBtn = document.getElementById('prev-lesson');
  const nextLessonBtn = document.getElementById('next-lesson');
  
  if (!prevLessonBtn || !nextLessonBtn) return;
  
  // Add click event for previous lesson button
  prevLessonBtn.addEventListener('click', () => {
    if (currentLessonIndex !== null && currentLessonIndex > 0) {
      currentLessonIndex--;
      
      // Update UI
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      const lessonLink = document.querySelector(`.lesson-link[data-lesson-index="${currentLessonIndex}"]`);
      if (lessonLink) {
        lessonLink.classList.add('active');
      }
      
      // Load lesson content
      loadLessonContent(currentLessonIndex);
      
      // Update navigation buttons
      updateNavigationButtons();
      
      // Mark as in-progress if not completed
      const progressKey = `${currentLanguage}_grade${currentGrade}_lesson${currentLessonIndex + 1}`;
      if (localStorage.getItem(progressKey) !== 'completed') {
        localStorage.setItem(progressKey, 'in-progress');
      }
      
      // Scroll to top of lesson
      document.querySelector('.lesson-content').scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Add click event for next lesson button
  nextLessonBtn.addEventListener('click', () => {
    const totalLessons = courseData[currentLanguage]?.find(g => g.grade === currentGrade)?.lessonDetails?.length || 0;
    
    if (currentLessonIndex !== null && currentLessonIndex < totalLessons - 1) {
      currentLessonIndex++;
      
      // Update UI
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      const lessonLink = document.querySelector(`.lesson-link[data-lesson-index="${currentLessonIndex}"]`);
      if (lessonLink) {
        lessonLink.classList.add('active');
      }
      
      // Load lesson content
      loadLessonContent(currentLessonIndex);
      
      // Update navigation buttons
      updateNavigationButtons();
      
      // Mark as in-progress if not completed
      const progressKey = `${currentLanguage}_grade${currentGrade}_lesson${currentLessonIndex + 1}`;
      if (localStorage.getItem(progressKey) !== 'completed') {
        localStorage.setItem(progressKey, 'in-progress');
      }
      
      // Scroll to top of lesson
      document.querySelector('.lesson-content').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/**
 * Updates the enabled/disabled state of navigation buttons
 */
function updateNavigationButtons() {
  const prevLessonBtn = document.getElementById('prev-lesson');
  const nextLessonBtn = document.getElementById('next-lesson');
  const totalLessons = courseData[currentLanguage]?.find(g => g.grade === currentGrade)?.lessonDetails?.length || 0;
  
  if (prevLessonBtn) {
    prevLessonBtn.disabled = currentLessonIndex === null || currentLessonIndex <= 0;
  }
  
  if (nextLessonBtn) {
    nextLessonBtn.disabled = currentLessonIndex === null || currentLessonIndex >= totalLessons - 1;
  }
}

/**
 * Initializes progress tracking from localStorage
 */
function initializeProgress() {
  // Create progress circle
  createProgressCircle();
  
  // Update sidebar lesson status icons
  const totalLessons = courseData[currentLanguage]?.find(g => g.grade === currentGrade)?.lessonDetails?.length || 0;
  
  for (let i = 0; i < totalLessons; i++) {
    const progressKey = `${currentLanguage}_grade${currentGrade}_lesson${i + 1}`;
    const lessonStatus = localStorage.getItem(progressKey);
    
    if (lessonStatus) {
      const lessonLink = document.querySelector(`.lesson-link[data-lesson-index="${i}"]`);
      
      if (lessonLink) {
        const statusIcon = lessonLink.querySelector('.lesson-status');
        
        if (lessonStatus === 'completed') {
          statusIcon.className = 'fas fa-check-circle lesson-status completed';
        } else if (lessonStatus === 'in-progress') {
          statusIcon.className = 'fas fa-spinner lesson-status in-progress';
        }
      }
    }
  }
}

/**
 * Toggles progress tracking on/off
 */
function toggleProgressTracking() {
  const trackingEnabled = localStorage.getItem('trackingEnabled') === 'true';
  const trackBtn = document.getElementById('track-progress-btn');
  
  if (trackingEnabled) {
    // Disable tracking
    localStorage.setItem('trackingEnabled', 'false');
    trackBtn.innerHTML = '<i class="far fa-bookmark"></i> Track Progress';
    alert('Progress tracking has been disabled. Your progress will no longer be saved.');
  } else {
    // Enable tracking
    localStorage.setItem('trackingEnabled', 'true');
    trackBtn.innerHTML = '<i class="fas fa-bookmark"></i> Tracking Enabled';
    alert('Progress tracking has been enabled. Your progress will be saved locally.');
  }
}
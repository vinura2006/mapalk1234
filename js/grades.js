import { setupNavigation } from './navigation.js';
import { setupLanguageModal } from './languageModal.js';
import { setupContactForm } from './contact.js';

// Grade data with topics for each language stream
const gradesData = {
  tamil: [
    {
      grade: 1,
      title: "Tamil Grade 1",
      description: "Introduction to Tamil alphabet and basic vocabulary.",
      image: "https://images.pexels.com/photos/8422403/pexels-photo-8422403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Alphabet", "Numbers", "Basic Words", "Simple Sentences"],
      lessons: 12
    },
    {
      grade: 2,
      title: "Tamil Grade 2",
      description: "Building on basic vocabulary with simple reading comprehension.",
      image: "https://images.pexels.com/photos/8535219/pexels-photo-8535219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Reading", "Writing", "Simple Stories", "Pronunciation"],
      lessons: 15
    },
    {
      grade: 3,
      title: "Tamil Grade 3",
      description: "Developing reading fluency and basic grammatical structures.",
      image: "https://images.pexels.com/photos/8535236/pexels-photo-8535236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Grammar Basics", "Reading Practice", "Vocabulary", "Conversation"],
      lessons: 18
    },
    {
      grade: 4,
      title: "Tamil Grade 4",
      description: "Building vocabulary and introducing more complex grammar.",
      image: "https://images.pexels.com/photos/8535286/pexels-photo-8535286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Advanced Grammar", "Reading", "Writing", "Cultural Context"],
      lessons: 20
    },
    {
      grade: 5,
      title: "Tamil Grade 5",
      description: "Expanding vocabulary and improving written expression.",
      image: "https://images.pexels.com/photos/5212687/pexels-photo-5212687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Composition", "Advanced Reading", "Cultural Studies", "Poetry"],
      lessons: 22
    },
    {
      grade: 6,
      title: "Tamil Grade 6",
      description: "Focus on Tamil literature and advanced grammar concepts.",
      image: "https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Literature", "Advanced Grammar", "Creative Writing", "Public Speaking"],
      lessons: 24
    },
    {
      grade: 7,
      title: "Tamil Grade 7",
      description: "Exploring Tamil poetry, prose, and complex grammatical structures.",
      image: "https://images.pexels.com/photos/5427668/pexels-photo-5427668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Poetry Analysis", "Advanced Prose", "Grammar Mastery", "Cultural History"],
      lessons: 26
    },
    {
      grade: 8,
      title: "Tamil Grade 8",
      description: "In-depth study of Tamil literature and advanced composition.",
      image: "https://images.pexels.com/photos/3755761/pexels-photo-3755761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Classic Literature", "Advanced Composition", "Rhetoric", "Literary Analysis"],
      lessons: 28
    },
    {
      grade: 9,
      title: "Tamil Grade 9",
      description: "Comprehensive Tamil language skills for academic excellence.",
      image: "https://images.pexels.com/photos/3769981/pexels-photo-3769981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Academic Writing", "Advanced Literature", "Critical Analysis", "Debate"],
      lessons: 30
    },
    {
      grade: 10,
      title: "Tamil Grade 10",
      description: "Advanced Tamil language skills with focus on examination preparation.",
      image: "https://images.pexels.com/photos/4145355/pexels-photo-4145355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Exam Preparation", "Advanced Composition", "Comprehensive Grammar", "Literature Review"],
      lessons: 32
    },
    {
      grade: 11,
      title: "Tamil Grade 11",
      description: "Final preparation for Tamil language proficiency examinations.",
      image: "https://images.pexels.com/photos/8422156/pexels-photo-8422156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Exam Strategies", "Advanced Literature", "Comprehensive Grammar", "Final Projects"],
      lessons: 34
    }
  ],
  english: [
    {
      grade: 1,
      title: "English Grade 1",
      description: "Introduction to English alphabet and basic vocabulary.",
      image: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Alphabet", "Phonics", "Basic Words", "Simple Sentences"],
      lessons: 12
    },
    {
      grade: 2,
      title: "English Grade 2",
      description: "Building vocabulary and simple sentence construction.",
      image: "https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Reading", "Writing", "Simple Stories", "Pronunciation"],
      lessons: 15
    },
    {
      grade: 3,
      title: "English Grade 3",
      description: "Developing reading fluency and basic grammatical structures.",
      image: "https://images.pexels.com/photos/4861352/pexels-photo-4861352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Grammar Basics", "Reading Practice", "Vocabulary", "Conversation"],
      lessons: 18
    },
    {
      grade: 4,
      title: "English Grade 4",
      description: "Building writing skills and introducing more complex grammar.",
      image: "https://images.pexels.com/photos/5211446/pexels-photo-5211446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Advanced Grammar", "Reading", "Writing", "Comprehension"],
      lessons: 20
    },
    {
      grade: 5,
      title: "English Grade 5",
      description: "Expanding vocabulary and improving written expression.",
      image: "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Composition", "Advanced Reading", "Literature", "Poetry"],
      lessons: 22
    },
    {
      grade: 6,
      title: "English Grade 6",
      description: "Focus on English literature and advanced grammar concepts.",
      image: "https://images.pexels.com/photos/6936325/pexels-photo-6936325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Literature", "Advanced Grammar", "Creative Writing", "Public Speaking"],
      lessons: 24
    },
    {
      grade: 7,
      title: "English Grade 7",
      description: "Exploring poetry, prose, and complex grammatical structures.",
      image: "https://images.pexels.com/photos/5088179/pexels-photo-5088179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Poetry Analysis", "Advanced Prose", "Grammar Mastery", "Literary Devices"],
      lessons: 26
    },
    {
      grade: 8,
      title: "English Grade 8",
      description: "In-depth study of literature and advanced composition.",
      image: "https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Classic Literature", "Advanced Composition", "Rhetoric", "Literary Analysis"],
      lessons: 28
    },
    {
      grade: 9,
      title: "English Grade 9",
      description: "Comprehensive English language skills for academic excellence.",
      image: "https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Academic Writing", "Advanced Literature", "Critical Analysis", "Debate"],
      lessons: 30
    },
    {
      grade: 10,
      title: "English Grade 10",
      description: "Advanced English language skills with focus on examination preparation.",
      image: "https://images.pexels.com/photos/4861352/pexels-photo-4861352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Exam Preparation", "Advanced Composition", "Comprehensive Grammar", "Literature Review"],
      lessons: 32
    },
    {
      grade: 11,
      title: "English Grade 11",
      description: "Final preparation for English language proficiency examinations.",
      image: "https://images.pexels.com/photos/5088179/pexels-photo-5088179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Exam Strategies", "Advanced Literature", "Comprehensive Grammar", "Final Projects"],
      lessons: 34
    }
  ]
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupLanguageModal();
  setupContactForm();
  
  // Get language from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const language = urlParams.get('lang') || localStorage.getItem('selectedLanguage') || 'english';
  
  // Save the selected language to localStorage
  localStorage.setItem('selectedLanguage', language);
  
  // Setup stream header
  setupStreamHeader(language);
  
  // Render grade cards
  renderGradeCards(language);
});

/**
 * Sets up the stream header based on selected language
 * @param {string} language - The selected language stream
 */
function setupStreamHeader(language) {
  const streamHeader = document.getElementById('stream-header');
  
  if (!streamHeader) return;
  
  // Add language-specific class
  streamHeader.classList.add(language);
  
  // Set header content
  if (language === 'tamil') {
    streamHeader.innerHTML = `
      <div class="container">
        <h2>Tamil Language Stream</h2>
        <p>Explore our comprehensive Tamil language curriculum designed for students from Grade 1 to Grade 11. 
           Learn reading, writing, grammar, and cultural aspects of Tamil language.</p>
      </div>
    `;
  } else {
    streamHeader.innerHTML = `
      <div class="container">
        <h2>English Language Stream</h2>
        <p>Discover our comprehensive English language curriculum designed for students from Grade 1 to Grade 11. 
           Master reading, writing, grammar, and literature in English.</p>
      </div>
    `;
  }
}

/**
 * Renders grade cards based on selected language
 * @param {string} language - The selected language stream
 */
function renderGradeCards(language) {
  const gradesContainer = document.getElementById('grades-container');
  
  if (!gradesContainer) return;
  
  const grades = gradesData[language] || [];
  
  gradesContainer.innerHTML = '';
  
  grades.forEach(grade => {
    const gradeCard = document.createElement('div');
    gradeCard.className = `grade-card ${language}`;
    
    // Create topics HTML
    const topicsHTML = grade.topics.map(topic => `
      <span class="topic-tag">${topic}</span>
    `).join('');
    
    gradeCard.innerHTML = `
      <a href="course.html?lang=${language}&grade=${grade.grade}">
        <div class="grade-image">
          <img src="${grade.image}" alt="${grade.title}">
        </div>
        <div class="grade-content">
          <h3><i class="fas fa-book"></i> ${grade.title}</h3>
          <p>${grade.description}</p>
          <div class="grade-topics">
            ${topicsHTML}
          </div>
          <div class="grade-footer">
            <div class="lessons-count">
              <i class="fas fa-video"></i> ${grade.lessons} lessons
            </div>
            <div class="explore-btn">
              Explore <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </a>
    `;
    
    gradesContainer.appendChild(gradeCard);
  });
}
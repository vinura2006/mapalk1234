import { setupNavigation } from './navigation.js';
import { setupLanguageModal } from './languageModal.js';
import { setupContactForm } from './contact.js';

// Game data
const gamesData = [
  {
    id: "word-scramble",
    title: "Word Scramble",
    description: "Unscramble letters to form correct words. Great for vocabulary building.",
    image: "https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    language: "english",
    difficulty: 2,
    plays: 1250,
    rating: 4.7
  },
  {
    id: "grammar-quiz",
    title: "Grammar Challenge",
    description: "Test your grammar knowledge with quizzes tailored to your level.",
    image: "https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    language: "english",
    difficulty: 3,
    plays: 980,
    rating: 4.5
  },
  {
    id: "vocabulary-match",
    title: "Vocabulary Match",
    description: "Match words with their meanings in this fun memory game.",
    image: "https://images.pexels.com/photos/8845418/pexels-photo-8845418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    language: "english",
    difficulty: 1,
    plays: 1567,
    rating: 4.8
  },
  {
    id: "tamil-letters",
    title: "Tamil Letters Game",
    description: "Learn to recognize Tamil letters with this interactive game.",
    image: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    language: "tamil",
    difficulty: 1,
    plays: 876,
    rating: 4.6
  },
  {
    id: "tamil-word-builder",
    title: "Tamil Word Builder",
    description: "Create Tamil words from given letters to improve your vocabulary.",
    image: "https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    language: "tamil",
    difficulty: 2,
    plays: 722,
    rating: 4.4
  },
  {
    id: "sentence-structure",
    title: "Sentence Builder",
    description: "Learn to construct grammatically correct sentences.",
    image: "https://images.pexels.com/photos/8423103/pexels-photo-8423103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    language: "english",
    difficulty: 3,
    plays: 1043,
    rating: 4.6
  }
];

// Word data for the Word Scramble game
const wordScrambleData = {
  english: [
    { word: "APPLE", hint: "A common red fruit" },
    { word: "SCHOOL", hint: "A place for learning" },
    { word: "FRIEND", hint: "Someone you like spending time with" },
    { word: "TEACHER", hint: "The person who helps you learn" },
    { word: "COMPUTER", hint: "An electronic device for processing data" }
  ],
  tamil: [
    { word: "பழம்", hint: "Something sweet and edible that grows on trees" },
    { word: "பள்ளி", hint: "A place where you go to learn" },
    { word: "நண்பர்", hint: "A person you enjoy spending time with" },
    { word: "ஆசிரியர்", hint: "Someone who teaches you" },
    { word: "கணினி", hint: "An electronic device for working and gaming" }
  ]
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupLanguageModal();
  setupContactForm();
  
  // Get language from localStorage or default to "all"
  const gameLanguage = localStorage.getItem('gameLanguage') || 'all';
  
  // Setup language selector
  setupLanguageSelector(gameLanguage);
  
  // Render game cards
  renderGameCards(gameLanguage);
  
  // Setup game modal
  setupGameModal();
  
  // Setup play buttons
  setupPlayButtons();
});

/**
 * Sets up the language selector functionality
 * @param {string} initialLanguage - The initially selected language
 */
function setupLanguageSelector(initialLanguage) {
  const languageButtons = document.querySelectorAll('.language-btn');
  
  // Set initial active state
  languageButtons.forEach(button => {
    if (button.dataset.language === initialLanguage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  // Add click event listeners
  languageButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      languageButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get selected language
      const language = button.dataset.language;
      
      // Save to localStorage
      localStorage.setItem('gameLanguage', language);
      
      // Render games for selected language
      renderGameCards(language);
    });
  });
}

/**
 * Renders game cards based on selected language
 * @param {string} language - The selected language filter
 */
function renderGameCards(language) {
  const gamesGrid = document.getElementById('games-grid');
  
  if (!gamesGrid) return;
  
  // Filter games by language if needed
  let filteredGames = gamesData;
  if (language !== 'all') {
    filteredGames = gamesData.filter(game => game.language === language);
  }
  
  gamesGrid.innerHTML = '';
  
  if (filteredGames.length === 0) {
    gamesGrid.innerHTML = `
      <div class="no-games">
        <p>No games available for the selected language. Please try another language.</p>
      </div>
    `;
    return;
  }
  
  filteredGames.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    
    // Create difficulty dots HTML
    let difficultyDots = '';
    for (let i = 1; i <= 3; i++) {
      const dotClass = i <= game.difficulty ? 'filled' : '';
      difficultyDots += `<span class="difficulty-dot ${dotClass}"></span>`;
    }
    
    gameCard.innerHTML = `
      <div class="game-image">
        <img src="${game.image}" alt="${game.title}">
        <div class="game-language ${game.language}">${game.language}</div>
      </div>
      <div class="game-content">
        <h3><i class="fas fa-gamepad"></i> ${game.title}</h3>
        <p>${game.description}</p>
        <div class="game-stats">
          <div><i class="fas fa-play-circle"></i> ${game.plays} plays</div>
          <div><i class="fas fa-star"></i> ${game.rating}/5</div>
        </div>
        <div class="game-actions">
          <div class="difficulty">
            <span class="difficulty-label">Difficulty:</span>
            <div class="difficulty-dots">
              ${difficultyDots}
            </div>
          </div>
          <button class="play-btn btn btn-primary" data-game="${game.id}">
            Play <i class="fas fa-play"></i>
          </button>
        </div>
      </div>
    `;
    
    gamesGrid.appendChild(gameCard);
  });
  
  // Re-setup play buttons after rendering new cards
  setupPlayButtons();
}

/**
 * Sets up the play buttons to open game modals
 */
function setupPlayButtons() {
  const playButtons = document.querySelectorAll('.play-btn');
  
  playButtons.forEach(button => {
    button.addEventListener('click', () => {
      const gameId = button.dataset.game;
      openGameModal(gameId);
    });
  });
}

/**
 * Sets up the game modal
 */
function setupGameModal() {
  const gameModal = document.getElementById('game-modal');
  const closeBtn = gameModal.querySelector('.close-modal');
  
  // Close modal when clicking the X
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      gameModal.style.display = 'none';
    });
  }
  
  // Close modal when clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target === gameModal) {
      gameModal.style.display = 'none';
    }
  });
}

/**
 * Opens the game modal with the selected game
 * @param {string} gameId - The ID of the game to load
 */
function openGameModal(gameId) {
  const gameModal = document.getElementById('game-modal');
  const gameContainer = document.getElementById('game-container');
  
  if (!gameModal || !gameContainer) return;
  
  // Show modal
  gameModal.style.display = 'flex';
  
  // Load appropriate game based on ID
  if (gameId === 'word-scramble') {
    loadWordScrambleGame(gameContainer);
  } else if (gameId === 'word-challenge') {
    loadWordScrambleGame(gameContainer, 'featured');
  } else {
    gameContainer.innerHTML = `
      <div class="game-placeholder">
        <h2>Game Coming Soon!</h2>
        <p>This game is currently under development. Please check back later!</p>
        <img src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Coming Soon">
      </div>
    `;
  }
}

/**
 * Loads the Word Scramble game into the container
 * @param {HTMLElement} container - The container to load the game into
 * @param {string} mode - The game mode (normal or featured)
 */
function loadWordScrambleGame(container, mode = 'normal') {
  // Get preferred language from localStorage or default to english
  const language = localStorage.getItem('selectedLanguage') || 'english';
  
  // Get word data for the selected language
  const wordData = wordScrambleData[language] || wordScrambleData.english;
  
  // Initialize game state
  const gameState = {
    currentWordIndex: 0,
    score: 0,
    hintsUsed: 0,
    showingHint: false,
    words: [...wordData] // Copy to avoid modifying the original
  };
  
  // Shuffle the words array
  gameState.words.sort(() => Math.random() - 0.5);
  
  // Create game UI
  container.innerHTML = `
    <div class="word-scramble-game">
      <div class="word-scramble-header">
        <h2>${mode === 'featured' ? 'Word Challenge' : 'Word Scramble'}</h2>
        <p>Unscramble the letters to form the correct word. You can use the hint button if you get stuck.</p>
      </div>
      
      <div class="scrambled-word" id="scrambled-word"></div>
      
      <div class="word-hint" id="word-hint" style="display: none;"></div>
      
      <div class="answer-input">
        <input type="text" id="answer-input" placeholder="Your answer..." autocomplete="off">
        <button id="check-answer">Check</button>
      </div>
      
      <div class="game-feedback" id="game-feedback"></div>
      
      <div class="game-stats">
        <div class="game-stat">
          <div class="stat-value" id="score-value">0</div>
          <div class="stat-label">Score</div>
        </div>
        <div class="game-stat">
          <div class="stat-value" id="hints-value">0</div>
          <div class="stat-label">Hints Used</div>
        </div>
      </div>
      
      <div class="game-controls">
        <button class="hint-btn" id="hint-btn">Show Hint</button>
        <button class="next-word-btn" id="next-word-btn">Next Word</button>
      </div>
    </div>
  `;
  
  // Get DOM elements
  const scrambledWordEl = document.getElementById('scrambled-word');
  const wordHintEl = document.getElementById('word-hint');
  const answerInputEl = document.getElementById('answer-input');
  const checkAnswerBtn = document.getElementById('check-answer');
  const gameFeedbackEl = document.getElementById('game-feedback');
  const scoreValueEl = document.getElementById('score-value');
  const hintsValueEl = document.getElementById('hints-value');
  const hintBtn = document.getElementById('hint-btn');
  const nextWordBtn = document.getElementById('next-word-btn');
  
  // Function to scramble a word
  function scrambleWord(word) {
    const letters = word.split('');
    let scrambled = '';
    
    // Keep scrambling until we get a different arrangement
    do {
      letters.sort(() => Math.random() - 0.5);
      scrambled = letters.join('');
    } while (scrambled === word);
    
    return scrambled;
  }
  
  // Function to load the current word
  function loadCurrentWord() {
    const currentWord = gameState.words[gameState.currentWordIndex];
    const scrambled = scrambleWord(currentWord.word);
    
    scrambledWordEl.textContent = scrambled;
    wordHintEl.textContent = `Hint: ${currentWord.hint}`;
    wordHintEl.style.display = 'none';
    gameState.showingHint = false;
    
    answerInputEl.value = '';
    gameFeedbackEl.textContent = '';
    gameFeedbackEl.className = 'game-feedback';
    
    answerInputEl.focus();
  }
  
  // Function to check the answer
  function checkAnswer() {
    const currentWord = gameState.words[gameState.currentWordIndex];
    const userAnswer = answerInputEl.value.trim().toUpperCase();
    
    if (userAnswer === currentWord.word) {
      // Correct answer
      gameFeedbackEl.textContent = 'Correct! Well done!';
      gameFeedbackEl.className = 'game-feedback success visible';
      
      // Add points (less points if hint was used)
      const pointsEarned = gameState.showingHint ? 5 : 10;
      gameState.score += pointsEarned;
      scoreValueEl.textContent = gameState.score;
      
      // Disable input until next word
      answerInputEl.disabled = true;
      checkAnswerBtn.disabled = true;
      
      // Automatically move to next word after delay
      setTimeout(() => {
        goToNextWord();
      }, 2000);
    } else {
      // Incorrect answer
      gameFeedbackEl.textContent = 'Incorrect. Try again!';
      gameFeedbackEl.className = 'game-feedback error visible';
    }
  }
  
  // Function to go to next word
  function goToNextWord() {
    gameState.currentWordIndex = (gameState.currentWordIndex + 1) % gameState.words.length;
    loadCurrentWord();
    
    // Re-enable input
    answerInputEl.disabled = false;
    checkAnswerBtn.disabled = false;
  }
  
  // Function to show hint
  function showHint() {
    if (!gameState.showingHint) {
      wordHintEl.style.display = 'block';
      gameState.hintsUsed++;
      gameState.showingHint = true;
      hintsValueEl.textContent = gameState.hintsUsed;
    }
  }
  
  // Add event listeners
  checkAnswerBtn.addEventListener('click', checkAnswer);
  
  answerInputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  });
  
  hintBtn.addEventListener('click', showHint);
  
  nextWordBtn.addEventListener('click', () => {
    goToNextWord();
  });
  
  // Load the first word
  loadCurrentWord();
}
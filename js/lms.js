import { setupNavigation } from './navigation.js';
import { setupLanguageModal } from './languageModal.js';
import { setupContactForm } from './contact.js';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupLanguageModal();
  setupContactForm();
  
  // Setup LMS functionality
  setupLMS();
});

/**
 * Sets up the LMS functionality
 */
function setupLMS() {
  // Setup auth tabs
  setupAuthTabs();
  
  // Setup login form
  setupLoginForm();
  
  // Setup register form
  setupRegisterForm();
  
  // Check if user is logged in
  checkLoggedInStatus();
  
  // Setup certificate modal
  setupCertificateModal();
}

/**
 * Sets up the authentication tabs
 */
function setupAuthTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Show the corresponding tab content
      const tabId = btn.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
      });
      document.getElementById(`${tabId}-tab`).style.display = 'block';
    });
  });
}

/**
 * Sets up the login form
 */
function setupLoginForm() {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      // Validate form data (simple validation)
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      // In a real application, you would send this data to a server
      // Here we're using localStorage for demonstration purposes
      
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('lms_users')) || [];
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Set user as logged in
        localStorage.setItem('lms_currentUser', JSON.stringify(user));
        
        // Show dashboard
        showDashboard(user);
      } else {
        alert('Invalid email or password');
      }
    });
  }
}

/**
 * Sets up the register form
 */
function setupRegisterForm() {
  const registerForm = document.getElementById('register-form');
  
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const role = document.getElementById('register-role').value;
      
      // Validate form data (simple validation)
      if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      // Check if email already exists
      const users = JSON.parse(localStorage.getItem('lms_users')) || [];
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        alert('Email already registered');
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role,
        joinDate: new Date().toISOString(),
        courses: []
      };
      
      // Add user to localStorage
      users.push(newUser);
      localStorage.setItem('lms_users', JSON.stringify(users));
      
      // Set user as logged in
      localStorage.setItem('lms_currentUser', JSON.stringify(newUser));
      
      // Show dashboard
      showDashboard(newUser);
    });
  }
}

/**
 * Checks if a user is logged in and shows the appropriate content
 */
function checkLoggedInStatus() {
  const currentUser = JSON.parse(localStorage.getItem('lms_currentUser'));
  
  if (currentUser) {
    // Show dashboard
    showDashboard(currentUser);
  }
}

/**
 * Shows the dashboard based on user role
 * @param {Object} user - The user object
 */
function showDashboard(user) {
  const authContainer = document.getElementById('auth-container');
  const dashboard = document.getElementById('dashboard');
  
  if (!authContainer || !dashboard) return;
  
  // Hide auth container
  authContainer.style.display = 'none';
  
  // Show dashboard
  dashboard.style.display = 'block';
  
  // Load dashboard content based on user role
  if (user.role === 'admin') {
    loadAdminDashboard(user);
  } else {
    loadStudentDashboard(user);
  }
}

/**
 * Loads the student dashboard
 * @param {Object} user - The user object
 */
function loadStudentDashboard(user) {
  const dashboard = document.getElementById('dashboard');
  
  if (!dashboard) return;
  
  // Get stored course progress data
  const courseProgress = JSON.parse(localStorage.getItem(`lms_progress_${user.id}`)) || [];
  
  // Get initial for avatar
  const initial = user.name.charAt(0).toUpperCase();
  
  // Recent activities data (would come from backend in a real app)
  const recentActivities = [
    {
      title: 'Completed Lesson',
      time: '2 hours ago',
      description: 'You completed Lesson 3: Basic Vocabulary in English Grade 1'
    },
    {
      title: 'Earned Certificate',
      time: '1 day ago',
      description: 'Congratulations! You earned a certificate for Tamil Grade 2'
    },
    {
      title: 'Joined Course',
      time: '3 days ago',
      description: 'You enrolled in English Grade 4'
    }
  ];
  
  // Create dashboard HTML
  dashboard.innerHTML = `
    <div class="dashboard-header">
      <div class="welcome-msg">
        <h2>Welcome back, ${user.name}!</h2>
        <p>Continue your learning journey</p>
      </div>
      <div class="dashboard-actions">
        <button class="dashboard-action logout-btn" id="logout-btn">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </div>
    
    <div class="dashboard-content">
      <div class="main-content">
        <div class="progress-section">
          <h3><i class="fas fa-book-reader"></i> Your Course Progress</h3>
          <div class="course-progress-list" id="course-progress-list">
            ${courseProgress.length > 0 ? generateCourseProgressHTML(courseProgress) : `
              <div class="no-progress">
                <p>You haven't started any courses yet. <a href="#" id="browse-courses-btn">Browse courses</a> to get started.</p>
              </div>
            `}
          </div>
        </div>
        
        <div class="recent-activities">
          <h3><i class="fas fa-history"></i> Recent Activities</h3>
          <div class="activities-list">
            ${recentActivities.map(activity => `
              <div class="activity-item">
                <div class="activity-header">
                  <div class="activity-title">${activity.title}</div>
                  <div class="activity-time">${activity.time}</div>
                </div>
                <div class="activity-description">${activity.description}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div class="dashboard-sidebar">
        <div class="user-profile">
          <div class="profile-header">
            <div class="profile-avatar">
              ${initial}
            </div>
            <div class="profile-info">
              <h3>${user.name}</h3>
              <p>${user.email}</p>
            </div>
          </div>
          
          <div class="profile-stats">
            <div class="profile-stat">
              <div class="stat-value">${courseProgress.length || 0}</div>
              <div class="stat-label">Courses</div>
            </div>
            <div class="profile-stat">
              <div class="stat-value">2</div>
              <div class="stat-label">Certificates</div>
            </div>
          </div>
          
          <button class="edit-profile-btn">Edit Profile</button>
        </div>
        
        <div class="certificates">
          <h3><i class="fas fa-award"></i> Your Certificates</h3>
          <div class="certificates-list">
            <div class="certificate-item">
              <div class="certificate-icon">
                <i class="fas fa-certificate"></i>
              </div>
              <div class="certificate-info">
                <h4>Tamil Grade 2</h4>
                <p>Completed on: 01/15/2025</p>
              </div>
              <button class="view-certificate" data-certificate="tamil-grade2">
                View <i class="fas fa-external-link-alt"></i>
              </button>
            </div>
            <div class="certificate-item">
              <div class="certificate-icon">
                <i class="fas fa-certificate"></i>
              </div>
              <div class="certificate-info">
                <h4>English Grade 1</h4>
                <p>Completed on: 12/10/2024</p>
              </div>
              <button class="view-certificate" data-certificate="english-grade1">
                View <i class="fas fa-external-link-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners
  setupDashboardEventListeners();
}

/**
 * Generates HTML for course progress items
 * @param {Array} courses - The course progress data
 * @returns {string} The HTML for the course progress
 */
function generateCourseProgressHTML(courses) {
  return courses.map(course => {
    return `
      <div class="course-progress-item">
        <div class="progress-info">
          <h4>${course.title}</h4>
          <p>${course.language} - ${course.grade}</p>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${course.progress}%"></div>
          </div>
        </div>
        <div class="progress-percentage">${course.progress}%</div>
        <a href="course.html?lang=${course.language}&grade=${course.gradeNumber}" class="continue-btn">
          Continue <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    `;
  }).join('');
}

/**
 * Loads the admin dashboard
 * @param {Object} user - The user object
 */
function loadAdminDashboard(user) {
  const dashboard = document.getElementById('dashboard');
  
  if (!dashboard) return;
  
  // Get stored users
  const users = JSON.parse(localStorage.getItem('lms_users')) || [];
  const students = users.filter(u => u.role === 'student');
  
  // Get initial for avatar
  const initial = user.name.charAt(0).toUpperCase();
  
  // Create dashboard HTML
  dashboard.innerHTML = `
    <div class="dashboard-header">
      <div class="welcome-msg">
        <h2>Admin Dashboard</h2>
        <p>Manage students, courses, and site content</p>
      </div>
      <div class="dashboard-actions">
        <button class="dashboard-action logout-btn" id="logout-btn">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </div>
    
    <div class="admin-controls">
      <div class="admin-control">
        <i class="fas fa-user-graduate"></i>
        <h3>Students</h3>
        <p>Manage student accounts and track progress</p>
        <button class="btn btn-primary" id="manage-students-btn">Manage Students</button>
      </div>
      <div class="admin-control">
        <i class="fas fa-book"></i>
        <h3>Courses</h3>
        <p>Add, edit, and organize course content</p>
        <button class="btn btn-primary" id="manage-courses-btn">Manage Courses</button>
      </div>
      <div class="admin-control">
        <i class="fas fa-chart-bar"></i>
        <h3>Analytics</h3>
        <p>View detailed usage and performance data</p>
        <button class="btn btn-primary" id="view-analytics-btn">View Analytics</button>
      </div>
    </div>
    
    <div class="admin-section">
      <h3>Student Management</h3>
      <div class="student-list">
        ${students.length > 0 ? generateStudentListHTML(students) : `
          <div class="no-students">
            <p>No students registered yet.</p>
          </div>
        `}
      </div>
    </div>
    
    <div class="dashboard-content">
      <div class="main-content">
        <!-- Admin dashboard content will be loaded here -->
      </div>
      
      <div class="dashboard-sidebar">
        <div class="user-profile">
          <div class="profile-header">
            <div class="profile-avatar">
              ${initial}
            </div>
            <div class="profile-info">
              <h3>${user.name}</h3>
              <p>${user.email}</p>
              <p><strong>Admin</strong></p>
            </div>
          </div>
          
          <div class="profile-stats">
            <div class="profile-stat">
              <div class="stat-value">${students.length}</div>
              <div class="stat-label">Students</div>
            </div>
            <div class="profile-stat">
              <div class="stat-value">11</div>
              <div class="stat-label">Courses</div>
            </div>
          </div>
          
          <button class="edit-profile-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners
  setupDashboardEventListeners();
}

/**
 * Generates HTML for student list items
 * @param {Array} students - The student users
 * @returns {string} The HTML for the student list
 */
function generateStudentListHTML(students) {
  return students.map(student => {
    const initial = student.name.charAt(0).toUpperCase();
    return `
      <div class="student-item">
        <div class="student-avatar">${initial}</div>
        <div class="student-info">
          <h4>${student.name}</h4>
          <p>${student.email}</p>
        </div>
        <div class="student-actions">
          <button class="student-action edit" data-student-id="${student.id}" title="Edit Student">
            <i class="fas fa-edit"></i>
          </button>
          <button class="student-action delete" data-student-id="${student.id}" title="Delete Student">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Sets up event listeners for the dashboard
 */
function setupDashboardEventListeners() {
  // Logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Clear current user from localStorage
      localStorage.removeItem('lms_currentUser');
      
      // Reload page to show login form
      window.location.reload();
    });
  }
  
  // Browse courses button
  const browseCourses = document.getElementById('browse-courses-btn');
  if (browseCourses) {
    browseCourses.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Open language selection modal
      document.getElementById('language-modal').style.display = 'flex';
    });
  }
  
  // View certificate buttons
  const viewCertificateButtons = document.querySelectorAll('.view-certificate');
  viewCertificateButtons.forEach(button => {
    button.addEventListener('click', () => {
      const certificateId = button.dataset.certificate;
      openCertificateModal(certificateId);
    });
  });
  
  // Admin-specific buttons
  const manageStudentsBtn = document.getElementById('manage-students-btn');
  if (manageStudentsBtn) {
    manageStudentsBtn.addEventListener('click', () => {
      alert('Student management functionality would be implemented here in a full application.');
    });
  }
  
  const manageCoursesBtn = document.getElementById('manage-courses-btn');
  if (manageCoursesBtn) {
    manageCoursesBtn.addEventListener('click', () => {
      alert('Course management functionality would be implemented here in a full application.');
    });
  }
  
  const viewAnalyticsBtn = document.getElementById('view-analytics-btn');
  if (viewAnalyticsBtn) {
    viewAnalyticsBtn.addEventListener('click', () => {
      alert('Analytics functionality would be implemented here in a full application.');
    });
  }
  
  // Student action buttons
  document.querySelectorAll('.student-action.edit').forEach(button => {
    button.addEventListener('click', () => {
      const studentId = button.dataset.studentId;
      alert(`Edit student with ID: ${studentId}`);
    });
  });
  
  document.querySelectorAll('.student-action.delete').forEach(button => {
    button.addEventListener('click', () => {
      const studentId = button.dataset.studentId;
      
      if (confirm('Are you sure you want to delete this student?')) {
        // Delete student from localStorage
        const users = JSON.parse(localStorage.getItem('lms_users')) || [];
        const updatedUsers = users.filter(u => u.id !== studentId);
        localStorage.setItem('lms_users', JSON.stringify(updatedUsers));
        
        // Reload dashboard
        const currentUser = JSON.parse(localStorage.getItem('lms_currentUser'));
        loadAdminDashboard(currentUser);
      }
    });
  });
}

/**
 * Sets up the certificate modal
 */
function setupCertificateModal() {
  const certificateModal = document.getElementById('certificate-modal');
  const closeBtn = certificateModal?.querySelector('.close-modal');
  
  // Close modal when clicking the X
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      certificateModal.style.display = 'none';
    });
  }
  
  // Close modal when clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target === certificateModal) {
      certificateModal.style.display = 'none';
    }
  });
  
  // Print certificate button
  const printCertificateBtn = document.getElementById('print-certificate');
  if (printCertificateBtn) {
    printCertificateBtn.addEventListener('click', () => {
      // Open print dialog
      window.print();
    });
  }
}

/**
 * Opens the certificate modal with the selected certificate
 * @param {string} certificateId - The ID of the certificate to display
 */
function openCertificateModal(certificateId) {
  const certificateModal = document.getElementById('certificate-modal');
  const certificateContent = document.getElementById('certificate-content');
  
  if (!certificateModal || !certificateContent) return;
  
  // Get current user
  const currentUser = JSON.parse(localStorage.getItem('lms_currentUser'));
  
  if (!currentUser) return;
  
  // Get certificate details based on ID
  let courseTitle = '';
  let completionDate = '';
  
  if (certificateId === 'tamil-grade2') {
    courseTitle = 'Tamil Language - Grade 2';
    completionDate = 'January 15, 2025';
  } else if (certificateId === 'english-grade1') {
    courseTitle = 'English Language - Grade 1';
    completionDate = 'December 10, 2024';
  }
  
  // Create certificate HTML
  certificateContent.innerHTML = `
    <div class="certificate-header">
      <div class="certificate-title">Certificate of Completion</div>
      <div class="certificate-subtitle">EduKids Language Learning</div>
    </div>
    
    <div class="certificate-body">
      <p>This certifies that</p>
      <div class="certificate-name">${currentUser.name}</div>
      <p>has successfully completed the course</p>
      <div class="certificate-course">${courseTitle}</div>
      <div class="certificate-date">Completed on ${completionDate}</div>
    </div>
    
    <div class="certificate-footer">
      <div class="certificate-signature">
        <div class="certificate-seal"></div>
        <div class="signature-line"></div>
        <div>Course Instructor</div>
      </div>
      
      <div class="certificate-signature">
        <div class="certificate-seal"></div>
        <div class="signature-line"></div>
        <div>Program Director</div>
      </div>
    </div>
  `;
  
  // Show modal
  certificateModal.style.display = 'flex';
}
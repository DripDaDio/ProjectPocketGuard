// Dark Mode Toggle Script
// Apply dark mode immediately on page load
(function() {
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    document.documentElement.classList.add('dark-mode');
    if (document.body) {
      document.body.classList.add('dark-mode');
    }
  }
})();

// Setup toggle after DOM loads
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  // Apply dark mode to body if it was set
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    document.body.classList.add('dark-mode');
  }
  
  if (!darkModeToggle) {
    return;
  }

  // Set initial toggle state
  darkModeToggle.checked = savedDarkMode;

  // Toggle dark mode
  darkModeToggle.addEventListener('change', function() {
    console.log('Dark mode toggle clicked:', this.checked);
    if (this.checked) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
      console.log('Dark mode enabled');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
      console.log('Dark mode disabled');
    }
  });
});

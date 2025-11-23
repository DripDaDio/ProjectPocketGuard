// Goals Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  console.log('Goals page loaded');

  // Add page entrance animation
  const mainContent = document.querySelector('.goals-page');
  if (mainContent) {
    setTimeout(() => {
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
    }, 100);
  }

  // Create Goal Button
  const createGoalBtn = document.querySelector('.btn-create');
  if (createGoalBtn) {
    createGoalBtn.addEventListener('click', function() {
      alert('Create Goal functionality - Coming soon!');
    });
  }

  // Add Funds Buttons
  const addFundsBtns = document.querySelectorAll('.btn-goal-action');
  addFundsBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const goalCard = this.closest('.goal-card');
      const goalName = goalCard.querySelector('h3')?.textContent || 'Goal';
      
      if (this.textContent.includes('Add Funds')) {
        const amount = prompt(`Enter amount to add to ${goalName}:`);
        if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
          alert(`Added ₹${amount} to ${goalName}`);
          // Here you would typically make an API call to update the goal
        }
      } else if (this.textContent.includes('Funds Amount')) {
        alert(`View funds for ${goalName}`);
      } else if (this.textContent.includes('Manage Investment')) {
        alert('Manage Investment - Coming soon!');
      } else if (this.textContent.includes('Learn More')) {
        alert('Learn More about Spare Change Investing');
      }
    });
  });

  // Create New Sprint Button
  const createSprintBtn = document.querySelector('.btn-create-sprint');
  if (createSprintBtn) {
    createSprintBtn.addEventListener('click', function() {
      alert('Create New Sprint - Coming soon!');
    });
  }

  // Checkbox toggles
  const checkboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const rule = this.closest('.rule');
      const ruleName = rule.querySelector('strong')?.textContent || 'Rule';
      
      if (this.checked) {
        console.log(`${ruleName} enabled`);
        alert(`${ruleName} is now enabled`);
      } else {
        console.log(`${ruleName} disabled`);
        alert(`${ruleName} is now disabled`);
      }
    });
  });

  // Search functionality
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const goalCards = document.querySelectorAll('.goal-card');
      
      goalCards.forEach(card => {
        const goalName = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const goalText = card.textContent.toLowerCase();
        
        if (goalName.includes(searchTerm) || goalText.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Notification button
  const notificationBtn = document.querySelector('.notification-btn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
      alert('Notifications - Coming soon!');
    });
  }

  // Logout button
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = '/auth/logout';
      }
    });
  }

  // Animate progress bars
  const progressBars = document.querySelectorAll('.progress-fill');
  progressBars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 300);
  });

  // Goal Name and Target Amount buttons
  const actionBtns = document.querySelectorAll('.btn-outline');
  actionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.textContent.trim();
      alert(`${action} filter - Coming soon!`);
    });
  });

  // View profile link
  const viewProfileLink = document.querySelector('.view-profile');
  if (viewProfileLink) {
    viewProfileLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '/profile';
    });
  }

  // Add hover effects
  const goalCards = document.querySelectorAll('.goal-card');
  goalCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Expenses Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  initializePeriodSelector();
  initializeFilterButton();
  initializeExportButton();
  initializeCategoryItems();
  setupLogout();
});

// Period Selector (Week, Month, Year)
function initializePeriodSelector() {
  const periodButtons = document.querySelectorAll('.period-btn');
  
  periodButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      periodButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get selected period
      const period = this.dataset.period;
      
      // Update expenses display
      updateExpensesByPeriod(period);
    });
  });
}

// Update Expenses by Period
function updateExpensesByPeriod(period) {
  console.log(`Updating expenses for period: ${period}`);
  
  // In a real app, this would fetch data from the server
  // For now, we'll just show a loading state and refresh
  
  showLoadingState();
  
  // Simulate API call
  setTimeout(() => {
    hideLoadingState();
    // In production, update the DOM with new data
  }, 300);
}

// Filter Button
function initializeFilterButton() {
  const filterBtn = document.querySelector('.btn-filter');
  
  if (filterBtn) {
    filterBtn.addEventListener('click', function() {
      showFilterModal();
    });
  }
}

// Show Filter Modal (placeholder)
function showFilterModal() {
  // Create a simple modal for filtering
  const modal = document.createElement('div');
  modal.className = 'filter-modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>Filter Expenses</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="filter-group">
          <label>Date Range</label>
          <select class="filter-select">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>This year</option>
            <option>Custom</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Category</label>
          <select class="filter-select">
            <option value="">All Categories</option>
            <option value="food">Food & Dining</option>
            <option value="transport">Transportation</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
            <option value="bills">Bills & Utilities</option>
            <option value="health">Health & Fitness</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Amount Range</label>
          <input type="number" placeholder="Min amount" class="filter-input">
          <input type="number" placeholder="Max amount" class="filter-input">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-secondary modal-cancel">Cancel</button>
        <button class="btn-primary modal-apply">Apply Filters</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add styles for modal
  addModalStyles();
  
  // Close handlers
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.remove();
  });
  
  modal.querySelector('.modal-cancel').addEventListener('click', () => {
    modal.remove();
  });
  
  modal.querySelector('.modal-overlay').addEventListener('click', () => {
    modal.remove();
  });
  
  modal.querySelector('.modal-apply').addEventListener('click', () => {
    applyFilters(modal);
    modal.remove();
  });
}

// Apply Filters
function applyFilters(modal) {
  // Get filter values
  const dateRange = modal.querySelector('.filter-select').value;
  const category = modal.querySelectorAll('.filter-select')[1].value;
  const minAmount = modal.querySelectorAll('.filter-input')[0].value;
  const maxAmount = modal.querySelectorAll('.filter-input')[1].value;
  
  console.log('Applying filters:', { dateRange, category, minAmount, maxAmount });
  
  // In production, send these to the server and refresh the page
  // For now, just log them
}

// Export Button
function initializeExportButton() {
  const exportBtn = document.querySelector('.btn-export');
  
  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      exportExpenses();
    });
  }
}

// Export Expenses to CSV
function exportExpenses() {
  console.log('Exporting expenses...');
  
  // Get all transactions from the table
  const rows = document.querySelectorAll('tbody tr');
  
  if (rows.length === 0) {
    alert('No expenses to export');
    return;
  }
  
  // CSV headers
  let csv = 'Description,Category,Date,Amount\n';
  
  // Add rows
  rows.forEach(row => {
    const cols = row.querySelectorAll('td');
    if (cols.length >= 4) {
      const description = cols[0].textContent.trim();
      const category = cols[1].textContent.trim();
      const date = cols[2].textContent.trim();
      const amount = cols[3].textContent.trim();
      
      csv += `"${description}","${category}","${date}","${amount}"\n`;
    }
  });
  
  // Create download link
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  console.log('Export completed');
}

// Category Items Click Handler
function initializeCategoryItems() {
  const categoryItems = document.querySelectorAll('.category-item');
  
  categoryItems.forEach(item => {
    item.addEventListener('click', function() {
      const categoryName = this.querySelector('.category-name').textContent;
      console.log(`Viewing category: ${categoryName}`);
      
      // In production, filter transactions by this category
      filterByCategory(categoryName);
    });
  });
}

// Filter by Category
function filterByCategory(category) {
  const rows = document.querySelectorAll('tbody tr');
  
  rows.forEach(row => {
    const categoryCell = row.querySelector('.category-badge');
    if (categoryCell) {
      const rowCategory = categoryCell.textContent.trim().toLowerCase();
      const targetCategory = category.toLowerCase();
      
      if (rowCategory.includes(targetCategory) || targetCategory.includes(rowCategory)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  });
  
  // Update page title
  const pageTitle = document.querySelector('.page-title');
  if (pageTitle) {
    pageTitle.textContent = `Expenses - ${category}`;
  }
  
  // Add reset filter button
  addResetFilterButton();
}

// Add Reset Filter Button
function addResetFilterButton() {
  // Check if button already exists
  if (document.querySelector('.btn-reset-filter')) return;
  
  const headerActions = document.querySelector('.header-actions');
  if (headerActions) {
    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn-reset-filter';
    resetBtn.innerHTML = `
      <span class="material-icons-round">clear</span>
      <span>Clear Filter</span>
    `;
    
    // Style the button
    resetBtn.style.cssText = `
      padding: 12px 20px;
      border-radius: 12px;
      border: 2px solid white;
      background: white;
      color: #f56565;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    `;
    
    resetBtn.addEventListener('click', function() {
      resetFilters();
    });
    
    headerActions.insertBefore(resetBtn, headerActions.firstChild);
  }
}

// Reset Filters
function resetFilters() {
  // Show all rows
  const rows = document.querySelectorAll('tbody tr');
  rows.forEach(row => {
    row.style.display = '';
  });
  
  // Reset page title
  const pageTitle = document.querySelector('.page-title');
  if (pageTitle) {
    pageTitle.textContent = 'Expenses';
  }
  
  // Remove reset button
  const resetBtn = document.querySelector('.btn-reset-filter');
  if (resetBtn) {
    resetBtn.remove();
  }
}

// Loading State
function showLoadingState() {
  const card = document.querySelector('.card');
  if (card) {
    card.style.opacity = '0.5';
    card.style.pointerEvents = 'none';
  }
}

function hideLoadingState() {
  const card = document.querySelector('.card');
  if (card) {
    card.style.opacity = '1';
    card.style.pointerEvents = 'auto';
  }
}

// Add Modal Styles
function addModalStyles() {
  if (document.getElementById('modal-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'modal-styles';
  style.textContent = `
    .filter-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
    }
    
    .modal-content {
      position: relative;
      background: white;
      border-radius: 20px;
      padding: 32px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.3s ease;
    }
    
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #f0f0f0;
    }
    
    .modal-header h3 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #2d3748;
    }
    
    .modal-close {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: none;
      background: #f7fafc;
      color: #718096;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    
    .modal-close:hover {
      background: #edf2f7;
      color: #2d3748;
    }
    
    .modal-body {
      margin-bottom: 24px;
    }
    
    .filter-group {
      margin-bottom: 20px;
    }
    
    .filter-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #2d3748;
      font-size: 14px;
    }
    
    .filter-select,
    .filter-input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 15px;
      color: #2d3748;
      transition: all 0.2s ease;
      margin-bottom: 8px;
    }
    
    .filter-select:focus,
    .filter-input:focus {
      outline: none;
      border-color: #4A90E2;
    }
    
    .modal-footer {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }
    
    .btn-secondary,
    .btn-primary {
      padding: 12px 24px;
      border-radius: 12px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .btn-secondary {
      background: #f7fafc;
      color: #718096;
    }
    
    .btn-secondary:hover {
      background: #edf2f7;
      color: #2d3748;
    }
    
    .btn-primary {
      background: #4A90E2;
      color: white;
    }
    
    .btn-primary:hover {
      background: #357ABD;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
    }
  `;
  
  document.head.appendChild(style);
}

// Logout Functionality
function setupLogout() {
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = '/auth/logout';
      }
    });
  }
}

// Format Currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Format Date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Handle select all checkbox
  const selectAllCheckbox = document.querySelector('.select-all');
  const rowCheckboxes = document.querySelectorAll('.transaction-row input[type="checkbox"]');

  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', (e) => {
      rowCheckboxes.forEach(checkbox => {
        checkbox.checked = e.target.checked;
      });
    });
  }

  // Handle individual row checkboxes
  rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
      const someChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
      
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = allChecked;
        selectAllCheckbox.indeterminate = someChecked && !allChecked;
      }
    });
  });

  // Handle menu button clicks
  document.querySelectorAll('.btn-menu').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('Transaction menu clicked');
      // Add dropdown menu logic here
    });
  });

  // Handle filter button
  const filterBtn = document.querySelector('.btn-action:has(.material-icons-round)');
  if (filterBtn && filterBtn.textContent.includes('Filter')) {
    filterBtn.addEventListener('click', () => {
      console.log('Filter clicked');
      // Add filter modal logic here
    });
  }

  // Handle export button
  const exportBtn = Array.from(document.querySelectorAll('.btn-action')).find(btn => 
    btn.textContent.includes('Export')
  );
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      window.location.href = '/export/transactions.csv';
    });
  }

  // Handle create payment button
  const createBtn = document.querySelector('.btn-create');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      console.log('Create payment clicked');
      // Add create payment modal logic here
    });
  }

  // Add fade-in animation for rows
  document.querySelectorAll('.transaction-row').forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateY(10px)';
    setTimeout(() => {
      row.style.transition = 'all 0.3s ease';
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    }, index * 30);
  });
});

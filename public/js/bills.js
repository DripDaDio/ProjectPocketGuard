document.addEventListener('DOMContentLoaded', () => {
  // Handle select all checkbox
  const selectAllCheckbox = document.querySelector('.select-all');
  const rowCheckboxes = document.querySelectorAll('.bill-row input[type="checkbox"]');

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

  // Handle pay button clicks
  document.querySelectorAll('.btn-pay:not(.btn-pay-disabled)').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('.bill-row');
      const invoiceNumber = row.querySelector('.invoice-number').textContent;
      
      if (confirm(`Proceed to pay invoice ${invoiceNumber}?`)) {
        // Add payment logic here
        const badge = row.querySelector('.badge');
        badge.classList.remove('badge-unpaid');
        badge.classList.add('badge-paid');
        badge.textContent = 'Paid';
        
        e.target.classList.add('btn-pay-disabled');
        e.target.disabled = true;
      }
    });
  });

  // Handle add button
  const addBtn = document.querySelector('.btn-add');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      console.log('Add new bill');
      // Add modal or redirect logic here
    });
  }

  // Handle download PDF button
  const downloadBtn = Array.from(document.querySelectorAll('.btn-action')).find(btn => 
    btn.textContent.includes('Download PDF Report')
  );
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      console.log('Downloading bills report...');
      // Redirect to server endpoint to download the report
      window.location.href = '/export/bills-report.pdf';
    });
  }

  // Handle filter button
  const filterBtn = document.querySelector('.btn-filter');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      console.log('Open filter');
      // Add filter modal logic here
    });
  }

  // Handle search inputs
  const searchInputs = document.querySelectorAll('input[type="text"]');
  searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      document.querySelectorAll('.bill-row').forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // Add fade-in animation for rows
  document.querySelectorAll('.bill-row').forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateY(10px)';
    setTimeout(() => {
      row.style.transition = 'all 0.3s ease';
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    }, index * 50);
  });
});

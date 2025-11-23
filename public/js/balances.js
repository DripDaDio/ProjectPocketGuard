document.addEventListener('DOMContentLoaded', () => {
  // Modal elements
  const modal = document.getElementById('addAccountModal');
  const addBtn = document.querySelector('.btn-add-account');
  const closeBtn = document.querySelector('.btn-close-modal');
  const form = document.getElementById('addAccountForm');
  const randomizeBtn = document.querySelector('.btn-randomize');

  // Open modal
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Close modal on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Randomize form data
  if (randomizeBtn) {
    randomizeBtn.addEventListener('click', () => {
      const banks = ['Chase Bank', 'Bank of America', 'Wells Fargo', 'Citibank', 'Capital One'];
      const accountNames = ['Everyday Checking', 'High-Yield Savings', 'Rewards Card', 'Travel Card', 'Premier Checking'];
      const types = ['CHECKING', 'SAVINGS', 'CREDIT', 'INVESTMENT', 'LOAN'];
      
      const pick = arr => arr[Math.floor(Math.random() * arr.length)];
      const selectedType = pick(types);
      
      document.getElementById('bankName').value = pick(banks);
      document.getElementById('accountName').value = pick(accountNames);
      document.getElementById('accountType').value = selectedType;
      document.getElementById('last4').value = String(Math.floor(1000 + Math.random() * 9000));
      
      const balance = selectedType === 'CREDIT' || selectedType === 'LOAN' 
        ? -(Math.random() * 5000).toFixed(2) 
        : (Math.random() * 10000).toFixed(2);
      document.getElementById('currentBalance').value = balance;
    });
  }

  // Handle form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Send to server
      fetch('/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          alert('Account added successfully!');
          modal.classList.remove('active');
          form.reset();
          window.location.reload();
        } else {
          alert('Failed to add account. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
    });
  }

  // Handle remove button clicks
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (confirm('Are you sure you want to remove this account?')) {
        const card = e.target.closest('.account-card');
        card.style.opacity = '0';
        setTimeout(() => {
          card.remove();
        }, 300);
      }
    });
  });

  // Handle details button clicks
  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.account-card');
      
      // Extract account information from the card
      const accountType = card.querySelector('.account-type').textContent;
      const bankName = card.querySelector('.bank-name').textContent;
      const accountNumber = card.querySelector('.account-number').textContent;
      const balance = card.querySelector('.account-balance').textContent;
      
      // Get the icon from the card
      let iconName = 'credit_card';
      const cardIcon = card.querySelector('.card-logo .material-icons-round');
      if (cardIcon) {
        iconName = cardIcon.textContent;
      }
      
      // Populate the details modal
      document.getElementById('detailIcon').textContent = iconName;
      document.getElementById('detailType').textContent = accountType;
      document.getElementById('detailBank').textContent = bankName;
      document.getElementById('detailNumber').textContent = accountNumber;
      document.getElementById('detailBalance').textContent = balance;
      
      // Show the details modal
      const detailsModal = document.getElementById('accountDetailsModal');
      detailsModal.classList.add('active');
    });
  });

  // Close details modal
  const closeDetailsBtn = document.querySelector('.btn-close-details');
  const detailsModal = document.getElementById('accountDetailsModal');
  
  if (closeDetailsBtn) {
    closeDetailsBtn.addEventListener('click', () => {
      detailsModal.classList.remove('active');
    });
  }
  
  // Close details modal on overlay click
  if (detailsModal) {
    detailsModal.addEventListener('click', (e) => {
      if (e.target === detailsModal) {
        detailsModal.classList.remove('active');
      }
    });
  }
  
  // Handle view transactions button in details modal
  const viewTransactionsBtn = document.querySelector('.btn-view-transactions');
  if (viewTransactionsBtn) {
    viewTransactionsBtn.addEventListener('click', () => {
      window.location.href = '/transactions';
    });
  }
  
  // Handle transfer button in details modal
  const transferBtn = document.querySelector('.btn-transfer');
  if (transferBtn) {
    transferBtn.addEventListener('click', () => {
      alert('Transfer feature coming soon!');
    });
  }

  // Handle edit accounts button
  const editBtn = document.querySelector('.btn-edit-accounts');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      document.querySelectorAll('.account-card').forEach(card => {
        if (!card.classList.contains('add-account')) {
          card.classList.toggle('edit-mode');
        }
      });
    });
  }

  // Add animation on load
  document.querySelectorAll('.account-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

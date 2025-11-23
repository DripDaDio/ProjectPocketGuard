document.addEventListener('DOMContentLoaded', () => {
  // Initialize Statistics Chart
  const ctx = document.getElementById('statsChart')?.getContext('2d');
  if (ctx) {
    const data = {
      labels: ['17 Sun', '18 Mon', '19 Tue', '20 Wed', '21 Thu', '22 Fri', '23 Sat'],
      datasets: [
        {
          label: 'This Week',
          data: [250000, 50000, 200000, 250000, 150000, 250000, 150000],
          backgroundColor: '#4CAF50',
          borderColor: '#4CAF50',
          borderWidth: 2
        },
        {
          label: 'Last Week',
          data: [200000, 100000, 250000, 200000, 180000, 180000, 100000],
          backgroundColor: '#2196F3',
          borderColor: '#2196F3',
          borderWidth: 2
        }
      ]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + (value/1000) + 'k';
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    };

    new Chart(ctx, config);
  }

  // Handle transaction tab clicks
  document.querySelectorAll('.transaction-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelector('.tab.active').classList.remove('active');
      tab.classList.add('active');
      // Add filtering logic here
    });
  });

  // Animate statistics loading
  document.querySelectorAll('.expense-item').forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

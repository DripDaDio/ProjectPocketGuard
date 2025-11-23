document.addEventListener('DOMContentLoaded', () => {
  // Card switching functionality
  const cardSlides = document.querySelectorAll('.card-slide');
  const navDots = document.querySelectorAll('.nav-dot');
  const prevBtn = document.querySelector('.prev-card');
  const nextBtn = document.querySelector('.next-card');
  let currentCardIndex = 0;
  
  function switchToCard(cardIndex) {
    // Ensure index is within bounds
    if (cardIndex < 0) cardIndex = cardSlides.length - 1;
    if (cardIndex >= cardSlides.length) cardIndex = 0;
    
    currentCardIndex = cardIndex;
    
    // Update active dot
    navDots.forEach(d => d.classList.remove('active'));
    const activeDot = document.querySelector(`.nav-dot[data-card="${cardIndex}"]`);
    if (activeDot) activeDot.classList.add('active');
    
    // Update active card
    cardSlides.forEach(slide => slide.classList.remove('active'));
    const activeCard = document.querySelector(`.card-slide[data-card="${cardIndex}"]`);
    if (activeCard) {
      activeCard.classList.add('active');
    }
  }
  
  navDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const cardIndex = parseInt(dot.getAttribute('data-card'));
      switchToCard(cardIndex);
    });
  });
  
  // Arrow button navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      switchToCard(currentCardIndex - 1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      switchToCard(currentCardIndex + 1);
    });
  }

  // Statistics data
  const weeklyData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    thisWeek: [250, 450, 200, 350, 150, 400, 300],
    lastWeek: [200, 300, 350, 200, 280, 180, 250]
  };

  const monthlyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    thisMonth: [1200, 1800, 1500, 2100],
    lastMonth: [1000, 1400, 1600, 1300]
  };

  let currentPeriod = 'weekly';
  let statsChart = null;

  // Initialize Statistics Chart
  const ctx = document.getElementById('statsChart')?.getContext('2d');
  
  function createChart(period) {
    const data = period === 'weekly' ? weeklyData : monthlyData;
    const periodLabel = period === 'weekly' ? 'week' : 'month';
    
    // Update legend labels
    const thisLabel = document.querySelector('.legend-label');
    const lastLabel = document.querySelectorAll('.legend-label')[1];
    if (thisLabel) thisLabel.textContent = `This ${periodLabel}`;
    if (lastLabel) lastLabel.textContent = `Last ${periodLabel}`;
    
    const chartData = {
      labels: data.labels,
      datasets: [
        {
          label: `This ${periodLabel}`,
          data: period === 'weekly' ? data.thisWeek : data.thisMonth,
          backgroundColor: '#4CAF50',
          borderColor: '#4CAF50',
          borderWidth: 2,
          borderRadius: 6
        },
        {
          label: `Last ${periodLabel}`,
          data: period === 'weekly' ? data.lastWeek : data.lastMonth,
          backgroundColor: '#2196F3',
          borderColor: '#2196F3',
          borderWidth: 2,
          borderRadius: 6
        }
      ]
    };

    const config = {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '₹' + value + (period === 'monthly' ? 'k' : '');
              }
            },
            grid: {
              color: '#f0f0f0'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ₹' + context.parsed.y + (period === 'monthly' ? 'k' : '');
              }
            }
          }
        },
        barPercentage: 0.6,
        categoryPercentage: 0.7
      }
    };

    if (statsChart) {
      statsChart.destroy();
    }
    statsChart = new Chart(ctx, config);
  }

  if (ctx) {
    createChart('weekly');
  }

  // Handle stats toggle buttons
  document.querySelectorAll('.stats-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const period = btn.getAttribute('data-period');
      
      // Update active button
      document.querySelectorAll('.stats-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update chart
      currentPeriod = period;
      createChart(period);
    });
  });

  // Handle transaction tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelector('.tab.active')?.classList.remove('active');
      tab.classList.add('active');
    });
  });
});
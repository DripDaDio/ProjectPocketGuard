document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-text');
  const log = document.getElementById('chat-log');
  const resetBtn = document.getElementById('buddy-reset');
  const submitBtn = form?.querySelector('button[type="submit"]');

  function addBubble(text, isAi) {
    const div = document.createElement('div');
    div.className = `bubble ${isAi ? 'ai' : 'me'}`;
    
    // Format text with basic markdown-like features and preserve line breaks
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/\n/g, '<br>'); // Line breaks
    
    div.innerHTML = formattedText;
    log.appendChild(div);
    
    // Smooth scroll to bottom
    setTimeout(() => {
      log.scrollTo({
        top: log.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  }

  function clearChat() {
    if (log) log.innerHTML = '';
  }

  async function loadHistory() {
    try {
      const controller = new AbortController();
      const tm = setTimeout(() => controller.abort(), 10000);
      const res = await fetch('/api/buddy/history', { method: 'GET', signal: controller.signal });
      clearTimeout(tm);
      const data = await res.json();
      if (data && Array.isArray(data.history) && data.history.length) {
        // Render in order
        for (const h of data.history) {
          const role = (h && typeof h.role === 'string') ? h.role.toLowerCase() : 'user';
          const text = (h && typeof h.text === 'string') ? h.text : '';
          addBubble(text, role === 'assistant');
        }
      } else {
        // Show welcome message if no history
        setTimeout(() => {
          addBubble('👋 Hello! I\'m your Finance Buddy powered by AI. I can help you with:\n\n• Budget planning and expense tracking\n• Savings tips and investment advice\n• Understanding your spending patterns\n• Financial goal setting\n\nWhat would you like to know?', true);
        }, 500);
      }
    } catch (e) {
      // Silently ignore history load errors to avoid blocking UI
      console.error('Failed to load history:', e);
    }
  }

  // Load any existing chat history on page open
  loadHistory();

  if (form) form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = (input.value || '').trim();
    if (!msg) return;
    
    // Disable input during submission
    input.disabled = true;
    if (submitBtn) submitBtn.disabled = true;
    
    addBubble(msg, false);
    input.value = '';
    
    const loading = document.createElement('span');
    loading.className = 'spinner';
    form.appendChild(loading);
    
    try {
      const typing = document.querySelector('.typing-indicator');
      if (typing) typing.hidden = false;
      
      const controller = new AbortController();
      const tm = setTimeout(() => controller.abort(), 18000);
      
      const res = await fetch('/api/buddy', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ message: msg }), 
        signal: controller.signal 
      });
      
      clearTimeout(tm);
      
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      
      const data = await res.json();
      addBubble(data.reply || 'Sorry, I couldn\'t generate a response.', true);
      
    } catch (e) {
      console.error('Buddy chat error:', e);
      if (e.name === 'AbortError') {
        addBubble('Request timed out. Please try again with a shorter question.', true);
      } else {
        addBubble('Sorry, I couldn\'t respond right now. Please try again in a moment.', true);
      }
    } finally { 
      loading.remove(); 
      input.disabled = false;
      if (submitBtn) submitBtn.disabled = false;
      input.focus();
      const typing = document.querySelector('.typing-indicator'); 
      if (typing) typing.hidden = true; 
    }
  });

  if (resetBtn) resetBtn.addEventListener('click', async () => {
    if (!confirm('Are you sure you want to start a new chat? This will clear the current conversation.')) {
      return;
    }
    
    try {
      resetBtn.disabled = true;
      const controller = new AbortController();
      const tm = setTimeout(() => controller.abort(), 8000);
      
      await fetch('/api/buddy/reset', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        signal: controller.signal 
      });
      
      clearTimeout(tm);
      clearChat();
      
      // Add a welcome message after reset
      setTimeout(() => {
        addBubble('Hello! I\'m your Finance Buddy. How can I help you manage your finances today?', true);
      }, 300);
      
    } catch (e) {
      console.error('Reset error:', e);
      alert('Failed to reset chat. Please try again.');
    } finally {
      resetBtn.disabled = false;
    }
  });

  // Allow Enter to send, Shift+Enter for new line
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
      }
    });
  }

  // Add click handlers to suggestion cards
  const suggestionCards = document.querySelectorAll('.suggestion-card');
  suggestionCards.forEach(card => {
    card.addEventListener('click', () => {
      const question = card.querySelector('div').textContent.trim();
      input.value = question;
      form.dispatchEvent(new Event('submit'));
    });
  });
});

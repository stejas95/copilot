/**
 * UI Module - Handles all UI interactions and rendering
 * Provides utilities for creating UI elements and managing notifications
 */

const UI = (() => {
  /**
   * Show toast notification
   */
  const showToast = (message, type = 'success', duration = 3000) => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  };

  /**
   * Create mood selector HTML
   */
  const createMoodSelector = (selectedMood = '') => {
    const moods = ['happy', 'neutral', 'sad', 'angry', 'tired', 'excited'];
    const container = document.createElement('div');
    container.className = 'mood-selector';

    moods.forEach(mood => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `mood-btn ${selectedMood === mood ? 'selected' : ''}`;
      button.dataset.mood = mood;
      button.innerHTML = `
        <span class="mood-emoji">${Storage.getMoodEmoji(mood)}</span>
        <span class="mood-label">${Storage.getMoodLabel(mood)}</span>
      `;

      button.addEventListener('click', () => {
        // Remove selected class from all
        container.querySelectorAll('.mood-btn').forEach(btn => {
          btn.classList.remove('selected');
        });
        // Add selected class to clicked
        button.classList.add('selected');
      });

      container.appendChild(button);
    });

    return container;
  };

  /**
   * Create journal entry card
   */
  const createEntryCard = (journal) => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.dataset.id = journal.id;

    const dateObj = new Date(journal.date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const preview = journal.text.substring(0, 100) + (journal.text.length > 100 ? '...' : '');

    card.innerHTML = `
      <div class="entry-header">
        <div class="entry-date">${formattedDate}</div>
        <div class="entry-mood">
          <span class="mood-emoji">${Storage.getMoodEmoji(journal.mood)}</span>
          <span class="mood-name">${Storage.getMoodLabel(journal.mood)}</span>
        </div>
      </div>
      <div class="entry-text">${escapeHtml(preview)}</div>
      <div class="entry-actions">
        <button class="btn-view" title="Expand">
          <span>📖</span> View
        </button>
        <button class="btn-edit" title="Edit">
          <span>✏️</span> Edit
        </button>
        <button class="btn-delete" title="Delete">
          <span>🗑️</span> Delete
        </button>
      </div>
    `;

    return card;
  };

  /**
   * Create expanded journal view modal
   */
  const createExpandedView = (journal) => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.dataset.id = journal.id;

    const dateObj = new Date(journal.date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close">✕</button>
        <div class="modal-header">
          <h2>${formattedDate}</h2>
          <div class="mood-badge">
            <span class="mood-emoji">${Storage.getMoodEmoji(journal.mood)}</span>
            <span>${Storage.getMoodLabel(journal.mood)}</span>
          </div>
        </div>
        <div class="modal-body">
          <p>${escapeHtml(journal.text).replace(/\n/g, '<br>')}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary modal-btn-edit">Edit Entry</button>
          <button class="btn btn-danger modal-btn-delete">Delete Entry</button>
        </div>
      </div>
    `;

    // Close modal events
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    const closeModal = () => modal.remove();

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Handle keyboard close
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleKeydown);
      }
    };
    document.addEventListener('keydown', handleKeydown);

    return modal;
  };

  /**
   * Escape HTML special characters
   */
  const escapeHtml = (text) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  };

  /**
   * Format date input to display format
   */
  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  /**
   * Toggle dark mode
   */
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
  };

  /**
   * Load dark mode preference
   */
  const loadDarkModePreference = () => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
    }
  };

  /**
   * Create mood chart visualization
   */
  const createMoodChart = () => {
    const stats = Storage.getMoodStats();
    const container = document.createElement('div');
    container.className = 'mood-chart';

    if (Object.keys(stats).length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No entries yet</p>';
      return container;
    }

    const maxCount = Math.max(...Object.values(stats));

    Object.keys(stats).forEach(mood => {
      const count = stats[mood];
      const percentage = (count / maxCount) * 100;

      const bar = document.createElement('div');
      bar.className = 'chart-bar';

      bar.innerHTML = `
        <div class="bar-label">
          <span class="emoji">${Storage.getMoodEmoji(mood)}</span>
          <span class="name">${Storage.getMoodLabel(mood)}</span>
        </div>
        <div class="bar-container">
          <div class="bar-fill" style="width: ${percentage}%"></div>
        </div>
        <div class="bar-count">${count}</div>
      `;

      container.appendChild(bar);
    });

    return container;
  };

  /**
   * Validate date input
   */
  const validateDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  /**
   * Get selected mood from mood selector
   */
  const getSelectedMood = (container) => {
    const selected = container.querySelector('.mood-btn.selected');
    return selected ? selected.dataset.mood : null;
  };

  /**
   * Clear all modals
   */
  const closeAllModals = () => {
    document.querySelectorAll('.modal').forEach(modal => modal.remove());
  };

  return {
    showToast,
    createMoodSelector,
    createEntryCard,
    createExpandedView,
    escapeHtml,
    formatDisplayDate,
    toggleDarkMode,
    loadDarkModePreference,
    createMoodChart,
    validateDate,
    getSelectedMood,
    closeAllModals
  };
})();

// Load dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
  UI.loadDarkModePreference();
});

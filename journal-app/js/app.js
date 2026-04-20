/**
 * Main App Module - Initializes the application
 * Handles page-specific logic and event delegation
 */

const App = (() => {
  /**
   * Initialize the app based on current page
   */
  const init = () => {
    const currentPage = document.body.dataset.page;

    // Setup dark mode toggle on all pages
    setupDarkModeToggle();

    // Initialize page-specific functionality
    switch (currentPage) {
      case 'home':
        initHomePage();
        break;
      case 'journal':
        initJournalPage();
        break;
      case 'add':
        initAddPage();
        break;
    }
  };

  /**
   * Setup dark mode toggle button
   */
  const setupDarkModeToggle = () => {
    const darkModeBtn = document.querySelector('.dark-mode-toggle');
    if (darkModeBtn) {
      darkModeBtn.addEventListener('click', () => {
        UI.toggleDarkMode();
      });
    }
  };

  /**
   * Initialize Home Page
   */
  const initHomePage = () => {
    renderStats();
    renderTodayEntry();
  };

  /**
   * Render statistics on home page
   */
  const renderStats = () => {
    const statsContainer = document.querySelector('.stats-container');
    if (!statsContainer) return;

    const totalEntries = Storage.getTotalEntries();
    const weeklyEntries = Storage.getWeeklyEntries();
    const mostFrequentMood = Storage.getMostFrequentMood();

    const mostFrequentMoodEmoji = mostFrequentMood ? Storage.getMoodEmoji(mostFrequentMood) : '—';
    const mostFrequentMoodLabel = mostFrequentMood ? Storage.getMoodLabel(mostFrequentMood) : 'N/A';

    statsContainer.innerHTML = `
      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-content">
          <div class="stat-value">${totalEntries}</div>
          <div class="stat-label">Total Entries</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <div class="stat-value">${weeklyEntries.length}</div>
          <div class="stat-label">This Week</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">${mostFrequentMoodEmoji}</div>
        <div class="stat-content">
          <div class="stat-value">${mostFrequentMoodLabel}</div>
          <div class="stat-label">Most Frequent</div>
        </div>
      </div>
    `;
  };

  /**
   * Render today's entry or create form
   */
  const renderTodayEntry = () => {
    const todayContainer = document.querySelector('.today-entry-container');
    if (!todayContainer) return;

    const todayEntry = Storage.getTodayEntry();

    if (todayEntry) {
      // Show existing entry with edit option
      todayContainer.innerHTML = `
        <div class="today-card">
          <h3>Today's Entry</h3>
          <div class="today-mood">
            <span class="emoji">${Storage.getMoodEmoji(todayEntry.mood)}</span>
            <span>${Storage.getMoodLabel(todayEntry.mood)}</span>
          </div>
          <p class="today-text">${UI.escapeHtml(todayEntry.text).substring(0, 150)}...</p>
          <a href="journal.html" class="btn btn-primary">View All Entries</a>
          <a href="add.html?edit=${todayEntry.id}" class="btn btn-secondary">Edit Entry</a>
        </div>
      `;
    } else {
      // Show form to add today's entry
      todayContainer.innerHTML = `
        <div class="today-card">
          <h3>📝 Add Today's Journal</h3>
          <div class="quick-entry-form">
            <div class="quick-mood-selector"></div>
            <textarea id="quickText" class="quick-textarea" placeholder="How was your day?"></textarea>
            <button id="btnQuickSave" class="btn btn-primary">Save Today's Entry</button>
          </div>
        </div>
      `;

      // Setup quick entry form
      const moodSelector = document.querySelector('.quick-mood-selector');
      const quickText = document.getElementById('quickText');
      const btnQuickSave = document.getElementById('btnQuickSave');

      const moodContainer = UI.createMoodSelector('happy');
      moodSelector.appendChild(moodContainer);

      btnQuickSave.addEventListener('click', () => {
        const selectedMood = UI.getSelectedMood(moodContainer);
        const text = quickText.value;

        if (!selectedMood) {
          UI.showToast('Please select a mood', 'error');
          return;
        }

        if (!text.trim()) {
          UI.showToast('Please enter some text', 'error');
          return;
        }

        try {
          Storage.saveJournal(Storage.getTodayDate(), selectedMood, text);
          UI.showToast('✓ Journal saved for today!', 'success');
          setTimeout(() => location.reload(), 1500);
        } catch (error) {
          UI.showToast(error.message, 'error');
        }
      });
    }
  };

  /**
   * Initialize Journal Page
   */
  const initJournalPage = () => {
    renderEntries();
    setupFiltersAndSearch();
  };

  /**
   * Render journal entries
   */
  const renderEntries = (entries = null) => {
    const container = document.querySelector('.entries-container');
    if (!container) return;

    const journalsToDisplay = entries || Storage.getAllJournals();

    if (journalsToDisplay.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📓</div>
          <h3>No Entries Yet</h3>
          <p>Start journaling by creating your first entry!</p>
          <a href="add.html" class="btn btn-primary">Create Entry</a>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    journalsToDisplay.forEach(journal => {
      const card = UI.createEntryCard(journal);
      container.appendChild(card);
      attachEntryCardEvents(card);
    });
  };

  /**
   * Attach events to entry cards
   */
  const attachEntryCardEvents = (card) => {
    const journal = Storage.getJournalById(card.dataset.id);
    
    card.querySelector('.btn-view').addEventListener('click', () => {
      showExpandedView(journal);
    });

    card.querySelector('.btn-edit').addEventListener('click', () => {
      window.location.href = `add.html?edit=${journal.id}`;
    });

    card.querySelector('.btn-delete').addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this entry?')) {
        Storage.deleteJournal(journal.id);
        UI.showToast('Entry deleted', 'success');
        card.remove();
        renderEntries();
      }
    });
  };

  /**
   * Show expanded view modal
   */
  const showExpandedView = (journal) => {
    UI.closeAllModals();
    const modal = UI.createExpandedView(journal);
    document.body.appendChild(modal);

    modal.querySelector('.modal-btn-edit').addEventListener('click', () => {
      window.location.href = `add.html?edit=${journal.id}`;
    });

    modal.querySelector('.modal-btn-delete').addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this entry?')) {
        Storage.deleteJournal(journal.id);
        UI.showToast('Entry deleted', 'success');
        modal.remove();
        renderEntries();
      }
    });
  };

  /**
   * Setup filters and search
   */
  const setupFiltersAndSearch = () => {
    const searchInput = document.querySelector('.search-input');
    const filters = document.querySelectorAll('.filter-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const results = Storage.searchJournals(e.target.value);
        renderEntries(results);
      });
    }

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        const mood = filter.dataset.mood;
        if (mood === 'all') {
          renderEntries();
        } else {
          const filtered = Storage.getJournalsByMood(mood);
          renderEntries(filtered);
        }
      });
    });
  };

  /**
   * Initialize Add Page
   */
  const initAddPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');

    renderMoodChart();

    if (editId) {
      loadEntryForEdit(editId);
    } else {
      setupNewEntryForm();
    }
  };

  /**
   * Load entry for editing
   */
  const loadEntryForEdit = (id) => {
    const entry = Storage.getJournalById(id);
    if (!entry) {
      UI.showToast('Entry not found', 'error');
      setTimeout(() => window.location.href = 'journal.html', 1500);
      return;
    }

    document.querySelector('h1').textContent = 'Edit Journal Entry';
    const dateInput = document.getElementById('entryDate');
    const textArea = document.getElementById('entryText');
    const submitBtn = document.querySelector('.btn-submit');
    const moodContainer = document.querySelector('.mood-selector-container');

    dateInput.value = entry.date;
    textArea.value = entry.text;

    // Setup mood selector with selected mood
    const moodSelector = UI.createMoodSelector(entry.mood);
    moodContainer.appendChild(moodSelector);

    submitBtn.textContent = 'Update Entry';
    submitBtn.addEventListener('click', () => {
      handleEditSubmit(id, dateInput, moodSelector, textArea);
    });
  };

  /**
   * Handle edit form submission
   */
  const handleEditSubmit = (id, dateInput, moodSelector, textArea) => {
    const date = dateInput.value;
    const mood = UI.getSelectedMood(moodSelector);
    const text = textArea.value;

    if (!date || !mood || !text.trim()) {
      UI.showToast('All fields are required', 'error');
      return;
    }

    try {
      Storage.updateJournal(id, date, mood, text);
      UI.showToast('✓ Entry updated!', 'success');
      setTimeout(() => window.location.href = 'journal.html', 1500);
    } catch (error) {
      UI.showToast(error.message, 'error');
    }
  };

  /**
   * Setup new entry form
   */
  const setupNewEntryForm = () => {
    const dateInput = document.getElementById('entryDate');
    const textArea = document.getElementById('entryText');
    const submitBtn = document.querySelector('.btn-submit');
    const moodContainer = document.querySelector('.mood-selector-container');

    dateInput.value = Storage.getTodayDate();

    const moodSelector = UI.createMoodSelector('happy');
    moodContainer.appendChild(moodSelector);

    submitBtn.addEventListener('click', () => {
      handleNewSubmit(dateInput, moodSelector, textArea);
    });
  };

  /**
   * Handle new entry form submission
   */
  const handleNewSubmit = (dateInput, moodSelector, textArea) => {
    const date = dateInput.value;
    const mood = UI.getSelectedMood(moodSelector);
    const text = textArea.value;

    if (!date || !mood || !text.trim()) {
      UI.showToast('All fields are required', 'error');
      return;
    }

    if (!UI.validateDate(date)) {
      UI.showToast('Invalid date', 'error');
      return;
    }

    try {
      Storage.saveJournal(date, mood, text);
      UI.showToast('✓ Entry saved!', 'success');
      setTimeout(() => window.location.href = 'journal.html', 1500);
    } catch (error) {
      UI.showToast(error.message, 'error');
    }
  };

  /**
   * Render mood chart on add page
   */
  const renderMoodChart = () => {
    const chartContainer = document.querySelector('.mood-chart-container');
    if (chartContainer) {
      const chart = UI.createMoodChart();
      chartContainer.appendChild(chart);
    }
  };

  return {
    init
  };
})();

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

/**
 * Storage Module - Handles all Local Storage operations
 * Provides functions to save, retrieve, update, and delete journal entries
 */

const Storage = (() => {
  const STORAGE_KEY = 'journals';
  const MOOD_MAP = {
    happy: '😊',
    neutral: '😐',
    sad: '😢',
    angry: '😡',
    tired: '😴',
    excited: '🤩'
  };

  /**
   * Initialize storage with sample data if empty (for demo purposes)
   */
  const init = () => {
    if (!getAllJournals()) {
      const sampleData = [
        {
          id: generateId(),
          date: formatDate(new Date(Date.now() - 86400000)),
          mood: 'happy',
          text: 'Yesterday was a great day! Had a productive meeting and spent time with friends.'
        },
        {
          id: generateId(),
          date: formatDate(new Date(Date.now() - 172800000)),
          mood: 'excited',
          text: 'Started a new project today. Really excited about the possibilities!'
        },
        {
          id: generateId(),
          date: formatDate(new Date(Date.now() - 259200000)),
          mood: 'tired',
          text: 'Long day at work. Need some rest and relaxation.'
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
    }
  };

  /**
   * Generate unique ID
   */
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  /**
   * Format date to YYYY-MM-DD
   */
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /**
   * Get all journals from storage
   */
  const getAllJournals = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading journals:', error);
      return [];
    }
  };

  /**
   * Get journal by date
   */
  const getJournalByDate = (date) => {
    const journals = getAllJournals();
    return journals.find(j => j.date === date);
  };

  /**
   * Get journal by ID
   */
  const getJournalById = (id) => {
    const journals = getAllJournals();
    return journals.find(j => j.id === id);
  };

  /**
   * Save new journal entry
   */
  const saveJournal = (date, mood, text) => {
    if (!date || !mood || !text.trim()) {
      throw new Error('All fields are required');
    }

    const journals = getAllJournals();
    
    // Check if entry exists for this date
    const existingIndex = journals.findIndex(j => j.date === date);
    if (existingIndex !== -1) {
      throw new Error('Entry already exists for this date. Please edit the existing entry.');
    }

    const newJournal = {
      id: generateId(),
      date: date,
      mood: mood,
      text: text.trim()
    };

    journals.push(newJournal);
    journals.sort((a, b) => new Date(b.date) - new Date(a.date));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(journals));
    
    return newJournal;
  };

  /**
   * Update existing journal entry
   */
  const updateJournal = (id, date, mood, text) => {
    if (!date || !mood || !text.trim()) {
      throw new Error('All fields are required');
    }

    const journals = getAllJournals();
    const index = journals.findIndex(j => j.id === id);

    if (index === -1) {
      throw new Error('Journal entry not found');
    }

    // Check if another entry exists for the new date
    if (journals[index].date !== date) {
      const dateExists = journals.some(j => j.date === date && j.id !== id);
      if (dateExists) {
        throw new Error('An entry already exists for this date');
      }
    }

    journals[index] = {
      id: id,
      date: date,
      mood: mood,
      text: text.trim()
    };

    journals.sort((a, b) => new Date(b.date) - new Date(a.date));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(journals));
    
    return journals[index];
  };

  /**
   * Delete journal entry by ID
   */
  const deleteJournal = (id) => {
    let journals = getAllJournals();
    journals = journals.filter(j => j.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(journals));
  };

  /**
   * Get journals by mood
   */
  const getJournalsByMood = (mood) => {
    const journals = getAllJournals();
    return journals.filter(j => j.mood === mood);
  };

  /**
   * Get journals by date range
   */
  const getJournalsByDateRange = (startDate, endDate) => {
    const journals = getAllJournals();
    return journals.filter(j => {
      return j.date >= startDate && j.date <= endDate;
    });
  };

  /**
   * Search journals by text
   */
  const searchJournals = (query) => {
    const journals = getAllJournals();
    const lowerQuery = query.toLowerCase();
    return journals.filter(j =>
      j.text.toLowerCase().includes(lowerQuery) ||
      j.date.includes(query)
    );
  };

  /**
   * Get mood statistics
   */
  const getMoodStats = () => {
    const journals = getAllJournals();
    const stats = {};

    journals.forEach(j => {
      stats[j.mood] = (stats[j.mood] || 0) + 1;
    });

    return stats;
  };

  /**
   * Get total entries
   */
  const getTotalEntries = () => {
    return getAllJournals().length;
  };

  /**
   * Get entries for this week
   */
  const getWeeklyEntries = () => {
    const journals = getAllJournals();
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return journals.filter(j => {
      const entryDate = new Date(j.date);
      return entryDate >= weekAgo && entryDate <= today;
    });
  };

  /**
   * Get most frequent mood
   */
  const getMostFrequentMood = () => {
    const stats = getMoodStats();
    if (Object.keys(stats).length === 0) return null;
    
    return Object.keys(stats).reduce((a, b) => 
      stats[a] > stats[b] ? a : b
    );
  };

  /**
   * Get mood emoji
   */
  const getMoodEmoji = (mood) => {
    return MOOD_MAP[mood] || '😐';
  };

  /**
   * Get mood label
   */
  const getMoodLabel = (mood) => {
    const labels = {
      happy: 'Happy',
      neutral: 'Neutral',
      sad: 'Sad',
      angry: 'Angry',
      tired: 'Tired',
      excited: 'Excited'
    };
    return labels[mood] || 'Unknown';
  };

  /**
   * Get today's date formatted
   */
  const getTodayDate = () => {
    return formatDate(new Date());
  };

  /**
   * Get today's entry
   */
  const getTodayEntry = () => {
    return getJournalByDate(getTodayDate());
  };

  /**
   * Clear all journals (for testing)
   */
  const clearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    init,
    generateId,
    formatDate,
    getAllJournals,
    getJournalByDate,
    getJournalById,
    saveJournal,
    updateJournal,
    deleteJournal,
    getJournalsByMood,
    getJournalsByDateRange,
    searchJournals,
    getMoodStats,
    getTotalEntries,
    getWeeklyEntries,
    getMostFrequentMood,
    getMoodEmoji,
    getMoodLabel,
    getTodayDate,
    getTodayEntry,
    clearAll,
    MOOD_MAP
  };
})();

// Initialize storage on load
document.addEventListener('DOMContentLoaded', () => {
  Storage.init();
});

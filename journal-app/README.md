# 📔 Daily Journal with Mood Tracker

A modern, fully-functional web application for journaling with mood tracking. Built with vanilla HTML, CSS, and JavaScript with persistent Local Storage.

## 🎯 Features

### Core Features
- ✍️ **Journal Entries** - Create, edit, and delete journal entries
- 😊 **Mood Tracking** - Track your mood with 6 different mood options
- 📊 **Statistics** - View total entries, weekly entries, and most frequent mood
- 🔍 **Search & Filter** - Search by text or filter by mood
- 💾 **Persistent Storage** - All data stored in Local Storage
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Fully responsive on desktop, tablet, and mobile
- 🔔 **Toast Notifications** - User feedback on all actions
- 🎨 **Modern UI** - Clean, polished interface inspired by Notion and Google Keep

### Mood Tracking Options
- 😊 Happy
- 😐 Neutral
- 😢 Sad
- 😡 Angry
- 😴 Tired
- 🤩 Excited

## 📁 Project Structure

```
journal-app/
├── index.html              # Home page
├── journal.html            # My Journal page
├── add.html                # Add/Edit entry page
├── css/
│   └── styles.css         # Complete styling (responsive)
├── js/
│   ├── storage.js         # Local Storage management
│   ├── ui.js              # UI components and utilities
│   └── app.js             # Main app logic
└── assets/                # Placeholder for images/icons
```

## 🚀 Getting Started

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. No installation or build process required!

### Usage
1. **Home Page** - View quick stats and add today's entry
2. **Add Entry** - Click "Add Entry" to create a new journal entry
3. **My Journal** - View all entries, search, and filter by mood
4. **Dark Mode** - Toggle dark mode with the moon icon in navbar

## 💾 Data Storage

All data is stored in browser's Local Storage in JSON format:

```json
{
  "journals": [
    {
      "id": "unique_timestamp_id",
      "date": "2024-04-18",
      "mood": "happy",
      "text": "Today was a great day!"
    }
  ]
}
```

### Storage Features
- Automatic duplicate date prevention
- Data persists across browser sessions
- Can be exported/imported (advanced usage)

## 🎨 Design Features

### Color Palette
- **Primary**: #5a67d8 (Indigo)
- **Happy**: #ffc107 (Amber)
- **Excited**: #ff6b6b (Red)
- **Neutral**: #6c757d (Gray)
- **Sad**: #17a2b8 (Teal)
- **Angry**: #dc3545 (Red)
- **Tired**: #7c3aed (Violet)

### Typography
- Font: Inter (from Google Fonts)
- Fallback: System fonts
- Responsive font sizes

### Layout
- Desktop-first responsive design
- Flexbox and CSS Grid
- Smooth transitions and animations
- Mobile optimized (480px+)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Variables
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Local Storage API** - Persistent data storage
- **Google Fonts** - Typography

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🔑 Key JavaScript Modules

### Storage Module (`storage.js`)
- `getAllJournals()` - Get all entries
- `saveJournal(date, mood, text)` - Save new entry
- `updateJournal(id, date, mood, text)` - Update existing entry
- `deleteJournal(id)` - Delete entry
- `searchJournals(query)` - Search entries
- `getJournalsByMood(mood)` - Filter by mood
- `getMoodStats()` - Get mood distribution
- `getTotalEntries()` - Get entry count
- `getMostFrequentMood()` - Get most common mood

### UI Module (`ui.js`)
- `showToast(message, type, duration)` - Show notifications
- `createMoodSelector()` - Create mood buttons
- `createEntryCard(journal)` - Create entry card
- `createExpandedView(journal)` - Create modal
- `createMoodChart()` - Create mood visualization
- `toggleDarkMode()` - Toggle dark/light theme

### App Module (`app.js`)
- `initHomePage()` - Initialize home page
- `initJournalPage()` - Initialize journal page
- `initAddPage()` - Initialize add/edit page
- `renderEntries()` - Render all entries
- `renderStats()` - Render statistics

## 💡 Usage Examples

### Create an Entry
1. Click "Add Entry" in navbar
2. Select date (defaults to today)
3. Choose mood from 6 options
4. Write your journal text
5. Click "Save Entry"

### Edit an Entry
1. Go to "My Journal"
2. Click "Edit" on any entry card
3. Modify date, mood, or text
4. Click "Update Entry"

### Search & Filter
1. Go to "My Journal"
2. Use search bar to find entries by text
3. Click mood filters to view entries by mood

### Dark Mode
1. Click moon icon (🌙) in top-right navbar
2. Theme preference is saved automatically

## ✨ Extra Features Included

✅ Mood-based color indicators
✅ Weekly mood summary visualization
✅ Toast notifications
✅ Dark mode toggle
✅ Smooth animations
✅ Form validation
✅ Empty state messages
✅ Duplicate entry prevention
✅ Responsive modals
✅ Keyboard shortcuts (ESC to close modals)

## 🐛 Browser Compatibility

- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- IE11: ⚠️ Partial support (no CSS variables)

## 📝 Sample Data

The app comes pre-populated with sample data for demonstration:
- 3 sample entries with different moods
- Different dates (past 3 days)
- Shows how the app displays multiple entries

Delete these entries to start fresh!

## 🔐 Privacy & Data

- All data is stored **locally** in your browser
- No data is sent to any server
- Clearing browser data will delete all entries
- Each user has isolated storage

## 📈 Future Enhancement Ideas

- Export entries to PDF or CSV
- Calendar view
- Tags/Categories
- Image support
- Entry reminders
- Statistics charts
- Sharing capabilities (encrypted)
- Sync across devices

## 🎓 Learning Resources

This project demonstrates:
- Modular JavaScript architecture
- Local Storage API usage
- Responsive design principles
- CSS custom properties
- Event handling
- DOM manipulation
- Form validation
- Modal dialogs

## 📄 License

Free to use and modify for personal or educational purposes.

## 🤝 Contributing

Feel free to fork and improve this project!

## 📧 Support

For issues or suggestions, please create an issue or contact the developer.

---

**Happy journaling! 📚✨**

Made with ❤️ for reflective minds

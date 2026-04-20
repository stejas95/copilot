# 🎯 Quick Start Guide - Daily Journal with Mood Tracker

## First Time Setup

1. **Open the app**: Simply open `index.html` in your web browser
2. **Explore**: You'll see sample entries to understand how it works
3. **Start journaling**: Click "Add Entry" to create your first entry

## 🏠 Home Page Features

### Statistics Cards
- **Total Entries**: Shows how many journal entries you've created
- **This Week**: Shows entries from the last 7 days
- **Most Frequent**: Shows your most common mood

### Quick Entry (Today's Journal)
- If today's entry exists: Shows "Edit Today's Entry"
- If no today's entry: Quick form to add entry for today
- Always visible: Makes daily journaling easy

## 📖 My Journal Page

### View Your Entries
- Entries displayed as cards in grid layout
- Shows date, mood, and text preview
- Click card to expand and see full entry

### Entry Card Actions
- **View**: Expand entry in modal to see full text
- **Edit**: Edit entry date, mood, or text
- **Delete**: Remove entry (with confirmation)

### Search & Filter
- **Search bar**: Find entries by text or date
- **Mood filters**: Click mood buttons to show only entries with that mood
- **All Entries**: Shows all entries (default)

### Mood Filters Available
- 😊 Happy
- 😐 Neutral
- 😢 Sad
- 😡 Angry
- 😴 Tired
- 🤩 Excited

## ✏️ Add/Edit Entry Page

### Create New Entry

1. **Date**: Default is today, can pick any date
2. **Mood**: Click one of 6 mood buttons to select
3. **Text**: Write your journal entry (required)
4. **Save**: Click "Save Entry"

### Edit Existing Entry

1. Click "Edit" on any entry card in "My Journal"
2. Form pre-fills with current data
3. Modify any field
4. Click "Update Entry"

### Features
- Shows "Mood Distribution" chart of all entries
- Form validation (requires all fields)
- Duplicate date prevention
- Toast notifications on success/error

## 🌙 Dark Mode

### Toggle Dark Mode
- Click moon icon (🌙) in top-right navbar
- Preference saves automatically
- Theme changes entire app

### Features
- Automatically applied across all pages
- Persistent preference in Local Storage
- Smooth transition between themes

## 💾 Data & Local Storage

### What Gets Saved
- Entry date
- Mood selection
- Journal text
- Unique ID
- Auto-sorted by date (newest first)

### Storage Location
- Browser's Local Storage
- Persists until browser data is cleared
- Cannot be accessed by other websites
- Private and secure

### Example Structure
```json
{
  "id": "11734356p8b5abkc",
  "date": "2024-04-18",
  "mood": "happy",
  "text": "Today was amazing! Had a productive day at work."
}
```

## 🔔 Notifications

### Toast Notifications Appear For
- ✅ "Journal saved!" - Entry created
- ✅ "Entry updated!" - Entry modified
- ✅ "Entry deleted" - Entry removed
- ❌ "All fields are required" - Validation error
- ❌ "Entry already exists for this date" - Duplicate prevention
- ℹ️ Other success/error messages

### Notification Behavior
- Auto-dismisses after 3 seconds
- Can be dismissed by clicking away
- Different colors for success/error
- Bottom right corner positioning

## 🎨 UI Elements

### Modal/Expanded View
- Full entry displayed in centered modal
- Shows complete date, mood, and text
- Options to Edit or Delete
- Click outside or "X" to close
- Press ESC key to close

### Empty State
- When no entries exist
- Shows helpful message
- Quick link to create first entry

### Buttons
- Primary (Blue): Main actions
- Secondary (Gray): Alternative actions
- Danger (Red): Delete actions

## ⌨️ Keyboard Shortcuts

- **ESC**: Close opened modals
- **Tab**: Navigate form fields
- **Enter**: Submit forms (in certain contexts)

## 📊 Mood Statistics

### Available Moods
Each mood has its own emoji and color:
- 😊 Happy (Yellow)
- 😐 Neutral (Gray)
- 😢 Sad (Teal)
- 😡 Angry (Red)
- 😴 Tired (Purple)
- 🤩 Excited (Bright Red)

### Statistics Tracking
- Total entries count
- Weekly entries count
- Most frequent mood
- Mood distribution chart (on add page)

## 🚀 Tips & Tricks

### Best Practices
1. Add entries daily for better mood tracking
2. Be consistent with mood selection
3. Write meaningful text for better reflection
4. Review past entries for insights
5. Use search to find specific moments

### Troubleshooting

**Entries disappeared?**
- Check if browser data was cleared
- Make sure Local Storage is enabled

**Can't save entry?**
- Ensure all fields are filled
- Check for error messages (toast notifications)
- Try different date if duplicate error

**Dark mode not working?**
- Refresh browser
- Check if JavaScript is enabled
- Clear browser cache

## 🔒 Privacy & Security

- All data stays in your browser
- No external servers
- No tracking
- No cookies (except dark mode preference)
- Completely private

## 🌐 Mobile Usage

### Mobile Features
- Responsive design (all screen sizes)
- Touch-friendly buttons
- Optimized keyboard on mobile
- Portrait and landscape support
- Single column layout on phones

### Mobile Tips
- Use portrait mode for better readability
- Tap entries to expand
- Swipe to scroll through entries
- Long press may trigger context menu

## 📈 Managing Your Data

### Reviewing Stats
1. Go to Home page
2. Check Statistics section
3. View mood distribution on "Add Entry" page

### Finding Entries
1. Use search bar on "My Journal"
2. Filter by specific mood
3. Look for date in header

### Deleting Entries
1. Find entry on "My Journal"
2. Click "Delete" button
3. Confirm deletion
4. Entry is permanently removed

## 🎓 Getting More Out of Your Journal

### Journaling Tips
- Write daily for habit building
- Be honest about your feelings
- Include specific details
- Note events that affected your mood
- Reflect after a week

### Mood Patterns
- Use filters to see mood trends
- Check stats to identify patterns
- Notice what affects your mood
- Plan based on mood cycles

## ⚙️ Technical Details

### Files Included
- `index.html` - Home page
- `journal.html` - Entry list page
- `add.html` - Add/edit entry page
- `css/styles.css` - All styling
- `js/storage.js` - Data management
- `js/ui.js` - UI components
- `js/app.js` - Application logic

### No Dependencies
- Pure vanilla JavaScript
- No frameworks required
- No external libraries (except fonts)
- Works offline

### Browser Requirements
- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Local Storage enabled (typically default)

---

**Ready to start journaling? Open `index.html` and begin! 📝✨**

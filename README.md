# Direct Soccer - Artwork Team Time Tracker

A single-page time-tracking web application for Direct Soccer's Artwork team, built with React, Recharts, and Tailwind CSS.

## Features

- **Task Entry Form**: Log tasks with date, artworker, task type, time spent, and optional notes
- **Data Display Table**: View all logged tasks with filtering options (by artworker, task type, date range)
- **Analytics Dashboard**: Visual insights with pie charts, bar charts, and line charts
- **Data Persistence**: All data stored in browser localStorage
- **CSV Export**: Export filtered data to CSV format
- **Mobile Responsive**: Works seamlessly on all device sizes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Usage

### Logging a Task

1. Fill in the task entry form:
   - Select a date
   - Choose an artworker from the dropdown
   - Select a task type
   - Enter time spent (hours and/or minutes)
   - Optionally add notes
2. Click "Log Task" to save

### Viewing and Filtering Tasks

- Use the filter options above the table to filter by:
  - Artworker
  - Task type
  - Date range
- Click "Clear Filters" to reset all filters
- Click "Export CSV" to download the filtered data

### Analytics

The dashboard automatically calculates and displays:
- Total hours logged this week
- Most time-consuming task type
- Busiest artworker
- Average time per task
- Visual charts showing time distribution and trends

### Clearing Data

Click "Clear All Data" to remove all logged tasks (with confirmation prompt).

## Technologies Used

- React 18
- Recharts (for data visualization)
- Tailwind CSS (for styling)
- localStorage (for data persistence)

## License

Copyright © 2024 Direct Soccer. All rights reserved.


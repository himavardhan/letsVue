# letsVue - User Behavior Reporting System

A comprehensive Vue.js application for tracking and reporting user behaviors with advanced analytics and visualization.

## 🎯 Features

- **Dashboard**: Real-time overview of user behavior metrics
  - Total actions and unique users
  - Device and browser breakdowns
  - Top actions and pages visualization
  - Activity timeline over the last 7 days
  - Recent activity feed

- **Behavior Tracker**: Track and log user behaviors
  - Form-based behavior tracking
  - Live behavior feed
  - Quick actions (generate sample data, export, clear)
  
- **Analytics**: Advanced data visualization
  - Interactive charts (Chart.js integration)
  - Action and page distribution charts
  - Device and browser analytics
  - Timeline analysis
  - Key insights summary

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/himavardhan/letsVue.git
cd letsVue
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
letsVue/
├── src/
│   ├── components/          # Reusable Vue components
│   ├── views/               # Page components
│   │   ├── Dashboard.vue    # Dashboard page
│   │   ├── BehaviorTracker.vue  # Behavior tracking page
│   │   └── Analytics.vue    # Analytics page
│   ├── services/            # Business logic and data services
│   │   └── behaviorService.js  # User behavior data service
│   ├── App.vue              # Root component
│   └── main.js              # Application entry point
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
└── package.json             # Project dependencies

```

## 🛠 Technologies Used

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router** - Official router for Vue.js
- **Chart.js** - JavaScript charting library
- **Vue-ChartJS** - Chart.js wrapper for Vue.js
- **Vite** - Next-generation frontend tooling

## 📊 Data Management

The application uses localStorage for data persistence. You can:
- Track new behaviors through the Behavior Tracker
- Generate sample data for testing
- Export data as JSON
- Clear all stored data

## 🎨 UI Features

- Responsive design that works on desktop and mobile
- Gradient backgrounds and modern styling
- Smooth animations and transitions
- Interactive charts and visualizations
- Real-time data updates

## 📝 Usage

### Tracking Behaviors

Navigate to the **Behavior Tracker** page and fill in the form:
- User ID
- Action type (click, scroll, hover, submit, search, navigate)
- Page visited
- Duration in seconds
- Device type (desktop/mobile)
- Browser used

### Viewing Analytics

Visit the **Analytics** page to see:
- Distribution charts for actions and pages
- Device and browser usage statistics
- Activity trends over time
- Key insights and metrics

### Dashboard Overview

The **Dashboard** provides:
- Quick stats overview
- Top actions and pages
- Recent activity feed
- Timeline visualization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ using Vue.js
# LocalBizMap 🗺️

A stunning, interactive React web application designed to help users discover top-rated local businesses. Built with a focus on premium aesthetics, seamless user experience, and robust offline-capable mapping functionalities.

## 🎯 Features

- **Interactive Map Exploration**: Powered by React-Leaflet and OpenStreetMap, featuring beautifully customized popup cards.
- **Smart Filtering**: Instantly filter mock business data by category, rating, and open/closed status.
- **Dynamic Search**: High-performance local search against the business dataset.
- **Favorites System**: Save your favorite spots; persists locally via `Zustand` and `localStorage`.
- **Mock Routing Panel**: An elegant UI demonstrating how turn-by-turn directions and travel times look when navigating to a business.
- **Dark Mode**: Flawless, animated transition between light and completely custom dark mode themes explicitly tailored to Tailwind standards.
- **Fully Responsive**: Architected to look stunning on mobile, tablet, and desktop viewports with a collapsible map/sidebar architecture.

## 🛠 Tech Stack

- **Framework**: [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/) for lightning-fast development
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with persist middleware)
- **Map Library**: [Leaflet](https://leafletjs.com/) via `react-leaflet`
- **Iconography**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Since this project was built explicitly using open-source tools and mock data, **no API keys are required to run this project!**

### Prerequisites
Make sure you have Node.js and npm installed.

### Installation

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd "MY PROJECT 2"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to the local address provided by Vite (typically `http://localhost:5173`).

## 💡 Why Leaflet over Google Maps?
As per user requirements regarding API constraints, this project successfully pivoted to a powerful, fully open-source architecture utilizing `react-leaflet` and robust mocked JSON datasets. This ensures the application can be run immediately, safely, and indefinitely by anyone reviewing the code.

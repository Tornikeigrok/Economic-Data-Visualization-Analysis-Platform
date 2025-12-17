# Economic Data Visualization & Analysis Platform

A modern, responsive web application that provides real-time visualization and analysis of key U.S. economic indicators through interactive charts and data from the Federal Reserve Economic Data (FRED) API.

## 🚀 Features

- **Real-Time Data Integration**: Fetches live economic data from the Federal Reserve Economic Data (FRED) API
- **Interactive Visualizations**: Four distinct chart types displaying different economic metrics
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices with adaptive font sizing
- **Modern UI/UX**: Glassmorphism effects, gradient backgrounds, and smooth animations
- **Error Handling**: Robust error management with user-friendly feedback messages
- **Loading States**: Visual spinners indicating data fetch operations

## 📊 Economic Indicators

### 1. Unemployment Rate by State
- **Data Source**: Bureau of Labor Statistics (via FRED)
- **Visualization**: Bar Chart
- **Coverage**: 8 U.S. States (California, Maryland, Texas, Florida, New York, Alaska, Virginia, Hawaii)
- **Time Range**: 2019 - Present

### 2. GDP (Gross Domestic Product)
- **Data Source**: U.S. Bureau of Economic Analysis (via FRED)
- **Visualization**: Smooth Area Chart
- **Metric**: GDP in Trillions of Dollars
- **Time Range**: 2019 - Present

### 3. Inflation Rate (CPI)
- **Data Source**: Consumer Price Index (via FRED)
- **Visualization**: Stepped Line Chart
- **Metric**: Consumer Price Index for All Urban Consumers
- **Time Range**: 2019 - Present

### 4. S&P 500 Stock Index
- **Data Source**: Standard & Poor's (via FRED)
- **Visualization**: Line Chart
- **Metric**: S&P 500 Index Value
- **Time Range**: 2019 - Present

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Custom styling with Tailwind CSS v3.x
- **JavaScript (ES6+)**: Async/await patterns, DOM manipulation

### Libraries & APIs
- **Chart.js v4.x**: Interactive and responsive chart library
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Font Awesome 6.5.1**: Icon library for UI elements
- **FRED API**: Federal Reserve Economic Data API
- **CORS Proxy**: corsproxy.io for handling cross-origin requests

## 📱 Responsive Design

The platform implements a mobile-first approach with breakpoints:
- **Mobile**: < 640px (optimized font sizes, adjusted layouts)
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Key Responsive Features
- Adaptive chart font sizing (8-14px range based on viewport)
- Flexible grid layout (1 column → 2 columns on large screens)
- Touch-friendly input fields and hover states
- Optimized canvas rendering for all screen sizes



## 👤 Author

**Tornike Sharikadze**

---

*Built with modern web technologies for real-time economic data analysis*

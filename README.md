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

## 🎨 Design Features

- **Color Scheme**: Dark theme with lime (#a3e635) accent color
- **Visual Effects**: 
  - Glassmorphism with backdrop blur
  - Gradient backgrounds
  - Subtle shadow effects
  - Smooth hover transitions
- **Typography**: Responsive font sizing for optimal readability
- **Layout**: Sticky header with logo, card-based content structure

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd newFol
   ```

2. **API Key Setup**
   - Obtain a free API key from [FRED API](https://fred.stlouisfed.org/docs/api/api_key.html)
   - Replace the API key in `script.js`:
     ```javascript
     const key = 'YOUR_API_KEY_HERE';
     ```

3. **Run the application**
   - Open `index.html` in a modern web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```

4. **Access the dashboard**
   - Navigate to `http://localhost:8000` (or appropriate port)

## 📖 Usage

### Unemployment Data
1. Type a state name (e.g., "california", "texas")
2. Press Enter to load the data
3. View unemployment trends in a bar chart

### GDP Data
1. Type "usa" in the GDP input field
2. Press Enter to load GDP data
3. View economic growth trends in an area chart

### Inflation Data
1. Type "usa" in the inflation input field
2. Press Enter to load CPI data
3. View inflation trends in a stepped line chart

### S&P 500 Data
- Automatically loads on page load
- View stock market trends in a line chart

## 🔍 Code Architecture

### Main Components

**`script.js`**
- `getData(state)`: Fetches unemployment data for specified state
- `getGDP(country)`: Fetches GDP data for USA
- `getInflation(country)`: Fetches CPI/inflation data
- `getStocks()`: Fetches S&P 500 index data
- Event listeners for keyboard interactions and tooltips

**`index.html`**
- Semantic HTML structure
- Four card-based sections for each economic indicator
- Responsive grid layout with Tailwind utilities

**`style.css`**
- Custom CSS for logo animation
- Additional styling not covered by Tailwind

### Data Flow
1. User input triggers data fetch function
2. API request sent through CORS proxy
3. Response data normalized and processed
4. Data sampled for optimal visualization
5. Chart.js renders interactive chart
6. Error handling for failed requests

## 📊 Data Sampling Strategy

To ensure optimal chart readability, data is sampled:
- **Unemployment**: Every 4th data point
- **GDP**: Every 2nd data point
- **Inflation**: Every 3rd data point
- **S&P 500**: Every 5th data point

## 🎯 Key Technical Achievements

- Implemented async/await patterns for efficient API calls
- Designed responsive typography system with viewport-based sizing
- Created custom chart configurations for four distinct visualization types
- Built robust error handling and loading state management
- Developed mobile-first responsive design with Tailwind CSS
- Integrated real-time data from Federal Reserve API
- Optimized chart rendering with data sampling algorithms

## 🚦 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Modern mobile browsers

## 📝 Future Enhancements

- [ ] Add more economic indicators (interest rates, housing data)
- [ ] Implement date range selectors
- [ ] Add data export functionality (CSV, JSON)
- [ ] Include historical comparison tools
- [ ] Add user preferences and theme customization
- [ ] Implement data caching for offline access
- [ ] Add statistical analysis tools (moving averages, trend lines)

## 📄 License

This project is available for portfolio and educational purposes.

## 👤 Author

**Tornike Sharikadze**

---

*Built with modern web technologies for real-time economic data analysis*

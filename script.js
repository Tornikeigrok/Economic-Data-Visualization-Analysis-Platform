const canvas = document.getElementById('unempCanvas');
const stateInput = document.getElementById('stateInput');
const spinDiv = document.getElementById('spin');
const canvasCont = document.getElementById('canvasCont');
const error = document.getElementById('error');
let inUse = null;
let gdpCanvasInstance = null;
let inflationInstance = null;
const canvasGdp = document.getElementById('gdpCanvas');
const inflationCanvas = document.getElementById('inflationCanvas');

const key = '39e6a2ae9ec4ee12016a6a25e9dcb968';
async function getData(user) {
    try {
        const countryMap = {
            'california': 'CAUR',
            'maryland': 'MDUR',
            'texas': 'TXUR',
            'florida': 'FLUR',
            'new york': 'NYUR',
            'alaska': 'AKUR',
            'virginia': 'VAUR',
            'hawaii': 'HIUR'
        }
        if (!countryMap[user]) {
            error.textContent = 'Invalid state! Try: california, maryland, texas, florida, new york, alaska, virginia, hawaii';
            error.style.display = 'block';
            if (inUse) {
                inUse.destroy();
                inUse = null;
            }
            return;
        }


        const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${countryMap[user]}&observation_start=2019-01-01&file_type=json&api_key=${key}`;
        const proxied = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        spinDiv.style.display = 'block';
        const res = await fetch(proxied);
        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }
        const data = await res.json();
        spinDiv.style.display = 'none';

        //Normalize the Data
        const dataObs = data.observations;
        const unempData = dataObs.map(el => ({
            date: el.date,
            value: el.value
        }))

        //fill in the arrays
        const dateHolder = [];
        const valueHolder = [];
        unempData.forEach((element, index) => {
            if (index % 4 === 0) {
                dateHolder.push(element.date.slice(0, 7));
            }
        });

        unempData.forEach((el) => {
            valueHolder.push(el.value);
        })
        if (inUse) {
            inUse.destroy();
            inUse = null;
        }


        inUse = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: dateHolder,
                datasets: [
                    {
                        data: valueHolder,
                        backgroundColor: '#a3e635',

                    }

                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `Unemployment Rate of ${user}`,
                        color: 'white'
                    },
                },
                scales: {
                    y: {
                        grid: {
                            display: true,

                        },
                        title: {
                            display: true,
                            text: "% Rate",
                            color: 'white'
                        },
                        ticks: {
                            color: 'white'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'white',
                            font: {
                                size: window.innerWidth < 640 ? 9 : 13
                            },
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        })




    } catch (error) {
        console.error('Unemployment data error:', error);
        spinDiv.style.display = 'none';
        errorEl = document.getElementById('error');
        errorEl.textContent = 'Failed to load data. Please try again.';
        errorEl.style.display = 'block';
    }
}


async function getGDP(country) {
    try {
        const gdpInput = document.getElementById('gdpInput');
        const gdpSpin = document.getElementById('gdpSpin');
        const gdpError = document.getElementById('gdpError');

        const validCountries = ['usa', 'united states', 'america'];
        if (!country || !validCountries.includes(country.toLowerCase().trim())) {
            gdpError.textContent = 'Only USA data available. Type "usa"';
            gdpError.style.display = 'block';
            if (gdpCanvasInstance) {
                gdpCanvasInstance.destroy();
                gdpCanvasInstance = null;
            }
            return;
        }

        gdpError.style.display = 'none';
        const url = `https://api.stlouisfed.org/fred/series/observations?series_id=GDP&observation_start=2019-01-01&file_type=json&api_key=${key}`;
        const proxied = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        gdpSpin.style.display = 'block';
        const res = await fetch(proxied);
        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }
        const data = await res.json();
        gdpSpin.style.display = 'none';

        const gdpData = data.observations.map(el => ({
            date: el.date,
            gdpValue: el.value
        }));

        const dateArr = [];
        const valueArr = [];
        gdpData.forEach((el, index) => {
            if (index % 2 === 0) {
                const dataOrg = el.date.slice(0, 7);
                dateArr.push(dataOrg);
            }
        })
        gdpData.forEach((el) => {
            const compute = (el.gdpValue / 1000).toFixed(1);
            valueArr.push(compute);
        })

        if (gdpCanvasInstance) {
            gdpCanvasInstance.destroy();
            gdpCanvasInstance = null;
        }
        gdpCanvasInstance = new Chart(canvasGdp, {
            type: 'line',
            data: {
                labels: dateArr,
                datasets: [
                    {
                        data: valueArr,
                        backgroundColor: '#fcfcfcff',
                        borderColor: '#a3e635',
                        fill: true,
                        backgroundColor: '#4f652cff',
                        pointBackgroundColor: 'white',
                        pointHoverRadius: 7

                    }
                ],

            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'GDP per capita of USA',
                        color: 'white'
                    }
                },
                scales: {

                    x: {
                        ticks: {
                            color: 'white',
                            font: {
                                size: window.innerWidth < 640 ? 9 : 13
                            },
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            display: false,

                        }

                    },
                    y: {
                        ticks: {
                            color: 'white',
                            font: {
                                size: window.innerWidth < 640 ? 9 : 13
                            }
                        },
                        grid: {
                            display: true,
                            color: '#4f652cff',
                        },
                        title: {
                            display: true,
                            text: '$ Trillion',
                            color: 'white',
                            font: {
                                size: window.innerWidth < 640 ? 10 : 12
                            }
                        }
                    }
                }
            }
        })
    } catch (error) {
        console.error('GDP data error:', error);
        const gdpSpin = document.getElementById('gdpSpin');
        const gdpError = document.getElementById('gdpError');
        gdpSpin.style.display = 'none';
        gdpError.textContent = 'Failed to load GDP data. Please try again.';
        gdpError.style.display = 'block';
    }
}
getGDP('usa')


//inflation section ----------
async function getInflation(country) {
    try {
        const inflationSpin = document.getElementById('inflationSpin');
        const inflationInput = document.getElementById('inflationInput');
        const inflationError = document.getElementById('inflationError');

        const validCountries = ['usa', 'united states', 'america'];
        if (country && !validCountries.includes(country.toLowerCase().trim())) {
            inflationError.textContent = 'Only USA data available. Type "usa"';
            inflationError.style.display = 'block';
            if (inflationInstance) {
                inflationInstance.destroy();
                inflationInstance = null;
            }
            return;
        }

        if (country) {
            inflationInput.value = '';
        }

        inflationError.style.display = 'none';

        const url = `https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&observation_start=2019-01-01&file_type=json&api_key=${key}`;
        const proxied = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        inflationSpin.style.display = 'block';
        const res = await fetch(proxied);
        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }
        const data = await res.json();
        inflationSpin.style.display = 'none';
        inflationError.style.display = 'none';
        const normalizeData = data.observations;
        //normalize data
        const inflations = normalizeData.map(el => ({
            date: el.date,
            value: el.value
        }));

        const dateHold = [];
        const valueHold = [];
        // Take every 3rd data point for cleaner visualization
        inflations.forEach((el, index) => {
            if (index % 3 === 0) {
                dateHold.push(el.date.slice(0, 7));
                valueHold.push(el.value);
            }
        })

        if (inflationInstance) {
            inflationInstance.destroy();
            inflationInstance = null;
        }

        inflationInstance = new Chart(inflationCanvas, {
            type: 'line',
            data: {
                labels: dateHold,
                datasets: [
                    {
                        label: 'CPI',
                        data: valueHold,
                        backgroundColor: 'rgba(163, 230, 53, 0.3)',
                        borderColor: '#a3e635',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.3,
                        pointRadius: 1,
                        stepped: true,
                        pointBackgroundColor: '#a3e635',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#a3e635'
                    }
                ]

            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Inflation Rate (CPI) of USA',
                        color: 'white',
                        font: {
                            size: window.innerWidth < 640 ? 11 : 14
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'white',
                            font: {
                                size: window.innerWidth < 640 ? 8 : 10
                            },
                            maxRotation: 45,
                            minRotation: 45
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'white',
                            font: {
                                size: window.innerWidth < 640 ? 9 : 11
                            }
                        },
                        title: {
                            display: true,
                            text: 'CPI Index',
                            color: 'white',
                            font: {
                                size: window.innerWidth < 640 ? 10 : 12
                            }
                        }
                    }
                }
            }
        })




    } catch (error) {
        console.error('Inflation data error:', error);
        const inflationSpin = document.getElementById('inflationSpin');
        const inflationError = document.getElementById('inflationError');
        inflationSpin.style.display = 'none';
        inflationError.textContent = 'Failed to load inflation data. Please try again.';
        inflationError.style.display = 'block';
    }
}
getInflation()


//Stock section ----------
let stockInstance = null;
const stockCanvas = document.getElementById('stockCanvas');

async function getStocks() {
    try {
        const stockSpin = document.getElementById('stockSpin');
        const stockError = document.getElementById('stockError');

        stockError.style.display = 'none';

        const url = `https://api.stlouisfed.org/fred/series/observations?series_id=SP500&observation_start=2019-01-01&file_type=json&api_key=${key}`;
        const proxied = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        stockSpin.style.display = 'block';
        const res = await fetch(proxied);
        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }
        const data = await res.json();
        stockSpin.style.display = 'none';
        stockError.style.display = 'none';

        //Normalize the Data
        const normalizeData = data.observations;
        const stocks = normalizeData.map(el => ({
            date: el.date,
            value: el.value
        }));

        const dateHold = [];
        const valueHold = [];
        // Take every 4th data point for cleaner visualization
        stocks.forEach((el, index) => {
            if (index % 5 === 0) {
                dateHold.push(el.date.slice(0, 7));
                valueHold.push(el.value);
            }
        });

        if (stockInstance) {
            stockInstance.destroy();
            stockInstance = null;
        }

        stockInstance = new Chart(stockCanvas, {
            type: 'line',
            data: {
                labels: dateHold,
                datasets: [
                    {
                        label: 'S&P 500',
                        data: valueHold,
                        backgroundColor: 'rgba(163, 230, 53, 0.1)',
                        borderColor: '#a3e635',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.3,
                        pointRadius: 2,
                        pointBackgroundColor: '#a3e635',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#a3e635'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'S&P 500 Index',
                        color: 'white',
                        font: {
                            size: window.innerWidth < 640 ? 11 : 14
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'white',
                            font: {
                                size: window.innerWidth < 640 ? 8 : 10
                            },
                            maxRotation: 45,
                            minRotation: 45
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'white',
                            font: {
                                size: window.innerWidth < 640 ? 9 : 11
                            }
                        },
                        title: {
                            display: true,
                            text: 'Index Value',
                            color: 'white',
                            font: {
                                size: window.innerWidth < 640 ? 10 : 12
                            }
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Stock data error:', error);
        const stockSpin = document.getElementById('stockSpin');
        const stockError = document.getElementById('stockError');
        stockSpin.style.display = 'none';
        stockError.textContent = 'Failed to load stock data. Please try again.';
        stockError.style.display = 'block';
    }
}
getStocks()


stateInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        error.style.display = 'none';
        getData(e.target.value);
    }
})

const gdpInput = document.getElementById('gdpInput');
const gdpError = document.getElementById('gdpError');

gdpInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        gdpError.style.display = 'none';
        getGDP(e.target.value);
    }
})

const inflationInputEl = document.getElementById('inflationInput');
const inflationErrorEl = document.getElementById('inflationError');

inflationInputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        inflationErrorEl.style.display = 'none';
        getInflation(e.target.value);
    }
})

const details = document.getElementById('first-details');
const hoverIcon = document.getElementById('info-icon');


//Info icon part---
hoverIcon.addEventListener('mouseover', () => { details.style.display = 'block'; });
hoverIcon.addEventListener('mouseleave', () => { details.style.display = 'none'; });


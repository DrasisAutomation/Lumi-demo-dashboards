// Initialize temperature chart
function initTemperatureChart() {
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    
    // Sample data for the temperature chart
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Temperature (°C)',
            data: [22, 20, 18, 21, 23, 24, 23],
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#42A5F5',
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };
    
    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: {
                    size: 14
                },
                bodyFont: {
                    size: 14
                },
                padding: 10,
                cornerRadius: 10
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 15,
                max: 30,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            }
        }
    };
    
    // Create the chart
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}

// Toggle adjust controls for rooms
function toggleAdjust(roomId) {
    const controls = document.getElementById(roomId + 'Controls');
    if (controls.style.display === 'flex') {
        controls.style.display = 'none';
    } else {
        controls.style.display = 'flex';
    }
}

// Update percentage value for room controls with minimum of 10%
function updatePercentage(roomId, value) {
    // Ensure value is at least 10
    const adjustedValue = Math.max(10, value);
    document.getElementById(roomId + 'Value').textContent = adjustedValue + '%';
    const percentageValue = document.querySelector('#' + roomId + 'Controls .percentage-value');
    if (percentageValue) {
        percentageValue.textContent = adjustedValue + '%';
    }
    
    // Update slider value
    const slider = document.querySelector(`#${roomId}Controls input[type="range"]`);
    if (slider) {
        slider.value = adjustedValue;
    }
}

// Toggle room on/off and show/hide adjust button
function toggleRoom(roomId, checkbox) {
    const roomElement = document.getElementById(roomId);
    const adjustSection = roomElement.querySelector('.adjust-section');
    
    if (checkbox.checked) {
        roomElement.classList.remove('off');
        adjustSection.style.display = 'flex';
    } else {
        roomElement.classList.add('off');
        adjustSection.style.display = 'none';
        
        // Hide adjust controls if visible
        const controls = document.getElementById(roomId + 'Controls');
        if (controls) {
            controls.style.display = 'none';
        }
    }
}

// Toggle adjust controls for rooms
function toggleAdjust(roomId) {
    const controls = document.getElementById(roomId + 'Controls');
    if (controls.style.display === 'flex') {
        controls.style.display = 'none';
    } else {
        controls.style.display = 'flex';
    }
}

// Update percentage value for room controls with minimum of 10%
function updatePercentage(roomId, value) {
    // Ensure value is at least 10
    const adjustedValue = Math.max(10, value);
    document.getElementById(roomId + 'Value').textContent = adjustedValue + '%';
    const percentageValue = document.querySelector('#' + roomId + 'Controls .percentage-value');
    if (percentageValue) {
        percentageValue.textContent = adjustedValue + '%';
    }
    
    // Update slider value
    const slider = document.querySelector(`#${roomId}Controls input[type="range"]`);
    if (slider) {
        slider.value = adjustedValue;
    }
}
// Toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    const modeToggle = document.getElementById('modeToggle');
    const icon = modeToggle.querySelector('i');
    const text = modeToggle.querySelector('span');
    
    // Save theme preference to localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        icon.className = 'fas fa-sun';
        text.textContent = 'Light Mode';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = 'Dark Mode';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize temperature chart on home page
    if (document.getElementById('temperatureChart')) {
        initTemperatureChart();
    }
    
    // Set up event listeners
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Set up room toggles
    const roomToggles = document.querySelectorAll('.room input[type="checkbox"]');
    roomToggles.forEach(toggle => {
        const roomId = toggle.closest('.room').id;
        toggle.addEventListener('change', function() {
            toggleRoom(roomId, this);
        });
        
        // Initialize room state
        toggleRoom(roomId, toggle);
    });
    
    // Set up adjust buttons
    const adjustButtons = document.querySelectorAll('.adjust-btn');
    adjustButtons.forEach(button => {
        const roomId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        const controls = document.getElementById(roomId + 'Controls');
        if (controls) {
            controls.style.display = 'none';
        }
    });
    
    // Set current page indicator in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navIcons = document.querySelectorAll('.nav-icon');
    
    navIcons.forEach(icon => {
        const href = icon.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            icon.style.background = 'rgba(66, 165, 245, 0.2)';
            icon.style.color = '#42A5F5';
        }
    });
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        const modeToggle = document.getElementById('modeToggle');
        if (modeToggle) {
            const icon = modeToggle.querySelector('i');
            const text = modeToggle.querySelector('span');
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        }
    }
});

// Set up demo button if it exists
const demoButton = document.querySelector('.demo-button');
if (demoButton) {
    demoButton.addEventListener('click', runDemo);
}

// Enhanced toggle dark mode with smooth transition
function toggleDarkMode() {
    // Create transition overlay if it doesn't exist
    let transitionOverlay = document.getElementById('themeTransition');
    if (!transitionOverlay) {
        transitionOverlay = document.createElement('div');
        transitionOverlay.id = 'themeTransition';
        transitionOverlay.className = 'theme-transition';
        document.body.appendChild(transitionOverlay);
    }
    
    // Show transition overlay
    transitionOverlay.classList.add('active');
    
    // Toggle theme after a brief delay
    setTimeout(() => {
        const body = document.body;
        body.classList.toggle('dark-mode');
        
        const modeToggle = document.getElementById('modeToggle');
        const icon = modeToggle.querySelector('i');
        const text = modeToggle.querySelector('span');
        
        // Save theme preference to localStorage
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        if (isDarkMode) {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        }
        
        // Hide transition overlay
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
        }, 300);
    }, 50);
}
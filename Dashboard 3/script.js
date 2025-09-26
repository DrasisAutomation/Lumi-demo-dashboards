
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.getElementById('sidebar');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const navItems = document.querySelectorAll('.nav-item');
const pageContents = document.querySelectorAll('.page-content');
const roomTabs = document.querySelectorAll('.room-tab');
const acToggle = document.getElementById('acToggle');
const tempSlider = document.getElementById('tempSlider');
const tempValue = document.getElementById('tempValue');
const modeButtons = document.querySelectorAll('.mode-btn');
const devicesGrid = document.getElementById('devicesGrid');
const lightsContainer = document.getElementById('lightsContainer');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const supportItems = document.querySelectorAll('.support-item');
const settingOptions = document.querySelectorAll('.setting-option');
const securityStatus = document.querySelector('.security-status');
const securityBtns = document.querySelectorAll('.security-btn');
const timeSelect = document.querySelector('.time-select');

let myChart;

const roomData = {
    living: {
        devices: [
            { name: "Smart TV", icon: "tv", usage: 1.8, isOn: true },
            { name: "Sound System", icon: "music", usage: 0.9, isOn: true },
            { name: "Lamp", icon: "lightbulb", usage: 0.15, isOn: false },
            { name: "Robot Vacuum", icon: "robot", usage: 0.6, isOn: false }
        ],
        ac: { temp: 24, mode: 'cool' },
        lights: [
            { name: 'Main Light', icon: 'lightbulb', brightness: 80 },
            { name: 'Lamp', icon: 'lightbulb', brightness: 45 },
            { name: 'Ceiling Light', icon: 'lightbulb', brightness: 60 }
        ]
    },
    kitchen: {
        devices: [
            { name: "Fridge", icon: "snowflake", usage: 2.4, isOn: true },
            { name: "Oven", icon: "fire-burner", usage: 3.5, isOn: false },
            { name: "Dishwasher", icon: "water", usage: 1.2, isOn: false },
            { name: "Coffee Maker", icon: "coffee", usage: 0.3, isOn: true }
        ],
        ac: { temp: 22, mode: 'fan' },
        lights: [
            { name: 'Ceiling Light', icon: 'lightbulb', brightness: 70 },
            { name: 'Counter Light', icon: 'lightbulb', brightness: 40 },
            { name: 'Fridge Light', icon: 'lightbulb', brightness: 55 }
        ]
    },
    bed: {
        devices: [
            { name: "Heater", icon: "fire", usage: 1.6, isOn: false },
            { name: "Lamp", icon: "lightbulb", usage: 0.12, isOn: true },
            { name: "Air Purifier", icon: "wind", usage: 0.18, isOn: true },
            { name: "Alarm Clock", icon: "clock", usage: 0.01, isOn: true }
        ],
        ac: { temp: 20, mode: 'heat' },
        lights: [
            { name: 'Bedside Lamp', icon: 'lightbulb', brightness: 30 },
            { name: 'Reading Light', icon: 'lightbulb', brightness: 20 },
            { name: 'Ceiling Light', icon: 'lightbulb', brightness: 65 }
        ]
    },
    movie: {
        devices: [
            { name: "Projector", icon: "video", usage: 2.0, isOn: true },
            { name: "Surround System", icon: "volume-up", usage: 1.1, isOn: true },
            { name: "Popcorn Maker", icon: "utensils", usage: 0.25, isOn: false },
            { name: "Ambient Lights", icon: "lightbulb", usage: 0.5, isOn: true }
        ],
        ac: { temp: 25, mode: 'cool' },
        lights: [
            { name: 'Ambient Light', icon: 'lightbulb', brightness: 50 },
            { name: 'Wall Light', icon: 'lightbulb', brightness: 35 },
            { name: 'Ceiling Light', icon: 'lightbulb', brightness: 75 }
        ]
    },
    game: {
        devices: [
            { name: "Gaming PC", icon: "desktop", usage: 3.2, isOn: true },
            { name: "Console", icon: "gamepad", usage: 1.1, isOn: true },
            { name: "VR Headset", icon: "vr-cardboard", usage: 0.6, isOn: false },
            { name: "RGB Lights", icon: "lightbulb", usage: 0.4, isOn: true }
        ],
        ac: { temp: 23, mode: 'fan' },
        lights: [
            { name: 'RGB Strip', icon: 'lightbulb', brightness: 60 },
            { name: 'Desk Light', icon: 'lightbulb', brightness: 30 },
            { name: 'Ceiling Light', icon: 'lightbulb', brightness: 70 }
        ]
    }
};


const todos = [
    { text: 'Schedule AC maintenance', completed: false },
    { text: 'Change living room light bulbs', completed: true },
    { text: 'Check security camera angles', completed: false }
];

function initDashboard() {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            switchPage(page);
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            if (sidebar.classList.contains('active')) toggleMobileMenu();
        });
    });

    roomTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            roomTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const room = tab.dataset.room;

            renderDevices(room);
            renderLights(room);

            const acSettings = roomData[room].ac;
            if (acSettings) {
                tempValue.textContent = `${acSettings.temp}°C`;
                tempSlider.value = acSettings.temp;
                modeButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.mode === acSettings.mode) {
                        btn.classList.add('active');
                    }
                });
            }
        });
    });

    acToggle.addEventListener('change', toggleAC);
    tempSlider.addEventListener('input', updateTemperature);

    const modeTemps = {
        cool: 16,
        fan: 30,
        heat: 32,
        auto: 20,
        night: 25
    };

    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const mode = btn.dataset.mode;
            if (modeTemps[mode] !== undefined) {
                tempSlider.value = modeTemps[mode];
                tempValue.textContent = `${modeTemps[mode]}°C`;
            }
        });
    });

    supportItems.forEach(item => {
        item.addEventListener('click', () => {
            supportItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    settingOptions.forEach(option => {
        option.addEventListener('click', () => {
            const parent = option.parentElement;
            parent.querySelectorAll('.setting-option').forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            if (option.textContent === "Light") {
                document.body.classList.add("light-theme");
                document.body.classList.remove("dark-theme");
            } else if (option.textContent === "Dark") {
                document.body.classList.add("dark-theme");
                document.body.classList.remove("light-theme");
            }
        });
    });

    securityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent === "Arm Away") {
                securityStatus.classList.add('armed');
                securityStatus.querySelector('p').textContent = 'System is armed';
                securityStatus.querySelector('.security-icon').style.background = '#ef4444';
            } else if (btn.textContent === "Disarm") {
                securityStatus.classList.remove('armed');
                securityStatus.querySelector('p').textContent = 'System is disarmed';
                securityStatus.querySelector('.security-icon').style.background = '#10b981';
            }
        });
    });

    timeSelect.addEventListener('change', (event) => {
        const period = event.target.value;
        let newData;
        let newLabels;

        if (period === 'Today') {
            newData = [12, 19, 15, 25, 22, 30, 27];
            newLabels = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'];
        } else if (period === 'This Week') {
            newData = [150, 210, 180, 240, 200, 280, 250];
            newLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        } else if (period === 'This Month') {
            newData = [1200, 1500, 1300, 1600];
            newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        } else if (period === 'This Year') {
            newData = [4000, 5000, 4500, 5500, 6000, 5800, 6200, 6500, 6100, 5700, 5900, 6300];
            newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        }

        if (myChart) {
            myChart.data.datasets[0].data = newData;
            myChart.data.labels = newLabels;
            myChart.update();
        }
    });

    addTodoBtn.addEventListener('click', showAddTodoForm);
    renderTodos();

    renderLights("living");
    renderDevices("living");
    initUsageChart();
    switchPage('dashboard');
}

function toggleMobileMenu() {
    sidebar.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
}

function switchPage(page) {
    pageContents.forEach(content => content.classList.remove('active'));
    document.getElementById(`${page}Page`).classList.add('active');
    document.querySelector('.top-bar h1').textContent = getPageTitle(page);
}

function getPageTitle(page) {
    return { dashboard: 'Dashboard', recent: 'Recent Activity', support: 'Support & Help', setting: 'Settings' }[page] || 'Dashboard';
}

function toggleAC() {
    const isOn = acToggle.checked;
    tempSlider.disabled = !isOn;
    modeButtons.forEach(btn => {
        btn.style.opacity = isOn ? '1' : '0.5';
        btn.style.pointerEvents = isOn ? 'auto' : 'none';
    });
}

function updateTemperature() {
    const value = tempSlider.value;
    tempValue.textContent = `${value}°C`;
}

function renderDevices(room) {
    devicesGrid.innerHTML = '';
    const devices = roomData[room].devices;

    let maxUsage = 0;
    devices.forEach(d => {
        if (d.usage > maxUsage) maxUsage = d.usage;
    });
    if (maxUsage === 0) maxUsage = 1;

    devices.forEach((device, idx) => {
        const currentUsage = device.isOn ? device.usage : 0; // kWh shown when ON, 0 when OFF
        const widthPercent = (currentUsage / maxUsage) * 100;

        const card = document.createElement('div');
        card.className = 'device-card';
        card.innerHTML = `
            <i class="fas fa-${device.icon} device-icon"></i>
            <div class="device-info">
                <h4>${device.name}</h4>
                <p class="device-state">${device.isOn ? "On" : "Off"}</p>
            </div>
            <div class="device-usage">
                <div class="usage-bar" style="--usage-width:${widthPercent}%"></div>
                <span class="usage-text">${currentUsage.toFixed(2)} kWh</span>
            </div>
            <label class="toggle-switch">
                <input type="checkbox" ${device.isOn ? "checked" : ""} data-room="${room}" data-index="${idx}">
                <span class="toggle-slider"></span>
            </label>
        `;
        devicesGrid.appendChild(card);

        const checkbox = card.querySelector('input[type="checkbox"]');
        const usageText = card.querySelector('.usage-text');
        const usageBar = card.querySelector('.usage-bar');
        const stateP = card.querySelector('.device-state');

        checkbox.addEventListener('change', (e) => {
            const checked = e.target.checked;
            device.isOn = checked;

            const newUsage = checked ? device.usage : 0;
            const newWidth = (newUsage / maxUsage) * 100;
            usageText.textContent = `${newUsage.toFixed(2)} kWh`;
            usageBar.style.setProperty('--usage-width', `${newWidth}%`);
            stateP.textContent = checked ? "On" : "Off";

            updateSummaryStats();
        });
    });

    updateSummaryStats();
}

function renderLights(room) {
    lightsContainer.innerHTML = '';
    const lights = roomData[room].lights || [];

    lights.forEach((light) => {
        const lightItem = document.createElement('div');
        lightItem.className = 'light-item';
        lightItem.innerHTML = `
            <div class="light-info">
                <i class="fas fa-${light.icon} light-icon"></i>
                <span>${light.name}</span>
            </div>
            <div class="light-controls">
                <input type="range" class="light-slider" 
                       value="${light.brightness}" 
                       min="0" max="100">
                <span class="light-percentage">${light.brightness}%</span>
                <label class="toggle-switch">
                    <input type="checkbox" ${light.brightness > 0 ? 'checked' : ''}>
                    <span class="toggle-slider"></span>
                </label>
            </div>
        `;
        lightsContainer.appendChild(lightItem);

        const slider = lightItem.querySelector('.light-slider');
        const percentageSpan = lightItem.querySelector('.light-percentage');
        const toggle = lightItem.querySelector('input[type="checkbox"]');

        slider.addEventListener('input', (e) => {
            let value = parseInt(e.target.value, 10);
            light.brightness = value;
            percentageSpan.textContent = `${value}%`;
            toggle.checked = value > 0;
        });

        toggle.addEventListener('change', (e) => {
            if (!e.target.checked) {
                light.brightness = 0;
                slider.value = 0;
                percentageSpan.textContent = "0%";
            } else {
                if (light.brightness <= 0) light.brightness = 50; // default restore
                slider.value = light.brightness;
                percentageSpan.textContent = `${light.brightness}%`;
            }
        });
    });
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const item = document.createElement('div');
        item.className = 'todo-item';
        item.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
            <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <button class="delete-todo" data-index="${index}">×</button>
        `;
        todoList.appendChild(item);
    });

    document.querySelectorAll('.todo-checkbox').forEach(cb => {
        cb.addEventListener('change', e => {
            const i = e.target.dataset.index;
            todos[i].completed = e.target.checked;
            renderTodos();
        });
    });
    document.querySelectorAll('.delete-todo').forEach(btn => {
        btn.addEventListener('click', e => {
            const i = e.target.dataset.index;
            todos.splice(i, 1);
            renderTodos();
        });
    });
}

function showAddTodoForm() {
    // Check if form is already present
    if (document.querySelector('.add-todo-form')) {
        return;
    }
    const form = document.createElement('div');
    form.className = 'add-todo-form';
    form.innerHTML = `
        <input type="text" placeholder="Add a new task..." id="newTodoInput">
        <div class="todo-form-buttons">
            <button id="saveTodoBtn">Save</button>
            <button id="cancelTodoBtn">Cancel</button>
        </div>
    `;
    todoList.appendChild(form);
    document.getElementById('newTodoInput').focus();

    document.getElementById('saveTodoBtn').addEventListener('click', () => {
        const input = document.getElementById('newTodoInput');
        if (input.value.trim()) {
            todos.push({ text: input.value.trim(), completed: false });
            renderTodos();
        } else {
            todoList.removeChild(form);
        }
    });
    document.getElementById('cancelTodoBtn').addEventListener('click', () => {
        todoList.removeChild(form);
    });
}

function initUsageChart() {
    const ctx = document.getElementById('usageChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
            datasets: [{
                label: 'Energy Usage (kWh)',
                data: [12, 19, 15, 25, 22, 30, 27],
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: '#888' }
                },
                x: {
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: '#888' }
                }
            }
        }
    });
}
function updateSummaryStats() {
    let activeCount = 0;
    let totalEnergy = 0;
    Object.values(roomData).forEach(room => {
        room.devices.forEach(d => {
            if (d.isOn) {
                activeCount += 1;
                totalEnergy += d.usage;
            }
        });
    });

    document.querySelectorAll('.stat-card').forEach(card => {
        const labelEl = card.querySelector('.stat-card-label');
        const valueEl = card.querySelector('.stat-card-value');
        if (!labelEl || !valueEl) return;
        const label = labelEl.textContent.trim().toLowerCase();
        if (label.includes('active devices')) {
            valueEl.textContent = activeCount;
        } else if (label.includes('energy used today')) {
            valueEl.textContent = `${totalEnergy.toFixed(2)} kWh`;
        }
    });

    const usageStatNodes = document.querySelectorAll('.usage-stats .stat');
}
renderDevices("living");
renderLights("living");
updateSummaryStats();
initDashboard();

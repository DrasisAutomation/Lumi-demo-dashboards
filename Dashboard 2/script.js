const roomData = {
  office: {
    temperature: 22,
    humidity: 70,
    brightness: 75,
    devices: [
      { id: "chandelier", name: "Chandelier", type: "Light", on: false },
      { id: "table-lamp", name: "Table Lamp", type: "Light", on: true },
      { id: "floor-lamp", name: "Floor Lamp", type: "Light", on: false },
      { id: "homepod", name: "Apple HomePod", type: "Audio", on: true },
      { id: "dyson", name: "Dyson Purifier", type: "Air", on: false }
    ]
  },

  kitchen: {
    temperature: 20,
    humidity: 60,
    brightness: 50,
    devices: [
      { id: "chandelier", name: "Chandelier", type: "Light", on: true },
      { id: "planter", name: "Eco Planter", type: "Plant", on: false },
      { id: "wyze", name: "Wyze Bulb", type: "Light", on: true },
      { id: "coffee", name: "Smart Coffee Maker", type: "Appliance", on: false }
    ]
  },

  bedroom: {
    temperature: 24,
    humidity: 65,
    brightness: 40,
    devices: [
      { id: "bed-lamp", name: "Bedside Lamp", type: "Light", on: true },
      { id: "floor-lamp", name: "Floor Lamp", type: "Light", on: true },
      { id: "nest", name: "Nest Thermostat", type: "Climate", on: true },
      { id: "speaker", name: "Smart Speaker", type: "Audio", on: false }
    ]
  },

  livingroom: {
    temperature: 23,
    humidity: 55,
    brightness: 80,
    devices: [
      { id: "chandelier", name: "Chandelier", type: "Light", on: true },
      { id: "table-lamp", name: "Table Lamp", type: "Light", on: true },
      { id: "tv", name: "Smart TV", type: "Entertainment", on: true },
      { id: "sonos", name: "Sonos Speaker", type: "Audio", on: true },
      { id: "airpurifier", name: "Dyson Air Purifier", type: "Air", on: false }
    ]
  }
};


const sceneData = {
    none: {
        color: "#ffd700",
        brightness: 70,
        devices: {}
    },
    working: {
        color: "#4169e1",
        devices: { chandelier: true, "table-lamp": true }
    },
    reading: {
        color: "#ffd700",
        brightness: 60,
        devices: { "table-lamp": true }
    },
    relaxing: {
        color: "#9370db",
        brightness: 40,
        devices: { chandelier: false, "table-lamp": true, "floor-lamp": true }
    }
};


function loadRoom(room) {
  const data = roomData[room];

  updateTemperature(data.temperature);
  document.getElementById("humidityValue").textContent = data.humidity;
  document.getElementById("brightnessSlider").value = data.brightness;
  document.getElementById("brightnessValue").textContent = data.brightness + "%";

  renderDevices(data.devices);
  renderSmartDevices(data.devices);
}

const brightnessSliderEl = document.getElementById("brightnessSlider");
const colorButtonsEl = document.querySelectorAll(".color-btn");

colorButtonsEl.forEach(btn => {
    btn.addEventListener("click", () => {
        colorButtonsEl.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const selectedColor = btn.dataset.color;

        // ✅ update slider's CSS variable
        brightnessSliderEl.style.setProperty("--dot-color", selectedColor);
    });
});

// ✅ set initial dot color from the active color button
const activeBtn = document.querySelector(".color-btn.active");
if (activeBtn) {
    brightnessSliderEl.style.setProperty("--dot-color", activeBtn.dataset.color);
}


function applyScene(scene) {
    const data = sceneData[scene];

    const brightnessSlider = document.getElementById("brightnessSlider");
    brightnessSlider.value = data.brightness;
    document.getElementById("brightnessValue").textContent = data.brightness + "%";

    const colorButtons = document.querySelectorAll(".color-btn");
    colorButtons.forEach(btn => {
        if (btn.dataset.color === data.color) {
            colorButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        }
    });

    document.querySelectorAll(".device-toggle").forEach(input => {
        if (data.devices.hasOwnProperty(input.dataset.device)) {
            input.checked = data.devices[input.dataset.device];
        }
    });
}


const slider = document.getElementById('slider');
const handle = document.getElementById('handle');
const valueText = document.getElementById('valueText');
const statusText = document.getElementById('status');
const circleFill = document.querySelector('.circle-fill');
const btnCool = document.getElementById('btnCool');
const btnComfort = document.getElementById('btnComfort');
const btnWarm = document.getElementById('btnWarm');
const powerToggle = document.getElementById('circularPower');

let isDragging = false;
let currentValue = 22;
let maxValue = 30;
let minValue = 16;
let circumference = 628; // 2 * π * r (where r=100)
const radius = 100; // Radius of the circle
const centerX = 110; // Center X coordinate of the circle
const centerY = 110; // Center Y coordinate of the circle

updateTemperature(currentValue);

handle.addEventListener('pointerdown', (e) => {
    isDragging = true;
    if (handle.setPointerCapture) handle.setPointerCapture(e.pointerId);
    e.preventDefault();
});

document.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    const rect = slider.getBoundingClientRect();
    const sliderCenterX = rect.left + rect.width / 2;
    const sliderCenterY = rect.top + rect.height / 2;

    let angle = Math.atan2(sliderCenterY - e.clientY, e.clientX - sliderCenterX) * (180 / Math.PI);
    angle = (angle + 270 + 360) % 360;


    let value = Math.round(((360 - angle) / 360) * (maxValue - minValue) + minValue);
    value = Math.max(minValue, Math.min(maxValue, value));

    updateTemperature(value);
}, { passive: false });

document.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    if (handle.releasePointerCapture) handle.releasePointerCapture(e.pointerId);
});


handle.addEventListener('touchstart', (e) => {
    isDragging = true;
    e.preventDefault();
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const rect = slider.getBoundingClientRect();
    const sliderCenterX = rect.left + rect.width / 2;
    const sliderCenterY = rect.top + rect.height / 2;

    let angle = Math.atan2(sliderCenterY - touch.clientY, touch.clientX - sliderCenterX) * (180 / Math.PI);
    angle = (angle + 270 + 360) % 360;  // ✅ same as pointermove

    let value = Math.round(((360 - angle) / 360) * (maxValue - minValue) + minValue);
    value = Math.max(minValue, Math.min(maxValue, value));

    updateTemperature(value);
});

document.addEventListener('touchend', () => {
    isDragging = false;
});

function updateTemperature(value) {
    currentValue = value;
    valueText.textContent = `${value}°C`;

    statusText.className = 'status';

    if (value <= 18) {
        statusText.textContent = 'Cool';
        statusText.classList.add('cool');
    } else if (value <= 24) {
        statusText.textContent = 'Comfortable';
        statusText.classList.add('comfort');
    } else {
        statusText.textContent = 'Warm';
        statusText.classList.add('warm');
    }

    const angle = ((value - minValue) / (maxValue - minValue)) * 360 - 90; // start at top
    const radians = angle * (Math.PI / 180);

    const x = centerX + radius * Math.cos(radians);
    const y = centerY + radius * Math.sin(radians);

    handle.style.left = `${x}px`;
    handle.style.top = `${y}px`;

    const offset = circumference - ((value - minValue) / (maxValue - minValue)) * circumference;
    circleFill.style.strokeDashoffset = offset;
}


btnCool.addEventListener('click', () => {
    updateTemperature(18);
    setActiveButton(btnCool);
});

btnComfort.addEventListener('click', () => {
    updateTemperature(22);
    setActiveButton(btnComfort);
});

btnWarm.addEventListener('click', () => {
    updateTemperature(26);
    setActiveButton(btnWarm);
});

powerToggle.addEventListener('change', () => {
    if (powerToggle.checked) {
        slider.style.opacity = '1';
        handle.style.opacity = '1';
        valueText.style.opacity = '1';
        statusText.style.opacity = '1';
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.style.opacity = '1';
        });
    } else {
        slider.style.opacity = '0.5';
        handle.style.opacity = '0.5';
        valueText.style.opacity = '0.5';
        statusText.style.opacity = '0.5';
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.style.opacity = '0.5';
        });
    }
});

function setActiveButton(activeBtn) {
    [btnCool, btnComfort, btnWarm].forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const acSidebar = document.getElementById('acSidebar');

mobileMenuBtn.addEventListener('click', () => {
    acSidebar.classList.toggle('open');
});

const brightnessSlider = document.getElementById('brightnessSlider');
const brightnessValue = document.getElementById('brightnessValue');

brightnessSlider.addEventListener('input', () => {
    brightnessValue.textContent = `${brightnessSlider.value}%`;
});

const colorButtons = document.querySelectorAll('.color-btn');
colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        colorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

const modeButtons = document.querySelectorAll('.mode-btn');
modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

const fanButtons = document.querySelectorAll('.fan-btn');
fanButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        fanButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

const addTodoBtn = document.getElementById('addTodoBtn');
const newTodoInput = document.getElementById('newTodoInput');
const todoList = document.getElementById('todoList');

addTodoBtn.addEventListener('click', () => {
    if (newTodoInput.value.trim() !== '') {
        const id = `todo${Date.now()}`;
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
                <input type="checkbox" id="${id}">
                <label for="${id}">${newTodoInput.value}</label>
            `;
        todoList.appendChild(todoItem);
        newTodoInput.value = '';
    }
});

newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodoBtn.click();
    }
});

const playPauseBtn = document.getElementById('playPauseBtn');
const likeBtn = document.getElementById('likeBtn');
const progressFill = document.getElementById('progressFill');

playPauseBtn.addEventListener('click', () => {
    const icon = playPauseBtn.querySelector('i');
    if (icon.classList.contains('fa-play')) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        progressFill.style.width = '60%';
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        progressFill.style.width = '0%';
    }
});

likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('liked');
    const icon = likeBtn.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
});

setActiveButton(btnComfort);

document.querySelectorAll(".room-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".room-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const room = tab.dataset.room;
        loadRoom(room);
    });
});

loadRoom("office");

document.getElementById("sceneSelect").addEventListener("change", (e) => {
    applyScene(e.target.value);
});
const fanIcon = document.getElementById("fanIcon");

function updateFanSpeed(speed) {
    fanIcon.classList.remove("fan-spin");
    if (!powerToggle.checked) {
        fanIcon.style.color = "#555";
        return;
    }

    fanIcon.style.color = "#3b82f6";
    fanIcon.classList.add("fan-spin");

    switch (speed) {
        case "1":
            fanIcon.style.animationDuration = "2s"; // slow
            break;
        case "2":
            fanIcon.style.animationDuration = "1.5s"; // medium
            break;
        case "3":
            fanIcon.style.animationDuration = "1s"; // fast
            break;
        case "4":
            fanIcon.style.animationDuration = "0.5s"; // very fast
            break;
    }
}

fanButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        fanButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        updateFanSpeed(btn.dataset.speed);
    });
});

powerToggle.addEventListener("change", () => {
    if (!powerToggle.checked) {
        fanIcon.classList.remove("fan-spin");
        fanIcon.style.color = "#555";
    } else {
        const activeBtn = document.querySelector(".fan-btn.active");
        if (activeBtn) updateFanSpeed(activeBtn.dataset.speed);
    }
});

updateFanSpeed("2");

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".nav-tab");
    const pages = document.querySelectorAll(".page-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-tab");

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            pages.forEach(p => {
                if (p.id === target + "Page") {
                    p.classList.add("active");
                } else {
                    p.classList.remove("active");
                }
            });
        });
    });
});

function renderDevices(devices) {
  const container = document.querySelector(".device-list");
  container.innerHTML = ""; // clear old devices

  devices.forEach(dev => {
    const item = document.createElement("div");
    item.className = "device-item";
    item.innerHTML = `
      <span>${dev.name}</span>
      <label class="toggle-switch">
        <input type="checkbox" class="device-toggle" data-device="${dev.id}" ${dev.on ? "checked" : ""}>
        <span class="slider"></span>
      </label>
    `;
    container.appendChild(item);
  });
}

function renderSmartDevices(devices) {
  const grid = document.querySelector(".devices-grid");
  grid.innerHTML = "";

  devices.forEach(dev => {
    const card = document.createElement("div");
    card.className = "smart-device";
    card.innerHTML = `
      <div class="device-icon">💡</div>
      <div class="device-info">
        <div class="device-name">${dev.name}</div>
        <div class="device-type">${dev.type}</div>
      </div>
      <label class="toggle-switch">
        <input type="checkbox" class="smart-device-toggle" data-device="${dev.id}" ${dev.on ? "checked" : ""}>
        <span class="slider"></span>
      </label>
    `;
    grid.appendChild(card);
  });
}
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("device-toggle") || e.target.classList.contains("smart-device-toggle")) {
    const room = document.querySelector(".room-tab.active").dataset.room;
    const devId = e.target.dataset.device;
    const dev = roomData[room].devices.find(d => d.id === devId);
    if (dev) dev.on = e.target.checked;
  }
});

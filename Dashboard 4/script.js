
class SmartHomeDashboard {

    toggleSystemPower() {
        const systemPower = this.systemPower = !this.systemPower;
        const toggleSwitch = event.target.closest('.toggle-switch');

        if (systemPower) {
            toggleSwitch.classList.add('active');
            this.logActivity('System power turned ON');
        } else {
            toggleSwitch.classList.remove('active');
            this.logActivity('System power turned OFF');
        }
    }
    toggleAutoUpdates() {
        const autoUpdates = this.autoUpdates = !this.autoUpdates;
        const toggleSwitch = event.target.closest('.toggle-switch');

        if (autoUpdates) {
            toggleSwitch.classList.add('active');
            this.logActivity('Auto updates enabled');
        } else {
            toggleSwitch.classList.remove('active');
            this.logActivity('Auto updates disabled');
        }
    }
    openRoomFromOverview(roomId) {
        // Close the left panel (overview)
        const leftPanel = document.getElementById('leftPanel');
        const overlay = document.getElementById('overlay');

        leftPanel.classList.remove('active');
        overlay.classList.remove('active');

        // Open the specific room control panel
        this.showRoomControls(roomId);
    }
    toggleEnergySavings() {
        const energySavings = this.energySavings = !this.energySavings;
        const toggleSwitch = event.target.closest('.toggle-switch');

        if (energySavings) {
            toggleSwitch.classList.add('active');
            this.logActivity('Energy savings mode enabled');
        } else {
            toggleSwitch.classList.remove('active');
            this.logActivity('Energy savings mode disabled');
        }
    }

    toggleNightModeAuto() {
        const nightModeAuto = this.nightModeAuto = !this.nightModeAuto;
        const toggleSwitch = event.target.closest('.toggle-switch');

        if (nightModeAuto) {
            toggleSwitch.classList.add('active');
            this.logActivity('Night mode automation enabled');
        } else {
            toggleSwitch.classList.remove('active');
            this.logActivity('Night mode automation disabled');
        }
    }

    // Add these methods for security panel
    toggleSecuritySystem() {
        const securitySystem = this.securitySystem = !this.securitySystem;
        const toggleSwitch = event.target.closest('.toggle-switch');

        if (securitySystem) {
            toggleSwitch.classList.add('active');
            this.logActivity('Security system armed');
        } else {
            toggleSwitch.classList.remove('active');
            this.logActivity('Security system disarmed');
        }
    }

    toggleMotionDetection() {
        const motionDetection = this.motionDetection = !this.motionDetection;
        const toggleSwitch = event.target.closest('.toggle-switch');

        if (motionDetection) {
            toggleSwitch.classList.add('active');
            this.logActivity('Motion detection enabled');
        } else {
            toggleSwitch.classList.remove('active');
            this.logActivity('Motion detection disabled');
        }
    }

    toggleDoorMonitoring() {
        const doorMonitoring = this.doorMonitoring = !this.doorMonitoring;
        const toggleSwitch = event.target.closest('.toggle-switch');

        if (doorMonitoring) {
            toggleSwitch.classList.add('active');
            this.logActivity('Door monitoring enabled');
        } else {
            toggleSwitch.classList.remove('active');
            this.logActivity('Door monitoring disabled');
        }
    }

    toggleSecurityArmed() {
        const securityArmed = this.securityArmed = !this.securityArmed;
        const toggleSwitch = event.target.closest('.toggle-switch');

        if (securityArmed) {
            toggleSwitch.classList.add('active');
            this.logActivity('Security system armed');
        } else {
            toggleSwitch.classList.remove('active');
            this.logActivity('Security system disarmed');
        }
    }

    toggleAwayMode() {
        const awayMode = this.awayMode = !this.awayMode;
        const toggleSwitch = event.target.closest('.toggle-switch');

        if (awayMode) {
            toggleSwitch.classList.add('active');
            // Automatically turn off some devices when away mode is activated
            this.quickAction('awayMode');
            this.logActivity('Away mode activated');
        } else {
            toggleSwitch.classList.remove('active');
            this.logActivity('Away mode deactivated');
        }
    }

    toggleEcoMode() {
        const ecoMode = this.ecoMode = !this.ecoMode;
        const toggleSwitch = event.target.closest('.toggle-switch');

        if (ecoMode) {
            toggleSwitch.classList.add('active');
            this.logActivity('Eco mode activated - Energy saving enabled');
        } else {
            toggleSwitch.classList.remove('active');
            this.logActivity('Eco mode deactivated');
        }
    }

    toggleSolarPriority() {
        const solarPriority = this.solarPriority = !this.solarPriority;
        const toggleSwitch = event.target.closest('.toggle-switch');

        if (solarPriority) {
            toggleSwitch.classList.add('active');
            this.logActivity('Solar priority enabled - Using solar power first');
        } else {
            toggleSwitch.classList.remove('active');
            this.logActivity('Solar priority disabled');
        }
    }

    togglePeakHoursMode() {
        const peakHoursMode = this.peakHoursMode = !this.peakHoursMode;
        const toggleSwitch = event.target.closest('.toggle-switch');

        if (peakHoursMode) {
            toggleSwitch.classList.add('active');
            this.logActivity('Peak hours mode activated - Reducing energy usage');
        } else {
            toggleSwitch.classList.remove('active');
            this.logActivity('Peak hours mode deactivated');
        }
    }
    constructor() {
        this.currentZoom = 1;
        this.minZoom = 0.5;
        this.maxZoom = 5;
        this.zoomStep = 0.5;

        this.isPanning = false;
        this.startX = 0;
        this.startY = 0;
        this.panX = 0;
        this.panY = 0;
        this.autoUpdates = true;
        this.energySavings = false;
        this.nightModeAuto = true;

        // Add security properties
        this.securitySystem = false;
        this.motionDetection = true;
        this.doorMonitoring = true;
        this.activeRoom = null;
        this.history = [];
        this.systemPower = true;
        this.securityArmed = false;
        this.awayMode = false;
        this.ecoMode = false;
        this.solarPriority = true;
        this.peakHoursMode = false;
        this.initializeElements();
        this.setupEventListeners();
        this.initializeRoomData();
        this.updateAllRoomStates();
        this.lightModePresets = {
            normal: { level: 50, color: '#ffffff' }, // 50%
            warm: { level: 40, color: '#ffd8a6' },   // 40%
            cool: { level: 60, color: '#a6d8ff' },   // 60%
            reading: { level: 80, color: '#f5f5dc' }, // 80%
            party: { level: 100, color: '#ff69b4' }  // 100%
        };

    }

    initializeElements() {
        this.floorPlanContainer = document.getElementById('floorPlanContainer');
        this.floorPlanWrapper = document.getElementById('floorPlanWrapper');
        this.floorPlan = document.getElementById('floorPlan');

        this.zoomInBtn = document.getElementById('zoomIn');
        this.zoomOutBtn = document.getElementById('zoomOut');
        this.resetZoomBtn = document.getElementById('resetZoom');
        this.zoomInfo = document.getElementById('zoomInfo');

        this.systemToggle = document.getElementById('systemToggle');
        this.navTabs = document.querySelectorAll('.nav-tab');
        this.settingsDropdown = document.getElementById('settingsDropdown');
        this.actionsDropdown = document.getElementById('actionsDropdown');

        this.sidePanel = document.getElementById('sidePanel');
        this.closePanelBtn = document.getElementById('closePanelBtn');
        this.panelContent = document.getElementById('panelContent');
        this.panelTitle = document.getElementById('panelTitle');

        this.overlay = document.getElementById('overlay');
        this.roomButtons = document.querySelectorAll('.room-button');
    }

    setupEventListeners() {
        // Zoom controls
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        this.resetZoomBtn.addEventListener('click', () => this.resetZoom());

        // Navigation
        this.systemToggle.addEventListener('click', () => this.toggleSystem());

        this.navTabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.view));
        });

        // Dropdowns
        this.settingsDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown('settings');
        });

        this.actionsDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown('actions');
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => this.closeAllDropdowns());

        // Panel controls
        this.closePanelBtn.addEventListener('click', () => this.hidePanel());
        this.overlay.addEventListener('click', () => this.hidePanel());

        // Room buttons
        this.roomButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const roomId = button.getAttribute('data-room');
                this.showRoomControls(roomId);
            });
        });

        // Pan and zoom
        this.setupPanAndZoom();

        // Window resize
        window.addEventListener('resize', () => this.updateZoomClass());
    }

    setupPanAndZoom() {
        // Mouse events
        this.floorPlanContainer.addEventListener('mousedown', (e) => this.startPan(e));
        this.floorPlanContainer.addEventListener('mousemove', (e) => this.pan(e));
        this.floorPlanContainer.addEventListener('mouseup', () => this.endPan());
        this.floorPlanContainer.addEventListener('mouseleave', () => this.endPan());
        this.floorPlanContainer.addEventListener('wheel', (e) => this.handleWheel(e));

        // Touch events
        this.floorPlanContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.floorPlanContainer.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.floorPlanContainer.addEventListener('touchend', () => this.endPan());
    }

    startPan(e) {
        if (e.target.closest('.room-button')) return;

        this.isPanning = true;
        this.startX = e.clientX || e.touches[0].clientX;
        this.startY = e.clientY || e.touches[0].clientY;
        e.preventDefault();
    }

    pan(e) {
        if (!this.isPanning) return;

        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        const deltaX = clientX - this.startX;
        const deltaY = clientY - this.startY;

        this.panX += deltaX;
        this.panY += deltaY;

        this.startX = clientX;
        this.startY = clientY;

        this.applyTransform();
        e.preventDefault();
    }

    endPan() {
        this.isPanning = false;
    }

    handleTouchStart(e) {
        const target = e.target;

        // Allow taps on UI elements
        if (
            target.closest('.room-button') ||
            target.closest('.zoom-btn') ||
            target.closest('.quick-btn') ||
            target.closest('.close-btn') ||
            target.closest('.dropdown-btn') ||
            target.closest('.toggle-switch') ||
            target.closest('.temp-btn')
        ) {
            return; // Don’t start pan
        }

        if (e.touches.length === 1) {
            this.startPan(e);
            e.preventDefault();
        }
    }

    handleTouchMove(e) {
        if (this.isPanning && e.touches.length === 1) {
            this.pan(e);
            e.preventDefault();
        }
    }


    handleWheel(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -this.zoomStep : this.zoomStep;
        const newZoom = this.currentZoom + delta;

        if (newZoom >= this.minZoom && newZoom <= this.maxZoom) {
            this.currentZoom = newZoom;
            this.applyTransform();
            this.updateZoomInfo();
            this.updateZoomClass();
        }
    }

    zoomIn() {
        if (this.currentZoom < this.maxZoom) {
            this.currentZoom = Math.min(this.currentZoom + this.zoomStep, this.maxZoom);
            this.applyTransform();
            this.updateZoomInfo();
            this.updateZoomClass();
        }
    }

    zoomOut() {
        if (this.currentZoom > this.minZoom) {
            this.currentZoom = Math.max(this.currentZoom - this.zoomStep, this.minZoom);
            this.applyTransform();
            this.updateZoomInfo();
            this.updateZoomClass();
        }
    }

    resetZoom() {
        this.currentZoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.applyTransform();
        this.updateZoomInfo();
        this.updateZoomClass();
    }

    applyTransform() {
        this.floorPlanWrapper.style.transform =
            `translate(${this.panX}px, ${this.panY}px) scale(${this.currentZoom})`;

        // 👇 pass zoom value into CSS
        this.floorPlanWrapper.style.setProperty("--zoom", this.currentZoom);
    }




    updateZoomInfo() {
        this.zoomInfo.textContent = `${Math.round(this.currentZoom * 100)}%`;
    }

    updateZoomClass() {
        // Remove all zoom classes
        this.floorPlanContainer.className = this.floorPlanContainer.className.replace(/zoom-[\d-]+/g, '');

        // Add appropriate zoom class for responsive text sizing
        if (this.currentZoom <= 0.75) {
            this.floorPlanContainer.classList.add('zoom-0-5');
        } else if (this.currentZoom <= 1.25) {
            this.floorPlanContainer.classList.add('zoom-1');
        } else if (this.currentZoom <= 1.75) {
            this.floorPlanContainer.classList.add('zoom-1-5');
        } else if (this.currentZoom <= 2.5) {
            this.floorPlanContainer.classList.add('zoom-2');
        } else if (this.currentZoom <= 3.5) {
            this.floorPlanContainer.classList.add('zoom-3');
        } else if (this.currentZoom <= 4.5) {
            this.floorPlanContainer.classList.add('zoom-4');
        } else {
            this.floorPlanContainer.classList.add('zoom-5');
        }
    }

    toggleSystem() {
        this.systemToggle.classList.toggle('active');
        const isActive = this.systemToggle.classList.contains('active');

        if (isActive) {
            this.logActivity('System activated - All devices online');
        } else {
            this.logActivity('System deactivated - Entering standby mode');
        }
    }

    switchTab(view) {
        // Highlight active tab
        this.navTabs.forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        // Load content only into LEFT panel
        const leftPanel = document.getElementById('leftPanel');
        const title = document.getElementById('leftPanelTitle');
        const content = document.getElementById('leftPanelContent');
        const overlay = document.getElementById('overlay');

        title.textContent = this.getViewTitle(view);
        content.innerHTML = this.getViewContent(view);

        leftPanel.classList.add('active');
        overlay.classList.add('active');

        // Do NOT open right panel anymore
        this.sidePanel.classList.remove('active');

        this.logActivity(`Switched to ${view} view`);
    }


    getViewTitle(view) {
        const titles = {
            overview: 'System Overview',
            rooms: 'Room Controls',
            energy: 'Energy Management'
        };
        return titles[view] || 'Dashboard';
    }

    getViewContent(view) {
        switch (view) {
            case 'overview':
                return this.generateOverviewContent();
            case 'rooms':
                return this.generateRoomsContent();
            case 'energy':
                return this.generateEnergyContent();
            default:
                return '<p>Loading...</p>';
        }
    }

    generateOverviewContent() {
        return `
    <div class="control-section">
        <div class="section-title">🏠 System Status</div>
        <div class="control-item">
            <div class="control-label">System Power</div>
            <div class="toggle-switch ${this.systemPower ? 'active' : ''}" 
                 onclick="dashboard.toggleSystemPower()">
                <div class="toggle-slider"></div>
            </div>
        </div>
        <div class="control-item">
            <div class="control-label">Security Armed</div>
            <div class="toggle-switch ${this.securityArmed ? 'active' : ''}" 
                 onclick="dashboard.toggleSecurityArmed()">
                <div class="toggle-slider"></div>
            </div>
        </div>
        <div class="control-item">
            <div class="control-label">Away Mode</div>
            <div class="toggle-switch ${this.awayMode ? 'active' : ''}" 
                 onclick="dashboard.toggleAwayMode()">
                <div class="toggle-slider"></div>
            </div>
        </div>
    </div>
    
    <div class="control-section">
        <div class="section-title">📊 Quick Stats</div>
        <div class="control-item">
            <div class="control-label">Active Devices</div>
            <span>16/24</span>
        </div>
        <div class="control-item">
            <div class="control-label">Energy Usage</div>
            <span>2.4 kWh</span>
        </div>
        <div class="control-item">
            <div class="control-label">Temperature Avg</div>
            <span>23°C</span>
        </div>
    </div>
    
    <div class="control-section">
        <div class="section-title">🚪 Room Quick Access</div>
        ${Object.entries(this.rooms).map(([id, room]) => {
            const lightCount = Object.values(room.devices).filter(d => d.type === 'light' && d.status).length;
            const totalLights = Object.values(room.devices).filter(d => d.type === 'light').length;
            return `
                <div class="control-item">
                    <div class="control-label">${room.icon} ${room.name}</div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 11px; color: #666;">Lights: ${lightCount}/${totalLights}</span>
                        <button class="quick-btn" onclick="dashboard.openRoomFromOverview('${id}')">Control</button>
                    </div>
                </div>
            `;
        }).join('')}
    </div>
    `;
    }
    generateRoomsContent() {
        return `
    <div class="control-section">
        <div class="section-title">🏠 All Rooms</div>
        ${Object.entries(this.rooms).map(([id, room]) => {
            const lightCount = Object.values(room.devices).filter(d => d.type === 'light' && d.status).length;
            const totalLights = Object.values(room.devices).filter(d => d.type === 'light').length;
            return `
                <div class="control-item">
                    <div class="control-label">${room.icon} ${room.name}</div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 11px; color: #666;">Lights: ${lightCount}/${totalLights}</span>
                        <button class="quick-btn" onclick="dashboard.openRoomFromOverview('${id}')">Control</button>
                    </div>
                </div>
            `;
        }).join('')}
    </div>
    
    <div class="quick-actions">
        <button class="quick-btn" onclick="dashboard.quickAction('allLightsOn')">All Lights On</button>
        <button class="quick-btn" onclick="dashboard.quickAction('allLightsOff')">All Lights Off</button>
        <button class="quick-btn" onclick="dashboard.quickAction('nightMode')">Night Mode</button>
        <button class="quick-btn" onclick="dashboard.quickAction('awayMode')">Away Mode</button>
    </div>
    `;
    }
    generateEnergyContent() {
        return `
        <div class="control-section">
            <div class="section-title">⚡ Energy Management</div>
            <div class="control-item">
                <div class="control-label">Eco Mode</div>
                <div class="toggle-switch ${this.ecoMode ? 'active' : ''}" 
                     onclick="dashboard.toggleEcoMode()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="control-item">
                <div class="control-label">Solar Priority</div>
                <div class="toggle-switch ${this.solarPriority ? 'active' : ''}" 
                     onclick="dashboard.toggleSolarPriority()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="control-item">
                <div class="control-label">Peak Hours Mode</div>
                <div class="toggle-switch ${this.peakHoursMode ? 'active' : ''}" 
                     onclick="dashboard.togglePeakHoursMode()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
        </div>
        
        <div class="control-section">
            <div class="section-title">📈 Usage Statistics</div>
            <div class="control-item">
                <div class="control-label">Today's Usage</div>
                <span>12.4 kWh</span>
            </div>
            <div class="control-item">
                <div class="control-label">Monthly Avg</div>
                <span>380 kWh</span>
            </div>
            <div class="control-item">
                <div class="control-label">Cost Today</div>
                <span>$3.12</span>
            </div>
        </div>
    `;
    }
    toggleDropdown(type) {
        const dropdown = type === 'settings' ?
            this.settingsDropdown.parentElement :
            this.actionsDropdown.parentElement;

        this.closeAllDropdowns();
        dropdown.classList.toggle('active');
    }

    closeAllDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    showRoomControls(roomId) {
        const room = this.rooms[roomId];
        if (!room) return;

        this.activeRoom = roomId;
        this.panelTitle.textContent = `${room.icon} ${room.name}`;
        this.panelContent.innerHTML = this.generateRoomControls(roomId, room);
        this.sidePanel.classList.add('active');
        this.overlay.classList.add('active');

        this.logActivity(`Opened ${room.name} controls`);
    }

    generateRoomControls(roomId, room) {
        let content = "";

        // Rooms where temperature control should NOT appear
        const noTempRooms = ["garage", "balcony", "bathroom", "kitchen"];

        if (!noTempRooms.includes(roomId)) {
            content += `
        <div class="control-section">
            <div class="section-title">🌡️ Temperature</div>
            <div class="temp-control">
                <button class="temp-btn" onclick="dashboard.adjustTemperature('${roomId}', -1)">−</button>
                <div class="temp-display" id="${roomId}-temp">${room.temperature}°C</div>
                <button class="temp-btn" onclick="dashboard.adjustTemperature('${roomId}', 1)">+</button>
            </div>
        </div>
        `;
        }

        // Lighting controls with 10-level range
        const lights = Object.entries(room.devices).filter(([key, device]) => device.type === 'light');
        if (lights.length > 0) {
            content += `
        <div class="control-section">
            <div class="section-title">💡 Lighting</div>
        `;

            lights.forEach(([deviceKey, device]) => {
                // Initialize device properties if they don't exist
                device.level = device.level || (device.status ? 5 : 0); // Default to level 5 (50%)
                device.color = device.color || '#ffffff';
                device.mode = device.mode || 'normal';

                content += `
            <div class="control-item">
                <div class="control-label">${device.name}</div>
                <div class="toggle-switch ${device.status ? 'active' : ''}" 
                     onclick="dashboard.toggleDevice('${roomId}', '${deviceKey}')">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            `;

                if (device.status) {
                    content += `
                <div class="control-item">
                    <div class="control-label"></div>
                    <input type="range" min="1" max="100" value="${device.level}" 
                           class="level-slider" 
                           oninput="dashboard.adjustLevel('${roomId}', '${deviceKey}', this.value)">
                    <span style="font-size: 11px; min-width: 30px; text-align: right;">${device.level}/100</span>
                </div>
                
                <div class="control-item">
                    <div class="control-label">Color</div>
                    <input type="color" value="${device.color}" 
                           onchange="dashboard.changeLightColor('${roomId}', '${deviceKey}', this.value)"
                           style="width: 40px; height: 30px; border: none; background: none; cursor: pointer;">
                </div>
                
                <div class="control-item">
                    <div class="control-label">Mode</div>
                    <select onchange="dashboard.changeLightMode('${roomId}', '${deviceKey}', this.value)" 
                            style="padding: 4px 8px; border-radius: 6px; border: 1px solid #ddd; font-size: 11px;">
                        <option value="normal" ${device.mode === 'normal' ? 'selected' : ''}>Normal</option>
                        <option value="warm" ${device.mode === 'warm' ? 'selected' : ''}>Warm</option>
                        <option value="cool" ${device.mode === 'cool' ? 'selected' : ''}>Cool</option>
                        <option value="reading" ${device.mode === 'reading' ? 'selected' : ''}>Reading</option>
                        <option value="party" ${device.mode === 'party' ? 'selected' : ''}>Party</option>
                    </select>
                </div>
                `;
                }
            });

            content += `</div>`;
        }

        // Fan controls with 10-level range
        const fans = Object.entries(room.devices).filter(([key, device]) => device.type === 'fan');
        if (fans.length > 0) {
            content += `
        <div class="control-section">
            <div class="section-title">🌀 Fan Controls</div>
        `;

            fans.forEach(([deviceKey, device]) => {
                device.level = device.level || (device.status ? 5 : 0); // Default to level 5 (50%)
                device.direction = device.direction || 'forward';

                content += `
            <div class="control-item">
                <div class="control-label">${device.name}</div>
                <div class="toggle-switch ${device.status ? 'active' : ''}" 
                     onclick="dashboard.toggleDevice('${roomId}', '${deviceKey}')">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            `;

                if (device.status) {
                    content += `
                <div class="control-item">
                    <input type="range" min="1" max="5" value="${device.level}" 
                           class="level-slider" 
                           oninput="dashboard.adjustLevel('${roomId}', '${deviceKey}', this.value)">
                    <span style="font-size: 11px; min-width: 30px; text-align: right;">${device.level}/5</span>
                </div>
                
                <div class="control-item">
                    <div class="control-label">Direction</div>
                    <select onchange="dashboard.changeFanDirection('${roomId}', '${deviceKey}', this.value)" 
                            style="padding: 4px 8px; border-radius: 6px; border: 1px solid #ddd; font-size: 11px;">
                        <option value="forward" ${device.direction === 'forward' ? 'selected' : ''}>Forward</option>
                        <option value="reverse" ${device.direction === 'reverse' ? 'selected' : ''}>Reverse</option>
                    </select>
                </div>
                `;
                }
            });

            content += `</div>`;
        }


        return content;
    }

    // New method to adjust level (1-10)
    adjustLevel(roomId, deviceKey, value) {
        const device = this.rooms[roomId].devices[deviceKey];
        device.level = parseInt(value);

        // Update the display
        const span = event.target.nextElementSibling;
        if (span) span.textContent = `${device.level}/100`;

        // Automatically turn on device if level > 0
        if (parseInt(value) > 0) {
            device.status = true;

            // Update the toggle switch visually
            const toggleSwitch = event.target.closest('.control-section')
                .querySelector('.toggle-switch');
            if (toggleSwitch) {
                toggleSwitch.classList.add('active');
            }
        }

        this.updateRoomState(roomId);
        this.logActivity(`${device.name} level set to ${device.level}/100`);
    }

    // Modified method to change light mode
    changeLightMode(roomId, deviceKey, mode) {
        const device = this.rooms[roomId].devices[deviceKey];
        device.mode = mode;

        // Apply preset based on mode
        const preset = this.lightModePresets[mode];
        if (preset) {
            device.level = preset.level;
            device.color = preset.color;

            // Update UI if panel is open
            if (this.activeRoom === roomId) {
                // Update level slider
                const levelSlider = document.querySelector(`input[oninput*="${deviceKey}"]`);
                if (levelSlider) {
                    levelSlider.value = device.level;
                    const span = levelSlider.nextElementSibling;
                    if (span) span.textContent = `${device.level}/100`;
                }

                // Update color picker
                const colorPicker = document.querySelector(`input[onchange*="${deviceKey}"][type="color"]`);
                if (colorPicker) {
                    colorPicker.value = device.color;
                }
            }
        }

        this.logActivity(`${device.name} mode changed to ${mode}`);
    }
    initializeRoomData() {
        this.rooms = {
            'master-bedroom': {
                name: 'Master Bedroom',
                icon: '🛏️',
                temperature: 22,
                devices: {
                    mainLight: { name: 'Main Light', type: 'light', status: false, brightness: 75 },
                    bedLight: { name: 'Bed Light', type: 'light', status: false, brightness: 50 },
                    ac: { name: 'Air Conditioning', type: 'hvac', status: true },
                    fan: { name: 'Ceiling Fan', type: 'fan', status: false }
                }
            },
            'living-room': {
                name: 'Living Room',
                icon: '🛋️',
                temperature: 24,
                devices: {
                    mainLight: { name: 'Main Lights', type: 'light', status: true, brightness: 80 },
                    accentLight: { name: 'Accent Lights', type: 'light', status: true, brightness: 60 },
                    tv: { name: 'Smart TV', type: 'entertainment', status: false },
                    ac: { name: 'Air Conditioning', type: 'hvac', status: true }
                }
            },

            'kitchen': {
                name: 'Kitchen',
                icon: '🍳',
                temperature: 26,
                devices: {
                    mainLight: { name: 'Ceiling Lights', type: 'light', status: true, brightness: 90 },
                    underCabinet: { name: 'Under Cabinet LEDs', type: 'light', status: true, brightness: 85 },
                    exhaustFan: { name: 'Exhaust Fan', type: 'fan', status: false },
                    oven: { name: 'Smart Oven', type: 'appliance', status: false }
                }
            },
            'bathroom': {
                name: 'Bathroom',
                icon: '🚿',
                temperature: 23,
                devices: {
                    mainLight: { name: 'Main Light', type: 'light', status: false, brightness: 85 },
                    mirrorLight: { name: 'Mirror Lights', type: 'light', status: false, brightness: 90 },
                    exhaustFan: { name: 'Exhaust Fan', type: 'fan', status: false },
                    heatedFloor: { name: 'Heated Floor', type: 'heating', status: false }
                }
            },
            'garage': {
                name: 'Garage',
                icon: '🚗',
                temperature: 18,
                devices: {
                    mainLight: { name: 'Main Lights', type: 'light', status: false, brightness: 100 },
                    securityLight: { name: 'Security Light', type: 'light', status: false, brightness: 90 },
                    garageDoor: { name: 'Garage Door', type: 'door', status: false }
                }
            },
            'balcony': {
                name: 'Balcony',
                icon: '🌅',
                temperature: 25,
                devices: {
                    stringLights: { name: 'String Lights', type: 'light', status: false, brightness: 50 },
                    fan: { name: 'Outdoor Fan', type: 'fan', status: false }
                }
            },
            'dining': {
                name: 'Dining Room',
                icon: '🍽️',
                temperature: 23,
                devices: {
                    chandelier: { name: 'Chandelier', type: 'light', status: true, brightness: 75 },
                    accentLights: { name: 'Accent Lights', type: 'light', status: true, brightness: 50 },
                    ac: { name: 'Air Conditioning', type: 'hvac', status: true }
                }
            },
            'laundry': {
                name: 'Laundry Room',
                icon: '👕',
                temperature: 24,
                devices: {
                    mainLight: { name: 'Main Light', type: 'light', status: false, brightness: 90 },
                    washer: { name: 'Washing Machine', type: 'appliance', status: false },
                    dryer: { name: 'Dryer', type: 'appliance', status: false }
                }
            },
            'study': {
                name: 'Study',
                icon: '📚',
                temperature: 21,
                devices: {
                    deskLamp: { name: 'Desk Lamp', type: 'light', status: true, brightness: 85 },
                    shelfLights: { name: 'Shelf Lights', type: 'light', status: true, brightness: 60 },
                    ac: { name: 'Air Conditioning', type: 'hvac', status: true }
                }
            }
        };
    }

    toggleDevice(roomId, deviceKey) {
        const device = this.rooms[roomId].devices[deviceKey];
        const wasOn = device.status;
        device.status = !device.status;

        if (device.status && !wasOn) {
            if (device.type === 'light') {
                const preset = this.lightModePresets[device.mode || 'normal'];
                device.level = device.level || preset.level || 90; // Default to 90% when turning on
                device.brightness = device.brightness || preset.level || 90;
                device.color = device.color || preset.color || '#ffffff';
                device.mode = device.mode || 'normal';
            }
            if (device.type === 'fan') {
                device.level = device.level || 5;
                device.direction = device.direction || 'forward';
            }
        }

        if (!device.status && wasOn) {
            if (device.type === 'light') {
                device.level = 0;
                device.brightness = 0;
            }
        }

        const toggleSwitch = event.target.closest('.toggle-switch');
        if (device.status) {
            toggleSwitch.classList.add('active');
        } else {
            toggleSwitch.classList.remove('active');
        }

        this.updateRoomState(roomId);
        this.logActivity(`${device.name} in ${this.rooms[roomId].name} turned ${device.status ? 'ON' : 'OFF'}`);

        // Refresh the controls panel
        setTimeout(() => {
            if (this.activeRoom === roomId) {
                this.panelContent.innerHTML = this.generateRoomControls(roomId, this.rooms[roomId]);
            }
        }, 100);
    }
    adjustTemperature(roomId, change) {
        const room = this.rooms[roomId];
        room.temperature = Math.max(5, Math.min(50, room.temperature + change));

        const tempDisplay = document.getElementById(`${roomId}-temp`);
        if (tempDisplay) {
            tempDisplay.textContent = `${room.temperature}°C`;
        }

        const roomButton = document.querySelector(`[data-room="${roomId}"] .room-status span`);
        if (roomButton) {
            roomButton.textContent = `${room.temperature}°C`;
        }

        this.logActivity(`Temperature in ${room.name} set to ${room.temperature}°C`);
    }

    adjustBrightness(roomId, deviceKey, value) {
        const device = this.rooms[roomId].devices[deviceKey];
        device.brightness = parseInt(value);
        this.logActivity(`${device.name} brightness set to ${value}%`);
    }
    adjustRange(roomId, deviceKey, value) {
        const device = this.rooms[roomId].devices[deviceKey];
        device.level = value;
        const span = document.getElementById(`${roomId}-${deviceKey}-range`);
        if (span) span.textContent = value;
        if (parseInt(value) > 0) {
            device.status = true;
        } else {
            device.status = false;
        }
        if (this.activeRoom === roomId) {
            const toggleSwitch = document.querySelector(`.toggle-switch[onclick*="${deviceKey}"]`);
            if (toggleSwitch) {
                if (parseInt(value) > 0) {
                    toggleSwitch.classList.add('active');
                } else {
                    toggleSwitch.classList.remove('active');
                }
            }
        }

        // Update room state (light indicators, etc.)
        this.updateRoomState(roomId);

        this.logActivity(`${device.name} level set to ${value}%`);
    }

    roomAction(roomId, action) {
        const room = this.rooms[roomId];

        switch (action) {
            case 'allOn':
                Object.values(room.devices).forEach(device => {
                    device.status = true;
                    if (device.type === 'light') {
                        device.level = device.level || 90;
                        device.brightness = device.brightness || 90;
                    }
                });
                break;
            case 'allOff':
                Object.values(room.devices).forEach(device => {
                    device.status = false;
                    if (device.type === 'light') {
                        device.level = 0;
                        device.brightness = 0;
                    }
                });
                break;
            case 'nightMode':
                Object.entries(room.devices).forEach(([key, device]) => {
                    if (device.type === 'light') {
                        device.status = true;
                        device.level = 20;
                        device.brightness = 20;
                    } else {
                        device.status = false;
                    }
                });
                break;
            case 'optimal':
                room.temperature = 22;
                Object.entries(room.devices).forEach(([key, device]) => {
                    if (device.type === 'hvac') device.status = true;
                });
                break;
        }

        this.updateRoomState(roomId);
        this.logActivity(`${action} executed in ${room.name}`);

        // Refresh UI if this room's controls are currently open
        if (this.activeRoom === roomId) {
            this.panelContent.innerHTML = this.generateRoomControls(roomId, room);
        }

        // Refresh left panel if rooms view is open
        const leftPanelContent = document.getElementById('leftPanelContent');
        if (leftPanelContent && document.querySelector('.nav-tab.active').dataset.view === 'rooms') {
            leftPanelContent.innerHTML = this.generateRoomsContent();
        }
    }

    quickAction(action) {
        switch (action) {
            case 'allLightsOn':
                Object.keys(this.rooms).forEach(roomId => {
                    Object.entries(this.rooms[roomId].devices).forEach(([key, device]) => {
                        if (device.type === 'light') {
                            device.status = true;
                            device.level = 90; // Set brightness to 90%
                            device.brightness = 90; // Also update brightness property
                        }
                    });
                    this.updateRoomState(roomId);
                });
                // Refresh any open room controls panel
                if (this.activeRoom) {
                    this.panelContent.innerHTML = this.generateRoomControls(this.activeRoom, this.rooms[this.activeRoom]);
                }
                // Refresh left panel if rooms view is open
                const leftPanelContent = document.getElementById('leftPanelContent');
                if (leftPanelContent && document.querySelector('.nav-tab.active').dataset.view === 'rooms') {
                    leftPanelContent.innerHTML = this.generateRoomsContent();
                }
                break;

            case 'allLightsOff':
                Object.keys(this.rooms).forEach(roomId => {
                    Object.entries(this.rooms[roomId].devices).forEach(([key, device]) => {
                        if (device.type === 'light') {
                            device.status = false;
                            device.level = 0;
                            device.brightness = 0;
                        }
                    });
                    this.updateRoomState(roomId);
                });
                // Refresh any open room controls panel
                if (this.activeRoom) {
                    this.panelContent.innerHTML = this.generateRoomControls(this.activeRoom, this.rooms[this.activeRoom]);
                }
                // Refresh left panel if rooms view is open
                const leftPanelContentOff = document.getElementById('leftPanelContent');
                if (leftPanelContentOff && document.querySelector('.nav-tab.active').dataset.view === 'rooms') {
                    leftPanelContentOff.innerHTML = this.generateRoomsContent();
                }
                break;

            case 'nightMode':
                Object.keys(this.rooms).forEach(roomId => {
                    this.roomAction(roomId, 'nightMode');
                });
                break;

            case 'awayMode':
                Object.keys(this.rooms).forEach(roomId => {
                    this.roomAction(roomId, 'allOff');
                });
                break;
        }

        this.logActivity(`Quick action: ${action}`);
        this.closeAllDropdowns();
    }


    updateRoomState(roomId) {
        const room = this.rooms[roomId];
        const hasActiveDevices = Object.values(room.devices).some(device => device.status);
        const hasActiveLights = Object.values(room.devices).some(device =>
            device.type === 'light' && device.status
        );

        const statusDot = document.getElementById(`${roomId}-status`);
        const lightIndicator = document.getElementById(`${roomId}-light`);

        if (statusDot) {
            statusDot.classList.toggle('off', !hasActiveDevices);
        }

        if (lightIndicator) {
            lightIndicator.style.display = hasActiveLights ? 'flex' : 'none';
        }
    }


    updateAllRoomStates() {
        Object.keys(this.rooms).forEach(roomId => {
            this.updateRoomState(roomId);
        });
    }

    showSettings() {
        this.panelTitle.textContent = '⚙️ Settings';
        this.panelContent.innerHTML = `
        <div class="control-section">
            <div class="section-title">⚙️ System Settings</div>
            <div class="control-item">
                <div class="control-label">Auto Updates</div>
                <div class="toggle-switch ${this.autoUpdates ? 'active' : ''}" 
                     onclick="dashboard.toggleAutoUpdates()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="control-item">
                <div class="control-label">Energy Savings</div>
                <div class="toggle-switch ${this.energySavings ? 'active' : ''}" 
                     onclick="dashboard.toggleEnergySavings()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="control-item">
                <div class="control-label">Night Mode Auto</div>
                <div class="toggle-switch ${this.nightModeAuto ? 'active' : ''}" 
                     onclick="dashboard.toggleNightModeAuto()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
        </div>
        
        <div class="quick-actions">
            <button class="quick-btn">Backup Settings</button>
            <button class="quick-btn">Restore Settings</button>
            <button class="quick-btn">Check Updates</button>
            <button class="quick-btn">Factory Reset</button>
        </div>
    `;
        this.sidePanel.classList.add('active');
        this.overlay.classList.add('active');
        this.closeAllDropdowns();
    }
    showHistory() {
        this.panelTitle.textContent = '📋 Activity History';
        const historyContent = this.history.slice(0, 100).map(entry => `
      <div style="background: #f8f9fa; padding: 12px; margin: 8px 0; border-radius: 8px; border-left: 3px solid #4CAF50;">
        <div style="font-size: 10px; color: #666; margin-bottom: 4px;">
          ${this.formatTime(entry.timestamp)}
        </div>
        <div style="font-size: 12px; color: #333;">
          ${entry.message}
        </div>
      </div>
    `).join('');

        this.panelContent.innerHTML = `
      <div class="control-section">
        <div class="section-title">📋 Recent Activity</div>
        <div style="max-height: 400px; overflow-y: auto;">
          ${historyContent || '<p style="color: #666; font-size: 12px;">No activity yet</p>'}
        </div>
      </div>
    `;
        this.sidePanel.classList.add('active');
        this.overlay.classList.add('active');
        this.closeAllDropdowns();
    }

    showDevices() {
        this.panelTitle.textContent = '🔧 Device Management';
        this.panelContent.innerHTML = `
      <div class="control-section">
        <div class="section-title">🔧 Device Management</div>
        <div class="control-item">
          <div class="control-label">Total Devices</div>
          <span>24</span>
        </div>
        <div class="control-item">
          <div class="control-label">Online Devices</div>
          <span>16</span>
        </div>
        <div class="control-item">
          <div class="control-label">Last Scan</div>
          <span>2 min ago</span>
        </div>
      </div>
      
      <div class="quick-actions">
        <button class="quick-btn">Scan Devices</button>
        <button class="quick-btn">Sync All</button>
        <button class="quick-btn">Optimize</button>
        <button class="quick-btn">Diagnostics</button>
      </div>
    `;
        this.sidePanel.classList.add('active');
        this.overlay.classList.add('active');
        this.closeAllDropdowns();
    }
    showSecurity() {
        this.panelTitle.textContent = '🔒 Security';
        this.panelContent.innerHTML = `
        <div class="control-section">
            <div class="section-title">🔒 Security System</div>
            <div class="control-item">
                <div class="control-label">Security Armed</div>
                <div class="toggle-switch ${this.securitySystem ? 'active' : ''}" 
                     onclick="dashboard.toggleSecuritySystem()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="control-item">
                <div class="control-label">Motion Detection</div>
                <div class="toggle-switch ${this.motionDetection ? 'active' : ''}" 
                     onclick="dashboard.toggleMotionDetection()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="control-item">
                <div class="control-label">Door Monitoring</div>
                <div class="toggle-switch ${this.doorMonitoring ? 'active' : ''}" 
                     onclick="dashboard.toggleDoorMonitoring()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
        </div>
        
        <div class="quick-actions">
            <button class="quick-btn">Arm System</button>
            <button class="quick-btn">Disarm System</button>
            <button class="quick-btn">Check Cameras</button>
            <button class="quick-btn">Alert History</button>
        </div>
    `;
        this.sidePanel.classList.add('active');
        this.overlay.classList.add('active');
        this.closeAllDropdowns();
    }

    hidePanel() {
        this.sidePanel.classList.remove('active');
        this.overlay.classList.remove('active');
        this.activeRoom = null;
    }

    logActivity(message) {
        const entry = {
            timestamp: new Date(),
            message: message
        };

        this.history.unshift(entry);

        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;

        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new SmartHomeDashboard();
});



// Prevent default touch behaviors
document.addEventListener('touchstart', function (e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });


// Tabs: Overview, Rooms, Energy (show in left panel)
document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        const leftPanel = document.getElementById("leftPanel");
        const overlay = document.getElementById("overlay");
        const title = document.getElementById("leftPanelTitle");
        const content = document.getElementById("leftPanelContent");

        // Set panel title and load matching content
        title.textContent = tab.textContent;
        if (tab.dataset.view === "overview") {
            content.innerHTML = dashboard.generateOverviewContent();
        } else if (tab.dataset.view === "rooms") {
            content.innerHTML = dashboard.generateRoomsContent();
        } else if (tab.dataset.view === "energy") {
            content.innerHTML = dashboard.generateEnergyContent();
        }

        // Activate left panel
        leftPanel.classList.add("active");
        overlay.classList.add("active");
    });
});

// Close left panel
document.getElementById("closeLeftPanelBtn").addEventListener("click", () => {
    document.getElementById("leftPanel").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
});



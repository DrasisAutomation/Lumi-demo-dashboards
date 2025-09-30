class SmartHomeDashboard {
  toggleSystemPower() {
    const systemPower = (this.systemPower = !this.systemPower)
    const toggleSwitch = event.target.closest(".toggle-switch")

    if (systemPower) {
      toggleSwitch.classList.add("active")
      this.logActivity("System power turned ON")
    } else {
      toggleSwitch.classList.remove("active")
      this.logActivity("System power turned OFF")
    }
  }

  toggleAutoUpdates() {
    const autoUpdates = (this.autoUpdates = !this.autoUpdates)
    const toggleSwitch = event.target.closest(".toggle-switch")

    if (autoUpdates) {
      toggleSwitch.classList.add("active")
      this.logActivity("Auto updates enabled")
    } else {
      toggleSwitch.classList.remove("active")
      this.logActivity("Auto updates disabled")
    }
  }

  openRoomFromOverview(roomId) {
    console.log('Opening room from overview:', roomId); // Debug log

    // Close the left panel (overview)
    const leftPanel = document.getElementById("leftPanel");
    const overlay = document.getElementById("overlay");

    leftPanel.classList.remove("active");
    overlay.classList.remove("active");

    // Open the specific room control panel
    this.showRoomControls(roomId);
  }
  toggleEnergySavings() {
    const energySavings = (this.energySavings = !this.energySavings)
    const toggleSwitch = event.target.closest(".toggle-switch")

    if (energySavings) {
      toggleSwitch.classList.add("active")
      this.logActivity("Energy savings mode enabled")
    } else {
      toggleSwitch.classList.remove("active")
      this.logActivity("Energy savings mode disabled")
    }
  }

  toggleNightModeAuto() {
    const nightModeAuto = (this.nightModeAuto = !this.nightModeAuto)
    const toggleSwitch = event.target.closest(".toggle-switch")

    if (nightModeAuto) {
      toggleSwitch.classList.add("active")
      this.logActivity("Night mode automation enabled")
    } else {
      toggleSwitch.classList.remove("active")
      this.logActivity("Night mode automation disabled")
    }
  }

  // Add these methods for security panel
  toggleSecuritySystem() {
    const securitySystem = (this.securitySystem = !this.securitySystem)
    const toggleSwitch = event.target.closest(".toggle-switch")

    if (securitySystem) {
      toggleSwitch.classList.add("active")
      this.logActivity("Security system armed")
    } else {
      toggleSwitch.classList.remove("active")
      this.logActivity("Security system disarmed")
    }
  }

  toggleMotionDetection() {
    const motionDetection = (this.motionDetection = !this.motionDetection)
    const toggleSwitch = event.target.closest(".toggle-switch")

    if (motionDetection) {
      toggleSwitch.classList.add("active")
      this.logActivity("Motion detection enabled")
    } else {
      toggleSwitch.classList.remove("active")
      this.logActivity("Motion detection disabled")
    }
  }

  toggleDoorMonitoring() {
    const doorMonitoring = (this.doorMonitoring = !this.doorMonitoring)
    const toggleSwitch = event.target.closest(".toggle-switch")

    if (doorMonitoring) {
      toggleSwitch.classList.add("active")
      this.logActivity("Door monitoring enabled")
    } else {
      toggleSwitch.classList.remove("active")
      this.logActivity("Door monitoring disabled")
    }
  }

  toggleSecurityArmed() {
    const securityArmed = (this.securityArmed = !this.securityArmed)
    const toggleSwitch = event.target.closest(".toggle-switch")

    if (securityArmed) {
      toggleSwitch.classList.add("active")
      this.logActivity("Security system armed")
    } else {
      toggleSwitch.classList.remove("active")
      this.logActivity("Security system disarmed")
    }
  }

  toggleAwayMode() {
    const awayMode = (this.awayMode = !this.awayMode)
    const toggleSwitch = event.target.closest(".toggle-switch")

    if (awayMode) {
      toggleSwitch.classList.add("active")
      // Automatically turn off some devices when away mode is activated
      this.quickAction("awayMode")
      this.logActivity("Away mode activated")
    } else {
      toggleSwitch.classList.remove("active")
      this.logActivity("Away mode deactivated")
    }
  }

  toggleEcoMode() {
    const ecoMode = (this.ecoMode = !this.ecoMode)
    const toggleSwitch = event.target.closest(".toggle-switch")

    if (ecoMode) {
      toggleSwitch.classList.add("active")
      this.logActivity("Eco mode activated - Energy saving enabled")
    } else {
      toggleSwitch.classList.remove("active")
      this.logActivity("Eco mode deactivated")
    }
  }

  toggleSolarPriority() {
    const solarPriority = (this.solarPriority = !this.solarPriority)
    const toggleSwitch = event.target.closest(".toggle-switch")

    if (solarPriority) {
      toggleSwitch.classList.add("active")
      this.logActivity("Solar priority enabled - Using solar power first")
    } else {
      toggleSwitch.classList.remove("active")
      this.logActivity("Solar priority disabled")
    }
  }

  togglePeakHoursMode() {
    const peakHoursMode = (this.peakHoursMode = !this.peakHoursMode)
    const toggleSwitch = event.target.closest(".toggle-switch")

    if (peakHoursMode) {
      toggleSwitch.classList.add("active")
      this.logActivity("Peak hours mode activated - Reducing energy usage")
    } else {
      toggleSwitch.classList.remove("active")
      this.logActivity("Peak hours mode deactivated")
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

    // Security properties
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

    // Initialize core elements and data first
    this.initializeElements();
    this.initializeRoomData();
    this.updateAllRoomStates();

    // Light mode presets
    this.lightModePresets = {
      normal: { level: 50, color: "#ffffff" },
      warm: { level: 40, color: "#ffd8a6" },
      cool: { level: 60, color: "#a6d8ff" },
      reading: { level: 80, color: "#f5f5dc" },
      party: { level: 100, color: "#ff69b4" },
    };

    this.curtainSystem = {
      rooms: {
        'living-room': { level: 0, open: false },
        'master-bedroom': { level: 0, open: false },
        'study': { level: 0, open: false },
        'dining': { level: 0, open: false }
      }
    };

    // Quick Actions System
    this.quickActionsSystem = {
      executingAction: false,
      actionTimer: null,
      lastAction: null
    };

    // Monitoring System
    this.monitoringSystem = {
      cameras: {
        'living-room': { recording: true, nightVision: false, zoom: 1 },
        'terrace': { recording: true, nightVision: false, zoom: 1 },
        'parking': { recording: true, nightVision: false, zoom: 1 },
        'garden': { recording: true, nightVision: false, zoom: 1 }
      },
      motionAlerts: true,
      systemStatus: 'online'
    };

    // Lighting System
    this.lightingSystem = {
      currentRoom: 'living-room',
      rooms: {
        'living-room': {
          dimmableLights: [
            { id: 'main-light', name: 'Main Light', brightness: 75, warmth: 50, powered: true },
            { id: 'accent-light', name: 'Accent Light', brightness: 50, warmth: 30, powered: true }
          ],
          rgbLights: []
        },
        'master-bedroom': {
          dimmableLights: [
            { id: 'bedside-light', name: 'Bedside Lamp', brightness: 40, warmth: 70, powered: false },
            { id: 'ceiling-light', name: 'Ceiling Light', brightness: 0, warmth: 50, powered: false }
          ],
          rgbLights: [
            { id: 'mood-light', name: 'Mood Light', color: '#5ac8fa', brightness: 60, powered: true }
          ]
        },
        'study': {
          dimmableLights: [
            { id: 'desk-lamp', name: 'Desk Lamp', brightness: 90, warmth: 20, powered: true }
          ],
          rgbLights: []
        },
        'dining': {
          dimmableLights: [
            { id: 'chandelier', name: 'Chandelier', brightness: 80, warmth: 60, powered: true }
          ],
          rgbLights: []
        }
      },
      scenes: {
        'movie': { brightness: 30, warmth: 80, color: '#ff9500' },
        'candle': { brightness: 20, warmth: 100, color: '#ff6b35' },
        'party': { brightness: 100, warmth: 0, color: '#ff2d55' },
        'relax': { brightness: 40, warmth: 40, color: '#5ac8fa' },
        'reading': { brightness: 90, warmth: 20, color: '#ffffff' },
        'sunrise': { brightness: 60, warmth: 90, color: '#ff9c33' },
        'romantic': { brightness: 30, warmth: 60, color: '#ff69b4' },
        'energize': { brightness: 100, warmth: 10, color: '#ffffff' }
      }
    };
    // Add this to your constructor
    this.lockSystem = {
      locks: {
        'main-entrance': {
          name: 'Main Entrance',
          location: 'Front Door',
          locked: true,
          icon: '🚪'
        },
        'back-door': {
          name: 'Back Door',
          location: 'Garden Entrance',
          locked: false,
          icon: '🚪'
        },
        'garage-door': {
          name: 'Garage Door',
          location: 'Garage Entrance',
          locked: true,
          icon: '🚗'
        },
        'side-gate': {
          name: 'Side Gate',
          location: 'Side Entrance',
          locked: true,
          icon: '🚧'
        },
        'bedroom-door': {
          name: 'Bedroom Door',
          location: 'Master Bedroom',
          locked: false,
          icon: '🛏️'
        },
        'living-room-door': {
          name: 'Living Room Door',
          location: 'Living Room Entrance',
          locked: false,
          icon: '🛋️'
        },
        'study-door': {
          name: 'Study Door',
          location: 'Study Room',
          locked: true,
          icon: '📚'
        },
        'balcony-door': {
          name: 'Balcony Door',
          location: 'Balcony Entrance',
          locked: false,
          icon: '🌅'
        }
      },
      history: []
    };

    // Music Player System
    this.musicPlayer = {
      playing: false,
      volume: 50,
      currentTrack: null,
      currentTime: 0,
      duration: 0,
      playlist: [
        {
          id: 1,
          title: "Morning Coffee",
          artist: "Chillhop Music",
          album: "Chillhop Essentials Spring 2023",
          duration: "3:45",
          albumArt: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23FF9800'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='white'%3EMorning%3C/text%3E%3C/svg%3E"
        },
        {
          id: 2,
          title: "Sunset Vibes",
          artist: "Lofi Girl",
          album: "Chillhop Essentials Winter 2023",
          duration: "4:20",
          albumArt: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23E91E63'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='white'%3ESunset%3C/text%3E%3C/svg%3E"
        },
        {
          id: 3,
          title: "Midnight Drive",
          artist: "Synthwave Radio",
          album: "Retro Waves Vol. 2",
          duration: "5:15",
          albumArt: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%233F51B5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='white'%3EMidnight%3C/text%3E%3C/svg%3E"
        },
        {
          id: 4,
          title: "Forest Walk",
          artist: "Nature Sounds",
          album: "Peaceful Moments",
          duration: "6:30",
          albumArt: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%234CAF50'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='white'%3EForest%3C/text%3E%3C/svg%3E"
        },
        {
          id: 5,
          title: "Ocean Breeze",
          artist: "Ambient Sounds",
          album: "Calm Waters",
          duration: "7:10",
          albumArt: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23009688'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='white'%3EOcean%3C/text%3E%3C/svg%3E"
        }
      ],
      audio: new Audio()
    };

    // AC System
    this.acSystem = {
      poweredOn: false,
      currentRoom: 'living-room',
      rooms: {
        'living-room': { temperature: 22, mode: 'cool', powered: false },
        'master-bedroom': { temperature: 20, mode: 'cool', powered: false },
        'study': { temperature: 18, mode: 'cool', powered: false },
        'dining': { temperature: 24, mode: 'cool', powered: false }
      },
      history: [],
      minTemp: 16,
      maxTemp: 30
    };

    // Scenes System
    this.scenesSystem = {
      currentRoom: 'living-room',
      currentScene: null,
      applyingScene: false,
      scenes: {
        'movie': { lights: { brightness: 30, warmth: 20 }, ac: { temp: 22, mode: 'cool' } },
        'party': { lights: { brightness: 100, warmth: 0, color: '#ff2d55' }, ac: { temp: 20, mode: 'cool' } },
        'gaming': { lights: { brightness: 70, warmth: 10, color: '#007aff' }, ac: { temp: 21, mode: 'cool' } },
        'candle': { lights: { brightness: 20, warmth: 100 }, ac: { temp: 24, mode: 'heat' } },
        'chill': { lights: { brightness: 40, warmth: 40, color: '#5ac8fa' }, ac: { temp: 23, mode: 'cool' } },
        'warm': { lights: { brightness: 60, warmth: 90 }, ac: { temp: 25, mode: 'heat' } },
        'reading': { lights: { brightness: 90, warmth: 20 }, ac: { temp: 22, mode: 'cool' } },
        'sunrise': { lights: { brightness: 60, warmth: 90 }, ac: { temp: 24, mode: 'heat' } },
        'romantic': { lights: { brightness: 30, warmth: 60, color: '#ff69b4' }, ac: { temp: 23, mode: 'auto' } },
        'all-off': { lights: { brightness: 0 }, ac: { powered: false } },
        'all-on': { lights: { brightness: 80 }, ac: { powered: true, temp: 22 } },
        'goodnight': { lights: { brightness: 10, warmth: 80 }, ac: { temp: 20, mode: 'cool' } }
      }
    };

    // Lock System
    this.lockSystem = {
      locks: {
        'main-entrance': { name: 'Main Entrance', location: 'Front Door', locked: true },
        'back-door': { name: 'Back Door', location: 'Garden Entrance', locked: false },
        'garage-door': { name: 'Garage Door', location: 'Garage Entrance', locked: true },
        'side-gate': { name: 'Side Gate', location: 'Side Entrance', locked: true }
      },
      history: []
    };

    // PA System
    this.paSystem = {
      isRecording: false,
      hasRecording: false,
      recordingDuration: 5,
      selectedRooms: [],
      playingRooms: [],
      history: [],
      recordingTimer: null,
      broadcastTimer: null
    };

    // Alarm System
    this.alarmSystem = {
      armed: false,
      mode: 'disarmed',
      code: '1234',
      enteredCode: '',
      monitoredRooms: [],
      history: [],
      tempDisabled: false
    };



    // Curtains System
    this.curtains = {};

    // Music System (for basic controls)
    this.music = { playing: false, volume: 50 };

    // Initialize event listeners
    this.setupEventListeners();

    // Initialize floor plan interactions
    if (this.floorPlanContainer) {
      this.floorPlanContainer.addEventListener('click', (e) => {
        const roomButton = e.target.closest('.room-button');
        if (roomButton) {
          e.stopPropagation();
          const roomId = roomButton.getAttribute('data-room');
          this.showRoomControls(roomId);
        }
      });
    }

    // Initialize all subsystems after DOM is ready
    setTimeout(() => {
      this.initializeAllSubSystems();
    }, 100);
  }
  // Add this method to initialize all subsystems safely
  initializeAllSubSystems() {
    try {
      console.log('Initializing all subsystems...');

      // Initialize each system with safety checks
      const subsystems = [
        'initializeMusicPlayer',
        'initializePASystem',
        'initializeAlarmSystem',
        'initializeMonitoringSystem',
        'initializeACSystem',
        'initializeLightingSystem',
        'initializeScenesSystem',
        'initializeQuickActionsSystem',
        'initializeLockSystem',
        'initializeCurtainSystem' // Add this line
      ];

      subsystems.forEach(subsystem => {
        if (typeof this[subsystem] === 'function') {
          try {
            this[subsystem]();
            console.log(`✓ ${subsystem} initialized`);
          } catch (error) {
            console.warn(`⚠ ${subsystem} initialization failed:`, error);
          }
        } else {
          console.warn(`⚠ ${subsystem} method not found`);
        }
      });

      console.log('All subsystems initialization completed');
    } catch (error) {
      console.error('Error during subsystem initialization:', error);
    }
  }
  initializeElements() {
    this.floorPlanContainer = document.getElementById("floorPlanContainer")
    this.floorPlanWrapper = document.getElementById("floorPlanWrapper")
    this.floorPlan = document.getElementById("floorPlan")

    this.zoomInBtn = document.getElementById("zoomIn")
    this.zoomOutBtn = document.getElementById("zoomOut")
    this.resetZoomBtn = document.getElementById("resetZoom")
    this.zoomInfo = document.getElementById("zoomInfo")

    this.systemToggle = document.getElementById("systemToggle")
    this.navTabs = document.querySelectorAll(".nav-tab")
    this.settingsDropdown = document.getElementById("settingsDropdown")
    this.actionsDropdown = document.getElementById("actionsDropdown")

    this.sidePanel = document.getElementById("sidePanel")
    this.closePanelBtn = document.getElementById("closePanelBtn")
    this.panelContent = document.getElementById("panelContent")
    this.panelTitle = document.getElementById("panelTitle")

    this.overlay = document.getElementById("overlay")
    this.roomButtons = document.querySelectorAll(".room-button")

    this.menuButton = document.getElementById("menuButton")
    this.menuDrawer = document.getElementById("hamburgerMenu")
    this.closeMenuBtn = document.getElementById("closeMenuBtn")
  }

  setupEventListeners() {
    try {
      // Zoom controls
      if (this.zoomInBtn) this.zoomInBtn.addEventListener("click", () => this.zoomIn());
      if (this.zoomOutBtn) this.zoomOutBtn.addEventListener("click", () => this.zoomOut());
      if (this.resetZoomBtn) this.resetZoomBtn.addEventListener("click", () => this.resetZoom());

      // Navigation
      if (this.systemToggle) this.systemToggle.addEventListener("click", () => this.toggleSystem());

      // Nav tabs
      if (this.navTabs && this.navTabs.forEach) {
        this.navTabs.forEach((tab) => {
          tab.addEventListener("click", () => this.switchTab(tab.dataset.view));
        });
      }

      // Dropdowns
      if (this.settingsDropdown) {
        this.settingsDropdown.addEventListener("click", (e) => {
          e.stopPropagation();
          this.toggleDropdown("settings");
        });
      }

      if (this.actionsDropdown) {
        this.actionsDropdown.addEventListener("click", (e) => {
          e.stopPropagation();
          this.toggleDropdown("actions");
        });
      }

      document.addEventListener("click", () => this.closeAllDropdowns());

      // Panel controls
      if (this.closePanelBtn) this.closePanelBtn.addEventListener("click", () => this.hidePanel());

      // Overlay click to close everything
      if (this.overlay) {
        this.overlay.addEventListener("click", () => {
          this.hideAllSystems();
        });
      }

      // Room buttons
      if (this.roomButtons && this.roomButtons.forEach) {
        this.roomButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.stopPropagation();
            const roomId = button.getAttribute("data-room");
            this.showRoomControls(roomId);
          });
        });
      }

      // Pan and zoom
      this.setupPanAndZoom();

      // Window resize
      window.addEventListener("resize", () => this.updateZoomClass());

      // Menu
      if (this.menuButton) {
        this.menuButton.addEventListener("click", (e) => {
          e.stopPropagation();
          this.openMenu();
        });
      }

      if (this.closeMenuBtn) this.closeMenuBtn.addEventListener("click", () => this.closeMenu());

      if (this.menuDrawer) {
        this.menuDrawer.addEventListener("click", (e) => e.stopPropagation());
        document.addEventListener("click", () => this.closeMenu());

        const menuItems = this.menuDrawer.querySelectorAll(".menu-item");
        if (menuItems && menuItems.forEach) {
          menuItems.forEach((item) => {
            item.addEventListener("click", () => {
              const key = item.getAttribute("data-menu");
              this.handleMenuSelect(key);
            });
          });
        }
      }

      console.log('Event listeners setup completed');
    } catch (error) {
      console.error('Error setting up event listeners:', error);
    }
  }

  // Add this method to initialize the monitoring system
  initializeMonitoringSystem() {
    // Set up event listeners
    document.getElementById('closeMonitoringBtn')?.addEventListener('click', () => {
      this.hideMonitoringSystem();
    });

    // Update timestamps every second
    setInterval(() => {
      this.updateCameraTimestamps();
    }, 1000);
  }

  // Add this method to update camera timestamps
  updateCameraTimestamps() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Update all timestamp elements
    document.querySelectorAll('.timestamp').forEach(timestamp => {
      timestamp.textContent = timeString;
    });
  }

  // Add this method to control individual cameras
  controlCamera(cameraId, action) {
    const camera = this.monitoringSystem.cameras[cameraId];
    if (!camera) return;

    switch (action) {
      case 'zoom-in':
        camera.zoom = Math.min(camera.zoom + 0.2, 3);
        this.logActivity(`Zoomed in ${this.getCameraName(cameraId)} camera`);
        break;
      case 'zoom-out':
        camera.zoom = Math.max(camera.zoom - 0.2, 1);
        this.logActivity(`Zoomed out ${this.getCameraName(cameraId)} camera`);
        break;
      case 'snapshot':
        this.logActivity(`Snapshot taken from ${this.getCameraName(cameraId)} camera`);
        this.showNotification(`Snapshot saved from ${this.getCameraName(cameraId)}`);
        break;
      case 'record':
        camera.recording = !camera.recording;
        this.logActivity(`${camera.recording ? 'Started' : 'Stopped'} recording on ${this.getCameraName(cameraId)}`);
        this.updateRecordingIndicator(cameraId, camera.recording);
        break;
    }
  }

  // Add this method to safely close all systems
  hideAllSystems() {
    try {
      console.log('Hiding all systems...');

      // Close main panel and menu
      this.hidePanel();
      this.closeMenu();

      // Close all subsystem panels with safety checks
      const systemPanels = [
        'lightingSystem',
        'acSystem',
        'scenesSystem',
        'quickActionsSystem',
        'lockSystem',
        'monitoringSystem',
        'musicPlayer',
        'paSystem',
        'alarmSystem'
      ];

      systemPanels.forEach(panelId => {
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.style.display = 'none';
        }
      });

      // Hide overlay
      const overlay = document.getElementById('overlay');
      if (overlay) {
        overlay.classList.remove('active');
      }

      // Close left panel
      const leftPanel = document.getElementById('leftPanel');
      if (leftPanel) {
        leftPanel.classList.remove('active');
      }

      console.log('All systems hidden successfully');
    } catch (error) {
      console.error('Error hiding all systems:', error);
    }
  }

  // Add this method to control all cameras
  controlAllCameras(action) {
    Object.keys(this.monitoringSystem.cameras).forEach(cameraId => {
      this.controlCamera(cameraId, action);
    });

    switch (action) {
      case 'record':
        this.logActivity('Toggled recording on all cameras');
        break;
      case 'snapshot':
        this.logActivity('Snapshot taken from all cameras');
        this.showNotification('Snapshots saved from all cameras');
        break;
      case 'toggle-nightvision':
        const nightVision = !this.monitoringSystem.cameras['living-room'].nightVision;
        Object.values(this.monitoringSystem.cameras).forEach(camera => {
          camera.nightVision = nightVision;
        });
        this.logActivity(`${nightVision ? 'Enabled' : 'Disabled'} night vision on all cameras`);
        break;
      case 'motion-alerts':
        this.monitoringSystem.motionAlerts = !this.monitoringSystem.motionAlerts;
        this.logActivity(`${this.monitoringSystem.motionAlerts ? 'Enabled' : 'Disabled'} motion alerts`);
        break;
    }
  }

  // Add this method to get camera display name
  getCameraName(cameraId) {
    const names = {
      'living-room': 'Living Room',
      'terrace': 'Terrace',
      'parking': 'Parking',
      'garden': 'Garden'
    };
    return names[cameraId] || cameraId;
  }

  // Add this method to update recording indicator
  updateRecordingIndicator(cameraId, isRecording) {
    const cameraElement = document.querySelector(`[onclick*="${cameraId}"]`)?.closest('.camera-feed');
    if (cameraElement) {
      const indicator = cameraElement.querySelector('.recording-indicator');
      if (indicator) {
        indicator.style.display = isRecording ? 'flex' : 'none';
      }
    }
  }

  // Add this method to show notification
  showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-size: 14px;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Add this method to show the monitoring system
  showMonitoringSystem() {
    const monitoringSystemEl = document.getElementById('monitoringSystem');
    if (monitoringSystemEl) {
      monitoringSystemEl.style.display = 'block';
      document.getElementById('overlay').classList.add('active');
      this.updateCameraTimestamps();
    }
  }

  // Add this method to hide the monitoring system
  hideMonitoringSystem() {
    const monitoringSystemEl = document.getElementById('monitoringSystem');
    if (monitoringSystemEl) {
      monitoringSystemEl.style.display = 'none';
      document.getElementById('overlay').classList.remove('active');
    }
  }

  //curtain

  initializeCurtainSystem() {
    document.getElementById('closeCurtainBtn')?.addEventListener('click', () => {
      this.hideCurtainSystem();
    });

    // Set up event listeners for all curtain sliders using event delegation
    document.addEventListener('input', (e) => {
      if (e.target.classList.contains('curtain-slider')) {
        const roomId = e.target.dataset.room;
        const value = parseInt(e.target.value);
        console.log(`Slider moved: ${roomId} = ${value}%`);
        this.updateCurtain(roomId, value);
      }
    });

    // Initialize all curtains
    this.updateAllCurtainsUI();

    console.log('Curtain system initialized');
  }
  // Update individual curtain
  updateCurtain(roomId, value) {
    const curtain = this.curtainSystem.rooms[roomId];
    curtain.level = value;
    curtain.open = value > 0;

    this.updateCurtainUI(roomId);
    this.logActivity(`Curtain in ${this.getRoomDisplayName(roomId)} set to ${value}%`);
  }

  // Update curtain UI with correct ID handling
  updateCurtainUI(roomId) {
    const curtain = this.curtainSystem.rooms[roomId];

    // Create proper element IDs (replace hyphens with consistent pattern)
    const elementId = roomId.replace('-', '-');
    const slider = document.getElementById(`${elementId}-curtain-slider`);
    const status = document.getElementById(`${elementId}-curtain-status`);
    const percentage = document.getElementById(`${elementId}-curtain-percentage`);

    console.log(`Updating curtain UI for ${roomId}:`, { slider: !!slider, status: !!status, percentage: !!percentage });

    if (slider) {
      // Update gradient fill (dark blue to blue)
      slider.style.background =
        `linear-gradient(90deg, #1e3a8a 0%, #3b82f6 ${curtain.level}%, #000 ${curtain.level}%)`;
    }

    if (status) {
      if (curtain.level < 10) {
        status.textContent = "Closed";
        status.style.color = "#f87171"; // Red when closed
      } else if (curtain.level > 90) {
        status.textContent = "Opened";
        status.style.color = "#4ade80"; // Green when fully open
      } else {
        status.textContent = `${curtain.level}% Open`;
        status.style.color = "#60a5fa"; // Blue when partially open
      }
    }

    if (percentage) {
      percentage.textContent = `${curtain.level}%`;
      percentage.style.color = "#93c5fd"; // Light blue for percentage
    }
  }

  // Update all curtains UI
  updateAllCurtainsUI() {
    Object.keys(this.curtainSystem.rooms).forEach(roomId => {
      this.updateCurtainUI(roomId);
    });
  }

  // Test method to debug curtain system
  testCurtainSystem() {
    console.log('Testing curtain system...');
    Object.keys(this.curtainSystem.rooms).forEach(roomId => {
      const elementId = roomId.replace('-', '-');
      const slider = document.getElementById(`${elementId}-curtain-slider`);
      const status = document.getElementById(`${elementId}-curtain-status`);
      const percentage = document.getElementById(`${elementId}-curtain-percentage`);

      console.log(`Room: ${roomId}`, {
        sliderExists: !!slider,
        statusExists: !!status,
        percentageExists: !!percentage,
        sliderId: `${elementId}-curtain-slider`
      });
    });
  }


  // Quick actions for curtains
  curtainQuickAction(action) {
    switch (action) {
      case 'openAll':
        Object.keys(this.curtainSystem.rooms).forEach(roomId => {
          this.updateCurtain(roomId, 100);
        });
        this.showNotification("All curtains opened");
        break;
      case 'closeAll':
        Object.keys(this.curtainSystem.rooms).forEach(roomId => {
          this.updateCurtain(roomId, 0);
        });
        this.showNotification("All curtains closed");
        break;
    }
  }

  // Show curtain system
  showCurtainSystem() {
    const curtainSystemEl = document.getElementById('curtainSystem');
    if (curtainSystemEl) {
      curtainSystemEl.style.display = 'block';
      document.getElementById('overlay').classList.add('active');
      this.updateAllCurtainsUI();
    }
  }

  // Hide curtain system
  hideCurtainSystem() {
    const curtainSystemEl = document.getElementById('curtainSystem');
    if (curtainSystemEl) {
      curtainSystemEl.style.display = 'none';
      document.getElementById('overlay').classList.remove('active');
    }
  }

  // door lock

  // Initialize Lock System - FIXED VERSION
  initializeLockSystem() {
    console.log('🔒 Initializing Lock System...');

    // Set up close button
    const closeBtn = document.getElementById('closeLockBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.hideLockSystem();
      });
    }

    // Set up control buttons
    const lockAllBtn = document.querySelector('.lock-all-btn');
    const unlockAllBtn = document.querySelector('.unlock-all-btn');

    if (lockAllBtn) {
      lockAllBtn.addEventListener('click', () => {
        this.lockAllDoors();
      });
    }

    if (unlockAllBtn) {
      unlockAllBtn.addEventListener('click', () => {
        this.unlockAllDoors();
      });
    }

    // Initialize the UI
    this.updateLockUI();
    console.log('✅ Lock System initialized');
  }

  // Toggle individual lock - FIXED VERSION
  toggleLock(lockId) {
    console.log(`🔄 Toggling lock: ${lockId}`);

    const lock = this.lockSystem.locks[lockId];
    if (!lock) {
      console.error(`❌ Lock not found: ${lockId}`);
      return;
    }

    // Toggle the lock state
    lock.locked = !lock.locked;
    console.log(`✅ ${lock.name} is now ${lock.locked ? 'LOCKED' : 'UNLOCKED'}`);

    // Update the specific lock item in UI
    this.updateLockItemUI(lockId);

    // Update overview and stats
    this.updateLockOverview();

    const action = lock.locked ? 'locked' : 'unlocked';
    this.logLockActivity(`${lock.name} ${action}`);
    this.logActivity(`Door ${action}: ${lock.name}`);

    // Show notification
    this.showLockNotification(
      `${lock.name} ${action}`,
      lock.locked ? 'success' : 'warning'
    );
  }

  // Update individual lock item UI - NEW METHOD
  updateLockItemUI(lockId) {
    const lock = this.lockSystem.locks[lockId];
    if (!lock) return;

    // Find the lock item by data attribute
    const lockItem = document.querySelector(`[data-lock-id="${lockId}"]`);
    if (!lockItem) {
      console.warn(`⚠️ Lock item not found for: ${lockId}`);
      return;
    }

    const status = lock.locked ? 'locked' : 'unlocked';
    const statusText = lock.locked ? 'Locked' : 'Unlocked';
    const buttonText = lock.locked ? 'Unlock' : 'Lock';

    // Update the lock item with data-status attribute
    lockItem.setAttribute('data-status', status);

    // Update status indicator
    const statusIndicator = lockItem.querySelector('.status-indicator');
    if (statusIndicator) {
      statusIndicator.className = `status-indicator ${status}`;
      statusIndicator.innerHTML = `<i class="fas fa-${lock.locked ? 'lock' : 'unlock'}"></i><span>${statusText}</span>`;
    }

    // Update toggle button
    const toggleBtn = lockItem.querySelector('.lock-toggle-btn');
    if (toggleBtn) {
      toggleBtn.className = `lock-toggle-btn ${status}`;
      toggleBtn.textContent = buttonText;
      toggleBtn.setAttribute('data-lock', lockId);
    }

    console.log(`✅ Updated UI for ${lock.name}: ${status}`);
  }

  // Update lock overview and stats - NEW METHOD
  updateLockOverview() {
    let lockedCount = 0;
    let unlockedCount = 0;

    // Count locked/unlocked doors
    Object.values(this.lockSystem.locks).forEach(lock => {
      if (lock.locked) lockedCount++;
      else unlockedCount++;
    });

    const totalDoors = lockedCount + unlockedCount;

    // Update overview status
    const overviewStatus = document.querySelector('.overview-status');
    if (overviewStatus) {
      overviewStatus.className = 'overview-status';

      if (lockedCount === totalDoors) {
        overviewStatus.classList.add('locked');
        overviewStatus.innerHTML = '<i class="fas fa-lock"></i><span>All Doors Locked</span>';
      } else if (unlockedCount === totalDoors) {
        overviewStatus.classList.add('unlocked');
        overviewStatus.innerHTML = '<i class="fas fa-unlock"></i><span>All Doors Unlocked</span>';
      } else {
        overviewStatus.classList.add('partial');
        overviewStatus.innerHTML = '<i class="fas fa-lock-open"></i><span>Some Doors Unlocked</span>';
      }
    }

    // Update stats
    const lockedCountEl = document.querySelector('.locked-count');
    const unlockedCountEl = document.querySelector('.unlocked-count');

    if (lockedCountEl) lockedCountEl.textContent = lockedCount;
    if (unlockedCountEl) unlockedCountEl.textContent = unlockedCount;

    console.log(`📊 Lock Stats: ${lockedCount} locked, ${unlockedCount} unlocked`);
  }

  // Update entire lock UI - FIXED VERSION
  updateLockUI() {
    const locksGrid = document.querySelector('.locks-grid');
    if (!locksGrid) {
      console.error('❌ Locks grid not found');
      return;
    }

    // Clear existing locks
    locksGrid.innerHTML = '';

    // Create lock items with proper data attributes
    Object.keys(this.lockSystem.locks).forEach(lockId => {
      const lock = this.lockSystem.locks[lockId];
      const status = lock.locked ? 'locked' : 'unlocked';
      const statusText = lock.locked ? 'Locked' : 'Unlocked';
      const buttonText = lock.locked ? 'Unlock' : 'Lock';

      const lockItem = document.createElement('div');
      lockItem.className = 'lock-item';
      lockItem.setAttribute('data-lock-id', lockId);
      lockItem.setAttribute('data-status', status);

      lockItem.innerHTML = `
            <div class="lock-icon">
                ${lock.icon}
            </div>
            <div class="lock-info">
                <div class="lock-name">${lock.name}</div>
                <div class="lock-location">${lock.location}</div>
            </div>
            <div class="status-indicator ${status}">
                <i class="fas fa-${lock.locked ? 'lock' : 'unlock'}"></i>
                <span>${statusText}</span>
            </div>
            <button class="lock-toggle-btn ${status}" data-lock="${lockId}">
                ${buttonText}
            </button>
        `;

      locksGrid.appendChild(lockItem);
    });

    // Set up event listeners for the new buttons
    this.setupLockEventListeners();

    // Update overview
    this.updateLockOverview();

    // Update history
    this.updateLockHistory();

    console.log('✅ Lock UI updated');
  }

  // Setup event listeners for lock buttons - NEW METHOD
  setupLockEventListeners() {
    // Remove any existing listeners and add new ones
    const lockButtons = document.querySelectorAll('.lock-toggle-btn');
    lockButtons.forEach(button => {
      // Clone and replace to remove old listeners
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);

      // Add click listener
      newButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const lockId = newButton.getAttribute('data-lock');
        if (lockId) {
          this.toggleLock(lockId);
        }
      });
    });
  }

  // Lock all doors - FIXED VERSION
  lockAllDoors() {
    console.log('🔒 Locking all doors...');

    let lockedCount = 0;
    Object.keys(this.lockSystem.locks).forEach(lockId => {
      if (!this.lockSystem.locks[lockId].locked) {
        this.lockSystem.locks[lockId].locked = true;
        lockedCount++;
        // Update individual lock UI
        this.updateLockItemUI(lockId);
      }
    });

    this.updateLockOverview();
    this.logLockActivity(`All doors locked (${lockedCount} doors secured)`);
    this.showLockNotification(`All doors locked (${lockedCount} doors) 🔒`, 'success');

    console.log(`✅ Locked ${lockedCount} doors`);
  }

  // Unlock all doors - FIXED VERSION
  unlockAllDoors() {
    console.log('🔓 Unlocking all doors...');

    let unlockedCount = 0;
    Object.keys(this.lockSystem.locks).forEach(lockId => {
      if (this.lockSystem.locks[lockId].locked) {
        this.lockSystem.locks[lockId].locked = false;
        unlockedCount++;
        // Update individual lock UI
        this.updateLockItemUI(lockId);
      }
    });

    this.updateLockOverview();
    this.logLockActivity(`All doors unlocked (${unlockedCount} doors opened)`);
    this.showLockNotification(`All doors unlocked (${unlockedCount} doors) 🔓`, 'warning');

    console.log(`✅ Unlocked ${unlockedCount} doors`);
  }

  // Enhanced logLockActivity method
  logLockActivity(message) {
    const entry = {
      timestamp: new Date(),
      message: message
    };

    this.lockSystem.history.unshift(entry);

    // Keep only last 10 entries
    if (this.lockSystem.history.length > 10) {
      this.lockSystem.history = this.lockSystem.history.slice(0, 10);
    }

    this.updateLockHistory();
  }

  // Enhanced updateLockHistory method
  updateLockHistory() {
    const container = document.getElementById('lockHistory');
    if (!container) return;

    container.innerHTML = '';

    this.lockSystem.history.forEach(entry => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';

      // Color code based on action
      const isLock = entry.message.includes('locked');
      historyItem.style.borderLeftColor = isLock ? '#4CAF50' : '#ff3b30';

      historyItem.innerHTML = `
            <div class="history-time">${this.formatTime(entry.timestamp)}</div>
            <div class="history-message">${entry.message}</div>
        `;
      container.appendChild(historyItem);
    });
  }

  // Show lock notification
  showLockNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.lock-notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `lock-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Show lock system - FIXED VERSION
  showLockSystem() {
    const lockSystemEl = document.getElementById('lockSystem');
    if (lockSystemEl) {
      lockSystemEl.style.display = 'block';
      document.getElementById('overlay').classList.add('active');

      // Force update the UI
      setTimeout(() => {
        this.updateLockUI();
        console.log('🚪 Lock system displayed and updated');
      }, 50);
    }
  }

  // Hide lock system
  hideLockSystem() {
    const lockSystemEl = document.getElementById('lockSystem');
    if (lockSystemEl) {
      lockSystemEl.style.display = 'none';
      document.getElementById('overlay').classList.remove('active');
    }
  }

  // lights section
  // Add this method to initialize the lighting system
  initializeLightingSystem() {
    // Set up event listeners
    document.getElementById('closeLightingBtn')?.addEventListener('click', () => {
      this.hideLightingSystem();
    });

    // Tab switching
    document.querySelectorAll('.lighting-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.switchLightingTab(e.target.dataset.tab);
      });
    });

    // RGB controls
    this.initializeRGBControls();

    // Scene cards
    document.querySelectorAll('.scene-card').forEach(card => {
      card.addEventListener('click', (e) => {
        this.applyScene(e.target.closest('.scene-card').dataset.scene);
      });
    });

    // Initialize room tabs and lights
    this.populateLightingRooms();
    this.updateLightingUI();
  }

  // Add this method to switch lighting tabs
  switchLightingTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.lighting-tab').forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.tab === tabName) {
        tab.classList.add('active');
      }
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
      if (content.id === `${tabName}-tab`) {
        content.classList.add('active');
      }
    });
  }

  // Add this method to populate room tabs
  populateLightingRooms() {
    const roomTypes = ['dimmableRooms', 'rgbRooms', 'sceneRooms'];

    roomTypes.forEach(roomType => {
      const container = document.getElementById(roomType);
      if (!container) return;

      container.innerHTML = '';

      Object.keys(this.lightingSystem.rooms).forEach(roomId => {
        const roomTab = document.createElement('button');
        roomTab.className = 'room-tab';
        roomTab.textContent = this.getRoomDisplayName(roomId);
        roomTab.setAttribute('data-room', roomId);

        if (roomId === this.lightingSystem.currentRoom) {
          roomTab.classList.add('active');
        }

        roomTab.addEventListener('click', () => {
          this.switchLightingRoom(roomId);
        });

        container.appendChild(roomTab);
      });
    });

    // Update lights display
    this.updateLightsDisplay();
  }

  // Add this method to switch lighting room
  switchLightingRoom(roomId) {
    this.lightingSystem.currentRoom = roomId;

    // Update all room tabs
    document.querySelectorAll('.room-tab').forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.room === roomId) {
        tab.classList.add('active');
      }
    });

    this.updateLightsDisplay();
  }

  // Add this method to update lights display
  updateLightsDisplay() {
    this.updateDimmableLights();
    this.updateRGBLights();
  }

  // Add this method to update dimmable lights - USING YOUR EXACT DESIGN
  updateDimmableLights() {
    const container = document.getElementById('dimmableLights');
    if (!container) return;

    container.innerHTML = '';

    const currentRoom = this.lightingSystem.rooms[this.lightingSystem.currentRoom];

    currentRoom.dimmableLights.forEach(light => {
      const lightCard = document.createElement('div');
      lightCard.className = 'light-card';
      lightCard.innerHTML = `
            <div class="light-header">
                <i class="fas fa-lightbulb" id="bulb-${light.id}"></i>
                <div>
                    <div class="light-name">${light.name}</div>
                    <div class="light-status" id="status-${light.id}">Off</div>
                </div>
            </div>
            <div class="slider-box">
                <input type="range" min="0" max="100" value="${light.brightness}" 
                       class="slider brightness-slider" data-light="${light.id}" id="brightness-${light.id}">
                <div class="indicator" id="brightness-ind-${light.id}"></div>
            </div>
            <div class="slider-box">
                <input type="range" min="0" max="100" value="${light.warmth}" 
                       class="slider warmth-slider" data-light="${light.id}" id="warmth-${light.id}">
                <div class="indicator" id="warmth-ind-${light.id}"></div>
            </div>
        `;

      container.appendChild(lightCard);

      // Initialize this specific light
      this.updateLightUI(light);
    });

    // Add event listeners for new elements
    this.attachLightEventListeners();
  }

  // Add this method to update individual light UI - YOUR EXACT FUNCTION
  updateLightUI(light) {
    const bulb = document.getElementById(`bulb-${light.id}`);
    const status = document.getElementById(`status-${light.id}`);
    const brightnessSlider = document.getElementById(`brightness-${light.id}`);
    const warmthSlider = document.getElementById(`warmth-${light.id}`);
    const brightnessInd = document.getElementById(`brightness-ind-${light.id}`);
    const warmthInd = document.getElementById(`warmth-ind-${light.id}`);

    let brightness = light.brightness;
    let warmth = light.warmth;

    // Warmth = blend between orange (#ff9c33) and white (#ffffff)
    let r = 255;
    let g = Math.round(156 + (255 - 156) * (warmth / 100));
    let b = Math.round(51 + (255 - 51) * (warmth / 100));

    if (brightness === 0 || !light.powered) {
      bulb.style.color = "rgba(255, 255, 255, 0.2)";
      status.textContent = "Off";
      brightnessSlider.style.background = "#000";
    } else {
      // Scale brightness → mix with black
      let factor = brightness / 100;
      let br = Math.round(r * factor);
      let bg = Math.round(g * factor);
      let bb = Math.round(b * factor);

      bulb.style.color = `rgb(${br},${bg},${bb})`;
      status.textContent = `${brightness}% Bright`;

      // Brightness slider background = black → white fill
      brightnessSlider.style.background =
        `linear-gradient(90deg, #fff ${brightness}%, #000 ${brightness}%)`;

    }

    // Move needles
    const bPercent = (brightness / 100) * brightnessSlider.offsetWidth;
    const wPercent = (warmth / 100) * warmthSlider.offsetWidth;
    if (warmthInd) warmthInd.style.left = `${wPercent}px`;
  }

  // Add this method to update RGB lights
  updateRGBLights() {
    const container = document.getElementById('rgbLights');
    if (!container) return;

    container.innerHTML = '';

    const currentRoom = this.lightingSystem.rooms[this.lightingSystem.currentRoom];

    currentRoom.rgbLights.forEach(light => {
      const lightCard = document.createElement('div');
      lightCard.className = 'light-card';
      lightCard.innerHTML = `
            <div class="light-header">
                <i class="fas fa-lightbulb" style="color: ${light.powered ? light.color : 'rgba(255, 255, 255, 0.2)'}"></i>
                <div>
                    <div class="light-name">${light.name}</div>
                    <div class="light-status">${light.powered ? 'ON' : 'Off'}</div>
                </div>
            </div>
            <div class="slider-box">
                <input type="range" min="0" max="100" value="${light.brightness}" 
                       class="slider brightness-slider" data-rgb-light="${light.id}" id="rgb-brightness-${light.id}">
                <div class="indicator" id="rgb-brightness-ind-${light.id}"></div>
            </div>
        `;

      container.appendChild(lightCard);

      // Initialize RGB light
      this.updateRGBLightUI(light);
    });
  }

  // Add this method to update RGB light UI
  updateRGBLightUI(light) {
    const brightnessSlider = document.getElementById(`rgb-brightness-${light.id}`);
    const brightnessInd = document.getElementById(`rgb-brightness-ind-${light.id}`);
    const bulb = document.querySelector(`[data-rgb-light="${light.id}"]`).closest('.light-card').querySelector('.fa-lightbulb');

    if (brightnessSlider && brightnessInd && bulb) {
      if (light.powered) {
        brightnessSlider.style.background =
          `linear-gradient(90deg, ${light.color} ${light.brightness}%, #ddd ${light.brightness}%)`;

        bulb.style.color = light.color;

        const percent = (light.brightness / 100) * brightnessSlider.offsetWidth;
        brightnessInd.style.left = `${percent}px`;
      } else {
        brightnessSlider.style.background = "#000";
        bulb.style.color = "rgba(255, 255, 255, 0.2)";
        brightnessInd.style.left = "0px";
      }
    }
  }

  // Add this method to attach event listeners to light controls
  attachLightEventListeners() {
    // Brightness sliders for dimmable lights
    document.querySelectorAll('.brightness-slider:not([data-rgb-light])').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const lightId = e.target.dataset.light;
        const brightness = parseInt(e.target.value);
        this.adjustLightBrightness(lightId, brightness);
      });
    });

    // Warmth sliders
    document.querySelectorAll('.warmth-slider').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const lightId = e.target.dataset.light;
        const warmth = parseInt(e.target.value);
        this.adjustLightWarmth(lightId, warmth);
      });
    });

    // Brightness sliders for RGB lights
    document.querySelectorAll('.brightness-slider[data-rgb-light]').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const lightId = e.target.dataset.rgbLight;
        const brightness = parseInt(e.target.value);
        this.adjustRGBLightBrightness(lightId, brightness);
      });
    });
  }

  // Add this method to initialize RGB controls
  initializeRGBControls() {
    // Color swatches
    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        this.setRGBColor(e.target.dataset.color);
      });
    });

    // Custom color picker
    document.getElementById('customColor')?.addEventListener('input', (e) => {
      this.setRGBColor(e.target.value);
    });
  }

  // Add this method to set RGB color
  setRGBColor(color) {
    // Update color swatches
    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.classList.remove('active');
      if (swatch.dataset.color === color) {
        swatch.classList.add('active');
      }
    });

    // Update custom color picker
    const customPicker = document.getElementById('customColor');
    if (customPicker) customPicker.value = color;

    // Apply to current room's RGB lights
    const currentRoom = this.lightingSystem.rooms[this.lightingSystem.currentRoom];
    currentRoom.rgbLights.forEach(light => {
      if (light.powered) {
        light.color = color;
      }
    });

    this.updateRGBLights();
  }

  // Add this method to adjust light brightness
  adjustLightBrightness(lightId, brightness) {
    const currentRoom = this.lightingSystem.rooms[this.lightingSystem.currentRoom];
    const light = currentRoom.dimmableLights.find(l => l.id === lightId);

    if (light) {
      light.brightness = brightness;
      if (brightness > 0 && !light.powered) {
        light.powered = true;
      } else if (brightness === 0) {
        light.powered = false;
      }
      this.updateLightUI(light);
    }
  }

  // Add this method to adjust light warmth
  adjustLightWarmth(lightId, warmth) {
    const currentRoom = this.lightingSystem.rooms[this.lightingSystem.currentRoom];
    const light = currentRoom.dimmableLights.find(l => l.id === lightId);

    if (light) {
      light.warmth = warmth;
      this.updateLightUI(light);
    }
  }

  // Add this method to adjust RGB light brightness
  adjustRGBLightBrightness(lightId, brightness) {
    const currentRoom = this.lightingSystem.rooms[this.lightingSystem.currentRoom];
    const light = currentRoom.rgbLights.find(l => l.id === lightId);

    if (light) {
      light.brightness = brightness;
      if (brightness > 0 && !light.powered) {
        light.powered = true;
      } else if (brightness === 0) {
        light.powered = false;
      }
      this.updateRGBLightUI(light);
    }
  }

  // Add this method to apply scene
  applyScene(sceneName) {
    const scene = this.scenesSystem.scenes[sceneName];
    if (!scene) return;

    this.scenesSystem.applyingScene = true;
    this.scenesSystem.currentScene = sceneName;

    // Apply to current room
    const roomId = this.scenesSystem.currentRoom;

    // Apply lighting scene
    if (scene.lights) {
      const roomLights = this.lightingSystem.rooms[roomId];
      if (roomLights) {
        roomLights.dimmableLights.forEach(light => {
          if (scene.lights.brightness !== undefined) {
            light.brightness = scene.lights.brightness;
            light.powered = scene.lights.brightness > 0;
          }
          if (scene.lights.warmth !== undefined) {
            light.warmth = scene.lights.warmth;
          }
        });

        roomLights.rgbLights.forEach(light => {
          if (scene.lights.color) {
            light.color = scene.lights.color;
          }
          if (scene.lights.brightness !== undefined) {
            light.brightness = scene.lights.brightness;
            light.powered = scene.lights.brightness > 0;
          }
        });
      }
    }

    // Apply AC scene
    if (scene.ac) {
      const roomAC = this.acSystem.rooms[roomId];
      if (roomAC) {
        if (scene.ac.temp !== undefined) {
          roomAC.temperature = scene.ac.temp;
        }
        if (scene.ac.mode !== undefined) {
          roomAC.mode = scene.ac.mode;
        }
        if (scene.ac.powered !== undefined) {
          roomAC.powered = scene.ac.powered;
        }
      }
    }

    // Update all UIs
    if (this.lightingSystem) this.updateLightingUI();
    if (this.acSystem) this.updateACUI();

    // Simulate scene application completion
    setTimeout(() => {
      this.scenesSystem.applyingScene = false;
      this.updateScenesUI();
    }, 1000);

    this.logActivity(`Applied ${sceneName} scene to ${this.getRoomDisplayName(roomId)}`);
  }

  // Add this method to update lighting UI
  updateLightingUI() {
    this.updateLightsDisplay();
  }

  // Add this method to show the lighting system
  showLightingSystem() {
    const lightingSystemEl = document.getElementById('lightingSystem');
    if (lightingSystemEl) {
      lightingSystemEl.style.display = 'block';
      document.getElementById('overlay').classList.add('active');
      this.updateLightingUI();
    }
  }

  // Add this method to hide the lighting system
  hideLightingSystem() {
    const lightingSystemEl = document.getElementById('lightingSystem');
    if (lightingSystemEl) {
      lightingSystemEl.style.display = 'none';
      document.getElementById('overlay').classList.remove('active');
    }
  }
  // lock section

  initializeScenesSystem() {
    // Set up event listeners
    document.getElementById('closeScenesBtn')?.addEventListener('click', () => {
      this.hideScenesSystem();
    });

    // Scene cards
    document.querySelectorAll('.scene-card').forEach(card => {
      card.addEventListener('click', (e) => {
        this.applyScene(e.target.closest('.scene-card').dataset.scene);
      });
    });

    // Quick scene buttons
    document.querySelectorAll('.quick-scene-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.applyScene(e.target.closest('.quick-scene-btn').dataset.scene);
      });
    });

    this.populateSceneRooms();
    this.updateScenesUI();
  }

  initializeQuickActionsSystem() {
    document.getElementById('closeQuickActionsBtn')?.addEventListener('click', () => {
      this.hideQuickActionsSystem();
    });

    // Action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.executeQuickAction(e.target.closest('.action-btn').dataset.action);
      });
    });

    this.updateQuickActionsUI();
  }

  // Initialize Lock System
  initializeLockSystem() {
    // Set up event listeners
    document.getElementById('closeLockBtn')?.addEventListener('click', () => {
      this.hideLockSystem();
    });

    // Lock toggle buttons - use event delegation for dynamic elements
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('lock-toggle-btn')) {
        const lockId = e.target.dataset.lock;
        if (lockId) {
          this.toggleLock(lockId);
        }
      }
    });

    // Control buttons
    document.querySelector('.lock-all-btn')?.addEventListener('click', () => {
      this.lockAllDoors();
    });

    document.querySelector('.unlock-all-btn')?.addEventListener('click', () => {
      this.unlockAllDoors();
    });

    // Initialize the UI
    this.updateLockUI();
  }
  // Scene Methods
  populateSceneRooms() {
    const container = document.getElementById('sceneRooms');
    if (!container) return;

    container.innerHTML = '';

    Object.keys(this.rooms).forEach(roomId => {
      const roomTab = document.createElement('button');
      roomTab.className = 'room-tab';
      roomTab.textContent = this.getRoomDisplayName(roomId);
      roomTab.setAttribute('data-room', roomId);

      if (roomId === this.scenesSystem.currentRoom) {
        roomTab.classList.add('active');
      }

      roomTab.addEventListener('click', () => {
        this.switchSceneRoom(roomId);
      });

      container.appendChild(roomTab);
    });
  }

  switchSceneRoom(roomId) {
    this.scenesSystem.currentRoom = roomId;

    document.querySelectorAll('#sceneRooms .room-tab').forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.room === roomId) {
        tab.classList.add('active');
      }
    });
  }

  applyScene(sceneName) {
    const scene = this.scenesSystem.scenes[sceneName];
    if (!scene) return;

    // Apply to current room
    const roomId = this.scenesSystem.currentRoom;

    // Apply lighting scene
    if (scene.lights) {
      const roomLights = this.lightingSystem.rooms[roomId];
      if (roomLights) {
        roomLights.dimmableLights.forEach(light => {
          if (scene.lights.brightness !== undefined) {
            light.brightness = scene.lights.brightness;
            light.powered = scene.lights.brightness > 0;
          }
          if (scene.lights.warmth !== undefined) {
            light.warmth = scene.lights.warmth;
          }
        });

        roomLights.rgbLights.forEach(light => {
          if (scene.lights.color) {
            light.color = scene.lights.color;
          }
          if (scene.lights.brightness !== undefined) {
            light.brightness = scene.lights.brightness;
            light.powered = scene.lights.brightness > 0;
          }
        });
      }
    }

    // Apply AC scene
    if (scene.ac) {
      const roomAC = this.acSystem.rooms[roomId];
      if (roomAC) {
        if (scene.ac.temp !== undefined) {
          roomAC.temperature = scene.ac.temp;
        }
        if (scene.ac.mode !== undefined) {
          roomAC.mode = scene.ac.mode;
        }
        if (scene.ac.powered !== undefined) {
          roomAC.powered = scene.ac.powered;
        }
      }
    }

    // Update all UIs
    if (this.lightingSystem) this.updateLightingUI();
    if (this.acSystem) this.updateACUI();

    this.logActivity(`Applied ${sceneName} scene to ${this.getRoomDisplayName(roomId)}`);
  }

  // Quick Actions Methods
  executeQuickAction(action) {
    switch (action) {
      case 'all-lights-on':
        this.quickAction('allLightsOn');
        break;
      case 'all-lights-off':
        this.quickAction('allLightsOff');
        break;
      case 'dim-lights':
        Object.keys(this.lightingSystem.rooms).forEach(roomId => {
          this.lightingSystem.rooms[roomId].dimmableLights.forEach(light => {
            light.brightness = 30;
          });
        });
        this.updateLightingUI();
        break;
      case 'bright-lights':
        Object.keys(this.lightingSystem.rooms).forEach(roomId => {
          this.lightingSystem.rooms[roomId].dimmableLights.forEach(light => {
            light.brightness = 90;
          });
        });
        this.updateLightingUI();
        break;
      case 'all-ac-on':
        Object.keys(this.acSystem.rooms).forEach(roomId => {
          this.acSystem.rooms[roomId].powered = true;
        });
        this.updateACUI();
        break;
      case 'all-ac-off':
        Object.keys(this.acSystem.rooms).forEach(roomId => {
          this.acSystem.rooms[roomId].powered = false;
        });
        this.updateACUI();
        break;
      case 'ceiling-fans-off':
        // Turn off all fans
        this.logActivity('All ceiling fans turned off');
        break;
      case 'set-comfort-temp':
        Object.keys(this.acSystem.rooms).forEach(roomId => {
          this.acSystem.rooms[roomId].temperature = 22;
          this.acSystem.rooms[roomId].powered = true;
        });
        this.updateACUI();
        break;
      case 'close-all-curtains':
        Object.keys(this.curtains).forEach(roomId => {
          this.curtains[roomId].open = false;
          this.curtains[roomId].level = 0;
        });
        break;
      case 'open-all-curtains':
        Object.keys(this.curtains).forEach(roomId => {
          this.curtains[roomId].open = true;
          this.curtains[roomId].level = 100;
        });
        break;
      case 'arm-security':
        this.securityArmed = true;
        this.updateSecurityUI();
        break;
      case 'disarm-security':
        this.securityArmed = false;
        this.updateSecurityUI();
        break;
      case 'living-room-off':
        this.turnOffRoom('living-room');
        break;
      case 'living-room-entertainment':
        this.applyScene('movie');
        break;
      case 'bedroom-sleep':
        this.applyScene('goodnight');
        break;
      case 'bedroom-wakeup':
        this.applyScene('sunrise');
        break;
    }

    this.logActivity(`Executed quick action: ${action}`);
  }

  turnOffRoom(roomId) {
    // Turn off lights
    if (this.lightingSystem.rooms[roomId]) {
      this.lightingSystem.rooms[roomId].dimmableLights.forEach(light => {
        light.powered = false;
        light.brightness = 0;
      });
      this.lightingSystem.rooms[roomId].rgbLights.forEach(light => {
        light.powered = false;
        light.brightness = 0;
      });
    }

    // Turn off AC
    if (this.acSystem.rooms[roomId]) {
      this.acSystem.rooms[roomId].powered = false;
    }

    this.updateLightingUI();
    this.updateACUI();
  }

  // Lock System Methods
  toggleLock(lockId) {
    const lock = this.lockSystem.locks[lockId];
    if (lock) {
      lock.locked = !lock.locked;

      // Add visual feedback
      const button = document.querySelector(`[data-lock="${lockId}"]`);
      if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = 'scale(1)';
        }, 150);
      }

      this.updateLockUI();

      const action = lock.locked ? 'locked' : 'unlocked';
      this.logLockActivity(`${lock.name} ${action}`);

      // Log to main activity as well
      this.logActivity(`Door ${action}: ${lock.name}`);
    }
  }


  lockAllDoors() {
    let lockedCount = 0;
    Object.keys(this.lockSystem.locks).forEach(lockId => {
      if (!this.lockSystem.locks[lockId].locked) {
        this.lockSystem.locks[lockId].locked = true;
        lockedCount++;
      }
    });

    this.updateLockUI();
    this.logLockActivity(`All doors locked (${lockedCount} doors secured)`);
    this.logActivity(`Locked all doors (${lockedCount} doors)`);

    // Visual feedback
    this.showLockNotification('All doors locked 🔒', 'success');
  }

  unlockAllDoors() {
    let unlockedCount = 0;
    Object.keys(this.lockSystem.locks).forEach(lockId => {
      if (this.lockSystem.locks[lockId].locked) {
        this.lockSystem.locks[lockId].locked = false;
        unlockedCount++;
      }
    });

    this.updateLockUI();
    this.logLockActivity(`All doors unlocked (${unlockedCount} doors opened)`);
    this.logActivity(`Unlocked all doors (${unlockedCount} doors)`);

    // Visual feedback
    this.showLockNotification('All doors unlocked 🔓', 'warning');
  }

  updateLockUI() {
    // Update overview status
    const allLocked = Object.values(this.lockSystem.locks).every(lock => lock.locked);
    const someLocked = Object.values(this.lockSystem.locks).some(lock => lock.locked);

    const overviewStatus = document.querySelector('.overview-status');
    if (overviewStatus) {
      if (allLocked) {
        overviewStatus.className = 'overview-status locked';
        overviewStatus.innerHTML = '<i class="fas fa-lock"></i><span>All Doors Locked</span>';
      } else if (someLocked) {
        overviewStatus.className = 'overview-status partial';
        overviewStatus.innerHTML = '<i class="fas fa-lock-open"></i><span>Some Doors Unlocked</span>';
        overviewStatus.style.color = '#ff9500'; // Orange for partial
      } else {
        overviewStatus.className = 'overview-status unlocked';
        overviewStatus.innerHTML = '<i class="fas fa-unlock"></i><span>All Doors Unlocked</span>';
      }
    }

    // Update individual locks
    Object.keys(this.lockSystem.locks).forEach(lockId => {
      const lock = this.lockSystem.locks[lockId];
      const lockItem = document.querySelector(`[data-lock="${lockId}"]`)?.closest('.lock-item');

      if (lockItem) {
        const statusElement = lockItem.querySelector('.status-indicator');
        const buttonElement = lockItem.querySelector('.lock-toggle-btn');

        if (statusElement) {
          statusElement.className = `status-indicator ${lock.locked ? 'locked' : 'unlocked'}`;
          statusElement.innerHTML = lock.locked ?
            '<i class="fas fa-lock"></i><span>Locked</span>' :
            '<i class="fas fa-unlock"></i><span>Unlocked</span>';
        }

        if (buttonElement) {
          buttonElement.textContent = lock.locked ? 'Unlock' : 'Lock';
          buttonElement.style.background = lock.locked ?
            'rgba(255, 59, 48, 0.3)' : 'rgba(76, 175, 80, 0.3)';
          buttonElement.style.color = lock.locked ? '#ff3b30' : '#4CAF50';
        }

        // Add visual state to the entire lock item
        lockItem.style.borderLeft = lock.locked ?
          '4px solid #4CAF50' : '4px solid #ff3b30';
      }
    });
  }

  // Enhanced logLockActivity method
  logLockActivity(message) {
    const entry = {
      timestamp: new Date(),
      message: message
    };

    this.lockSystem.history.unshift(entry);

    // Keep only last 10 entries
    if (this.lockSystem.history.length > 10) {
      this.lockSystem.history = this.lockSystem.history.slice(0, 10);
    }

    this.updateLockHistory();
  }

  // Enhanced updateLockHistory method
  updateLockHistory() {
    const container = document.getElementById('lockHistory');
    if (!container) return;

    container.innerHTML = '';

    this.lockSystem.history.forEach(entry => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';

      // Color code based on action
      const isLock = entry.message.includes('locked');
      historyItem.style.borderLeftColor = isLock ? '#4CAF50' : '#ff3b30';

      historyItem.innerHTML = `
            <div class="history-time">${this.formatTime(entry.timestamp)}</div>
            <div class="history-message">${entry.message}</div>
        `;
      container.appendChild(historyItem);
    });
  }

  // Add this helper method for lock notifications
  showLockNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `lock-notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255, 149, 0, 0.9)'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-size: 14px;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;

    // Add keyframes for animation
    if (!document.querySelector('#lock-notification-styles')) {
      const style = document.createElement('style');
      style.id = 'lock-notification-styles';
      style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
      document.head.appendChild(style);
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  // Show/Hide Methods
  showScenesSystem() {
    const scenesSystemEl = document.getElementById('scenesSystem');
    if (scenesSystemEl) {
      scenesSystemEl.style.display = 'block';
      document.getElementById('overlay').classList.add('active');
      this.populateSceneRooms();
      this.updateScenesUI();
    }
  }


  hideScenesSystem() {
    const scenesSystemEl = document.getElementById('scenesSystem');
    if (scenesSystemEl) {
      scenesSystemEl.style.display = 'none';
      document.getElementById('overlay').classList.remove('active');

      // Stop any ongoing scene animations or processes
      if (this.scenesSystem.currentScene) {
        this.stopSceneAnimation(this.scenesSystem.currentScene);
      }
      if (this.scenesSystem.applyingScene) {
        this.cancelSceneApplication();
      }
    }
  }


  // Additional scene methods
  stopSceneAnimation(sceneName) {
    // Stop any ongoing scene animations
    console.log(`Stopping scene animation: ${sceneName}`);
    // Add any scene-specific cleanup here
  }

  cancelSceneApplication() {
    // Cancel any ongoing scene application
    this.scenesSystem.applyingScene = false;
    console.log('Scene application cancelled');
  }

  updateScenesUI() {
    // Update scenes UI if needed
    const currentScene = this.scenesSystem.currentScene;
    if (currentScene) {
      document.querySelectorAll('.scene-card').forEach(card => {
        card.classList.toggle('active', card.dataset.scene === currentScene);
      });
    }
  }

  showQuickActionsSystem() {
    const quickActionsSystemEl = document.getElementById('quickActionsSystem');
    if (quickActionsSystemEl) {
      quickActionsSystemEl.style.display = 'block';
      document.getElementById('overlay').classList.add('active');
      this.updateQuickActionsUI();
    }
  }

  // Additional quick action methods
  cancelQuickAction() {
    // Cancel any ongoing quick action
    this.quickActionsSystem.executingAction = false;
    console.log('Quick action cancelled');
  }

  updateQuickActionsUI() {
    // Update quick actions UI if needed
    // For example, disable buttons during execution
    const actionBtns = document.querySelectorAll('.action-btn');
    if (this.quickActionsSystem.executingAction) {
      actionBtns.forEach(btn => {
        btn.disabled = true;
      });
    } else {
      actionBtns.forEach(btn => {
        btn.disabled = false;
      });
    }
  }
  hideQuickActionsSystem() {
    const quickActionsSystemEl = document.getElementById('quickActionsSystem');
    if (quickActionsSystemEl) {
      quickActionsSystemEl.style.display = 'none';
      document.getElementById('overlay').classList.remove('active');

      // Stop any ongoing quick action processes
      if (this.quickActionsSystem.executingAction) {
        this.cancelQuickAction();
      }
      if (this.quickActionsSystem.actionTimer) {
        clearTimeout(this.quickActionsSystem.actionTimer);
        this.quickActionsSystem.actionTimer = null;
      }
    }
  }

  showLockSystem() {
    const lockSystemEl = document.getElementById('lockSystem');
    if (lockSystemEl) {
      lockSystemEl.style.display = 'block';
      document.getElementById('overlay').classList.add('active');
      this.updateLockUI();
      this.updateLockHistory();
    }
  }

  hideLockSystem() {
    document.getElementById('lockSystem').style.display = 'none';
    document.getElementById('overlay').classList.remove('active');
  }
  // ac control section

  // Add this method to initialize the AC system
  initializeACSystem() {
    // Set up event listeners
    document.getElementById('closeAcBtn')?.addEventListener('click', () => {
      this.hideACSystem();
    });

    // Power button
    document.getElementById('acPowerBtn')?.addEventListener('click', () => {
      this.toggleACPower();
    });

    // Temperature controls
    document.getElementById('tempDownBtn')?.addEventListener('click', () => {
      this.adjustACTemperature(-1);
    });

    document.getElementById('tempUpBtn')?.addEventListener('click', () => {
      this.adjustACTemperature(1);
    });

    // Mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setACMode(e.target.closest('.mode-btn').dataset.mode);
      });
    });

    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setACTemperature(parseInt(e.target.closest('.preset-btn').dataset.temp));
      });
    });

    // Initialize room tabs
    this.populateACRooms();

    // Initialize dial interaction
    this.initializeDial();

    // Update UI
    this.updateACUI();
  }

  // Add this method to populate room tabs
  populateACRooms() {
    const tabsContainer = document.getElementById('acRoomTabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = '';

    Object.entries(this.rooms).forEach(([id, room]) => {
      const roomTab = document.createElement('button');
      roomTab.className = 'room-tab';
      roomTab.textContent = this.getRoomDisplayName(id);
      roomTab.setAttribute('data-room', id);

      if (id === this.acSystem.currentRoom) {
        roomTab.classList.add('active');
      }

      roomTab.addEventListener('click', () => {
        this.switchACRoom(id);
      });

      tabsContainer.appendChild(roomTab);
    });
  }

  // Add this method to get room display name
  getRoomDisplayName(roomId) {
    const names = {
      'living-room': 'Living Room',
      'master-bedroom': 'Bedroom',
      'study': 'Study',
      'dining': 'Dining'
    };
    return names[roomId] || roomId;
  }

  // Add this method to switch AC room
  switchACRoom(roomId) {
    this.acSystem.currentRoom = roomId;

    // Update room tabs
    document.querySelectorAll('.room-tab').forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.room === roomId) {
        tab.classList.add('active');
      }
    });

    // Update room name display
    const roomNameEl = document.getElementById('currentRoomName');
    if (roomNameEl) {
      roomNameEl.textContent = this.getRoomDisplayName(roomId);
    }

    // Update temperature and mode display
    this.updateACTemperatureDisplay();
    this.updateACModeDisplay();

    this.logACActivity(`Switched to ${this.getRoomDisplayName(roomId)} AC controls`);
  }

  // Add this method to toggle AC power
  toggleACPower() {
    const currentRoom = this.acSystem.rooms[this.acSystem.currentRoom];
    currentRoom.powered = !currentRoom.powered;

    // Update system power status
    this.acSystem.poweredOn = Object.values(this.acSystem.rooms).some(room => room.powered);

    this.updateACUI();

    const action = currentRoom.powered ? 'ON' : 'OFF';
    this.logACActivity(`Turned ${action} AC in ${this.getRoomDisplayName(this.acSystem.currentRoom)}`);
  }

  // Add this method to adjust temperature
  adjustACTemperature(change) {
    const currentRoom = this.acSystem.rooms[this.acSystem.currentRoom];
    const newTemp = Math.max(this.acSystem.minTemp,
      Math.min(this.acSystem.maxTemp, currentRoom.temperature + change));

    currentRoom.temperature = newTemp;
    this.updateACTemperatureDisplay();
    this.updateDialPosition();

    this.logACActivity(`Set ${this.getRoomDisplayName(this.acSystem.currentRoom)} temperature to ${newTemp}°C`);
  }

  // Add this method to set temperature from preset
  setACTemperature(temperature) {
    const currentRoom = this.acSystem.rooms[this.acSystem.currentRoom];
    currentRoom.temperature = temperature;

    // Update preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.classList.remove('active');
      if (parseInt(btn.dataset.temp) === temperature) {
        btn.classList.add('active');
      }
    });

    this.updateACTemperatureDisplay();
    this.updateDialPosition();

    this.logACActivity(`Set ${this.getRoomDisplayName(this.acSystem.currentRoom)} temperature to ${temperature}°C (preset)`);
  }

  // Add this method to set AC mode
  setACMode(mode) {
    const currentRoom = this.acSystem.rooms[this.acSystem.currentRoom];
    currentRoom.mode = mode;

    // Update mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.mode === mode) {
        btn.classList.add('active');
      }
    });

    this.updateACModeDisplay();

    const modeNames = {
      'cool': 'Cooling',
      'heat': 'Heating',
      'fan': 'Fan',
      'auto': 'Auto'
    };

    this.logACActivity(`Set ${this.getRoomDisplayName(this.acSystem.currentRoom)} AC mode to ${modeNames[mode]}`);
  }

  // Add this method to update temperature display
  updateACTemperatureDisplay() {
    const currentRoom = this.acSystem.rooms[this.acSystem.currentRoom];

    const currentTempEl = document.getElementById('currentTemp');
    const targetTempEl = document.getElementById('targetTemp');

    if (currentTempEl) currentTempEl.textContent = currentRoom.temperature;
    if (targetTempEl) targetTempEl.textContent = `Target: ${currentRoom.temperature}°C`;
  }

  // Add this method to update mode display
  updateACModeDisplay() {
    const currentRoom = this.acSystem.rooms[this.acSystem.currentRoom];
    const modeLabelEl = document.getElementById('acModeLabel');

    if (modeLabelEl) {
      const modeNames = {
        'cool': 'COOLING',
        'heat': 'HEATING',
        'fan': 'FAN',
        'auto': 'AUTO'
      };
      modeLabelEl.textContent = modeNames[currentRoom.mode] || 'COOLING';
    }
  }

  // Add this method to initialize dial interaction
  initializeDial() {
    const dialHandle = document.getElementById('dialHandle');
    const dialProgress = document.getElementById('dialProgress');

    if (!dialHandle || !dialProgress) return;

    let isDragging = false;

    dialHandle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      this.handleDialDrag(e);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile
    dialHandle.addEventListener('touchstart', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      this.handleDialDrag(e.touches[0]);
    });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // Add this method to handle dial dragging
  handleDialDrag(e) {
    const dial = document.querySelector('.thermostat-dial');
    if (!dial) return;

    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

    // Convert angle to temperature (16-30°C range)
    let normalizedAngle = (angle + 180) % 360;
    if (normalizedAngle < 0) normalizedAngle += 360;

    // Map 45°-315° to 16-30°C (270° range)
    const tempRange = this.acSystem.maxTemp - this.acSystem.minTemp;
    const temperature = Math.round(this.acSystem.minTemp + (normalizedAngle / 270) * tempRange);

    // Clamp temperature
    const clampedTemp = Math.max(this.acSystem.minTemp, Math.min(this.acSystem.maxTemp, temperature));

    // Update temperature
    const currentRoom = this.acSystem.rooms[this.acSystem.currentRoom];
    currentRoom.temperature = clampedTemp;

    this.updateACTemperatureDisplay();
    this.updateDialPosition();
  }

  // Add this method to update dial position
  updateDialPosition() {
    const currentRoom = this.acSystem.rooms[this.acSystem.currentRoom];
    const dialHandle = document.getElementById('dialHandle');
    const dialProgress = document.getElementById('dialProgress');

    if (!dialHandle || !dialProgress) return;

    // Calculate angle based on temperature (16-30°C maps to 45°-315°)
    const tempRange = this.acSystem.maxTemp - this.acSystem.minTemp;
    const normalizedTemp = (currentRoom.temperature - this.acSystem.minTemp) / tempRange;
    const angle = 45 + (normalizedTemp * 270); // 45° to 315°

    // Convert to radians
    const radians = (angle - 90) * (Math.PI / 180);

    // Position handle (radius = 80px from center)
    const radius = 80;
    const x = 100 + radius * Math.cos(radians);
    const y = 100 + radius * Math.sin(radians);

    dialHandle.style.left = `${x}px`;
    dialHandle.style.top = `${y}px`;

    // Update progress (start from -45° to match the track)
    dialProgress.style.transform = `rotate(${angle - 45}deg)`;
  }

  // Add this method to update AC UI
  updateACUI() {
    const currentRoom = this.acSystem.rooms[this.acSystem.currentRoom];

    // Update power button
    const powerBtn = document.getElementById('acPowerBtn');
    if (powerBtn) {
      powerBtn.classList.toggle('active', currentRoom.powered);
    }

    // Update status indicator
    const statusDot = document.getElementById('acStatusDot');
    const statusText = document.getElementById('acStatusText');

    if (statusDot && statusText) {
      if (currentRoom.powered) {
        statusDot.classList.add('online');
        statusText.textContent = 'System Online';
      } else {
        statusDot.classList.remove('online');
        statusText.textContent = 'System Offline';
      }
    }

    // Update mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === currentRoom.mode);
    });

    // Update preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.temp) === currentRoom.temperature);
    });

    this.updateACTemperatureDisplay();
    this.updateACModeDisplay();
    this.updateDialPosition();
    this.updateACHistory();
  }

  // Add this method to update AC history
  updateACHistory() {
    const historyContainer = document.getElementById('acHistory');
    if (!historyContainer) return;

    historyContainer.innerHTML = '';

    this.acSystem.history.slice(0, 5).forEach(entry => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
            <div class="history-time">${this.formatTime(entry.timestamp)}</div>
            <div class="history-message">${entry.message}</div>
        `;
      historyContainer.appendChild(historyItem);
    });
  }

  // Add this method to log AC activity
  logACActivity(message) {
    const entry = {
      timestamp: new Date(),
      message: message
    };

    this.acSystem.history.unshift(entry);

    if (this.acSystem.history.length > 10) {
      this.acSystem.history = this.acSystem.history.slice(0, 10);
    }

    this.updateACHistory();
  }

  // Add this method to show the AC system
  showACSystem() {
    const acSystemEl = document.getElementById('acSystem');
    if (acSystemEl) {
      acSystemEl.style.display = 'block';
      document.getElementById('overlay').classList.add('active');
      this.updateACUI();
    }
  }

  // Add this method to hide the AC system
  hideACSystem() {
    const acSystemEl = document.getElementById('acSystem');
    if (acSystemEl) {
      acSystemEl.style.display = 'none';
      document.getElementById('overlay').classList.remove('active');
    }
  }


  // Music Player Methods
  initializeMusicPlayer() {
    this.musicPlayer.audio.volume = this.musicPlayer.volume / 100;

    // Set up event listeners for the audio element
    this.musicPlayer.audio.addEventListener('timeupdate', () => {
      this.updateProgressBar();
    });

    this.musicPlayer.audio.addEventListener('loadedmetadata', () => {
      this.musicPlayer.duration = this.musicPlayer.audio.duration;
      this.updateDurationDisplay();
    });

    this.musicPlayer.audio.addEventListener('ended', () => {
      this.playNextTrack();
    });

    // Set up UI event listeners
    document.getElementById('playPauseBtn')?.addEventListener('click', () => {
      this.toggleMusicPlayback();
    });

    document.getElementById('prevBtn')?.addEventListener('click', () => {
      this.playPreviousTrack();
    });

    document.getElementById('nextBtn')?.addEventListener('click', () => {
      this.playNextTrack();
    });

    document.getElementById('progressBar')?.addEventListener('input', (e) => {
      this.seekMusic(e.target.value);
    });

    document.getElementById('volumeSlider')?.addEventListener('input', (e) => {
      this.adjustMusicVolume(e.target.value);
    });

    document.getElementById('closePlayerBtn')?.addEventListener('click', () => {
      this.hideMusicPlayer();
    });

    // Populate playlist
    this.populatePlaylist();
  }

  populatePlaylist() {
    const playlistElement = document.getElementById('playlist');
    if (!playlistElement) return;

    playlistElement.innerHTML = '';

    this.musicPlayer.playlist.forEach((track, index) => {
      const playlistItem = document.createElement('div');
      playlistItem.className = 'playlist-item';
      if (this.musicPlayer.currentTrack && this.musicPlayer.currentTrack.id === track.id) {
        playlistItem.classList.add('active');
      }
      playlistItem.innerHTML = `
            <img src="${track.albumArt}" alt="${track.album}">
            <div class="playlist-item-info">
                <h5>${track.title}</h5>
                <p>${track.artist} • ${track.album}</p>
            </div>
            <span class="playlist-item-duration">${track.duration}</span>
        `;
      playlistItem.addEventListener('click', () => {
        this.playTrack(index);
      });
      playlistElement.appendChild(playlistItem);
    });
  }

  playTrack(index) {
    if (index >= 0 && index < this.musicPlayer.playlist.length) {
      this.musicPlayer.currentTrack = this.musicPlayer.playlist[index];

      // In a real app, you would set the audio source here
      // this.musicPlayer.audio.src = this.musicPlayer.currentTrack.audioUrl;

      // Simulate loading metadata for demo purposes
      this.musicPlayer.duration = 180 + Math.floor(Math.random() * 120); // Random duration between 3-5 minutes
      this.updateDurationDisplay();

      this.updatePlayerUI();
      this.playMusic();
      this.populatePlaylist(); // Update active track in playlist
    }
  }

  toggleMusicPlayback() {
    if (this.musicPlayer.playing) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }

  playMusic() {
    if (!this.musicPlayer.currentTrack && this.musicPlayer.playlist.length > 0) {
      this.playTrack(0);
      return;
    }

    this.musicPlayer.playing = true;
    // In a real app: this.musicPlayer.audio.play();

    const playPauseBtn = document.getElementById('playPauseBtn');
    if (playPauseBtn) {
      playPauseBtn.textContent = '⏸';
      playPauseBtn.classList.add('playing');
    }

    this.logActivity(`Music playing: ${this.musicPlayer.currentTrack.title}`);
  }

  pauseMusic() {
    this.musicPlayer.playing = false;
    // In a real app: this.musicPlayer.audio.pause();

    const playPauseBtn = document.getElementById('playPauseBtn');
    if (playPauseBtn) {
      playPauseBtn.textContent = '▶';
      playPauseBtn.classList.remove('playing');
    }

    this.logActivity(`Music paused: ${this.musicPlayer.currentTrack.title}`);
  }

  playNextTrack() {
    if (!this.musicPlayer.currentTrack) return;

    const currentIndex = this.musicPlayer.playlist.findIndex(
      track => track.id === this.musicPlayer.currentTrack.id
    );
    const nextIndex = (currentIndex + 1) % this.musicPlayer.playlist.length;
    this.playTrack(nextIndex);
  }

  playPreviousTrack() {
    if (!this.musicPlayer.currentTrack) return;

    const currentIndex = this.musicPlayer.playlist.findIndex(
      track => track.id === this.musicPlayer.currentTrack.id
    );
    const prevIndex = (currentIndex - 1 + this.musicPlayer.playlist.length) % this.musicPlayer.playlist.length;
    this.playTrack(prevIndex);
  }

  updateProgressBar() {
    if (this.musicPlayer.audio.duration) {
      const progress = (this.musicPlayer.audio.currentTime / this.musicPlayer.audio.duration) * 100;
      const progressBar = document.getElementById('progressBar');
      if (progressBar) progressBar.value = progress;

      // Update current time display
      const minutes = Math.floor(this.musicPlayer.audio.currentTime / 60);
      const seconds = Math.floor(this.musicPlayer.audio.currentTime % 60);
      const currentTimeEl = document.getElementById('currentTime');
      if (currentTimeEl) currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  updateDurationDisplay() {
    const minutes = Math.floor(this.musicPlayer.duration / 60);
    const seconds = Math.floor(this.musicPlayer.duration % 60);
    const durationEl = document.getElementById('duration');
    if (durationEl) durationEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  seekMusic(value) {
    if (this.musicPlayer.audio.duration) {
      const seekTime = (value / 100) * this.musicPlayer.audio.duration;
      this.musicPlayer.audio.currentTime = seekTime;
    }
  }

  adjustMusicVolume(value) {
    this.musicPlayer.volume = parseInt(value);
    this.musicPlayer.audio.volume = this.musicPlayer.volume / 100;
    const volumeValueEl = document.getElementById('volumeValue');
    if (volumeValueEl) volumeValueEl.textContent = `${this.musicPlayer.volume}%`;
    this.logActivity(`Music volume set to ${this.musicPlayer.volume}%`);
  }

  updatePlayerUI() {
    if (this.musicPlayer.currentTrack) {
      const currentTrackEl = document.getElementById('currentTrack');
      const currentArtistEl = document.getElementById('currentArtist');
      const currentAlbumEl = document.getElementById('currentAlbum');
      const currentAlbumArtEl = document.getElementById('currentAlbumArt');

      if (currentTrackEl) currentTrackEl.textContent = this.musicPlayer.currentTrack.title;
      if (currentArtistEl) currentArtistEl.textContent = this.musicPlayer.currentTrack.artist;
      if (currentAlbumEl) currentAlbumEl.textContent = this.musicPlayer.currentTrack.album;
      if (currentAlbumArtEl) currentAlbumArtEl.src = this.musicPlayer.currentTrack.albumArt;
    }
  }

  showMusicPlayer() {
    const musicPlayerEl = document.getElementById('musicPlayer');
    if (musicPlayerEl) {
      musicPlayerEl.style.display = 'block';
      document.getElementById('overlay').classList.add('active');
      this.updatePlayerUI();
    }
  }

  hideMusicPlayer() {
    const musicPlayerEl = document.getElementById('musicPlayer');
    if (musicPlayerEl) {
      musicPlayerEl.style.display = 'none';
    }
  }

  // PA System Methods
  initializePASystem() {
    // Set up event listeners
    document.getElementById('closePaBtn')?.addEventListener('click', () => {
      this.hidePASystem();
    });

    // Recording controls
    document.getElementById('recordBtn')?.addEventListener('click', () => {
      this.toggleRecording();
    });

    document.getElementById('playBtn')?.addEventListener('click', () => {
      this.playRecording();
    });

    document.getElementById('deleteRecording')?.addEventListener('click', () => {
      this.deleteRecording();
    });

    document.getElementById('broadcastBtn')?.addEventListener('click', () => {
      this.broadcastRecording();
    });

    // Initialize room buttons
    this.populatePARooms();

    // Initialize waveform
    this.generateWaveform();

    // Update UI
    this.updatePAUI();
  }

  populatePARooms() {
    const roomsContainer = document.getElementById('paRooms');
    if (!roomsContainer) return;

    roomsContainer.innerHTML = '';

    Object.entries(this.rooms).forEach(([id, room]) => {
      const roomBtn = document.createElement('button');
      roomBtn.className = 'room-btn';
      roomBtn.setAttribute('data-room', id);
      roomBtn.innerHTML = `
            <span class="room-icon">${room.icon}</span>
            <span class="room-name">${room.name}</span>
        `;

      roomBtn.addEventListener('click', () => {
        this.toggleRoomSelection(id);
      });

      roomsContainer.appendChild(roomBtn);
    });
  }

  toggleRoomSelection(roomId) {
    const roomBtn = document.querySelector(`.room-btn[data-room="${roomId}"]`);

    if (this.paSystem.selectedRooms.includes(roomId)) {
      this.paSystem.selectedRooms = this.paSystem.selectedRooms.filter(id => id !== roomId);
      if (roomBtn) roomBtn.classList.remove('selected');
    } else {
      this.paSystem.selectedRooms.push(roomId);
      if (roomBtn) roomBtn.classList.add('selected');
    }

    this.updateBroadcastButton();
    this.logPAActivity(`Room ${this.rooms[roomId].name} ${this.paSystem.selectedRooms.includes(roomId) ? 'selected' : 'deselected'} for broadcast`);
  }

  toggleRecording() {
    if (this.paSystem.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  startRecording() {
    this.paSystem.isRecording = true;
    this.paSystem.hasRecording = false;

    // Show recording visualizer
    const visualizer = document.getElementById('recordingVisualizer');
    const recordBtn = document.getElementById('recordBtn');
    const playBtn = document.getElementById('playBtn');

    if (visualizer) visualizer.style.display = 'flex';
    if (recordBtn) {
      recordBtn.classList.add('recording');
      recordBtn.querySelector('.record-text').textContent = 'Stop Recording';
    }
    if (playBtn) playBtn.disabled = true;

    // Start timer
    let timeLeft = this.paSystem.recordingDuration;
    const timerElement = document.getElementById('recordingTimer');

    this.paSystem.recordingTimer = setInterval(() => {
      timeLeft--;

      if (timerElement) {
        timerElement.textContent = `0:${timeLeft.toString().padStart(2, '0')}`;
      }

      if (timeLeft <= 0) {
        this.stopRecording();
      }
    }, 1000);

    this.logPAActivity('Recording started', 'recording');
  }

  stopRecording() {
    this.paSystem.isRecording = false;
    this.paSystem.hasRecording = true;

    // Hide recording visualizer
    const visualizer = document.getElementById('recordingVisualizer');
    const recordBtn = document.getElementById('recordBtn');
    const playBtn = document.getElementById('playBtn');
    const preview = document.getElementById('recordingPreview');

    if (visualizer) visualizer.style.display = 'none';
    if (recordBtn) {
      recordBtn.classList.remove('recording');
      recordBtn.querySelector('.record-text').textContent = 'Record Message';
    }
    if (playBtn) playBtn.disabled = false;
    if (preview) preview.style.display = 'block';

    // Clear timer
    if (this.paSystem.recordingTimer) {
      clearInterval(this.paSystem.recordingTimer);
      this.paSystem.recordingTimer = null;
    }

    // Reset timer display
    const timerElement = document.getElementById('recordingTimer');
    if (timerElement) {
      timerElement.textContent = `0:${this.paSystem.recordingDuration.toString().padStart(2, '0')}`;
    }

    // Update waveform
    this.generateWaveform();

    this.logPAActivity('Recording completed - 5s message recorded');
  }

  generateWaveform() {
    const canvas = document.getElementById('waveformCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw waveform (simulated)
    ctx.fillStyle = '#2196F3';

    // Generate random waveform bars
    const barCount = 40;
    const barWidth = 6;
    const gap = 2;
    const totalWidth = (barWidth + gap) * barCount;
    const startX = (width - totalWidth) / 2;

    for (let i = 0; i < barCount; i++) {
      const x = startX + i * (barWidth + gap);
      // Simulate audio waveform with varying heights
      const heightPercent = 0.3 + Math.sin(i * 0.3) * 0.3 + Math.random() * 0.2;
      const barHeight = height * heightPercent;
      const y = (height - barHeight) / 2;

      ctx.fillRect(x, y, barWidth, barHeight);
    }
  }

  playRecording() {
    if (!this.paSystem.hasRecording) return;

    // Update UI to show playing state
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
      playBtn.disabled = true;
      playBtn.querySelector('.play-text').textContent = 'Playing...';
    }

    // Simulate playback
    setTimeout(() => {
      if (playBtn) {
        playBtn.disabled = false;
        playBtn.querySelector('.play-text').textContent = 'Play Recording';
      }
      this.logPAActivity('Recording played locally');
    }, 2000);
  }

  deleteRecording() {
    this.paSystem.hasRecording = false;

    const preview = document.getElementById('recordingPreview');
    const playBtn = document.getElementById('playBtn');

    if (preview) preview.style.display = 'none';
    if (playBtn) playBtn.disabled = true;

    this.updateBroadcastButton();
    this.logPAActivity('Recording deleted');
  }

  broadcastRecording() {
    if (!this.paSystem.hasRecording || this.paSystem.selectedRooms.length === 0) return;

    // Show playing state in selected rooms
    this.paSystem.playingRooms = [...this.paSystem.selectedRooms];

    // Update room buttons to show playing state
    this.paSystem.selectedRooms.forEach(roomId => {
      const roomBtn = document.querySelector(`.room-btn[data-room="${roomId}"]`);
      if (roomBtn) {
        roomBtn.classList.add('playing');
        roomBtn.classList.remove('selected');
      }
    });

    // Update status grid
    this.updateStatusGrid();

    // Disable broadcast button during playback
    const broadcastBtn = document.getElementById('broadcastBtn');
    if (broadcastBtn) broadcastBtn.disabled = true;

    // Simulate playback duration
    this.paSystem.broadcastTimer = setTimeout(() => {
      this.stopBroadcast();
    }, 5000);

    // Log activity
    const roomNames = this.paSystem.selectedRooms.map(id => this.rooms[id].name).join(', ');
    this.logPAActivity(`Broadcast started in: ${roomNames}`, 'broadcast');
  }

  stopBroadcast() {
    // Clear playing state
    this.paSystem.playingRooms.forEach(roomId => {
      const roomBtn = document.querySelector(`.room-btn[data-room="${roomId}"]`);
      if (roomBtn) {
        roomBtn.classList.remove('playing');
      }
    });

    this.paSystem.playingRooms = [];
    this.paSystem.selectedRooms = [];

    // Update status grid
    this.updateStatusGrid();

    // Re-enable broadcast button
    this.updateBroadcastButton();

    // Clear timer
    if (this.paSystem.broadcastTimer) {
      clearTimeout(this.paSystem.broadcastTimer);
      this.paSystem.broadcastTimer = null;
    }

    this.logPAActivity('Broadcast completed');
  }

  updateBroadcastButton() {
    const broadcastBtn = document.getElementById('broadcastBtn');
    if (broadcastBtn) {
      const canBroadcast = this.paSystem.hasRecording && this.paSystem.selectedRooms.length > 0;
      broadcastBtn.disabled = !canBroadcast || this.paSystem.playingRooms.length > 0;
    }
  }

  updateStatusGrid() {
    const statusGrid = document.getElementById('paStatusGrid');
    if (!statusGrid) return;

    statusGrid.innerHTML = '';

    Object.entries(this.rooms).forEach(([id, room]) => {
      const isPlaying = this.paSystem.playingRooms.includes(id);
      const statusItem = document.createElement('div');
      statusItem.className = 'status-item';
      statusItem.innerHTML = `
            <div class="status-dot ${isPlaying ? 'playing' : 'idle'}"></div>
            <span>${room.icon} ${room.name}</span>
            <span style="margin-left: auto; font-size: 10px; color: #666;">
                ${isPlaying ? 'PLAYING' : 'IDLE'}
            </span>
        `;
      statusGrid.appendChild(statusItem);
    });
  }

  updatePAUI() {
    this.updateBroadcastButton();
    this.updateStatusGrid();
    this.updatePAHistory();
  }

  updatePAHistory() {
    const historyContainer = document.getElementById('paHistory');
    if (!historyContainer) return;

    historyContainer.innerHTML = '';

    this.paSystem.history.slice(0, 5).forEach(entry => {
      const historyItem = document.createElement('div');
      historyItem.className = `history-item ${entry.type || ''}`;
      historyItem.innerHTML = `
            <div class="history-time">${this.formatTime(entry.timestamp)}</div>
            <div class="history-message">${entry.message}</div>
        `;
      historyContainer.appendChild(historyItem);
    });
  }

  logPAActivity(message, type = 'normal') {
    const entry = {
      timestamp: new Date(),
      message: message,
      type: type
    };

    this.paSystem.history.unshift(entry);

    if (this.paSystem.history.length > 10) {
      this.paSystem.history = this.paSystem.history.slice(0, 10);
    }

    this.updatePAHistory();
  }

  showPASystem() {
    const paSystemEl = document.getElementById('paSystem');
    if (paSystemEl) {
      paSystemEl.style.display = 'block';
      document.getElementById('overlay').classList.add('active');
      this.updatePAUI();
    }
  }

  hidePASystem() {
    const paSystemEl = document.getElementById('paSystem');
    if (paSystemEl) {
      paSystemEl.style.display = 'none';
      document.getElementById('overlay').classList.remove('active');

      // Stop any ongoing recording or playback
      if (this.paSystem.isRecording) {
        this.stopRecording();
      }
      if (this.paSystem.playingRooms.length > 0) {
        this.stopBroadcast();
      }
    }
  }

  // Alarm System Methods
  initializeAlarmSystem() {
    // Set up event listeners
    document.getElementById('closeAlarmBtn')?.addEventListener('click', () => {
      this.hideAlarmSystem();
    });

    // Keypad buttons
    document.querySelectorAll('.keypad-btn[data-key]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (this.alarmSystem.tempDisabled) return;
        this.addToCode(e.target.dataset.key);
      });
    });

    document.getElementById('clearCode')?.addEventListener('click', () => {
      this.clearCode();
    });

    document.getElementById('enterCode')?.addEventListener('click', () => {
      this.submitCode();
    });

    // Alarm control buttons
    document.getElementById('armHomeBtn')?.addEventListener('click', () => {
      this.armAlarm('home');
    });

    document.getElementById('armAwayBtn')?.addEventListener('click', () => {
      this.armAlarm('away');
    });

    document.getElementById('disarmBtn')?.addEventListener('click', () => {
      this.disarmAlarm();
    });

    // Initialize room checkboxes
    this.populateAlarmRooms();

    // Update UI
    this.updateAlarmUI();
  }

  populateAlarmRooms() {
    const roomsContainer = document.getElementById('alarmRooms');
    if (!roomsContainer) return;

    roomsContainer.innerHTML = '';

    Object.entries(this.rooms).forEach(([id, room]) => {
      const checkbox = document.createElement('div');
      checkbox.className = 'room-checkbox';
      checkbox.innerHTML = `
            <input type="checkbox" id="alarm-room-${id}" value="${id}" 
                   ${this.alarmSystem.monitoredRooms.includes(id) ? 'checked' : ''}>
            <label for="alarm-room-${id}">${room.icon} ${room.name}</label>
        `;

      checkbox.querySelector('input').addEventListener('change', (e) => {
        this.toggleRoomMonitoring(id, e.target.checked);
      });

      roomsContainer.appendChild(checkbox);
    });
  }

  toggleRoomMonitoring(roomId, monitored) {
    if (monitored) {
      if (!this.alarmSystem.monitoredRooms.includes(roomId)) {
        this.alarmSystem.monitoredRooms.push(roomId);
      }
    } else {
      this.alarmSystem.monitoredRooms = this.alarmSystem.monitoredRooms.filter(id => id !== roomId);
    }

    this.logActivity(`Room ${this.rooms[roomId].name} ${monitored ? 'added to' : 'removed from'} alarm monitoring`);
  }

  addToCode(digit) {
    if (this.alarmSystem.enteredCode.length < 4) {
      this.alarmSystem.enteredCode += digit;
      this.updateCodeDisplay();
    }
  }

  clearCode() {
    this.alarmSystem.enteredCode = '';
    this.updateCodeDisplay();

    // Remove error state if present
    const input = document.getElementById('alarmCodeInput');
    if (input) {
      input.classList.remove('error');
    }
  }

  updateCodeDisplay() {
    const input = document.getElementById('alarmCodeInput');
    if (input) {
      // Show dots for entered digits
      const display = '*'.repeat(this.alarmSystem.enteredCode.length) +
        '-'.repeat(4 - this.alarmSystem.enteredCode.length);
      input.value = display;
    }
  }

  submitCode() {
    if (this.alarmSystem.enteredCode.length !== 4) {
      this.showCodeError('Please enter 4-digit code');
      return;
    }

    if (this.alarmSystem.enteredCode === this.alarmSystem.code) {
      // Code is correct
      if (this.alarmSystem.armed) {
        this.disarmAlarm();
      } else {
        // If not armed, arm in home mode by default
        this.armAlarm('home');
      }
      this.clearCode();
    } else {
      this.showCodeError('Invalid code');
      this.logActivity('Failed alarm code attempt', 'error');
    }
  }

  showCodeError(message) {
    const input = document.getElementById('alarmCodeInput');
    if (input) {
      input.classList.add('error');
      input.placeholder = message;

      // Temporarily disable input
      this.alarmSystem.tempDisabled = true;
      setTimeout(() => {
        input.classList.remove('error');
        input.placeholder = '----';
        this.clearCode();
        this.alarmSystem.tempDisabled = false;
      }, 2000);
    }
  }

  armAlarm(mode) {
    if (this.alarmSystem.monitoredRooms.length === 0) {
      alert('Please select at least one room to monitor');
      return;
    }

    if (this.alarmSystem.enteredCode !== this.alarmSystem.code) {
      this.showCodeError('Enter code to arm');
      return;
    }

    this.alarmSystem.armed = true;
    this.alarmSystem.mode = mode;

    this.updateAlarmUI();
    this.clearCode();

    const modeText = mode === 'home' ? 'Home' : 'Away';
    this.logActivity(`Alarm armed in ${modeText} mode`, 'armed');

    // Update security system state
    this.securityArmed = true;
    this.updateSecurityUI();
  }

  disarmAlarm() {
    if (this.alarmSystem.enteredCode !== this.alarmSystem.code) {
      this.showCodeError('Enter code to disarm');
      return;
    }

    this.alarmSystem.armed = false;
    this.alarmSystem.mode = 'disarmed';

    this.updateAlarmUI();
    this.clearCode();

    this.logActivity('Alarm disarmed');

    // Update security system state
    this.securityArmed = false;
    this.updateSecurityUI();
  }

  updateAlarmUI() {
    const statusIndicator = document.getElementById('alarmStatusIndicator');
    const statusText = document.getElementById('alarmStatusText');
    const statusDot = statusIndicator?.querySelector('.status-dot');
    const alarmMode = document.getElementById('alarmMode');

    if (this.alarmSystem.armed) {
      if (statusText) statusText.textContent = `System Armed (${this.alarmSystem.mode.toUpperCase()})`;
      if (statusDot) {
        statusDot.classList.add('armed');
        statusDot.classList.remove('off');
      }
      if (alarmMode) alarmMode.innerHTML = `<span>Mode: ${this.alarmSystem.mode.charAt(0).toUpperCase() + this.alarmSystem.mode.slice(1)}</span>`;

      // Update control buttons
      document.getElementById('armHomeBtn').disabled = true;
      document.getElementById('armAwayBtn').disabled = true;
      document.getElementById('disarmBtn').disabled = false;
    } else {
      if (statusText) statusText.textContent = 'System Disarmed';
      if (statusDot) {
        statusDot.classList.remove('armed');
        statusDot.classList.add('off');
      }
      if (alarmMode) alarmMode.innerHTML = '<span>Mode: Disarmed</span>';

      // Update control buttons
      document.getElementById('armHomeBtn').disabled = false;
      document.getElementById('armAwayBtn').disabled = false;
      document.getElementById('disarmBtn').disabled = true;
    }

    // Update alarm history
    this.updateAlarmHistory();
  }

  updateAlarmHistory() {
    const historyContainer = document.getElementById('alarmHistory');
    if (!historyContainer) return;

    historyContainer.innerHTML = '';

    this.alarmSystem.history.slice(0, 5).forEach(entry => {
      const historyItem = document.createElement('div');
      historyItem.className = `history-item ${entry.type || ''}`;
      historyItem.innerHTML = `
            <div class="history-time">${this.formatTime(entry.timestamp)}</div>
            <div class="history-message">${entry.message}</div>
        `;
      historyContainer.appendChild(historyItem);
    });
  }

  logActivity(message, type = 'normal') {
    const entry = {
      timestamp: new Date(),
      message: message,
      type: type
    };

    this.alarmSystem.history.unshift(entry);

    if (this.alarmSystem.history.length > 10) {
      this.alarmSystem.history = this.alarmSystem.history.slice(0, 10);
    }

    this.updateAlarmHistory();
  }

  showAlarmSystem() {
    const alarmSystemEl = document.getElementById('alarmSystem');
    if (alarmSystemEl) {
      alarmSystemEl.style.display = 'block';
      document.getElementById('overlay').classList.add('active');
      this.updateAlarmUI();
    }
  }

  hideAlarmSystem() {
    const alarmSystemEl = document.getElementById('alarmSystem');
    if (alarmSystemEl) {
      alarmSystemEl.style.display = 'none';
      document.getElementById('overlay').classList.remove('active');
      this.clearCode();
    }
  }

  updateSecurityUI() {
    // Update any security-related UI elements
    const securityToggle = document.querySelector('.toggle-switch[onclick="dashboard.toggleSecurityArmed()"]');
    if (securityToggle) {
      if (this.securityArmed) {
        securityToggle.classList.add('active');
      } else {
        securityToggle.classList.remove('active');
      }
    }
  }

  setupPanAndZoom() {
    // Mouse events
    this.floorPlanContainer.addEventListener("mousedown", (e) => this.startPan(e))
    this.floorPlanContainer.addEventListener("mousemove", (e) => this.pan(e))
    this.floorPlanContainer.addEventListener("mouseup", () => this.endPan())
    this.floorPlanContainer.addEventListener("mouseleave", () => this.endPan())
    this.floorPlanContainer.addEventListener("wheel", (e) => this.handleWheel(e))

    // Touch events
    this.floorPlanContainer.addEventListener("touchstart", (e) => this.handleTouchStart(e))
    this.floorPlanContainer.addEventListener("touchmove", (e) => this.handleTouchMove(e))
    this.floorPlanContainer.addEventListener("touchend", () => this.endPan())
  }

  startPan(e) {
    if (e.target.closest(".room-button")) return

    this.isPanning = true
    this.startX = e.clientX || e.touches[0].clientX
    this.startY = e.clientY || e.touches[0].clientY
    e.preventDefault()
  }

  pan(e) {
    if (!this.isPanning) return

    const clientX = e.clientX || e.touches[0].clientX
    const clientY = e.clientY || e.touches[0].clientY

    const deltaX = clientX - this.startX
    const deltaY = clientY - this.startY

    this.panX += deltaX
    this.panY += deltaY

    this.startX = clientX
    this.startY = clientY

    this.applyTransform()
    e.preventDefault()
  }

  endPan() {
    this.isPanning = false
  }

  handleTouchStart(e) {
    const target = e.target

    // Allow taps on UI elements
    if (
      target.closest(".room-button") ||
      target.closest(".zoom-btn") ||
      target.closest(".quick-btn") ||
      target.closest(".close-btn") ||
      target.closest(".dropdown-btn") ||
      target.closest(".toggle-switch") ||
      target.closest(".temp-btn")
    ) {
      return // Don't start pan
    }

    if (e.touches.length === 1) {
      this.startPan(e)
      e.preventDefault()
    }
  }

  handleTouchMove(e) {
    if (this.isPanning && e.touches.length === 1) {
      this.pan(e)
      e.preventDefault()
    }
  }

  handleWheel(e) {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -this.zoomStep : this.zoomStep
    const newZoom = this.currentZoom + delta

    if (newZoom >= this.minZoom && newZoom <= this.maxZoom) {
      this.currentZoom = newZoom
      this.applyTransform()
      this.updateZoomInfo()
      this.updateZoomClass()
    }
  }

  zoomIn() {
    if (this.currentZoom < this.maxZoom) {
      this.currentZoom = Math.min(this.currentZoom + this.zoomStep, this.maxZoom)
      this.applyTransform()
      this.updateZoomInfo()
      this.updateZoomClass()
    }
  }

  zoomOut() {
    if (this.currentZoom > this.minZoom) {
      this.currentZoom = Math.max(this.currentZoom - this.zoomStep, this.minZoom)
      this.applyTransform()
      this.updateZoomInfo()
      this.updateZoomClass()
    }
  }

  resetZoom() {
    this.currentZoom = 1
    this.panX = 0
    this.panY = 0
    this.applyTransform()
    this.updateZoomInfo()
    this.updateZoomClass()
  }

  applyTransform() {
    this.floorPlanWrapper.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.currentZoom})`

    // 👇 pass zoom value into CSS
    this.floorPlanWrapper.style.setProperty("--zoom", this.currentZoom)
  }

  updateZoomInfo() {
    this.zoomInfo.textContent = `${Math.round(this.currentZoom * 100)}%`
  }

  updateZoomClass() {
    // Remove all zoom classes
    this.floorPlanContainer.className = this.floorPlanContainer.className.replace(/zoom-[\d-]+/g, "")

    // Add appropriate zoom class for responsive text sizing
    if (this.currentZoom <= 0.75) {
      this.floorPlanContainer.classList.add("zoom-0-5")
    } else if (this.currentZoom <= 1.25) {
      this.floorPlanContainer.classList.add("zoom-1")
    } else if (this.currentZoom <= 1.75) {
      this.floorPlanContainer.classList.add("zoom-1-5")
    } else if (this.currentZoom <= 2.5) {
      this.floorPlanContainer.classList.add("zoom-2")
    } else if (this.currentZoom <= 3.5) {
      this.floorPlanContainer.classList.add("zoom-3")
    } else if (this.currentZoom <= 4.5) {
      this.floorPlanContainer.classList.add("zoom-4")
    } else {
      this.floorPlanContainer.classList.add("zoom-5")
    }
  }

  toggleSystem() {
    this.systemToggle.classList.toggle("active")
    const isActive = this.systemToggle.classList.contains("active")

    if (isActive) {
      this.logActivity("System activated - All devices online")
    } else {
      this.logActivity("System deactivated - Entering standby mode")
    }
  }

  switchTab(view) {
    // Highlight active tab
    this.navTabs.forEach((tab) => tab.classList.remove("active"))
    document.querySelector(`[data-view="${view}"]`).classList.add("active")

    // Load content only into LEFT panel
    const leftPanel = document.getElementById("leftPanel")
    const title = document.getElementById("leftPanelTitle")
    const content = document.getElementById("leftPanelContent")
    const overlay = document.getElementById("overlay")

    title.textContent = this.getViewTitle(view)
    content.innerHTML = this.getViewContent(view)

    leftPanel.classList.add("active")
    overlay.classList.add("active")

    // Do NOT open right panel anymore
    this.sidePanel.classList.remove("active")

    this.logActivity(`Switched to ${view} view`)
  }

  getViewTitle(view) {
    const titles = {
      overview: "System Overview",
      rooms: "Room Controls",
      energy: "Energy Management",
      curtains: "Curtains",
      air: "Air Conditioner",
      lights: "Lights",
      quick: "Quick Actions",
      camera: "Camera",
      scenes: "Scenes",
      music: "Music",
      alarm: "Alarm",
    }
    return titles[view] || "Dashboard"
  }

  getViewContent(view) {
    switch (view) {
      case "overview":
        return this.generateOverviewContent()
      case "rooms":
        return this.generateRoomsContent()
      case "energy":
        return this.generateEnergyContent()
      default:
        return "<p>Loading...</p>"
    }
  }

  generateOverviewContent() {
    return `
    <div class="control-section">
        <div class="section-title">🏠 System Status</div>
        <div class="control-item">
            <div class="control-label">System Power</div>
            <div class="toggle-switch ${this.systemPower ? "active" : ""}" 
                 onclick="dashboard.toggleSystemPower()">
                <div class="toggle-slider"></div>
            </div>
        </div>
        <div class="control-item">
            <div class="control-label">Security Armed</div>
            <div class="toggle-switch ${this.securityArmed ? "active" : ""}" 
                 onclick="dashboard.toggleSecurityArmed()">
                <div class="toggle-slider"></div>
            </div>
        </div>
        <div class="control-item">
            <div class="control-label">Away Mode</div>
            <div class="toggle-switch ${this.awayMode ? "active" : ""}" 
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
        ${Object.entries(this.rooms)
        .map(([id, room]) => {
          const lightCount = Object.values(room.devices).filter((d) => d.type === "light" && d.status).length
          const totalLights = Object.values(room.devices).filter((d) => d.type === "light").length
          return `
                <div class="control-item">
                    <div class="control-label">${room.icon} ${room.name}</div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 11px; color: #666;">Lights: ${lightCount}/${totalLights}</span>
                        <button class="quick-btn" onclick="dashboard.openRoomFromOverview('${id}')">Control</button>
                    </div>
                </div>
            `
        })
        .join("")}
    </div>
    `
  }

  generateRoomsContent() {
    return `
    <div class="control-section">
        <div class="section-title">🏠 All Rooms</div>
        ${Object.entries(this.rooms)
        .map(([id, room]) => {
          const lightCount = Object.values(room.devices).filter((d) => d.type === "light" && d.status).length;
          const totalLights = Object.values(room.devices).filter((d) => d.type === "light").length;
          return `
                <div class="control-item">
                    <div class="control-label">${room.icon} ${room.name}</div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 11px; color: #666;">Lights: ${lightCount}/${totalLights}</span>
                        <button class="quick-btn" onclick="dashboard.openRoomFromOverview('${id}')">Control</button>
                    </div>
                </div>
            `;
        })
        .join("")}
    </div>
    
    <div class="quick-actions">
        <button class="quick-btn" onclick="dashboard.quickAction('allLightsOn')">All Lights On</button>
        <button class="quick-btn" onclick="dashboard.quickAction('allLightsOff')">All Lights Off</button>
        <button class="quick-btn" onclick="dashboard.quickAction('nightMode')">Night Mode</button>
        <button class="quick-btn" onclick="dashboard.quickAction('awayMode')">Away Mode</button>
    </div>
  `;
  }
  changeLightColor(roomId, deviceKey, color) {
    const device = this.rooms[roomId].devices[deviceKey];
    device.color = color;
    this.logActivity(`${device.name} color changed to ${color}`);
  }

  changeFanDirection(roomId, deviceKey, direction) {
    const device = this.rooms[roomId].devices[deviceKey];
    device.direction = direction;
    this.logActivity(`${device.name} direction changed to ${direction}`);
  }
  generateEnergyContent() {
    return `
        <div class="control-section">
            <div class="section-title">⚡ Energy Management</div>
            <div class="control-item">
                <div class="control-label">Eco Mode</div>
                <div class="toggle-switch ${this.ecoMode ? "active" : ""}" 
                     onclick="dashboard.toggleEcoMode()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="control-item">
                <div class="control-label">Solar Priority</div>
                <div class="toggle-switch ${this.solarPriority ? "active" : ""}" 
                     onclick="dashboard.toggleSolarPriority()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="control-item">
                <div class="control-label">Peak Hours Mode</div>
                <div class="toggle-switch ${this.peakHoursMode ? "active" : ""}" 
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
    `
  }

  toggleDropdown(type) {
    const dropdown = type === "settings" ? this.settingsDropdown.parentElement : this.actionsDropdown.parentElement

    this.closeAllDropdowns()
    dropdown.classList.toggle("active")
  }

  closeAllDropdowns() {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active")
    })
  }

  showRoomControls(roomId) {
    const room = this.rooms[roomId]
    if (!room) return

    this.activeRoom = roomId
    this.panelTitle.textContent = `${room.icon} ${room.name}`
    this.panelContent.innerHTML = this.generateRoomControls(roomId, room)
    this.sidePanel.classList.add("active")
    this.overlay.classList.add("active")

    this.logActivity(`Opened ${room.name} controls`)
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

    // Lighting controls
    const lights = Object.entries(room.devices).filter(([key, device]) => device.type === "light");
    if (lights.length > 0) {
      content += `
      <div class="control-section">
          <div class="section-title">💡 Lighting</div>
    `;

      lights.forEach(([deviceKey, device]) => {
        // Initialize device properties if they don't exist
        device.level = device.level || (device.status ? 5 : 0);
        device.color = device.color || "#ffffff";
        device.mode = device.mode || "normal";

        content += `
          <div class="control-item">
              <div class="control-label">${device.name}</div>
              <div class="toggle-switch ${device.status ? "active" : ""}" 
                   onclick="dashboard.toggleDevice('${roomId}', '${deviceKey}')">
                  <div class="toggle-slider"></div>
              </div>
          </div>
      `;

        if (device.status) {
          content += `
              <div class="control-item">
                  <div class="control-label">Brightness</div>
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
                      <option value="normal" ${device.mode === "normal" ? "selected" : ""}>Normal</option>
                      <option value="warm" ${device.mode === "warm" ? "selected" : ""}>Warm</option>
                      <option value="cool" ${device.mode === "cool" ? "selected" : ""}>Cool</option>
                      <option value="reading" ${device.mode === "reading" ? "selected" : ""}>Reading</option>
                      <option value="party" ${device.mode === "party" ? "selected" : ""}>Party</option>
                  </select>
              </div>
        `;
        }
      });

      content += `</div>`;
    }

    // Fan controls
    const fans = Object.entries(room.devices).filter(([key, device]) => device.type === "fan");
    if (fans.length > 0) {
      content += `
      <div class="control-section">
          <div class="section-title">🌀 Fan Controls</div>
    `;

      fans.forEach(([deviceKey, device]) => {
        device.level = device.level || (device.status ? 5 : 0);
        device.direction = device.direction || "forward";

        content += `
          <div class="control-item">
              <div class="control-label">${device.name}</div>
              <div class="toggle-switch ${device.status ? "active" : ""}" 
                   onclick="dashboard.toggleDevice('${roomId}', '${deviceKey}')">
                  <div class="toggle-slider"></div>
              </div>
          </div>
      `;

        if (device.status) {
          content += `
              <div class="control-item">
                  <div class="control-label">Speed</div>
                  <input type="range" min="1" max="5" value="${device.level}" 
                         class="level-slider" 
                         oninput="dashboard.adjustLevel('${roomId}', '${deviceKey}', this.value)">
                  <span style="font-size: 11px; min-width: 30px; text-align: right;">${device.level}/5</span>
              </div>
              
              <div class="control-item">
                  <div class="control-label">Direction</div>
                  <select onchange="dashboard.changeFanDirection('${roomId}', '${deviceKey}', this.value)" 
                          style="padding: 4px 8px; border-radius: 6px; border: 1px solid #ddd; font-size: 11px;">
                      <option value="forward" ${device.direction === "forward" ? "selected" : ""}>Forward</option>
                      <option value="reverse" ${device.direction === "reverse" ? "selected" : ""}>Reverse</option>
                  </select>
              </div>
        `;
        }
      });

      content += `</div>`;
    }

    // Quick actions for the room
    content += `
    <div class="control-section">
        <div class="section-title">⚡ Quick Actions</div>
        <div class="quick-actions">
            <button class="quick-btn" onclick="dashboard.roomAction('${roomId}', 'allOn')">All On</button>
            <button class="quick-btn" onclick="dashboard.roomAction('${roomId}', 'allOff')">All Off</button>
            <button class="quick-btn" onclick="dashboard.roomAction('${roomId}', 'nightMode')">Night Mode</button>
        </div>
    </div>
  `;

    return content;
  }

  // New method to adjust level (1-10)
  adjustLevel(roomId, deviceKey, value) {
    const device = this.rooms[roomId].devices[deviceKey]
    device.level = Number.parseInt(value)

    // Update the display
    const span = event.target.nextElementSibling
    if (span) span.textContent = `${device.level}/100`

    // Automatically turn on device if level > 0
    if (Number.parseInt(value) > 0) {
      device.status = true

      // Update the toggle switch visually
      const toggleSwitch = event.target.closest(".control-section").querySelector(".toggle-switch")
      if (toggleSwitch) {
        toggleSwitch.classList.add("active")
      }
    }

    this.updateRoomState(roomId)
    this.logActivity(`${device.name} level set to ${device.level}/100`)
  }

  // Modified method to change light mode
  changeLightMode(roomId, deviceKey, mode) {
    const device = this.rooms[roomId].devices[deviceKey]
    device.mode = mode

    // Apply preset based on mode
    const preset = this.lightModePresets[mode]
    if (preset) {
      device.level = preset.level
      device.color = preset.color

      // Update UI if panel is open
      if (this.activeRoom === roomId) {
        // Update level slider
        const levelSlider = document.querySelector(`input[oninput*="${deviceKey}"]`)
        if (levelSlider) {
          levelSlider.value = device.level
          const span = levelSlider.nextElementSibling
          if (span) span.textContent = `${device.level}/100`
        }

        // Update color picker
        const colorPicker = document.querySelector(`input[onchange*="${deviceKey}"][type="color"]`)
        if (colorPicker) {
          colorPicker.value = device.color
        }
      }
    }

    this.logActivity(`${device.name} mode changed to ${mode}`)
  }

  initializeRoomData() {
    this.rooms = {
      "master-bedroom": {
        name: "Master Bedroom",
        icon: "🛏️",
        temperature: 22,
        devices: {
          mainLight: { name: "Main Light", type: "light", status: false, brightness: 75 },
          bedLight: { name: "Bed Light", type: "light", status: false, brightness: 50 },
          ac: { name: "Air Conditioning", type: "hvac", status: true },
          fan: { name: "Ceiling Fan", type: "fan", status: false },
        },
      },
      "living-room": {
        name: "Living Room",
        icon: "🛋️",
        temperature: 24,
        devices: {
          mainLight: { name: "Main Lights", type: "light", status: true, brightness: 80 },
          accentLight: { name: "Accent Lights", type: "light", status: true, brightness: 60 },
          tv: { name: "Smart TV", type: "entertainment", status: false },
          ac: { name: "Air Conditioning", type: "hvac", status: true },
        },
      },

      kitchen: {
        name: "Kitchen",
        icon: "🍳",
        temperature: 26,
        devices: {
          mainLight: { name: "Ceiling Lights", type: "light", status: true, brightness: 90 },
          underCabinet: { name: "Under Cabinet LEDs", type: "light", status: true, brightness: 85 },
          exhaustFan: { name: "Exhaust Fan", type: "fan", status: false },
          oven: { name: "Smart Oven", type: "appliance", status: false },
        },
      },
      bathroom: {
        name: "Bathroom",
        icon: "🚿",
        temperature: 23,
        devices: {
          mainLight: { name: "Main Light", type: "light", status: false, brightness: 85 },
          mirrorLight: { name: "Mirror Lights", type: "light", status: false, brightness: 90 },
          exhaustFan: { name: "Exhaust Fan", type: "fan", status: false },
          heatedFloor: { name: "Heated Floor", type: "heating", status: false },
        },
      },
      garage: {
        name: "Garage",
        icon: "🚗",
        temperature: 18,
        devices: {
          mainLight: { name: "Main Lights", type: "light", status: false, brightness: 100 },
          securityLight: { name: "Security Light", type: "light", status: false, brightness: 90 },
          garageDoor: { name: "Garage Door", type: "door", status: false },
        },
      },
      balcony: {
        name: "Balcony",
        icon: "🌅",
        temperature: 25,
        devices: {
          stringLights: { name: "String Lights", type: "light", status: false, brightness: 50 },
          fan: { name: "Outdoor Fan", type: "fan", status: false },
        },
      },
      dining: {
        name: "Dining Room",
        icon: "🍽️",
        temperature: 23,
        devices: {
          chandelier: { name: "Chandelier", type: "light", status: true, brightness: 75 },
          accentLights: { name: "Accent Lights", type: "light", status: true, brightness: 50 },
          ac: { name: "Air Conditioning", type: "hvac", status: true },
        },
      },
      laundry: {
        name: "Laundry Room",
        icon: "👕",
        temperature: 24,
        devices: {
          mainLight: { name: "Main Light", type: "light", status: false, brightness: 90 },
          washer: { name: "Washing Machine", type: "appliance", status: false },
          dryer: { name: "Dryer", type: "appliance", status: false },
        },
      },
      study: {
        name: "Study",
        icon: "📚",
        temperature: 21,
        devices: {
          deskLamp: { name: "Desk Lamp", type: "light", status: true, brightness: 85 },
          shelfLights: { name: "Shelf Lights", type: "light", status: true, brightness: 60 },
          ac: { name: "Air Conditioning", type: "hvac", status: true },
        },
      },
    }
  }

  toggleDevice(roomId, deviceKey) {
    const device = this.rooms[roomId].devices[deviceKey]
    const wasOn = device.status
    device.status = !device.status

    if (device.status && !wasOn) {
      if (device.type === "light") {
        const preset = this.lightModePresets[device.mode || "normal"]
        device.level = device.level || preset.level || 90 // Default to 90% when turning on
        device.brightness = device.brightness || preset.level || 90
        device.color = device.color || preset.color || "#ffffff"
        device.mode = device.mode || "normal"
      }
      if (device.type === "fan") {
        device.level = device.level || 5
        device.direction = device.direction || "forward"
      }
    }

    if (!device.status && wasOn) {
      if (device.type === "light") {
        device.level = 0
        device.brightness = 0
      }
    }

    const toggleSwitch = event.target.closest(".toggle-switch")
    if (device.status) {
      toggleSwitch.classList.add("active")
    } else {
      toggleSwitch.classList.remove("active")
    }

    this.updateRoomState(roomId)
    this.logActivity(`${device.name} in ${this.rooms[roomId].name} turned ${device.status ? "ON" : "OFF"}`)

    // Refresh the controls panel
    setTimeout(() => {
      if (this.activeRoom === roomId) {
        this.panelContent.innerHTML = this.generateRoomControls(roomId, this.rooms[roomId])
      }
    }, 100)
  }

  adjustTemperature(roomId, change) {
    const room = this.rooms[roomId]
    room.temperature = Math.max(5, Math.min(50, room.temperature + change))

    const tempDisplay = document.getElementById(`${roomId}-temp`)
    if (tempDisplay) {
      tempDisplay.textContent = `${room.temperature}°C`
    }

    const roomButton = document.querySelector(`[data-room="${roomId}"] .room-status span`)
    if (roomButton) {
      roomButton.textContent = `${room.temperature}°C`
    }

    this.logActivity(`Temperature in ${room.name} set to ${room.temperature}°C`)
  }

  adjustBrightness(roomId, deviceKey, value) {
    const device = this.rooms[roomId].devices[deviceKey]
    device.brightness = Number.parseInt(value)
    this.logActivity(`${device.name} brightness set to ${value}%`)
  }

  adjustRange(roomId, deviceKey, value) {
    const device = this.rooms[roomId].devices[deviceKey]
    device.level = value
    const span = document.getElementById(`${roomId}-${deviceKey}-range`)
    if (span) span.textContent = value
    if (Number.parseInt(value) > 0) {
      device.status = true
    } else {
      device.status = false
    }
    if (this.activeRoom === roomId) {
      const toggleSwitch = document.querySelector(`.toggle-switch[onclick*="${deviceKey}"]`)
      if (toggleSwitch) {
        if (Number.parseInt(value) > 0) {
          toggleSwitch.classList.add("active")
        } else {
          toggleSwitch.classList.remove("active")
        }
      }
    }

    // Update room state (light indicators, etc.)
    this.updateRoomState(roomId)

    this.logActivity(`${device.name} level set to ${value}%`)
  }
  // Add this method for room actions
  roomAction(roomId, action) {
    const room = this.rooms[roomId];
    if (!room) return;

    switch (action) {
      case "allOn":
        Object.values(room.devices).forEach((device) => {
          device.status = true;
          if (device.type === "light") {
            device.level = device.level || 90;
            device.brightness = device.brightness || 90;
          }
        });
        break;
      case "allOff":
        Object.values(room.devices).forEach((device) => {
          device.status = false;
          if (device.type === "light") {
            device.level = 0;
            device.brightness = 0;
          }
        });
        break;
      case "nightMode":
        Object.entries(room.devices).forEach(([key, device]) => {
          if (device.type === "light") {
            device.status = true;
            device.level = 20;
            device.brightness = 20;
            device.mode = "warm";
          } else {
            device.status = false;
          }
        });
        break;
    }

    this.updateRoomState(roomId);
    this.logActivity(`${action} executed in ${room.name}`);

    // Refresh UI if this room's controls are currently open
    if (this.activeRoom === roomId) {
      this.panelContent.innerHTML = this.generateRoomControls(roomId, room);
    }
  }

  // Make sure this method exists for updating room visual state
  updateRoomState(roomId) {
    const room = this.rooms[roomId];
    const hasActiveDevices = Object.values(room.devices).some((device) => device.status);
    const hasActiveLights = Object.values(room.devices).some((device) => device.type === "light" && device.status);

    const statusDot = document.getElementById(`${roomId}-status`);
    const lightIndicator = document.getElementById(`${roomId}-light`);

    if (statusDot) {
      statusDot.classList.toggle("off", !hasActiveDevices);
    }

    if (lightIndicator) {
      lightIndicator.style.display = hasActiveLights ? "flex" : "none";
    }
  }

  // Update all room states
  updateAllRoomStates() {
    Object.keys(this.rooms).forEach((roomId) => {
      this.updateRoomState(roomId);
    });
  }
  quickAction(action) {
    console.log('Quick action triggered:', action); // Debug log

    switch (action) {
      case "allLightsOn":
        Object.keys(this.rooms).forEach((roomId) => {
          Object.entries(this.rooms[roomId].devices).forEach(([key, device]) => {
            if (device.type === "light") {
              device.status = true;
              device.level = 90;
              device.brightness = 90;
            }
          });
          this.updateRoomState(roomId);
        });
        this.showNotification("All lights turned ON");
        break;

      case "allLightsOff":
        Object.keys(this.rooms).forEach((roomId) => {
          Object.entries(this.rooms[roomId].devices).forEach(([key, device]) => {
            if (device.type === "light") {
              device.status = false;
              device.level = 0;
              device.brightness = 0;
            }
          });
          this.updateRoomState(roomId);
        });
        this.showNotification("All lights turned OFF");
        break;

      case "nightMode":
        Object.keys(this.rooms).forEach((roomId) => {
          this.roomAction(roomId, "nightMode");
        });
        this.showNotification("Night mode activated");
        break;

      case "awayMode":
        Object.keys(this.rooms).forEach((roomId) => {
          this.roomAction(roomId, "allOff");
        });
        this.showNotification("Away mode activated");
        break;
    }

    this.logActivity(`Quick action: ${action}`);
    this.closeAllDropdowns();

    // Refresh any open panels
    if (this.activeRoom) {
      this.panelContent.innerHTML = this.generateRoomControls(this.activeRoom, this.rooms[this.activeRoom]);
    }
  }

  updateRoomState(roomId) {
    const room = this.rooms[roomId]
    const hasActiveDevices = Object.values(room.devices).some((device) => device.status)
    const hasActiveLights = Object.values(room.devices).some((device) => device.type === "light" && device.status)

    const statusDot = document.getElementById(`${roomId}-status`)
    const lightIndicator = document.getElementById(`${roomId}-light`)

    if (statusDot) {
      statusDot.classList.toggle("off", !hasActiveDevices)
    }

    if (lightIndicator) {
      lightIndicator.style.display = hasActiveLights ? "flex" : "none"
    }
  }

  updateAllRoomStates() {
    Object.keys(this.rooms).forEach((roomId) => {
      this.updateRoomState(roomId)
    })
  }

  showSettings() {
    this.panelTitle.textContent = "⚙️ Settings"
    this.panelContent.innerHTML = `
        <div class="control-section">
            <div class="section-title">⚙️ System Settings</div>
            <div class="control-item">
                <div class="control-label">Auto Updates</div>
                <div class="toggle-switch ${this.autoUpdates ? "active" : ""}" 
                     onclick="dashboard.toggleAutoUpdates()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="control-item">
                <div class="control-label">Energy Savings</div>
                <div class="toggle-switch ${this.energySavings ? "active" : ""}" 
                     onclick="dashboard.toggleEnergySavings()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="control-item">
                <div class="control-label">Night Mode Auto</div>
                <div class="toggle-switch ${this.nightModeAuto ? "active" : ""}" 
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
    `
    this.sidePanel.classList.add("active")
    this.overlay.classList.add("active")
    this.closeAllDropdowns()
  }

  showHistory() {
    this.panelTitle.textContent = "📋 Activity History"
    const historyContent = this.history
      .slice(0, 100)
      .map(
        (entry) => `
      <div style="background: #f8f9fa; padding: 12px; margin: 8px 0; border-radius: 8px; border-left: 3px solid #4CAF50;">
        <div style="font-size: 10px; color: #666; margin-bottom: 4px;">
          ${this.formatTime(entry.timestamp)}
        </div>
        <div style="font-size: 12px; color: #333;">
          ${entry.message}
        </div>
      </div>
    `,
      )
      .join("")

    this.panelContent.innerHTML = `
      <div class="control-section">
        <div class="section-title">📋 Recent Activity</div>
        <div style="max-height: 400px; overflow-y: auto;">
          ${historyContent || '<p style="color: #666; font-size: 12px;">No activity yet</p>'}
        </div>
      </div>
    `
    this.sidePanel.classList.add("active")
    this.overlay.classList.add("active")
    this.closeAllDropdowns()
  }

  showDevices() {
    this.panelTitle.textContent = "🔧 Device Management"
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
    `
    this.sidePanel.classList.add("active")
    this.overlay.classList.add("active")
    this.closeAllDropdowns()
  }

  showSecurity() {
    this.panelTitle.textContent = "🔒 Security"
    this.panelContent.innerHTML = `
        <div class="control-section">
            <div class="section-title">🔒 Security System</div>
            <div class="control-item">
                <div class="control-label">Security Armed</div>
                <div class="toggle-switch ${this.securitySystem ? "active" : ""}" 
                     onclick="dashboard.toggleSecuritySystem()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="control-item">
                <div class="control-label">Motion Detection</div>
                <div class="toggle-switch ${this.motionDetection ? "active" : ""}" 
                     onclick="dashboard.toggleMotionDetection()">
                    <div class="toggle-slider"></div>
                </div>
            </div>
            <div class="control-item">
                <div class="control-label">Door Monitoring</div>
                <div class="toggle-switch ${this.doorMonitoring ? "active" : ""}" 
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
    `
    this.sidePanel.classList.add("active")
    this.overlay.classList.add("active")
    this.closeAllDropdowns()
  }

  hidePanel() {
    this.sidePanel.classList.remove("active")
    this.overlay.classList.remove("active")
    this.activeRoom = null
  }

  logActivity(message) {
    const entry = {
      timestamp: new Date(),
      message: message,
    }

    this.history.unshift(entry)

    if (this.history.length > 50) {
      this.history = this.history.slice(0, 50)
    }
  }

  formatTime(timestamp) {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins} min ago`

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  openMenu() {
    if (this.menuDrawer) {
      this.menuDrawer.classList.add("active")
      this.overlay.classList.add("active")
    }
  }

  closeMenu() {
    if (this.menuDrawer) this.menuDrawer.classList.remove("active")
    // don't remove overlay here if panel is open
  }
  // Update the handleMenuSelect method to include lighting system
  // Update handleMenuSelect method
  handleMenuSelect(key) {
    const map = {
      overview: () => this.switchTab("overview"),
      rooms: () => this.switchTab("rooms"),
      energy: () => this.switchTab("energy"),
      curtains: () => this.showCurtainSystem(),
      air: () => this.showACSystem(),
      lights: () => this.showLightingSystem(),
      quick: () => this.showQuickActionsSystem(),
      camera: () => this.showMonitoringSystem(),
      scenes: () => this.showScenesSystem(),
      music: () => this.showMusicPlayer(),
      alarm: () => this.showAlarmSystem(),
      pa: () => this.showPASystem(),
      lock: () => this.showLockSystem(),
    };
    this.closeMenu();
    (map[key] || map.overview)();
  }


  openLeftPanel(title, html) {
    const leftPanel = document.getElementById("leftPanel")
    const titleEl = document.getElementById("leftPanelTitle")
    const contentEl = document.getElementById("leftPanelContent")
    const overlay = document.getElementById("overlay")
    titleEl.textContent = title
    contentEl.innerHTML = html
    leftPanel.classList.add("active")
    overlay.classList.add("active")
    // ensure right panel is closed
    this.sidePanel.classList.remove("active")
  }

  generateCurtainsContent() {
    // synthesize simple curtain levels per room if not present
    this.curtains = this.curtains || {}
    Object.keys(this.rooms).forEach((id) => {
      if (!this.curtains[id]) this.curtains[id] = { level: 50, open: true }
    })
    return `
        <div class="control-section">
          <div class="section-title">🪟 Curtains</div>
          ${Object.keys(this.rooms)
        .map((id) => {
          const room = this.rooms[id]
          const cur = this.curtains[id]
          return `
          <div class="control-item">
            <div class="control-label">${room.icon} ${room.name}</div>
            <div class="toggle-switch ${cur.open ? "active" : ""}" onclick="dashboard.toggleCurtain('${id}')">
              <div class="toggle-slider"></div>
            </div>
          </div>
          <div class="control-item">
            <div class="control-label"></div>
            <input type="range" min="0" max="100" value="${cur.level}" class="level-slider"
                   oninput="dashboard.adjustCurtainLevel('${id}', this.value)">
            <span style="font-size:11px;min-width:30px;text-align:right;">${cur.level}/100</span>
          </div>
        `
        })
        .join("")}
    </div>
  `
  }

  toggleCurtain(roomId) {
    this.curtains = this.curtains || {}
    const cur = this.curtains[roomId] || { level: 50, open: true }
    cur.open = !cur.open
    this.curtains[roomId] = cur
    const t = event.target.closest(".toggle-switch")
    if (cur.open) t.classList.add("active")
    else t.classList.remove("active")
    this.logActivity(`Curtains in ${this.rooms[roomId].name} ${cur.open ? "opened" : "closed"}`)
  }

  adjustCurtainLevel(roomId, value) {
    this.curtains = this.curtains || {}
    const cur = this.curtains[roomId] || { level: 50, open: true }
    cur.level = Number.parseInt(value)
    this.curtains[roomId] = cur
    const span = event.target.nextElementSibling
    if (span) span.textContent = `${cur.level}/100`
    this.logActivity(`Curtains in ${this.rooms[roomId].name} set to ${cur.level}%`)
  }

  generateAirContent() {
    // show known HVAC devices
    const items = Object.entries(this.rooms).flatMap(([id, room]) =>
      Object.entries(room.devices)
        .filter(([k, d]) => d.type === "hvac")
        .map(([k, d]) => ({ id, room, key: k, d })),
    )
    return `
    <div class="control-section">
      <div class="section-title">❄️ Air Conditioner</div>
      ${items
        .map(
          ({ id, room, key, d }) => `
        <div class="control-item">
          <div class="control-label">${room.icon} ${room.name}</div>
          <div class="toggle-switch ${d.status ? "active" : ""}" onclick="dashboard.toggleDevice('${id}','${key}')">
            <div class="toggle-slider"></div>
          </div>
        </div>
        <div class="control-item">
          <div class="control-label"></div>
          <div class="temp-control" style="margin:0;padding:0;background:transparent;">
            <button class="temp-btn" onclick="dashboard.adjustTemperature('${id}',-1)">−</button>
            <div class="temp-display" id="${id}-temp">${room.temperature}°C</div>
            <button class="temp-btn" onclick="dashboard.adjustTemperature('${id}',1)">+</button>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `
  }

  generateLightsContent() {
    return `
    <div class="control-section">
      <div class="section-title">💡 All Lights</div>
      ${Object.entries(this.rooms)
        .map(([id, room]) => {
          const lights = Object.entries(room.devices).filter(([k, d]) => d.type === "light")
          return lights
            .map(
              ([key, d]) => `
          <div class="control-item">
            <div class="control-label">${room.icon} ${room.name} — ${d.name}</div>
            <div class="toggle-switch ${d.status ? "active" : ""}" onclick="dashboard.toggleDevice('${id}','${key}')">
              <div class="toggle-slider"></div>
            </div>
          </div>
          ${d.status
                  ? `
          <div class="control-item">
            <div class="control-label"></div>
            <input type="range" min="1" max="100" value="${d.level || d.brightness || 50}" class="level-slider"
                   oninput="dashboard.adjustLevel('${id}','${key}', this.value)">
            <span style="font-size:11px;min-width:30px;text-align:right;">${d.level || d.brightness || 50}/100</span>
          </div>`
                  : ``
                }
        `,
            )
            .join("")
        })
        .join("")}
    </div>
    <div class="quick-actions">
      <button class="quick-btn" onclick="dashboard.quickAction('allLightsOn')">All Lights On</button>
      <button class="quick-btn" onclick="dashboard.quickAction('allLightsOff')">All Lights Off</button>
      <button class="quick-btn" onclick="dashboard.quickAction('nightMode')">Night Mode</button>
    </div>
  `
  }

  generateQuickActionsContent() {
    return `
    <div class="control-section">
      <div class="section-title">⚡ Quick Actions</div>
      <div class="quick-actions">
        <button class="quick-btn" onclick="dashboard.quickAction('allLightsOn')">All Lights On</button>
        <button class="quick-btn" onclick="dashboard.quickAction('allLightsOff')">All Lights Off</button>
        <button class="quick-btn" onclick="dashboard.quickAction('nightMode')">Night Mode</button>
        <button class="quick-btn" onclick="dashboard.quickAction('awayMode')">Away Mode</button>
      </div>
    </div>
  `
  }

  generateCameraContent() {
    return `
    <div class="control-section">
        <div class="section-title">📷 Security Cameras</div>
        <div class="control-item">
            <div class="control-label">Camera System</div>
            <span style="font-size: 11px; color: #4CAF50;">● Online</span>
        </div>
        <div class="control-item">
            <div class="control-label">Active Cameras</div>
            <span>4/4</span>
        </div>
        <div class="control-item">
            <div class="control-label">Recording</div>
            <span style="font-size: 11px; color: #4CAF50;">● Active</span>
        </div>
        <div class="quick-actions">
            <button class="quick-btn" onclick="dashboard.showMonitoringSystem()">Open Camera Feeds</button>
            <button class="quick-btn">Camera Settings</button>
        </div>
    </div>
    `;
  }
  generateScenesContent() {
    return `
    <div class="control-section">
      <div class="section-title">🎛️ Scenes</div>
      <div class="quick-actions">
        <button class="quick-btn" onclick="dashboard.applyScene('morning')">Morning</button>
        <button class="quick-btn" onclick="dashboard.applyScene('relax')">Relax</button>
        <button class="quick-btn" onclick="dashboard.applyScene('party')">Party</button>
      </div>
    </div>
  `
  }

  applyScene(name) {
    const presets = {
      morning: { mode: "cool", level: 60 },
      relax: { mode: "warm", level: 30 },
      party: { mode: "party", level: 100 },
    }
    const p = presets[name]
    if (!p) return
    Object.keys(this.rooms).forEach((roomId) => {
      Object.entries(this.rooms[roomId].devices).forEach(([key, d]) => {
        if (d.type === "light") {
          d.status = true
          d.mode = p.mode
          d.level = p.level
          d.brightness = p.level
          const preset = this.lightModePresets[p.mode]
          if (preset) d.color = preset.color
        }
      })
      this.updateRoomState(roomId)
    })
    if (this.activeRoom) {
      this.panelContent.innerHTML = this.generateRoomControls(this.activeRoom, this.rooms[this.activeRoom])
    }
    this.logActivity(`Scene applied: ${name}`)
  }

  generateMusicContent() {
    this.music = this.music || { playing: false, volume: 50 }
    return `
    <div class="control-section">
      <div class="section-title">🎵 Music</div>
      <div class="control-item">
        <div class="control-label">Playback</div>
        <div class="toggle-switch ${this.music.playing ? "active" : ""}" onclick="dashboard.toggleMusic()">
          <div class="toggle-slider"></div>
        </div>
      </div>
      <div class="control-item">
        <div class="control-label">Volume</div>
        <input type="range" min="0" max="100" value="${this.music.volume}" class="level-slider"
               oninput="dashboard.adjustMusicVolume(this.value)">
        <span style="font-size:11px;min-width:30px;text-align:right;">${this.music.volume}/100</span>
      </div>
      <div class="quick-actions">
        <button class="quick-btn" onclick="dashboard.showMusicPlayer()">Open Music Player</button>
      </div>
    </div>
  `
  }

  toggleMusic() {
    this.music = this.music || { playing: false, volume: 50 };
    this.music.playing = !this.music.playing;
    const t = event.target.closest(".toggle-switch");
    if (this.music.playing) {
      t.classList.add("active");
      this.showMusicPlayer();
      this.playMusic();
    } else {
      t.classList.remove("active");
      this.pauseMusic();
    }
    this.logActivity(`Music ${this.music.playing ? "playing" : "paused"}`);
  }

  adjustMusicVolume(v) {
    this.music = this.music || { playing: false, volume: 50 };
    this.music.volume = Number.parseInt(v);
    const span = event.target.nextElementSibling;
    if (span) span.textContent = `${this.music.volume}/100`;
    this.adjustMusicVolume(v); // Call the new method
  }

  generateAlarmContent() {
    return `
    <div class="control-section">
      <div class="section-title">🚨 Alarm</div>
      <div class="control-item">
        <div class="control-label">Security Armed</div>
        <div class="toggle-switch ${this.securityArmed ? "active" : ""}" onclick="dashboard.toggleSecurityArmed()">
          <div class="toggle-slider"></div>
        </div>
      </div>
      <div class="control-item">
        <div class="control-label">Away Mode</div>
        <div class="toggle-switch ${this.awayMode ? "active" : ""}" onclick="dashboard.toggleAwayMode()">
          <div class="toggle-slider"></div>
        </div>
      </div>
      <div class="quick-actions">
        <button class="quick-btn" onclick="dashboard.showHistory()">Alert History</button>
      </div>
    </div>
  `
  }
}

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  window.dashboard = new SmartHomeDashboard()
})

// Prevent default touch behaviors
document.addEventListener(
  "touchstart",
  (e) => {
    if (e.touches.length > 1) {
      e.preventDefault()
    }
  },
  { passive: false },
)

// Tabs: Overview, Rooms, Energy (show in left panel)
document.querySelectorAll(".nav-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const leftPanel = document.getElementById("leftPanel")
    const overlay = document.getElementById("overlay")
    const title = document.getElementById("leftPanelTitle")
    const content = document.getElementById("leftPanelContent")

    // guard and use the global safely
    const d = window.dashboard
    title.textContent = tab.textContent
    if (d) {
      if (tab.dataset.view === "overview") {
        content.innerHTML = d.generateOverviewContent()
      } else if (tab.dataset.view === "rooms") {
        content.innerHTML = d.generateRoomsContent()
      } else if (tab.dataset.view === "energy") {
        content.innerHTML = d.generateEnergyContent()
      }
    }

    // Activate left panel
    leftPanel.classList.add("active")
    overlay.classList.add("active")
  })
})

// Close left panel
document.getElementById("closeLeftPanelBtn").addEventListener("click", () => {
  document.getElementById("leftPanel").classList.remove("active")
  document.getElementById("overlay").classList.remove("active")
})
/* ----------------- GLOBAL THEME MANAGER ----------------- */
class ThemeManager {
    constructor() {
        this.currentTheme = 'light'; // Default to light mode
        this.init();
    }

    init() {
        // Check if user has manually set a theme before
        const savedTheme = localStorage.getItem('globalTheme');
        
        let themeToUse;
        if (savedTheme) {
            // User has previously set a theme, use that
            themeToUse = savedTheme;
        } else {
            // First time visitor - detect system preference
            themeToUse = this.getSystemTheme();
        }
        
        this.setTheme(themeToUse);
        
        // Listen for system theme changes
        this.setupSystemThemeListener();
        
        // Setup theme toggle buttons on page load
        this.setupThemeToggles();
    }

    setTheme(theme, isManual = false) {
        this.currentTheme = theme;
        
        // Apply theme to document
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        
        // Save to localStorage only if it's a manual change or first time setting
        if (isManual || !localStorage.getItem('globalTheme')) {
            localStorage.setItem('globalTheme', theme);
        }
        
        // Update all theme toggle buttons
        this.updateThemeIcons();
        
        // Dispatch custom event for other scripts to listen
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: theme } 
        }));
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme, true); // Mark as manual change
    }

    setupThemeToggles() {
        // Find all theme toggle buttons
        const themeToggles = document.querySelectorAll('#themeToggle, .theme-toggle');
        
        themeToggles.forEach(toggle => {
            // Remove existing listeners
            toggle.removeEventListener('click', this.handleThemeToggle);
            // Add new listener
            toggle.addEventListener('click', this.handleThemeToggle.bind(this));
        });
    }

    handleThemeToggle(e) {
        e.preventDefault();
        this.toggleTheme();
    }

    updateThemeIcons() {
        const themeToggles = document.querySelectorAll('#themeToggle, .theme-toggle');
        
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if (icon) {
                if (this.currentTheme === 'dark') {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }
        });
    }

    getSystemTheme() {
        // Detect system color scheme preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    setupSystemThemeListener() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a theme
                const hasManualTheme = localStorage.getItem('globalTheme');
                if (!hasManualTheme) {
                    const systemTheme = e.matches ? 'dark' : 'light';
                    this.setTheme(systemTheme);
                }
            });
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

/* ----------------- INITIALIZE GLOBAL THEME MANAGER ----------------- */
let globalThemeManager;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        globalThemeManager = new ThemeManager();
    });
} else {
    globalThemeManager = new ThemeManager();
}

// Export for use in other scripts
window.ThemeManager = ThemeManager;
window.globalThemeManager = globalThemeManager;
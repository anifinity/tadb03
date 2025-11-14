// Automatic Data Backup & Recovery System for TADB
// Protects against accidental/malicious deletions

(function() {
    'use strict';
    
    const BACKUP_KEY = 'tadb_backup_';
    const MAX_BACKUPS = 10; // Keep last 10 backups
    
    // Backup Manager
    class BackupManager {
        constructor() {
            this.init();
        }
        
        init() {
            // Auto-backup every 5 minutes
            setInterval(() => this.autoBackup(), 300000);
            
            // Backup on page unload
            window.addEventListener('beforeunload', () => this.autoBackup());
            
            // Initial backup
            this.autoBackup();
        }
        
        // Create backup
        createBackup() {
            const timestamp = Date.now();
            const backup = {
                timestamp: timestamp,
                date: new Date(timestamp).toLocaleString(),
                posts: this.getData('tadb_posts'),
                schedules: this.getData('tadb_schedule'),
                creators: this.getData('tadb_creators')
            };
            
            // Save backup
            const backupKey = BACKUP_KEY + timestamp;
            localStorage.setItem(backupKey, JSON.stringify(backup));
            
            // Clean old backups
            this.cleanOldBackups();
            
            console.log('✅ Backup created:', backup.date);
            return backup;
        }
        
        // Auto backup
        autoBackup() {
            try {
                this.createBackup();
            } catch (error) {
                console.error('Backup failed:', error);
            }
        }
        
        // Get data from localStorage
        getData(key) {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : [];
            } catch (error) {
                return [];
            }
        }
        
        // Get all backups
        getAllBackups() {
            const backups = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(BACKUP_KEY)) {
                    try {
                        const backup = JSON.parse(localStorage.getItem(key));
                        backups.push(backup);
                    } catch (error) {
                        console.error('Error reading backup:', error);
                    }
                }
            }
            
            // Sort by timestamp (newest first)
            return backups.sort((a, b) => b.timestamp - a.timestamp);
        }
        
        // Restore from backup
        restoreBackup(timestamp) {
            const backupKey = BACKUP_KEY + timestamp;
            const backupData = localStorage.getItem(backupKey);
            
            if (!backupData) {
                console.error('Backup not found!');
                return false;
            }
            
            try {
                const backup = JSON.parse(backupData);
                
                // Restore data
                if (backup.posts) {
                    localStorage.setItem('tadb_posts', JSON.stringify(backup.posts));
                }
                if (backup.schedules) {
                    localStorage.setItem('tadb_schedule', JSON.stringify(backup.schedules));
                }
                if (backup.creators) {
                    localStorage.setItem('tadb_creators', JSON.stringify(backup.creators));
                }
                
                console.log('✅ Data restored from:', backup.date);
                return true;
            } catch (error) {
                console.error('Restore failed:', error);
                return false;
            }
        }
        
        // Clean old backups (keep only last MAX_BACKUPS)
        cleanOldBackups() {
            const backups = this.getAllBackups();
            
            if (backups.length > MAX_BACKUPS) {
                const toDelete = backups.slice(MAX_BACKUPS);
                toDelete.forEach(backup => {
                    const key = BACKUP_KEY + backup.timestamp;
                    localStorage.removeItem(key);
                });
                console.log('🗑️ Cleaned', toDelete.length, 'old backups');
            }
        }
        
        // Export all data as JSON file
        exportData() {
            const data = {
                exportDate: new Date().toISOString(),
                posts: this.getData('tadb_posts'),
                schedules: this.getData('tadb_schedule'),
                creators: this.getData('tadb_creators')
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `tadb-backup-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            console.log('✅ Data exported');
        }
        
        // Import data from JSON file
        importData(jsonData) {
            try {
                const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
                
                if (data.posts) {
                    localStorage.setItem('tadb_posts', JSON.stringify(data.posts));
                }
                if (data.schedules) {
                    localStorage.setItem('tadb_schedule', JSON.stringify(data.schedules));
                }
                if (data.creators) {
                    localStorage.setItem('tadb_creators', JSON.stringify(data.creators));
                }
                
                console.log('✅ Data imported');
                return true;
            } catch (error) {
                console.error('Import failed:', error);
                return false;
            }
        }
        
        // Get backup statistics
        getStats() {
            const backups = this.getAllBackups();
            return {
                totalBackups: backups.length,
                latestBackup: backups[0]?.date || 'None',
                oldestBackup: backups[backups.length - 1]?.date || 'None'
            };
        }
    }
    
    // Initialize backup manager
    const backupManager = new BackupManager();
    
    // Export to window for console access
    window.BackupManager = backupManager;
    
    // Add recovery UI button (optional)
    function addRecoveryButton() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-history"></i> Recovery';
        button.style.cssText = 'position: fixed; bottom: 20px; right: 20px; padding: 12px 20px; background: #e74c3c; color: white; border: none; border-radius: 50px; cursor: pointer; z-index: 9999; box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3); font-weight: 600;';
        button.onclick = showRecoveryPanel;
        document.body.appendChild(button);
    }
    
    // Show recovery panel
    function showRecoveryPanel() {
        const backups = backupManager.getAllBackups();
        
        const panel = document.createElement('div');
        panel.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--card-bg); padding: 30px; border-radius: 15px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); z-index: 10000; max-width: 500px; width: 90%;';
        
        panel.innerHTML = `
            <h2 style="margin-bottom: 20px; color: var(--text-primary);">
                <i class="fas fa-history"></i> Data Recovery
            </h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">
                Select a backup to restore:
            </p>
            <div style="max-height: 300px; overflow-y: auto; margin-bottom: 20px;">
                ${backups.map(backup => `
                    <div style="padding: 15px; background: var(--bg-secondary); border-radius: 8px; margin-bottom: 10px; cursor: pointer;" onclick="window.BackupManager.restoreBackup(${backup.timestamp}); location.reload();">
                        <div style="font-weight: 600; color: var(--text-primary);">${backup.date}</div>
                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">
                            Posts: ${backup.posts?.length || 0} | 
                            Schedules: ${backup.schedules?.length || 0} | 
                            Creators: ${backup.creators?.length || 0}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="display: flex; gap: 10px;">
                <button onclick="window.BackupManager.exportData()" style="flex: 1; padding: 12px; background: #27ae60; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-download"></i> Export
                </button>
                <button onclick="this.parentElement.parentElement.remove()" style="flex: 1; padding: 12px; background: var(--bg-secondary); color: var(--text-primary); border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        `;
        
        document.body.appendChild(panel);
    }
    
    // Add recovery button on editor pages
    if (window.location.pathname.includes('editor') || window.location.pathname.includes('dashboard')) {
        window.addEventListener('DOMContentLoaded', addRecoveryButton);
    }
    
    console.log('🛡️ Backup system initialized');
    console.log('📊 Stats:', backupManager.getStats());
    console.log('💡 Use window.BackupManager to access backup functions');
})();

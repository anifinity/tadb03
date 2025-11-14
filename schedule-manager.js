// Anime Schedule Management System
// Manages schedule data for anime-schedule.html

class ScheduleManager {
    constructor() {
        this.storageKey = 'tadb_schedule';
        this.init();
    }

    init() {
        // Initialize with default schedule if empty
        if (!this.getAllSchedules().length) {
            this.initializeDefaultSchedule();
        } else {
            // Migrate old schedules to add category field
            this.migrateOldSchedules();
        }
    }

    // Get all schedules from localStorage
    getAllSchedules() {
        try {
            const schedules = localStorage.getItem(this.storageKey);
            return schedules ? JSON.parse(schedules) : [];
        } catch (error) {
            console.error('Error loading schedules:', error);
            return [];
        }
    }

    // Save all schedules to localStorage
    saveSchedules(schedules) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(schedules));
            return true;
        } catch (error) {
            console.error('Error saving schedules:', error);
            return false;
        }
    }

    // Get single schedule by ID
    getScheduleById(id) {
        const schedules = this.getAllSchedules();
        return schedules.find(schedule => schedule.id === parseInt(id));
    }

    // Add or update a schedule
    saveSchedule(scheduleData) {
        const schedules = this.getAllSchedules();
        const existingIndex = schedules.findIndex(s => s.id === scheduleData.id);

        if (existingIndex >= 0) {
            // Update existing schedule
            schedules[existingIndex] = { ...schedules[existingIndex], ...scheduleData };
        } else {
            // Add new schedule with auto-generated ID
            const newId = schedules.length > 0 ? Math.max(...schedules.map(s => s.id)) + 1 : 1;
            scheduleData.id = newId;
            schedules.push(scheduleData);
        }

        return this.saveSchedules(schedules);
    }

    // Delete a schedule
    deleteSchedule(id) {
        const schedules = this.getAllSchedules();
        const filteredSchedules = schedules.filter(s => s.id !== parseInt(id));
        return this.saveSchedules(filteredSchedules);
    }

    // Initialize with default schedule
    initializeDefaultSchedule() {
        const defaultSchedules = [
            {
                id: 1,
                title: "Zenshu",
                day: "Monday",
                time: "7:00 PM",
                platform: "Crunchyroll",
                category: "weekly",
                status: "Ongoing",
                episode: "Episode 12",
                poster: "https://blogger.googleusercontent.com/img/a/AVvXsEgnFAm3R_lG6USF7JA83Zh6J1lhOruxA9UuggmHeMZueaN-HlY0PmZobkDTddr20-ADoXgiw1a5t2rPNdrsz8TMqXDmLkv_blqm96L7yVgEnoF6vq3skLqyJX3ymxGlCCua85uAm9vknrsdMQUKVZ4_MvnpBavqYLIBE9-4TSvVzdVo4-TelzqlGvhdpxk=s16000"
            },
            {
                id: 2,
                title: "DanDaDan",
                day: "Friday",
                time: "8:30 PM",
                platform: "Crunchyroll",
                category: "weekly",
                status: "Completed",
                episode: "Season Finale",
                poster: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7xLFElqSEYG5ykrx82TfqmYLjpkVckixcvaNoWpqzO-z-HuIiP1_dYBERLfYEyMU7ZPehuQuj-UWOWHanmA3_ll683gz7_5caehDcvn2VMsGlnO1ED83UYI03zz3G-VCYZlVRigWDq221ls5SW2AVPqkkyqDrd3gQX2n9F5QLMKUFvDUKQ9ca5a0QQfY/s16000/dandadan.jpg"
            }
        ];

        this.saveSchedules(defaultSchedules);
    }

    // Migrate old schedules to add category field
    migrateOldSchedules() {
        const schedules = this.getAllSchedules();
        let updated = false;

        const migratedSchedules = schedules.map(schedule => {
            if (!schedule.category) {
                // Auto-assign category based on status or default to 'weekly'
                if (schedule.status === 'Upcoming') {
                    schedule.category = 'upcoming';
                } else if (schedule.status === 'Completed' || schedule.status === 'Ongoing') {
                    schedule.category = 'weekly';
                } else {
                    schedule.category = 'weekly'; // Default
                }
                updated = true;
                console.log(`✅ Migrated "${schedule.title}" to category: ${schedule.category}`);
            }
            return schedule;
        });

        if (updated) {
            this.saveSchedules(migratedSchedules);
            console.log('📦 Schedule migration complete!');
        }

        return updated;
    }

    // Get schedules grouped by day
    getSchedulesByDay() {
        const schedules = this.getAllSchedules();
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        const grouped = {};
        days.forEach(day => {
            grouped[day] = schedules.filter(s => s.day === day);
        });
        
        return grouped;
    }

    // Get schedules by category
    getSchedulesByCategory(category) {
        const schedules = this.getAllSchedules();
        return schedules.filter(s => s.category === category);
    }

    // Get all categories with counts
    getCategoryCounts() {
        const schedules = this.getAllSchedules();
        return {
            upcoming: schedules.filter(s => s.category === 'upcoming').length,
            weekly: schedules.filter(s => s.category === 'weekly').length,
            tv: schedules.filter(s => s.category === 'tv').length
        };
    }

    // Automatic Lifecycle Management
    // Call this on page load to manage schedule lifecycle
    manageScheduleLifecycle() {
        const schedules = this.getAllSchedules();
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight for date comparison
        
        let updated = false;
        const updatedSchedules = [];

        schedules.forEach(schedule => {
            let shouldKeep = true;
            let needsUpdate = false;

            // Check if schedule has release date
            if (schedule.releaseDate) {
                const releaseDate = new Date(schedule.releaseDate);
                releaseDate.setHours(0, 0, 0, 0);

                // If release date is today or past, move to "Now Streaming"
                if (releaseDate <= today && schedule.status !== 'Streaming') {
                    schedule.status = 'Streaming';
                    schedule.addedToStreamingDate = today.toISOString();
                    needsUpdate = true;
                    console.log(`✅ Moved "${schedule.title}" to Now Streaming`);
                }
            }

            // Check if anime should be deleted (3 days after release)
            if (schedule.addedToStreamingDate) {
                const streamingDate = new Date(schedule.addedToStreamingDate);
                streamingDate.setHours(0, 0, 0, 0);
                
                const daysSinceStreaming = Math.floor((today - streamingDate) / (1000 * 60 * 60 * 24));
                
                // Delete after 2 full days in streaming (3rd day)
                if (daysSinceStreaming >= 2) {
                    shouldKeep = false;
                    console.log(`🗑️ Auto-deleted "${schedule.title}" (${daysSinceStreaming} days in streaming)`);
                }
            }

            if (shouldKeep) {
                updatedSchedules.push(schedule);
                if (needsUpdate) updated = true;
            } else {
                updated = true;
            }
        });

        if (updated) {
            this.saveSchedules(updatedSchedules);
            console.log('📅 Schedule lifecycle updated');
        }

        return updated;
    }

    // Get upcoming schedules (not yet released)
    getUpcomingSchedules() {
        const schedules = this.getAllSchedules();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return schedules.filter(schedule => {
            if (!schedule.releaseDate) return true; // Show if no release date
            const releaseDate = new Date(schedule.releaseDate);
            releaseDate.setHours(0, 0, 0, 0);
            return releaseDate > today;
        });
    }

    // Get currently streaming schedules
    getStreamingSchedules() {
        const schedules = this.getAllSchedules();
        return schedules.filter(schedule => schedule.status === 'Streaming');
    }

    // Add release date to schedule
    setReleaseDate(scheduleId, releaseDate) {
        const schedule = this.getScheduleById(scheduleId);
        if (schedule) {
            schedule.releaseDate = releaseDate;
            this.saveSchedule(schedule);
            return true;
        }
        return false;
    }
}

// Create global instance
window.scheduleManager = new ScheduleManager();

// Auto-run lifecycle management on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.scheduleManager.manageScheduleLifecycle();
    });
}

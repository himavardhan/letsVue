<template>
  <div class="behavior-tracker">
    <h2 class="page-title">🎯 Behavior Tracker</h2>
    
    <div class="tracker-grid">
      <div class="form-card">
        <h3>Track New Behavior</h3>
        <form @submit.prevent="trackBehavior" class="behavior-form">
          <div class="form-group">
            <label>User ID</label>
            <input v-model="newBehavior.userId" type="text" placeholder="e.g., user_123" required>
          </div>
          
          <div class="form-group">
            <label>Action</label>
            <select v-model="newBehavior.action" required>
              <option value="">Select action...</option>
              <option value="click">Click</option>
              <option value="scroll">Scroll</option>
              <option value="hover">Hover</option>
              <option value="submit">Submit</option>
              <option value="search">Search</option>
              <option value="navigate">Navigate</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Page</label>
            <select v-model="newBehavior.page" required>
              <option value="">Select page...</option>
              <option value="Home">Home</option>
              <option value="Products">Products</option>
              <option value="About">About</option>
              <option value="Contact">Contact</option>
              <option value="Dashboard">Dashboard</option>
              <option value="Profile">Profile</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Duration (seconds)</label>
            <input v-model.number="newBehavior.duration" type="number" min="1" placeholder="e.g., 60" required>
          </div>
          
          <div class="form-group">
            <label>Device</label>
            <select v-model="newBehavior.device" required>
              <option value="">Select device...</option>
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Browser</label>
            <select v-model="newBehavior.browser" required>
              <option value="">Select browser...</option>
              <option value="Chrome">Chrome</option>
              <option value="Firefox">Firefox</option>
              <option value="Safari">Safari</option>
              <option value="Edge">Edge</option>
            </select>
          </div>
          
          <button type="submit" class="btn-primary">Track Behavior</button>
          <button type="button" @click="resetForm" class="btn-secondary">Reset Form</button>
        </form>
        
        <div v-if="successMessage" class="success-message">
          ✅ {{ successMessage }}
        </div>
      </div>
      
      <div class="preview-card">
        <h3>Live Behavior Feed</h3>
        <div class="behavior-feed">
          <div v-for="behavior in recentBehaviors" :key="behavior.id" class="behavior-item">
            <div class="behavior-header">
              <span class="user-badge">{{ behavior.userId }}</span>
              <span class="time-badge">{{ formatTime(behavior.timestamp) }}</span>
            </div>
            <div class="behavior-details">
              <span class="detail-item">
                <strong>Action:</strong> {{ behavior.action }}
              </span>
              <span class="detail-item">
                <strong>Page:</strong> {{ behavior.page }}
              </span>
              <span class="detail-item">
                <strong>Device:</strong> {{ behavior.device }}
              </span>
              <span class="detail-item">
                <strong>Duration:</strong> {{ behavior.duration }}s
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="quick-actions">
      <h3>Quick Actions</h3>
      <div class="action-buttons">
        <button @click="generateSampleData" class="action-btn">
          🔄 Generate Sample Data
        </button>
        <button @click="clearAllData" class="action-btn danger">
          🗑️ Clear All Data
        </button>
        <button @click="exportData" class="action-btn">
          📥 Export Data
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import behaviorService from '../services/behaviorService.js'

export default {
  name: 'BehaviorTracker',
  data() {
    return {
      newBehavior: {
        userId: '',
        action: '',
        page: '',
        duration: '',
        device: '',
        browser: ''
      },
      recentBehaviors: [],
      successMessage: ''
    }
  },
  mounted() {
    this.loadRecentBehaviors()
  },
  methods: {
    trackBehavior() {
      behaviorService.addBehavior(this.newBehavior)
      this.successMessage = 'Behavior tracked successfully!'
      this.resetForm()
      this.loadRecentBehaviors()
      
      setTimeout(() => {
        this.successMessage = ''
      }, 3000)
    },
    resetForm() {
      this.newBehavior = {
        userId: '',
        action: '',
        page: '',
        duration: '',
        device: '',
        browser: ''
      }
    },
    loadRecentBehaviors() {
      this.recentBehaviors = behaviorService.getAllBehaviors().slice(0, 15)
    },
    formatTime(timestamp) {
      const date = new Date(timestamp)
      const now = new Date()
      const diff = now - date
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      
      if (minutes < 1) return 'Just now'
      if (minutes < 60) return `${minutes}m ago`
      if (hours < 24) return `${hours}h ago`
      return date.toLocaleDateString()
    },
    generateSampleData() {
      behaviorService.resetData()
      this.loadRecentBehaviors()
      this.successMessage = 'Sample data generated successfully!'
      setTimeout(() => {
        this.successMessage = ''
      }, 3000)
    },
    clearAllData() {
      if (confirm('Are you sure you want to clear all behavior data?')) {
        localStorage.removeItem('userBehaviors')
        location.reload()
      }
    },
    exportData() {
      const data = behaviorService.getAllBehaviors()
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `user-behaviors-${new Date().toISOString()}.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped>
.behavior-tracker {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-title {
  color: white;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.tracker-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 968px) {
  .tracker-grid {
    grid-template-columns: 1fr;
  }
}

.form-card, .preview-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-card h3, .preview-card h3 {
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #667eea;
}

.behavior-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
  margin-top: 0.5rem;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.success-message {
  margin-top: 1rem;
  padding: 1rem;
  background: #d4edda;
  color: #155724;
  border-radius: 5px;
  border: 1px solid #c3e6cb;
}

.behavior-feed {
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.behavior-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 5px;
  border-left: 4px solid #667eea;
  transition: transform 0.2s ease;
}

.behavior-item:hover {
  transform: translateX(5px);
}

.behavior-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.user-badge {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
}

.time-badge {
  color: #666;
  font-size: 0.85rem;
}

.behavior-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.detail-item {
  color: #555;
}

.detail-item strong {
  color: #333;
}

.quick-actions {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.quick-actions h3 {
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #667eea;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.4);
}

.action-btn.danger {
  background: linear-gradient(135deg, #f5576c, #f093fb);
}
</style>

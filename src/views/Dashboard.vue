<template>
  <div class="dashboard">
    <h2 class="page-title">📊 User Behavior Dashboard</h2>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-content">
          <h3>Total Actions</h3>
          <p class="stat-value">{{ stats.totalActions }}</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>Unique Users</h3>
          <p class="stat-value">{{ stats.uniqueUsers }}</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">💻</div>
        <div class="stat-content">
          <h3>Desktop Users</h3>
          <p class="stat-value">{{ stats.deviceBreakdown.desktop || 0 }}</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📱</div>
        <div class="stat-content">
          <h3>Mobile Users</h3>
          <p class="stat-value">{{ stats.deviceBreakdown.mobile || 0 }}</p>
        </div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <h3>Top Actions</h3>
        <div class="action-list">
          <div v-for="action in stats.topActions" :key="action.action" class="action-item">
            <span class="action-name">{{ action.action }}</span>
            <div class="action-bar-container">
              <div class="action-bar" :style="{ width: (action.count / stats.totalActions * 100) + '%' }"></div>
            </div>
            <span class="action-count">{{ action.count }}</span>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h3>Top Pages</h3>
        <div class="action-list">
          <div v-for="page in stats.topPages" :key="page.page" class="action-item">
            <span class="action-name">{{ page.page }}</span>
            <div class="action-bar-container">
              <div class="action-bar page-bar" :style="{ width: (page.count / stats.totalActions * 100) + '%' }"></div>
            </div>
            <span class="action-count">{{ page.count }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-card full-width">
      <h3>Activity Over Time (Last 7 Days)</h3>
      <div class="timeline-chart">
        <div v-for="day in stats.actionsOverTime" :key="day.date" class="timeline-bar">
          <div class="bar" :style="{ height: (day.count / maxDayCount * 100) + '%' }">
            <span class="bar-value">{{ day.count }}</span>
          </div>
          <span class="bar-label">{{ formatDate(day.date) }}</span>
        </div>
      </div>
    </div>

    <div class="recent-activities">
      <h3>Recent Activities</h3>
      <div class="activity-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Page</th>
              <th>Device</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="behavior in recentBehaviors" :key="behavior.id">
              <td>{{ behavior.userId }}</td>
              <td><span class="badge">{{ behavior.action }}</span></td>
              <td>{{ behavior.page }}</td>
              <td>{{ behavior.device }}</td>
              <td>{{ formatTime(behavior.timestamp) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import behaviorService from '../services/behaviorService.js'

export default {
  name: 'Dashboard',
  data() {
    return {
      stats: {
        totalActions: 0,
        uniqueUsers: 0,
        topActions: [],
        topPages: [],
        deviceBreakdown: {},
        browserBreakdown: {},
        actionsOverTime: []
      },
      recentBehaviors: []
    }
  },
  computed: {
    maxDayCount() {
      return Math.max(...this.stats.actionsOverTime.map(d => d.count), 1)
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.stats = behaviorService.getBehaviorStats()
      this.recentBehaviors = behaviorService.getAllBehaviors().slice(0, 10)
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    },
    formatTime(timestamp) {
      const date = new Date(timestamp)
      const now = new Date()
      const diff = now - date
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      
      if (minutes < 60) return `${minutes}m ago`
      if (hours < 24) return `${hours}h ago`
      return date.toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.dashboard {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 3rem;
}

.stat-content h3 {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.chart-card h3 {
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #667eea;
}

.action-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-item {
  display: grid;
  grid-template-columns: 100px 1fr 50px;
  gap: 1rem;
  align-items: center;
}

.action-name {
  font-weight: 500;
  color: #333;
  text-transform: capitalize;
}

.action-bar-container {
  background: #f0f0f0;
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
}

.action-bar {
  background: linear-gradient(90deg, #667eea, #764ba2);
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 10px;
}

.page-bar {
  background: linear-gradient(90deg, #f093fb, #f5576c);
}

.action-count {
  text-align: right;
  font-weight: bold;
  color: #667eea;
}

.full-width {
  grid-column: 1 / -1;
}

.timeline-chart {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 200px;
  padding: 1rem 0;
}

.timeline-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.bar {
  width: 60px;
  background: linear-gradient(to top, #667eea, #764ba2);
  border-radius: 5px 5px 0 0;
  min-height: 20px;
  position: relative;
  transition: height 0.5s ease;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 5px;
}

.bar-value {
  color: white;
  font-weight: bold;
  font-size: 0.85rem;
}

.bar-label {
  font-size: 0.75rem;
  color: #666;
}

.recent-activities {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

.recent-activities h3 {
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #667eea;
}

.activity-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f8f9fa;
}

th {
  padding: 1rem;
  text-align: left;
  color: #666;
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

tbody tr:hover {
  background: #f8f9fa;
}

.badge {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
  text-transform: capitalize;
}
</style>

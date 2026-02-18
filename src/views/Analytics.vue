<template>
  <div class="analytics">
    <h2 class="page-title">📈 Advanced Analytics</h2>
    
    <div class="analytics-grid">
      <div class="chart-container">
        <h3>Action Distribution</h3>
        <canvas ref="actionsChart"></canvas>
      </div>
      
      <div class="chart-container">
        <h3>Page Views Distribution</h3>
        <canvas ref="pagesChart"></canvas>
      </div>
      
      <div class="chart-container full-width">
        <h3>Activity Timeline (Last 7 Days)</h3>
        <canvas ref="timelineChart"></canvas>
      </div>
      
      <div class="chart-container">
        <h3>Device Distribution</h3>
        <canvas ref="deviceChart"></canvas>
      </div>
      
      <div class="chart-container">
        <h3>Browser Distribution</h3>
        <canvas ref="browserChart"></canvas>
      </div>
    </div>
    
    <div class="insights-card">
      <h3>📊 Key Insights</h3>
      <div class="insights-grid">
        <div class="insight-item">
          <div class="insight-icon">🏆</div>
          <div class="insight-content">
            <h4>Most Popular Action</h4>
            <p>{{ topAction }} ({{ topActionCount }} occurrences)</p>
          </div>
        </div>
        
        <div class="insight-item">
          <div class="insight-icon">📄</div>
          <div class="insight-content">
            <h4>Most Visited Page</h4>
            <p>{{ topPage }} ({{ topPageCount }} visits)</p>
          </div>
        </div>
        
        <div class="insight-item">
          <div class="insight-icon">⏱️</div>
          <div class="insight-content">
            <h4>Average Session Duration</h4>
            <p>{{ averageDuration }} seconds</p>
          </div>
        </div>
        
        <div class="insight-item">
          <div class="insight-icon">📱</div>
          <div class="insight-content">
            <h4>Preferred Device</h4>
            <p>{{ preferredDevice }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import behaviorService from '../services/behaviorService.js'

Chart.register(...registerables)

export default {
  name: 'Analytics',
  data() {
    return {
      stats: null,
      charts: {}
    }
  },
  computed: {
    topAction() {
      return this.stats?.topActions[0]?.action || 'N/A'
    },
    topActionCount() {
      return this.stats?.topActions[0]?.count || 0
    },
    topPage() {
      return this.stats?.topPages[0]?.page || 'N/A'
    },
    topPageCount() {
      return this.stats?.topPages[0]?.count || 0
    },
    averageDuration() {
      const behaviors = behaviorService.getAllBehaviors()
      if (behaviors.length === 0) return 0
      const total = behaviors.reduce((sum, b) => sum + b.duration, 0)
      return Math.round(total / behaviors.length)
    },
    preferredDevice() {
      const breakdown = this.stats?.deviceBreakdown || {}
      const devices = Object.entries(breakdown)
      if (devices.length === 0) return 'N/A'
      const top = devices.sort((a, b) => b[1] - a[1])[0]
      return `${top[0]} (${top[1]} users)`
    }
  },
  mounted() {
    this.loadData()
    this.createCharts()
  },
  beforeUnmount() {
    Object.values(this.charts).forEach(chart => chart.destroy())
  },
  methods: {
    loadData() {
      this.stats = behaviorService.getBehaviorStats()
    },
    createCharts() {
      this.createActionsChart()
      this.createPagesChart()
      this.createTimelineChart()
      this.createDeviceChart()
      this.createBrowserChart()
    },
    createActionsChart() {
      const ctx = this.$refs.actionsChart.getContext('2d')
      this.charts.actions = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.stats.topActions.map(a => a.action),
          datasets: [{
            data: this.stats.topActions.map(a => a.count),
            backgroundColor: [
              '#667eea',
              '#764ba2',
              '#f093fb',
              '#4facfe',
              '#43e97b'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      })
    },
    createPagesChart() {
      const ctx = this.$refs.pagesChart.getContext('2d')
      this.charts.pages = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.stats.topPages.map(p => p.page),
          datasets: [{
            data: this.stats.topPages.map(p => p.count),
            backgroundColor: [
              '#f5576c',
              '#f093fb',
              '#667eea',
              '#764ba2',
              '#4facfe'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      })
    },
    createTimelineChart() {
      const ctx = this.$refs.timelineChart.getContext('2d')
      this.charts.timeline = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.stats.actionsOverTime.map(d => {
            const date = new Date(d.date)
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          }),
          datasets: [{
            label: 'Actions',
            data: this.stats.actionsOverTime.map(d => d.count),
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    },
    createDeviceChart() {
      const ctx = this.$refs.deviceChart.getContext('2d')
      const devices = Object.entries(this.stats.deviceBreakdown)
      
      this.charts.device = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: devices.map(d => d[0]),
          datasets: [{
            label: 'Users',
            data: devices.map(d => d[1]),
            backgroundColor: ['#667eea', '#764ba2']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    },
    createBrowserChart() {
      const ctx = this.$refs.browserChart.getContext('2d')
      const browsers = Object.entries(this.stats.browserBreakdown)
      
      this.charts.browser = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: browsers.map(b => b[0]),
          datasets: [{
            label: 'Users',
            data: browsers.map(b => b[1]),
            backgroundColor: ['#f5576c', '#f093fb', '#667eea', '#764ba2']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.analytics {
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

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.chart-container h3 {
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #667eea;
}

.chart-container.full-width {
  grid-column: 1 / -1;
}

.insights-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.insights-card h3 {
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #667eea;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.insight-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.insight-item:hover {
  transform: translateY(-5px);
}

.insight-icon {
  font-size: 2.5rem;
}

.insight-content h4 {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.insight-content p {
  color: #333;
  font-weight: bold;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .analytics-grid {
    grid-template-columns: 1fr;
  }
}
</style>

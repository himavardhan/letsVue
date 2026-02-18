// Mock user behavior data service
class BehaviorService {
  constructor() {
    this.behaviors = this.loadBehaviors()
  }

  loadBehaviors() {
    const stored = localStorage.getItem('userBehaviors')
    if (stored) {
      return JSON.parse(stored)
    }
    
    // Generate initial mock data
    return this.generateMockData()
  }

  saveBehaviors() {
    localStorage.setItem('userBehaviors', JSON.stringify(this.behaviors))
  }

  generateMockData() {
    const actions = ['click', 'scroll', 'hover', 'submit', 'search', 'navigate']
    const pages = ['Home', 'Products', 'About', 'Contact', 'Dashboard', 'Profile']
    const mockData = []

    for (let i = 0; i < 50; i++) {
      const date = new Date()
      date.setHours(date.getHours() - Math.floor(Math.random() * 168)) // Last week
      
      mockData.push({
        id: i + 1,
        userId: `user_${Math.floor(Math.random() * 20) + 1}`,
        action: actions[Math.floor(Math.random() * actions.length)],
        page: pages[Math.floor(Math.random() * pages.length)],
        timestamp: date.toISOString(),
        duration: Math.floor(Math.random() * 300) + 10, // 10-310 seconds
        device: Math.random() > 0.5 ? 'desktop' : 'mobile',
        browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)]
      })
    }

    return mockData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  getAllBehaviors() {
    return this.behaviors
  }

  addBehavior(behavior) {
    const newBehavior = {
      id: this.behaviors.length + 1,
      ...behavior,
      timestamp: new Date().toISOString()
    }
    this.behaviors.unshift(newBehavior)
    this.saveBehaviors()
    return newBehavior
  }

  getBehaviorStats() {
    const stats = {
      totalActions: this.behaviors.length,
      uniqueUsers: new Set(this.behaviors.map(b => b.userId)).size,
      topActions: this.getTopActions(),
      topPages: this.getTopPages(),
      deviceBreakdown: this.getDeviceBreakdown(),
      browserBreakdown: this.getBrowserBreakdown(),
      actionsOverTime: this.getActionsOverTime()
    }
    return stats
  }

  getTopActions() {
    const actionCounts = {}
    this.behaviors.forEach(b => {
      actionCounts[b.action] = (actionCounts[b.action] || 0) + 1
    })
    return Object.entries(actionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([action, count]) => ({ action, count }))
  }

  getTopPages() {
    const pageCounts = {}
    this.behaviors.forEach(b => {
      pageCounts[b.page] = (pageCounts[b.page] || 0) + 1
    })
    return Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, count]) => ({ page, count }))
  }

  getDeviceBreakdown() {
    const deviceCounts = {}
    this.behaviors.forEach(b => {
      deviceCounts[b.device] = (deviceCounts[b.device] || 0) + 1
    })
    return deviceCounts
  }

  getBrowserBreakdown() {
    const browserCounts = {}
    this.behaviors.forEach(b => {
      browserCounts[b.browser] = (browserCounts[b.browser] || 0) + 1
    })
    return browserCounts
  }

  getActionsOverTime() {
    const last7Days = {}
    const now = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateKey = date.toISOString().split('T')[0]
      last7Days[dateKey] = 0
    }

    this.behaviors.forEach(b => {
      const dateKey = b.timestamp.split('T')[0]
      if (last7Days.hasOwnProperty(dateKey)) {
        last7Days[dateKey]++
      }
    })

    return Object.entries(last7Days).map(([date, count]) => ({ date, count }))
  }

  resetData() {
    this.behaviors = this.generateMockData()
    this.saveBehaviors()
  }
}

export default new BehaviorService()

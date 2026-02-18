<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="nav-brand">
        <h1>📊 User Behavior Analytics</h1>
      </div>
      <div class="nav-links">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/tracker" class="nav-link">Behavior Tracker</router-link>
        <router-link to="/analytics" class="nav-link">Analytics</router-link>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view></router-view>
    </main>
    
    <footer class="footer">
      <p>© 2024 letsVue - User Behavior Reporting System</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand h1 {
  color: #667eea;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background: #667eea;
  color: white;
}

.nav-link.router-link-active {
  background: #667eea;
  color: white;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  text-align: center;
  color: #666;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}
</style>

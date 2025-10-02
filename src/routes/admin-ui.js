const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.user) {
    return res.redirect('/api/auth/login');
  }
  
  if (req.user.globalRole !== 'owner' && req.user.globalRole !== 'admin') {
    return res.status(403).send('Access denied. Admin access required.');
  }
  
  const userJson = JSON.stringify(req.user);
  
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hyphrki Admin Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body class="bg-gray-50">
  <div id="app">
    <div class="min-h-screen flex">
      <div class="w-64 bg-gray-900 text-white">
        <div class="p-6">
          <h1 class="text-2xl font-bold">Hyphrki</h1>
          <p class="text-sm text-gray-400">Orchestrator Admin</p>
        </div>
        
        <nav class="mt-6">
          <a @click="currentView = 'overview'" 
             :class="currentView === 'overview' ? 'bg-gray-800' : ''"
             class="block px-6 py-3 hover:bg-gray-800 cursor-pointer transition">
            📊 Overview
          </a>
          <a @click="currentView = 'users'" 
             :class="currentView === 'users' ? 'bg-gray-800' : ''"
             class="block px-6 py-3 hover:bg-gray-800 cursor-pointer transition">
            👥 Users
          </a>
          <a @click="currentView = 'agents'" 
             :class="currentView === 'agents' ? 'bg-gray-800' : ''"
             class="block px-6 py-3 hover:bg-gray-800 cursor-pointer transition">
            🤖 Agents
          </a>
          <a href="/n8n" target="_blank"
             class="block px-6 py-3 hover:bg-gray-800 transition">
            🔧 N8N Editor →
          </a>
        </nav>
      </div>

      <div class="flex-1 p-8">
        <div class="mb-8 flex justify-between items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900">{{ viewTitle }}</h2>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-600">{{ user.email }}</span>
          </div>
        </div>

        <div v-if="currentView === 'overview'" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow p-6">
              <div class="text-sm text-gray-600 mb-2">Total Users</div>
              <div class="text-3xl font-bold">{{ stats.users }}</div>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
              <div class="text-sm text-gray-600 mb-2">Active Agents</div>
              <div class="text-3xl font-bold">{{ stats.agents }}</div>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
              <div class="text-sm text-gray-600 mb-2">Workflows</div>
              <div class="text-3xl font-bold">{{ stats.workflows }}</div>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
              <div class="text-sm text-gray-600 mb-2">Executions</div>
              <div class="text-3xl font-bold">{{ stats.executions }}</div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-bold mb-4">System Status</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span>N8N Service</span>
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Running</span>
              </div>
              <div class="flex justify-between">
                <span>Database</span>
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Connected</span>
              </div>
              <div class="flex justify-between">
                <span>License</span>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Hyphrki Enterprise</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentView === 'users'">
          <div class="bg-white rounded-lg shadow">
            <div class="p-4 border-b">
              <h3 class="font-semibold">Users ({{ users.length }})</h3>
            </div>
            <div class="p-4">
              <div class="text-gray-600">User management coming soon...</div>
            </div>
          </div>
        </div>

        <div v-if="currentView === 'agents'">
          <div class="bg-white rounded-lg shadow">
            <div class="p-4 border-b">
              <h3 class="font-semibold">Agent Deployment</h3>
            </div>
            <div class="p-4">
              <div class="text-gray-600">Agent deployment interface coming soon...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const { createApp } = Vue;
    
    createApp({
      data() {
        return {
          currentView: 'overview',
          user: ${userJson},
          users: [],
          stats: {
            users: 0,
            agents: 0,
            workflows: 0,
            executions: 0
          }
        }
      },
      computed: {
        viewTitle() {
          const titles = {
            overview: 'Overview',
            users: 'User Management',
            agents: 'Agent Deployment'
          };
          return titles[this.currentView] || 'Dashboard';
        }
      },
      mounted() {
        this.loadData();
      },
      methods: {
        async loadData() {
          try {
            const res = await axios.get('/');
            console.log('Status:', res.data);
            this.stats.workflows = 0;
            this.stats.executions = 0;
          } catch (error) {
            console.error('Error loading data:', error);
          }
        }
      }
    }).mount('#app');
  </script>
</body>
</html>`);
});

module.exports = router;

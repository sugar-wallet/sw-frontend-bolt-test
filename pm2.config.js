// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: 'sw-web-app',
      script: 'npm',
      args: 'start',
      cwd: '/home/ubuntu/deployment/sw-web-app', // Replace with your project path
      instances: 'max',
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}

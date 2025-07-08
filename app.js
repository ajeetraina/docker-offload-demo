// app.js - Simple Docker Offload Demo Web App
const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Main route
app.get('/', (req, res) => {
  const systemInfo = {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    cpus: os.cpus().length,
    totalMemory: Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB',
    freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB',
    uptime: Math.round(os.uptime() / 3600) + ' hours',
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  };

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Docker Offload Demo</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                color: white;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                background: rgba(255, 255, 255, 0.1);
                padding: 30px;
                border-radius: 15px;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            }
            h1 {
                text-align: center;
                margin-bottom: 30px;
                font-size: 2.5em;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            .status {
                background: rgba(76, 175, 80, 0.8);
                padding: 15px;
                border-radius: 10px;
                text-align: center;
                margin-bottom: 30px;
                font-size: 1.2em;
                font-weight: bold;
            }
            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            .info-card {
                background: rgba(255, 255, 255, 0.1);
                padding: 20px;
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .info-card h3 {
                margin: 0 0 10px 0;
                color: #ffd700;
            }
            .info-card p {
                margin: 5px 0;
                font-size: 1.1em;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                font-style: italic;
                opacity: 0.8;
            }
            .docker-icon {
                font-size: 3em;
                text-align: center;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="docker-icon">🐳</div>
            <h1>Docker Offload Demo</h1>
            
            <div class="status">
                ✅ Docker Offload is working! This container is running in the cloud.
            </div>

            <div class="info-grid">
                <div class="info-card">
                    <h3>🖥️ System Info</h3>
                    <p><strong>Hostname:</strong> ${systemInfo.hostname}</p>
                    <p><strong>Platform:</strong> ${systemInfo.platform}</p>
                    <p><strong>Architecture:</strong> ${systemInfo.arch}</p>
                </div>

                <div class="info-card">
                    <h3>⚡ Resources</h3>
                    <p><strong>CPU Cores:</strong> ${systemInfo.cpus}</p>
                    <p><strong>Total Memory:</strong> ${systemInfo.totalMemory}</p>
                    <p><strong>Free Memory:</strong> ${systemInfo.freeMemory}</p>
                </div>

                <div class="info-card">
                    <h3>🕒 Runtime Info</h3>
                    <p><strong>Uptime:</strong> ${systemInfo.uptime}</p>
                    <p><strong>Node.js:</strong> ${systemInfo.nodeVersion}</p>
                    <p><strong>Started:</strong> ${new Date().toLocaleString()}</p>
                </div>

                <div class="info-card">
                    <h3>🌐 Network</h3>
                    <p><strong>Port:</strong> ${PORT}</p>
                    <p><strong>Request Time:</strong> ${systemInfo.timestamp}</p>
                    <p><strong>Status:</strong> Running ✅</p>
                </div>
            </div>

            <div class="footer">
                <p>This web application is running via Docker Offload</p>
                <p>Refresh the page to see updated system information</p>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    hostname: os.hostname(),
    uptime: os.uptime()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Docker Offload Demo running on port ${PORT}`);
  console.log(`Hostname: ${os.hostname()}`);
  console.log(`Platform: ${os.platform()}`);
  console.log(`Architecture: ${os.arch()}`);
});
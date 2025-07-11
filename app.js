const express = require('express');
const { execSync } = require('child_process');
const os = require('os');
const app = express();
const port = process.env.PORT || 3000;

// Enable static file serving
app.use(express.static('public'));

// GPU detection function
function getGPUInfo() {
    try {
        // Check for GPU environment variables
        const nvidiaDevices = process.env.NVIDIA_VISIBLE_DEVICES;
        const cudaDevices = process.env.CUDA_VISIBLE_DEVICES;
        
        let gpuInfo = {
            detected: false,
            name: 'N/A',
            memory: 'N/A',
            temperature: 'N/A',
            utilization: 'N/A',
            runtimeAvailable: false
        };

        // Check if nvidia-smi is available
        try {
            const output = execSync('nvidia-smi --query-gpu=name,memory.total,memory.used,temperature.gpu,utilization.gpu --format=csv,noheader,nounits', { encoding: 'utf8' });
            const lines = output.trim().split('\n');
            if (lines.length > 0 && lines[0] !== '') {
                const [name, memTotal, memUsed, temp, util] = lines[0].split(', ');
                gpuInfo = {
                    detected: true,
                    name: name,
                    memory: `${memUsed} MB / ${memTotal} MB`,
                    temperature: `${temp}°C`,
                    utilization: `${util}%`,
                    runtimeAvailable: true
                };
            }
        } catch (err) {
            // nvidia-smi not available, check environment variables
            if (nvidiaDevices || cudaDevices) {
                gpuInfo.detected = true;
                gpuInfo.name = 'GPU Environment Detected';
                gpuInfo.runtimeAvailable = true;
            }
        }

        return gpuInfo;
    } catch (error) {
        return {
            detected: false,
            name: 'N/A',
            memory: 'N/A',
            temperature: 'N/A',
            utilization: 'N/A',
            runtimeAvailable: false
        };
    }
}

// System information function
function getSystemInfo() {
    return {
        hostname: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),
        cpuCores: os.cpus().length,
        totalMemory: Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB',
        freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB',
        uptime: Math.round(os.uptime() / 3600) + ' hours',
        nodeVersion: process.version,
        startTime: new Date().toLocaleString()
    };
}

// Routes
app.get('/', (req, res) => {
    const gpuInfo = getGPUInfo();
    const systemInfo = getSystemInfo();
    
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Docker Offload Demo with GPU</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: #ffffff;
                color: #333;
                line-height: 1.6;
                min-height: 100vh;
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 40px 20px;
            }
            
            .header {
                text-align: center;
                margin-bottom: 40px;
                padding: 30px 0;
                border-bottom: 2px solid #f0f0f0;
            }
            
            .header h1 {
                font-size: 2.5rem;
                font-weight: 300;
                color: #2c3e50;
                margin-bottom: 10px;
            }
            
            .whale-icon {
                font-size: 3rem;
                color: #0db7ed;
                margin-bottom: 20px;
            }
            
            .status-bar {
                display: flex;
                gap: 20px;
                margin-bottom: 40px;
                flex-wrap: wrap;
            }
            
            .status-item {
                flex: 1;
                min-width: 200px;
                padding: 20px;
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                text-align: center;
            }
            
            .status-success {
                border-left: 4px solid #28a745;
            }
            
            .status-warning {
                border-left: 4px solid #ffc107;
            }
            
            .status-icon {
                font-size: 1.5rem;
                margin-bottom: 10px;
            }
            
            .status-title {
                font-weight: 600;
                margin-bottom: 5px;
                color: #495057;
            }
            
            .status-text {
                font-size: 0.9rem;
                color: #6c757d;
            }
            
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 30px;
                margin-bottom: 40px;
            }
            
            .card {
                background: #ffffff;
                border: 1px solid #e9ecef;
                border-radius: 12px;
                padding: 30px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                transition: box-shadow 0.3s ease;
            }
            
            .card:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            
            .card-header {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #f0f0f0;
            }
            
            .card-icon {
                font-size: 1.5rem;
                margin-right: 12px;
                color: #495057;
            }
            
            .card-title {
                font-size: 1.2rem;
                font-weight: 600;
                color: #2c3e50;
            }
            
            .info-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 12px;
                padding: 8px 0;
                border-bottom: 1px solid #f8f9fa;
            }
            
            .info-row:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }
            
            .info-label {
                font-weight: 500;
                color: #495057;
            }
            
            .info-value {
                color: #6c757d;
                font-family: 'Monaco', 'Menlo', monospace;
                font-size: 0.9rem;
            }
            
            .success {
                color: #28a745;
                font-weight: 600;
            }
            
            .warning {
                color: #ffc107;
                font-weight: 600;
            }
            
            .error {
                color: #dc3545;
                font-weight: 600;
            }
            
            .footer {
                text-align: center;
                margin-top: 40px;
                padding: 20px;
                border-top: 1px solid #e9ecef;
                color: #6c757d;
                font-size: 0.9rem;
            }
            
            @media (max-width: 768px) {
                .container {
                    padding: 20px 15px;
                }
                
                .header h1 {
                    font-size: 2rem;
                }
                
                .status-bar {
                    flex-direction: column;
                }
                
                .grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="whale-icon">🐋</div>
                <h1>Docker Offload Demo with GPU</h1>
            </div>
            
            <div class="status-bar">
                <div class="status-item status-success">
                    <div class="status-icon">✅</div>
                    <div class="status-title">Docker Offload Status</div>
                    <div class="status-text">This container is running in the cloud</div>
                </div>
                
                <div class="status-item ${gpuInfo.runtimeAvailable ? 'status-success' : 'status-warning'}">
                    <div class="status-icon">${gpuInfo.runtimeAvailable ? '🚀' : '⚠️'}</div>
                    <div class="status-title">GPU Support</div>
                    <div class="status-text">${gpuInfo.runtimeAvailable ? 'GPU runtime detected' : 'GPU runtime not available'}</div>
                </div>
            </div>
            
            <div class="grid">
                <div class="card">
                    <div class="card-header">
                        <div class="card-icon">⚡</div>
                        <div class="card-title">GPU Test Results</div>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Status:</span>
                        <span class="info-value ${gpuInfo.detected ? 'success' : 'error'}">
                            ${gpuInfo.detected ? '✅ Success' : '❌ No GPU'}
                        </span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Message:</span>
                        <span class="info-value">${gpuInfo.detected ? 'GPU Environment Active' : 'No GPU detected'}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Details:</span>
                        <span class="info-value">${gpuInfo.detected ? 'GPU runtime environment detected' : 'No GPU runtime available'}</span>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="card-icon">💻</div>
                        <div class="card-title">System Info</div>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Hostname:</span>
                        <span class="info-value">${systemInfo.hostname}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Platform:</span>
                        <span class="info-value">${systemInfo.platform}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Architecture:</span>
                        <span class="info-value">${systemInfo.architecture}</span>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="card-icon">⚡</div>
                        <div class="card-title">Resources</div>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">CPU Cores:</span>
                        <span class="info-value">${systemInfo.cpuCores}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Total Memory:</span>
                        <span class="info-value">${systemInfo.totalMemory}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Free Memory:</span>
                        <span class="info-value">${systemInfo.freeMemory}</span>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="card-icon">🎮</div>
                        <div class="card-title">GPU Information</div>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Name:</span>
                        <span class="info-value">${gpuInfo.name}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Memory:</span>
                        <span class="info-value">${gpuInfo.memory}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Temperature:</span>
                        <span class="info-value">${gpuInfo.temperature}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Utilization:</span>
                        <span class="info-value">${gpuInfo.utilization}</span>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="card-icon">🕒</div>
                        <div class="card-title">Runtime Info</div>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Uptime:</span>
                        <span class="info-value">${systemInfo.uptime}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Node.js:</span>
                        <span class="info-value">${systemInfo.nodeVersion}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Started:</span>
                        <span class="info-value">${systemInfo.startTime}</span>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="card-icon">🌐</div>
                        <div class="card-title">Network</div>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Port:</span>
                        <span class="info-value">3000</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Environment:</span>
                        <span class="info-value">${process.env.NODE_ENV || 'development'}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Access:</span>
                        <span class="info-value">http://localhost:3000</span>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>Docker Offload Demo - Running in the cloud with seamless local workflow</p>
            </div>
        </div>
        
        <script>
            // Auto-refresh GPU stats every 30 seconds
            setInterval(() => {
                fetch('/gpu')
                    .then(response => response.json())
                    .then(data => {
                        // Update GPU information if needed
                        console.log('GPU Status:', data);
                    })
                    .catch(err => console.log('Error fetching GPU data:', err));
            }, 30000);
        </script>
    </body>
    </html>
    `;
    
    res.send(html);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// GPU information endpoint
app.get('/gpu', (req, res) => {
    const gpuInfo = getGPUInfo();
    res.json(gpuInfo);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Docker Offload Demo app listening at http://localhost:${port}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('GPU Support:', getGPUInfo().detected ? 'Available' : 'Not Available');
});
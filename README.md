# Docker Offload Demo - Enhanced UI 🚀

<img width="1268" height="950" alt="image" src="https://github.com/user-attachments/assets/9f3f62f8-7638-4037-b880-987ce325bf92" />


A Node.js web application demonstrating Docker Offload functionality with GPU support and a **bold, professional user interface**.

## ✨ Enhanced Features

### 🎨 **Bold, Professional Design**
- **3px solid borders** with gradient accent strips
- **Professional color palette** with hover effects
- **Enhanced card layouts** with improved visual hierarchy
- **Responsive grid system** that adapts to all screen sizes
- **Smooth animations** and transitions throughout

### 🔧 **Improved Functionality**
- **Real-time API updates** every 30 seconds
- **Enhanced GPU detection** with multiple fallback methods
- **Better error handling** and status indicators
- **Memory usage visualization** with progress bars
- **Auto-refresh countdown** with visual feedback

## 🚀 Quick Start

### Standard Mode
```bash
docker build -t docker-offload-demo-enhanced .
docker run --rm -p 3000:3000 docker-offload-demo-enhanced
```

### GPU Mode (Recommended)
```bash
docker build -t docker-offload-demo-enhanced .
docker run --rm --gpus all -p 3000:3000 docker-offload-demo-enhanced
```

### Access the Application
Open your browser: **http://localhost:3000**

## 📊 What You'll See

The enhanced interface shows:
- ✅ **Bold Status Cards**: Docker Offload and GPU status with clear indicators
- 🖥️ **System Information**: Hostname, platform, architecture details
- ⚡ **Resource Metrics**: CPU cores, memory usage with progress bars
- 🎮 **GPU Details**: Name, memory, temperature, utilization
- ⏱️ **Runtime Info**: Uptime, Node.js version, start time
- 🌐 **Network Status**: Port and access information

## 🔌 API Endpoints

- `/` - Main web interface
- `/api/status` - JSON status data
- `/health` - Health check endpoint

## 🛠️ Development

```bash
npm install
npm start
```

---

**Enhanced with ❤️ for the Docker community**

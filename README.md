# Docker Offload Demo Web App

A Node.js web application demonstrating Docker Offload functionality with GPU support.

## Quick Start with Docker Offload

### Prerequisites
- Docker Desktop 4.43+
- Docker Offload subscription and setup

### Step 1: Start Docker Offload
```bash
# Start Docker Offload
docker offload start

# Optional: Enable GPU support when prompted
# This will use an NVIDIA L4 GPU instance
```

### Step 2: Build and Run the Demo

#### Basic Demo (CPU only)
```bash
# Build the image (happens in the cloud!)
docker build -t docker-offload-demo .

# Run the container
docker run --rm -p 3000:3000 docker-offload-demo
```

#### GPU-Enabled Demo
```bash
# Build the image with GPU support
docker build -t docker-offload-demo .

# Run with GPU access (requires GPU-enabled Docker Offload)
docker run --rm --gpus all -p 3000:3000 docker-offload-demo
```

### Step 3: View the Demo
Open your browser and go to: `http://localhost:3000`

You'll see a web interface showing:
- ✅ Docker Offload confirmation
- 🚀 GPU status and information (if enabled)
- 🖥️ Cloud instance system details
- ⚡ Resource utilization (CPU, memory, GPU)
- 🕒 Runtime information
- 🌐 Network status

### Step 4: Stop Docker Offload
```bash
docker offload stop
```

## GPU Features

### What the GPU Demo Shows
- **GPU Detection**: Automatically detects NVIDIA GPUs
- **GPU Information**: Name, memory usage, temperature, utilization
- **GPU Tests**: Runs simple GPU computation tests
- **Live Monitoring**: Auto-refreshes GPU stats every 30 seconds
- **Environment Detection**: Shows if GPU runtime is available

### GPU Commands Comparison

| Command | Description | GPU Support |
|---------|-------------|-------------|
| `docker run --rm hello-world` | Basic test | ❌ No |
| `docker run --rm --gpus all hello-world` | GPU test | ✅ Yes |
| `docker run --rm -p 3000:3000 docker-offload-demo` | Web demo | ❌ No |
| `docker run --rm --gpus all -p 3000:3000 docker-offload-demo` | Web demo with GPU | ✅ Yes |

## API Endpoints

- `GET /` - Main web interface
- `GET /health` - Health check (JSON)
- `GET /gpu` - GPU information (JSON)

## What This Demonstrates

1. **Cloud Build Performance**: Docker builds execute in the cloud with faster resources
2. **GPU Acceleration**: When enabled, containers run on NVIDIA L4 GPUs
3. **Seamless Experience**: Local Docker commands work transparently with cloud resources
4. **Resource Monitoring**: Real-time view of cloud instance specifications
5. **Environment Detection**: Clear indication of GPU availability and status

## Files Included

- `app.js` - Main Node.js application with GPU detection
- `package.json` - Dependencies and scripts
- `Dockerfile` - Container configuration
- `README.md` - Documentation

## Adding to Docker Offload Documentation

Perfect examples for the quickstart guide:

### Basic Web Demo
```console
$ docker build -t demo-app .
$ docker run --rm -p 3000:3000 demo-app
```

### GPU Web Demo
```console
$ docker build -t demo-app .
$ docker run --rm --gpus all -p 3000:3000 demo-app
```

Then visit `http://localhost:3000` to see:
- Cloud system information
- GPU status and specifications (when enabled)
- Live resource monitoring
- Visual confirmation of Docker Offload functionality

## GPU Environment Variables

The app detects GPU availability through:
- `NVIDIA_VISIBLE_DEVICES`
- `CUDA_VISIBLE_DEVICES`
- `nvidia-smi` command availability

## Performance Benefits

- **Faster Builds**: Cloud resources accelerate Docker builds
- **GPU Acceleration**: NVIDIA L4 GPUs for compute-intensive workloads
- **No Local Resource Usage**: Preserves local CPU/memory/GPU for other tasks
- **Scalable Resources**: Access to cloud-scale compute power
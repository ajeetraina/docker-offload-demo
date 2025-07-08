# Docker Demo Web App

A simple Node.js web application to demonstrate Docker Cloud functionality.

## Quick Start 

### Prerequisites
- Docker Desktop 4.43+
- Docker Offload subscription and setup

### Step 1: Start Docker Offload
```bash
docker offload start
```

### Step 2: Build and Run the Demo
```bash
# Build the image (this will happen in the cloud!)
docker build -t docker-offload-demo .

# Run the container
docker run --rm -p 3000:3000 docker-offload-demo
```

### Step 3: View the Demo
Open your browser and go to: `http://localhost:3000`

You'll see a beautiful web interface showing:
- ✅ Confirmation that Docker Offload is working
- 🖥️ System information from the cloud instance
- ⚡ Resource details (CPU, memory)
- 🕒 Runtime information
- 🌐 Network status

### Alternative: One-liner Demo
```bash
# Build and run in one command
docker run --rm -p 3000:3000 $(docker build -q .)
```

### Step 4: Stop Docker Offload
When you're done:
```bash
docker offload stop
```

## What This Demonstrates

This demo shows that:
1. **Build happens in the cloud** - The `docker build` command executes remotely
2. **Container runs in cloud** - System info shows cloud instance details
3. **Local experience** - Port forwarding works seamlessly
4. **Performance** - Faster builds with cloud resources

## Files Included

- `app.js` - Main Node.js application
- `package.json` - Dependencies and scripts
- `Dockerfile` - Container configuration
- `README.md` - This documentation

## Adding to Docker Offload Documentation

You can add this example to your quickstart guide:

```console
# Demo with a web application
$ docker build -t demo-app .
$ docker run --rm -p 3000:3000 demo-app
```

Then visit `http://localhost:3000` to see the running application with cloud system information.

## Health Check

The app includes a health endpoint at `/health` that returns JSON status information, useful for monitoring and testing.

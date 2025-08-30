FROM python:3.12-slim

# Install system dependencies (nmap + build tools)
RUN apt-get update && apt-get install -y \
    nmap gcc g++ make pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy requirements first (for better caching)
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Expose API port
EXPOSE 8000

# Run the FastAPI app (no --reload in production, but good for dev)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

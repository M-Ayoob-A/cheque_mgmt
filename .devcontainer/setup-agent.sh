#!/bin/bash

echo "Starting sovereign AI environment setup..."

# 1. Install Ollama inside the Codespace container
curl -fsSL https://ollama.com | sh

# 2. Start the Ollama background daemon runner
ollama serve > /dev/null 2>&1 &

# Wait briefly for the Ollama server to wake up
sleep 5

# 3. Pull the highly-optimized European engineering model (Codestral)
echo "Downloading Codestral 7B (Mistral AI)..."
ollama pull codestral:7b

# 4. Install the open-source OpenCode CLI agent globally
echo "Installing OpenCode CLI agent..."
sudo npm install -g @open-code/agent

# 5. AUTOMATION ADDITION: Permanently inject variables into the terminal profile
echo 'export OPENAI_API_BASE="http://localhost:11434/v1"' >> ~/.bashrc
echo 'export OPENAI_API_KEY="ollama"' >> ~/.bashrc

echo "Setup complete! Your containerized local pipeline is ready."
# Now run 'opencode --model codestral:7b'
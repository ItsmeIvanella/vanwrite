# vanwrite

A CLI writing tool for writers. Built by Vanechkinn.

## Features

- `copy` — generate polished copy from a prompt
- `outline` — build an essay outline from an idea
- `headline` — get 5 headline options for your draft
- `check` — flag over-explanation in your writing

## Setup

**1. Clone the repo**
git clone https://github.com/ItsmeIvanella/vanwrite.git
cd vanwrite
npm install

**2. Get a free API key**
Go to openrouter.ai/keys and create a free account. No credit card needed.

**3. Set your key**
export OPENROUTER_API_KEY=your_key_here

Add that line to ~/.bashrc to make it permanent.

**4. Run vanwrite**
vanwrite copy "write a tagline for my brand"
vanwrite outline "an essay about building alone"
vanwrite headline "my draft idea here"
vanwrite check "paste your draft here"

## Built with
- Node.js
- OpenRouter free tier
- Mistral AI

## Author
Vanechkinn — itsmeivanella.github.io

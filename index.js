#!/usr/bin/env node
const https = require('https');
const readline = require('readline');

const API_KEY = process.env.OPENROUTER_API_KEY;

if (!API_KEY) {
  console.log('Error: Set your API key first.');
  console.log('Run: export OPENROUTER_API_KEY=your_key_here');
  process.exit(1);
}

const args = process.argv.slice(2);
const command = args[0];
const input = args.slice(1).join(' ');

const SYSTEM_PROMPT = `You are vanwrite, a writing assistant for Ivan Cruz (Vanechkinn) — a Filipino copywriter and essayist. Your writing style is restrained, specific, and emotionally precise. You avoid over-explanation. You write clean, direct copy that trusts the reader.`;

const commands = {
  copy: `Write polished copy based on this prompt. Be concise and direct.`,
  outline: `Generate a Substack essay outline based on this idea. Use 4-6 sections with brief descriptions.`,
  headline: `Generate 5 headline options for this draft or idea. Vary the angles.`,
  check: `Review this draft. Flag moments of over-explanation or where trust in the reader breaks down. Be specific.`
};

if (!command || !commands[command]) {
  console.log('\nvanwrite — a CLI tool for writers\n');
  console.log('Commands:');
  console.log('  node index.js copy "your prompt here"');
  console.log('  node index.js outline "your essay idea"');
  console.log('  node index.js headline "your draft or idea"');
  console.log('  node index.js check "paste your draft here"');
  process.exit(0);
}

if (!input) {
  console.log(`Usage: node index.js ${command} "your input here"`);
  process.exit(1);
}

console.log(`\nvanwrite is thinking...\n`);

const body = JSON.stringify({
  model: 'mistralai/mistral-small-3.1-24b-instruct',
  messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: `${commands[command]}\n\n${input}` }
  ]
});

const options = {
  hostname: 'openrouter.ai',
  path: '/api/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    'HTTP-Referer': 'https://github.com/vanechkinn/vanwrite',
    'X-Title': 'vanwrite'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const result = json.choices?.[0]?.message?.content;
      if (result) {
        console.log('─'.repeat(40));
        console.log(result);
        console.log('─'.repeat(40));
      } else {
        console.log('Error:', JSON.stringify(json));
      }
    } catch (e) {
      console.log('Parse error:', e.message);
    }
  });
});

req.on('error', (e) => console.log('Request error:', e.message));
req.write(body);
req.end();

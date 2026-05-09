const fs = require('fs');
const http = require('http');
const path = require('path');

const PORT = process.env.PORT || 4500;
const HOST = process.env.HOST || '127.0.0.1';
const TOKEN = process.env.MEMMAP_TOKEN;
const INPUT = process.argv[2];

if (!INPUT) {
  console.error('Usage: node import_mem_map.js <graph.json>');
  process.exit(1);
}

const abs = path.resolve(INPUT);
const payload = fs.readFileSync(abs, 'utf8');

const req = http.request({
  hostname: HOST,
  port: PORT,
  path: '/api/import',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    ...(TOKEN ? { 'x-memmap-token': TOKEN } : {})
  }
}, (res) => {
  let body = '';
  res.on('data', c => (body += c));
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Import complete');
      console.log(body);
    } else {
      console.error(`❌ Import failed (${res.statusCode})`);
      console.error(body);
      process.exitCode = 1;
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Connection error: ${e.message}`);
  process.exitCode = 1;
});

req.write(payload);
req.end();

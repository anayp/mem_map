const http = require('http');
const path = require('path');

const PORT = process.env.PORT || 4500;
const HOST = process.env.HOST || '127.0.0.1';
const TARGET_PATH = process.argv[2] || '.';

const payload = JSON.stringify({
  path: path.resolve(TARGET_PATH)
});

const options = {
  hostname: HOST,
  port: PORT,
  path: '/api/scan',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length
  }
};

console.log(`Extensions Scan Client: Syncing '${TARGET_PATH}' to Memory Map...`);

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Scan complete! Memory Map updated.');
      try {
        const json = JSON.parse(body);
        console.log(`   Board Version: ${json.board_version}`);
        console.log(`   Nodes: ${json.content.nodes.length}`);
        console.log(`   Edges: ${json.content.edges.length}`);
      } catch (e) { /* ignore */ }
    } else {
      console.error(`❌ Scan failed (Status ${res.statusCode}): ${body}`);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Connection error: ${e.message}`);
  console.error(`   Is the scanner running? Try: npm start`);
});

req.write(payload);
req.end();

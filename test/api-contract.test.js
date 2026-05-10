const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');

const HOST = '127.0.0.1';
const PORT = 4511;

async function req(path, method, body) {
  const res = await fetch(`http://${HOST}:${PORT}${path}`, {
    method,
    headers: { 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = null; }
  return { status: res.status, json, text };
}

let server;
test.before(async () => {
  server = spawn('node', ['mem_map/server.js'], { env: { ...process.env, HOST, PORT: String(PORT), MEMMAP_MAX_IMPORT_NODES: '1' } });
  await new Promise(r => setTimeout(r, 500));
});

test.after(() => { if (server) server.kill('SIGTERM'); });

test('scan save persists and import works', async () => {
  const scan = await req('/api/scan', 'POST', { path: '.', save: true });
  assert.equal(scan.status, 200);

  const imported = await req('/api/import', 'POST', {
    nodes: [{ id: 'a', type: 'FILE', payload: { path: 'a' } }, { id: 'b', type: 'FILE', payload: { path: 'b' } }],
    edges: [{ from: 'a', to: 'b', type: 'LINKS' }]
  });
  assert.equal(imported.status, 200);
  assert.equal(imported.json.ok, true);
  assert.equal(imported.json.report.imported_nodes, 1);
  assert.equal(Array.isArray(imported.json.report.warnings), true);

  const dryRun = await req('/api/import', 'POST', {
    nodes: [{ id: 'c' }, { id: 'd' }],
    edges: [{ from: 'c', to: 'd' }],
    options: { dry_run: true }
  });
  assert.equal(dryRun.status, 200);
  assert.equal(dryRun.json.dry_run, true);

  const ctx = await req('/api/context', 'GET');
  assert.equal(ctx.status, 200);
  assert.equal(Array.isArray(ctx.json.content.nodes), true);
  assert.equal(ctx.json.content.nodes.length >= 1, true);
});

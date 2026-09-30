import { spawnSync } from 'node:child_process';
const result = spawnSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build', '--config', 'vite.pages.config.ts'], {
  stdio: 'inherit', env: process.env,
});
process.exit(result.status ?? 1);

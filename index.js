#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { cpSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const targetDir = process.argv[2] || 'my-unbundled-lib';

if (existsSync(targetDir)) {
  console.error(`❌ Directory "${targetDir}" already exists.`);
  process.exit(1);
}

cpSync(join(__dirname, 'template'), targetDir, { recursive: true });
console.log(`✅ Created unbundled browser library in ./${targetDir}`);

#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { cpSync, existsSync, readFileSync, writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const targetDir = process.argv[2] || 'my-unbundled-lib';

if (existsSync(targetDir)) {
  console.error(`❌ Directory "${targetDir}" already exists.`);
  process.exit(1);
}

cpSync(join(__dirname, 'template'), targetDir, { recursive: true });
console.log(`✅ Created unbundled browser library in ./${targetDir}`);

const pkgPath = join(targetDir, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.name = targetDir;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

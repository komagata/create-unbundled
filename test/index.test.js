#!/usr/bin/env node

import { strict as assert } from 'assert';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'fs';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, '..');
const cliPath = join(packageRoot, 'index.js');

// Create a temporary directory for testing
const tempDir = mkdtempSync(join(tmpdir(), 'create-unbundled-test-'));
console.log(`Created temporary test directory: ${tempDir}`);

try {
  // Test 1: Successfully create a new project
  const projectName = 'test-lib';
  const projectPath = join(tempDir, projectName);
  
  console.log(`\nTest 1: Creating a new project at ${projectPath}`);
  execSync(`node ${cliPath} ${projectPath}`, { stdio: 'inherit' });
  
  // Verify that the project was created correctly
  assert.equal(existsSync(projectPath), true, 'Project directory should exist');
  assert.equal(existsSync(join(projectPath, 'package.json')), true, 'package.json should exist');
  assert.equal(existsSync(join(projectPath, 'src', 'index.js')), true, 'src/index.js should exist');
  
  // Verify content of the main file
  const mainFileContent = readFileSync(join(projectPath, 'src', 'index.js'), 'utf8');
  assert.equal(mainFileContent.includes('export function hello'), true, 'src/index.js should contain the hello function');
  
  console.log('✅ Test 1 passed: Project created successfully');
  
  // Test 2: Error when directory already exists
  console.log('\nTest 2: Testing error when directory already exists');
  try {
    execSync(`node ${cliPath} ${projectPath}`, { stdio: 'pipe' });
    assert.fail('Should have thrown an error when directory already exists');
  } catch (error) {
    // Expected error
    assert.equal(error.status, 1, 'Process should exit with code 1');
    console.log('✅ Test 2 passed: Error thrown when directory already exists');
  }
  
  console.log('\nAll tests passed! 🎉');
} finally {
  // Clean up: remove the temporary directory
  console.log(`\nCleaning up: removing ${tempDir}`);
  rmSync(tempDir, { recursive: true, force: true });
}

const { execSync } = require('child_process');
const fs = require('fs');

const messageFile = process.argv[2];

try {
  const message = execSync('npx cz --no-verify', { stdio: ['inherit', 'pipe', 'inherit'] }).toString();
  fs.writeFileSync(messageFile, message);
} catch (err) {
  console.error('Commitizen hook failed:', err);
  process.exit(1);
}

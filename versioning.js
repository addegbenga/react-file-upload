const fs = require("fs");
const semver = require("semver");

// Read the current version from package.json
const packageJson = fs.readFileSync("./package.json");
const { version } = JSON.parse(packageJson);

// Get the commit message from the command line argument
const commitMessage = process.argv[2];

// Extract the release type and commit message from the commit message
const releaseTypeMatch = commitMessage.match(/^(patch|minor|major):\s*(.*)/);
const releaseType = releaseTypeMatch ? releaseTypeMatch[1] : null;
const commitMessageText = releaseTypeMatch ? releaseTypeMatch[2] : null;

// Check if a valid release type and commit message are provided
if (!releaseType || !commitMessageText) {
  console.error(
    'Invalid commit message format. Please use the format "<release-type>: <commit-message>"'
  );
  process.exit(1);
}

// Increment the version based on the release type
const nextVersion = semver.inc(version, releaseType);

if (!nextVersion) {
  console.error(
    'Invalid release type. Please specify "patch", "minor", or "major" in your commit message.'
  );
  process.exit(1);
}

// Update the package.json with the new version
const updatedPackageJson = { ...JSON.parse(packageJson), version: nextVersion };
fs.writeFileSync("./package.json", JSON.stringify(updatedPackageJson, null, 2));

console.log(`Version updated: ${version} → ${nextVersion}`);
console.log(`Commit message: ${commitMessageText}`);

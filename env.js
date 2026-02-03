// WARNING: Do not commit this file to a public repository with your API key!
// This file is for local development purposes only.

// This script simulates the process.env object found in Node.js environments
// to make the API_KEY available on the client-side for this demo.
window.process = {
  env: {
    API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
  },
};

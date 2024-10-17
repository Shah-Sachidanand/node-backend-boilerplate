const { exec } = require("child_process");
const nodemon = require("nodemon");

console.log("Starting TypeScript compilation...");

exec("npx tsc", (error, stdout, stderr) => {
  if (error) {
    // TypeScript errors might be in stdout, so check both stdout and stderr
    console.error(`❌ TypeScript build failed:\n${stdout || stderr}`);
    process.exit(1); // Exit with an error code
  }

  if (stderr) {
    // If there is anything in stderr, print it out (even if there's no error)
    console.error(`⚠️ Warning:\n${stderr}`);
  }

  console.log("✅ TypeScript build successful.");

  // Start the application with nodemon
  console.log("Starting the application...");
  nodemon({
    script: "dist/index.js", // Adjust this if your entry point is different
    ext: "js",
  });

  nodemon
    .on("start", () => {
      console.log("Application has started.");
    })
    .on("quit", () => {
      console.log("Application has quit.");
      process.exit();
    })
    .on("error", (err) => {
      console.error(`❌ Error: ${err}`);
      process.exit(1);
    });
});

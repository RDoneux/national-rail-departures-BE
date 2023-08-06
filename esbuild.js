const { build } = require("esbuild");

build({
  entryPoints: ["./src/index.ts"],
  outfile: "./public/index.js",
  loader: {
    ".ts": "ts",
    ".html": "text",
    ".txt": "text",
    ".js": "text",
    ".scss": "text",
  },
  platform: "node",
  minify: true,
  bundle: true,
})
  .then(() => {
    console.log("Javascript Successfully Built");
  })
  .catch((error) => {
    console.log(`exception on Javascript build: ${error}`);
    process.exit(1);
  });

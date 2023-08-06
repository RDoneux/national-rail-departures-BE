const esbuild = require("esbuild");
async function start() {
  const jsContext = await esbuild.context({
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
  });
  await jsContext.watch();
  console.log("Watching index.ts");
}
start();

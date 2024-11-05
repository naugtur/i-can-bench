const { readFile, readdir } = require("fs/promises");
const { benchAsync } = require("./index.js");

(async function run() {
  gc();

  let files = (await readdir(__dirname)).filter((file) => file !== ".git");
  files = files.concat(files, files, files)
  console.log(files);

  const result1 = await benchAsync(
    async () => {

      // Implementation 1
      for (const file of files) {
        await readFile(`${__dirname}/${file}`, "utf-8");
      }

      // Implementation 2

      // await Promise.all(
      //   files.map(async (file) => {
      //     await readFile(`${__dirname}/${file}`, "utf-8");
      //   })
      // );
    },
    "AsyncTest1",
    10000
  );

  console.log(result1);

})();

// index.js
const fetch = require("node-fetch");
const fs = require("fs");
const cron = require("node-cron");
const simpleGit = require("simple-git");

// 定义文件下载和保存的函数
async function downloadFile(url, filename) {
  const response = await fetch(url);
  const data = await response.text();
  fs.writeFileSync(filename, data);
  console.log(`Downloaded and saved: ${filename}`);
}

// 定义推送到Git的函数
async function pushToGit() {
  const git = simpleGit();
  await git.add("./*");
  await git.commit("Auto commit: Downloaded files");
  await git.push();
  console.log("Pushed to Git repository");
}

const task = async () => {
  console.log("Starting download and push process...");
  await downloadFile(
    "https://sublink.naiko.org/link/vzy9hEQkgTd9BJ2B?clash=1",
    "dist/tizi.yaml"
  );
  await downloadFile(
    "https://dingyue888.shop/link/O3UcSAW64Cnvaum1?clash=1",
    "dist/tizi1.yaml"
  );
  console.log("downloaded");
  await pushToGit();
  console.log("Process completed.");
};
task();

// 定时任务，每天凌晨1点执行
cron.schedule("0 1 * * *", async () => {
  task();
});

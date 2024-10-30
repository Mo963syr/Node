const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;
setTimeout(() => console.log("timer finish"), 0);
setImmediate(() => console.log("Immedite finish"));

fs.readFile("file.txt", () => {
  // executed 1
  console.log("i/o");
  console.log("-------");
  //excuted 4
  setTimeout(() => console.log("timer finish"), 0);
  setTimeout(() => console.log("timer2 finish AFTER 5 seconde"), 2000);
  //excuted 3
  setImmediate(() => console.log("Immedite finish"));
  // excuted 2
  process.nextTick(() => {
    console.log("nextTick");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "passowrd encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "passowrd encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "passowrd encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "passowrd encrypted");
  });
});
console.log("hello world");

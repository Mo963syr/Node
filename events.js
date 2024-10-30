const Event_Emitter = require("events");
const http = require("http");
class sales extends Event_Emitter {
  constructor() {
    super();
  }
}

const emitter = new sales();

emitter.on("newsale", (stok) => {
  console.log(`here we go to ${stok} `);
});

emitter.emit("newsale", 5);

//////
const server = http.createServer();
server.on("request", (req, res) => {
  console.log("dsndf");
  console.log(req.url);
  res.end("requested1");
});
server.on("request", (req, res) => {
  console.log("dsndf");

});
server.on("close", (req, res) => {
  console.log("server is closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for request ");
});

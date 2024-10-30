const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //sulotion 1
  //   fs.readFile("file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);

  //   });

  //sulotion2
  // const  readable =fs.createReadStream('filee.txt');
  // readable.on('data',chunk=>{

  //     res.write(chunk);
  // })
  // readable.on('end',()=>{

  //     res.end();
  // })
  // readable.on('error',err=>{
  //     console.log(err);
  //     res.statusCode=500;
  //     res.end('file not found');
  // });
  //sulotion 3
  const readable = fs.createReadStream("filee.txt");
  readable.pipe(res);
  //readableSource.pipe(writeableDist)
  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("file not found");
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listining.......");
});

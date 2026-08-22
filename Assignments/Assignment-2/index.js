const path = require("node:path");
const fs = require("node:fs");
const EventEmitter = require("node:events");
const { arch, platform } = require("node:os");
const zlib = require("zlib");
const { pipeline } = require("stream");
const http = require("node:http");

//q1.
// (function () {
//     console.log("File : "+ __filename + " , Dir : " +__dirname);
// })()
//----------------------------------------------------------------------------

//q2.
// function pName(p) {
//     return console.log(path.basename(p));
// }
// pName("/user/files/report.pdf")
//----------------------------------------------------------------------------

//q3.
// function bPath(obj){
//     return console.log(path.format(obj));
// }

// bPath( {
//         dir:"/folder",
//         name:"app",
//         ext:".js"
//         } )
//----------------------------------------------------------------------------

//q4.
// console.log(
//     path.extname("/docs/readme.md")
// );
//----------------------------------------------------------------------------

//q5.
// ( {name : fName , ext } = path.parse( "/home/app/main.js" ) )
// console.log( "Name : "+fName + ", Ext.: " + ext  );
//----------------------------------------------------------------------------

//q6.
// console.log(
//     path.isAbsolute("/home/user/file.txt")
// );
//----------------------------------------------------------------------------

//q7.
// console.log(
//     path.join("src", "components", "App.js")
// );
//----------------------------------------------------------------------------

//q8.
// console.log(
//     path.resolve("essay.txt")
// );
//----------------------------------------------------------------------------

//q9.
// console.log(
//     path.join("/folder1", "/folder2/file.txt")
// );
//----------------------------------------------------------------------------

//q10:
// function remove(){
//             fs.rm("./torm.txt", (err) => {
//             if(err) return console.log(err);    
//             else console.log("file deleted!");})
// }
// remove();

//----------------------------------------------------------------------------

//q11:
// fs.mkdirSync("./newfolder2", (e) => console.log(e))
//----------------------------------------------------------------------------

//q12:
// const myEmitter = new EventEmitter();
// myEmitter.on("start", () => {
//     console.log("Welcome event triggered!")
// })
// myEmitter.emit("start")
//----------------------------------------------------------------------------

//q13:
// myEmitter.on("login", (name) => {
//     console.log("user logged in : " + name);
// })

// myEmitter.emit("login", "adham")
//----------------------------------------------------------------------------

//q14:
// console.log(
//     fs.readFileSync("./notes1.txt", {encoding : "utf8"},(e) => console.log(e))
// );
//----------------------------------------------------------------------------

//q15:
// fs.writeFile("./notes1.txt", "adham", (e) => console.log(e))
//----------------------------------------------------------------------------

//q16:
// console.log(
//     fs.existsSync("./notes1.txt")
// );
//----------------------------------------------------------------------------

//q17:
// console.log(
//     "CPU : " + arch() + ", OS : " + platform()
// );

//q18:
// const stream = fs.createReadStream("./notes2.txt");
// stream.on("data", (chunk) => {
//     console.log(chunk);
// })

//q19:
// const readStream = fs.createReadStream("./notes1.txt");
// let writeStream = fs.createWriteStream("./copied.txt");

// readStream.on("open", () => {
//     console.log("file opened");
// })

// readStream.on("data", (chunk) => {
//     console.log("reading...");
//     writeStream.write(chunk)
// })

// readStream.on("end", () => {
//     console.log("ended");
// })

// readStream.on("close", () => {
//     console.log("file closed");
// })
// ===============
//using pipe :-
// readStream.pipe(writeStream)
//----------------------------------------------------------------------------

//q20:
// const readStream = fs.createReadStream("./notes1.txt");
// const gzip = zlib.createGzip();
// const writeStream = fs.createWriteStream("./copied.txt.gz");

// pipeline(
//     readStream,
//     gzip,
//     writeStream,
//     (err) => {
//         if (err) {
//             console.log("Pipeline failed:", err);
//         } else {
//             console.log("Compression complete!");
//         }
//     }
// );
//----------------------------------------------------------------------------

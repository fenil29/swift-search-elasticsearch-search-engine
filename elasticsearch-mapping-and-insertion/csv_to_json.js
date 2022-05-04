const fs = require("fs");
const csv = require("csv-parser");
var JSONStream = require("JSONStream");

let list = [];
fs.createReadStream("combine.csv")
  .pipe(csv())
  .on("data", function (data) {
    list.push(data);
    console.log(list.length);

    try {
      //perform the operation
    } catch (err) {
      //error handler
    }
  })
  .on("end", function () {
    //some final operation
    console.log(list.length);
    var transformStream = JSONStream.stringify();
    var outputStream = fs.createWriteStream(__dirname + "/combine.json");
    transformStream.pipe(outputStream);
    list.forEach(transformStream.write);
    console.log(list.length);

    transformStream.end();

    outputStream.on("finish", function handleFinish() {
      console.log("Done");
    });
  });

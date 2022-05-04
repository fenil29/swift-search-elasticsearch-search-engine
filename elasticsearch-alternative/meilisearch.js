const { MeiliSearch } = require("meilisearch");

const client = new MeiliSearch({
  host: "http://159.203.12.201",
  apiKey: "OTFhZjQ2ZWQwNmFiYjE1MTc5MzBhYjhi",
});

const index = client.index("database_1");
const fs = require("fs");
const readline = require("readline");
const fileStream = fs.createReadStream("books.json");

const rl = readline.createInterface({
  input: fileStream, //or fileStream
  // output: process.stdout,
});
let count = 0;
let temp = [];

const start = async () => {
  while (true) {
    const it = rl[Symbol.asyncIterator]();
    const line1 = await it.next();

    // console.log(line1);
    temp = [];
    for (let i = 0; i < 1000; ) {
      try {
        const line1 = await it.next();

        book_record = JSON.parse(line1.value);
        if (book_record.description) {
          count++;
          i++;
          book_record.shelves && delete book_record["shelves"];
          book_record.asin && delete book_record["asin"];
          book_record.field1 && delete book_record["field1"];
          book_record.description = book_record.description.replace(
            /<[^>]*>?/gm,
            ""
          );
          temp.push(book_record);
        }
      } catch (error) {
        console.log(error);
      }
    }
    let response = await index.addDocuments(temp);

    console.log(response); // => { "uid": 0 }
    console.log("----------------" + count);
    if (count > 15000000) {
      throw "Complete";
    }
  }
};

start();

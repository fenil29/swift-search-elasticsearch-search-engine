// Data set used https://www.kaggle.com/datasets/opalskies/large-books-metadata-dataset-50-mill-entries

const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://143.198.43.192:9200/" });
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
const readline = require("readline");
const fileStream = fs.createReadStream("books.json");

const rl = readline.createInterface({
  input: fileStream, //or fileStream
  // output: process.stdout,
});
let count = 0;
let currentRecord = [];
let maxRecordToInsert = 15000000;
let batchSize = 5000;
const start = async () => {
  while (true) {
    // file iterator
    const it = rl[Symbol.asyncIterator]();
    currentRecord = [];
    // reading record from file
    for (let i = 0; i < batchSize; ) {
      try {
        const line1 = await it.next();

        book_record = JSON.parse(line1.value);
        if (book_record.description) {
          count++;
          i++;
          // cleaning data
          book_record.shelves && delete book_record["shelves"];
          book_record.asin && delete book_record["asin"];
          book_record.field1 && delete book_record["field1"];
          book_record.description = book_record.description.replace(
            /<[^>]*>?/gm,
            ""
          );
          book_record["_uuid"] = uuidv4();
          currentRecord.push({
            create: {
              _index: "database_9",
            },
          });
          currentRecord.push(book_record);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // inserting it to elastic search
    await Promise.all([
      client.bulk({
        body: currentRecord,
      }),
    ]).then((values) => {});
    console.log(count + " : record successfully inserted");
    // stop execution when max number of inserted is inserted
    if (count > maxRecordToInsert) {
      throw "Complete";
    }
  }
};

start();

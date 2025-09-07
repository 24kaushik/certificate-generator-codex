import { Readable } from "stream";
import csv from "csv-parser";

export default function parseCSVBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const results = [];
    let headers = [];
    const stream = Readable.from(buffer.toString()); // convert buffer → stream

    stream
      .pipe(csv())
      .on("headers", (headerList) => {
        headers = headerList;
      })
      .on("data", (row) => results.push(row))
      .on("end", () => resolve({ headers, data: results }))
      .on("error", (err) => reject(err));
  });
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const pify = require("pify");
const writeFilep = pify(fs.writeFile);
async function writeAsync(profile, filename) {
  if (!filename) {
    filename = `heap-profile-${Date.now()}.heapprofile`;
  }
  await writeFilep(filename, JSON.stringify({ head: profile }));
  return filename;
}
exports.writeAsync = writeAsync;
//# sourceMappingURL=write.js.map

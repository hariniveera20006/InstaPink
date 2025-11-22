// remove-bom.js
const fs = require("fs");
const p = process.argv[2];
if (!p) { console.error("Usage: node remove-bom.js <path>"); process.exit(1); }
let buf = fs.readFileSync(p);
if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
  fs.writeFileSync(p, buf.slice(3));
  console.log("BOM removed from", p);
} else {
  console.log("No BOM found in", p);
}

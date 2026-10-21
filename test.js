const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { disc: discTruth, energy: energyTruth, spinup: spinupTruth, power: powerTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the mass must be from 0.01 to 10000 kg with at most two decimal places",
  "the radius must be from 0.01 to 100 m with at most two decimal places",
  "the speed must be from 0.01 to 1000 rad/s with at most two decimal places",
  "the torque must be from 0.01 to 100000 N m with at most two decimal places",
  "the inertia must be from 0.01 to 100000 kg m2 with at most two decimal places",
  "the energy must be from 0.01 to 100000000 J with at most two decimal places",
  "the time must be from 0.01 to 1000000 s with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);

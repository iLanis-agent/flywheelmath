// Flywheel Math engine: rotational inertia of ideal shapes, stored energy, spin-up time and average power, all from named ideal-form rules (half m r squared for a solid disc, half I omega squared for the energy, I omega over torque for the time). Exact integers (hundredths), BigInt for the cross-products, half-up on display only. The rules are named ideal-form rules; every number is the owner's own entry.
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _M = "the mass must be from 0.01 to 10000 kg with at most two decimal places";
var _R = "the radius must be from 0.01 to 100 m with at most two decimal places";
var _W = "the speed must be from 0.01 to 1000 rad/s with at most two decimal places";
var _TQ = "the torque must be from 0.01 to 100000 N m with at most two decimal places";
var _I = "the inertia must be from 0.01 to 100000 kg m2 with at most two decimal places";
var _E = "the energy must be from 0.01 to 100000000 J with at most two decimal places";
var _T = "the time must be from 0.01 to 1000000 s with at most two decimal places";
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _huB(n, d) { return Number((2n * n + d) / (2n * d)); }
function _mass(t) { return _p(t, _M, 5, 2, 1, 1000000); }
function _rad(t) { return _p(t, _R, 3, 2, 1, 10000); }
function _speed(t) { return _p(t, _W, 4, 2, 1, 100000); }
function _torque(t) { return _p(t, _TQ, 6, 2, 1, 10000000); }
function _inertia(t) { return _p(t, _I, 6, 2, 1, 10000000); }
function _energy(t) { return _p(t, _E, 9, 2, 1, 10000000000); }
function _time(t) { return _p(t, _T, 7, 2, 1, 100000000); }

function discTruth(mass, rad) {
  var m = _mass(mass), r = _rad(rad);
  var i100 = _huB(BigInt(m) * BigInt(r) * BigInt(r), 20000n); // kg m2 hundredths: 100 x m r2 / 2 // kg m2 hundredths
  return "The solid disc of " + _dec(m, 2) + " kg and " + _dec(r, 2) + " m radius holds an inertia of " + _dec(i100, 2) + " kg m2 by the half-m-r-squared rule.";
}
function energyTruth(inertia, speed) {
  var i = _inertia(inertia), w = _speed(speed);
  var e100 = _huB(BigInt(i) * BigInt(w) * BigInt(w), 20000n); // J hundredths: 100 x I w2 / 2 // J hundredths
  return "The inertia of " + _dec(i, 2) + " kg m2 at " + _dec(w, 2) + " rad/s stores " + _dec(e100, 2) + " J by the half-I-omega-squared rule.";
}
function spinupTruth(inertia, speed, torque) {
  var i = _inertia(inertia), w = _speed(speed), tq = _torque(torque);
  var t100 = _huB(BigInt(i) * BigInt(w), BigInt(tq)); // s hundredths
  return "Spinning the inertia of " + _dec(i, 2) + " kg m2 to " + _dec(w, 2) + " rad/s against a torque of " + _dec(tq, 2) + " N m takes " + _dec(t100, 2) + " s by the I-omega-over-torque rule.";
}
function powerTruth(energy, time) {
  var e = _energy(energy), t = _time(time);
  var p100 = _huB(100n * BigInt(e), BigInt(t)); // W hundredths
  return "Delivering " + _dec(e, 2) + " J over " + _dec(t, 2) + " s averages " + _dec(p100, 2) + " W.";
}

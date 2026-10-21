# Flywheel Math

Inertia, stored energy and spin-up arithmetic. The inertia of 0.2 kg m2 at 100 rad/s stores 1000 J by the half-I-omega-squared rule.

## What it computes

- **The inertia truth** - the inertia of a solid disc (mass 0.01 to 10000 kg, radius 0.01 to 100 m): half the mass times the radius squared, the named ideal-form rule.
- **The energy truth** - what a spinning inertia stores (inertia 0.01 to 100000 kg m2, speed 0.01 to 1000 rad/s): half the inertia times the speed squared.
- **The spin-up truth** - how long a constant torque (0.01 to 100000 N m) takes to spin an inertia to a speed: inertia times speed over torque.
- **The power truth** - the average power of delivering an energy (0.01 to 100000000 J) over a time: energy over time.

## Boundary

Arithmetic only. Named ideal-form rules, applied as written. It has not seen any wheel and does not know the material, the stress at the rim, the bearings or the balance, and it gives no verdict that a wheel spinning at the entered speed holds together. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, BigInt cross-products, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/flywheelmath/
Repo: https://github.com/iLanis-agent/flywheelmath

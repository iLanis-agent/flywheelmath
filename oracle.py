import json, random

def dec2(n):
    if n < 0: return "-" + dec2(-n)
    w, f = divmod(n, 100)
    s = str(w); fs = str(f).zfill(2).rstrip("0")
    return s + "." + fs if fs else s

def hu(num, den):
    return (2*num + den) // (2*den)

def disc(m, r):
    i100 = hu(m*r*r, 20000)  # hundredths: 100 x m r2 / 2
    return (f"The solid disc of {dec2(m)} kg and {dec2(r)} m radius holds an inertia of {dec2(i100)} kg m2 "
            f"by the half-m-r-squared rule.")
def energy(i, w):
    e100 = hu(i*w*w, 20000)  # hundredths: 100 x I w2 / 2
    return (f"The inertia of {dec2(i)} kg m2 at {dec2(w)} rad/s stores {dec2(e100)} J "
            f"by the half-I-omega-squared rule.")
def spinup(i, w, tq):
    t100 = hu(i*w, tq)
    return (f"Spinning the inertia of {dec2(i)} kg m2 to {dec2(w)} rad/s against a torque of {dec2(tq)} N m "
            f"takes {dec2(t100)} s by the I-omega-over-torque rule.")
def power(e, t):
    p100 = hu(100*e, t)
    return f"Delivering {dec2(e)} J over {dec2(t)} s averages {dec2(p100)} W."

random.seed(741)
cases = [
  dict(fn="disc", args=["10","0.2"], expect=disc(1000,20)),
  dict(fn="energy", args=["0.2","100"], expect=energy(20,10000)),
  dict(fn="spinup", args=["0.2","100","5"], expect=spinup(20,10000,500)),
  dict(fn="power", args=["1000","2"], expect=power(100000,200)),
]
for _ in range(25):
    m = random.randint(1,1000000); r = random.randint(1,10000)
    cases.append(dict(fn="disc", args=[dec2(m),dec2(r)], expect=disc(m,r)))
for _ in range(25):
    i = random.randint(1,10000000); w = random.randint(1,100000)
    cases.append(dict(fn="energy", args=[dec2(i),dec2(w)], expect=energy(i,w)))
for _ in range(20):
    i = random.randint(1,10000000); w = random.randint(1,100000); tq = random.randint(1,10000000)
    cases.append(dict(fn="spinup", args=[dec2(i),dec2(w),dec2(tq)], expect=spinup(i,w,tq)))
for _ in range(20):
    e = random.randint(1,10000000000); t = random.randint(1,100000000)
    cases.append(dict(fn="power", args=[dec2(e),dec2(t)], expect=power(e,t)))
errcases = [
  ["disc", ["0","0.2"]], ["disc", ["10","0"]], ["disc", ["10000.01","0.2"]],
  ["energy", ["0","100"]], ["energy", ["0.2","1000.01"]], ["energy", ["abc","100"]],
  ["spinup", ["0.2","100","0"]], ["spinup", ["0.2","0","5"]],
  ["power", ["0","2"]], ["power", ["1000","0"]],
  ["disc", ["10","100.01"]], ["power", ["100000000.01","2"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")

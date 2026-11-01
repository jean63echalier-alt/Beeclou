import numpy as np
from scipy.stats import norm
from blackjack_i18_sim import run
NSHOES, UNIT, N = 200_000, 10.0, 50_000
d = {"Base + I18": run(NSHOES, 1, procs=4), "I18 + no-bust si TC>1": run(NSHOES, 2, procs=4)}
print(f"{'TC':>4} | " + " | ".join(f"{k:>24}" for k in d))
for t in range(1, 8):
    row = []
    for tc, r in d.values():
        m = (tc == t) if t < 7 else (tc >= t)
        row.append(f"{r[m].mean()*100:+7.2f}% ±{r[m].std()/m.sum()**.5*100:.2f}".rjust(24))
    print(f"{t:>4} | " + " | ".join(row))
lut = np.array([{**{k: 1 for k in range(-128, 2)}, 2: 2, 3: 4, 4: 8}.get(t, 12) for t in range(-128, 128)], dtype=np.float32)
for name, (tc, r) in d.items():
    b = lut[tc.astype(int) + 128]; pnl = b * r * UNIT
    print(f"{name}: avantage global {(b*r).sum()/b.sum():+.2%} | EV 50k {pnl.mean()*N:,.0f}€ | σ {pnl.std()*N**.5:,.0f}€")

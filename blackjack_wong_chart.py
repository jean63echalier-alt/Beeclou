import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from scipy.stats import norm
from blackjack_i18_sim import run

NSHOES, UNIT, N, STEP = 200_000, 10.0, 50_000, 250
RAMP = {2: 2, 3: 4, 4: 8, 5: 12}   # mises quand on joue (TC>=2), TC>=5 -> 12u
tc, r = run(NSHOES, True, procs=4)
tot = len(r)

def analyse(min_tc, ramp=True):
    m = tc >= min_tc
    b = np.array([RAMP[min(t, 5)] if ramp else 1 for t in tc[m].astype(int)], dtype=np.float32)
    pnl = b * r[m] * UNIT
    return dict(freq=m.mean(), edge=(b * r[m]).sum() / b.sum(), ev=pnl.mean(), sd=pnl.std(),
                bet=b.mean() * UNIT, pnl=pnl)

print(f"Mains observées: {tot:,}")
print(f"{'Scénario':<34}{'%mains':>7}{'mise moy':>9}{'avantage':>9}{'EV/main':>9}{'σ/main':>8}"
      f"{'EV 50k':>9}{'σ 50k':>8}{'P(perte)':>9}{'mains à voir':>13}")
sc = {}
for name, mt, ramp in [("Jouer toujours (rampe 1-12u)", -99, None),
                       ("Wong TC>=+2, mise plate 1u", 2, False),
                       ("Wong TC>=+2, rampe 2-12u", 2, True),
                       ("Wong TC>=+3, rampe 4-12u", 3, True)]:
    if ramp is None:
        lut = np.array([ {**{k:1 for k in range(-128,2)}, 2:2,3:4,4:8}.get(t, 12) for t in range(-128,128)], dtype=np.float32)
        b = lut[tc.astype(int)+128]; pnl = b*r*UNIT
        s = dict(freq=1.0, edge=(b*r).sum()/b.sum(), ev=pnl.mean(), sd=pnl.std(), bet=b.mean()*UNIT, pnl=pnl)
    else: s = analyse(mt, ramp)
    sc[name] = s
    print(f"{name:<34}{s['freq']:>7.1%}{s['bet']:>8.1f}€{s['edge']:>+9.2%}{s['ev']:>8.3f}€{s['sd']:>7.1f}€"
          f"{s['ev']*N:>8,.0f}€{s['sd']*N**.5:>7,.0f}€{norm.cdf(-s['ev']*N**.5/s['sd']):>9.1%}{N/s['freq']:>13,.0f}")

# graphique : Wong TC>=+2, rampe 2-12u, 50 000 mains JOUÉES
s = sc["Wong TC>=+2, rampe 2-12u"]; rng = np.random.default_rng(5); P = 300
cum = np.concatenate([np.zeros((P, 1)), np.cumsum(rng.choice(s['pnl'], size=(P, N)), 1)], 1)[:, ::STEP]
x = np.arange(0, N + 1, STEP); ev = x * s['ev']; sg = s['sd'] * np.sqrt(x)
fig, (a1, a2) = plt.subplots(1, 2, figsize=(16, 7), gridspec_kw={"width_ratios": [2.2, 1]})
for p in cum: a1.plot(x, p, color="#1F77B4", alpha=.08, lw=.8)
for i, c in enumerate(["#FF7F0E", "#2CA02C", "#D62728"]): a1.plot(x, cum[i], color=c, lw=1.6, label=f"Run {i+1}")
a1.plot(x, ev, "k", lw=3, label="Espérance (EV)")
a1.plot(x, ev + 2*sg, "--", color="gray", label="±2σ"); a1.plot(x, ev - 2*sg, "--", color="gray")
a1.axhline(0, color="red", lw=1)
a1.set_title(f"Base + Illustrious 18, on ne joue qu'à TC ≥ +2 (back-counting) - avantage {s['edge']:+.2%}")
a1.set_xlabel("Nombre de mains JOUÉES"); a1.set_ylabel("Gains cumulés (€)"); a1.legend(); a1.grid(alpha=.3)
for n, col in [("Jouer toujours (rampe 1-12u)", "#888"), ("Wong TC>=+2, rampe 2-12u", "#D62728")]:
    q = sc[n]; a2.plot(x[1:], norm.cdf(-q['ev']*np.sqrt(x[1:])/q['sd'])*100, lw=2.5, color=col, label=n)
a2.set_title("Probabilité d'être en perte"); a2.set_xlabel("Nombre de mains jouées"); a2.set_ylabel("%")
a2.legend(fontsize=8); a2.grid(alpha=.3)
plt.tight_layout(); plt.savefig("blackjack_wong_chart.png", dpi=130)
print("Runs en perte à 50k:", (cum[:, -1] < 0).mean(), "| min/max:", cum[:, -1].min(), cum[:, -1].max())

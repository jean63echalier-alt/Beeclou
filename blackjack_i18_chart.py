import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from scipy.stats import norm
from blackjack_i18_sim import run

NSHOES, UNIT, N, STEP = 200_000, 10.0, 50_000, 250
RAMP = {1: 1, 2: 2, 3: 4, 4: 8, 5: 12}          # TC<=1 ->1u ... TC>=5 ->12u
def bet(tc): return np.vectorize(lambda t: RAMP[int(min(max(t, 1), 5))])(tc) if np.ndim(tc) else RAMP[int(min(max(tc,1),5))]
lut = np.array([RAMP[min(max(t, 1), 5)] for t in range(-128, 128)], dtype=np.float32)
def bets(tc): return lut[tc.astype(int) + 128]

data = {}
for name, dev in [("Stratégie de base", False), ("Base + Illustrious 18", True)]:
    data[name] = run(NSHOES, dev, procs=4)

print(f"{'TC':>4} {'freq':>7} | " + " | ".join(f"{n[:12]:>14}" for n in data))
tc_all, _ = data["Base + Illustrious 18"]
for t in range(-2, 8):
    row = []
    for n, (tc, r) in data.items():
        m = (tc == t) if t < 7 else (tc >= t)
        row.append(f"{r[m].mean()*100:+7.2f}% ±{r[m].std()/m.sum()**.5*100:.2f}")
    mm = (tc_all == t) if t < 7 else (tc_all >= t)
    print(f"{t:>4} {mm.mean()*100:6.1f}% | " + " | ".join(row))

stats = {}
for n, (tc, r) in data.items():
    b = bets(tc); ev_h = (b * r).sum() / len(r) * UNIT
    edge = (b * r).sum() / b.sum()
    sd_h = (b * r * UNIT).std()
    stats[n] = (ev_h, sd_h, edge)
    print(f"{n}: mise moy {b.mean()*UNIT:.1f}€ | avantage {edge:+.2%} | EV {ev_h:.3f}€/main | σ {sd_h:.1f}€/main "
          f"| EV 50k = {ev_h*N:,.0f}€ | σ 50k = {sd_h*N**.5:,.0f}€ | P(perte) = {norm.cdf(-ev_h*N**.5/sd_h):.1%}")

# --- graphique : trajectoires rééchantillonnées sur les vraies mains simulées (Base + I18)
rng = np.random.default_rng(3)
tc, r = data["Base + Illustrious 18"]; pnl = bets(tc) * r * UNIT
ev_h, sd_h, edge = stats["Base + Illustrious 18"]
P = 300
paths = np.cumsum(rng.choice(pnl, size=(P, N)), axis=1)
cum = np.concatenate([np.zeros((P, 1)), paths], 1)[:, ::STEP]
x = np.arange(0, N + 1, STEP); ev = x * ev_h; sg = sd_h * np.sqrt(x)
fig, (a1, a2) = plt.subplots(1, 2, figsize=(16, 7), gridspec_kw={"width_ratios": [2.2, 1]})
for p in cum: a1.plot(x, p, color="#1F77B4", alpha=.08, lw=.8)
for i, c in enumerate(["#FF7F0E", "#2CA02C", "#D62728"]): a1.plot(x, cum[i], color=c, lw=1.6, label=f"Run {i+1}")
a1.plot(x, ev, "k", lw=3, label="Espérance (EV)")
a1.plot(x, ev + 2*sg, "--", color="gray", label="±2σ"); a1.plot(x, ev - 2*sg, "--", color="gray")
a1.axhline(0, color="red", lw=1)
a1.set_title(f"Basique + Illustrious 18 (Hi-Lo, 6 jeux, S17, pén. 75 %) - avantage mesuré {edge:+.2%}")
a1.set_xlabel("Nombre de mains jouées"); a1.set_ylabel("Gains cumulés (€)"); a1.legend(); a1.grid(alpha=.3)
for n, col in [("Stratégie de base", "#888"), ("Base + Illustrious 18", "#D62728")]:
    e, s, _ = stats[n]; a2.plot(x[1:], norm.cdf(-e*x[1:]/(s*np.sqrt(x[1:]))) * 100, lw=2.5, color=col, label=n)
a2.set_title("Probabilité d'être en perte"); a2.set_xlabel("Nombre de mains"); a2.set_ylabel("%")
a2.legend(); a2.grid(alpha=.3)
plt.tight_layout(); plt.savefig("blackjack_i18_chart.png", dpi=130)
fin = cum[:, -1]; print("Runs finissant en perte:", (fin < 0).mean(), "| min/max:", fin.min(), fin.max())

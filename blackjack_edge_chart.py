import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from scipy.stats import norm

N, STEP, EDGE, SDF, UNIT = 50_000, 250, 0.015, 1.15, 10.0
probs = np.array([.75, .12, .07, .04, .02]); bets = np.array([1, 2, 4, 8, 12]) * UNIT
mean_bet = (probs * bets).sum(); ev_h = EDGE * mean_bet
sd_h = SDF * np.sqrt((probs * bets**2).sum())
rng = np.random.default_rng(7)
P = 300
b = rng.choice(bets, size=(P, N), p=probs)
res = b * EDGE + SDF * b * rng.standard_normal((P, N))
cum = np.concatenate([np.zeros((P, 1)), np.cumsum(res, 1)], 1)[:, ::STEP]
x = np.arange(0, N + 1, STEP); ev = x * ev_h; sg = sd_h * np.sqrt(x)

fig, (a1, a2) = plt.subplots(1, 2, figsize=(16, 7), gridspec_kw={"width_ratios": [2.2, 1]})
for p in cum: a1.plot(x, p, color="#1F77B4", alpha=.08, lw=.8)
for i, c in zip(range(3), ["#FF7F0E", "#2CA02C", "#D62728"]): a1.plot(x, cum[i], color=c, lw=1.6, label=f"Run {i+1}")
a1.plot(x, ev, "k", lw=3, label="Espérance (EV)")
a1.plot(x, ev + 2*sg, "--", color="gray", label="±2σ"); a1.plot(x, ev - 2*sg, "--", color="gray")
a1.axhline(0, color="red", lw=1)
a1.set_title(f"Blackjack - avantage {EDGE:.1%} : 300 trajectoires sur 50 000 mains")
a1.set_xlabel("Nombre de mains jouées"); a1.set_ylabel("Gains cumulés (€)"); a1.legend(); a1.grid(alpha=.3)

pl = norm.cdf(-ev[1:] / sg[1:])
a2.plot(x[1:], pl * 100, color="#D62728", lw=2.5, label="Théorique")
a2.plot(x[1:], (cum[:, 1:] < 0).mean(0) * 100, color="k", ls=":", label="Simulé (300 runs)")
a2.set_title("Probabilité d'être en perte"); a2.set_xlabel("Nombre de mains"); a2.set_ylabel("%")
a2.legend(); a2.grid(alpha=.3)
plt.tight_layout(); plt.savefig("blackjack_edge_chart.png", dpi=130)
fin = cum[:, -1]
print(f"EV={ev[-1]:.0f}€ σ={sg[-1]:.0f}€ | perte finale: {(fin<0).mean():.1%} (théo {pl[-1]:.1%}) | min {fin.min():.0f} max {fin.max():.0f}")
print("Perte à 5000 mains:", f"{pl[19]:.1%}", "| 10000:", f"{pl[39]:.1%}")

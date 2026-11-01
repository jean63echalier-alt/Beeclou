import numpy as np
from scipy.stats import norm
from blackjack_i18_sim import run
UNIT = 10.0
tc, r = run(200_000, 1, procs=4)
RAMP_ALL = {**{k: 1 for k in range(-128, 2)}, 2: 2, 3: 4, 4: 8}
def pnl(min_tc, ramp):
    m = tc >= min_tc
    b = np.array([ramp(int(t)) for t in tc[m]], dtype=np.float32)
    return m.mean(), b.mean() * UNIT, (b * r[m]).sum() / b.sum(), b * r[m] * UNIT
sc = {
 "Wong TC>2 (≥+3), rampe 4u/8u/12u": pnl(3, lambda t: {3: 4, 4: 8}.get(t, 12)),
 "Wong TC>2 (≥+3), mise plate 1u (10€)": pnl(3, lambda t: 1),
 "Wong TC≥+2, rampe 2u/4u/8u/12u": pnl(2, lambda t: {2: 2, 3: 4, 4: 8}.get(t, 12)),
 "Jouer tout le temps, rampe 1-12u": pnl(-99, lambda t: RAMP_ALL.get(t, 12)),
}
for R in (60, 100, 200):
    print(f"\n=== {R} tours observés / heure ===")
    print(f"{'Scénario':<40}{'mains jouées/h':>15}{'mise moy':>9}{'avantage':>9}{'EV/h':>8}{'σ/h':>8}{'P(h<0)':>8}{'EV 100h':>10}{'P(100h<0)':>10}")
    for n, (f, bet, edge, p) in sc.items():
        h = R * f; ev = h * p.mean(); sd = np.sqrt(h) * p.std()
        print(f"{n:<40}{h:>15.1f}{bet:>8.0f}€{edge:>+9.2%}{ev:>7.1f}€{sd:>7.0f}€{norm.cdf(-ev/sd):>8.0%}{ev*100:>9,.0f}€{norm.cdf(-ev*10/sd):>10.1%}")

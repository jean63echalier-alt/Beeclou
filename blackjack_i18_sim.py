"""Simulation réaliste d'un sabot de blackjack (6 jeux, S17, DAS, 3:2, pénétration 75 %)
Hi-Lo + stratégie de base, avec ou sans les Illustrious 18 (indices S17)."""
import random, sys
import numpy as np
from multiprocessing import Pool

DECKS, PEN = 6, 0.75
HILO = [0, -1, 1, 1, 1, 1, 1, 0, 0, 0, -1]  # index = valeur (A=1 ... 10)

def decide(cards, up, can_split, can_dbl, tc, dev):
    total = sum(cards); soft = 1 in cards and total + 10 <= 21
    t = total + 10 if soft else total
    if len(cards) == 2 and cards[0] == cards[1] and can_split:
        v = cards[0]
        if dev and v == 10 and ((up == 5 and tc >= 5) or (up == 6 and tc >= 4)):
            return 'P'
        if v in (1, 8): return 'P'
        if v == 9 and (up <= 6 or up in (8, 9)): return 'P'
        if v == 7 and up <= 7: return 'P'
        if v == 6 and up <= 6: return 'P'
        if v == 4 and up in (5, 6): return 'P'
        if v in (2, 3) and up <= 7: return 'P'
    D = 'D' if can_dbl else 'H'
    if soft:
        if t >= 19: return 'S'
        if t == 18: return ('D' if can_dbl else 'S') if 3 <= up <= 6 else ('S' if up in (2, 7, 8) else 'H')
        if t in (17, 16): return D if 3 <= up <= 6 else 'H'
        if t in (15, 14): return D if 4 <= up <= 6 else 'H'
        return D if 5 <= up <= 6 else 'H'          # 13, 12
    if dev == 2 and tc > 1 and 12 <= t <= 16: return 'S'   # no-bust quand TC > 1
    if dev:
        if t == 16 and up == 10 and tc >= 0: return 'S'
        if t == 15 and up == 10 and tc >= 4: return 'S'
        if t == 10 and up == 10 and tc >= 4: return D
        if t == 12 and up == 3 and tc >= 2: return 'S'
        if t == 12 and up == 2 and tc >= 3: return 'S'
        if t == 11 and up == 11 and tc >= 1: return D
        if t == 9 and up == 2 and tc >= 1: return D
        if t == 10 and up == 11 and tc >= 4: return D
        if t == 9 and up == 7 and tc >= 3: return D
        if t == 16 and up == 9 and tc >= 5: return 'S'
        if t == 13 and up == 2 and tc < -1: return 'H'
        if t == 12 and up == 4 and tc < 0: return 'H'
        if t == 12 and up == 5 and tc < -2: return 'H'
        if t == 12 and up == 6 and tc < -1: return 'H'
        if t == 13 and up == 3 and tc < -2: return 'H'
    if t >= 17: return 'S'
    if t >= 13: return 'S' if up <= 6 else 'H'
    if t == 12: return 'S' if 4 <= up <= 6 else 'H'
    if t == 11: return D if up != 11 else 'H'
    if t == 10: return D if up <= 9 else 'H'
    if t == 9: return D if 3 <= up <= 6 else 'H'
    return 'H'

def value(cards):
    t = sum(cards)
    return t + 10 if 1 in cards and t + 10 <= 21 else t

def sim(args):
    seed, nshoes, dev = args
    rng = random.Random(seed)
    tcs, res = [], []
    base = [v for v in [1,2,3,4,5,6,7,8,9,10,10,10,10] for _ in range(4 * DECKS)]
    for _ in range(nshoes):
        shoe = base[:]; rng.shuffle(shoe)
        n = len(shoe); cut = int(n * PEN); pos = 0; rc = 0
        while pos < cut:
            tc0 = rc / ((n - pos) / 52)
            p = [shoe[pos], shoe[pos + 2]]; up = shoe[pos + 1]; hole = shoe[pos + 3]; pos += 4
            rc += HILO[p[0]] + HILO[p[1]] + HILO[up]
            upv = 11 if up == 1 else up
            r = 0.0
            ins = dev and up == 1 and rc / ((n - pos) / 52) >= 3
            dbj = (up == 1 and hole == 10) or (up == 10 and hole == 1)
            pbj = value(p) == 21
            if ins: r += 1.0 if dbj else -0.5
            if (up in (1, 10)) and dbj:
                rc += HILO[hole]; r += 0.0 if pbj else -1.0
            elif pbj:
                rc += HILO[hole]; r += 1.5
            else:
                done, todo = [], [(p, False)]
                nh = 1
                while todo:
                    cards, fromsplit = todo.pop()
                    if fromsplit and cards[0] == 1 and len(cards) == 1:  # cartes à une carte (as scindé)
                        c = shoe[pos]; pos += 1; rc += HILO[c]; cards.append(c)
                        done.append((cards, 1)); continue
                    dbl = False
                    while True:
                        tcn = rc / ((n - pos) / 52)
                        if value(cards) >= 21: break
                        a = decide(cards, upv, nh < 4 and len(cards) == 2, len(cards) == 2, tcn, dev)
                        if a == 'S': break
                        if a == 'P':
                            nh += 1; c1, c2 = shoe[pos], shoe[pos + 1]; pos += 2; rc += HILO[c1] + HILO[c2]
                            v = cards[0]
                            todo.append(([v, c2], True)); cards = [v, c1]
                            if v == 1:  # as : une seule carte chacun, pas de nouveau split
                                done.append((cards, 1)); done.append((todo.pop()[0], 1)); break
                            continue
                        c = shoe[pos]; pos += 1; rc += HILO[c]; cards.append(c)
                        if a == 'D': dbl = True; break
                    done.append((cards, 2 if dbl else 1))
                rc += HILO[hole]
                alive = any(value(c) <= 21 for c, _ in done)
                dc = [up, hole]
                if alive:
                    while value(dc) < 17:
                        c = shoe[pos]; pos += 1; rc += HILO[c]; dc.append(c)
                dv = value(dc)
                for cards, m in done:
                    pv = value(cards)
                    if pv > 21: r -= m
                    elif dv > 21 or pv > dv: r += m
                    elif pv < dv: r -= m
            tcs.append(int(np.floor(tc0))); res.append(r)
    return np.array(tcs, dtype=np.int8), np.array(res, dtype=np.float32)

def run(nshoes_total, dev, seed0=1000, procs=None):
    procs = procs or 8
    per = nshoes_total // procs
    with Pool(procs) as pool:
        out = pool.map(sim, [(seed0 + i, per, dev) for i in range(procs)])
    return np.concatenate([o[0] for o in out]), np.concatenate([o[1] for o in out])

if __name__ == "__main__":
    import time
    t = time.time(); tc, r = run(int(sys.argv[1]), sys.argv[2] == "1", procs=int(sys.argv[3]))
    print(len(r), "mains", time.time() - t, "s | EV/main plat:", r.mean(), "±", r.std() / len(r) ** .5, "| SD:", r.std())

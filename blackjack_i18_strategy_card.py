import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle

UP = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"]; U = {u: i for i, u in enumerate(UP)}
COL = {"H": "#2FA37A", "S": "#E8705E", "D": "#FFEA1A", "DS": "#FFEA1A", "P": "#6FA8DC"}
rng = lambda a, b: [str(x) for x in range(a, b + 1)]

def row(default, **over):
    r = {u: default for u in UP}
    for act, ups in over.items():
        for u in ups: r[u] = act
    return r

# ---- stratégie de base (4/6/8 jeux, croupier tire sur 17 mou, sans abandon)
hard = {"5-7": row("H"), "8": row("H"),
        "9": row("H", D=rng(3, 6)), "10": row("H", D=rng(2, 9)), "11": row("D"),
        "12": row("H", S=rng(4, 6)), "13": row("H", S=rng(2, 6)), "14": row("H", S=rng(2, 6)),
        "15": row("H", S=rng(2, 6)), "16": row("H", S=rng(2, 6)), "17": row("S")}
soft = {"A,2": row("H", D=["5", "6"]), "A,3": row("H", D=["5", "6"]),
        "A,4": row("H", D=rng(4, 6)), "A,5": row("H", D=rng(4, 6)), "A,6": row("H", D=rng(3, 6)),
        "A,7": row("H", DS=rng(2, 6), S=["7", "8"]), "A,8": row("S", DS=["6"]), "A,9": row("S")}
pairs = {"A,A": row("P"), "10,10": row("S"), "9,9": row("S", P=rng(2, 6) + ["8", "9"]),
         "8,8": row("P"), "7,7": row("H", P=rng(2, 7)), "6,6": row("H", P=rng(2, 6)),
         "5,5": row("H", D=rng(2, 9)), "4,4": row("H", P=["5", "6"]),
         "3,3": row("H", P=rng(2, 7)), "2,2": row("H", P=rng(2, 7))}

# ---- Illustrious 18 : (ligne, croupier) -> (action, texte indice, famille)
# famille: "act" = actif dès TC >= +2 ; "high" = s'active à TC >= +3 ; "neg" = indices négatifs
DEV = {("16", "10"): ("S", "S ≥ 0", "act"), ("12", "3"): ("S", "S ≥ +2", "act"),
       ("9", "2"): ("D", "D ≥ +1", "act"),
       ("15", "10"): ("S", "S ≥ +4", "high"), ("12", "2"): ("S", "S ≥ +3", "high"),
       ("10", "10"): ("D", "D ≥ +4", "high"), ("10", "A"): ("D", "D ≥ +4", "high"),
       ("9", "7"): ("D", "D ≥ +3", "high"), ("16", "9"): ("S", "S ≥ +5", "high"),
       ("13", "2"): ("H", "H < −1", "neg"), ("12", "4"): ("H", "H < 0", "neg"),
       ("12", "5"): ("H", "H < −2", "neg"), ("12", "6"): ("H", "H < −1", "neg"),
       ("13", "3"): ("H", "H < −2", "neg"),
       ("10,10", "5"): ("P", "P ≥ +5", "high"), ("10,10", "6"): ("P", "P ≥ +4", "high")}
EDGE = {"act": "#FF7A00", "high": "#7B2CBF", "neg": "#1565C0"}

W, H_, LW = 0.78, 0.62, 1.3
fig = plt.figure(figsize=(10, 21.2)); ax = fig.add_axes([0, 0, 1, 1]); ax.axis("off")
ax.set_xlim(0, 11 * W + 0.4); ax.set_ylim(-1.0, 34.4 * H_ + 3.3)
y = 34.4 * H_ + 3.3
ax.text((11 * W + 0.4) / 2, y - 0.45, "Blackjack - Stratégie de base + Illustrious 18", ha="center", fontsize=22, weight="bold")
ax.text((11 * W + 0.4) / 2, y - 0.95, "4/6/8 jeux, croupier tire sur 17 mou, double après split, sans abandon",
        ha="center", fontsize=12)
y -= 1.35
def block(title, rows, kind):
    global y
    ax.add_patch(Rectangle((0.2, y - H_), 11 * W, H_, fc="#FFF59D", ec="#444", lw=LW))
    ax.text(0.2 + 0.5 * W, y - H_ / 2, title, ha="center", va="center", fontsize=11, weight="bold")
    for i, u in enumerate(UP):
        ax.text(0.2 + (i + 1.5) * W, y - H_ / 2, u, ha="center", va="center", fontsize=14, weight="bold")
    y -= H_
    for label, r in rows.items():
        ax.add_patch(Rectangle((0.2, y - H_), W, H_, fc="white", ec="#444", lw=LW))
        ax.text(0.2 + W / 2, y - H_ / 2, label, ha="center", va="center", fontsize=12, weight="bold")
        for i, u in enumerate(UP):
            a = r[u]; dev = DEV.get((label, u)) if kind != "soft" else None
            if kind == "pair" and label != "10,10": dev = None
            x0 = 0.2 + (i + 1) * W
            if dev:
                a2, txt, fam = dev
                ax.add_patch(Rectangle((x0, y - H_), W, H_, fc=COL[a2], ec="#444", lw=LW))
                ax.add_patch(Rectangle((x0 + 0.03, y - H_ + 0.03), W - 0.06, H_ - 0.06, fc="none", ec=EDGE[fam], lw=3.2))
                ax.text(x0 + W / 2, y - H_ * 0.34, a2, ha="center", va="center", fontsize=15, weight="bold")
                ax.text(x0 + W / 2, y - H_ * 0.78, txt, ha="center", va="center", fontsize=8.6, weight="bold", color=EDGE[fam],
                        bbox=dict(boxstyle="round,pad=0.12", fc="white", ec="none"))
            else:
                ax.add_patch(Rectangle((x0, y - H_), W, H_, fc=COL[a], ec="#444", lw=LW))
                ax.text(x0 + W / 2, y - H_ / 2, a, ha="center", va="center", fontsize=15, weight="bold")
        y -= H_
    y -= 0.18
block("Total dur", hard, "hard"); block("Total souple", soft, "soft"); block("Paires", pairs, "pair")

# légende
ly = y - 0.1
ax.text(0.2, ly, "H = tirer   S = rester   D = doubler (sinon tirer)   DS = doubler (sinon rester)   P = split", fontsize=11)
items = [("act", "Orange : déviation déjà active quand le true count ≥ +2"),
         ("high", "Violet : se joue dès que le true count atteint l'indice (+3, +4, +5…)"),
         ("neg", "Bleu : indice négatif - tirer seulement si le true count passe sous l'indice")]
for k, (f, t) in enumerate(items):
    yy = ly - 0.55 - k * 0.5
    ax.add_patch(Rectangle((0.25, yy - 0.16), 0.5, 0.32, fc="white", ec=EDGE[f], lw=3.2))
    ax.text(0.9, yy, t, va="center", fontsize=11)
ax.text(0.2, ly - 2.25, "Assurance : la prendre à TC ≥ +3.   Cases sans cadre = stratégie de base (TC = 0).\n"
        "Les abandons (R) ne figurent pas : sans abandon, 15/16 contre 10, 16 contre 9 et A = tirer ; 17 contre A = rester.\n"
        "True count = running count Hi-Lo ÷ nombre de jeux restants.", fontsize=10.5, va="top")
plt.savefig("blackjack_i18_strategy_card.png", dpi=110)

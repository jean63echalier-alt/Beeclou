import numpy as np
from openpyxl import Workbook
from openpyxl.chart import LineChart, Reference
from openpyxl.styles import Font

N_HANDS, STEP, UNIT, SD_FACTOR = 50_000, 250, 10.0, 1.15
# (probabilité, mises en unités, espérance par main)
BUCKETS = [(0.75, 1, -0.005), (0.12, 2, 0.005), (0.07, 4, 0.010),
           (0.04, 8, 0.015), (0.02, 12, 0.020)]
probs = np.array([b[0] for b in BUCKETS]); probs /= probs.sum()
bets = np.array([b[1] for b in BUCKETS]) * UNIT
evs = np.array([b[2] for b in BUCKETS])

ev_hand = float((probs * bets * evs).sum())            # € / main
var_hand = float((probs * (SD_FACTOR * bets) ** 2).sum())  # variance €² / main

rng = np.random.default_rng(2024)

def run():
    idx = rng.choice(len(BUCKETS), size=N_HANDS, p=probs)
    bet = bets[idx]
    result = bet * evs[idx] + SD_FACTOR * bet * rng.standard_normal(N_HANDS)
    cum = np.concatenate([[0.0], np.cumsum(result)])
    return cum[::STEP]

hands = np.arange(0, N_HANDS + 1, STEP)
ev = hands * ev_hand
sigma = np.sqrt(hands * var_hand)
runs = [run() for _ in range(3)]

wb = Workbook(); ws = wb.active; ws.title = "Simulation"
ws.append(["Nombre de mains", "Espérance théorique (EV)", "Run 1", "Run 2", "Run 3",
           "+2σ", "-2σ"])
for c in ws[1]: c.font = Font(bold=True)
for i, n in enumerate(hands):
    ws.append([int(n), round(ev[i], 2)] + [round(float(r[i]), 2) for r in runs] +
              [round(ev[i] + 2 * sigma[i], 2), round(ev[i] - 2 * sigma[i], 2)])
for col in "ABCDEFG": ws.column_dimensions[col].width = 24

ws["I1"] = "Paramètres"; ws["I1"].font = Font(bold=True)
ws["I2"], ws["J2"] = "EV par main (€)", round(ev_hand, 4)
ws["I3"], ws["J3"] = "Écart-type par main (€)", round(var_hand ** 0.5, 2)
ws["I4"], ws["J4"] = "EV totale 50 000 mains (€)", round(ev_hand * N_HANDS, 0)
ws["I5"], ws["J5"] = "σ total 50 000 mains (€)", round((var_hand * N_HANDS) ** 0.5, 0)
ws.column_dimensions["I"].width = 30

ch = LineChart()
ch.title = "Simulation de variance au Blackjack - Comptage de cartes (50 000 mains)"
ch.x_axis.title = "Nombre de mains jouées"
ch.y_axis.title = "Bankroll / Gains cumulés (€)"
ch.width, ch.height = 32, 17
last = len(hands) + 1
ch.add_data(Reference(ws, min_col=2, max_col=7, min_row=1, max_row=last), titles_from_data=True)
ch.set_categories(Reference(ws, min_col=1, min_row=2, max_row=last))
ch.x_axis.tickLblSkip = 20
ch.x_axis.delete = False; ch.y_axis.delete = False

# (couleur, largeur EMU, tirets)
styles = [("000000", 38100, None),        # EV
          ("1F77B4", 15875, None),        # Run 1
          ("FF7F0E", 15875, None),        # Run 2
          ("2CA02C", 15875, None),        # Run 3
          ("999999", 15875, "dash"),      # +2σ
          ("999999", 15875, "dash")]      # -2σ
for s, (color, w, dash) in zip(ch.series, styles):
    s.graphicalProperties.line.solidFill = color
    s.graphicalProperties.line.width = w
    if dash: s.graphicalProperties.line.dashStyle = dash
    s.smooth = False
    s.marker.symbol = "none"
ws.add_chart(ch, "I8")
wb.save("blackjack_variance_simulation.xlsx")
print(f"EV/main={ev_hand:.4f}€  EV totale={ev_hand*N_HANDS:.0f}€  σ totale={(var_hand*N_HANDS)**.5:.0f}€")
print("Valeurs finales runs:", [round(float(r[-1])) for r in runs])

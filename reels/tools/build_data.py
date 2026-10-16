#!/usr/bin/env python3
"""Génère data/reels.json, out/reel-NN-legende.txt, out/planning.csv et out/a-verifier.md
à partir du plan Instagram du 16 octobre 2026 (61 reels, un tous les 3 jours).

Usage : python3 tools/build_data.py
"""
import csv
import json
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
START = date(2026, 10, 16)
HASHTAGS = "#Beeclou #ClermontFerrand #VeloUrbain"
AI_LINE = "🎨 Personnage et décor générés par IA, inspirés de nos cyclistes."
BASE = ("Photo photoréaliste, format vertical 9:16, lumière naturelle douce, "
        "palette crème / vert sauge / or miel / noir, aucun texte ni logo dans l'image, "
        "aucune marque réelle. ")
BOX = ("vélo urbain équipé d'une boîte rectangulaire en bois clair avec finitions en "
       "plastique recyclé gris clair, fixée sur le porte-bagages arrière")
JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
        "septembre", "octobre", "novembre", "décembre"]

# Reels dont le texte ou les chiffres doivent être revus avant publication.
NOTES = {
    1: "Image du plan 1 déjà générée et validée (IMG_3504.png) : à copier dans assets/reel-01/plan-1.png.",
    4: "Rémunération : toujours un objectif conditionné aux annonceurs, jamais un acquis.",
    8: "« Estimations indicatives » sur chaque plan. « Jusqu'à 83 vélos » = budget théorique, pas le réseau actuel. "
       "Pas de « partout en France ». Source : beeclou.fr/annonceur.html, section Comparatif. "
       "Publier juste avant le reel 09 (recrutement cyclistes).",
    10: "Mettre à jour le nombre de cyclistes (« 15 ») avec le chiffre réel avant publication.",
    11: "Faire correspondre les points aux quartiers réels des cyclistes.",
    15: "Idéal : remplacer ces visuels IA par de vraies photos de Jean.",
    20: "Mettre à jour le nombre de cyclistes avec le chiffre réel avant publication.",
    28: "Formuler comme des objectifs (« on vise »), pas comme des acquis.",
    40: "Mettre à jour le nombre de cyclistes avec le chiffre réel avant publication.",
    41: "À publier seulement une fois l'incubation confirmée et la mention autorisée.",
    47: "Ne publier que si c'est vrai à la date de publication ; sinon remplacer par un reel Coulisses.",
    50: "Mettre à jour le nombre de cyclistes avec le chiffre réel avant publication.",
    53: "Source du prix d'appel : beeclou.fr/annonceur.html. Reel destiné aux annonceurs.",
    54: "Ne pas ajouter de chiffres d'impact (CO₂, etc.) sans source vérifiée.",
    58: "Source : beeclou.fr/annonceur.html. Ajouter « Estimations indicatives » en bas d'écran.",
    61: "Mettre à jour tous les chiffres réels avant publication.",
}
# Reels qui citent des prix annonceurs : mention « Estimations indicatives » à l'écran.
PRIX = {8, 53, 58}
# Plans dont le fond est clair : texte noir plutôt que crème.
TON_NOIR = {(8, 6), (11, 1)}

# ---------------------------------------------------------------------------
# Portraits (26) : (n°reel, prénom, métier, quartier, décor du plan 2)
# ---------------------------------------------------------------------------
PORTRAITS = [
    (3, "Camille", "étudiante en droit", "Jaude", "la cathédrale de Clermont-Ferrand"),
    (5, "Karim", "infirmier", "Fontgiève", "la place de Jaude"),
    (7, "Julie", "graphiste freelance", "Saint-Alyre", "la basilique Notre-Dame-du-Port"),
    (12, "Henri", "retraité, ancien instituteur", "Montferrand", "le jardin Lecoq"),
    (14, "Léa", "barista", "Delille", "le Puy de Dôme au loin"),
    (16, "Thomas", "apprenti menuisier", "Les Salins", "la place de la Victoire"),
    (18, "Sofia", "étudiante en médecine", "Cataroux", "une rue pavée de Montferrand"),
    (19, "Bruno", "facteur à la retraite", "Croix-de-Neyrat", "la cathédrale de Clermont-Ferrand"),
    (22, "Inès", "kiné", "Gaillard", "la place de Jaude"),
    (25, "Paul", "développeur", "La Pardieu", "la basilique Notre-Dame-du-Port"),
    (27, "Marion", "libraire", "Place de la Victoire", "le jardin Lecoq"),
    (29, "Yanis", "livreur à vélo", "Jaude", "le Puy de Dôme au loin"),
    (30, "Claire", "professeure des écoles", "Montferrand", "la place de la Victoire"),
    (31, "Mehdi", "étudiant en école d'ingénieur", "Saint-Jacques", "une rue pavée de Montferrand"),
    (35, "Anne", "architecte", "Saint-Alyre", "la cathédrale de Clermont-Ferrand"),
    (37, "Louis", "photographe", "Fontgiève", "la place de Jaude"),
    (39, "Nadia", "aide-soignante", "Delille", "la basilique Notre-Dame-du-Port"),
    (42, "Hugo", "chef de cuisine", "Jaude", "le jardin Lecoq"),
    (44, "Elsa", "chargée de communication", "Cataroux", "le Puy de Dôme au loin"),
    (46, "Samuel", "musicien", "Montferrand", "la place de la Victoire"),
    (48, "Clara", "vétérinaire", "Les Salins", "une rue pavée de Montferrand"),
    (49, "Antoine", "guide conférencier", "Saint-Alyre", "la cathédrale de Clermont-Ferrand"),
    (52, "Manon", "architecte d'intérieur", "Gaillard", "la place de Jaude"),
    (55, "Pierre", "cheminot", "La Pardieu", "la basilique Notre-Dame-du-Port"),
    (57, "Zoé", "étudiante en lettres", "Jaude", "le jardin Lecoq"),
    (59, "Adèle", "fleuriste", "Place de la Victoire", "le Puy de Dôme au loin"),
]


def de(name):
    """« de Anne » → « d'Anne »."""
    return ("d'" if name[0] in "AEIOUÉÈÊ" else "de ") + name


def portrait(idx, n, name, job, quartier, decor):
    vague = 1 if idx <= 15 else 2
    return {
        "n": n,
        "type": f"Portrait cycliste n°{idx} (vague {vague})",
        "titre": f"Portrait {idx} — {name}, {job}",
        "duree": 17,
        "hook": f"{name} roule pour Beeclou.",
        "portrait": True,
        "plans": [
            (5, f"Portrait mi-corps de {name}, {job}, debout à côté de son {BOX}, sourire naturel, "
                f"quartier {quartier} de Clermont-Ferrand en arrière-plan, lumière dorée",
             f"Portrait {idx} · {name}, {job}"),
            (6, f"Plan rapproché sur la boîte Beeclou fixée au vélo {de(name)}, {decor} flou en arrière-plan",
             f"Quartier {quartier}"),
            (6, f"{name} pédale et s'éloigne dans une rue de {quartier}, vue de trois quarts arrière, "
                f"boîte bien visible, léger flou de mouvement",
             "Et toi, tu roules où ? Rejoins Beeclou."),
        ],
        "legende": [
            f"{name}, {job}, roule dans le quartier {quartier}. Chaque trajet porte un message local. "
            f"Tu fais du vélo à Clermont ? Écris-nous en message privé. 🚲",
            AI_LINE,
        ],
    }


def r3(n, type_, titre, hook, plans, legende, duree=18):
    """Reel standard à 3 plans de 5 / 7 / 6 s."""
    durees = (5, 7, 6)
    return {
        "n": n, "type": type_, "titre": titre, "duree": duree, "hook": hook,
        "plans": [(d, p, t) for d, (p, t) in zip(durees, plans)],
        "legende": legende if isinstance(legende, list) else [legende],
    }


REELS = [
    r3(1, "Teaser", "Teaser de lancement", "Bientôt, les vélos de Clermont vont parler.", [
        ("Rue pavée de Clermont-Ferrand au petit matin, silhouette de cycliste de dos, flèches de la cathédrale en fond, brume légère, ambiance mystérieuse", "Quelque chose arrive à Clermont."),
        ("Gros plan sur une roue de vélo qui roule sur les pavés, lumière rasante", "Sur deux roues."),
        ("La silhouette s'éloigne dans la rue pavée, espace libre au centre pour le logo", "Beeclou · Bientôt"),
    ], "Quelque chose arrive à Clermont-Ferrand. Sur deux roues. 🚲✨ Restez dans le coin."),
    r3(2, "Concept", "Le concept en 20 secondes", "Et si les vélos devenaient des panneaux ?", [
        (f"{BOX}, vue de trois quarts dans une rue de Clermont-Ferrand, lumière douce", "Une boîte sur le porte-bagages."),
        ("Gros plan sur la face de la boîte avec une affiche publicitaire générique colorée sans logo ni marque réelle", "Une pub locale, en mouvement."),
        ("Cycliste qui croise des piétons qui tournent la tête vers la boîte, rue commerçante de Clermont-Ferrand", "Plus humain. Plus vert."),
    ], "Beeclou transforme les vélos du quotidien en supports publicitaires urbains : une alternative plus humaine et plus verte à l'affichage classique. 🚲"),
    r3(4, "FAQ", "FAQ : les cyclistes sont-ils payés ?", "Les cyclistes Beeclou sont-ils payés ?", [
        ("Cycliste pensif qui tient son vélo par le guidon, boîte Beeclou visible, ambiance sincère", "Question honnête."),
        (f"Gros plan sur la boîte Beeclou sur le {BOX}, lumière chaude", "Aujourd'hui, on construit le réseau ensemble."),
        ("Cycliste qui s'éloigne dans une rue de Clermont-Ferrand, de dos", "Objectif : jusqu'à 25 €/mois, financé par les annonceurs, dès les premiers contrats."),
    ], "On vous doit une réponse claire : aujourd'hui, les cyclistes Beeclou ne sont pas encore rémunérés. Notre objectif : jusqu'à 25 €/mois par cycliste, financés par les annonceurs, dès les premiers contrats. Transparence totale. 🤝"),
    r3(6, "Coulisses", "Comment on fabrique la boîte", "Comment on fabrique la boîte Beeclou.", [
        ("Gros plan sur des granulés de plastique recyclé gris clair dans des mains, atelier lumineux", "Plastique recyclé."),
        ("Pièces d'une boîte en bois clair et plastique recyclé en cours d'assemblage sur un établi", "Bois clair, finitions soignées."),
        ("Boîte terminée posée sur le porte-bagages d'un vélo urbain, atelier flou en fond", "Prototype en cours : la version finale arrive."),
    ], "Les coulisses de la boîte : plastique recyclé, bois clair, finitions soignées. On est au stade du prototype, la version finale arrive. 🛠️♻️"),
    {
        "n": 8, "type": "Reel choc (annonceurs)", "titre": "5 000 € de pub, 4 façons de les dépenser",
        "duree": 26, "hook": "5 000 € de pub. 4 façons de les dépenser.",
        "plans": [
            (3, "Gros plan sur une liasse de billets de 5 et de 20 euros qui tombent en cascade sur fond gris clair neutre, éclairage de studio net", "5 000 € de pub. 4 façons de les dépenser."),
            (5, "Panneau publicitaire 4x3 avec affiche générique sur un trottoir de ville française, vue de jour, angle légèrement bas", "Panneau 4×3 : 10 faces, 1 semaine. Chacune reste au même endroit."),
            (5, "Main qui scrolle rapidement un fil de réseau social sur un smartphone, flou de mouvement, arrière-plan neutre", "Pub Meta : 250 000 à 500 000 apparitions. Scrollées en une seconde."),
            (5, "Pile épaisse de flyers A5 génériques sur une table en bois, vue légèrement plongeante", "Flyers : 50 000 à 75 000. Avant même de les distribuer."),
            (6, f"{BOX}, roulant dans une rue pavée de Clermont-Ferrand, lumière d'après-midi", "Beeclou : jusqu'à 83 vélos pendant 1 mois. 60 € par vélo."),
            (2, "Fond crème uni, espace central libre pour le logo Beeclou", "Dès 600 € · beeclou.fr"),
        ],
        "legende": ["5 000 €. Un panneau, un scroll, une pile de flyers… ou jusqu'à 83 vélos qui roulent dans votre ville. Comparatif complet sur beeclou.fr 👇",
                    "Estimations indicatives."],
    },
    r3(9, "Recrutement cyclistes", "Appel à rejoindre le réseau", "Tu fais du vélo à Clermont ?", [
        ("Cycliste souriant en pleine ville, son vélo avec la boîte Beeclou, lumière du matin", "Tu fais du vélo à Clermont ?"),
        (f"Gros plan sur la boîte fixée au {BOX}", "Ton vélo devient un support local."),
        ("Trois cyclistes à un feu rouge, chacun avec une boîte Beeclou, rue de Clermont-Ferrand", "Écris-nous en message privé."),
    ], "On construit le réseau Beeclou et on cherche des cyclistes à Clermont-Ferrand. Tu roules régulièrement ? Écris-nous en message privé. Rémunération visée : jusqu'à 25 €/mois, financée par les annonceurs, dès les premiers contrats. 🚲"),
    r3(10, "Bilan mensuel", "Bilan du mois 1", "1 mois de Beeclou : où on en est.", [
        ("Bureau lumineux, ordinateur portable et plan de Clermont-Ferrand sur la table, jeune homme de dos, tasse de café", "1 mois de Beeclou."),
        ("Rangée de vélos urbains avec boîtes Beeclou garés devant un mur clair", "15 cyclistes nous ont rejoints."),
        ("Vue sur les toits de Clermont-Ferrand au lever du soleil", "Et ce n'est que le début."),
    ], "Un mois déjà. Où on en est, ce qu'on a appris, la suite. Merci à celles et ceux qui roulent avec nous. 🙏"),
    r3(11, "Communauté", "La carte des quartiers", "Où roulent les cyclistes Beeclou ?", [
        ("Illustration vectorielle stylisée d'un plan de Clermont-Ferrand, palette crème et vert sauge, pastilles dorées sur les quartiers (illustration, pas une photo)", "Jaude, Montferrand, Fontgiève…"),
        ("Vue aérienne photoréaliste de Clermont-Ferrand avec le Puy de Dôme au fond", "Chaque point = un cycliste."),
        (f"Cycliste avec {BOX}, dans un quartier résidentiel de Clermont-Ferrand", "Et dans ton quartier ?"),
    ], "Où roulent nos cyclistes ? Un peu partout dans Clermont. Et dans ton quartier, on y est ? 📍"),
    r3(13, "Vlog", "Une journée à vélo dans Clermont", "Une journée à vélo dans Clermont.", [
        ("Lever du jour sur Clermont-Ferrand, cycliste qui sort son vélo avec la boîte Beeclou d'un porche", "7 h 30 · départ."),
        ("Vélo avec la boîte Beeclou garé devant une terrasse de la place de Jaude à midi", "12 h · pause place de Jaude."),
        ("Cycliste qui rentre le soir, Puy de Dôme en fond, lumière dorée", "18 h · retour avec le Puy de Dôme."),
    ], "Une journée de cycliste Beeclou : rien ne change dans son trajet, tout change dans ce que son vélo raconte. 🌄"),
    r3(15, "Fondateur", "Jean, 23 ans, pourquoi Beeclou", "J'ai 23 ans et je lance Beeclou.", [
        ("Jeune homme de dos devant un ordinateur portable dans un petit bureau, lumière chaude (silhouette, pas de visage)", "J'ai 23 ans. Je lance Beeclou depuis Clermont."),
        ("Carnet ouvert avec des croquis de boîte à vélo et de plan de ville, mains qui dessinent", "Mon idée : transformer les vélos du quotidien en supports pub."),
        ("Jeune homme de dos devant une fenêtre qui regarde la ville", "Je construis ça avec vous."),
    ], "Je m'appelle Jean, j'ai 23 ans, et je construis Beeclou depuis Clermont-Ferrand. Pourquoi ? Pour proposer une pub plus humaine et plus verte. Merci de suivre l'aventure. 🙌"),
    r3(17, "Pédagogie", "Comment ça marche pour un cycliste", "Comment ça marche quand on est cycliste Beeclou ?", [
        ("Mains qui fixent une boîte en bois clair et plastique recyclé sur un porte-bagages", "1. Tu installes la boîte."),
        ("Cycliste qui roule normalement dans une rue de Clermont-Ferrand, boîte visible", "2. Tu roules comme d'habitude."),
        ("Boîte Beeclou en gros plan sur le vélo, lumière dorée", "3. Les annonceurs financent. Bientôt."),
    ], "Trois étapes : on installe la boîte, on roule comme d'habitude, les annonceurs financent le réseau. 1, 2, 3. 🚲"),
    r3(20, "Bilan mensuel", "Bilan du mois 2", "2 mois de Beeclou : le point.", [
        ("Table de travail avec carnet de notes et plan de Clermont-Ferrand, lumière du soir", "2 mois de Beeclou."),
        ("Groupe de cyclistes avec boîtes Beeclou devant la cathédrale de Clermont-Ferrand", "Le réseau grandit."),
        ("Vue sur la ville au crépuscule", "Merci."),
    ], "Deux mois. Ce qui avance, ce qui coince, et la suite. Merci de rouler avec nous. 🙏"),
    r3(21, "Pédagogie", "Pourquoi une pub à vélo se remarque", "Pourquoi une pub à vélo se remarque.", [
        ("Cycliste avec boîte Beeclou croisant des piétons qui la regardent, rue commerçante", "Elle passe là où les gens passent."),
        ("Boîte Beeclou à hauteur d'yeux au feu rouge, voitures à l'arrêt à côté", "Au feu rouge, elle est à hauteur de regard."),
        ("Plan large d'une avenue animée avec un cycliste au premier plan", "Pas d'écran. Pas d'algorithme."),
    ], "Une pub qui roule va là où se trouvent vos clients. À hauteur de regard, au feu rouge, devant la boulangerie. 👀"),
    r3(23, "Rétrospective", "Rétrospective 2026", "2026 : l'année où Beeclou est né.", [
        ("Croquis d'une boîte à vélo sur une feuille, mains, lumière chaude", "Une idée."),
        (f"{BOX} sur un vélo garé contre un mur clair", "Une boîte."),
        ("Groupe de cyclistes au feu rouge dans une rue de Clermont-Ferrand", "Des cyclistes."),
    ], "2026 en trois mots : une idée, une boîte, des cyclistes. Merci d'avoir été là dès le début. ✨"),
    r3(24, "Vœux", "Joyeux Noël", "Joyeux Noël de la part de Beeclou.", [
        ("Rue de Clermont-Ferrand illuminée de guirlandes la nuit, cycliste avec boîte Beeclou", "Joyeux Noël."),
        ("Boîte Beeclou ornée d'un petit ruban doré sur le porte-bagages", "Merci à toute la communauté."),
        ("Cycliste qui s'éloigne dans une rue calme et éclairée", "À l'année prochaine."),
    ], "Joyeux Noël à toute la communauté Beeclou. Merci d'être là. 🎄"),
    r3(26, "Pédagogie", "Le modèle économique simplifié", "Comment Beeclou fonctionne, en 3 étapes.", [
        ("Illustration vectorielle stylisée : une marque locale, une boîte sur un vélo, un cycliste, flèches entre les trois, palette crème / vert sauge / or", "1. Un annonceur finance une campagne."),
        (f"{BOX} qui roule dans une rue de Clermont-Ferrand", "2. La boîte porte son message en ville."),
        ("Cycliste souriant qui s'éloigne dans une rue ensoleillée", "3. Une part revient aux cyclistes, dès les premiers contrats."),
    ], "Le modèle, simplement : un annonceur finance, la boîte porte son message, une part revient aux cyclistes dès les premiers contrats. 🔁"),
    r3(28, "Vœux", "Objectifs 2027", "2027 : voici ce qu'on construit.", [
        ("Feuille de route manuscrite sur une table en bois, stylo, lumière douce du matin", "2027 : nos objectifs."),
        ("Groupe de vélos avec boîtes Beeclou alignés devant un mur clair", "Plus de cyclistes."),
        (f"{BOX} en gros plan, version finale soignée", "Les premiers annonceurs. La boîte finale."),
    ], "Bonne année ! Nos objectifs 2027 : plus de cyclistes, les premiers annonceurs, la version finale de la boîte. 🥂"),
    r3(32, "Recrutement cyclistes", "Campagne de recrutement directe", "On cherche des cyclistes à Clermont.", [
        ("Cycliste souriant sur une grande place de Clermont-Ferrand, boîte Beeclou visible", "Tu roules chaque semaine ?"),
        (f"Gros plan sur la boîte fixée au {BOX}", "Rejoins la communauté Beeclou."),
        ("Groupe de trois cyclistes qui discutent devant leurs vélos", "Écris-nous en message privé."),
    ], "On cherche de nouveaux cyclistes à Clermont-Ferrand. Tu roules régulièrement ? Écris-nous en message privé. Rémunération visée : jusqu'à 25 €/mois, financée par les annonceurs, dès les premiers contrats. 🚲"),
    r3(33, "Comparatif", "Vélo classique vs vélo Beeclou", "Un vélo normal vs un vélo Beeclou.", [
        ("Vélo urbain sans boîte garé contre un mur clair, rue de Clermont-Ferrand", "Avant : un vélo comme les autres."),
        (f"Le même {BOX} garé au même endroit", "Après : un support local en mouvement."),
        ("Les deux vélos côte à côte, vue de face", "Même trajet. Plus de sens."),
    ], "Même vélo, même trajet. Une boîte en plus, un message local en plus. 🚲"),
    r3(34, "Coulisses", "Zoom sur le plastique recyclé", "Pourquoi le plastique recyclé ?", [
        ("Gros plan sur des granulés de plastique recyclé gris clair, lumière douce", "Un matériau qui a déjà servi."),
        ("Pièces de boîte en plastique recyclé et bois clair posées sur un établi", "Pensé pour durer."),
        ("Boîte terminée sur un porte-bagages, atelier flou en arrière-plan", "Objectif : fabrication locale."),
    ], "Le plastique recyclé, c'est le choix de la cohérence. Notre objectif : une fabrication locale, en Auvergne. ♻️"),
    r3(36, "Recrutement cyclistes", "3 raisons de rouler pour Beeclou", "3 raisons de rouler pour Beeclou.", [
        ("Cycliste en trajet quotidien avec boîte Beeclou dans une rue de Clermont-Ferrand", "1. Tu ne changes rien à ton trajet."),
        ("Groupe de cyclistes souriants devant un mur clair, boîtes Beeclou visibles", "2. Tu fais partie d'un projet local."),
        ("Cycliste de dos qui s'éloigne, lumière dorée", "3. Rémunération visée : jusqu'à 25 €/mois, dès les premiers annonceurs."),
    ], "3 raisons de rouler pour Beeclou : zéro contrainte, un projet local, et une rémunération visée jusqu'à 25 €/mois dès les premiers annonceurs. Message privé pour rejoindre. 🚲"),
    r3(38, "Coulisses", "Le prototype étape par étape", "Le prototype, étape par étape.", [
        ("Croquis de boîte à vélo étalés sur une table, mains, lumière douce", "1. Le croquis."),
        ("Maquette de boîte en bois clair et plastique recyclé sur un établi", "2. La maquette."),
        (f"Boîte prototype fixée sur un {BOX} pour un test en rue", "3. Le test en rue."),
    ], "Du croquis au test en rue : le prototype avance, étape par étape. 🛠️"),
    r3(40, "Bilan mensuel", "Bilan du mois 4", "4 mois de Beeclou : le point.", [
        ("Bureau avec ordinateur portable et carnet, jeune homme de dos, lumière de fin de journée", "4 mois de Beeclou."),
        ("Rangée de vélos avec boîtes Beeclou devant un mur clair", "Le réseau grandit."),
        ("Vue sur Clermont-Ferrand et le Puy de Dôme", "On continue."),
    ], "Quatre mois. Les chiffres, les leçons, la suite. 🙏"),
    r3(41, "Coulisses", "Coulisses de l'incubateur", "Beeclou dans un incubateur à Clermont.", [
        ("Espace de coworking moderne et lumineux, bureaux en bois clair, plantes vertes", "Un lieu pour construire."),
        ("Jeune homme de dos devant un tableau blanc avec des schémas", "Du soutien pour avancer."),
        ("Vue sur Clermont-Ferrand depuis une fenêtre de bureau", "Un projet 100 % clermontois."),
    ], "Beeclou est accompagné par un incubateur clermontois. Un cadre pour construire, des conseils pour avancer. 🚀"),
    r3(43, "Pédagogie", "Pub mobile vs pub fixe", "Panneau fixe vs pub qui roule.", [
        ("Panneau publicitaire fixe dans une rue de Clermont-Ferrand presque vide", "Le panneau attend qu'on passe devant."),
        (f"{BOX} qui traverse la même rue", "La boîte va là où sont les gens."),
        ("Plan large : panneau fixe au fond, cycliste avec boîte au premier plan", "Deux logiques. Une seule bouge."),
    ], "Une pub fixe attend. Une pub qui roule va à la rencontre. Chacun son rôle. 🚲"),
    r3(45, "POV", "POV : tu roules pour Beeclou", "POV : tu roules pour Beeclou.", [
        ("Vue subjective depuis le guidon d'un vélo, rue pavée de Clermont-Ferrand, boîte visible sur le porte-bagages dans le rétroviseur", "POV : tu roules pour Beeclou."),
        ("Vue subjective devant une terrasse de café animée, des passants se retournent", "Les regards se tournent."),
        ("Vue subjective qui arrive place de Jaude, lumière dorée", "Et tu rentres chez toi."),
    ], "POV : tu roules pour Beeclou. Même trajet, plus de regards. 👀"),
    r3(47, "Teasing annonceurs", "Premiers échanges avec des marques locales", "Quelque chose se prépare avec des marques locales.", [
        ("Deux silhouettes qui se serrent la main dans un commerce lumineux, sans visage identifiable", "Des échanges en cours."),
        ("Boîte Beeclou avec une affiche générique floutée sur un vélo, rue de Clermont-Ferrand", "Des marques locales."),
        ("Rue de Clermont-Ferrand au crépuscule, cycliste de dos", "À suivre."),
    ], "On échange avec des marques locales. On vous en dit plus bientôt. 👀"),
    r3(50, "Bilan mensuel", "Bilan du mois 5", "5 mois de Beeclou : le point.", [
        ("Bureau avec ordinateur portable et carnet, lumière du matin", "5 mois de Beeclou."),
        ("Groupe de cyclistes avec boîtes Beeclou devant la cathédrale", "Une vraie communauté."),
        ("Vue sur la ville au lever du jour", "La suite arrive."),
    ], "Cinq mois. On avance. Merci à la communauté. 🙏"),
    r3(51, "Transition", "Vers le lancement commercial", "Beeclou passe à l'étape suivante.", [
        ("Cycliste de dos qui regarde au loin sur une place de Clermont-Ferrand, lumière dorée", "Beeclou passe à l'étape suivante."),
        (f"{BOX} en gros plan, version soignée", "Une boîte prête à rouler."),
        ("Rue de Clermont-Ferrand animée avec plusieurs vélos à boîtes", "Un réseau prêt à parler."),
    ], "Le réseau est là, la boîte aussi. Place à la suite : les marques locales. 🚀"),
    r3(53, "Annonceurs", "Pourquoi choisir Beeclou", "Annonceur à Clermont : pourquoi Beeclou ?", [
        ("Commerçant devant sa boutique qui regarde passer un vélo avec boîte Beeclou", "Local : vos clients sont à côté."),
        ("Boîte Beeclou à hauteur d'yeux au feu rouge, voitures à l'arrêt", "Visible : à hauteur de regard."),
        ("Cycliste avec boîte Beeclou devant une vitrine de boutique", "Souple : dès 600 € pour 10 vélos pendant 1 mois."),
    ], ["Une pub locale, visible et souple. Dès 600 € pour 10 vélos pendant 1 mois, proposition de campagne sous 24 h. Écrivez-nous. 📩",
        "Offre pilote à Clermont-Ferrand, sous réserve de disponibilité des cyclistes."]),
    r3(54, "Impact", "Impact environnemental", "Une pub qui ne consomme pas d'énergie.", [
        ("Cycliste qui roule dans une rue arborée de Clermont-Ferrand, lumière verte", "Un vélo. Zéro émission à l'usage."),
        ("Boîte en plastique recyclé en gros plan, texture visible", "Une boîte en plastique recyclé."),
        ("Plan large d'une rue calme avec plusieurs vélos et peu de voitures", "Une ville plus agréable."),
    ], "Une pub qui roule à la force des jambes, dans une boîte en plastique recyclé. ♻️🚲"),
    r3(56, "Behind the brand", "Les valeurs derrière Beeclou", "Les valeurs derrière Beeclou.", [
        ("Cycliste qui discute avec un passant, rue commerçante de Clermont-Ferrand", "Local."),
        ("Mains qui se serrent sur fond de vélo et de boîte Beeclou (plan serré, sans visage)", "Humain."),
        (f"{BOX} sous un arbre, lumière verte douce", "Durable."),
    ], "Trois mots qui nous guident : local, humain, durable. 🌿"),
    r3(58, "Annonceurs", "Lancer une campagne en 3 étapes", "Lancer une campagne Beeclou en 3 étapes.", [
        ("Commerçante qui écrit sur son ordinateur portable dans sa boutique", "1. Vous nous écrivez."),
        ("Calendrier posé sur un bureau avec un stylo, lumière douce", "2. Proposition de campagne sous 24 h."),
        ("Plusieurs vélos avec la boîte Beeclou dans une rue de Clermont-Ferrand", "3. Vos vélos roulent en ville. Dès 600 €."),
    ], ["Trois étapes pour lancer une campagne : un message, une proposition sous 24 h, des vélos dans la ville. Dès 600 € pour 10 vélos pendant 1 mois. 📩",
        "Offre pilote à Clermont-Ferrand. Estimations indicatives."]),
    r3(60, "Communauté", "Merci aux cyclistes", "Merci à nos cyclistes.", [
        ("Groupe de cyclistes souriants avec leurs boîtes Beeclou devant la cathédrale de Clermont-Ferrand", "Merci à nos cyclistes."),
        ("Gros plan sur une poignée de main entre deux cyclistes", "Sans eux, rien ne roule."),
        ("Cyclistes qui partent ensemble dans une rue de Clermont-Ferrand", "On continue ensemble."),
    ], "Merci à toutes celles et ceux qui roulent pour Beeclou. Sans vous, rien ne roule. 🙏"),
    r3(61, "Bilan global", "Bilan complet des 6 mois", "6 mois de Beeclou : le bilan.", [
        ("Table de travail avec carnet, laptop et tasse de café, vue sur Clermont-Ferrand, lumière dorée", "6 mois de Beeclou."),
        ("Groupe de cyclistes avec boîtes Beeclou réunis place de Jaude", "Un réseau, une communauté."),
        ("Cycliste de dos qui roule vers le Puy de Dôme au coucher du soleil", "La suite se construit."),
    ], "Six mois de Beeclou. Ce qu'on a fait, ce qu'on a appris, la suite. Merci. 🙏"),
]

for i, (n, name, job, quartier, decor) in enumerate(PORTRAITS, start=1):
    REELS.append(portrait(i, n, name, job, quartier, decor))


def build():
    REELS.sort(key=lambda r: r["n"])
    assert [r["n"] for r in REELS] == list(range(1, 62)), "il manque des reels"
    out = []
    for r in REELS:
        n = r["n"]
        d = START + timedelta(days=3 * (n - 1))
        total = sum(p[0] for p in r["plans"])
        assert total == r["duree"], f"reel {n}: durées {total} != {r['duree']}"
        plans = []
        for k, (dur, prompt, overlay) in enumerate(r["plans"], start=1):
            plans.append({
                "duration": dur,
                "image": f"assets/reel-{n:02d}/plan-{k}.png",
                "prompt": BASE + prompt,
                "overlay": overlay,
                "tone": "ink" if (n, k) in TON_NOIR else "cream",
            })
        entry = {
            "n": n,
            "date": d.isoformat(),
            "dateLong": f"{JOURS[d.weekday()]} {d.day} {MOIS[d.month - 1]} {d.year}",
            "heure": "12:30" if n % 2 else "18:30",
            "type": r["type"],
            "titre": r["titre"],
            "duree": r["duree"],
            "hook": r["hook"],
            "disclaimer": "Estimations indicatives" if n in PRIX else None,
            "portrait": bool(r.get("portrait")),
            "note": NOTES.get(n),
            "plans": plans,
            "legende": "\n".join(r["legende"]) + "\n" + HASHTAGS,
        }
        out.append(entry)
    return out


def main():
    reels = build()
    (ROOT / "data").mkdir(exist_ok=True)
    (ROOT / "out").mkdir(exist_ok=True)
    (ROOT / "data" / "reels.json").write_text(
        json.dumps(reels, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    with open(ROOT / "out" / "planning.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["numero", "date", "heure", "titre", "fichier_video", "fichier_legende"])
        for r in reels:
            nn = f"{r['n']:02d}"
            w.writerow([nn, r["date"], r["heure"], r["titre"],
                        f"out/reel-{nn}.mp4", f"out/reel-{nn}-legende.txt"])
    for r in reels:
        (ROOT / "out" / f"reel-{r['n']:02d}-legende.txt").write_text(r["legende"] + "\n", encoding="utf-8")
    lines = ["# À vérifier avant publication", ""]
    for r in reels:
        if r["note"]:
            lines.append(f"- **Reel {r['n']:02d}** ({r['dateLong']}, {r['titre']}) : {r['note']}")
    (ROOT / "out" / "a-verifier.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"{len(reels)} reels · {sum(r['duree'] for r in reels)} s au total · data/reels.json, out/planning.csv, "
          f"{len(reels)} légendes, out/a-verifier.md")


if __name__ == "__main__":
    main()

import streamlit as st
from streamlit_option_menu import option_menu
import pandas as pd
from datetime import datetime

st.set_page_config(page_title="Beeclou MVP", page_icon="🐝", layout="centered", initial_sidebar_state="collapsed")

# Custom CSS for iOS-like design
st.markdown("""
<style>
    /* Main container */
    .stMainBlockContainer {
        max-width: 400px;
        margin: 0 auto;
        padding: 0;
    }

    /* Remove padding */
    [data-testid="baseButton-secondary"] {
        width: 100%;
    }

    /* iOS-like status bar */
    .status-bar {
        background: #000;
        color: #fff;
        padding: 8px 16px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ddd;
        font-weight: 600;
    }

    /* Card styles */
    .bee-card {
        background: #ffffff;
        border-radius: 24px;
        padding: 24px;
        margin-bottom: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .bee-hero {
        background: #FFD83D;
        border-radius: 24px;
        padding: 24px;
        margin-bottom: 16px;
        text-align: center;
    }

    .bee-button {
        background: #FFD83D !important;
        color: #111111 !important;
        border: none;
        border-radius: 16px;
        padding: 14px 24px;
        font-weight: bold;
        width: 100%;
        margin: 8px 0;
        cursor: pointer;
    }

    .bee-button-secondary {
        background: #ffffff !important;
        color: #111111 !important;
        border: 2px solid #111111;
        border-radius: 16px;
        padding: 14px 24px;
        font-weight: bold;
        width: 100%;
        margin: 8px 0;
        cursor: pointer;
    }

    /* Background */
    .stApp {
        background: #FFF8D6;
    }

    /* Bottom nav */
    .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #ffffff;
        border-top: 1px solid #FFD83D;
        display: flex;
        justify-content: space-around;
        padding: 12px 0;
        box-shadow: 0 -2px 8px rgba(0,0,0,0.08);
        max-width: 400px;
        margin: 0 auto;
    }

    /* Adjust main content for bottom nav */
    [data-testid="baseButton-secondary"] {
        margin-bottom: 80px;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if "page" not in st.session_state:
    st.session_state.page = "dashboard"

# iOS Status bar
st.markdown('<div class="status-bar"><span>04:53 🌙</span><span>📶 5G 🔋</span></div>', unsafe_allow_html=True)

# Main navigation
def render_home():
    st.markdown('<h1 style="text-align: center; margin-top: 40px;">🐝</h1>', unsafe_allow_html=True)
    st.markdown('<h1 style="text-align: center;">Beeclou</h1>', unsafe_allow_html=True)
    st.markdown('<p style="text-align: center; font-size: 18px; color: rgba(17,17,17,0.8);">Transforme tes déplacements en revenus et avantages locaux</p>', unsafe_allow_html=True)

    st.markdown("---")

    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown('<div style="text-align: center; padding: 16px;"><span style="font-size: 32px;">⚡</span><p style="font-weight: bold;">Se déplacer</p><p style="font-size: 12px; color: #888;">À vélo, marche, mobilité douce</p></div>', unsafe_allow_html=True)
    with col2:
        st.markdown('<div style="text-align: center; padding: 16px;"><span style="font-size: 32px;">🏆</span><p style="font-weight: bold;">Gagner</p><p style="font-size: 12px; color: #888;">Points & récompenses</p></div>', unsafe_allow_html=True)
    with col3:
        st.markdown('<div style="text-align: center; padding: 16px;"><span style="font-size: 32px;">👥</span><p style="font-weight: bold;">Communauté</p><p style="font-size: 12px; color: #888;">Rejoins ta ville</p></div>', unsafe_allow_html=True)

    st.markdown("---")

    if st.button("➡️ Commencer", key="start_btn", use_container_width=True):
        st.session_state.page = "login"
        st.rerun()

    if st.button("🤝 Je suis partenaire", key="partner_btn", use_container_width=True):
        st.session_state.page = "partner"
        st.rerun()

def render_login():
    st.markdown('<h2 style="text-align: center;">🐝 Bienvenue</h2>', unsafe_allow_html=True)

    with st.container(border=True):
        st.markdown("### Connexion par email")
        email = st.text_input("📧 Ton email", placeholder="toi@exemple.fr")

        if st.button("✨ Envoyer lien magique", use_container_width=True):
            st.success(f"✅ Lien envoyé à {email}!")
            st.session_state.page = "onboarding"
            st.rerun()

def render_onboarding():
    st.markdown('<h2 style="text-align: center;">🎯 Bienvenue!</h2>', unsafe_allow_html=True)

    if "onboarding_step" not in st.session_state:
        st.session_state.onboarding_step = 1

    step = st.session_state.onboarding_step

    # Progress bar
    progress = step / 3
    st.progress(progress, f"Étape {step}/3")

    if step == 1:
        st.markdown("### 🏙️ Quelle est ta ville?")
        city = st.radio("", ["Paris", "Clermont-Ferrand"], horizontal=False)
        if st.button("➡️ Suivant", use_container_width=True):
            st.session_state.city = city
            st.session_state.onboarding_step = 2
            st.rerun()

    elif step == 2:
        st.markdown("### 🚴 Ton mode de transport?")
        transport = st.radio("", ["Vélo", "Marche", "Trottinette", "Skateboard"], horizontal=False)
        col1, col2 = st.columns(2)
        with col1:
            if st.button("⬅️ Retour"):
                st.session_state.onboarding_step = 1
                st.rerun()
        with col2:
            if st.button("➡️ Suivant"):
                st.session_state.transport = transport
                st.session_state.onboarding_step = 3
                st.rerun()

    elif step == 3:
        st.markdown("### 🎁 Tes objectifs?")
        goal = st.radio("", ["Gagner des points", "Découvrir des lieux", "Aider la planète", "Socialiser"], horizontal=False)
        col1, col2 = st.columns(2)
        with col1:
            if st.button("⬅️ Retour"):
                st.session_state.onboarding_step = 2
                st.rerun()
        with col2:
            if st.button("✅ Terminer"):
                st.session_state.page = "dashboard"
                st.session_state.goal = goal
                st.rerun()

def render_dashboard():
    # Hero section
    st.markdown('<div style="background: #FFD83D; border-radius: 24px; padding: 24px; text-align: center; margin-bottom: 16px;"><p style="color: #888; margin: 0;">Points totaux</p><h2 style="color: #111; margin: 8px 0; font-size: 48px;">2450</h2></div>', unsafe_allow_html=True)

    # Level card
    with st.container(border=True):
        col1, col2 = st.columns([3, 1])
        with col1:
            st.markdown("**Niveau 7**")
            st.markdown("Vers le niveau 8")
            st.progress(0.82)
        with col2:
            st.markdown('<div style="text-align: center; font-size: 32px;">🏆</div>', unsafe_allow_html=True)

    st.markdown("---")

    # Quick actions
    st.markdown("### Actions rapides")
    col1, col2 = st.columns(2)
    with col1:
        if st.button("⚡ Trajets", use_container_width=True):
            st.session_state.page = "trips"
            st.rerun()
    with col2:
        if st.button("🎯 Missions", use_container_width=True):
            st.session_state.page = "missions"
            st.rerun()

    col1, col2 = st.columns(2)
    with col1:
        if st.button("📱 Scanner", use_container_width=True):
            st.session_state.page = "scan"
            st.rerun()
    with col2:
        if st.button("👥 Parrainer", use_container_width=True):
            st.session_state.page = "referral"
            st.rerun()

    st.markdown("---")

    # Recent activity
    st.markdown("### 📊 Activité récente")
    activities = [
        {"date": "Aujourd'hui", "distance": 3.2, "points": 32},
        {"date": "Hier", "distance": 5.1, "points": 51},
        {"date": "22 mai", "distance": 2.8, "points": 28},
    ]

    for activity in activities:
        with st.container(border=True):
            col1, col2 = st.columns([2, 1])
            with col1:
                st.markdown(f"**{activity['distance']} km**")
                st.markdown(f"<small>{activity['date']}</small>", unsafe_allow_html=True)
            with col2:
                st.markdown(f"<div style='background: #FFD83D; padding: 8px 12px; border-radius: 12px; text-align: center; font-weight: bold;'>+{activity['points']} pts</div>", unsafe_allow_html=True)

def render_trips():
    st.markdown("### ✈️ Tes trajets")

    with st.container(border=True):
        st.markdown('<div style="text-align: center;"><p style="font-size: 48px;">🚴</p><h3>Commence un trajet</h3><p style="color: #888;">Mesure ta distance et gagne des points</p></div>', unsafe_allow_html=True)

        if st.button("📍 Démarrer le GPS", use_container_width=True):
            st.success("✅ GPS activé - Simulation en cours...")
            st.session_state.tracking = True

    if st.session_state.get("tracking", False):
        st.markdown("---")
        st.markdown("### 🔴 Trajet actif")
        col1, col2 = st.columns(2)
        with col1:
            st.metric("Distance", "2.45 km")
        with col2:
            st.metric("Points", "+24 pts")

        if st.button("⏹️ Terminer le trajet", use_container_width=True):
            st.session_state.tracking = False
            st.success("✅ Trajet enregistré!")
            st.rerun()

    st.markdown("---")
    st.markdown("### 📜 Historique")

    trips_data = {
        "Date": ["23 mai, 18h30", "22 mai, 17h00", "21 mai, 19h00"],
        "Distance": ["4.5 km", "3.2 km", "5.8 km"],
        "Points": ["+45", "+32", "+58"],
        "Durée": ["32 min", "24 min", "38 min"]
    }

    for i in range(len(trips_data["Date"])):
        with st.container(border=True):
            col1, col2 = st.columns([2, 1])
            with col1:
                st.markdown(f"**{trips_data['Distance'][i]}**")
                st.markdown(f"<small>{trips_data['Date'][i]} • {trips_data['Durée'][i]}</small>", unsafe_allow_html=True)
            with col2:
                st.markdown(f"<div style='background: #FFD83D; padding: 8px 12px; border-radius: 12px; text-align: center; font-weight: bold;'>{trips_data['Points'][i]}</div>", unsafe_allow_html=True)

def render_missions():
    st.markdown("### 🎯 Missions locales")

    missions = [
        {
            "title": "Visite la Boulangerie du Cœur",
            "desc": "Scanne le QR code",
            "partner": "Boulangerie du Cœur",
            "points": 100,
            "distance": 0.8,
            "completed": False
        },
        {
            "title": "Découvre la Librairie Locale",
            "desc": "Visite le lieu",
            "partner": "Librairie L'Oasis",
            "points": 150,
            "distance": 1.2,
            "completed": False
        },
        {
            "title": "Gym à Ciel Ouvert",
            "desc": "5 trajets cette semaine",
            "partner": "Parc du Cèdre",
            "points": 200,
            "distance": 0,
            "completed": True
        }
    ]

    for mission in missions:
        with st.container(border=True):
            col1, col2 = st.columns([3, 1])
            with col1:
                st.markdown(f"**{mission['title']}**")
                st.markdown(f"<small>{mission['desc']}</small>", unsafe_allow_html=True)
                st.markdown(f"<small>📍 {mission['partner']}</small>", unsafe_allow_html=True)
            with col2:
                st.markdown(f"<div style='background: #FFD83D; padding: 8px 12px; border-radius: 12px; text-align: center; font-weight: bold; font-size: 12px;'>+{mission['points']} pts</div>", unsafe_allow_html=True)

            if not mission['completed']:
                st.button("✅ Accepter", key=f"mission_{mission['title']}", use_container_width=True)
            else:
                st.markdown("<div style='text-align: center; color: #888; padding: 8px;'>✓ Complétée</div>", unsafe_allow_html=True)

def render_referral():
    st.markdown("### 👥 Parrainage")

    # Code section
    with st.container(border=True):
        st.markdown('<div style="text-align: center;"><p style="color: #888;">Ton code de parrainage</p><h2 style="font-size: 36px; letter-spacing: 4px;">BEE8F2K1</h2></div>', unsafe_allow_html=True)
        st.button("📋 Copier le code", use_container_width=True)

    st.markdown("---")

    # Stats
    col1, col2 = st.columns(2)
    with col1:
        with st.container(border=True):
            st.markdown('<div style="text-align: center;"><p style="color: #888; margin: 0;">Amis invités</p><h2 style="margin: 8px 0;">3</h2></div>', unsafe_allow_html=True)
    with col2:
        with st.container(border=True):
            st.markdown('<div style="text-align: center;"><p style="color: #888; margin: 0;">Points gagnés</p><h2 style="margin: 8px 0;">+450</h2></div>', unsafe_allow_html=True)

    st.markdown("---")
    st.markdown("### 🎁 Amis parrainés")

    referrals = [
        {"name": "Marie", "date": "15 mai", "points": 150},
        {"name": "Thomas", "date": "10 mai", "points": 150},
        {"name": "Sophie", "date": "5 mai", "points": 150},
    ]

    for ref in referrals:
        with st.container(border=True):
            col1, col2 = st.columns([2, 1])
            with col1:
                st.markdown(f"**{ref['name']}**")
                st.markdown(f"<small>{ref['date']}</small>", unsafe_allow_html=True)
            with col2:
                st.markdown(f"<div style='background: #FFD83D; padding: 8px 12px; border-radius: 12px; text-align: center; font-weight: bold;'>+{ref['points']}</div>", unsafe_allow_html=True)

def render_scan():
    st.markdown("### 📱 Scanner QR")

    if "scanned" not in st.session_state:
        st.session_state.scanned = False

    if not st.session_state.scanned:
        with st.container(border=True):
            st.markdown('<div style="text-align: center; padding: 40px 20px;"><p style="font-size: 64px;">📱</p><h3>Pointe ton téléphone</h3><p style="color: #888;">vers le QR code du partenaire</p></div>', unsafe_allow_html=True)

        if st.button("🔍 Simuler un scan", use_container_width=True):
            st.session_state.scanned = True
            st.rerun()
    else:
        with st.container(border=True):
            st.markdown('<div style="text-align: center; padding: 40px 20px;"><p style="font-size: 64px;">✨</p><h3>Visite validée!</h3><p style="color: #888;">Boulangerie du Cœur</p><h2 style="color: #FFD83D; margin-top: 16px;">+50 pts</h2></div>', unsafe_allow_html=True)

        if st.button("🔄 Scanner un autre QR", use_container_width=True):
            st.session_state.scanned = False
            st.rerun()

def render_profile():
    st.markdown("### 👤 Profil")

    with st.container(border=True):
        st.markdown('<div style="text-align: center; padding: 20px;"><p style="font-size: 48px;">👤</p><h2>Jean</h2><p style="color: #888;">Paris</p></div>', unsafe_allow_html=True)

    st.markdown("---")

    col1, col2, col3 = st.columns(3)
    with col1:
        with st.container(border=True):
            st.markdown('<div style="text-align: center;"><p style="color: #888; margin: 0;">Points</p><h2 style="margin: 8px 0;">2450</h2></div>', unsafe_allow_html=True)
    with col2:
        with st.container(border=True):
            st.markdown('<div style="text-align: center;"><p style="color: #888; margin: 0;">Niveau</p><h2 style="margin: 8px 0;">7</h2></div>', unsafe_allow_html=True)
    with col3:
        with st.container(border=True):
            st.markdown('<div style="text-align: center;"><p style="color: #888; margin: 0;">Trajets</p><h2 style="margin: 8px 0;">24</h2></div>', unsafe_allow_html=True)

    st.markdown("---")

    with st.container(border=True):
        st.markdown("**Email**: jean@exemple.fr")
        st.markdown("**Ville**: Paris")
        st.markdown("**Transport**: Vélo")

    st.markdown("---")

    if st.button("⚙️ Paramètres", use_container_width=True):
        st.info("Paramètres en cours de développement")

    if st.button("🚪 Se déconnecter", use_container_width=True):
        st.session_state.page = "home"
        st.rerun()

def render_leaderboard():
    st.markdown("### 🏆 Classement")

    leaderboard = [
        ("🥇", "Antoine", 4850, 10),
        ("🥈", "Claire", 4320, 9),
        ("🥉", "Thomas", 3950, 9),
        ("🚀", "Jean", 2450, 7),
        ("", "Marie", 2100, 6),
        ("", "Sophie", 1850, 5),
    ]

    for badge, name, points, level in leaderboard:
        with st.container(border=True):
            col1, col2, col3 = st.columns([1, 2, 2])
            with col1:
                st.markdown(f"**{badge}**")
            with col2:
                st.markdown(f"**{name}**")
                st.markdown(f"<small>Level {level}</small>", unsafe_allow_html=True)
            with col3:
                st.markdown(f"<div style='text-align: right;'><strong>{points}</strong><br><small>points</small></div>", unsafe_allow_html=True)

def render_partner():
    st.markdown("### 🤝 Partenaires")

    st.markdown('<h2 style="text-align: center;">Devenir partenaire Beeclou</h2>', unsafe_allow_html=True)
    st.markdown('<p style="text-align: center; color: #888;">Générez du trafic local et boostez votre clientèle</p>', unsafe_allow_html=True)

    st.markdown("---")

    col1, col2 = st.columns([1, 4])
    with col1:
        st.markdown("🏪")
    with col2:
        st.markdown("**Augmentez votre visibilité**\nAtteignez des milliers d'utilisateurs")

    col1, col2 = st.columns([1, 4])
    with col1:
        st.markdown("⚡")
    with col2:
        st.markdown("**Créez des missions**\nEngagez clients avec défis")

    col1, col2 = st.columns([1, 4])
    with col1:
        st.markdown("📊")
    with col2:
        st.markdown("**Dashboard analytics**\nSuivez performances en temps réel")

    st.markdown("---")

    if st.button("✅ Créer mon compte partenaire", use_container_width=True):
        st.session_state.page = "partner_setup"
        st.rerun()

def render_partner_setup():
    st.markdown("### 📝 Inscription partenaire")

    if "partner_step" not in st.session_state:
        st.session_state.partner_step = 1

    step = st.session_state.partner_step
    progress = step / 3
    st.progress(progress, f"Étape {step}/3")

    if step == 1:
        st.markdown("**Infos établissement**")
        name = st.text_input("Nom", placeholder="Boulangerie du Cœur")
        category = st.selectbox("Catégorie", ["Restauration", "Boutique", "Sport", "Culture"])
        city = st.selectbox("Ville", ["Paris", "Clermont-Ferrand"])
        address = st.text_input("Adresse", placeholder="123 Rue de la Paix, Paris")

        col1, col2 = st.columns(2)
        with col2:
            if st.button("➡️ Suivant", use_container_width=True):
                st.session_state.partner_step = 2
                st.rerun()

    elif step == 2:
        st.markdown("**Contact**")
        email = st.text_input("Email", placeholder="contact@boulangerie.fr")
        phone = st.text_input("Téléphone", placeholder="+33 1 23 45 67 89")

        col1, col2 = st.columns(2)
        with col1:
            if st.button("⬅️ Retour"):
                st.session_state.partner_step = 1
                st.rerun()
        with col2:
            if st.button("➡️ Suivant", use_container_width=True):
                st.session_state.partner_step = 3
                st.rerun()

    elif step == 3:
        st.markdown("### 🎉 Vous êtes prêt!")
        st.markdown("Prochaine étape: générez votre code QR et créez vos missions")

        col1, col2 = st.columns(2)
        with col1:
            if st.button("⬅️ Retour"):
                st.session_state.partner_step = 2
                st.rerun()
        with col2:
            if st.button("✅ Terminer", use_container_width=True):
                st.success("✅ Compte partenaire créé!")
                st.session_state.page = "partner"
                st.rerun()

# Render based on page
if st.session_state.page == "home":
    render_home()
elif st.session_state.page == "login":
    render_login()
elif st.session_state.page == "onboarding":
    render_onboarding()
elif st.session_state.page == "dashboard":
    render_dashboard()
elif st.session_state.page == "trips":
    render_trips()
elif st.session_state.page == "missions":
    render_missions()
elif st.session_state.page == "referral":
    render_referral()
elif st.session_state.page == "scan":
    render_scan()
elif st.session_state.page == "profile":
    render_profile()
elif st.session_state.page == "leaderboard":
    render_leaderboard()
elif st.session_state.page == "partner":
    render_partner()
elif st.session_state.page == "partner_setup":
    render_partner_setup()

# Bottom navigation
st.markdown("""
<style>
    .fixed-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        border-top: 1px solid #FFD83D;
        display: flex;
        justify-content: space-around;
        padding: 12px 0;
        max-width: 400px;
        margin: 0 auto;
    }
</style>
""", unsafe_allow_html=True)

# Add bottom spacing
st.markdown("<div style='height: 100px;'></div>", unsafe_allow_html=True)

# Navigation buttons at bottom
col1, col2, col3, col4, col5 = st.columns(5)
with col1:
    if st.button("🏠", key="nav_home", use_container_width=True):
        st.session_state.page = "dashboard"
        st.rerun()
with col2:
    if st.button("⚡", key="nav_trips", use_container_width=True):
        st.session_state.page = "trips"
        st.rerun()
with col3:
    if st.button("🎯", key="nav_missions", use_container_width=True):
        st.session_state.page = "missions"
        st.rerun()
with col4:
    if st.button("👥", key="nav_referral", use_container_width=True):
        st.session_state.page = "referral"
        st.rerun()
with col5:
    if st.button("👤", key="nav_profile", use_container_width=True):
        st.session_state.page = "profile"
        st.rerun()

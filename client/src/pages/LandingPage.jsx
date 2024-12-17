import React from "react";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Added missing imports
import logo from "../assets/plantify-logo.png";
import rectangle4 from "../assets/rectangle-4.png";
import rectangle5 from "../assets/rectangle-5.png";
import rectangle6 from "../assets/rectangle-6.png";
import plant1 from "../assets/plant-1.png";
import plant2 from "../assets/plant-2.png";

export default function LandingPage() {
  const theme = createTheme({
    typography: {
      fontFamily: "Inter, sans-serif", // Apply the font family
    },
    palette: {
      background: {
        default: "#F3F4EC", // Set the default background color
      },
    },
  });

  const styles = {
    body: {
      margin: 0,
      fontFamily: "'Arial', sans-serif",
      color: "#333",
      lineHeight: 1.6,
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 10%",
      background: "#f7f8f5",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "20px", // Add space between links
    },
    a: {
      textDecoration: "none",
      color: "#22a344",
      fontWeight: "bold",
      fontSize: "1rem",
    },
    btn: {
      backgroundColor: "#22a344",
      color: "#FFFFFF",
      padding: "12px 24px",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "600",
      letterSpacing: "0.5px",
      transition: "all 0.3s ease-in-out",
      boxShadow: "0 4px 6px rgba(34, 163, 68, 0.2)",
    },
    btnHover: {
      backgroundColor: "#1c8b3a",
      transform: "scale(1.05)",
      boxShadow: "0 6px 10px rgba(28, 139, 58, 0.3)",
    },

    section: {
      padding: "50px 10%",
      textAlign: "center",
    },

    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    heroContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "40px",
      flexWrap: "wrap",
    },
    heroText: {
      flex: 1,
      maxWidth: "500px",
    },
    heroImages: {
      display: "flex",
      gap: "20px",
    },
    heroImage: {
      width: "200px",
      borderRadius: "10px",
    },
    buttonGroup: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginTop: "20px",
    },
    features: {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
      flexWrap: "wrap",
    },
    card: {
      flex: 1,
      padding: "20px",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      textAlign: "center",
    },
    cardImg: {
      width: "100%",
      borderRadius: "10px",
      marginBottom: "15px",
    },
    cta: {
      backgroundColor: "#f0f9f4",
      padding: "40px 10%",
      textAlign: "center",
    },
    ctaLogo: {
      width: "60px",
      marginBottom: "5px",
    },
    faqSection: {
      padding: "40px 10%",
      backgroundColor: "#f7f8f5",
    },
    faqCard: {
      padding: "20px",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      backgroundColor: "white",
      maxWidth: "800px",
      margin: "0 auto",
    },
    faqTitle: {
      fontSize: "1.5rem",
      marginBottom: "15px",
      textAlign: "center",
    },
    faqText: {
      textAlign: "left",
    },
    footer: {
      backgroundColor: "#f7f8f5",
      textAlign: "center",
      padding: "20px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={styles.body}>
        {/* Header Section */}
        <header>
          <nav style={styles.navbar}>
  <div style={styles.logo}>Plantify.</div>
  <div style={styles.navLinks}>
    <Link to="/signin" style={styles.a}>
      Log in
    </Link>
    <Link to="/signup">
      <button style={styles.btn}>Get Started</button>
    </Link>
  </div>
</nav>

          <div style={{ padding: "30px 10%", background: "#f7f8f5" }}>
            <div style={styles.heroContent}>
              <div style={styles.heroText}>
                <h1>
                  Smart Technology, Healthier Plants—Effortless Care Made Simple.
                </h1>
                <p>
                  Revolutionizing Plant Care with Smart IoT Solutions. Monitor,
                  manage, and care for your plants with ease.
                </p>
                <div style={styles.buttonGroup}>
                  <Link to="/signup">
                    <button style={styles.btn}>Get Started</button>
                  </Link>
                  <a href="#features" style={styles.a}>
                    View Features
                  </a>
                </div>
              </div>
              <div style={styles.heroImages}>
                <img src={plant1} alt="Plant 1" style={styles.heroImage} />
                <img src={plant2} alt="Plant 2" style={styles.heroImage} />
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section style={styles.section} id="features">
          <h2>
            Plant Care with smart automation, real-time data, and personalized
            insights.
          </h2>
          <div style={styles.features}>
            <div style={styles.card}>
              <img src={rectangle4} alt="Watering" style={styles.cardImg} />
              <h3>Smart Watering System</h3>
              <p>
                Set automatic schedules or water your plants manually at a
                click.
              </p>
            </div>
            <div style={styles.card}>
              <img src={rectangle5} alt="Monitoring" style={styles.cardImg} />
              <h3>Real-Time Monitoring</h3>
              <p>
                Stay informed on soil moisture levels, temperature, and
                watering.
              </p>
            </div>
            <div style={styles.card}>
              <img src={rectangle6} alt="Profiles" style={styles.cardImg} />
              <h3>Personalized Plant Profiles</h3>
              <p>Get tailored recommendations for optimal care.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.cta}>
          <img src={logo} alt="Plantify Logo" style={styles.ctaLogo} />
          <h2>Get started with Plantify</h2>
          <p>
            Access an intelligent, automated plant care system for real-time
            monitoring and tailored recommendations.
          </p>
          <Link to="/signup">
  <button style={styles.btn}>Try it now!</button>
</Link>
        </section>

        {/* FAQ Section */}
        <section style={styles.faqSection}>
          <div style={styles.faqCard}>
            <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
            <div style={styles.faqText}>
              <p>
                <strong>How does Plantify track my plant's health?</strong>
              </p>
              <p>
                Plantify uses real-time data from sensors to monitor soil
                moisture and ambient temperature. This data feeds into the Plant
                Health Indicator, giving you a clear view of your plant's
                well-being.
              </p>
              <p>
                <strong>Can I monitor my plants remotely?</strong>
              </p>
              <p>
                Yes, Plantify’s user-friendly dashboard allows you to track
                real-time data and manage plant care routines from anywhere.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>Plantify.© 2024 All rights reserved</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

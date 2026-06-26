# Next-Gen AI Platform Speed Run

A premium, high-converting, responsive landing page for an advanced AI-driven data automation platform. This project was developed as a submission for the FRONT-END-BATTLE.

## Features

- **Matrix-Driven Pricing Engine:** Dynamically calculates pricing across multiple currencies (USD, EUR, INR) and billing cycles (Monthly, Annual). State updates are strictly isolated to localized DOM nodes for maximum performance.
- **Adaptive Bento UI:** A feature showcase that displays as a modern Bento-Grid on desktop and refactors into a fluid Accordion list on mobile.
- **High Performance:** Designed to load and execute initial animations natively in under 500ms without relying on heavy external runtime UI libraries. 

## Technology Stack

- **HTML5:** Semantic architecture
- **CSS3:** Custom utility design using exact brand guidelines (JetBrains Mono & Inter fonts, bespoke color palette)
- **Vanilla JavaScript:** Zero-dependency logic for state handling and DOM isolation

## Local Development

To run the project locally, you can use the included PowerShell script:

1. Clone the repository
2. Run the server script:
   ```bash
   powershell -ExecutionPolicy Bypass -File .\server.ps1
   ```
3. Open `http://localhost:8081/` in your browser.

## Disclaimer
This project adheres to all constraints specified in the "Phase 1 Official Problem Statement" (no external animation libraries used for core features, isolated renders, <500ms initial sequence cap).

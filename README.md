# Vinay Yandamuri — DevOps & SRE Portfolio

[![Deploy Portfolio](https://github.com/v1nay-y/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/v1nay-y/portfolio/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live%20Site-v1nay--y.github.io%2Fportfolio-00d4aa?style=flat&logo=github)](https://v1nay-y.github.io/portfolio)

> Personal portfolio website for Vinay Yandamuri — DevOps / Site Reliability Engineer with 2.5+ years of experience in AWS, Kubernetes, Terraform, and observability.

**Live:** https://v1nay-y.github.io/portfolio

---

## Stack

- Pure HTML, CSS, JavaScript — no frameworks, no build step
- EmailJS for contact form (no backend needed)
- GitHub Actions for CI/CD
- GitHub Pages for hosting

---

## Features

- Typewriter hero cycling through DevOps/SRE roles
- Real experience from Ryval-x with projects and tech tags
- Skills grid — Kubernetes, Terraform, AWS, Prometheus, Grafana, ELK, CI/CD
- Animated counters and skill proficiency bars
- Working contact form via EmailJS
- Resume download (PDF)
- Scroll reveal animations, dark terminal theme
- Fully responsive

---

## CI/CD Pipeline

Every push to `main` triggers the GitHub Actions workflow:

1. Injects EmailJS secrets from GitHub Secrets into `main.js` and `index.html`
2. Deploys to GitHub Pages automatically

```
push to main → inject secrets → deploy to GitHub Pages
```

---

## Local Development

No install needed. Just serve the files:

```bash
python -m http.server 8080
# open http://localhost:8080
```

---

## EmailJS Setup

The contact form uses [EmailJS](https://www.emailjs.com). To configure:

1. Create an account at emailjs.com
2. Add a Gmail service → copy **Service ID**
3. Create a template with `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}` → copy **Template ID**
4. Account → API Keys → copy **Public Key**
5. Add all three as GitHub Secrets:

| Secret | Description |
|---|---|
| `EMAILJS_SERVICE_ID` | Your email service ID |
| `EMAILJS_TEMPLATE_ID` | Your template ID |
| `EMAILJS_PUBLIC_KEY` | Your public key |

See `.env.example` for reference.

---

## Project Structure

```
portfolio/
├── index.html                        # Main HTML
├── assets/
│   ├── css/styles.css                # All styles
│   ├── js/main.js                    # Interactions, EmailJS, animations
│   └── img/                          # Images
├── Vinay_Yandamuri_DevOps_Resume.pdf # Resume download
├── .github/workflows/deploy.yml      # CI/CD pipeline
├── .env.example                      # Env variable reference
└── .gitignore                        # Keeps .env out of git
```

---

## Contact

- Email: work.vinay.y@gmail.com
- LinkedIn: [linkedin.com/in/vinay-yandamuri-13605922a](https://www.linkedin.com/in/vinay-yandamuri-13605922a)
- GitHub: [github.com/v1nay-y](https://github.com/v1nay-y)

# VB Games Playground

VB Games is a browser-based game playground with built-in AI Studio, local feed, and modal game launcher.

## Live Site

- https://vbtronic.github.io/vbgames/

## Main Web

- https://vbtronic.com

## Features

- Games hub with Space Invaders, Vesmírná mise, Racing Game, and City Forge.
- Bio Points system saved in `localStorage`.
- AI Studio for generating game drafts with local Ollama (`http://localhost:11434`).
- Feed for public project browsing with local comment moderation.
- Pricing section with Premium Beta currently free during testing.
- Bilingual UI (Čeština / English), brightness settings, and quick contact links.

## Local Development

Run the dev server:

```bash
python3 dev_server.py
```

Open:

- http://localhost:8000

The app enforces HTTPS automatically on non-localhost environments.

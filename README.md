# Cryptocurrency portfolio tracker

This is just a small project that I'm making for fun. Nothing serious

⚙️ If you're interested more in technical side of the project, please check project's [Architecture - what, how and why](https://github.com/goran-zdjelar/crypto-portfolio-tracker-backend/wiki/Architecture-%E2%80%90-what,-how-and-why).

## How to install and run the project
### Prerquisites
- You will need to have [Docker](https://docs.docker.com/get-docker/) installed.
- You will need to obtain API Key from [LiveCoinWatch](https://www.livecoinwatch.com/tools/api#try).
  
### Installation
- `git clone git@github.com:goran-zdjelar/crypto-portfolio-tracker-backend.git`
- `cd crypto-portfolio-tracker`
- `yarn`
- `docker compose:up`
- `yarn database:init`
- Make a new `.env` file in thw root of the project and add `LIVECOINWATCH_API_KEY={your-api-key}`
- `yarn dev`

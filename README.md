<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This repo uses NestJS, Angular, LangChain, and AI models to build a fullstack application to summarize a web page in the target langauge.

The NestJS application can register two LangChain integrations:
- LangChain + Gemini API + Gemini-1.0-Pro model
- LangChain + Groq API + Gemma-7b-it 

## Registration

### Enable Gemini API and Gemini 1.0 Pro model
Change MODEL_TYPE to gemini

``` TypeScript
PORT=3000
GOOGLE_GEMINI_API_KEY=<google gemini api key>
GOOGLE_GEMINI_MODEL=gemini-1.0-pro
WEB_PORT=4200
MODEL_TYPE=gemini
GROQ_API_KEY=<groq api key>
GROQ_MODEL=gemma-7b-it
```

### Enable Groq API and Gemma model
Change MODEL_TYPE to groq.
Supported models of Groq can be found here: https://console.groq.com/docs/models

``` TypeScript
PORT=3000
GOOGLE_GEMINI_API_KEY=<google gemini api key>
GOOGLE_GEMINI_MODEL=gemini-1.0-pro
WEB_PORT=4200
MODEL_TYPE=groq
GROQ_API_KEY=<groq api key>
GROQ_MODEL=gemma-7b-it
```

Google Cloud credits are provided for this project. #GeminiSprint hashtag.

## Installation
```bash
$ npm install
$
$ cd ./nestjs-text-summarization
$ npm install
$
$ cd ../ng-text-summarization-app
$ npm install
```

## Environment variables

| Name  | Description | 
|---|---|
| PORT   | Backend Port. Default to3000  |
| GOOGLE_GEMINI_API_KEY  | Google Gemini API Key   |
| GOOGLE_GEMINI_MODEL  | Google Gemini model.  Default gemini-1.0-pro  |
| WEB_PORT | Angular Port number |
| MODEL_TYPE | AI Model.  Gemini or Groq  |
| GROQ_API_KEY | Groq API KEy |
| GROQ_MODEL | Groq model. Default to Gemma |

## Running the app in Docker

- Copy `.env.docker.example` to `.env`
- Update the environment variables in `.env`

```bash
$ cp .env.docker.example .env
$ docker-compose up -d
```

### Test APIs

- Open the browser and navigate to http://localhost:3000/api
- Test the API in Swagger

### Launch Angular App

- Open the browser and navigate to http://localhost:4200
- Use the simple UI to input a web page URL to generate text summarization

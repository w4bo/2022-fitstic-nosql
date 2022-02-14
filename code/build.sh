#!/bin/bash
set -e
cp .env.example .env
docker-compose build
npm install
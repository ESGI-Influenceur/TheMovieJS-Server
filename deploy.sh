#!/bin/bash
cd /TheMovieJS-Server
docker-compose -f /TheMovieJS-Server/docker-compose.yml down
git pull
docker-compose -f /TheMovieJS-Server/docker-compose.yml up -d
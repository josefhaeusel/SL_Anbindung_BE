#!/bin/bash

# First start mysql from dockertest-run-mysql.cmd
# Maybe pull new registry via pullRegistry.sh

docker stop sound-logo-tool
docker rm sound-logo-tool

docker run -d -p 3030:3000 --name sound-logo-tool --mount type=bind,source=/var/www/temp_uploads,target=/var/www/temp_uploads \
  -e DB_HOST=172.17.0.2 -e DB_PORT=3306 -e DB_USERNAME=root -e DB_PASSWORD=soundlogo -e DB_DATABASE=soundlogo \
  registry.s12.de/sound-logo/sound-logo-tool:docker

docker ps


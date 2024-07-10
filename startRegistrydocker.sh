#!/bin/bash

docker stop sound-logo-tool
docker rm sound-logo-tool

docker run -d -p 3030:3000 --name sound-logo-tool -v /var/www/temp_uploads:/var/www/temp_uploads \
  registry.s12.de/sound-logo/sound-logo-tool:docker

docker ps
#!/bin/bash
docker build -t registry.gitlab.com/mypochtaweb/linkbox .
docker push registry.gitlab.com/mypochtaweb/linkbox
scp docker-compose.yml root@185.251.88.235:~/mylinkbox/
ssh root@185.251.88.235 "cd ~/mylinkbox && docker-compose pull && docker-compose up -d"

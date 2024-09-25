docker ps
docker stop soundlogotool-mysql
docker rm soundlogotool-mysql

docker run -d -p 3306:3306 --name soundlogotool-mysql -e MYSQL_ROOT_PASSWORD=soundlogo mysql:8

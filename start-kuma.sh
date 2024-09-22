docker container stop kuma-screen .
docker container remove kuma-screen .
docker build -t kuma-screen .
docker run -d --restart=always -p 3500:80 --name kuma-screen kuma-screen
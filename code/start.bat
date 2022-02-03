REM Cleaning exiting docker containers
FOR /f "tokens=*" %%i IN ('docker ps -q') DO docker stop %%i
FOR /f "tokens=*" %%i IN ('docker ps -q') DO docker rm %%i
docker system prune -f
FOR /f "tokens=*" %%i IN ("docker volume ls -qf dangling=true") DO docker volume rm %%i

REM Starting docker containers
docker-compose down
docker-compose up --build -d
timeout /t 20
docker exec neo4j bash -c "cypher-shell -u neo4j -p fitstic -f /datasets/movies.cypher"
npm test -- --detectOpenHandles
pause
# NoSQL in Action!

[![build](https://github.com/w4bo/2022-fitstic-nosql/actions/workflows/build.yml/badge.svg)](https://github.com/w4bo/2022-fitstic-nosql/actions/workflows/build.yml)

NoSQL (Not Only SQL) exercises against relational, key-value, document, graph, and columnar databases.

## Installing the software

- Install `docker`
    - Windows: https://docs.docker.com/desktop/windows/install/
    - Mac: https://docs.docker.com/desktop/mac/install/
    - Linux: https://docs.docker.com/engine/install/ubuntu/
- Install `docker-compose`
    - Windows and Mac: Docker Compose is already included in Docker Desktop
    - Linux: https://docs.docker.com/compose/install/
- Run docker (sometimes docker has to be (re)started over and over again)
    - Windows
        - Double click on Docker Desktop from the Windows Desktop
        - This warning will pop up, DO NOT close it, but click on the link!
        ![/imgs/win-docker1.jpg](imgs/win-docker1.jpg)
        - Download the WSL kernel from here
        ![/imgs/win-docker2.jpg](imgs/win-docker2.jpg)
        - Click on restart
        ![/imgs/win-docker3.jpg](imgs/win-docker3.jpg)
- Check that docker works by opening a *new* terminal (`cmd.exe` in Windows or `/bin/bash` in Linux) and running `docker run hello-world`
- Install NodeJS (tested with versions 16.13.2 and 17.3.0)
    - https://nodejs.org/en/download/
    - Check that NodeJS works by opening a *new* terminal (`cmd.exe` in Windows or `/bin/bash` in Linux) and running `node --version` (e.g., the output should be `v17.3.0`)
- Install Robo 3T (not Studio 3T): https://robomongo.org/download

## Running the software

### Windows

Open a new terminal and run the following commands:

    cd code
    copy .env.example .env
    build.bat
    download.bat
    start.bat

- If Windows complains about running the scripts, click on "Ulteriori Informazioni"

    ![/imgs/win-docker4.png](imgs/win-docker4.png)
- and then

    ![/imgs/win-docker5.png](imgs/win-docker5.png)
- If everything runs well, the result should be something like:

    ![/imgs/docker-success.png](imgs/docker-success.png)

### Linux

Open a new terminal and run the following commands:

    cd code
    cp .env.example .env
    sh build.sh
    sh download.sh
    sh start.sh

### [Deprecated] Setting up the old software stack

This is the old way, but use it only if docker fails.

- Cassandra: https://s3.amazonaws.com/datastaxtraining/VM/DS220-vm-Jul2015.zip
- Neo4j: https://neo4j.com/artifact.php?name=neo4j-desktop-offline-1.3.11-setup.exe
- MongoDB: https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.3-signed.msi
    - Robo3T (workbench di MongoDB): https://download.studio3t.com/robomongo/windows/robo3t-1.4.2-windows-x86_64-8650949.exe
    - MongoDB Database Tools (import/export di MongoDB): https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.3.0.zip

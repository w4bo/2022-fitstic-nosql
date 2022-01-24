# NoSQL in Action!

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

Windows, open a new terminal and run the following commands:

    copy .env.example .env
    build.bat
    download.bat
    start.bat

Linux, open a new terminal and run the following commands:

    cp .env.example .env
    build.sh
    download.sh
    start.sh

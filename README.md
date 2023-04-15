# WatchMyDog
A real-time dog-watching app using Node.js and React, with web sockets to broadcast a camera stream to any device.

## Why
I have a very scared and naughty dog that makes weird stuff when I'm not around so I thought it would be fun
to create a way to watch what his doing from my phone.

This project could help you with any similar problem, maybe you want to spy something/someone, who knows...

## Features
- Real-time streaming of your dog using web sockets
- Accessible from any device with a web browser
- User-friendly interface to manage camera settings
- Funny sounds that you can play to attract your dog to the camera
- Basic authentication based on secret password to avoid streaming to strangers 🥴

## Requirements
- Node.js v16.16.0

## Installation
1. Clone the repository

    ```bash
    git clone https://github.com/flobbun/watchMyDog
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Create .env file and change the PASSWORD and JWT_TOKEN

    ```bash
    mv .env.example .env
    ```


4. Run the server

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to

    ```bash
    http://localhost:5173
    ```

## Running the project with Docker

1. yarn build

2. docker build -t flobbun/watchmydog --build-arg PASSWORD=YOUR_PASSWORD_HERE --build-arg JWT_SECRET=YOUR_JWT_SECRET_HERE -f Dockerfile .

3. docker run -p 5173:5173 flobbun/watchmydog

## Contributions
All contributions are welcome. Fork the repository, make changes and submit a pull request.

## Support
If you need help with installation or have any questions, please open an issue in the repository.

## Disclaimer
The creators of this project are not responsible for any misuse or harm caused by the use of it. This project was made for educational purposes only.

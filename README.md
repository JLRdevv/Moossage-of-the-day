# Moossage of the Day

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 📝 About

Moossage of the Day is a web application that delivers a daily message to the user in a fun way. Built with TypeScript, the app features a backend and frontend structure.

## 🚀 Features

- **Daily Messages**: Receive a new moossage from your kind friend Ms. cow.
- **Custom messages**: Create a custom moossage and customize your cow.
- **Likes system**: Like a moossage (uses uuid, you don't need to login).
- **Easy Deployment**: Hosted on Vercel for quick and reliable access.

## 📦 Installation

To run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/JLRdevv/Moossage-of-the-day.git
   cd Moossage-of-the-day
   ```

2. Install dependencies:

   ```bash
   npm run build
   ```
   
> This custom script will install both backend and frontend dependecies

3. Start the server:

   ```bash
   npm start
   ```

> This will start both backend and frontend.

4. Open your browser and navigate to `http://localhost:5173` to access the frontend.

5. To access your backend, configure the port in your `.env` file, for example:

   ```
   PORT=5000
   ```

## ⚙️ Usage

Once running locally, simply open the URL and enjoy the daily moossage, then like it, or make your very own custom moossage.

## 📡 API Documentation

| Endpoint       | Method | Description                                             | Body Parameters                     |
|----------------|--------|---------------------------------------------------------|-----------------------------------|
| `/get/motd`    | GET    | Retrieves the daily moossage                            | —                                 |
| `/like/add`    | POST   | Toggles between liked and unliked                       | `motdId`, `user_uuid`              |
| `/like/get`    | POST   | Retrieves all likes for a specific MOTD                 | `motdId`                          |
| `/like/isLiked`| POST   | Checks if user liked specific MOTD                      | `motdId`, `user_uuid`              |
| `/custom/make` | POST   | Creates a custom moossage                                | `message?`, `tongue?`, `eyes?`    |

## 🌐 Live Demo

Experience the live version at [moossage-of-the-day.vercel.app](https://moossage-of-the-day.vercel.app).

## 🤝 Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your proposed changes.

## 🙌 Shout-out

A big thanks to the [cowsay repository](https://github.com/piuccio/cowsay) for the inspiration and fun messages! 🐮💬

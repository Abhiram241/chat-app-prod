import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./libs/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import { app, server } from "./libs/socket.js";
import path from "path";
dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const frontendURL = process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:5173';
app.use(
  cors({
    origin: frontendURL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser()); // this modules helps in parsing the cookies( The ordering here matters as parsing cookies has to be done first)
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// app.get("/", (req, res) => {
//   res.send(`
//     <html>
//       <head>
//         <title>Backend</title>
//         <style>
//           body {
//             font-family: 'Roboto Mono', monospace;
//             background-color: #dbc38f; /* Material You Orange */
//             color: #fff;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//             margin: 0;
//             text-align: center;
//           }
//           .container {
//             padding: 30px;
//             background-color: #ffffff;
//             border-radius: 16px;
//             box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
//             width: 80%;
//             max-width: 600px;
//             color: #333;
//           }
//           h1 {
//             font-size: 48px;
//             color: #FF6D00; /* Material You Orange */
//             margin-bottom: 20px;
//           }
//           p {
//             font-size: 22px;
//             color: #333;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h1>Work in Progress</h1>
//           <p>We're working hard to bring you something amazing. Please stay tuned!</p>
//         </div>
//       </body>
//     </html>
//   `);
// });

if (process.env.NODE_ENV === "production") {
  const absoluteFrontendPath = "/opt/render/project/src/frontend/dist";
  app.use(express.static(absoluteFrontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(absoluteFrontendPath, "index.html"));
  });
}
server.listen(PORT, () => {
  console.log(`${PORT} is live`);
  connectDB();
});

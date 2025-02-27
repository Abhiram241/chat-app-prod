import express from "express";
import { login, signup, logout,updateProfile,checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//some beautification(remove it later)
router.get("/signup", (req,res)=>{
    res.send(`
        <html>
          <head>
            <title>Work in Progress</title>
            <style>
              body {
                font-family: 'Roboto Mono', monospace;
                background-color: #dbc38f; /* Material You Orange */
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                text-align: center;
              }
              .container {
                padding: 30px;
                background-color: #ffffff;
                border-radius: 16px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                width: 80%;
                max-width: 600px;
                color: #333;
              }
              h1 {
                font-size: 48px;
                color: #FF6D00; /* Material You Orange */
                margin-bottom: 20px;
              }
              p {
                font-size: 22px;
                color: #333;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Work in Progress</h1>
              <p>We're working hard to bring you something amazing. Please stay tuned!</p>
            </div>
          </body>
        </html>
      `);
});
router.get("/login", (req,res)=>{
    res.send(`
        <html>
          <head>
            <title>Work in Progress</title>
            <style>
              body {
                font-family: 'Roboto Mono', monospace;
                background-color: #dbc38f; /* Material You Orange */
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                text-align: center;
              }
              .container {
                padding: 30px;
                background-color: #ffffff;
                border-radius: 16px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                width: 80%;
                max-width: 600px;
                color: #333;
              }
              h1 {
                font-size: 48px;
                color: #FF6D00; /* Material You Orange */
                margin-bottom: 20px;
              }
              p {
                font-size: 22px;
                color: #333;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Work in Progress</h1>
              <p>We're working hard to bring you something amazing. Please stay tuned!</p>
            </div>
          </body>
        </html>
      `);
});
router.get("/logout", (req,res)=>{
    res.send(`
        <html>
          <head>
            <title>Work in Progress</title>
            <style>
              body {
                font-family: 'Roboto Mono', monospace;
                background-color: #dbc38f; /* Material You Orange */
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                text-align: center;
              }
              .container {
                padding: 30px;
                background-color: #ffffff;
                border-radius: 16px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                width: 80%;
                max-width: 600px;
                color: #333;
              }
              h1 {
                font-size: 48px;
                color: #FF6D00; /* Material You Orange */
                margin-bottom: 20px;
              }
              p {
                font-size: 22px;
                color: #333;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Work in Progress</h1>
              <p>We're working hard to bring you something amazing. Please stay tuned!</p>
            </div>
          </body>
        </html>
      `);
});


router.put("/update-profile",protectRoute,updateProfile);
router.get("/check",protectRoute,checkAuth);

export default router;

import { config } from "dotenv";
import { connectDB } from "../libs/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Characters
  {
    email: "natasha@gmail.com",
    fullName: "Natasha Romanoff",
    password: "admin@123",
    profilePic:
      "https://sm.ign.com/t/ign_in/cover/b/black-wido/black-widow_xbej.1200.jpg",
  },
  // Male Characters
  {
    email: "tony@gmail.com",
    fullName: "Tony Stark",
    password: "admin@123",
    profilePic:
      "https://res.cloudinary.com/de16wwapu/image/upload/v1740575486/hoq6iqvyqs3vbxxk1bof.jpg",
  },
  // Female Characters
  {
    email: "wanda@gmail.com",
    fullName: "Wanda Maximoff",
    password: "admin@123",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaqhebQzc5T_mDMhH6LXNjV1BIVGS8saCMoA&s",
  },
  // Male Characters
  {
    email: "steve@gmail.com",
    fullName: "Steve Rogers",
    password: "admin@123",
    profilePic:
      "https://pbs.twimg.com/profile_images/1867616528260083713/0b6yqLdc_400x400.jpg",
  },
  // Female Characters
  {
    email: "nebula@gmail.com",
    fullName: "Nebula",
    password: "admin@123",
    profilePic:
      "https://i.pinimg.com/736x/78/1f/10/781f10a4b42a8c3761879f48789c4411.jpg",
  },
  // Male Characters
  {
    email: "thor@gmail.com",
    fullName: "Thor Odinson",
    password: "admin@123",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Ply5DFqDR-rRMm3ybZkt2cVVEFbVVXYZbg&s",
  },
  // Female Characters
  {
    email: "gamora@gmail.com",
    fullName: "Gamora Soul",
    password: "admin@123",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfXcRGJFJCWJQgGwDZLsnhn529q4H9R8vS6Q&s",
  },
  // Male Characters
  {
    email: "bruce@gmail.com",
    fullName: "Bruce Banner",
    password: "admin@123",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd7L1IcWzeJ1RA56PpenvLLl5TnCYUN0Wj5A&s",
  },
  // Female Characters
  {
    email: "shuri@gmail.com",
    fullName: "Shuri Panther",
    password: "admin@123",
    profilePic:
      "https://i.pinimg.com/736x/7d/86/56/7d8656c020cf74ff2b99fee1e7e4936c.jpg",
  },
  // Male Characters
  {
    email: "peter@gmail.com",
    fullName: "Peter Parker",
    password: "admin@123",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQycCD41BDzxn5SB-lae4-_KvwkwCLU3Ed84Q&s",
  },
  // Female Characters
  {
    email: "maryjane@gmail.com",
    fullName: "Mary Jane Watson",
    password: "admin@123",
    profilePic:
      "https://i.pinimg.com/736x/5c/cc/e3/5ccce33651c3a5dda288b8170661a013.jpg",
  },
  // Male Characters
  {
    email: "stephen@gmail.com",
    fullName: "Stephen Strange",
    password: "admin@123",
    profilePic:
      "https://w0.peakpx.com/wallpaper/44/406/HD-wallpaper-dr-strange-avengers-doctor-infinity-marvel-theme-war-wars.jpg",
  },
  // Female Characters
  {
    email: "jane@gmail.com",
    fullName: "Jane Foster",
    password: "admin@123",
    profilePic:
      "https://i.pinimg.com/736x/ec/9d/b8/ec9db8e38e5e18ae3e1f9de1d85659ab.jpg",
  },
  // Male Characters
  {
    email: "scott@gmail.com",
    fullName: "Scott Lang",
    password: "admin@123",
    profilePic:
      "https://m.media-amazon.com/images/I/81udpja4AJL._AC_UF350,350_QL80_.jpg",
  },
  // Female Characters
  {
    email: "pepper@gmail.com",
    fullName: "Pepper Potts",
    password: "admin@123",
    profilePic: "https://i.redd.it/paaxdxfdx8j11.jpg",
  },
  // Male Characters
  {
    email: "rocket@gmail.com",
    fullName: "Rocket Raccoon",
    password: "admin@123",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkv1NnlDLFSxQLHY_BnT7LwKW0yurKPdNLpg&s",
  },
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to DB...");
    await connectDB();
    console.log("Connected to DB");

    console.log("Seeding data...");
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error.message);
  }
};

// Call the function
seedDatabase();

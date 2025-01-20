import express from "express";
import routes from "./routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json("Welcome to Express!");
});
app.use("/api", routes);

export default app;

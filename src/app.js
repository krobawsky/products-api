import express from "express";
import morgan from "morgan";

const app = express();

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";

// Settings
app.set("port", process.env.PORT || 3000);
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

app.get('*', function (req, res) {
    res.redirect('/');
});


export default app;

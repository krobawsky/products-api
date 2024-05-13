import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";

// Settings
app.set("port", process.env.PORT || 3000);
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    exposedHeaders: ['x-access-token'],
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

app.get('*', function (req, res) {
    res.redirect('/');
});


export default app;

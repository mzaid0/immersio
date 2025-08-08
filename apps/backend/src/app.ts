import express from "express";
import helmet from "helmet";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error-middleware.js";
import authRoutes from "./routes/auth.route.js"
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config({ path: './.env' });

export const envMode = process.env.NODE_ENV?.trim();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: envMode !== "DEVELOPMENT",
        crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
    })
);

app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://192.168.100.3:3000"
    ],
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.use(morgan('dev'));

app.use('/api/v1/auth', authRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT} in ${envMode} mode`);
});
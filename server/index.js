import express from 'express';
import mongoDB from './db.js';
import dotenv from 'dotenv';
import userRoute from './routes/user.js';
import fetchRoute from "./routes/fetchData.js";
import orderRoute from "./routes/OrderData.js";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize the MongoDB connection
mongoDB().then(() => {
    console.log("Connected to MongoDB");
}).catch(error => {
    console.error("MongoDB connection error:", error);
});

// Enable CORS for specific origin
app.use(cors({
    origin: 'https://quickbite-frontend-z2ew.onrender.com',
    credentials: true
}));

app.use(express.json());
app.use('/api', userRoute);
app.use("/api", fetchRoute);
app.use("/api", orderRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

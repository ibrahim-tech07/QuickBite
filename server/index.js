import express from 'express';
import mongoDB from './db.js'; // Correctly import the mongoDB function
import dotenv from 'dotenv';
import userRoute from './routes/user.js';
import fetchRoute from "./routes/fetchData.js";
import orderRoute from "./routes/OrderData.js"
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Fallback to port 5000 if PORT is not defined

// Initialize the MongoDB connection
mongoDB();

// Enable CORS for specific origin
app.use(cors({
    origin: 'https://quickbite-frontend-z2ew.onrender.com'
}));

app.use(express.json());
app.use('/api', userRoute);
app.use("/api", fetchRoute);
app.use("/api", orderRoute);

app.get('/', (req, res) => {
    res.send('helloworld');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

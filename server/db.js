import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.CONNECTION_URL;

const mongoDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connected");
        const fetch_data = mongoose.connection.db.collection('food_items');
        const data = await fetch_data.find({}).toArray();
        global.food_items = data;
        const foodCategory = mongoose.connection.db.collection('foodCategory');
        const categoryData = await foodCategory.find({}).toArray();
        global.food_category = categoryData;

    } catch (err) {
        console.error(err);
    }
};

export default mongoDB; // Use ES6 export syntax

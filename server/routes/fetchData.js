import express from "express";


const router = express.Router();

router.post("/fooddata", (req, res) => {
    try {
        res.send([global.food_items, global.food_category]);
    } catch (error) {
        console.log(error.message);
        res.send("Server Error");
    }
})

export default router;
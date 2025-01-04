import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db_url = process.env.DB_URL || "";

export async function main() {
    try {
        await mongoose.connect(db_url);
        console.log("Conectado ao banco!!")
    } catch (error) {
        console.log('An error occurred:', error);
    }
}
import mongoose from "mongoose";

export async function main() {
    try {
        await mongoose.connect("mongodb+srv://denissonpereira753:oEOrcE7p6krM6oDb@cluster0.shc5g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Conectado ao banco!")
    } catch (error) {
        console.log('An error occurred:', error);
    }
}
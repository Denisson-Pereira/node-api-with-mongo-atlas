import mongoose, { Schema } from "mongoose";
import { IProduct } from "../model/Product";

export const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        evaluation: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }, {timestamps: true}
)

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
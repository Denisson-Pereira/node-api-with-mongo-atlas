import mongoose, { Schema } from "mongoose";
import { IProduct } from "../../../domain/model/Product";
import { ICategory } from "../../../domain/model/Category";

export const CategorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }, {timestamps: true}
)

export const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);
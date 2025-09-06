import { Schema, model } from "mongoose";
import client from "../aloe.js";

const Prefix = new Schema({
    id: String,
    prefix: {
        type: String,
        default: client.config.prefix
    }
});

export default model("Prefix", Prefix);
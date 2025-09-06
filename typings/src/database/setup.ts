import { Schema, model } from "mongoose";

const Setup = new Schema({
    guildId: {
        type: String,
        default: null
    },
    channelId: {
        type: String,
        default: null
    },
    messageId: {
        type: String,
        default: null
    },
    prefixz: {
        type: String,
        default: null
    }
});

export default model("Setup",Setup);
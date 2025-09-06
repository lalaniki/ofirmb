import { Schema, model } from "mongoose";

const Reconnect = new Schema({
    id: {
        type: String,
        default: null
    },
    setting: {
        type: Boolean,
        default: false
    },
    channelId: {
        type: String,
        default: null
    },
    voiceId: {
        type: String,
        default: null
    }
});

export default model("Reconnect", Reconnect);
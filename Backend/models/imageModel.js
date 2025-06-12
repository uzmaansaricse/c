import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    isBanner: { type: Boolean, default: false }
});

const Imageadmin = mongoose.model("Imageadmin", ImageSchema);
export{Imageadmin}



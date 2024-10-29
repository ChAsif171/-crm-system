import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    permissionId: {
        type: String,
        required: true,
    },
    resource: {
        type: String,
    },
});
const Permissions = mongoose.model("Permissions", permissionSchema);

export default Permissions;

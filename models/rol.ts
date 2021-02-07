import { Schema, model } from 'mongoose';

const rolSchema = new Schema({
    nombre: String
}, {
    versionKey: false
});

export const ROLES = ["admin", "moderador", "usuario"];
export default model('Rol', rolSchema);
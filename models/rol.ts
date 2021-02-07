import { Schema, model } from 'mongoose';

const rolSchema = new Schema({
    nombre: String
}, {
    versionKey: false
});

export default model('Rol', rolSchema);
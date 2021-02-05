import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number
}, {
    timestamps: true, //tiempo de creación y modificacíon automáticos
    versionKey: false //para que cunado se cree un nuevo documento no aparesca __v
});

export default model('Product', productSchema);
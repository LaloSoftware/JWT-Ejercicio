import mongoose from 'mongoose';    //módulo de conexión a mongo

/*
    Conexión a mongo y configuración inicial
*/
mongoose.connect('mongodb://localhost/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('db is conected'))
    .catch(err => console.log(err));
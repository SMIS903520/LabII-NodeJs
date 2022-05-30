const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    clienteID: String,
    nombre: String,
    dni: String
});


const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
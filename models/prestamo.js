const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prestamoSchema = new Schema({
    clienteID: String,
    cantidad: String,
    plazo: String,
    fechaComienzo: String
});


const Prestamo = mongoose.model('Prestamo', prestamoSchema);

module.exports = Prestamo;
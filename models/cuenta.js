const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cuentaSchema = new Schema({
    clienteID: String,
    numeroCuenta: String,
    saldo: String,

});


const Cuenta = mongoose.model('Cuenta', cuentaSchema);

module.exports = Cuenta;
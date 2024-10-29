var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creacion de la tabla
var pacienteSchema = Schema({

    rut : String,
    nombre : String,
    edad : Number,
    sexo : String,
    fechaIngreso : { type: Date, default:Date.now},
    fotoPersonal : String,
    enfermedad : String,
    revisado : {type : Boolean, default:false}
});

module.exports = mongoose.model('Paciente', pacienteSchema);
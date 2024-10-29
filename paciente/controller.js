var validator = require('validator');
var Paciente = require('./model');
var fs = require('fs');
var path = require('path');

var controller = {
   //Para crear un nuevo objeto de tipo Paciente
   new: async (req, res) => {
    var params = req.body; 
    try {
        var rutVal = !validator.isEmpty(params.rut);
        var nombreVal = !validator.isEmpty(params.nombre);
        var edadVal = !validator.isEmpty(params.edad);
        var sexoVal = !validator.isEmpty(params.sexo);
        var enfermedadVal = !validator.isEmpty(params.enfermedad);
    } catch (err) {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos'
        });
    }

    if (rutVal && nombreVal && edadVal && sexoVal && enfermedadVal) {
        var paciente = new Paciente();
       paciente.rut = params.rut; 
       paciente.nombre = params.nombre;
       paciente.edad = params.edad;
       paciente.sexo = params.sexo;
       paciente.enfermedad = params.enfermedad;

        if (params.fotoPersonal) {
            paciente.fotoPersonal = params.fotoPersonal;
        } else {
            paciente.fotoPersonal = null;
        }

        try {
            const savedPaciente = await paciente.save();
            return res.status(200).send({
                status: 'success',
                paciente: savedPaciente
            });
        } catch (err) {
            return res.status(400).send({
                status: 'error',
                message: 'No se ha podido guardar los datos en la base de datos'
            });
        }
    } else {
        return res.status(400).send({
            status: 'error',
            message: 'Data is not valid'
        });
    }
  },
  update : async (req, res) => {
    var id = req.params.id;
    var params = req.body;

    try {
        var rutVal = !validator.isEmpty(params.rut);
        var nombreVal = !validator.isEmpty(params.nombre);
        var edadVal = !validator.isEmpty(params.edad);
        var sexoVal = !validator.isEmpty(params.sexo);
        var enfermedadVal = !validator.isEmpty(params.enfermedad);
    } catch (err) {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos, revisalos'
        });
    }

    if (rutVal && nombreVal && edadVal && sexoVal && enfermedadVal) {
        try {
            const paciente = await Paciente.findOneAndUpdate({ _id: id }, params, { new: true });

            if (!paciente) {
                return res.status(404).send({
                    status: "error",
                    message: "El Paciente no existe"
                });
            }

            return res.status(200).send({
                status: "success",
                paciente
            });
        } catch (err) {
            return res.status(500).send({
                status: "error",
                message: "Error al actualizar"
            });
        }
    } else {
        return res.status(400).send({
            status: "error",
            message: "Error while updating db"
        });
    }
  },
  delete : async (req, res) => {
    const id = req.params.id;

    try {
        const paciente = await Paciente.findOneAndDelete({ _id: id });

        if (!paciente) {
            return res.status(404).send({
                status: "error",
                message: "Paciente not found"
            });
        }

        return res.status(200).send({
            status: "success",
            paciente
        });
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "Error while deleting"
        });
    }
  },
  getPaciente : async (req, res) => {
    var id = req.params.id;

    if (!id || id == null) {
        return res.status(400).send({
            status: "error",
            message: "Error en el ID"
        });
    }

    try {
        const paciente = await Paciente.findById(id);

        if (!paciente) {
            return res.status(404).send({
                status: "error",
                message: "Paciente not found"
            });
        }

        return res.status(200).send({
            status: "success",
            paciente
        });
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "Internal server error"
        });
    }
  },
  getPacientes : async (req, res) => {
    var getLastPacientes = req.params.last; 
    var query = Paciente.find({}); 

    if (getLastPacientes || getLastPacientes !== undefined) {
        query.limit(5);
    }

    query.sort('-_id');

    try {
        const pacientes = await query.exec();
        
        if (!pacientes || pacientes.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "Paciente not found"
            });
        }

        return res.status(200).send({
            status: "success",
            pacientes
        });
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "Internal server error"
        });
    }
  },
  search : async (req, res) => {
    const search = req.params.search;

    try {
        const pacientes = await Paciente.find({
            "$or": [
                { "sexo": { "$regex": search, "$options": "i" } },
                { "fechaIngreso": { "$regex": search, "$options": "i" } },
                { "enfermedad": { "$regex": search, "$options": "i" } }
            ]
        })
        .sort([["createdAt", "descending"]]);

        if (!pacientes || pacientes.length <= 0) {
            return res.status(404).send({
                status: "error",
                message: "No pacientes found"
            });
        }

        return res.status(200).send({
            status: "success",
            pacientes
        });
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "Error while looking for documents"
        });
    }
}
,
  upload:async (req, res) => {
    const file = req.file;
    const id = req.params.id;

    if (!file) {
        return res.status(400).send({
            status: "error",
            message: "File cannot be empty or file extension is not allowed"
        });
    }

    const tempFilename = file.filename;

    try {
        const paciente = await Paciente.findByIdAndUpdate(
            id,
            { fotoPersonal: tempFilename },
            { new: true }
        );

        if (!paciente) {
            return res.status(404).send({
                status: "error",
                message: "Paciente not found"
            });
        }

        return res.status(200).send({
            status: "success",
            message: "File uploaded and Paciente photo updated",
            filename: tempFilename,
            paciente: paciente
        });
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "Image could not be saved in document"
        });
    }
  },
  getPhoto : (req,res) =>{
    var file = req.params.filename;
    var pathFile = 'uploads/' + file;

    if(exist = fs.existsSync(pathFile)){
        return res.sendFile(path.resolve(pathFile))
    }else{
        return res.status(404).send({
            status : 'error',
            message:'Imagen was not found'
        });
    }
  }
}

module.exports = controller;

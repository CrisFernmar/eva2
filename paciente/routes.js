var express = require('express');
var controller = require('./controller');
var upload = require('./multer_config');
var router = express.Router();

router.get('/', (req, res) => {
    return res.send('Hospital El Alerce');
});

router.post('/paciente', controller.new);
router.get('/pacientes/:last?', controller.getPacientes);
router.get('/paciente/:id', controller.getPaciente);
router.put('/paciente/:id', controller.update);
router.delete('/paciente/:id', controller.delete);
router.get('/paciente/search/:search', controller.search);

router.post('/paciente/foto/:id?', upload, controller.upload);
router.get('/paciente/foto/:filename', controller.getPhoto);

module.exports = router;
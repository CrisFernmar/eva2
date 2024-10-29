var mongoose = require('mongoose');
var app = require('./app');

var port = 3000;

mongoose.connect('mongodb://localhost:27017/paciente', {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log('mongo is connected');

    app.listen(port, ()=>{
        console.log('server is running');
    });
}).catch(error => console.log(error));

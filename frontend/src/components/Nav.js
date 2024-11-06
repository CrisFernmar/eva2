import React, {Component} from 'react';

import {NavLink} from 'react-router-dom';


class Nav extends Component {
    render(){
        var cabecera="Menu de Navegacion";

        return(
            <div>
                <h1> {cabecera} </h1>
                <ul>
                    <li><NavLink to="/inicio">Inicio</NavLink></li>
                    <li><NavLink to="/paciente/nuevo">Agregar Paciente</NavLink></li>
                    <li><NavLink to="/pacientes/:last?">Listar Pacientes</NavLink></li>
                    <li><NavLink to="/paciente/buscar/termino">Buscar paciente</NavLink></li>
                </ul>
            </div>

        )
        ;
    }
}
export default Nav;
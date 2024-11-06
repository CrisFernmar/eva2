import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Nav from '../src/components/Nav';
import URL from '../src/components/Url';

import Inicio from '../src/components/inicio'; 
import AgregarPaciente from '../src/components/agregarPaciente';
import ActualizarPaciente from '../src/components/actualizarPaciente';
import DetallePaciente from '../src/components/detallePaciente';
import ListarPacientes from '../src/components/listarPacientes';
import BuscarPaciente from '../src/components/buscarPaciente';


class Router extends Component {
    
    render() {
        return (
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/paciente/nuevo" element={<AgregarPaciente />} />
                    <Route path="/paciente/actualizar/:id" element={<ActualizarPaciente />} />
                    <Route path="/paciente/detalle/:id" element={<DetallePaciente />} />
                    <Route path="/pacientes/:last?" element={<ListarPacientes />} />
                    <Route path="/url/:id" element={<URL />} />
                    <Route path="/paciente/buscar/:search" element={<BuscarPaciente />} />
                    <Route path="/redirect/:search" element={({ match }) => {
                        const search = match.params.search;
                        return <Navigate to={`/paciente/buscar/${search}`} />;
                    }} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Router;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';

export default function ListarPacientes({ home, search }) {
    const [pacientes, setPacientes] = useState([]);
    const [status, setStatus] = useState(null);
    const url = Global;

    useEffect(() => {
        if (home === 'true') {
            getLastsPacientes();
        } else if (search && search !== null && search !== undefined) {
            getPacientesBySearch(search);
        } else {
            getPacientes();
        }
    }, [home, search]);

    const getPacientes = () => {
        console.log(url.API + '/pacientes/')
        axios.get(url.API + '/pacientes')
            .then(res => {
                setPacientes(res.data.pacientes);
                setStatus('success');
            })
            .catch(err => {
                setStatus('error');
                console.error("Error fetching pacientes:", err);
            });
    };

    const getLastsPacientes = () => {
        axios.get(url.API + '/pacientes/last')
            .then(res => {
                setPacientes(res.data.pacientes);
                setStatus('success');
            })
            .catch(err => {
                setStatus('error');
                console.error("Error fetching last pacientes:", err);
            });
    };

    const getPacientesBySearch = (search) => {
        axios.get(url.API + '/pacientes/search/' + search)
            .then(res => {
                if (res.data.pacientes && res.data.pacientes.length > 0) {
                    setPacientes(res.data.pacientes);
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            })
            .catch(err => {
                setStatus('error');
                console.error("Error searching pacientes:", err);
            });
    };

    if (status === 'success' && pacientes.length > 0) {
        return (
            <table border="1">
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Foto</td>
                        <td>Opciones</td>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map((paciente) => (
                        <tr key={paciente._id}>
                            <td>{paciente.nombre}</td>
                            
                            <td>
                                {
                                    paciente.fotoPersonal ? (
                                        <img
                                            src={url.API + '/paciente/foto/' + paciente.fotoPersonal}
                                            alt={paciente.nombre}
                                            height="100px"
                                            width="100px"
                                        />
                                    ) : (
                                        <img
                                            src=""
                                            alt={paciente.nombre}
                                            height="100px"
                                            width="100px"
                                        />
                                    )
                                }
                            </td>
                            <td><Link to={'/paciente/detalle/' + paciente._id}>Detalles</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    } else if (status === 'success' && pacientes.length === 0) {
        return <div><h2>No hay pacientes para mostrar</h2></div>;
    } else {
       
    }
}

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import Global from '../Global';



const DetallePaciente = () => {
    const { id } = useParams();
    const url = Global;


    const [paciente, setPaciente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                console.log(id);
                const response = await axios.get( url.API + `/paciente/${id}`);                
                
                setPaciente(response.data.paciente);
                setLoading(false); 
            } catch (err) {
                setError("Error al obtener los detalles del paciente");
                setLoading(false);  
            }
        };

        fetchPaciente();
    }, [id]);

    if (loading) {
        return <h2>Cargando...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="detalle-paciente">
            <h1>Detalles del Paciente</h1>
            {paciente ? (
                <div>
                    <p><strong>Nombre:</strong> {paciente.nombre}</p>
                    <p><strong>Edad:</strong> {paciente.edad}</p>
                    <p><strong>Diagnóstico:</strong> {paciente.diagnostico}</p>
                    <p><strong>Fecha de ingreso:</strong> {new Date(paciente.fechaIngreso).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>No se encontraron detalles para este paciente.</p>
            )}
        </div>
    );
};

export default DetallePaciente;

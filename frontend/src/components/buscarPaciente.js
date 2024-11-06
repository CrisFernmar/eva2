import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Global from '../Global';

const BuscarPaciente = () => {
    const { search } = useParams(); 
    const [inputSearch, setInputSearch] = useState(search || ""); 
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const url = Global;

    const fetchPacientes = async (searchTerm) => {
        try {
            console.log(url.API + `/paciente/search/${searchTerm}`)
            const response = await axios.get(url.API + `/paciente/search/${searchTerm}`);
            setPacientes(response.data.pacientes);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("No se encontraron pacientes o hubo un error al buscar.");
        }
    };

    
    useEffect(() => {
        setLoading(true);
        fetchPacientes(search);
    }, [search]); 
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setInputSearch(value); 
    };

    const handleSearchSubmit = () => {
        if (inputSearch) {
            navigate(`/paciente/buscar/${inputSearch}`); 
        }
    };

    return (
        <div>
            <h1>Buscar Paciente</h1>
            <div>
                <input
                    type="text"
                    placeholder="Buscar paciente por sexo, enfermedad o fecha"
                    value={inputSearch}
                    onChange={handleSearchChange} 
                />
                <button onClick={handleSearchSubmit}>Buscar</button>
            </div>

            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            {pacientes.length === 0 && !loading && !error && (
                <p>No se encontraron pacientes para esa búsqueda.</p>
            )}

            <div>
                {pacientes.map((paciente) => (
                    <div key={paciente._id}>
                        <h2>{paciente.nombre}</h2>
                        <p>Sexo: {paciente.sexo}</p>
                        <p>Fecha de ingreso: {paciente.fechaIngreso}</p>
                        <p>Enfermedad: {paciente.enfermedad}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuscarPaciente;

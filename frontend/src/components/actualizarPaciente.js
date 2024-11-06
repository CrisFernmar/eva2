import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import SimpleReactValidator from 'simple-react-validator';

export default function ActualizarPaciente() {
    const { id } = useParams();
    const [paciente, setPaciente] = useState({
        rut: '',
        nombre: '',
        edad: '',
        sexo: '',
        fotoPersonal: '',
        enfermedad: ''
    });
    const [status, setStatus] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [newPhoto, setNewPhoto] = useState('');

    const rutRef = useRef();
    const nombreRef = useRef();
    const edadRef = useRef();
    const sexoRef = useRef();
    const fotoPersonalRef = useRef();
    const enfermedadRef = useRef();

    const url = Global.API;
    const navigate = useNavigate();
    const validator = useRef(new SimpleReactValidator());

    const getPacienteById = (id) => {
        axios.get(`${url}/paciente/${id}`).then((res) => {
            const userData = res.data.paciente;
            setPaciente(userData);
            setNewPhoto(userData.fotoPersonal);
        });
    };

    const changeState = () => {
        setPaciente({
            rut: rutRef.current.value,
            nombre: nombreRef.current.value,
            edad: edadRef.current.value,
            sexo: sexoRef.current.value,
            fotoPersonal: fotoPersonalRef.current.value,
            enfermedad: enfermedadRef.current.value
        });
    };

    const fileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const actualizarPaciente = (e) => {
        e.preventDefault();

        if (validator.current.allValid()) {
            changeState();

            axios.put(`${url}/paciente/${id}`, paciente).then((res) => {
                if (res.data.paciente) {
                    setStatus('waiting');

                    if (photo !== null) {
                        const formData = new FormData();
                        formData.append('file', photo, photo.name);

                        axios
                            .post(`${url}/paciente/foto/${id}`, formData)
                            .then((res) => {
                                if (res.data.paciente) {
                                    setStatus('success');
                                    setPaciente(res.data.paciente);
                                } else {
                                    setStatus('error');
                                }
                            });
                    } else {
                        setStatus('success');
                    }
                } else {
                    setStatus('error');
                }
            });
        } else {
            validator.current.showMessages();
            setPaciente({ ...paciente });
        }
    };

    React.useEffect(() => {
        getPacienteById(id);
    }, [id]);

    if (status === 'success') {
        navigate('/');
    }

    return (
        <div>
            <form onSubmit={actualizarPaciente}>
                <table>
                    <tbody>
                        <tr>
                            <td>Rut</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Ingrese rut del paciente"
                                    ref={rutRef}
                                    defaultValue={paciente.rut}
                                    onChange={changeState}
                                />
                                {validator.current.message('rut', paciente.rut, 'required')}
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Ingrese Nombre"
                                    ref={nombreRef}
                                    defaultValue={paciente.nombre}
                                    onChange={changeState}
                                />
                                {validator.current.message('nombre', paciente.nombre, 'required')}
                            </td>
                        </tr>
                        <tr>
                            <td>Edad</td>
                            <td>
                                <input
                                    type="number"
                                    placeholder="Ingrese Edad"
                                    ref={edadRef}
                                    defaultValue={paciente.edad}
                                    onChange={changeState}
                                />
                                {validator.current.message('edad', paciente.edad, 'required|numeric')}
                            </td>
                        </tr>
                        <tr>
                            <td>Sexo</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Ingrese Sexo"
                                    ref={sexoRef}
                                    defaultValue={paciente.sexo}
                                    onChange={changeState}
                                />
                                {validator.current.message('sexo', paciente.sexo, 'required')}
                            </td>
                        </tr>
                        <tr>
                            <td>Foto del paciente</td>
                            <td>
                                <input
                                    type="file"
                                    onChange={fileChange}
                                />
                                {paciente.fotoPersonal && (
                                    <img
                                        src={`${url}/paciente/foto/${newPhoto}`}
                                        alt={paciente.fotoPersonal}
                                        width="275px"
                                        height="250px"
                                    />
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Enfermedad</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Ingrese Enfermedad"
                                    ref={enfermedadRef}
                                    defaultValue={paciente.enfermedad}
                                    onChange={changeState}
                                />
                                {validator.current.message('enfermedad', paciente.enfermedad, 'required')}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" value="Actualizar Paciente" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

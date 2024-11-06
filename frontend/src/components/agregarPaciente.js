import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Global from '../Global';
import SimpleReactValidator from "simple-react-validator";

const rutRef = React.createRef();
const nombreRef = React.createRef();
const edadRef = React.createRef();
const sexoRef = React.createRef();
const fotoPersonalRef = React.createRef();
const enfermedadRef = React.createRef();

export default function AgregarPaciente() {
    const [revisado, setRevisado] = useState(false);
    const [paciente, setPaciente] = useState({
        rut: '',
        nombre: '',
        edad: '',
        sexo: '',
        fotoPersonal: '',
        enfermedad: '',
        revisado: false
    });

    const url = Global;
    const navigate = useNavigate();

    const validator = useRef(new SimpleReactValidator());

    const changeState = () => {
        setPaciente({
            rut: rutRef.current.value,
            nombre: nombreRef.current.value,
            edad: edadRef.current.value,
            sexo: sexoRef.current.value,
            fotoPersonal: fotoPersonalRef.current.value,
            enfermedad: enfermedadRef.current.value,
            revisado: revisado
        });
    };

    const handleCheckboxChange = (e) => {
        setRevisado(e.target.checked);
        changeState();
    };

    const agregarPaciente = (e) => {
        e.preventDefault();
        
        if (validator.current.allValid()) {
            changeState();
			console.log(paciente.edad,paciente.enfermedad,paciente.nombre,paciente.revisado, paciente.rut, paciente.sexo)

            axios.post(url.API + '/paciente/', paciente)
                .then(res => {
                    if (res.data.success) {
                        navigate("/pacientes");
                    } else {
                        console.error("Error al agregar el paciente");
                    }
                })
                .catch(error => {
                    console.error("Error en la solicitud:", error);
                });
        } else {
            validator.current.showMessages();
            setPaciente({ ...paciente });
        }
    };

    return (
        <form onSubmit={agregarPaciente}>
            <table>
                <tbody>
                    <tr>
                        <td>Rut</td>
                        <td>
                            <input
                                type="text"
                                placeholder="Ingrese rut del Paciente"
                                ref={rutRef}
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
                                placeholder="Ingrese la edad"
                                ref={edadRef}
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
                                onChange={changeState}
                            />
                            {validator.current.message('sexo', paciente.sexo, 'required')}
                        </td>
                    </tr>
                    <tr>
                        <td>Foto del paciente</td>
                        <td>
                            <input
                                type="text"
                                placeholder="Ingrese el link de la foto"
                                ref={fotoPersonalRef}
                                onChange={changeState}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Enfermedad</td>
                        <td>
                            <input
                                type="text"
                                placeholder="Ingrese Enfermedad"
                                ref={enfermedadRef}
                                onChange={changeState}
                            />
                            {validator.current.message('enfermedad', paciente.enfermedad, 'required')}
                        </td>
                    </tr>
                    <tr>
                        <td>Paciente revisado?</td>
                        <td>
                            <input
                                type="checkbox"
                                checked={revisado}
                                onChange={handleCheckboxChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="submit" value="Agregar" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

import React, { useState, useEffect } from 'react';
import { createusersb } from '../../helpers/CRUD/CREATE/CREATESB';
import { GetPrimaryData } from '../../helpers/CRUD/READ/GetDataSb';
import AutoCompleteRemoForteForm from '../molecules/fields/AutocompleteForFroms';


const RegisterSb = () => {
    const [codigo, setCodigo] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [nombres, setNombres] = useState('');
    const [cargo, setCargo] = useState('');
    const [rol, setRol] = useState('usuario');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [location, setLocation] = useState([]);
    const [subdepartament, setSubdepartament] = useState([]);
    const [departament, setDepartament] = useState([]);
    const [area, setArea] = useState([]);



    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para enviar los datos de registro al servidor
        const userData = {
            cod: codigo.toUpperCase(),
            lastname: apellidos.toUpperCase(),
            name: nombres.toUpperCase(),
            cargo: cargo.toUpperCase(),
            rol: rol.toUpperCase(),
            email: correo.toUpperCase(),
            password: contrasena
        };
        console.log(userData); // Solo para propósitos de demostración, reemplazar con el envío al servidor
        //createusersb(userData);
    };
    const handleSubdepartamentChange = (newSubdepartament) => {
        setSubdepartament(newSubdepartament);
        console.log(newSubdepartament);
    };

    const handleDepartamentChange = (newDepartament) => {
        setDepartament(newDepartament);
        console.log(newDepartament);
    };
    const handleAreaChange = (newArea) => {
        setArea(newArea);
        console.log(newArea);
    };
    const handleLocationChange = (newLocation) => {
        setLocation(newLocation);
        console.log(newLocation);
    };



    return (
        <div className="pagina">
            <h2 className='tittlepage'>Registro de usuarios</h2>
            <div className="max-w-md mx-auto bg-blue-gray-100 p-8 rounded-lg shadow-xl w-full">
                <h2 className="text-2xl font-semibold mb-4">Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
                            Código
                        </label>
                        <input
                            type="text"
                            id="codigo"
                            name="codigo"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
                            Apellidos
                        </label>
                        <input
                            type="text"
                            id="apellidos"
                            name="apellidos"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value.toUpperCase())}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
                            Nombres
                        </label>
                        <input
                            type="text"
                            id="nombres"
                            name="nombres"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={nombres}
                            onChange={(e) => setNombres(e.target.value.toUpperCase())}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
                            Cargo
                        </label>
                        <input
                            type="text"
                            id="cargo"
                            name="cargo"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value.toUpperCase())}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Rol
                        </label>
                        <select
                            id="role"
                            name="role"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                            <option value="GERENTE">GERENTE</option>
                            <option value="JEFE">JEFE</option>
                            <option value="SUPERVISOR">SUPERVISOR</option>
                            <option value="USUARIO">ENCARGADO</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Sede
                        </label>
                        <AutoCompleteRemoForteForm db="detaillocationzone" dataprops={["lcdtcod", "lcdtdesc"]} value={location} onChange={handleLocationChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subdepartament" className="block text-sm font-medium text-gray-700">
                            Subdepartamento
                        </label>
                        <AutoCompleteRemoForteForm db="subdepartamentdetail" dataprops={["sdptdtcod", "sdptdtdesc"]} value={subdepartament} onChange={handleSubdepartamentChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="departament" className="block text-sm font-medium text-gray-700">
                            Departamento
                        </label>
                        <AutoCompleteRemoForteForm db="departamentdetail" dataprops={["dptdtcod", "dptdtdesc"]} value={departament} onChange={handleDepartamentChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                            Área
                        </label>
                        <AutoCompleteRemoForteForm db="detailareazone" dataprops={["azcod", "azdesc"]} value={area} onChange={handleAreaChange} />

                    </div>
                    <div className="mb-4">
                        <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                            Correo
                        </label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value.toUpperCase())}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterSb;

import React, { useState, useEffect } from 'react';
import { createusersb } from '../../helpers/CRUD/CREATE/CREATESB';
import { GetPrimaryData } from '../../helpers/CRUD/READ/GetDataSb';
import AutoCompleteRemoForteForm from '../molecules/fields/AutocompleteForFroms';


const RegisterSb = () => {
    const [codigo, setCodigo] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [nombres, setNombres] = useState('');
    const [cargo, setCargo] = useState('');
    const [rol, setRol] = useState('ADMINISTRADOR');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [location, setLocation] = useState([]);
    const [subdepartament, setSubdepartament] = useState([]);
    const [departament, setDepartament] = useState([]);
    const [area, setArea] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    



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
            password: contrasena,
            location: location.length == 0 ? null : location,
            subdepartament: subdepartament.length == 0 ? null : subdepartament,
            departament: departament.length == 0 ? null : departament,
            area: area.length == 0 ? null : area,
            suuser: rol === 'ADMINISTRADOR' ? true : false,

        };
        console.log(userData); // Solo para propósitos de demostración, reemplazar con el envío al servidor
        createusersb(userData);
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
    const handleRoleChange = (newRole) => {
        setRol(newRole);
        // Reiniciar los campos de autocompletado
        setLocation([]);
        setSubdepartament([]);
        setDepartament([]);
        setArea([]);
    };
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
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
                            required
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
                            required
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
                            required
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
                            required
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
                            required
                            onChange={(e) => handleRoleChange(e.target.value)}
                        >
                            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                            <option value="GERENTE">GERENTE</option>
                            <option value="JEFE">JEFE</option>
                            <option value="SUPERVISOR">SUPERVISOR</option>

                        </select>
                    </div>

                    {/* Autocompletado para Sede */}
                    {rol === 'GERENTE' || rol === 'SUPERVISOR' || rol === 'JEFE' || rol === 'ENCARGADO' ? (
                        <div className="mb-4">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Sede
                            </label>
                            <AutoCompleteRemoForteForm required db="detaillocationzone" dataprops={["lcdtcod", "lcdtdesc"]} value={location} onChange={handleLocationChange} />
                        </div>
                    ) : null}

                    {/* Autocompletado para Subdepartamento */}
                    {rol === 'SUPERVISOR' ? (
                        <div className="mb-4">
                            <label htmlFor="subdepartament" className="block text-sm font-medium text-gray-700">
                                Subdepartamento
                            </label>
                            <AutoCompleteRemoForteForm required db="subdepartamentdetail" dataprops={["sdptdtcod", "sdptdtdesc"]} value={subdepartament} onChange={handleSubdepartamentChange} />
                        </div>
                    ) : null}

                    {/* Autocompletado para Departamento */}
                    {rol === 'JEFE' ? (
                        <div className="mb-4">
                            <label htmlFor="departament" className="block text-sm font-medium text-gray-700">
                                Departamento
                            </label>
                            <AutoCompleteRemoForteForm required db="departamentdetail" dataprops={["dptdtcod", "dptdtdesc"]} value={departament} onChange={handleDepartamentChange} />
                        </div>
                    ) : null}

                    {/* Autocompletado para Área */}
                    {rol === 'GERENTE' ? (
                        <div className="mb-4">
                            <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                                Área
                            </label>
                            <AutoCompleteRemoForteForm required db="detailareazone" dataprops={["azcod", "azdesc"]} value={area} onChange={handleAreaChange} />
                        </div>
                    ) : null}
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
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="contrasena"
                            name="contrasena"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                        <button
                            type="button"
                            className=" top-2 right-2 p-1 rounded-md text-gray-600 hover:text-gray-800"
                            onClick={handleShowPassword}
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
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

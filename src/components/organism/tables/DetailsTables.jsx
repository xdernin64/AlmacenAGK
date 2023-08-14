import React, { useState, useEffect } from 'react';
import { getdata } from '../../../helpers/CRUD/READ/GetAreasData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { deleteDataSwal } from '../../../helpers/Alerts/alerts';
import { deleteDetailData } from '../../../helpers/CRUD/DELETE/DelFunctions';
const DetailTables = ({ detailname, detailnameprops,detailprops,editing }) => {
    const [data, setData] = useState([]);
    //const [detailprops, setDetailprops] = useState([]);
    const [propname1 = "", propname2 = "", propname3 = ""] = detailnameprops;
    const handleModifDetails = (prop,name,nameprops) => {
        detailprops(prop);
        editing(true);
        detailname(name);
        detailnameprops(nameprops);
    }
    const handleModif = () => {
        editing(true);
    }


    useEffect(() => {
        const unsubscribe = getdata(`details/${detailname}/general`, null, (results) => {
            setData(results);
        });
        return () => unsubscribe();
    }, []);
    const Menubuttons = ({ id,props,detailname,detailnameprops }) => {
        return (
            <Menu>
                <MenuHandler>
                    <ListIcon />
                </MenuHandler>
                <div className='bg-gray-700'>
                <MenuList className='bg-blue-gray-600'>
                    <MenuItem 
                    onClick={() =>handleModif()}
                    ><EditIcon /> Editar</MenuItem>
                    <MenuItem onClick={() => deleteDataSwal(
                        (() => deleteDetailData(detailname, id)), "Se eliminaran todos los datos relacionados", "Error al eliminar los datos", "Datos eliminados correctamente"
                    )}><DeleteIcon/> Eliminar</MenuItem> 
                </MenuList></div>
            </Menu>
        );
    }
    

    return (
        <>
            {(data !== undefined) ? (
                <table className="table table-striped table-hover">
                    <thead>
                        <tr className='bg-gray-800 text-white rounded-t-md'>
                            <th className='w-10' scope='col'></th>
                            <th scope="col">Codigo</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className='border-b border-gray-800'>
                                <td className='cursor-pointer'><Menubuttons id={item[propname1]} 
                                props={item} detailname={detailname} detailnameprops={detailnameprops}/></td>
                                <td>{item[propname1]}</td>
                                <td>{item[propname2]}</td>
                                <td>{item[propname3]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center">Cargando...</div>
            )}
        </>
    )
}
export default DetailTables
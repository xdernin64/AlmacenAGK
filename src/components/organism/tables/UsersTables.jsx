import React from 'react';
import { useState, useEffect } from 'react';

import { getdata } from '../../../helpers/CRUD/READ/GetAreasData';
import DataGrid, {
    Column,
    Editing,
    Popup,
    Paging,
    Lookup,
    Form,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
const UsersTable = () => {
    const [userData, setUserData] = useState([{}])
    const notesEditorOptions = { height: 100 };

    const columns = [
        { dataField: 'codigo', caption: 'Codigo', key: 'codigo' },
        { dataField: 'apellidos', caption: 'Apellidos', key: 'apellidos' },
        { dataField: 'nombres', caption: 'Nombres', key: 'nombres' },
        { dataField: 'dni', caption: 'DNI', key: 'dni' },
        { dataField: 'ubicacion', caption: 'Ubicacion', key: 'ubicacion' },
        { dataField: 'tipo', caption: 'Tipo', key: 'tipo' },
    ];
        // Custom confirmation message for delete
        const deleteConfirmationMessage = (data) => {
            return `¿Estás seguro de que deseas eliminar el elemento con código ${data.codigo}?`;
        };

    useEffect(() => {
        const unsubscribe = getdata('users', null, (results) => {
            //only ta,e codigo apellidos nombres ubicacion
            setUserData(results);
        });
        return () => unsubscribe();
    }, [])
    return (
        <>
            {(userData !== undefined ? (
                <div id="data-grid-demo">
                    <DataGrid
                        dataSource={userData}
                        
                        showBorders={true}
                    >
                        <Paging enabled={false} />
                        <Editing
                            mode="popup"
                            allowUpdating={true}
                            allowAdding={false}
                            allowDeleting={true}
                            confirmDelete={"dsds"}
                            >
                            
                            
                            <Popup title="Informacion Princiapal" showTitle={true} width={700} height={525} />
                            <Form>
                                <Item itemType="group" colCount={2} colSpan={2}>
                                    <Item dataField="codigo"  />
                                    <Item dataField="apellidos" />
                                    <Item dataField="nombres" />
                                    <Item dataField="dni" />
                                    <Item dataField="ubicacion" />
                                </Item>

                                <Item itemType="group" caption="Informacion adicional" colCount={2} colSpan={2}>
                                    <Item dataField="fingreso" />
                                    <Item dataField="Address" />
                                </Item>
                            </Form>
                        </Editing>
                        <Column dataField="codigo" caption="Codigo" width={70} />
                        <Column dataField="apellidos" />
                        <Column dataField="nombres" />
                        <Column dataField="dni"  />
                        <Column dataField="ubicacion" width={170} />
                        <Column dataField="tipo" />
                    </DataGrid>
                </div>
            ) : (<div></div>))}
        </>
    );
}
export default UsersTable;
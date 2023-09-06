import { ThemeProvider, createTheme } from "@mui/material"
import { getDay, getSpanishDate } from "../../../helpers/date";
import { useState } from "react";
import { useEffect } from "react";
import { GetPrimaryData } from "../../../helpers/CRUD/READ/GetDataSb";
import MaterialTable from "material-table";



const ConsolidadoTable = () => {
    const [data, setData] = useState([]); //table data
    const [customfields, setCustomfields] = useState([]); //table data
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        GetPrimaryData(
            'assistence',
            'cod, dateas, user(name, lastname), cecodetail(ceco(cecocod, ceconame)), occupationdetail(occupation(occupationcod, occupationname)), workdetail(work(workcod, workname))'
        ).then((r) => {
            // Add 'day' property to each item in the data
            const updatedData = r.map((item) => ({
                ...item,
                namelastname: `${item.user.name} ${item.user.lastname}`,
                day: getDay(item.dateas),
                date: getSpanishDate(item.dateas),

                // Use getDay to calculate 'day' from 'dateas'
            }));
            setData(updatedData);
            setLoading(false);
        });
    }, []);

    const theme = createTheme();
    const columns = [
        { title: 'Codigo', field: 'cod', editable: 'never',
        cellStyle: {
            textAlign: 'center',
            color:"#0000CC",
            fontFamily: 'calibri'
        }
    },
        {
            //i wanto to have more weight to this column
            title: 'NOMBRES Y APELLIDOS', field: 'namelastname', editable: 'never',
            //i want to have more width in my column as two columns
            width: '40%',
            cellStyle: {
                textAlign: 'center',
                color:"#0000CC",
                fontFamily: 'calibri'
            }
        },
        {
            title: 'DIA', field: 'day', editable: 'never',
        },
        {
            title: 'FECHA', field: 'date', editable: 'never',
        },
        {
            title: "Cod Ocup.", field: "occupationdetail.occupation.occupationcod", editable: 'never'
        },
        {
            title: "Ocupacion", field: "occupationdetail.occupation.occupationname", editable: 'never'
        },
        {
            title: "Cod Labor", field: "workdetail.work.workcod", editable: 'never',
            cellStyle: {
                backgroundColor: '#FFFFCC',
                textAlign: 'center',
            }
        },
        {
            title: "Labor", field: "workdetail.work.workname", editable: 'never'
        },
        {
            title: "Cod ceco", field: "cecodetail.ceco.cecocod", editable: 'never'
        },
        {
            title: "Centro de Coste", field: "cecodetail.ceco.ceconame", editable: 'never'
        }
    ]


    return (
        <div className="pagina">
            <ThemeProvider theme={theme}>
                <MaterialTable
                    title="Consolidado"
                    columns={columns}
                    data={data}
                    options={{
                        exportButton: true,
                        headerStyle: {
                            backgroundColor: '#95B3D7 ',
                            color: '#000',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: 'calibri',
                            textAlign: 'center',
                        },
                        rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        actionsCellStyle: {
                            backgroundColor: '#FFF',
                        },
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 30],
                        emptyRowsWhenPaging: true,
                        addRowPosition: 'first',
                        actionsColumnIndex: -1,
                        exportAllData: true,
                        exportFileName: 'Consolidado',

                        grouping: true,
                        search: true,
                        showSelectAllCheckbox: true,
                        showTextRowsSelected: true,
                        selection: true,
                        showTitle: true,
                        toolbarButtonAlignment: 'right',
                        headerSelectionProps: {
                            color: 'primary'
                        },
                        selectionProps: rowData => ({
                            disabled: rowData.disabled
                        })
                    }}

                />
                
            </ThemeProvider>

        </div>
    )
}
export default ConsolidadoTable;
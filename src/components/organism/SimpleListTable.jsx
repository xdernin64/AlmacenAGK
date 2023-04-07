import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const SimpleListTable = ({ id }) => {
    const [tableData, setTableData] = useState();
    const getdata = async () => {
        const { data, error } = await supabase
            .from('productos_pedidos')
            .select('id,codiproduct(NAME),quantityproduct,date').eq('codpedido', id)
            .order('date', { ascending: false })
            
        setTableData(data);
        console.log(error);
    };
    useEffect(() => {
        getdata();
    }
        , [id]);
    return (
        <div>
            {tableData != undefined ? (<div>
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={
                            {
                
                                '&:last-child td, &:last-child th': {
                                    color: "white",
                                },
                            }
                        }>
                            <TableCell>Producto</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.codiproduct.NAME}</TableCell>
                                <TableCell>{item.quantityproduct}</TableCell>
                                <TableCell>{item.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                </TableContainer>
            </div>) : (<div>loading</div>)}
        </div>
    );
}
export default SimpleListTable;
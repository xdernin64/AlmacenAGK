import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { sumarDias } from '../../charts/chartshelpers/functionhelpers';
import { GetPrimaryDataBetweenDates } from '../../../helpers/CRUD/READ/GetDataSb';





const PopverHistorial = ({anchorEl,handlePopoverOpen,handlePopoverClose,open,codigo,fecha ,openmodal}) => {
    const [listaasistencias, setListaasistencias] = React.useState([])
    sumarDias(fecha, -4)

    React.useEffect(() => {
        GetPrimaryDataBetweenDates(
            'assistence',
            'dateas,occupationdetail(occupation(occupationcod, occupationname)), workdetail(work(workcod, workname))', {cod:codigo}, sumarDias(fecha, -4), fecha

        ).then((r) => {
            // Add 'day' property to each item in the data
            
            setListaasistencias(r)
            console.log("Registros:",r)
        });
        
    }, [openmodal]);
        
    return (
        <div>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                Historial  
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>
                codigo: {codigo} desde:{sumarDias(fecha,-3)}  hasta:{fecha} 
                    <div>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Labor</th>
                                <th>Ubicación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaasistencias === undefined ? <tr><td colSpan="3">No hay registros</td></tr> : 
                            (
                                listaasistencias.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.dateas}</td>
                                            <td>{item.occupationdetail.occupation.occupationname}</td>
                                            <td>{item.workdetail.work.workname}</td>
                                        </tr>
                                    )
                                })
                            )
                            }
                            
                        </tbody>
                        
                    </div>
                </Typography>
            </Popover>
        </div>
    );
}
export default PopverHistorial;
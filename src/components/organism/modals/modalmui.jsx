import { Button, Dialog } from "@mui/material";

const Modalmui = ({open,onClose,value}) => {
    console.log(value);
    return (
        
            <Dialog
                open={open}
            >
            <h1>Modal MUI</h1>
            <Button onClick={onClose}>Cerrar</Button>
            {value}
            </Dialog>

        
    );
};
export default Modalmui;
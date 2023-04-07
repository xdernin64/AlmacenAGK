import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Box } from "@mui/material";
const Btnfloat = (state) => {
    return (
        <>
            {
                state ? (
                    <div className="contenido max-w-256 m-auto">
                        <Box >
                            <Fab color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                            <Fab color="secondary" aria-label="edit">
                                <EditIcon />
                            </Fab>
                            <Fab variant="extended">
                                <NavigationIcon sx={{ mr: 1 }} />
                                Navigate
                            </Fab>
                            <Fab disabled aria-label="like">
                                <FavoriteIcon />
                            </Fab>
                        </Box></div>) : (<></>)
            }

        </>)
}
export default Btnfloat;
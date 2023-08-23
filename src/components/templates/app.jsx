import { Outlet } from "react-router-dom"
import MainMenu from "../molecules/header/mainmenu"
import MainHeader from "../organism/MainHeader";
import Container from '@mui/material/Container';




const App = ({ state }) => {

    return (

        <>
            {state ? (
            <Container className="pt-5">
                <MainHeader >
                        <MainMenu />
                </MainHeader>  
                
                        <Outlet />
                </Container>        
            
            ) : (<></>)}

        </>
    )
}
export default App;
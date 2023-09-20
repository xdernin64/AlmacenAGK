import { Outlet } from "react-router-dom"
import MainMenu from "../molecules/header/mainmenu"
import MainHeader from "../organism/MainHeader";
import Container from '@mui/material/Container';
import React from "react";
const MainMenuMemo = React.memo(MainMenu);
const MainHeaderMemo = React.memo(MainHeader);

const App = ({ state , rol }) => {
    return  (
        <>
            {state ? (
            <Container className="pt-5">
                <MainHeaderMemo >
                        <MainMenuMemo rol={rol}/>
                </MainHeaderMemo>  
                
                        <Outlet />
                </Container>        
            
            ) : (<></>)}

        </>
    )
}
export default App;

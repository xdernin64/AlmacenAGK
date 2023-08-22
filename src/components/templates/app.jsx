import { Outlet } from "react-router-dom"
import MainMenu from "../molecules/header/mainmenu"
import MainHeader from "../organism/MainHeader";
import { Container } from "semantic-ui-react";
import * as React from 'react';



const App = ({ state }) => {

    return (
        <>
            {state ? (<>
                <MainHeader >
                    <Container>
                        <MainMenu />
                    </Container>
                </MainHeader>                
                    <Container>
                        <Outlet />
                    </Container>
            </>) : (<></>)}

        </>
    )
}
export default App;
import { Outlet } from "react-router-dom"
import MainMenu from "../molecules/header/mainmenu"
import MainHeader from "../organism/MainHeader";
import { Container } from "semantic-ui-react";

const App = () => {

    return (
        <MainHeader >
            <Container>
            <MainMenu />
            </Container>
        </MainHeader>
    )
}
export default App;
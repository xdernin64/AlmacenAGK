import { Outlet } from "react-router-dom"
import MainMenu from "../molecules/header/mainmenu"
import MainHeader from "../organism/MainHeader";

const App = () => {

    return (
        <MainHeader >
            <MainMenu>
            </MainMenu>
            <Outlet />
                
        </MainHeader>



    )
}
export default App;
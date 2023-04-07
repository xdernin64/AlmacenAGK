
import { Container } from "semantic-ui-react"
import Logo from "../molecules/header/logo"

const MainHeader = ({ children }) => {
    return (


        <div className="navbar fixed  w-full h-20 z-10">
            <Container>
                <div className="containernav w-full m-auto flex items-center lg:max-w-256 ">
                    <Logo className="h-auto" />
                    {children}
                </div>
            </Container>
        </div>

    )
}
export default MainHeader
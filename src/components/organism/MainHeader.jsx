
import { Container } from "semantic-ui-react"
import Logo from "../molecules/header/logo"

const MainHeader = ({ children }) => {
    return (


        <div >
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
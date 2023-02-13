import { createContext } from "react";
import { Authstate } from "../../firebase";
import { supabase } from "../../supabaseClient";
const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const id = (Authstate().uid);
    useEffect(() => {
        if (id) {
            const userfetch = async () => {
                const { data, error } = await supabase.from('Usuarios').select().eq('uid', id)
                const json = await data.json();
                setUserData(json);
                console.log(error);
            }
            userfetch().catch(console.error);
        }
    }, []);

    return (
        <UserContext.Provider value={{ userData}}>
            {children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider }
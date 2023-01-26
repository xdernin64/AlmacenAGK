import { useEffect } from "react";
import { Authstate } from "../../firebase";
import { getUser } from "../../supabaseClient";


const Profile  = () => {
    //use effect when user data is loaded

    function usuario () {
        console.log(Authstate().uid); 
        console.log(getUser("uPzimceD1pM9mfECPZjzWQFtMMC2"));     
    }
    return (
        <div className="pagina">
        <h1 className="tittlepage">Perfil de usuario</h1>
        <button className="text-black" onClick={usuario}>Edit Profile</button>
        
        </div>
    );
}
export default Profile;
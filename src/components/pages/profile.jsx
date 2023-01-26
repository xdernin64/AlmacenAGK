import { useEffect } from "react";
import { Authstate } from "../../firebase";
import { getUser } from "../../supabaseClient";


const Profile  = () => {
    //use effect when user data is loaded
    useEffect(()=>{
        //get user data
        console.log(getUser(Authstate().uid));
        

    },[Authstate().uid])

    function usuario () {
        console.log();   
    }
    return (
        <div className="pagina">
        <h1 className="tittlepage">Perfil de usuario</h1>
        <button className="text-black" onClick={usuario}>Edit Profile</button>
        
        </div>
    );
}
export default Profile;
import { useState } from "react";

const Selected=() => {
    const [area , setArea] = useState();
    async function getarea() {
        const {data,error} = await Supabase.Select('Area');
    }
    
    return selected;

    };
export default Selected;
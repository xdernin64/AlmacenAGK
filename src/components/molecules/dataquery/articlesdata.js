import { useEffect, useState } from "react";

export const artdata = async () => {
    const [artdataq, setartdataq] = useState([]);
    async function getartdata() {
    const { data, error } = await supabase.from('Inventario')
        .select('COD, NAME, UM, ARTICLE_DESC')
    setartdataq(data);
    }
    useEffect(() => {
        getartdata();
    }, [artdataq === undefined]);
    return artdataq;    
}


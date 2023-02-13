import { supabase } from "../../supabaseClient";

export async function delarticle(id) {
    const error = await supabase
        .from('Inventario')
        .delete()
        .eq('COD', id)
    console.log(error);
}
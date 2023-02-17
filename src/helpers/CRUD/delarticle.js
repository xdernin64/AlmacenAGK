import { Authstate } from "../../firebase";
import { supabase } from "../../supabaseClient";
export async function getareas() {
    const { data, error } = await supabase
        .from('AREAS')
        .select('*')
    console.log(data,error);
    return data;
}

export async function delarticle(id) {

    const erro1 = await supabase
        .from('Stocks')
        .delete()
        .eq('p_id', id)
    console.log(erro1);

    const error = await supabase
        .from('Inventario')
        .delete()
        .eq('COD', id)
    console.log(error);
}

export async function updatearticle(data) {
    const { error } = await supabase
        .from('Inventario')
        .update(data)
        .eq('COD', data.COD)
    console.log(error);
}

export async function delstock(id) {

    const erro1 = await supabase
        .from('Stocks')
        .delete()
        .eq('tuid', id)
    console.log(erro1);
}


export async function updatestock(data) {
    const { error } = await supabase
        .from('Stocks')
        .update(
            {
            date : data.date,
            quantity : data.quantity,
            tipo :(data.quantity >= 0 ? "Ingreso" : "Egreso"),
            created_at : new Date(),
            user_id:Authstate().uid,
        }
        )
        .eq('tuid', data.tuid)
    console.log(error);
}
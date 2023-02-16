import { supabase } from "../../supabaseClient";

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
        .update(data)
        .eq('tuid', data.COD)
    console.log(error);
}
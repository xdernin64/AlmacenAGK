import Swal from "sweetalert2";


export const deleteDataSwal = async (func, askingMessage, errorMessage, successMessage) => {
    const willDelete = await swal({
        title: "¿Estás seguro?",
        text: askingMessage,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    });

    if (willDelete) {
        try {
            await func();
            swal("Completo!", successMessage, "Completado");
        } catch (error) {
            console.error(errorMessage, error);
            swal("Error!", errorMessage, "error");
        }
    } else {
        swal("Cancelado", "No has eliminado nada", "info");
    }
};
export const successMessage = (tittle) => {
    Swal.fire({
        position: 'center',
        title: tittle,
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    });
}
export const errorMessage = (tittle) => {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: tittle,
        showConfirmButton: false,
        timer: 1500
    });
}
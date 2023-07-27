import swal from 'sweetalert';

export const deleteDataSwal = async (func,askingMessage, errorMessage, successMessage) => {
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
            swal("Completo!", successMessage, "success");
        } catch (error) {
            console.error(errorMessage, error);
            swal("Error!", errorMessage, "error");
        }
    } else {
        swal("Cancelado", "No has eliminado nada", "info");
    }
};

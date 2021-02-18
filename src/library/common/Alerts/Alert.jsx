import Swal from 'sweetalert2'

const Alerts = {

    desitionAlert(msg, user, action, reload) {
        Swal.fire({
            title: msg,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) this.complete(action, reload, user)
            /* else if (result.dismiss === Swal.DismissReason.cancel) this.cancel() */
        })
    },

    complete(action, reload, user) {
        Swal.fire(
            'Eliminado!',
            '',
            'success'
        ).then(() => {
            action(user)
            reload()
        })
    },

    cancel() {
        Swal.fire(
            'Cancelado',
            '',
            'error'
        )
    }
}

export default Alerts;
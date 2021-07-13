import Swal from 'sweetalert2'
import { TokenService } from '../../../main/services/Token/TokenService'; 

const alertTop = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const Alerts = {

    simpleDesitionAlert(msg, object, action) {
        console.log(object);
        Swal.fire({
            title: msg,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) await action(object)
        })
    },

    desitionMultipleAlert(msg, object, objeto2, action, reload, name) {
        Swal.fire({
            title: msg,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                let error = false
                let items = await action(object, objeto2).catch((err) => {
                    error = true
                    this.alertBar('Error Eliminando ' + name, 'error')
                })
                if (!error) Swal.fire('Eliminado!', '', 'success').then(() => { reload(items); })
            }
        })
    },

    desitionAlert(msg, object, action, reload, name) {
        console.log(object);
        Swal.fire({
            title: msg,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                let error = false
                await action(object).catch((err) => {
                    error = true
                    this.alertBar('Error Eliminando ' + name, 'error')
                })
                if (!error) this.complete(action, reload, object)
            }
            /* else if (result.dismiss === Swal.DismissReason.cancel) this.cancel() */
        })
    },

    renewTokenAlert() {
        Swal.fire({
            title: 'La sesión expiró ¿Desea renovarla?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Salir',
            reverseButtons: true
        }).then(async (result) => {
            console.log(result);
            console.log(result.isConfirmed);
            if (result.isConfirmed) TokenService.renewToken();
            else TokenService.notRenew();
        })
    },

    alertBar(msg, icon) {
      alertTop.fire({
        icon: icon,
        title: msg
      })
    },

    complete(action, reload, object) {
        Swal.fire(
            'Eliminado!',
            '',
            'success'
        ).then(() => {
            /* action(object) */
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
import { ConstantMessages } from "../model/constant-messages";

export const appConstantsMessages : ConstantMessages  = {
    "request.loading"           : "Cargando ...",
    "carga.masiva.error.vacio"  : 'El archivo a cargar no puede ser vacio.',
    "carga.masiva.error.nombre"  : 'El nombre del archivo no es válido.',
    "carga.masiva.error.extension"  : 'La extensión del archivo no es válida.',
    "carga.masiva.error.tamanio"  : 'El tamaño del archivo no es válido.',
    "carga.masiva.error.generico" : 'Error en el servicio, por favor intente mas tarde.',

    "table.selected.zero"       : 'Debe seleccionar al menos un registro de la tabla',
    "table.selected.invalidFormat"       : 'Formato inválido de descarga.',
    "extraccion.downloadZip.ok" : 'La descarga de las constancias seleccionadas se esta generando en un ZIP, se le notificara cuando el proceso haya concluido',

    "dialog.confirm.title": 'Confirmación',
    "dialog.confirm.message": '¿Está seguro de que desea continuar?',
    "dialog.confirm.ok": 'Aceptar',
    "dialog.confirm.cancel": 'Cancelar',
    "dialog.error.title": 'Error',
    "dialog.error.message": 'Ha ocurrido un error inesperado. Por favor, intente nuevamente.',
    "dialog.error.ok": 'Aceptar',
    "dialog.success.title": 'Éxito',
    "dialog.success.message": 'Operación realizada con éxito.',
    "dialog.success.ok": 'Aceptar',

    "cancelacion.agregar.ok" : 'Las constancias seleccionadas se han agregado a la bandeja temporal.',
    "cancelacion.cancelar.ok" : 'La cancelación de las constancias seleccionadas se ha iniciado, se le notificara cuando el proceso haya concluido.',
    "cancelacion.motivo.required" : 'El Motivo es requerido, debe seleccionar un motivo de la columna \'Motivo cancelación\'.',
    "cancelacion.comentario.required" : 'El Comentario es requerido, debe agregar un comentario en la columna \'Comentario\'.',

    "bloqueo.bloqueo.success" : 'La constancia ha sido bloqueada exitosamente.',
    "bloqueo.desbloqueo.success" : 'La constancia ha sido desbloqueada exitosamente.',
    "bloqueo.bloqueo.masivo.success" : 'Las constancias seleccionadas ha sido bloqueadas exitosamente.',
    "bloqueo.desbloqueo.masivo.success" : 'Las constancias seleccionadas ha sido desbloqueadas exitosamente.'
}

export class Error {
    errors = {
        'error': {
            title: 'Error',
            desc: 'Ups, lo sentimos hemos encontrado un error'
        },
        'not-found': {
            title: 'No encontrada',
            desc: 'La ruta que buscas no pudo ser encontrada'
        },
        'server': {
            title: 'Error de servidor',
            desc: 'Ocurrio un error al cargar recursos del servidor'
        }
    };

    error = this.errors.error;

    activate(params) {
        if (params.error in this.errors) {
            this.error = this.errors[params.error];
        }
    }
}

import Rol from '../models/rol'
export const createRoles = async () => {
    try {
        const count = await Rol.estimatedDocumentCount()
        if (count > 0) return;
        const values = await Promise.all([
            new Rol({nombre: 'usuario'}).save(),        // Se ejecutarán al mismo tiempo todas las creaciones de roles
            new Rol({nombre: 'moderador'}).save(),      // al terminar retornará los valores de cada una
            new Rol({nombre: 'admin'}).save()           // Este proceso se hace para optimizar el servidor
        ]);
        console.log(values);
    } catch (err) {
        console.log(err);
    }
}
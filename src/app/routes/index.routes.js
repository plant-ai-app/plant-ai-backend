import usuarioRoutes from './usuario.routes.js';
import passwordRoutes from './password.routes.js';
import localRoutes from './local.routes.js';
import plantaRoutes from './planta.routes.js';
import avatarRoutes from './avatar.routes.js';
import plantnetRoutes from './plantnet.routes.js';
import cuidadoTipoRoutes from './cuidadoTipo.routes.js';
import cuidadoRoutes from './cuidado.routes.js';


export const Routes = (app) =>{
    app.use('/api', usuarioRoutes);
    app.use('/api', passwordRoutes);
    app.use('/api', localRoutes);
    app.use('/api', plantaRoutes);
    app.use('/api', avatarRoutes);
    app.use('/api', plantnetRoutes);
    app.use('/api', cuidadoTipoRoutes);
    app.use('/api', cuidadoRoutes);
}
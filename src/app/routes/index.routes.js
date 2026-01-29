import usuarioRoutes from './usuario.routes.js';
import passwordRoutes from './password.routes.js';

export const Routes = (app) =>{
    app.use('/api', usuarioRoutes);
    app.use('/api', passwordRoutes);
}
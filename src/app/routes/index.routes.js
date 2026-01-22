import usuarioRoutes from './usuario.routes.js';

export const Routes = (app) =>{
    app.use('/api', usuarioRoutes);
}
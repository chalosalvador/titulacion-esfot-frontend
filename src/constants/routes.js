/**
 * Created by chalosalvador on 17/01/2019.
 */

const publicRoutes = {
  LOGIN: '/ingreso',
  USERS: '/usuarios',
  USERS_ID: `/usuario/:id`,
  INDEX: '/',
  ABOUT: '/acerca-de',
  TEACHERS_IDEAS: 'ideas-profesores',
  REGISTER: '/registrar'
};

const privateRoutes = {
  LOGOUT: '/logout',
  HOME: '/inicio',
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;

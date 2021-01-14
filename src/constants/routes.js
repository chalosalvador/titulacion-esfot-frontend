/**
 * Created by chalosalvador on 17/01/2019.
 */

const publicRoutes = {
  LOGIN: '/ingreso',
  USERS: '/usuarios',
  USERS_ID: `/usuario/:id`,
  INDEX: '/',
  ABOUT: '/acerca-de',
  TEACHERS_IDEAS: '/ideas-profesores',
  REGISTER: '/registrar'
};

const privateRoutes = {
  LOGOUT: '/logout',
  HOME: '/inicio',
  TEACHER_PANEL: '/panel-profesor',
  TEACHERS_PLANS:'/profesor-ideas',
  PLANFORM: '/plan-titulacion',
  PROJECTS_LIST_SECRETARY: '/listado-proyectos',
  COMMITTEE_PLANS: '/proyectos-comision',
  PROJECT_DETAIL_SECRETARY: '/detalle-proyecto'
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;

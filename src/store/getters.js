const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  sessionkey: state => state.user.sessionkey,
  loginStatus:state=> state.user.loginStatus,
  avatar: state => state.user.avatar,
  name: state => state.user.nickname,
  // userId: state => state.user.userId,
  // roles: state => state.user.roles,
  // permission_routers: state => state.permission.routers,
  // addRouters: state => state.permission.addRouters
  menuList: state => state.user.menuList,
  // portalId: state => state.user.portalId
};
export default getters

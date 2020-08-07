import fetch from 'utils/fetch';
//import fetchpolling from 'utils/fetchpolling'
import qs from 'qs'
export function loginByUserId(userId, password) {
  const data = {
    userId,
    password
  };
  return fetch({
    url: '/promoter/loginByUserId',
    method: 'post',
    data: qs.stringify(data)
  });
}

export function loginByAccessToken(access_token) {

  return fetch({
    url: '/promoter/loginByAccessToken',
    method: 'post',
    data: qs.stringify({ access_token: access_token })
  });
}


// export function logout() {
//   return fetch({
//     url: '/login/logout',
//     method: 'post'
//   });
// }

export function getProfile(sessionkey) {
  return fetch({
    url: '/promoter/getprofile',
    method: 'get',
    params: {
      sessionkey: sessionkey,
      third_sessionkey: sessionkey
    }
  });
}

export function getMenuList(sessionkey, portalId) {
  return fetch({
    url: '/portal/getNavigationList',
    method: 'get',
    params: {
      sessionkey,
      portal_id: portalId
    }
  })
}

export function getQrCode(client_id) {
  return fetch({
    url: '/oauth2/requestCode',
    method: 'get',
    params: {
      client_id: client_id
    }
  })
}
export function getAccessToken(code) {
  return fetch({
    url: '/oauth2/checkAccessTokenGenerated',
    method: 'get',
    params: {
      code: code
    }
  })
}

export function getPolling(code) {
  return fetch({
    url: 'http://polling.19w.me/sub',
    method: 'get',
    params: {
      code: code
    },
    timeout:50000,

  })
}

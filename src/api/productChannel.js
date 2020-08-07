import fetch from '@/utils/fetch'

export function getProductChanelTypeList() {

  return fetch({
    url: '/portal/productChannel/getProductChanelTypeList',
    method: 'get',
    params: {

    }
  })
}

export function getProductlistByType(userId, typeId) {
  return fetch({
    url: '/portal/productChannel/getProductlistByType',
    method: "get",
    params:{
    	user_id:userId,
    	type_id:typeId
    }

  })

}

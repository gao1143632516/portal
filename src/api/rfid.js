import fetch from '@/utils/fetch'
import qs from 'qs'
export function getRfidDataList(params) {

    return fetch({
        url: '/portal/rfid/getRfidDataList',
        method: 'get',
        params: {
             page_index: params.page,
             page_size: params.limit,
             search:params.search
        }
    })
}
export function addRfid(params){
	return fetch({
		url:'/portal/rfid/addRfid',
		method:'post',
	    data: qs.stringify(params)
	})
}



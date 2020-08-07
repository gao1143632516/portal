



import fetch from '@/utils/fetch'
import qs from 'qs'
export function getCompanyList(query) {

    return fetch({
        url: '/portal/company/getCompanyList',
        method: 'get',
        params: {
            page_index: query.page,
            page_size: query.limit,
        }
    })
}

export function getShopListBythird_accountid(query,accountid) {
    return fetch({
        url: '/portal/company/getShopListBythirdaccountid',
        method: 'get',
        params: {
            account_id: accountid,
            page_index:query.page,
            page_size:query.limit,
        }
    })
}

export function getShopInfo(zone_id){
    return fetch({
        url:'/portal/company/getShopInfo',
        method:'get',
        params:{
            zone_id:zone_id
        }
    })


}


export function tosetHeatMap(zone_id,formInfo){
    return fetch({
        url:'/portal/company/tosetHeatMap?zone_id='+zone_id,
        method:'post',
        data: qs.stringify(formInfo)
    })
}

export function addDevice(zone_id,formInfo){
    return fetch({
        url:'/portal/company/addDevice?zone_id='+zone_id,
        method:'post',
        data:qs.stringify(formInfo)
    })

}
export function editDevice(formInfo){
    return fetch({
        url:'/portal/company/editDevice',
        method:'post',
        data:qs.stringify(formInfo)
    })
}

export function addCompany(formInfo){
    return fetch({
        url:'/portal/company/addCompany',
        method:'post',
        data:qs.stringify(formInfo)
    })    
}
export function updateCompany(formInfo){
    return fetch({
        url:'/portal/company/updateCompany',
        method:'post',
        data:qs.stringify(formInfo)
    })
}

export function addStore(account_id,formInfo){
    return fetch({
        url:'/portal/company/addStore?account_id='+account_id,
        method:'post',
        data:qs.stringify(formInfo)
    })
}
export function updateStore(formInfo){
    return fetch({
        url:'/portal/company/updateStore',
        method:'post',
        data:qs.stringify(formInfo)

    })
}


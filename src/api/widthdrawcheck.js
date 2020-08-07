import fetch from '@/utils/fetch'
import qs from 'qs'

export function getInvoiceList(query) {
   // console.log(query);
    return fetch({
        url: "/ib/getInvoiceList",
        method: 'get',
        params:{
            pageindex:query.page,
            pagesize:query.limit
        }
    })
}

export function updateInvoiceStatus(request_id,status_id,description) {
   // console.log(query);
    return fetch({
        url: "/ib/updateInvoiceStatus",
        method: 'post',
        data: qs.stringify({request_id:request_id,status_id:status_id,description:description})
    })
}
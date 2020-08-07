import fetch from '@/utils/fetch'
import qs from 'qs'

export function getApplyForList(query) {
   // console.log(query);
    return fetch({
        url: "/ib/getApplyForList",
        method: 'get',
        params:{
            pageindex:query.page,
            pagesize:query.limit
        }
    })
}

export function pass(info_id,status_id,status_text) {
   // console.log(query);
    return fetch({
        url: "/ib/pass",
        method: 'post',
        data: qs.stringify({info_id:info_id,status_id:status_id,status_text:status_text})
    })
}
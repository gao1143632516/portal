import fetch from '@/utils/fetch'
import qs from 'qs'
export function getTypeList() {

    return fetch({
        url: '/import/getTypeList',
        method: 'get'
    })
}

export function getRequestList() {

    return fetch({
        url: '/import/getRequestList',
        method: 'get'
    })
}

export function runJob(job_id){
	return fetch({
		url : `/management/runJob?password=12345qwert!&job_id=${job_id}`,
		method:'get'
	})
}

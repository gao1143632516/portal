import fetch from '@/utils/fetch'
import qs from 'qs'

export function toDraftForm(title,content,page_id){
    return fetch({
      url:'/portal/html5Page/saveHelpPage',
      method:'post',
      data: qs.stringify({'title':title,'content':content,'page_id':page_id})
    })
}

export function toPublishForm(title,content,page_id){
    return fetch({
      url:'/portal/html5Page/toPulishHelpPage',
      method:'post',
      data: qs.stringify({'title':title,'content':content,'page_id':page_id})
    })
}

export function getHtmlList(query){
  return fetch({
    url:'/portal/html5Page/getHtmlList',
    method:'get',
     params: {
            page_index: query.page,
            page_size: query.limit,
        }
  })
}



export function fetchDataInfo(page_id) {
  return fetch({
     url:'/portal/html5Page/getHtmlInfo',
    method:'get',
    params: {page_id}
  })
}



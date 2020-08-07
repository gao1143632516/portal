import fetch from '@/utils/fetch'
import qs from 'qs'
export function getReceiptList(query) {
  console.log(query);
  return fetch({
    url: '/portal/receipt/getReceiptList',
    method: 'get',
    params: {
      page_index: query.page,
      page_size: query.limit,
      status: query.status,
      category: query.category,
      start_date: query.daterange[0],
      end_date: query.daterange[1]


    }
  })
}

export function getReceiptDetail(query) {
  return fetch({
    url: '/portal/receipt/getReceiptDetail',
    method: 'get',
    params: {
      receipt_id: query
    }
  })
}


export function agree(query) {
  return fetch({
    url: 'portal/receipt/agree',
    method: 'post',
    data: qs.stringify(query)
  })
}


export function disagree(query) {
  return fetch({
    url: 'portal/receipt/disagree',
    method: 'post',
    data: qs.stringify(query)
  })
}

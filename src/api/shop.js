import fetch from '@/utils/fetch'
import qs from 'qs'
export function getShopList(query) {
  
  return fetch({
    url: '/portal/shop/getShopList',
    method: 'get',
    params: {
      page_index: query.page,
      page_size: query.limit,
    }
  })
}

export function getShopAssistantPic(query) {
  return fetch({
    url: '/portal/shop/getShopAssistantPic',
    method: 'get',
    params: {
      zone_id: query
    }
  })
}

export function getShopCustomerPic(zone_id,query,date) {
  console.log(query);
  return fetch({
    url: '/portal/shop/getShopCustomerPic?zone_id='+zone_id,
    method: 'get',
    params: {
      start_date:date,
      end_date:date,
      page_index: query.page,
      page_size: query.limit,
    }
  })
}

export function deleteFaceVip(vip_id) {
  return fetch({
    url: '/management/deleteFaceVip',
    method: 'get',
    params: {
      vip_id:vip_id,
      password:'12345qwert!'
    }
  })
}
export function setShopAssistant(query){
  console.log(query)
  return fetch({
    url:'/management/updateVip2Staff?password=12345qwert!',
    method:'post',
    data: qs.stringify(query)
  })
    
  };
export function setShopCustomer(vip_id){
  return fetch({
    url:'/portal/shop/updateVip2Customer',
    method:'get',
    params:{

      vip_id:vip_id
    }
  })
    
  };

  export function showMorePics(vip_id,date){
     return fetch({
      url:'/portal/shop/getPicFromVipId',
      method:'get',
      params:{
        start_date:date,
         end_date:date,
        vip_id:vip_id
      }

     })
  }
  export function deleteCoustomerPic(visit_id){
      return fetch({
      url:'/portal/shop/deletePicFromVisitId',
      method:'get',
      params:{
        visit_id:visit_id
      }

     })
  }
  export function getvisitRecordList(vip_id,start_date,end_date,query){
    return fetch({
      url:'reportapi/getCustomerHistoryInfo?sessionkey=fdfa665173a81fa786e19f528401aa1a',
      method:'get',
      params:{
        vip_id:vip_id,
        start_date:start_date,
        end_date:end_date,
        page_size:query.limit,
        page_index:query.page
      }
    })
  }
  export function getShopInfo(zone_id,start_date,end_date) {
      return fetch({
          url:'reportapi/getSellDataDetail?sessionkey=fdfa665173a81fa786e19f528401aa1a',
          method:'get',
          params:{
              zone_id:zone_id,
              start_date:start_date,
              end_date:end_date,
          }
      })
  }

    export function getOderSumber(zone_id,start_date,end_date,sell_type_id,payment_type_id) {
      return fetch({
          url:'reportapi/getRetailOrderSumInfo?sessionkey=fdfa665173a81fa786e19f528401aa1a',
          method:'get',
          params:{
              zone_id:zone_id,
              start_date:start_date,
              end_date:end_date,
              sell_type_id,
              payment_type_id,
          }
      })
  }


    export function getAppRewardInfo(zone_id,start_date,end_date) {
      return fetch({
          url:'reportapi/getAppPromotionRewardInfo?sessionkey=fdfa665173a81fa786e19f528401aa1a',
          method:'get',
          params:{
              zone_id:zone_id,
              start_date:start_date,
              end_date:end_date,
          }
      })
  }
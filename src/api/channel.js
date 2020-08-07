import fetch from '@/utils/fetch'
import qs from 'qs'
export function getChannelList(query) {
   // console.log(query);
   //query.channel_id = 0;
    return fetch({
        url: "/portal/channel/getChannelList",
        method: 'get',
        params:{
           
        }
    })
}
export function getChannelListData(query) {
   // console.log(query);
   //query.channel_id = 0;
    return fetch({
        url: "/portal/channel/getChannelList",
        method: 'get',
        params:{  
         channel_id:query.channel_id,
         creater_name_type:query.creater_name_type,


        }
    })
}
export function queryChannelDetail(channel_id,user_id,app_id,sign_by_name) {
    return fetch({
        url: "/portal/channel/queryChannelDetail",
        method: 'get',
        params:{
            channel_id:channel_id,
            user_id:user_id,
            app_id:app_id,
            sign_by_name:sign_by_name,
            charset:'utf-8'
        }
    })
}

export function addChannel(query) {
    return fetch({
        url: "/portal/channel/addChannel",
        method: 'post',
        data: qs.stringify(query)

    })
}

export function addUserChannelDetail(query,channel_id) {

    return fetch({
        url: `/portal/channel/addUserChannelDetail?channel_id=${channel_id}`,
        method: 'post',
        data: qs.stringify(query)

    })
}


export function editUserChannelDetail(query) {

    return fetch({
        url: '/portal/channel/editUserChannelDetail',
        method: 'post',
        data: qs.stringify(query)

    })
}


export function editChannel(query) {

    return fetch({
        url: '/portal/channel/editChannel',
        method: 'post',
        data: qs.stringify(query)

    })
}
export function deleteChannelDetail(channel_detail_id){
    return fetch({
        url:'/portal/channel/deleteChannelDetail',
        method:'get',
        params:{channel_detail_id:channel_detail_id}
    })

}
export function getChuanhshanjiaAppList(){
    return fetch({
        url:'/portal/appStatistics/getChuanhshanjiaAppList',
        method:'get',
        params:{}
    })
}

export function getChannelAppData(app_id,activition_date) {
     return fetch({
        url: '/portal/channel/getChannelAppData',
        method: 'get',
        params:{app_id:app_id,activition_date:activition_date}

    })
}
export function setChannelAppData(json){
    return fetch({
        url:'/portal/channel/setChannelAppData',
        method:'post',
        data: qs.stringify(json)

    })
}
export function getChannelAppUserData(app_id,activition_date,type){
    return fetch({
        url:'/portal/channel/getChannelAppUserData',
        method:'get',
        params:{app_id:app_id,activation_date:activition_date,type:type}
    })
}

export function toSetChuanShanjiaData(json){
    return fetch({
        url:'/portal/channel/toSetChuanShanjiaData',
        method:'post',
        data: qs.stringify(json)
    })
}

export function getChuanshanjiaHistory(app_id,activition_date,user_id){
    return fetch({
        url:'/portal/channel/getChuanshanjiaHistory',
        method:'get',
        params:{app_id:app_id,activation_date:activition_date,user_id:user_id}
    })
}

export function getUserIdKeepAndRetenttionHistory(app_id,activition_date,user_id){
    return fetch({
        url:'/portal/channel/getUserIdKeepAndRetenttionHistory',
        method:'get',
         params:{app_id:app_id,activation_date:activition_date,user_id:user_id}
    })
}

export function getChannelPriceHistory(channel_id,app_id,user_id){
    return fetch({
        url:'/portal/channel/getChannelPriceHistory',
        method:'get',
        params:{channel_id:channel_id,app_id:app_id,user_id:user_id}
    })

}


export function checkChannelUserIdisFull(app_id,activation_date){
    return fetch({
        url:'/portal/channel/checkChannelUserIdisFull',
        method:'get',
        params:{app_id:app_id,activation_date:activation_date}
    })
}

export function getRententionIP(app_id,activation_date,user_id){
    return fetch({
        url:'/portal/channel/getRententionIP',
        method:'get',
        params:{app_id:app_id,activation_date:activation_date,user_id:user_id}
    })
}

export function getActivationIpAnalyz(query) {
  query.user_id  = query.user_id == '' ? 0 : query.user_id;
  return fetch({
    url: '/portal/channel/getActivationIpAnalyz',
    method: 'get',
    params: {
      page_index: query.page,
      page_size: query.limit,
      status: query.status,
      app_id: query.app_id,
      user_id:query.user_id,
      channel_id:query.channel_id,
      start_date: query.daterange[0],
      end_date: query.daterange[1],
      online_date:query.online_date,
      offline_date:query.offline_date,
      aiyou_keep:query.aiyou_keep 

    }
  })
}
export function getShimoNumHistory(activation_date,app_id) {
    return fetch({
        url:'/portal/channel/getShimoNumHistory',
        method:'get',
        params:{
            activation_date:activation_date,
            app_id:app_id
        }
    })
}
export function getFilterIpDataList(query){
     query.user_id  = query.user_id == '' ? 0 : query.user_id;
    return fetch({
    url: '/portal/channel/getFilterIpDataListV2',
    method: 'get',
    params: {
      app_id: query.app_id,
      user_id:query.user_id,
      channel_id:query.channel_id,
      status:query.status,
      start_activation_date: query.daterange[0],
      end_activation_date: query.daterange[1]
    }
  })
}

export function getFilterIpDateDetailList(query){
    return fetch({
        url:'/portal/channel/getFilterIpDateDetailList',
        method:'get',
        params:{
            app_id:query.app_name_id,
            user_id:query.user_id,
            activation_date:query.day
        }
    })

}
export function getRetentionByAppID(start_activation_date,end_activation_date,app_id){
    return fetch({
        url:'/portal/channel/getRetentionByAppID',
        method:'get',
        params:{
            app_id:app_id,
            start_activation_date:start_activation_date,
            end_activation_date:end_activation_date
        }
    })
}
export function updateChuanshanjiaClientData(){
       return fetch({
        url:'/portal/channel/updateChuanshanjiaClientData',
        method:'get',
        params:{
            
        }
    })
}
export function getOfficialDataList(){
    return fetch({
        url:'/portal/channel/getOfficialDataList',
        method:'get',
        params:{}
    })
}
export function addOfficialData(json){
    return fetch({
        url:'/portal/channel/addOfficialData',
        method:'post',
        data: qs.stringify(json)
    })
}
export function getFinalStatement(query){
    query.user_id  = query.user_id == '' ? 0 : query.user_id;
    return fetch({
    timeout:0,
    url: '/portal/channel/getFinalStatement',
    method: 'get',
    params: {
      app_id: query.app_id,
      user_id:query.user_id,
      channel_id:query.channel_id,
      status:query.status,
      start_activation_date: query.daterange[0],
      end_activation_date: query.daterange[1],
      page:query.page,
      limit:query.limit
    }
  })
}

export function getOfficialStaticsData(query){
    query.user_id  = query.user_id == '' ? 0 : query.user_id;
    return fetch({
    timeout:0,
    url: '/portal/channel/getOfficialStaticsData',
    method: 'get',
    params: {
      app_id: query.app_id,
      user_id:query.user_id,
      channel_id:query.channel_id,
      status:query.status,
      start_activation_date: query.daterange[0],
      end_activation_date: query.daterange[1],
      page:query.page,
      limit:query.limit
    }
  })
}
export function batchCommit(json){
    return fetch({
        url:'/portal/channel/batchCommit',
        method:'post',
        data:json
    })
}

export function getFinalStatementSum(query){
    return fetch({
    timeout:0,
    url: '/portal/channel/getFinalStatementSum',
    method: 'get',
    params: {
      app_id: query.app_id,
      user_id:query.user_id,
      channel_id:query.channel_id,
      status:query.status,
      start_activation_date: query.daterange[0],
      end_activation_date: query.daterange[1]
    }
  })

}
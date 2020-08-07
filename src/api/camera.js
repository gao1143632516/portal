import fetch from '@/utils/fetch'
import qs from 'qs'
export function getCameraAnalysisInfo(date) {

    return fetch({
        url: '/portal/cameraAnalysis/getCameraAnalysisInfo',
        method: 'get',
        params: {
            start_date:date,
            end_date:date
        }
    })
}



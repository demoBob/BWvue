import apiHelper from '@/utils/apiHelper'

//获得设备列表
const getAddress = (identity,user_id) => {
    const requestData ={
        identity,
        user_id
    }
    return apiHelper.get(apiHelper.apiServers.baseurl, '/smartlive_facility/v1/Administration/query_device',requestData)
}

//获得设备详细信息
const getRealdata = (device) => {
    const requestData ={
        device
    }
    return apiHelper.get(apiHelper.apiServers.baseurl, '/smartlive_business/v1/current_data',requestData)
 }

//获取室外pm2.5,温度等数据函数
const getWeather = (city) => {
    const requestData ={
        city
    }
    return apiHelper.get(apiHelper.apiServers.baseurl, '/smartlive_business/v1/getairdata',requestData)
}

//获得底部滚动条字体
const getText = (user_id) => {
    const requestData ={
        user_id
    }
    return apiHelper.get(apiHelper.apiServers.baseurl, '/smartlive_device/v1/get_text',requestData)
}

//获得公司logo和名称
const getLogo = (user_id) => {
    const requestData ={
        user_id
    }
    return apiHelper.get(apiHelper.apiServers.baseurl, '/smartlive_facility/v1/Administration/guest_info',requestData)
}

//获取历史曲线数据
const getHisdata = (device,time_type,data_type) => {
    const requestData ={
        device,
        time_type,
        data_type
    }
    return apiHelper.get(apiHelper.apiServers.baseurl, '/smartlive_business/v1/history_data',requestData)
}

  export default {
    getAddress,
    getRealdata,
    getWeather,
    getText,
    getLogo,
    getHisdata
  }
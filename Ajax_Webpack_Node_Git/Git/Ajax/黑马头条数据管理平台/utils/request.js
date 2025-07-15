// axios 公共配置
// 基地址
axios.defaults.baseURL = 'http://geek.itheima.net'

//axios请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    token&&(config.headers.Authorization =`Bearer ${token}`)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// axios响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const result = response.data
    return result;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error?.data?.status === 401){
        alert('登录状态过期，请重新登录')
        localStorage.removeItem('token')
        location.href = '../login/index.html'
    }
    return Promise.reject(error);
});

async function setChannelList() {
    const result = await axios({
        url:'/v1_0/channels'
    })
    // console.log(result)
    const htmlStr = '<option value="" selected="">请选择文章频道</option>'+
        result.data.channels.map(elem => `<option value="${elem.id}">${elem.name}</option>`)
    document.querySelector('.form-select').innerHTML = htmlStr

}
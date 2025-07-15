/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */

function showWeather(cityCode) {
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather',
        params: {
            city: cityCode
        }
    }).then(result => {
        const weatherInfo = result.data
        /*const keys = Object.keys(weatherInfo)
        keys.forEach(key =>{
            if (key !== 'dayForecast' && key !== 'todayWeather'){
                if (key === 'weatherImg') {
                    document.querySelector(`.${key}`).src = weatherInfo[key]
                } else {
                    document.querySelector(`.${key}`).innerHTML = weatherInfo[key]
                }
            } else if (key === 'todayWeather'){
                const todayWeather = weatherInfo[key]
                const keys = Object.keys(todayWeather)
                keys.forEach(key => {
                    document.querySelector(`.today-weather .${key}`).innerHTML = todayWeather[key]
                })
            } else {
                const dayForecast = weatherInfo[key]
                dayForecast.forEach(((elem,index)=>{
                    const keys = Object.keys(elem)
                    keys.forEach(key =>{
                        if (key === 'weatherImg') {
                            document.querySelectorAll(`.week-wrap .item .${key}`)[index].src = elem[key]
                        } else {
                            document.querySelectorAll(`.week-wrap .item .${key}`)[index].innerHTML = elem[key]
                        }
                    })
                }))
            }
       })*/
        const dateStr = `
            <span class="dateShort">${weatherInfo.dateShort}</span>
            <span class="calendar">农历&nbsp;
                <span class="dateLunar">${weatherInfo.dateLunar}</span>
            </span>
        `
        document.querySelector('.title').innerHTML = dateStr
        // 城市名字
        document.querySelector('.area').innerHTML = weatherInfo.area
        // 当前天气
        const curWeatherStr = `
             <div class="tem-box">
                <span class="temp">
                  <span class="temperature">${weatherInfo.temperature}</span>
                  <span>°</span>
                </span>
             </div>
             <div class="climate-box">
                <div class="air">
                  <span class="psPm25">${weatherInfo.psPm25}</span>
                  <span class="psPm25Level">${weatherInfo.psPm25Level}</span>
                </div>
                <ul class="weather-list">
                  <li>
                    <img src="${weatherInfo.weatherImg}" class="weatherImg" alt="">
                    <span class="weather">${weatherInfo.weather}</span>
                  </li>
                  <li class="windDirection">${weatherInfo.windDirection}</li>
                  <li class="windPower">${weatherInfo.windPower}</li>
                </ul>
             </div>
        `
        document.querySelector('.weather-box').innerHTML = curWeatherStr
        // 当天天气
        const todayWeather = weatherInfo.todayWeather
        const todayWeatherStr = `
            <div class="range-box">
                <span>今天：</span>
                <span class="range">
                  <span class="weather">${todayWeather.weather}</span>
                  <span class="temNight">${todayWeather.temNight}</span>
                  <span>-</span>
                  <span class="temDay">${todayWeather.temDay}</span>
                  <span>℃</span>
                </span>
            </div>
            <ul class="sun-list">
                <li>
                  <span>紫外线</span>
                  <span class="ultraviolet">${todayWeather.ultraviolet}</span>
                </li>
                <li>
                  <span>湿度</span>
                  <span class="humidity">${todayWeather.humidity}</span>%
                </li>
                <li>
                  <span>日出</span>
                  <span class="sunriseTime">${todayWeather.sunriseTime}</span>
                </li>
                <li>
                  <span>日落</span>
                  <span class="sunsetTime">${todayWeather.sunsetTime}</span>
                </li>
            </ul>
        `
        document.querySelector('.today-weather').innerHTML = todayWeatherStr

        // 7日天气预报数据展示
        const dayForecast = weatherInfo.dayForecast
        const dayForecastStr = dayForecast.map(elem => `
        <li class="item">
          <div class="date-box">
            <span class="dateFormat">${elem.dateFormat}</span>
            <span class="date">${elem.date}</span>
          </div>
          <img src="${elem.weatherImg}" alt="" class="weatherImg">
          <span class="weather">${elem.weather}</span>
          <div class="temp">
            <span class="temNight">${elem.temNight}</span>-
            <span class="temDay">${elem.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${elem.windDirection}</span>
            <span class="windPower">${elem.windPower}</span>
          </div>
        </li>
        `).join('')
        // console.log(dayForecastStr)
        document.querySelector('.week-wrap').innerHTML = dayForecastStr
    }).catch(error => {
        console.dir(error)
    })
}

const cityCode = localStorage.getItem('cityCode') || '110100'
showWeather(cityCode)

function debounce(func, delay) {
    let timer;
    return function (evt) {
        // 确保事件对象能够正确传递
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => func.call(context, evt), delay);
    };
}

//搜索城市列表 (防抖)
const searchBox = document.querySelector('.search-city')
searchBox.addEventListener('input', debounce(() => {
    const city = searchBox.value
    // console.log(city)
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather/city',
        params: {
            city
        }
    }).then(result => {
        console.log(result)
        const cList = result.data
        const cityStr = cList.map(elem => `<li class="city-item" data-code=${elem.code}>${elem.name}</li>`).join('')
        document.querySelector('.search-list').innerHTML = cityStr
    }).catch(error => {
        console.log(error.message)
    })
}, 500))

//点击城市名称=>更换页面天气信息(防抖)
document.querySelector('.search-list').addEventListener('click', debounce(evt => {
    const {dataset, tagName} = evt.target
    if (tagName === 'LI') {
        const cityCode = dataset.code
        showWeather(cityCode)
        localStorage.setItem('cityCode', cityCode)
    }
}, 500))
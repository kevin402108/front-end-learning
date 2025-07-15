function getRandom(N,M){
    return N+Math.floor(Math.random()*(M-N+1));
}

function getRandomColor(flag = true){
    //不传参默认以16进制格式展示
    let res='';
    if (flag === true){
        res+='#';
        let hex=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
        for (let i = 0; i < 6; i++) {
            let index=Math.floor(Math.random()*hex.length);
            res+=hex[index];
        }
    } else {
        res+='rgb(';
        for (let i = 0; i < 3; i++) {
            let index = getRandom(0,255);
            res+=index
            if (i !== 2){res+=','}
        }
        res+=')';
    }
    return res;
}

function getSystemTime(){
    const curSysTime = new Date();
    const year = curSysTime.getFullYear();
    const month = curSysTime.getMonth()+1;
    const date = curSysTime.getDate();
    let hour = curSysTime.getHours();
    let min = curSysTime.getMinutes();
    let sec = curSysTime.getSeconds();
    hour=hour>=10?hour:'0'+hour;
    min=min>=10?min:'0'+min;
    sec=sec>=10?sec:'0'+sec;
    return `${year}-${month}-${date} ${hour}:${min}:${sec}`;
}
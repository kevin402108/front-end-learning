/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */
document.querySelector('#bg').addEventListener('change',evt =>{
    const img =evt.target.files[0]
    const fd = new FormData()
    fd.append('img',img)
    axios({
        url:'http://hmajax.itheima.net/api/uploadimg',
        method:'POST',
        data:fd
    }).then(result=>{
        const imgUrl = result.data.data.url
        console.log(imgUrl)
        document.body.style.backgroundImage = `url('${imgUrl}')`
        //将图片地址保存在本地
        localStorage.setItem('bg-image',imgUrl)
    }).catch(error=>{
        console.log(error.response.data.message)
    })
})

const bgiUrl = localStorage.getItem('bg-image');
//本地有背景图才设置背景
bgiUrl && (document.body.style.backgroundImage = `url('${bgiUrl}')`)
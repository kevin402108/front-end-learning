/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 */
/*该函数具体实现在utils/request.js中*/
setChannelList()

/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 */
document.querySelector('.img-file').addEventListener('change', async evt => {
    const file = evt.target.files[0]
    const fd = new FormData()
    fd.append('image', file)
    try {
        const result = await axios({
            url: '/v1_0/upload',
            method: 'POST',
            data: fd
        })
        document.querySelector('.rounded').src = result.data.url
        document.querySelector('.place').style.display = 'none'
        document.querySelector('.rounded').style.display = 'inline-block'

    } catch (error) {
        console.log(error.response.data.message)
    }
})

document.querySelector('.rounded').addEventListener('click', () => {
    document.querySelector('.img-file').click()
})

/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 */
document.querySelector('.send').addEventListener('click', async evt => {
    if (evt.target.innerHTML === '发布') {
        const form = document.querySelector('.art-form')
        const data = serialize(form,{hash:true,empty:true})
        delete data.id
        data.cover = {
            type: 1,
            images: [document.querySelector('.rounded').src]
        }
        try {
            const result = await axios({
                url: '/v1_0/mp/articles',
                method: 'POST',
                data
            })
            console.log(result)
            myAlert(true, '文章发布成功！')
            //清空表单
            form.reset()
            //清空封面选择框
            document.querySelector('.rounded').style.display = 'none'
            document.querySelector('.place').style.display = 'inline-block'
            //清空富文本框
            editor.setHtml('')
            //跳转页面
            setTimeout(() => location.href = '../content/index.html', 2000)
        } catch (error) {
            myAlert(false, error.response.data.message)
        }
    }

});

/**
 * 目标4：编辑-回显文章
 *  4.1 页面跳转传参（URL 查询参数方式）
 *  4.2 发布文章页面接收参数判断（共用同一套表单）
 *  4.3 修改标题和按钮文字
 *  4.4 获取文章详情数据并回显表单
 */
(function () {
    //获取查询参数 location.search
    const paramsStr = location.search
    const params = new URLSearchParams(paramsStr)
    //注意：此处为URLSearchParams:forEach()
    params.forEach(async (value, key) => {
        if (key === 'id') {
            document.querySelector('.title span').innerHTML = '修改文章'
            document.querySelector('.send').innerHTML = '修改'
            const result = await axios({
                url: `/v1_0/mp/articles/${value}`
            })
            console.log(result)
            const {id, title, channel_id, cover, content} = result.data
            const dataObj = {
                id: id,
                title: title,
                channel_id: channel_id,
                rounded: cover.images[0],
                content: content
            }
            const keys = Object.keys(dataObj)
            keys.forEach(key => {
                if (key === 'rounded') {
                    //编辑前文章有封面才显示封面，无封面时不变！！！
                    if (dataObj[key]) {
                        document.querySelector('.rounded').src = dataObj[key]
                        document.querySelector('.place').style.display = 'none'
                        document.querySelector('.rounded').style.display = 'inline-block'
                    }
                } else if (key === 'content') {
                    editor.setHtml(dataObj[key])
                } else {
                    document.querySelector(`[name=${key}]`).value = dataObj[key]
                }
            })
        }
    })
})();

/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 */
document.querySelector('.send').addEventListener('click', async evt => {
    if (evt.target.innerHTML === '修改'){
        const form = document.querySelector('.art-form')
        const data = serialize(form,{hash:true,empty:true})
        console.log(data)
        try {
            const result = await axios({
                url: `/v1_0/mp/articles/${data.id}`,
                method: 'PUT',
                data:{
                    ...data,
                    cover:{
                        type: document.querySelector('.rounded').src ? 1:0,
                        images: [document.querySelector('.rounded').src]
                    }
                }
            })
            console.log(result)
            myAlert(true, '文章修改成功！')
            //跳转页面
            setTimeout(() => location.href = '../content/index.html', 2000)
        } catch (error) {
            myAlert(false, error.response.data.message)
        }
    }
})
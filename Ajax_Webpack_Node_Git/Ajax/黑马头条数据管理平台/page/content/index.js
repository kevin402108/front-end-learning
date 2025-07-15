/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 */

const queryObj = {
    status:'',
    channel_id:'',
    page:1,
    per_page:2
}
let totalCount = 0

async function setArticleList(){
    const result = await axios({
        url:'/v1_0/mp/articles',
        params:queryObj
    })
    // console.log(result)
    const htmlStr = result.data.results.map(elem=>{
        const statusHtml = elem.status === 2 ? '<span class="badge text-bg-success">审核通过</span>\n' : '<span class="badge text-bg-primary">待审核</span>'
        return ` 
        <tr>
            <td>
              <img src=${elem.cover.type === 0?'"https://img2.baidu.com/it/u=2640406343,1419332367&fm=253&fmt=auto&app=138&f=JPEG?w=708&h=500"':elem.cover.images[0]} alt="">
            </td>
            <td>${elem.title}</td>
            <td>${statusHtml}</td>
            <td> <span>${elem.pubdate}</span> </td>
            <td> <span>${elem.read_count}</span> </td>
            <td> <span>${elem.comment_count}</span> </td>
            <td> <span>${elem.like_count}</span> </td>
            <td data-id=${elem.id}>
              <i class="bi bi-pencil-square edit"></i>
              <i class="bi bi-trash3 del"></i>
            </td>
          </tr>
    `
    }).join('')
    document.querySelector('.art-list').innerHTML = htmlStr
    totalCount = result.data.total_count
    document.querySelector('.total-count').innerHTML = `共${totalCount}条`
}
setArticleList()

/**
 * 目标2：筛选文章列表
 *  2.1 设置频道列表数据
 *  2.2 监听筛选条件改变，保存查询信息到查询参数对象
 *  2.3 点击筛选时，传递查询参数对象到服务器
 *  2.4 获取匹配数据，覆盖到页面展示
 */
setChannelList()

document.querySelector('.sel-form div:first-child').addEventListener('click',evt =>{
    const {tagName,value} = evt.target
    if (tagName === 'INPUT') {
        queryObj.status = value
    }
})

document.querySelector('.form-select').addEventListener('change',evt=>{
    queryObj.channel_id= `${evt.target.value}`
})

document.querySelector('.sel-btn').addEventListener('click',async ()=>{
    setArticleList()
})

/**
 * 目标3：分页功能
 *  3.1 保存并设置文章总条数
 *  3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
 *  3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
 */
document.querySelector('.next').addEventListener('click',()=>{
    if (queryObj.page < Math.ceil(totalCount/queryObj.per_page)){
        queryObj.page++
        document.querySelector('.page-now').innerHTML = `第${queryObj.page}页`
        setArticleList()
    }
})

document.querySelector('.last').addEventListener('click',()=>{
    if (queryObj.page > 1){
        queryObj.page--
        document.querySelector('.page-now').innerHTML = `第${queryObj.page}页`
        setArticleList()
    }
})
/**
 * 目标4：删除功能
 *  4.1 关联文章 id 到删除图标
 *  4.2 点击删除时，获取文章 id
 *  4.3 调用删除接口，传递文章 id 到服务器
 *  4.4 重新获取文章列表，并覆盖展示
 *  4.5 删除最后一页的最后一条，需要自动向前翻页
 */
document.querySelector('.art-list').addEventListener('click',async evt =>{
    const {classList,parentNode} = evt.target
    // if (evt)
    if (classList.contains('del')){
        if (confirm('确定要删除这篇文章吗？')){
            const targetId = parentNode.dataset.id
            try {
                const result = await axios({
                    url: `/v1_0/mp/articles/${targetId}`,
                    method: 'DELETE'
                })
                const children = document.querySelector('.art-list').children
                if(children.length === 1 && queryObj.page > 1){
                    queryObj.page --
                    document.querySelector('.page-now').innerHTML = `第${queryObj.page}页`
                }
                setArticleList()
                myAlert(true,'删除成功！')
            } catch (e) {
                myAlert(false,'删除失败！')
            }
        }
    }
})

// 点击编辑时，获取文章 id，跳转到发布文章页面传递文章 id 过去
document.querySelector('.art-list').addEventListener('click',async evt =>{
    const {classList,parentNode} = evt.target
    //跨页面传参解决方案：可将参数写在跳转页面URL的查询参数位置处，让网页携带所需的参数跳转
    if (classList.contains('edit')){
        const targetId = parentNode.dataset.id
        location.href = `../publish/index.html?id=${targetId}`
    }
})


const creator = 'Kevin Chan'

// 获取并渲染图书列表
function getBookList(){
    axios({
        url:'http://hmajax.itheima.net/api/books',
        params:{
            creator
        }
    }).then(result=>{
        // console.log(result)
        // console.log(result.data.data)
        const data = result.data.data;
        const renderContext = data.map((elem,index)=>{
            const {id,bookname,author,publisher} = elem
            return `
                <tr>
                  <td>${index+1}</td>
                  <td>${bookname}</td>
                  <td>${author}</td>
                  <td>${publisher}</td>
                  <td data-id=${id}>
                    <span class="del" >删除</span>
                    <span class="edit" >编辑</span>
                  </td>
                </tr>
            `
        }).join('')
        document.querySelector('.container .table .list').innerHTML = renderContext
    }).catch(error=>{
        alert(error.response.data.message)
    })
}

getBookList()

const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom)

//添加图书 点击保存后将数据提交到服务器=>清空输入框后隐藏=>渲染新增后的页面
document.querySelector('.add-modal .add-btn').addEventListener('click',()=>{
    const addForm = document.querySelector('.add-modal .add-form')
    const data = serialize(addForm,{hash:true,empty:true})
    // const {bookname,author,publisher} = data
    axios({
        url:'http://hmajax.itheima.net/api/books',
        method:'POST',
        data:{
            /*bookname,
            author,
            publisher,*/
            ...data,
            creator
        }
    }).then(()=>{
        addForm.reset()
        addModal.hide()
        getBookList()
    }).error(error=>{
        alert(error.response.data.message)
    })
})

//删除&编辑图书
const editModalDom = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editModalDom)

document.querySelector('.list').addEventListener('click',evt =>{
    const {classList,parentNode} =evt.target
    if (classList.contains('del')){
        const bookId = parentNode.dataset.id
        axios({
            url:`http://hmajax.itheima.net/api/books/${bookId}`,
            method:'DELETE'
        }).then(()=>{
            getBookList()
        }).catch(error=>{
            console.log(error.response.data.message)
        })
    }

    if (classList.contains('edit')){
        const bookId = parentNode.dataset.id
        axios({
            url:`http://hmajax.itheima.net/api/books/${bookId}`
        }).then(result=>{
            // console.log(result)
            const bookInfo = result.data.data
            /*const {id,bookname,author,publisher} = bookInfo
            document.querySelector('.edit-form .id').value = id
            document.querySelector('.edit-form .bookname').value = bookname
            document.querySelector('.edit-form .author').value = author
            document.querySelector('.edit-form .publisher').value = publisher*/
            const keys = Object.keys(bookInfo)
            keys.forEach(key => {
                document.querySelector(`.edit-form .${key}`).value = bookInfo[key]
            })
        }).catch(error =>{
            console.log(error.response.data.message)
        })
        editModal.show()
    }
})

document.querySelector('.edit-btn').addEventListener('click',()=>{
    const editForm = document.querySelector('.edit-form');
    const data = serialize(editForm,{hash:true,empty:true})
    const {id,bookname,author,publisher} = data
    axios({
        url:`http://hmajax.itheima.net/api/books/${id}`,
        method:'put',
        data:{
            bookname,
            author,
            publisher,
            creator
        }
    }).then(()=>{
        // console.log(result)
        getBookList()
        editForm.reset()
        editModal.hide()
    }).catch(error =>{
        console.log(error.response.data.message)
    })
})



// 富文本编辑器
// 创建编辑器函数，创建工具栏函数
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '请输入文章内容',
    onChange(editor) {
        const htmlStr = editor.getHtml()
        // console.log('editor content', htmlStr)
        // 也可以同步到 <textarea>
        document.querySelector('.publish-content').value =htmlStr
    },
}

const editor = createEditor({
    selector: '#editor-container',
    html: '',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})
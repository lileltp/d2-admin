export default {
  props: {
    options: {
      default: () => {
        return {
          stripe: true,
          highlightCurrentRow: true
        }
      }
    },
    pagination: {
      type: Object,
      default: null
    },
    selectionRow: { // 多选时使用的对象
      default: null
    },
    indexRow: { // 显示序列排号
      default: null
    },
    rowHandle: { // 是否显示操作按钮
      default: null
      // edit: {
      //   text: ''
      // },
      // remove: {
      //   text: ''
      // }
    },
    currentRow: {
      type: Object
    }
  }
}

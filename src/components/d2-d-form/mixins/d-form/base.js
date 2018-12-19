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
      type: Object
    },
    currentRow: {
      type: Object
    },
    /** 全屏显示dialog */
    dialogFull: {
      type: Boolean,
      default: false
    },
    usePageAdd: {
      type: Boolean,
      default: false
    },
    usePageEdit: {
      type: Boolean,
      default: false
    },
    /** 自定义新增 */
    customerAdd: {
      type: Boolean,
      default: false
    },
    /** 自定义编辑 */
    customerEdit: {
      type: Boolean,
      default: false
    },
    addFormTemplate: {
      type: Object,
      default: null
    },
    editFormTemplate: {
      type: Object,
      default: null
    },
    addFormRules: {
      type: Object,
      default: null
    },
    editFormRules: {
      type: Object,
      default: null
    }
  }
}

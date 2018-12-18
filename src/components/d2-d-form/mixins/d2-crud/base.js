export default {
  props: {
    /**
     * @description 表格标题
     */
    title: {
      default: ''
    },
    /**
     * @description 表头数据
     */
    columns: {
      type: Array,
      required: true
    },
    /**
     * @description 表格加载
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @description 表格加载配置
     */
    loadingOptions: {
      type: Object,
      default: null
    },
    /**
     * @description 表格配置
     */
    options: {
      type: Object,
      default: null
    },
    /**
     * @description 索引
     */
    indexRow: {
      default: null
    },
    /**
     * @description 多选
     */
    selectionRow: {
      default: null
    },
    size: {
      type: String,
      default: 'mini'
    },
    rowHandle: {
      type: Object,
      default: null
    }
  }
}

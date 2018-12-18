import _cloneDeep from 'lodash/cloneDeep'
import _get from 'lodash.get'
import _set from 'lodash.set'
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      d2Data: []
    }
  },
  computed: {
    d2DataLength () {
      return this.d2Data.length
    }
  },
  watch: {
    data () {
      this.handleDataChange()
    },
    d2Data: {
      handler (val) {
        this.$emit('d2-data-change', val)
      },
      deep: true
    }
  },
  mounted () {
    this.handleDataChange()
  },
  methods: {
    /**
         * @description lodash.get
         */
    _get,
    /**
         * @description lodash.set
         */
    _set,
    handleDataChange () {
      if (this.d2Data !== this.data) {
        this.d2Data = _cloneDeep(this.data)
      }
    },
    /**
         * @description 排序时数据变化
         */
    handleSortDataChange () {
      this.$nextTick(() => {
        this.d2Data = this.$refs.elTable.store.states.data
      })
    },
    /**
         * @description 排序状态
         */
    handleSortChange ({
      column,
      prop,
      order
    }) {
      this.handleSortDataChange()
      this.$emit('sort-change', {
        column,
        prop,
        order
      })
    },
    /**
         * @description 更新行数据
         * @param {Number} index 表格数据索引
         * @param {Object} row 更新的表格行数据
         */
    updateRow (index, row) {
      if (this.pagination) {
        this.$set(this.d2Data, index + this.paginationDataStart, row)
      } else {
        this.$set(this.d2Data, index, row)
      }
      if (this.defaultSort) {
        this.handleSortDataChange()
      }
    },
    /**
         * @description 新增行数据
         * @param {Object} row 新增的表格行数据
         */
    addRow (row) {
      this.$set(this.d2Data, this.d2Data.length, row)
      if (this.defaultSort) {
        this.handleSortDataChange()
      }
    },
    /**
         * @description 删除行
         * @param {Object} index 被删除行索引
         */
    removeRow (index) {
      if (this.pagination) {
        this.$delete(this.d2Data, index + this.paginationDataStart)
      } else {
        this.$delete(this.d2Data, index)
      }
      if (this.defaultSort) {
        this.handleSortDataChange()
      }
    }
  }
}

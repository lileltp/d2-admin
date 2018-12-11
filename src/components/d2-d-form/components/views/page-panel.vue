<template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (size) {
      this.$emit('size-change', size)
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.$emit('current-change', currentPage)
    }
  }
}
</script>

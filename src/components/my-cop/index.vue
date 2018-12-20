<template>
  <el-input
    placeholder="请输入编号"
    :value="value"
    @change="handleChange"
  >
    <template slot="prepend">{{pre}}</template>
  </el-input>
</template>
<script>
export default {
  props: ['value','watchValue'],
  watch: {
    watchValue (v) {
      this.pre = v
    }
  },
  data(){
      return {
          pre:''
      }
  },
  methods: {
    handleChange (v) {
      this.$emit('input', v)
    }
  },
  mounted(){
      this.pre = this.watchValue
  }
}
</script>

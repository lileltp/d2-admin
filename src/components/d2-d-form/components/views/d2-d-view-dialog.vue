<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :fullscreen="fullscreen"
    :append-to-body="appendToBody"
    :custom-class="customClass"
    :close-on-click-modal="closeOnClickModal"
    @close='handleClose'
  >
    <d2-view-panel
      :formTemplate="formTemplate"
      :formData="formData"
      :formOptions="formOptions"
      @close="handleClose"
      ></d2-view-panel>
  </el-dialog>
</template>
<script>
import d2ViewPanel from './view_panel'
export default {
  components: {
    d2ViewPanel
  },
  props: {
    formTemplate: {
      type: Object
    },
    formOptions: {
      type: Object
    },
    formData: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: '查看详情'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  watch: {
    visible (val) {
      this.dialogVisible = val
    }
  },
  methods: {
    handleClose () {
        console.info('asdfasfsadfdsf')
      this.$emit('close')
    }
  }
}
</script>

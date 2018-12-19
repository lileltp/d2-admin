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
    <d2-form-panel
      @handel-save="handleSave"
      :formTemplate="formTemplate"
      :formData="formData"
      :formOptions="formOptions"
      :formRules="formRules"
    ></d2-form-panel>
  </el-dialog>
</template>
<script>
import d2FormPanel from './form_panel'
export default {
  components: {
    d2FormPanel
  },
  props: {
    rowIndex: {
      type: Number
    },
    formModel: {
      type: String
    },
    formTemplate: {
      type: Object,
      required: true
    },
    formOptions: {
      type: Object
    },
    formData: {
      type: Object,
      required: true
    },
    formRules: {
      type: Object
    },
    title: {
      type: String,
      default: '新增'
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
      this.$emit('close')
    },
    handleSave (data) {
      this.$emit('form-save', this.formModel, this.rowIndex, data)
      this.$emit('close')
    }
  }
}
</script>

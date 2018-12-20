<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      v-bind="formOptions"
    >
      <el-row v-bind="formOptions">
        <template v-for="(value, key, index) in formData">
          <el-col
            v-if="formTemplate[key].component ? handleAttribute(formTemplate[key].component.show, true) : true"
            :span="formTemplate[key].component ? handleAttribute(formTemplate[key].component.span, 24) : 24"
            :offset="formTemplate[key].component ? handleAttribute(formTemplate[key].component.offset, 0) : 0"
          >
            <el-form-item
              :label="formTemplate[key].title"
              :prop="key"
            >
              <span v-if="(!formTemplate[key].component) ||((!formTemplate[key].component.name) && (!formTemplate[key].component.render)) || formTemplate[key].component.name === 'el-input'">
                {{formData[key]}}
              </span>
              <render-custom-component
                v-else-if="formTemplate[key].component.name"
                v-model="formData[key]"
                :component-name="formTemplate[key].component.name"
                :props="formTemplate[key].component.props ? formTemplate[key].component.props : null"
              >
              </render-custom-component>
              <render-component
                v-else-if="formTemplate[key].component.render"
                :render-function="formTemplate[key].component.render"
                :scope="formData[key]"
              >
              </render-component>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button
        :size="formOptions ? handleAttribute(formOptions.saveButtonSize, null) : null"
        :type="formOptions ? handleAttribute(formOptions.saveButtonType, null) : null"
        :icon="formOptions ? handleAttribute(formOptions.saveButtonIcon, null) : null"
        :loading="formOptions ? handleAttribute(formOptions.saveLoading, false) : false"
        @click="handleDialogClose"
      >
        {{formOptions ? handleAttribute(formOptions.saveButtonText, '确定') : '确定'}}
      </el-button>
    </div>
  </div>
</template>
<script>
import renderCustomComponent from '../column/renderCustomComponent'
import renderComponent from '../column/renderComponent'
import handleAttribute from '../../mixins/d2-crud/utils.js'

export default {
  components: {
    renderCustomComponent, renderComponent
  },
   mixins:[handleAttribute],
  props: {
    formData: {
      type: Object,
      required: true
    },
    formOptions: {
      type: Object
    },
    size: {
      type: String,
      default: 'mini'
    },
    formTemplate: {
      type: Object
    }
  },
  methods: {
    handleDialogClose () {
      this.$emit('close')
    }
  }
}
</script>
<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      v-bind="formOptions"
    >
      <el-row v-bind="formOptions">
        <template
          v-for="(value, key, index) in formData"
          :key="index"
        >
          <el-col
            v-if="formTemplate[key].component ? handleAttribute(formTemplate[key].component.show, true) : true"
            :span="formTemplate[key].component ? handleAttribute(formTemplate[key].component.span, 24) : 24"
            :offset="formTemplate[key].component ? handleAttribute(formTemplate[key].component.offset, 0) : 0"
          >
            <el-form-item
              :label="formTemplate[key].title"
              :prop="key"
            >
              <el-input
                v-if="(!formTemplate[key].component) ||((!formTemplate[key].component.name) && (!formTemplate[key].component.render)) || formTemplate[key].component.name === 'el-input'"
                v-model="formData[key]"
                v-bind="size ? Object.assign({ size: size}, formTemplate[key].component) : formTemplate[key].component"
              >
              </el-input>
              <el-input-number
                v-else-if="formTemplate[key].component.name === 'el-input-number'"
                v-model="formData[key]"
                v-bind="size ? Object.assign({ size: size}, formTemplate[key].component) : formTemplate[key].component"
              >
              </el-input-number>
              <el-radio-group
                v-else-if="formTemplate[key].component.name === 'el-radio'"
                v-model="formData[key]"
                v-bind="size ? Object.assign({ size: size}, formTemplate[key].component) : formTemplate[key].component"
              >
                <template v-if="formTemplate[key].component.buttonMode">
                  <el-radio-button
                    v-for="option in formTemplate[key].component.options"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{option.label}}
                  </el-radio-button>
                </template>
                <template v-else>
                  <el-radio
                    v-for="option in formTemplate[key].component.options"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{option.label}}
                  </el-radio>
                </template>
              </el-radio-group>
              <el-checkbox-group
                v-else-if="formTemplate[key].component.name === 'el-checkbox'"
                v-model="formData[key]"
                v-bind="size ? Object.assign({ size: size}, formTemplate[key].component) : formTemplate[key].component"
              >
                <template v-if="formTemplate[key].component.buttonMode">
                  <el-checkbox-button
                    v-for="option in formTemplate[key].component.options"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{option.label}}
                  </el-checkbox-button>
                </template>
                <template v-else>
                  <el-checkbox
                    v-for="option in formTemplate[key].component.options"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{option.label}}
                  </el-checkbox>
                </template>
              </el-checkbox-group>
              <el-select
                v-else-if="formTemplate[key].component.name === 'el-select'"
                v-model="formData[key]"
                v-bind="size ? Object.assign({ size: size}, formTemplate[key].component) : formTemplate[key].component"
              >
                <el-option
                  v-for="option in formTemplate[key].component.options"
                  :key="option.value"
                  v-bind="option"
                >
                </el-option>
              </el-select>
              <el-cascader
                v-else-if="formTemplate[key].component.name === 'el-cascader'"
                v-model="formData[key]"
                v-bind="size ? Object.assign({ size: size}, formTemplate[key].component) : formTemplate[key].component"
              >
              </el-cascader>
              <el-switch
                v-else-if="formTemplate[key].component.name === 'el-switch'"
                v-model="formData[key]"
                v-bind="formTemplate[key].component"
              >
              </el-switch>
              <el-slider
                v-else-if="formTemplate[key].component.name === 'el-slider'"
                v-model="formData[key]"
                v-bind="formTemplate[key].component"
              >
              </el-slider>
              <el-time-select
                v-else-if="formTemplate[key].component.name === 'el-time-select'"
                v-model="formData[key]"
                v-bind="size ? Object.assign({ size: size}, formTemplate[key].component) : formTemplate[key].component"
              >
              </el-time-select>
              <el-time-picker
                v-else-if="formTemplate[key].component.name === 'el-time-picker'"
                v-model="formData[key]"
                v-bind="size ? Object.assign({ size: size}, formTemplate[key].component) : formTemplate[key].component"
              >
              </el-time-picker>
              <el-date-picker
                v-else-if="formTemplate[key].component.name === 'el-date-picker'"
                v-model="formData[key]"
                v-bind="size ? Object.assign({ size: size}, formTemplate[key].component) : formTemplate[key].component"
              >
              </el-date-picker>
              <el-rate
                v-else-if="formTemplate[key].component.name === 'el-rate'"
                v-model="formData[key]"
                v-bind="formTemplate[key].component"
              >
              </el-rate>
              <el-color-picker
                v-else-if="formTemplate[key].component.name === 'el-color-picker'"
                v-model="formData[key]"
                v-bind="size ? Object.assign({ size: size}, formTemplate[key].component) : formTemplate[key].component"
              >
              </el-color-picker>
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
        @click="handleDialogSave"
      >
        {{formOptions ? handleAttribute(formOptions.saveButtonText, '确定') : '确定'}}
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    formTemplate: {
      type: Object,
      required: true
    },
    formData: {
      type: Object,
      required: true
    },
    formRules: {
      type: Object,
      default: null
    },
    formOptions: {
      type: Object
    },
    size: {
      type: String,
      default: 'mini'
    }
  },
  methods: {
    handleDialogSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('handel-edit', this.formData)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

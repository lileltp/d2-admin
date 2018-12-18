<template>
  <el-form
    :inline="true"
    :size="size"
    ref="filterForm"
    v-model="filterTemplate"
  >
    <template v-for="(item,index) in filterTemplate">
      <el-form-item
        :label="item.title"
        :prop="index"
        :key="index"
      >
        <el-input
          v-if="(!item.component) ||((!item.component.name) && (!item.component.render)) || item.component.name === 'el-input'"
          v-model="item.value"
          v-bind="item.component"
        >
        </el-input>
        <el-input-number
          v-else-if="item.component.name === 'el-input-number'"
          v-model="item.value"
          v-bind="item.component"
        >
        </el-input-number>
        <el-radio-group
          v-else-if="item.component.name === 'el-radio'"
          v-model="item.value"
          v-bind="item.component"
        >
          <template v-if="item.component.buttonMode">
            <el-radio-button
              v-for="option in item.component.options"
              :key="option.value"
              :label="option.value"
            >
              {{option.label}}
            </el-radio-button>
          </template>
          <template v-else>
            <el-radio
              v-for="option in item.component.options"
              :key="option.value"
              :label="option.value"
            >
              {{option.label}}
            </el-radio>
          </template>
        </el-radio-group>
        <el-checkbox-group
          v-else-if="item.component.name === 'el-checkbox'"
          v-model="item.value"
          v-bind="item.component"
        >
          <template v-if="item.component.buttonMode">
            <el-checkbox-button
              v-for="option in item.component.options"
              :key="option.value"
              :label="option.value"
            >
              {{option.label}}
            </el-checkbox-button>
          </template>
          <template v-else>
            <el-checkbox
              v-for="option in item.component.options"
              :key="option.value"
              :label="option.value"
            >
              {{option.label}}
            </el-checkbox>
          </template>
        </el-checkbox-group>
        <el-select
          v-else-if="item.component.name === 'el-select'"
          v-model="item.value"
          v-bind="item.component"
        >
          <el-option
            v-for="option in item.component.options"
            :key="option.value"
            v-bind="option"
          >
          </el-option>
        </el-select>
        <el-cascader
          v-else-if="item.component.name === 'el-cascader'"
          v-model="item.value"
          v-bind="item.component"
        >
        </el-cascader>
        <el-switch
          v-else-if="item.component.name === 'el-switch'"
          v-model="item.value"
          v-bind="item.component"
        >
        </el-switch>
        <el-slider
          v-else-if="item.component.name === 'el-slider'"
          v-model="item.value"
          v-bind="item.component"
        >
        </el-slider>
        <el-time-select
          v-else-if="item.component.name === 'el-time-select'"
          v-model="item.value"
          v-bind="item.component"
        >
        </el-time-select>
        <el-time-picker
          v-else-if="item.component.name === 'el-time-picker'"
          v-model="item.value"
          v-bind="item.component"
        >
        </el-time-picker>
        <el-date-picker
          v-else-if="item.component.name === 'el-date-picker'"
          v-model="item.value"
          v-bind="item.component"
        >
        </el-date-picker>
        <el-rate
          v-else-if="item.component.name === 'el-rate'"
          v-model="item.value"
          v-bind="item.component"
        >
        </el-rate>
        <el-color-picker
          v-else-if="item.component.name === 'el-color-picker'"
          v-model="item.value"
          v-bind="item.component"
        >
        </el-color-picker>
        <render-custom-component
          v-else-if="item.component.name"
          v-model="item.value"
          :component-name="item.component.name"
          :props="item.component.props ? item.component.props : null"
        >
        </render-custom-component>
        <render-component
          v-else-if="item.component.render"
          :render-function="item.component.render"
          :scope="item.value"
        >
        </render-component>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleQuery"
      >查询</el-button>
      <el-button @click="handelReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import _string from 'lodash/string'
import _lang from 'lodash/lang'
export default {
  props: ['size', 'filterTemplate', 'queryString'],
  methods: {
    handelReset () {
      for (let item in this.filterTemplate) {
        this.filterTemplate[item].value = ''
      }
    },
    handleQuery () {
      let template = this.filterTemplate
      let query = ''
      for (let item in template) {
        if (template[item].value) {
          let itemString = item
          if (template[item].compare) {
            itemString += '|' + template[item].compare
          } else {
            itemString += '|='
          }
          if (_lang.isArray(template[item].value)) {
            itemString += '|' + template[item].value.join('^')
          } else {
            itemString += '|' + template[item].value
          }
          query += itemString + ','
        }
      }
      query = _string.trimEnd(query, ',')
      this.$emit('query', query)
    }
  }
}
</script>

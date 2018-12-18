<template>
  <div>
    <div></div>
    <el-table
      ref="elTable"
      :data="d2Data"
      :columns="columns"
      v-bind="options"
      @current-change="handleCurrentChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      @cell-click="handleCellClick"
      @cell-dblclick="handleCellDblclick"
      @row-click="handleRowClick"
      @row-contextmenu="handleRowContextmenu"
      @row-dblclick="handleRowDblclick"
      @header-click="handleHeaderClick"
      @header-contextmenu="handleHeaderContextmenu"
    >
      <el-table-column
        v-if="selectionRow || selectionRow === ''"
        type="selection"
        :label="handleAttribute(selectionRow.title, '')"
        v-bind="selectionRow"
      >
      </el-table-column>
      <el-table-column
        v-if="indexRow || indexRow === ''"
        type="index"
        :label="handleAttribute(indexRow.title, '')"
        v-bind="indexRow"
      >
      </el-table-column>
      <!-- 暂不使用d2-column递归组件，有bug -->
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :label="handleAttribute(item.title, '')"
        :prop="handleAttribute(item.key, null)"
        v-bind="item"
      >
        <template slot-scope="scope">
          <el-input
            v-if="item.component && item.component.name === 'el-input'"
            v-model="scope.row[item.key]"
            v-bind="Object.assign({ size: size}, item.component)"
          >
          </el-input>
          <el-input-number
            v-else-if="item.component && item.component.name === 'el-input-number'"
            v-model="scope.row[item.key]"
            v-bind="Object.assign({ size: size}, item.component)"
          >
          </el-input-number>
          <el-radio-group
            v-else-if="item.component && item.component.name === 'el-radio'"
            v-model="scope.row[item.key]"
            v-bind="Object.assign({ size: size}, item.component)"
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
            v-else-if="item.component && item.component.name === 'el-checkbox'"
            v-model="scope.row[item.key]"
            v-bind="Object.assign({ size: size}, item.component)"
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
            v-else-if="item.component && item.component.name === 'el-select'"
            v-model="scope.row[item.key]"
            v-bind="Object.assign({ size: size}, item.component)"
          >
            <el-option
              v-for="option in item.component.options"
              :key="option.value"
              v-bind="option"
            >
            </el-option>
          </el-select>
          <el-cascader
            v-else-if="item.component && item.component.name === 'el-cascader'"
            v-model="scope.row[item.key]"
            v-bind="Object.assign({ size: size}, item.component)"
          >
          </el-cascader>
          <el-switch
            v-else-if="item.component && item.component.name === 'el-switch'"
            v-model="scope.row[item.key]"
            v-bind="item.component"
          >
          </el-switch>
          <el-slider
            v-else-if="item.component && item.component.name === 'el-slider'"
            v-model="scope.row[item.key]"
            v-bind="item.component"
          >
          </el-slider>
          <el-time-select
            v-else-if="item.component && item.component.name === 'el-time-select'"
            v-model="scope.row[item.key]"
            v-bind="Object.assign({ size: size}, item.component)"
          >
          </el-time-select>
          <el-time-picker
            v-else-if="item.component && item.component.name === 'el-time-picker'"
            v-model="scope.row[item.key]"
            v-bind="Object.assign({ size: size}, item.component)"
          >
          </el-time-picker>
          <el-date-picker
            v-else-if="item.component && item.component.name === 'el-date-picker'"
            v-model="scope.row[item.key]"
            v-bind="Object.assign({ size: size}, item.component)"
          >
          </el-date-picker>
          <el-rate
            v-else-if="item.component && item.component.name === 'el-rate'"
            v-model="scope.row[item.key]"
            v-bind="item.component"
          >
          </el-rate>
          <el-color-picker
            v-else-if="item.component && item.component.name === 'el-color-picker'"
            v-model="scope.row[item.key]"
            v-bind="Object.assign({ size: size}, item.component)"
          >
          </el-color-picker>
          <render-custom-component
            v-else-if="item.component && item.component.name"
            v-model="scope.row[item.key]"
            :component-name="item.component.name"
            :props="item.component.props ? item.component.props : null"
            :scope="scope"
          >
          </render-custom-component>
          <render-component
            v-else-if="item.component && item.component.render"
            :render-function="item.component.render"
            :scope="scope"
          >
          </render-component>
          <template v-else>{{item.formatter ? item.formatter(scope.row, scope.column, _get(scope.row, item.key), scope.$index) : _get(scope.row, item.key)}}</template>
        </template>
        <template v-if="item.children">
          <el-table-column
            v-for="(item2, index2) in item.children"
            :key="index2"
            :label="handleAttribute(item2.title, '')"
            :prop="handleAttribute(item2.key, null)"
            v-bind="item2"
          >
            <template slot-scope="scope">
              <el-input
                v-if="item2.component && item2.component.name === 'el-input'"
                v-model="scope.row[item2.key]"
                v-bind="Object.assign({ size: size}, item2.component)"
              >
              </el-input>
              <el-input-number
                v-else-if="item2.component && item2.component.name === 'el-input-number'"
                v-model="scope.row[item2.key]"
                v-bind="Object.assign({ size: size}, item2.component)"
              >
              </el-input-number>
              <el-radio-group
                v-else-if="item2.component && item2.component.name === 'el-radio'"
                v-model="scope.row[item2.key]"
                v-bind="Object.assign({ size: size}, item2.component)"
              >
                <template v-if="item2.component.buttonMode">
                  <el-radio-button
                    v-for="option in item2.component.options"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{option.label}}
                  </el-radio-button>
                </template>
                <template v-else>
                  <el-radio
                    v-for="option in item2.component.options"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{option.label}}
                  </el-radio>
                </template>
              </el-radio-group>
              <el-checkbox-group
                v-else-if="item2.component && item2.component.name === 'el-checkbox'"
                v-model="scope.row[item2.key]"
                v-bind="Object.assign({ size: size}, item2.component)"
              >
                <template v-if="item2.component.buttonMode">
                  <el-checkbox-button
                    v-for="option in item2.component.options"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{option.label}}
                  </el-checkbox-button>
                </template>
                <template v-else>
                  <el-checkbox
                    v-for="option in item2.component.options"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{option.label}}
                  </el-checkbox>
                </template>
              </el-checkbox-group>
              <el-select
                v-else-if="item2.component && item2.component.name === 'el-select'"
                v-model="scope.row[item2.key]"
                v-bind="Object.assign({ size: size}, item2.component)"
              >
                <el-option
                  v-for="option in item2.component.options"
                  :key="option.value"
                  v-bind="option"
                >
                </el-option>
              </el-select>
              <el-cascader
                v-else-if="item2.component && item2.component.name === 'el-cascader'"
                v-model="scope.row[item2.key]"
                v-bind="Object.assign({ size: size}, item2.component)"
              >
              </el-cascader>
              <el-switch
                v-else-if="item2.component && item2.component.name === 'el-switch'"
                v-model="scope.row[item2.key]"
                v-bind="item2.component"
              >
              </el-switch>
              <el-slider
                v-else-if="item2.component && item2.component.name === 'el-slider'"
                v-model="scope.row[item2.key]"
                v-bind="item2.component"
              >
              </el-slider>
              <el-time-select
                v-else-if="item2.component && item2.component.name === 'el-time-select'"
                v-model="scope.row[item2.key]"
                v-bind="Object.assign({ size: size}, item2.component)"
              >
              </el-time-select>
              <el-time-picker
                v-else-if="item2.component && item2.component.name === 'el-time-picker'"
                v-model="scope.row[item2.key]"
                v-bind="Object.assign({ size: size}, item2.component)"
              >
              </el-time-picker>
              <el-date-picker
                v-else-if="item2.component && item2.component.name === 'el-date-picker'"
                v-model="scope.row[item2.key]"
                v-bind="Object.assign({ size: size}, item2.component)"
              >
              </el-date-picker>
              <el-rate
                v-else-if="item2.component && item2.component.name === 'el-rate'"
                v-model="scope.row[item2.key]"
                v-bind="item2.component"
              >
              </el-rate>
              <el-color-picker
                v-else-if="item2.component && item2.component.name === 'el-color-picker'"
                v-model="scope.row[item2.key]"
                v-bind="Object.assign({ size: size}, item2.component)"
              >
              </el-color-picker>
              <render-custom-component
                v-else-if="item2.component && item2.component.name"
                v-model="scope.row[item2.key]"
                :component-name="item2.component.name"
                :props="item2.component.props ? item2.component.props : null"
                :scope="scope"
              >
              </render-custom-component>
              <render-component
                v-else-if="item2.component && item2.component.render"
                :render-function="item2.component.render"
                :scope="scope"
              >
              </render-component>
              <template v-else>{{item2.formatter ? item2.formatter(scope.row, scope.column, _get(scope.row, item2.key), scope.$index) : _get(scope.row, item2.key)}}</template>
            </template>
            <template v-if="item2.children">
              <el-table-column
                v-for="(item3, index3) in item2.children"
                :key="index3"
                :label="handleAttribute(item3.title, '')"
                :prop="handleAttribute(item3.key, null)"
                v-bind="item3"
              >
                <template slot-scope="scope">
                  <el-input
                    v-if="item3.component && item3.component.name === 'el-input'"
                    v-model="scope.row[item3.key]"
                    v-bind="Object.assign({ size: size}, item3.component)"
                  >
                  </el-input>
                  <el-input-number
                    v-else-if="item3.component && item3.component.name === 'el-input-number'"
                    v-model="scope.row[item3.key]"
                    v-bind="Object.assign({ size: size}, item3.component)"
                  >
                  </el-input-number>
                  <el-radio-group
                    v-else-if="item3.component && item3.component.name === 'el-radio'"
                    v-model="scope.row[item3.key]"
                    v-bind="Object.assign({ size: size}, item3.component)"
                  >
                    <template v-if="item3.component.buttonMode">
                      <el-radio-button
                        v-for="option in item3.component.options"
                        :key="option.value"
                        :label="option.value"
                      >
                        {{option.label}}
                      </el-radio-button>
                    </template>
                    <template v-else>
                      <el-radio
                        v-for="option in item3.component.options"
                        :key="option.value"
                        :label="option.value"
                      >
                        {{option.label}}
                      </el-radio>
                    </template>
                  </el-radio-group>
                  <el-checkbox-group
                    v-else-if="item3.component && item3.component.name === 'el-checkbox'"
                    v-model="scope.row[item3.key]"
                    v-bind="Object.assign({ size: size}, item3.component)"
                  >
                    <template v-if="item3.component.buttonMode">
                      <el-checkbox-button
                        v-for="option in item3.component.options"
                        :key="option.value"
                        :label="option.value"
                      >
                        {{option.label}}
                      </el-checkbox-button>
                    </template>
                    <template v-else>
                      <el-checkbox
                        v-for="option in item3.component.options"
                        :key="option.value"
                        :label="option.value"
                      >
                        {{option.label}}
                      </el-checkbox>
                    </template>
                  </el-checkbox-group>
                  <el-select
                    v-else-if="item3.component && item3.component.name === 'el-select'"
                    v-model="scope.row[item3.key]"
                    v-bind="Object.assign({ size: size}, item3.component)"
                  >
                    <el-option
                      v-for="option in item3.component.options"
                      :key="option.value"
                      v-bind="option"
                    >
                    </el-option>
                  </el-select>
                  <el-cascader
                    v-else-if="item3.component && item3.component.name === 'el-cascader'"
                    v-model="scope.row[item3.key]"
                    v-bind="Object.assign({ size: size}, item3.component)"
                  >
                  </el-cascader>
                  <el-switch
                    v-else-if="item3.component && item3.component.name === 'el-switch'"
                    v-model="scope.row[item3.key]"
                    v-bind="item3.component"
                  >
                  </el-switch>
                  <el-slider
                    v-else-if="item3.component && item3.component.name === 'el-slider'"
                    v-model="scope.row[item3.key]"
                    v-bind="item3.component"
                  >
                  </el-slider>
                  <el-time-select
                    v-else-if="item3.component && item3.component.name === 'el-time-select'"
                    v-model="scope.row[item3.key]"
                    v-bind="Object.assign({ size: size}, item3.component)"
                  >
                  </el-time-select>
                  <el-time-picker
                    v-else-if="item3.component && item3.component.name === 'el-time-picker'"
                    v-model="scope.row[item3.key]"
                    v-bind="Object.assign({ size: size}, item3.component)"
                  >
                  </el-time-picker>
                  <el-date-picker
                    v-else-if="item3.component && item3.component.name === 'el-date-picker'"
                    v-model="scope.row[item3.key]"
                    v-bind="Object.assign({ size: size}, item3.component)"
                  >
                  </el-date-picker>
                  <el-rate
                    v-else-if="item3.component && item3.component.name === 'el-rate'"
                    v-model="scope.row[item3.key]"
                    v-bind="item3.component"
                  >
                  </el-rate>
                  <el-color-picker
                    v-else-if="item3.component && item3.component.name === 'el-color-picker'"
                    v-model="scope.row[item3.key]"
                    v-bind="Object.assign({ size: size}, item3.component)"
                  >
                  </el-color-picker>
                  <render-custom-component
                    v-else-if="item3.component && item3.component.name"
                    v-model="scope.row[item3.key]"
                    :component-name="item3.component.name"
                    :props="item3.component.props ? item3.component.props : null"
                    :scope="scope"
                  >
                  </render-custom-component>
                  <render-component
                    v-else-if="item3.component && item3.component.render"
                    :render-function="item3.component.render"
                    :scope="scope"
                  >
                  </render-component>
                  <template v-else>{{item3.formatter ? item3.formatter(scope.row, scope.column, _get(scope.row, item3.key), scope.$index) : _get(scope.row, item3.key)}}</template>
                </template>
                <!-- <d2-column v-if="item.children" :columns="item.children"></d2-column> -->
              </el-table-column>
            </template>
            <!-- <d2-column v-if="item.children" :columns="item.children"></d2-column> -->
          </el-table-column>
        </template>
        <!-- <d2-column v-if="item.children" :columns="item.children"></d2-column> -->
      </el-table-column>
      <!-- <d2-column :columns="columns"></d2-column> -->
      <el-table-column
        v-if="rowHandle"
        :label="handleAttribute(rowHandle.columnHeader, '操作')"
        v-bind="rowHandle"
      >
        <template slot-scope="scope">
          <el-button
            v-if="rowHandle.edit && handleRowHandleButtonShow(rowHandle.edit.show, scope.$index, scope.row)"
            :disabled="handleRowHandleButtonDisabled(rowHandle.edit.disabled, scope.$index, scope.row)"
            v-bind="Object.assign({ size: size}, rowHandle.edit)"
            :icon="handleAttribute(rowHandle.edit.icon,'el-icon-edit')"
            @click="handleEdit(scope.$index, scope.row)"
          >
            <template v-if="rowHandle.edit.text!==''">
              {{handleAttribute(rowHandle.edit.text, '编辑')}}
            </template>
          </el-button>
          <el-button
            v-if="rowHandle.remove && handleRowHandleButtonShow(rowHandle.remove.show, scope.$index, scope.row)"
            :type="handleAttribute(rowHandle.remove.type, 'danger')"
            :icon="handleAttribute(rowHandle.remove.icon,'el-icon-delete')"
            :disabled="handleRowHandleButtonDisabled(rowHandle.remove.disabled, scope.$index, scope.row)"
            v-bind="Object.assign({ size:size}, rowHandle.remove)"
            @click="handleRemove(scope.$index, scope.row)"
          >
            <template v-if="rowHandle.remove.text!==''">
              {{handleAttribute(rowHandle.remove.text, '删除')}}
            </template>
          </el-button>
          <template v-for="(item, index) in handleAttribute(rowHandle.custom, [])">
            <el-button
              v-if="handleRowHandleButtonShow(item.show, scope.$index, scope.row)"
              :disabled="handleRowHandleButtonDisabled(item.disabled, scope.$index, scope.row)"
              v-bind="Object.assign({ size: size}, item)"
              @click="$emit(item.emit, {index: scope.$index, row: scope.row})"
            >
              <template v-if="item.text!==''">
                {{item.text}}
              </template>
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div></div>
  </div>
</template>
<script>
import baseMixin from '../mixins/d2-crud/base'
import hrMixin from '../mixins/d2-crud/handleRow'
import utilsMixin from '../mixins/d2-crud/utils'
import dataMixin from '../mixins/d2-crud/data'
import methods from '../mixins/d2-crud/methods'
import renderCustomComponent from './column/renderCustomComponent'
import renderComponent from './column/renderComponent'
export default {
  name: 'd2-crud',
  mixins: [baseMixin, hrMixin, utilsMixin, dataMixin, methods],
  components: {
    renderCustomComponent,
    renderComponent
  },
  mounted () {

  }
}
</script>

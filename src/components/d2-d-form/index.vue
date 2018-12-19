<template>
  <div>
    <d2-container>
      <template slot="header">
        <div class="d2-clearfix">
          <div class="d2-fl">{{title}}</div>
          <div class="d2-fr">
            <tools-panel
              @show-modify="showFormDialog('modify')"
              @show-add="showFormDialog('add')"
              @show-view="showViewDialog"
              @delete="handleDeletes"
              size="mini"
            ></tools-panel>
          </div>
        </div>
      </template>
      <d2-crud-table
        ref="d2Data"
        :data="data"
        :columns="columns"
        :options="options"
        :rowHandle="rowHandle"
        :selectionRow="selectionRow"
        :indexRow="indexRow"
        @row-edit="handleRowEdit"
        @row-delete="handleRowDelete"
        @current-change="handleCurrentChange"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @selection-change="handleSelectionChange"
        @cell-mouse-enter="handleCellMouseEnter"
        @cell-mouse-leave="handleCellMouseLeave"
        @cell-click="handleCellClick"
        @cell-dblclick="handleCellDblclick"
        @row-click="handleRowClick"
        @row-contextmenu="handleRowContextmenu"
        @row-dblclick="handleRowDblclick"
        @header-click="handleHeaderClick"
        @header-contextmenu="handleHeaderContextmenu"
      ></d2-crud-table>
      <template
        slot="footer"
        v-if="pagination"
      >
        <page-panel></page-panel>
      </template>
      <form-dialog
        :title="formTitle"
        :visible="formDialogVisible"
        :fullscreen="dialogFull"
        :formTemplate="formTemplate"
        :formData="formData"
        :formRules="formRules"
        :formModel="formModel"
        :rowIndex="editRowIndex"
        @form-save="handleFormSave"
        @close="handleFormDialClose"
      ></form-dialog>
      <view-dialog :title="formTitle"
        :visible="viewDialogVisible"
        :fullscreen="dialogFull"
        :formTemplate="viewTemplate"
        :formData="viewData"
        @close="handleViewDialClose">
      </view-dialog>
    </d2-container>
  </div>
</template>
<script>
import d2CrudTable from './components/d2-crud'
import baseMixin from './mixins/d-form/base'
import toolsPanel from './components/views/tools-panel'
import pagePanel from './components/views/page-panel'
import methods from './mixins/d-form/methods'
import formDialog from './components/views/d2-d-form-dialog.vue'
import viewDialog from './components/views/d2-d-view-dialog.vue'
export default {
  props: ['columns', 'data'],
  mixins: [baseMixin, methods],
  components: {
    d2CrudTable,
    toolsPanel,
    pagePanel,
    formDialog,
    viewDialog
  },
  data () {
    return {
      viewDialogVisible:false,
      formDialogVisible: false, // 编辑新增dialog是否显示
      viewDialogVisible: false,
      selectRows: null,
      selectSingleRow: null,
      selectSingleIndex: null,
      formTemplate: {},
      formData: {},
      formRules: {},
      formModel: '',
      formTitle: '新增',
      editRowIndex: -1,
      viewTemplate:null,
      viewData:{}
    }
  },
  mounted () {
  }
}
</script>

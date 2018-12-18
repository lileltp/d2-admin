<template>
  <div>
    <d2-container>
      <template slot="header">
        <tools-panel
          @show-view='showView'
          size="mini"
        ></tools-panel>
      </template>

      <d2-crud-table
        :data="data"
        :columns="columns"
        :options="options"
        :rowHandle="rowHandle"
        :selectionRow="selectionRow"
        :indexRow="indexRow"
        @row-edit="handleRowEdit"
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
      <view-panel :viewVisible="viewVisible" />
    </d2-container>
  </div>
</template>
<script>
import d2CrudTable from './components/d2-crud'
import baseMixin from './mixins/d-form/base'
import toolsPanel from './components/views/tools-panel'
import viewPanel from './components/views/view'
import pagePanel from './components/views/page-panel'
import methods from './mixins/d-form/methods'
export default {
  props: ['columns', 'data'],
  mixins: [baseMixin, methods],
  components: {
    d2CrudTable,
    toolsPanel,
    viewPanel,
    pagePanel
  },
  data () {
    return {
      viewVisible: false
    }
  },
  methods: {
    showView () {

    }
  }
}
</script>
<style lang="css" scoped>
.toTop {
  z-index: 999999;
}
</style>

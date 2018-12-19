<template>
  <d2-d-form
    ref="d2Form"
    :columns="columns"
    :data="data"
    :selectionRow="selectionRow"
    :editFormTemplate="formTemplate"
    :editFormRules="formRules"
    :rowHandle="rowHandle"
    @row-signle-delete="handleSingleDelete"
    @form-save="handleSave"
  ></d2-d-form>
</template>
<script>
export default {
  methods: {
    async handleSave (formModel, index, data) {
      // TODO:  这里做网络请求,如果成功,则继续
      this.$refs['d2Form'].handleFormSaved(formModel, index, data)
    },
    handleSingleDelete(index,row){
      this.$refs['d2Form'].handleRowDeleted(index, row)
    }
  },
  data () {
    return {
      rowHandle: { // 是否显示操作按钮
      columnHeader: '编辑表格',
      edit: {
        text: ''
      },
      remove: {
        text: ''
      }
    },
      handleRequestNet: null,
      formTemplate: {
        project_id: {
          title: '项目编号',
          value: 'aaa'
        },
        equ_id: {
          title: '设备编号',
          value: ''
        }
      },
      formRules: {
        project_id: { required: true }
      },
      selectionRow: [],
      columns: [{ title: '项目名称', key: 'project_id' },
      { title: '设备', key: 'equ_id' },
      {        title: '日期', key: 'date_time', align: 'center',
        component: {
          name: 'el-tag'
        }
      },
      { title: '存/取', key: 'access', align: 'center' },
      { title: '细胞种类', key: 'cell_species' },
      { title: 'save_location', key: '存放位置' },
      { title: '使用人', key: 'user_id' }],
      data: [
        {
          id: 1,
          project_id: 'aaa',
          equ_id: 'abc',
          date_time: '2018年12月11日'
        },
        {
          id: 2,
          project_id: 'aaa',
          equ_id: 'abc'
        },
        {
          project_id: 'aaa',
          equ_id: 'abc'
        },
        {
          id: 3,
          project_id: 'aaa',
          equ_id: 'abc',
          date_time: '2018年12月11日'
        },
        {
          id: 4,
          project_id: 'aaa',
          equ_id: 'abc'
        },
        {
          id: 5,
          project_id: 'aaa',
          equ_id: 'abc'
        },
        {
          id: 6,
          project_id: 'aaa',
          equ_id: 'abc',
          date_time: '2018年12月11日'
        },
        {
          id: 7,
          project_id: 'aaa',
          equ_id: 'abc'
        },
        {
          id: 8,
          project_id: 'aaa',
          equ_id: 'abc'
        },
        {
          id: 8,
          project_id: 'aaa',
          equ_id: 'abc',
          date_time: '2018年12月11日'
        }
      ]
    }
  }
}
</script>

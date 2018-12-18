<template>
  <d2-d-form
    :columns="columns"
    :data="data"
  ></d2-d-form>
</template>
<script>
export default {
  data () {
    return {
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
          project_id: 'aaa',
          equ_id: 'abc',
          date_time: '2018年12月11日'
        },
        {
          project_id: 'aaa',
          equ_id: 'abc'
        },
        {
          project_id: 'aaa',
          equ_id: 'abc'
        },
         {
          project_id: 'aaa',
          equ_id: 'abc',
          date_time: '2018年12月11日'
        },
        {
          project_id: 'aaa',
          equ_id: 'abc'
        },
        {
          project_id: 'aaa',
          equ_id: 'abc'
        },
         {
          project_id: 'aaa',
          equ_id: 'abc',
          date_time: '2018年12月11日'
        },
        {
          project_id: 'aaa',
          equ_id: 'abc'
        },
        {
          project_id: 'aaa',
          equ_id: 'abc'
        },
         {
          project_id: 'aaa',
          equ_id: 'abc',
          date_time: '2018年12月11日'
        }
      ]
    }
  }
}
</script>

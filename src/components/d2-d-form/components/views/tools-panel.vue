<template>
  <el-button-group>
    <el-button
      type="button"
      icon="fa fa-filter"
      :size='buttonSize'
      @click="handleShowFilter"
      v-if="isShowFilter"
    >过滤</el-button>
    <el-button
      type="button"
      icon="el-icon-view"
      :size='buttonSize'
      @click="handleView"
      v-if="isShowView"
    >查看</el-button>
    <el-button
      type="button"
      :size='buttonSize'
      icon="el-icon-circle-plus-outline"
      @click="handelAdd"
      v-if="isShowAdd"
    >新增</el-button>
    <el-button
      type="button"
      :size='buttonSize'
      icon="el-icon-edit"
      @click="handelModify"
      v-if="isShowUpdate"
    >修改</el-button>
    <el-button
      type="button"
      :size='buttonSize'
      icon="el-icon-delete"
      @click="handelDelete"
      v-if="isShowDelete"
    >删除</el-button>
    <el-button
      type="button"
      :size='buttonSize'
      icon="el-icon-refresh"
      @click="handelRefresh"
      v-if="isShowRefresh"
    >刷新</el-button>
    <el-button
      type="button"
      :size='buttonSize'
      icon="el-icon-download"
      @click="handelDownload"
      v-if="isShowDownload"
    >下载</el-button>
    <slot name="extendButton"></slot>
  </el-button-group>
</template>
<script>
export default {
  props: {
    buttonSize: {
      type: String
    },
    isShowAdd: {
      default: true
    },
    isShowView: {
      default: true
    },
    isShowUpdate: {
      default: true
    },
    isShowDelete: {
      default: true
    },
    isShowFilter: {
      default: true
    },
    isShowDownload: {
      default: false
    },
    isShowRefresh: {
      default: true
    }
  },
  methods: {
    handleShowFilter () {
      this.$emit('show-filter')
    },
    handleView () {
      this.$emit('show-view')
    },
    handelAdd () {
      this.$emit('show-add')
    },
    handelModify () {
      this.$emit('show-modify')
    },
    handelDelete () {
      this.$emit('delete')
    },
    handelRefresh () {
      this.$emit('refresh')
    },
    handelDownload () {
      this.$emit('download')
    }
  }
}
</script>

import _forEach from 'lodash.foreach'
import _cloneDeep from 'lodash.clonedeep'
export default {
  methods: {
    handleDeletes () {
      if ((this.selectSingleRow === null && this.selectRows === null) || (this.selectRows !== null && this.selectRows.length < 1)) {
        this.$message({
          message: '请先选择要删除的数据',
          type: 'warning'
        })
      } else {
        this.$confirm(`此操作将删除选中的记录, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.selectRows && this.selectRows.length > 0) {
            this.$emit('row-delete', this.selectRows)
          } else {
            this.$emit('row-delete', [this.selectSingleRow])
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    handleRowsDeleted (rows) {
      // TODO:此部分父组件需要刷新实现
    //   rows.forEach(item => {
    //     if (item.id) {
    //       _array.remove(this.$refs['d2Data'].d2Data, (o) => {
    //         console.info(o, o.id === item.id)
    //         return o.id === item.id
    //       })
    //     }
    //   })
    //   console.info(this.$refs['d2Data'].d2Data)
    //   this.$refs['d2Data'].d2Data = this.$refs['d2Data'].d2Data
    // // this.$refs['d2Data'].d2Data.splice(index, 1)
    },
    handleForm (type, index, row) {
      this.formData = this.formTemplate ? _cloneDeep(this.formTemplate) : {}
      this.formModel = type
      this.editRowIndex = parseInt(index)
      if (type === 'add') {
        _forEach(this.formData, (value, key) => {
          this.formData[key] = this.formTemplate[key].value
        })
      } else {
        _forEach(this.formData, (value, key) => {
          this.formData[key] = row.hasOwnProperty(key) ? row[key] : ''
        })
      }
      this.formDialogVisible = true
    },
    showFormDialog (type, index, row) {
      if (type === 'add') {
        if (this.customerAdd) {
          this.$emit('customerAdd')
        } else {
          if (this.usePageAdd) {
          // TODO: 使用页面形式新增
          } else {
            if (!this.addFormTemplate) {
              this.formTemplate = this.editFormTemplate
            }
            if (!this.addFormRules) {
              this.formRules = this.editFormRules
            }
            this.handleForm('add', -1, {})
          }
        }
      } else {
        if (this.customerEdit) {
          this.$emit('customerEdit')
        } else {
          if (this.usePageEdit) {
          // TODO: 使用页面形式编辑
          } else {
            this.formTitle = '修改'
            this.formTemplate = this.editFormTemplate
            this.formRules = this.editFormRules
            if (typeof (index) !== 'number') {
              if ((this.selectSingleRow === null && this.selectRows === null) || (this.selectRows !== null && this.selectRows.length !== 1)) {
                this.$message({
                  message: '请先选择一条要编辑的数据',
                  type: 'warning'
                })
                return
              } else {
                if (this.selectSingleRow) {
                  row = this.selectSingleRow
                } else {
                  row = this.selectRows[0]
                }
              }

              if (!row.id) {
                this.$message({
                  message: '使用工具栏修改按钮方式时,需要数据行拥有id字段',
                  type: 'error'
                })
                return
              } else {
                for (let i in this.data) {
                  if (this.data[i].id === row.id) {
                    index = i
                  }
                }
              }
            }
            this.handleForm('modify', index, row)
          }
        }
      }
    },
    handleFormDialClose () {
      this.formDialogVisible = false
    },
    /**
   *
   * 行编辑
   */
    handleRowEdit ({
      index,
      row
    }) {
      this.showFormDialog('modify', index, row)
    },
    /**
   *
   * 处理行删除功能
   */
    handleRowDelete ({
      index,
      row
    }) {
      this.$confirm(`此操作将删除此条记录, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('row-single-delete', index, row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleRowDeleted (index, row) {
      this.$refs['d2Data'].d2Data.splice(index, 1)
    },
    /**
   * @description 对话框关闭后回调,通知外部组件可以开始异步更新数据
   * @author Henry Lee
   * @param {*} formModel
   * @param {*} index
   * @param {*} data
   */
    handleFormSave (formModel, index, data) {
      this.$emit('form-save', formModel, index, data)
    },
    /**
   * @description 外部同步数据库完成后回调方法
   * @author Henry Lee
   * @param {String} formModel add or modify
   * @param {Number} index 如果是编辑则需要传递是编辑哪条数据
   * @param {Object} data 编辑的数据
   */
    handleFormSaved (formModel, index, data) {
      if (formModel === 'add') { // 新增完成
        this.$refs['d2Data'].d2Data.splice(0, 0, data)
      } else { // 修改完成
        let tableData = this.$refs['d2Data'].d2Data
        _forEach(tableData[index], (value, key) => {
          tableData[index][key] = data.hasOwnProperty(key) ? data[key] : ''
        })
      }
    },
    /**
   * @description 行选中状态
   */
    handleCurrentChange (currentRow, oldCurrentRow) {
      this.selectSingleRow = currentRow
      this.$emit('current-change', currentRow, oldCurrentRow)
    },
    /**
   * @description 勾选数据时触发的事件
   */
    handleSelect (selection, row) {
      this.$emit('select', selection, row)
    },
    /**
   * @description 勾选全选时触发的事件
   */
    handleSelectAll (selection) {
      this.$emit('select-all', selection)
    },
    /**
   * @description 复选框选择项发生变化时触发的事件
   */
    handleSelectionChange (selection) {
      this.selectRows = selection
      this.$emit('selection-change', selection)
    },
    /**
   * @description 单元格 hover 进入时触发的事件
   */
    handleCellMouseEnter (row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },
    /**
   * @description 单元格 hover 退出时触发的事件
   */
    handleCellMouseLeave (row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },
    /**
   * @description 单元格点击时触发的事件
   */
    handleCellClick (row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    /**
   * @description 单元格双击时触发的事件
   */
    handleCellDblclick (row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },
    /**
   * @description 行点击时触发的事件
   */
    handleRowClick (row, event, column) {
      this.$emit('row-click', row, event, column)
    },
    /**
   * @description 行右键点击时触发的事件
   */
    handleRowContextmenu (row, event) {
      this.$emit('row-contextmenu', row, event)
    },
    /**
   * @description 行双击时触发的事件
   */
    handleRowDblclick (row, event) {
      this.$emit('row-dblclick', row, event)
    },
    /**
   * @description 表头点击时触发的事件
   */
    handleHeaderClick (column, event) {
      this.$emit('header-click', column, event)
    },
    /**
   * @description 表头右键点击时触发的事件
   */
    handleHeaderContextmenu (column, event) {
      this.$emit('header-contextmenu', column, event)
    }
  }
}

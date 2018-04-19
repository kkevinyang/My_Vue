<template>
  <div id="app">
    <el-table :data="tableData" style="margin-left: 1.5%;width">
      <el-table-column 
        v-for="col in cols"
        :prop="col.prop" :label="col.label" >
      </el-table-column>
    </el-table>
    
    <el-button raw-type="button" @click="addCol">
      添加一列
    </el-button>
    <el-button raw-type="button" @click="addData">
      添加一行
    </el-button>
  </div>
    
</template>

<script>

export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }],
      cols: [
            {prop: 'date', label: '日期'},
            {prop: 'name', label: '姓名'},
          ]
    }
  },
  methods: {
    addCol(){
      this.cols.push({prop: 'address', label: '地址'})
    },
    addData(){
        this.tableData.push({
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        })
    }
  }
}
</script>
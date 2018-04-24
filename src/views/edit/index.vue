<template>
  <div id="app">
    <!-- 选择job -->
    <el-select v-model="selectedJob" placeholder="请选择">
    <el-option
      v-for="item in jobs"
      :key="item.job_id"
      :label="item.topic"
      :value="item.job_id">
    </el-option>
   </el-select>
    <!-- 选择key -->
    <el-select v-model="selectedKey" @change="onSelectedDrug($event)" placeholder="请选择" >
      <el-option
        v-for="item in keys"
        :key="item.key_name"
        :label="item.key_name"
        :value="item.key_name">
      </el-option>
    </el-select>

    <div class="ui container">
      <!-- 表格 -->
      <el-table :data="tableData" style="margin-left: 1%;width: 98%" height="250">
        <el-table-column 
          v-for="col in columns"
          :prop="col.prop" :label="col.label" >
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination> -->
    </div>

  </div>
</template>

<script>
import { getKey } from '@/api/table'
import { getJob } from '@/api/table'
import { getResult } from '@/api/table'

export default {
  data() {
    return {
      listLoading: false,
      tableData: [
        // {
        //     "test_group": "test02",
        //     "dt": 12,
        //     "cnt": 347,
        //     "has_amt_cnt": 347,
        //     "has_amt_rt": 1
        // }
      ],
      jobs: [],
      keys: [],
      selectedJob: '',
      selectedKey:'',
      columns:  [  
        // {prop: 'test_group', label: 'test_group'},
        // {prop: 'cnt', label: 'cnt'},
        // {prop: 'has_amt_cnt', label: 'has_amt_cnt'},
        // {prop: 'dt', label: 'dt'},
        // {prop: 'has_amt_rt', label: 'has_amt_rt'},
        ],
    }
  },
  watch: {
    // job下拉框事件
    selectedJob: function(job_id) {
      console.log('job_id:', job_id)
      this.listLoading = true
      getKey(job_id).then(response => {
        console.log('getKey_res:', response)
        this.keys = response.data
        this.listLoading = false
        this.selectedKey = null
      })
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    // key下拉框事件
    onSelectedDrug(event) {
      console.log('event:', event)
      
      this.moreParams = {"job_id":this.selectedJob, "key":event}
      console.log('moreParams:', this.moreParams)
      if (event != null){
        getResult(this.selectedJob, event).then(response => {
          console.log('getResult_response:', response)
          this.createForm(response.data)
        })
      }
    },
    // 生成表格
    createForm(data) {
      // var data = JSON.parse(result)
      console.log('data:', typeof data)
      if (data.length > 0){
        var dict = data[0]
        var new_columns = []
        for(var p in dict){
          var new_row = {prop: p, label: p}
          new_columns.push(new_row)
        }
        this.columns = new_columns
        this.tableData = data
        console.log('gen_new_tableData:', this.tableData)
        console.log('gen_new_columns:', this.columns)
      }else{
        console.log('结果为空！')
      }
    },
    // 获取job初始化信息
    fetchData() {
      this.listLoadinglistLoading = true
      getJob().then(response => {
        console.log('getJob_res:', response)
        if (response.data.length > 0){
          this.jobs = response.data
        }
        this.listLoading = false
      })
    },

  }
}


</script>

<style scoped>

.line{
  text-align: center;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>


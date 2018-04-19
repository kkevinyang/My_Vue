<template>
  <div id="app">
    <el-select v-model="selectedJob" placeholder="请选择">
    <el-option
      v-for="item in jobs"
      :key="item.job_id"
      :label="item.topic"
      :value="item.job_id">
    </el-option>
   </el-select>

    <el-select v-model="selectedKey" @change="onSelectedDrug($event)" placeholder="请选择" >
      <el-option
        v-for="item in keys"
        :key="item.key_name"
        :label="item.key_name"
        :value="item.key_name">
      </el-option>
    </el-select>

    <div class="ui container">
      
      <!-- :api-mode="apiMode"
      :fields="columns"
      :data="tableData" -->
      <fish-table :columns="columns" :data="tableData" border height="300"></fish-table>
      <!-- <my-vuetable ref="vuetable"
        api-url="http://127.0.0.1:8000/api/job/key/"
        :fields='["test_group", "cnt", "has_amt_cnt", "has_amt_rt"]'
        data-path="data2"
        :sort-order="sortOrder"
        :append-params="moreParams"
        detail-row-component="my-detail-row"
      ></my-vuetable> -->
    </div>

  </div>
</template>

<script>
import { getKey } from '@/api/table'
import { getJob } from '@/api/table'
import { getResult } from '@/api/table'


import MyVuetable from '@/components/MyVuetable'

export default {
  name: 'app',
  components: {
    MyVuetable
  },
  data() {
    return {
      listLoading: true,
      tableData: [],
      apiMode: false,
      jobs: [],
      keys: [],
      selectedJob: '',
      selectedKey:'',
      columns:  [  
          {title: 'test_group', key: 'test_group'},
          {title: 'cnt', key: 'cnt'},
          {title: 'has_amt_cnt', key: 'has_amt_cnt'},
          {title: 'dt', key: 'dt'},
          {title: 'has_amt_rt', key: 'has_amt_rt'},
        ],
      moreParams: {"job_id":1521611226, "key":"app_sql_has_amt_rt_by_bin"},
      sortOrder: [
        {
          field: 'email',
          sortField: 'email',
          direction: 'asc'
        }
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
          var new_row = {title: p, key: p}
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
      this.listLoading = true
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


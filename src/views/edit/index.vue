<template>
  <div id="app" style="margin-left: 1%;width: 98%" >
    <!-- 选择job -->
    <el-select v-model="selectedJob" placeholder="请选择" style="margin:10px;">
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
      <el-table :data="tableData" height="330">
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

    <el-row :gutter="10" justify="start" align="middle" style="margin-top:20px;">
    <!-- 左分栏 -->
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <!-- 配置区 -->
        <codemirror
          :value="code"
          @change="change">
        </codemirror>
      </div>
      <div class="grid-content bg-purple" style="margin-top:10px;margin-left: 30px">
        <!-- 按钮组 -->
        <!-- <el-button-group style="margin-left: 50px"> -->
        <el-button raw-type="button" type="success" @click="run">RUN!</el-button>
        <el-button type="primary" icon="el-icon-share" @click="save">发送到展示页面</el-button>
        <!-- <el-button type="primary" icon="el-icon-delete"></el-button> -->
        <!-- </el-button-group> -->
      </div>
    </el-col>
    <!-- 右分栏 -->
    <el-col :span="12">
      <div class="grid-content bg-purple-light">
        <div id="container" style="height:400px;"></div>
      </div>
    </el-col>
  </el-row>

  </div>
</template>

<script>
import { getKey } from '@/api/table'
import { getJob } from '@/api/table'
import { getResult } from '@/api/table'
import { saveConf } from '@/api/table'
import { Message, MessageBox } from 'element-ui'

import { codemirror } from 'vue-codemirror-lite'
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/vue/vue')

require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/show-hint.css')
require('codemirror/addon/hint/javascript-hint.js')

export default {
  data() {
    return {
      listLoading: false,
      code: 'const str = "hello world"',
      options:{
        
      },
      code_style:{
        extraKeys: {'Ctrl-Space': 'autocomplete'},
        tabSize: 2,
        lineNumbers: true,
        // lineWrapping: true,
        // viewportMargin: Infinity,
        mode: 'javascript',
      },
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
  mounted(){
      console.log('highchart init ...')
      this.code = `{
 "chart":{"type":"column"},
 "key_column":"test_group",
 "title":{"text":"费率"},
 "yAxis":{"title":{
   "text":"单位"
 }},
 "series":[{"name":"cnt"},
           {"name":"has_amt_cnt"}
 ]
}`
      
      console.log('code:', this.code)
      // this.run()
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

    // 运行新的配置
    run(){
        console.log('new_code:', this.code)
        this.options = JSON.parse(this.code)
        console.log('options:', this.options)
        this.parse_option()

        if (this.options.series.length == 0){
            alert('请先选择对应数据再点击‘Run’')
          } else {
          delete this.options.key_column
          console.log('final_options:', JSON.stringify(this.options))
          var chart = Highcharts.chart('container', this.options);
          }
      },

    // 保存当前配置
    save(){
      console.log('selectedJob:', this.selectedJob)
      console.log('selectedKey:', this.selectedKey)
      console.log('code:', this.code)

      saveConf(this.selectedJob, this.selectedKey, this.code).then(response => {
          console.log('save_response:', response)
          var status = response.code
          if (status ==20000){
             Message({
                message: '保存成功',
                type: 'sucesss',
                duration: 2 * 1000
              })
          }
    })
    },

    // 解析配置文件
    parse_option(){
      var categories = []
      var key_column = this.options.key_column
      var series = this.options.series
      var nees_columns = []

      for (var index in series){
        nees_columns.push(series[index].name)
        series[index].data = []
      }
      console.log('nees_columns:', nees_columns)

      for(var index in this.tableData){
        var dict = this.tableData[index]

        for (var index in series){
          var name = series[index].name
          series[index].data.push(parseFloat(dict[name]))
        }        

        categories.push(dict[key_column].toString())
        // console.log('categories:', categories)

      }
      this.options.xAxis = {}
      this.options.xAxis.categories = categories
    },
    change(code){
      // console.log('change_code:', code)
      this.code = code
    }

  }
}

</script>

<style scoped>

.line{
  text-align: center;
}
.CodeMirror {
  border: 1px solid #eee;
  height: 100px;
}
.CodeMirror-scroll {
  border: 1px solid #eee;
  height: 100px;
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


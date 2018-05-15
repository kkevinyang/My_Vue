<template>
   <div id="chart_container" style="height:400px;"></div>
</template>

<script>
import { isNotEmpty } from '@/utils/func'
import { getResultById } from '@/api/table'

export default {
  name: 'myChart',
  props: {
    options: {
      type: String,
      default: function () {
        return default_config
      }
    },
    tableData: {
      type: Array,
      default: null
    },
    jobKeyId: {
      type: Number,
      default: -1
    },
  },
  data() {
    return {
      chart_data: [],
      chart_option: {},
      default_config: {
        chart:{type:"column"},
          key_column:"test_group",
          title:{text:"费率"},
          yAxis:{title:{
            text:"单位"
          }},
          series:[{name:"cnt"},
                    {name:"has_amt_cnt"}
          ]
      }
    }
  },
  mounted(){
    this.load()
  },
  methods: {
    // 解析配置文件
    parse_option(){
      var categories = []
      var key_column = this.chart_option.key_column
      var series = this.chart_option.series
      var need_columns = []
      for (var index in series){
        need_columns.push(series[index].name)
        series[index].data = []
      }
      // console.log('need_columns:', need_columns)
      for(var index in this.chart_data){
        var dict = this.chart_data[index]
        for (var index in series){
          var name = series[index].name
          series[index].data.push(parseFloat(dict[name]))
        }        
        categories.push(dict[key_column].toString())
      }
      this.chart_option.xAxis = {}
      this.chart_option.xAxis.categories = categories
    },
    // 生成chart
    init_chart(){
      if (isNotEmpty(this.chart_option)){
          this.parse_option()
          delete this.chart_option.key_column
          this.chart_option.lang = {
            resetZoom: '重置',
            resetZoomTitle: '重置缩放比例',
            downloadCSV: '下载 CSV  文件',
            downloadXLS: '下载 XLS   文件',
            viewData: '查看数据表格'
          }
          var chart = Highcharts.chart(String(this.jobKeyId), this.chart_option);
        }
    },
    // 检查所需参数
    check_params(){
      // 检查jobKeyId和options
      // console.log('jobKeyId:',this.jobKeyId)
      if (typeof this.options == 'string'){
        this.chart_option = JSON.parse(this.options)
      }
      // console.log('chart_option:',this.chart_option)
    },
    // 运行新的配置
    load(){
      this.check_params()
      // 获取图标对应data
      if (this.jobKeyId != -1){
        getResultById(this.jobKeyId).then(response => {
          this.chart_data = response.data
          // console.log('chart_data:',this.chart_data)
          if (isNotEmpty(this.chart_option) && this.chart_data.length > 0){
            this.parse_option()
            this.init_chart()
          }
          console.log('init_chart done!')
        })
      }
    },

  }
}

</script>

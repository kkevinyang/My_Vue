<template>
   <div id="chart_container" style="height:400px;"></div>
</template>

<script>
export default {
  name: 'myChart',
  props: {
    options: {
      type: Object,
      default: function () {
        return default_config
      }
    },
    tableData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      lang: {
            resetZoom: '重置',
            resetZoomTitle: '重置缩放比例',
            downloadCSV: '下载 CSV  文件',
            downloadXLS: '下载 XLS   文件',
            viewData: '查看数据表格'
      },
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
      var key_column = this.options.key_column
      var series = this.options.series
      var need_columns = []

      for (var index in series){
        need_columns.push(series[index].name)
        series[index].data = []
      }
      console.log('need_columns:', need_columns)

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
    isNotEmpty(obj){
      for (var name in obj) {
          return true
      }
      return false
    },
    // 运行新的配置
    load(){
      if (this.isNotEmpty(this.options)){
          this.parse_option()
          delete this.options.key_column
          this.options.lang = this.lang
          var chart = Highcharts.chart('chart_container', this.options);
        }
      },

  }
}

</script>

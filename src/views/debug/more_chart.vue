<template>

    <div class="app-container">

    <div class="chart" v-for="item in options" :id="item.job+':'+item.key" style="width: 100%;height:400px;">
    </div>
    
    </div>

</template>

<script>
export default {
  mounted(){
        this.load()
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
      options:[
          {key:"key1", job:"123",option:{
                    chart: {
                        type: 'bar',                          //指定图表的类型，默认是折线图（line）
                    },
                    xAxis: {
                        categories: ['苹果', '香蕉', '橙子']   // x 轴分类
                    },
                    yAxis: {
                        title: {
                            text: '吃水果个数'                // y 轴标题
                        }
                    },
                    series: [{                              // 数据列
                        name: '小明',                        // 数据列名
                        data: [1, 0, 4]                     // 数据
                    }, {
                        name: '小红',
                        data: [5, 7, 3]
                    }]
                    }
          },
          {key:"key2", job:"122",option:{
                    xAxis: {
                        categories: ['苹果', '香蕉', '橙子']   // x 轴分类
                    },
                    yAxis: {
                        title: {
                            text: '吃水果个数'                // y 轴标题
                        }
                    },
                    series: [{                              // 数据列
                        name: '小明',                        // 数据列名
                        data: [1, 0, 4]                     // 数据
                    }, {
                        name: '小红',
                        data: [5, 7, 3]
                    }]
                    }
          },
      ]

    }
  },
  methods:{
      load(){
          for(var index in this.options){
              var item = this.options[index]
              var option = item.option
              option.lang = this.lang
              console.log('option:', option)
              var chart = Highcharts.chart(item.job+':'+item.key, item.option);
          }
      },
  }
}
</script>

<style scoped>
.app-container{
  position: relative;
  padding: 10px;
  width: 100%;
  height: 85vh;
}
.chart{
    padding: 10px;
}
</style>

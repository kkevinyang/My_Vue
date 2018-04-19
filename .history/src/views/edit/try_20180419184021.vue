<template>
<!-- 图表容器 DOM -->
<div id="app">
  <button id="change" @click="change">Refresh Table</button>
  <div id="container" style="width: 600px;height:400px;"></div>
</div>

    
</template>

<script>
export default {
  data () {
    return {
      // 图表配置
      options: {
          chart: {
              type: 'bar',                          //指定图表的类型，默认是折线图（line）
              renderTo: 'container',
          },
          title: {
              text: '我的第一个图表'                 // 标题
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
    }
  },
  methods: {

  }
}

  // 图表初始化函数
  var chart = Highcharts.chart('container', options);
</script>
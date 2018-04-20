<template>
  <div>
    <!-- <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts> -->
    <button @click="load">load</button>
    <button @click="mod">mod</button>
    <button @click="myload">myload</button>    
    <button @click="newChart">newChart</button>

    <div id="container" style="height: 400px" ref="myCharts"></div>

  </div>
</template>

<script>
// import VueHighcharts from 'vue2-highcharts'


// const { chart } = this.$refs.highcharts;

// const { renderer } = this.$refs.highchartsRenderer;

const asyncData = {
  name: 'Tokyo',
  marker: {
    symbol: 'square'
  },
  data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
    y: 26.5,
    marker: {
      symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
    }
  }, 23.3, 18.3, 13.9, 9.6]
}

export default{
    components: {
        VueHighcharts
    },
    data(){
      return{
        options: {
          chart: {
            type: 'spline',
            renderTo: 'container',
          },
          title: {
            text: 'Monthly Average Temperature'
          },
          subtitle: {
            text: 'Source: WorldClimate.com'
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yAxis: {
            title: {
              text: 'Temperature'
            },
            labels: {
              formatter: function () {
                return this.value + '°';
              }
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: []
        }
      }
    },
    methods: {
      load(){
          let lineCharts = this.$refs.lineCharts;
          lineCharts.delegateMethod('showLoading', 'Loading...');
          setTimeout(() => {
              lineCharts.addSeries(asyncData);
              lineCharts.hideLoading();
          }, 20)
      },
      mod(){
        let lineCharts = this.$refs.lineCharts;
        console.log('series:', lineCharts.options.title.text)
        this.options.title.text = '修改名称成功！！！'
        this.options.yAxis.title.text = '这里是y轴'
        lineCharts.destroy()
        // console.log('show:', lineCharts.setOptions)
        // lineCharts.options = getNewOptions();        
      },
      myload(){
        let lineCharts = this.$refs.lineCharts;
        console.log('series:', lineCharts)
        this.$refs.lineCharts.update({
          title: {
              text: '修改名称成功！！！'
          }
        });
      },
      newChart(){
        this.$refs.myCharts = new Highcharts.Chart({
            chart: {
                renderTo: 'container'
            },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]        
            }]
        });
      }
    }
}
</script>
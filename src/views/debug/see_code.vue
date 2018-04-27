<template>
  <!-- <codemirror :options="{
    mode: 'javascript',
    extraKeys: {'Ctrl-Space': 'autocomplete'}
  }"></codemirror> -->
  <div class="app-container">
  <el-row :gutter="20" justify="start" align="middle">
    <!-- 左分栏 -->
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <!-- 配置区 -->
        <codemirror
          :value="code"
          @change="change">
        </codemirror>
      </div>
      <div class="grid-content bg-purple" style="margin-top:10px;">
        <!-- 按钮组 -->
        <!-- <el-button-group style="margin-left: 50px"> -->
        <el-button raw-type="button" type="success" @click="load">RUN!</el-button>
        <el-button type="primary" icon="el-icon-share"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
        <!-- </el-button-group> -->
      </div>
    </el-col>
    <!-- 右分栏 -->
    <el-col :span="12">
      <div class="grid-content bg-purple-light">
        <div id="container" style="width: 600px;height:400px;"></div>
      </div>
    </el-col>
  </el-row>
    <!-- <codemirror
      :value="code"
      @change="change">
    </codemirror> -->

    <!-- <el-button raw-type="button" @click="load">load</el-button> -->

    <!-- <div id="container" style="width: 600px;height:400px;"></div> -->


  </div>
</template>

<script>
  import { codemirror } from 'vue-codemirror-lite'
  require('codemirror/mode/javascript/javascript')
  require('codemirror/mode/vue/vue')

  require('codemirror/addon/hint/show-hint.js')
  require('codemirror/addon/hint/show-hint.css')
  require('codemirror/addon/hint/javascript-hint.js')

  export default {
    data () {
      return {
        code: 'const str = "hello world"',
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
    created() {
        
    },
    mounted(){
      console.log('highchart init ...')
      this.code = JSON.stringify(this.options)
      console.log('code:', this.code)
      this.load()
    },
    methods: {
      load(){
        console.log('new_code:', this.code)
        this.options = JSON.parse(this.code)
        console.log('options:', this.options)
        var chart = Highcharts.chart('container', this.options);
      },
      change(code){
        // console.log('change_code:', code)
        this.code = code
      }
    }
  }
</script>

<style>
  /* .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  } */
</style>
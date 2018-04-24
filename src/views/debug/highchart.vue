<template>

    <div class="app-container">

    <el-button raw-type="button" @click="load">load</el-button>
    <el-button raw-type="button" @click="changeTitle">changeTitle</el-button>
    <el-button raw-type="button" @click="load">load</el-button>
    <el-button raw-type="button" @click="load">load</el-button>
    <el-button raw-type="button" @click="load">load</el-button>

    <div id="container" style="width: 600px;height:400px;"></div>
    
    </div>

</template>

<script>

export default {
    created() {
        
    },
    mounted(){
        this.load()
    },
    data() {
        return {
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
        load(){
            var chart = Highcharts.chart('container', this.options);
        },
        changeTitle(){
            console.log('options:', this.options)
            this.options.title.text = '修改名称成功'
            var chart = Highcharts.chart('container', this.options);
        }
    }
}

</script>
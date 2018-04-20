<template>

    <div class="app-container">
        <el-select v-model="key_name" placeholder="请选择" >
        <el-option
            v-for="item in keyList"
            :key="item.key_name"
            :label="item.key_name"
            :value="item.key_name">
        </el-option>
        </el-select>

    <el-button raw-type="button" @click="load">load</el-button>
    <div id="container" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
var options = {
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
        };
        // 图表初始化函数


import { getKey } from '@/api/table'

export default {
    created() {
        this.fetchData()
    },
    data() {
        return {
            key_name:'',
            keyList:''

        }
    },
    methods: {
        fetchData() {
            getKey(1521611226).then(response => {
            console.log('getKey_res:', response)
            this.keyList = response.data
            this.selectedKey = null
        })
        },
        load(){
            var chart = Highcharts.chart('container', options);
        }
    }
}

</script>
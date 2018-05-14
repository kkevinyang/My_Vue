<template>

    <div class="app-container">
    <div v-if="show">

    <MyChart :tableData="tableData" :options="options"></MyChart>

    <!-- <div class="chart" v-for="item in options" :id="item.job+':'+item.key" style="width: 100%;height:400px;"> -->

    </div>

    </div>

</template>

<script>
import MyChart from '@/components/MyHighchart'
import { getConf } from '@/api/table'

export default {
    components: {
        MyChart
    },
    beforeMount() {
        this.fresh_config()
    },
    mounted(){

        // this.load()
    },
    data() {
        return {
            options:{},
            show:false,
            
            tableData:[{'test_group': 'test', 'cnt': 8248, 'has_amt_cnt': 8235, 'has_amt_rt': 0.9984238603297769}, 
{'test_group': 'else', 'cnt': 143497, 'has_amt_cnt': 143267, 'has_amt_rt': 0.9983971790351018}, 
{'test_group': 'ctrl', 'cnt': 7797, 'has_amt_cnt': 7783, 'has_amt_rt': 0.9982044376042067}],
        }    
    },
    methods: {
        load(){
            console.log('options:', this.options)
        },
        fresh_config(){
            getConf().then(response => {
                let config_list = response.data
                console.log('config_list:', config_list)
                // debugger
                this.options = JSON.parse(config_list[0]['config'])
                console.log('new options:', this.options)
                this.show = true
            })
        }
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

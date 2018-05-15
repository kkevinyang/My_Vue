<template>

    <div class="app-container">
    <MyChart :jobKeyId="item.job_key" v-for="item in config_list" :options="item.config" :id="item.job_key" v-if="show"></MyChart>
    </div>

</template>

<script>
import MyChart from '@/components/MyHighchart'
import { getConf } from '@/api/table'

export default {
    components: {
        MyChart
    },
    mounted(){
        this.load()
    },
    data() {
        return {
            options:{},
            config_list:[],
            show:false
        }    
    },
    methods: {
        load(){
            getConf().then(response => {
                this.config_list = response.data
                console.log('config_list:', this.config_list)
                console.log('开始遍历config_list...')
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

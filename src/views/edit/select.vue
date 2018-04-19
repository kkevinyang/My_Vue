<template>
    <div class="app-container">
        <el-select v-model="key_name" placeholder="请选择" >
        <el-option
            v-for="item in keyList"
            :key="item.key_name"
            :label="item.key_name"
            :value="item.result">
        </el-option>
        </el-select>
    </div>
</template>


<script>
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
    // watch: {
    //     selectedKey:function(result){
    //         console.log('result:', result)

    //         if(result != null) {
    //             console.log('选择的key:', this.key_name)
    //             console.log('result:', result)
    //         }
    //     }
    // },
    methods: {
        fetchData() {
            getKey(1521611226).then(response => {
            console.log('getKey_res:', response)
            this.keyList = response.data
            this.selectedKey = null
        })
        }
    }
}

</script>
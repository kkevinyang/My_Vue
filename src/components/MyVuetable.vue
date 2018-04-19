<template>
    <!-- :api-mode="apiMode" -->

  <vuetable ref="vuetable"
    :api-url="apiUrl"
    :data="tableData"
    :fields="fields"
    pagination-path=""
    :per-page="10"
    :multi-sort="true"
    :sort-order="sortOrder"
    :append-params="appendParams"
    detail-row-component="detailRowComponent"
  ></vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'

export default {

    name: 'my-vuetable',
    components: {
        Vuetable
    },
    props: {
        // apiMode:{
        //     type: Boolean,
        // },
        apiUrl: {
            type: String,
            required: false
        },
        tableData: {
            type: Array,
            default() {
                return []
            }
        },
        fields: {
            type: Array,
            required: false
        },
        sortOrder: {
            type: Array,
            default() {
            return []
            }
        },
        appendParams: {
            type: Object,
            default() {
            return {}
            }
        },
        detailRowComponent: {
            type: String
        }
    },
    data () {
        return {
        // fields: [
        //     'name', 'email', 'birthdate',
        //     'address.line1', 'address.line2', 'address.zipcode'
        // ]
        }
    }
}
</script>
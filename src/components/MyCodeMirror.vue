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
import Vue from 'vue'
import { codemirror } from 'vue-codemirror-lite'

export default {
  components: {
    codemirror
  }
}
</script>
<template>
  <div style="margin: 0 20px 0 20px">
    <p class="control has-icons-left has-icons-right">
      <input class="input" type="text" placeholder="Buscar..." v-model="search_text" @change="search">
      <span class="icon is-small is-left">
        <i class="fa fa-search"></i>
      </span>
    </p>
    <div v-show="results.length">

    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';

export default {
  name: 'search',
  props: ['results'],
  
  data () {
    return {
      search_text: ''
    }
  },

  methods: {
    search: function() {
      _.debounce(this.emitSearch, 100, { 'maxWait': 1000 })();
    },

    emitSearch: function() {
      this.$emit('search', this.search_text);
    }
  }
}
</script>

<style>
</style>

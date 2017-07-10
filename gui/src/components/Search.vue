<template>
  <div style="margin: 0 20px 0 20px">
    <form @submit.prevent="search">
      <div class="columns">
        <div class="column is-3">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="Ingrese texto a buscar..." v-model="search_text">
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </p>
        </div>
        <div class="column is-1">
          <button type="submit" class="button">Buscar</button>
        </div>
        <div class="column is-8">
          <aside v-show="results.length" class="menu">
            <p class="menu-label">
              Resultados
            </p>
            <ul class="menu-list">
              <li class="item-result" v-for="result in results" @click="select(result)">
                <a :class="{'is-active': selected == result}">{{ result }}</a>
              </li>
            </ul>
          </aside>          
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'search',
  props: ['results'],

  data () {
    return {
      search_text: '',
      selected: ''
    }
  },

  methods: {
    search: function() {
      this.$emit('search', this.search_text);
    },

    select: function(res) {
      this.selected = res;
      this.$emit('select', res);
    }
  }
}
</script>

<style>
.item-result {
  cursor: pointer;
}
</style>

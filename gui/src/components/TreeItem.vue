<template>
  <li>
    <a @click="select" :class="{'is-active': item.path == selected }"><span v-if="hasChildren">{{ open ? '-' : '+' }}</span> {{ item.name }}</a>
    <ul v-if="hasChildren" v-show="open" class="menu-list">
        <tree-item
          v-for="(child, i) in item.children"
          :item="child"
          :key="i"
          @select="selectChild"
          :selected="selected">
        </tree-item>
      </ul>
  </li>
</template>

<script>

export default {
  name: 'tree-item',

  props: ['item', 'selected'],

  data () {
    return {
      open: false
    }
  },

  computed: {
    hasChildren: function() {
      return this.item.children && this.item.children.length;
    }
  },

  methods: {
    select: function() {
      this.open = !this.open;
      if (!this.hasChildren) this.$emit('select', this.item.name);
    },

    selectChild: function(item_name) {
      this.$emit('select', `${this.item.name}/${item_name}`);
    }
  }
}
</script>

<style>
</style>

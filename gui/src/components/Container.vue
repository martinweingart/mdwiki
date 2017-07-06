<template>
  <div>
    <div class="notification">
      <h1 class="title">MD Wiki</h1>
      <h2 class="subtitle">Node.js Markdown Wiki</h2>
    </div>

    <section class="section">
      <div class="columns">

        <div class="column is-3">
          <aside class="menu">
            <p class="menu-label">
              Entradas
            </p>
            <ul class="menu-list" v-for="item in dirtree">
              <tree-item :item="item" @select="selectItem"></tree-item>
            </ul>
          </aside>
        </div>

        <div class="column is-9">
          <h1 class="title is-1">{{ entrada.nombre | titulo }}</h1>
          <div v-html="entrada.contenido"></div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import * as axios from 'axios';
import * as Markdown from '../utils/Markdown';
import { socket } from '../utils/Socket';
import TreeItem from '@/components/TreeItem';

export default {
  name: 'container',
  data () {
    return {
      contenido: '',
      entrada: {
        path: '',
        nombre: '',
        contenido: ''
      },
      dirtree: {}
    }
  },

  filters: {
    titulo: function(name) {
      return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
  },

  created: function() {
    axios.get('http://localhost:3000/info')
         .then(r => {
           this.dirtree = r.data;
         });

    socket.on('file-change', file => {
      if (file == this.entrada.path) {
        this.selectItem(file);
      }
    });
  },

  methods: {
    selectItem: function(path) {
      axios.get(`http://localhost:3000/files/${path}`)
           .then(r => {
             this.entrada.path = path;
             this.entrada.nombre = path.substring(path.lastIndexOf('/') + 1, path.length-3);
             this.entrada.contenido = Markdown.parse(r.data);
           })
    }
  },

  components: {
    TreeItem
  }
}
</script>

<style>
</style>

<template>
  <div>
    <div class="notification">
      <h1 class="title">MD Wiki</h1>
      <h2 class="subtitle">Node.js Markdown Wiki</h2>
    </div>

    <section>
      <search v-show="show_search" @search="search" :results="results" @select="selectSearch"></search>
      <i :class="{'fa fa-chevron-up': show_search, 'fa fa-chevron-down': !show_search}"
          @click="show_search = !show_search"
          style="cursor:pointer;width:100%;text-align:center;margin-top:10px"></i>
    </section>

    <section class="section">
      <div class="columns">

        <div class="column is-3">
          <aside class="menu">
            <p class="menu-label">
              Entradas
            </p>
            <ul class="menu-list" v-for="item in dirtree">
              <tree-item :item="item" @select="selectItem" :selected="itemSelected"></tree-item>
            </ul>
          </aside>
        </div>

        <div class="column is-9">
          <h1 class="title is-1">{{ entrada.nombre | titulo }}</h1>
          <hr>
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
import Search from '@/components/Search';

export default {
  name: 'container',
  data () {
    return {
      entrada: {
        path: '',
        nombre: 'Bienvenido!',
        contenido: ''
      },
      dirtree: {},
      results: [],
      itemSelected: '',
      show_search: true
    }
  },

  filters: {
    titulo: function(name) {
      let m_name = name.replace('_', ' ');
      return m_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
  },

  created: function() {
    let contenido_inicial = '#### MDWiki es una Wiki basada en Markdown. \n' +
                            '#### No hay necesidad de configurar ninguna base de datos. \n' +
                            '#### Sólo manipule archivos con extensión ".md". \n';

    this.getDirTree();
    this.entrada.contenido = Markdown.parse(contenido_inicial);

    socket.on('file-change', file => {
      if (file == this.entrada.path) {
        this.selectItem(file);
      }
    });

    socket.on('dir-change', file => {
      this.getDirTree();
    });
  },

  methods: {
    getDirTree: function() {
      axios.get('http://localhost:3001/directory').then(r => this.dirtree = r.data);
    },

    selectItem: function(path) {
      axios.get(`http://localhost:3001/files/${path}`)
           .then(r => {
             this.itemSelected = path;
             this.entrada.path = path;
             this.entrada.nombre = path.substring(path.lastIndexOf('/') + 1, path.length-3);
             this.entrada.contenido = Markdown.parse(r.data);
           })
    },

    search: function(search_text) {
      axios.post(`http://localhost:3001/search`, { search: search_text })
           .then(r => {
             this.results = r.data;
           })
    },

    closeAll: function() {

    },

    selectSearch: function(item) {
      this.selectItem(item);
    }
  },

  components: {
    TreeItem,
    Search
  }
}
</script>

<style>
blockquote {
	border-left: 0.5em solid #DDD;
}
blockquote {
  font-size: 80%;
  font-family: monospace;
	padding: .75em .5em .75em 1em;
	background: #fff;
}
blockquote {
	-webkit-box-shadow: 0 0 6px rgba(0,0,0,0.5);
	-moz-box-shadow: 0 0 6px rgba(0,0,0,0.5);
	box-shadow: 0 0 6px rgba(0,0,0,0.5);
}

</style>

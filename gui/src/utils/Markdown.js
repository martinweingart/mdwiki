import * as marked from 'marked';

let renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  return `<h${level} class="title is-${level + 1}">${text}</h${level}>`;
};

renderer.table = function (header, body) {
  return `<table class="table table-bordered">${header}${body}</table>`;
};

export function parse(text) {
  return marked(text, {
    renderer: renderer,
    breaks: true
  });
}

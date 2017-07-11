import * as marked from 'marked';

let renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  return `<br><h${level} class="title is-${level + 1}">${text}</h${level}>`;
};

renderer.table = function (header, body) {
  return `<table class="table table-bordered"><thead>${header}</thead></tbody>${body}</tbody></table>`;
};

renderer.blockquote = function (text) {
  return `<blockquote>${text}</blockquote>`
};

renderer.list = function (body, ordered) {
  return `<ul style="list-style: initial; list-style-type: ${ordered ? 'decimal' : 'circle'}">${body}</ul>`;
};


export function parse(text) {
  return marked(text, {
    renderer: renderer,
    breaks: true
  });
}

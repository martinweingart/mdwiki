import * as marked from 'marked';

let renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  return `<h${level} style="margin-top:30px" class="title is-${level + 1}">${text}</h${level}>`;
};

renderer.table = function (header, body) {
  return `<table class="table table-bordered"><thead>${header}</thead></tbody>${body}</tbody></table>`;
};

renderer.blockquote = function (text) {
  return `<blockquote>${text}</blockquote>`
};

renderer.list = function (body, ordered) {
  return `<div style="margin:20px"><ul style="list-style: initial; list-style-type: ${ordered ? 'decimal' : 'circle'}">${body}</ul></div>`;
};

renderer.paragraph = function (text) {
  return `<p style="margin-top:20px">${text}</p>`;
};


export function parse(text) {
  return marked(text, {
    renderer: renderer,
    breaks: true
  });
}

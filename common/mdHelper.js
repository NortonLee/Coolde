var MarkdownIt = require('markdown-it');
var jsxss = require('xss');
var validator = require('validator');

var md = new MarkdownIt();

md.set({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  linkify:      false,        // Autoconvert URL-like text to links
  typographer:  true,        // Enable smartypants and other sweet transforms
});

md.renderer.rules.fence = function (tokens, idx) {
  var token = tokens[idx];

  var language = token.params && ('language-' + token.params) || '';
  language = validator.escape(language);

  return '<pre class="prettyprint ' + language + '">'+ '<code>' + validator.escape(token.content) + '</code>' + '</pre>';
};

md.renderer.rules.code_block = function (tokens, idx /*, options*/) {
  var token = tokens[idx];
  var language = token.params && ('language-' + token.params) || '';
  language = validator.escape(language);
  return '<pre class="prettyprint ' + language + '">' + '<code>' + validator.escape(token.content) + '</code>' + '</pre>';
};

md.renderer.rules.code_inline = function (tokens, idx /*, options*/) {
  return '<code>' + validator.escape(tokens[idx].content) + '</code>';
};

var myxss = new jsxss.FilterXSS({
  onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
    // 让 prettyprint 可以工作
    if (tag === 'pre' && name === 'class') {
      return name + '="' + jsxss.escapeAttrValue(value) + '"';
    }
  }
});

exports.markdown = function (text) {
    if(text.indexOf('embed') !== -1 || text.indexOf('iframe') !== -1){
        return '<p>' + text + '</p>';
    }else if(text.indexOf('nortonscript') != -1){
        return text;
    }else{
        return '<div class="markdown-text">' + myxss.process(md.render(text || '')) + '</div>';
    }
};
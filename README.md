# block-nested
[travis-ci](https://travis-ci.org/switer/block-nested.svg)
Block nested template syntax.

# Usage
```js
var Parser = require('block-nested')({
	/\{%[\s\S]+?%\}/g, // tags match RegExp
	// first match self-close tag
	// this judge condition is base on the condition of operator match
	function isSelfCloseTag (c) {
		return /\{%[\s\S]+?\/%\}/.test(c)
	},
	// secondary match block-open tag
	// this judge condition is base on the condition of operator match
	function isOpenTag (c) {
		return !/\{%\/[\s\S]+?%\}/.test(c)
	},
	function handler(ast) {
		switch (ast.type) {
			case 'close':
				// Do something with selft-close tag
				// ast.tag ...
			case 'block':
				// Do something with block-tag
				// ast.open, ast.close, ast.tag ...
		}
	}
})
```
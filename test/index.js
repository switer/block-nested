'use strict';

var parser = require('../index')
var SELF_CLOSE_REG = /\{%[\s\S]+?\/%\}/
var CLOSE_REG = /\{%\/[\s\S]+?%\}/

var result = parser(
	'{% if %} {% abc /%} {%/ if %}',
	/\{%[\s\S]+?%\}/g,
	// first match self-close tag
	// this judge condition is base on the condition of operator match
	function isSelfCloseTag (c) {
		return SELF_CLOSE_REG.test(c)
	},
	// secondary match block-open tag
	// this judge condition is base on the condition of operator match
	function isOpenTag (c) {
		return !CLOSE_REG.test(c)
	},
	function handler(ast) {
		switch (ast.type) {
			case 'close':
				return '<component />'
			case 'block':
				return '<component-block>'+ ast.content + '</component-block>'
		}
	}
)
console.log(result)
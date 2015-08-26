'use strict';

var assert = require("assert")
var SELF_CLOSE_REG = /\{%[\s\S]+?\/%\}/
var CLOSE_REG = /\{%\/[\s\S]+?%\}/
var parser = require('../index')(
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

describe('#self-close tag', function () {
	var specs = [{
		i: '{%abc/%}',
		o: '<component />'
	}, {
		i: 'a{%b/%}c',
		o: 'a<component />c'
	}, {
		i: '{%a/%}{% b /%}{%c/%}',
		o: '<component /><component /><component />'
	}]
	specs.forEach(function (spec) {
		it('"%s" => "%s"'.replace('%s', spec.i).replace('%s', spec.o), function () {
			var result = parser(spec.i)
			assert.equal(result, spec.o)
		})
	})
})

'use strict';

/**
 * Get top item of the stack
 * @param  {Array} stack  stack
 */
function _stackTop (stack) {
	return stack[stack.length - 1]
}
/**
 * join arr2's items to arr
 * @param  {Array} arr1  odd number index items
 * @param  {Array} arr2  even number index items
 * @return {Array}       new array with join result
 */
function _join(arr1, arr2) {
	var len = arr1.length > arr2 ? arr1.length : arr2.length
	var joinedArr = []
	while(len --) {
		joinedArr.push(arr1.shift())
		joinedArr.push(arr2.shift())
	}
	// merge remains
	return joinedArr.concat(arr1).concat(arr2)
}
/**
 * handle block template syntax
 * @param  {String}  text        Template string
 * @param  {RegExp}  operatorReg Tag match regexp
 * @param  {Function} isOpen     Function return true if the part is a open tag
 * @param  {Function}  handler   Block content handler
 * @return {string}              Parsed content
 */
module.exports = function (operatorReg, isSelfCloseTag, isOpen, handler) {
	function _isOperator (token) {
		return !!(token && token.match(operatorReg))
	}
	return function (text) {
		var tokens = _join(text.split(operatorReg), text.match(operatorReg))
		var stack = []
		function process(c) {
			if (_isOperator(c)) {
				if (isSelfCloseTag(c)) {
					c = handler({
						type: 'close',
						tag: c
					})
				} else if (isOpen(c)) {
					stack.push(c)
					return
				} else {
					// pop conent
					var v = stack.pop()
					// pop open tag
					var o = stack.pop()
					// only open tag push to stack
					if (!_isOperator(o)) throw new Error('Unmatch token "' + c + '"')
					// handler content
					c = handler({
						type: 'block',
						open: o,
						content: v, 
						close: c
					})
				}
			}
			var topItem = _stackTop(stack)
			if ( _isOperator(topItem) && isOpen(topItem)) {
				stack.push(c)
			} else {
				// merge result
				stack.push((stack.pop() || '') + '' + c)
			}
		}
		tokens.forEach(process)
		return stack.join('')
	}
}

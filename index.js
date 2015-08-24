var text = "{a{1}b}"
var tag = /\{|\}/g

function handler(openTag, content, closeTag) {
	console.log(openTag, content, closeTag)
	return content
}

function isTag (c) {
	return isOpenTag(c) || isCloseTag(c)
}
function isOpenTag (c) {
	return c == '{'
}
function isCloseTag (c) {
	return c == '}'
}
function isEmpty (stack) {
	return !stack.length
}
function stackTop (stack) {
	return stack[stack.length - 1]
}

function join(arr1, arr2) {
	var len = arr1.length > arr2 ? arr1.length : arr2.length
	var joinedArr = []
	while(len --) {
		joinedArr.push(arr1.shift())
		joinedArr.push(arr2.shift())
	}
	// merge remains
	return joinedArr.concat(arr1).concat(arr2)
}

var stack = []
function calc(c) {
	if (isTag(c)) {
		if (isOpenTag(c)) {
			stack.push(c)
			return
		} else {
			// pop open tag
			var v = stack.pop()
			var o = stack.pop()
			if (!isOpenTag(o)) throw new Error('Unmatch token "' + c + '"')
			// passing result to word flow
			c = '' + handler(o, v, c)
		}
	}
	if (isOpenTag(stackTop(stack))) {
		stack.push(c)
	} else {
		// merge result
		stack.push((stack.pop() || '' ) + '' + c)
	}
}
var tokens = join(text.split(tag), text.match(tag))
tokens.forEach(calc)

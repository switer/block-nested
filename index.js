var text = "{a{1}a}"
var tag = /\{|\}/g

function handler(openTag, content, closeTag) {
	return content
}

function isTag (c) {
	return isOpenTag(c) || isCloseTag()
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
	return joinedArr.concat(arr1, text.match(tag))
}

var searches = join(text.split(tag), tokens)
var wstacks = []
var tstacks = []

for (var i=0; i<searches.length; i++) {
	var c = searches[i]
	if (isTag(c)) {
		if (isOpenTag(c)) {
			tstacks.push(c)
		} else {
			// handle close tag

			// pop open tag
			var oc = tstacks.pop()

			if (!oc) return throw new Error('Unmatch token', c)

			var w = wstacks.pop() || ''
			// left value
			var lw = wstacks.pop() || ''
			wstacks.push((lw + handler(c, w, oc)) + '')
		}
	} else {
		wstacks.push(c)
		tstacks.push('+')
	}
}
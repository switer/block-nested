var text = "{a{1}a}"
var tag = /\{|\}/g
function isOpenTag (c) {
	return c == '{'
}

var words = text.split(tag)
var tokens = text.match(tag)

var wstacks = []
var tstacks = []

while (tokens.length) {
	var t = tokens.pop()
	if (isOpenTag(t)) {
		tstacks.push(t)
	} else {
		var w = words.pop()
		
	}
}
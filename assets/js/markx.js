var LINE_ENDING = '\r',
LINE_ENDING_SPLITER = /\r\n|\r|\n/

var V ="\t";
var TABREG = new RegExp('^('+ String.fromCharCode(32) +'|'+ String.fromCharCode(160) +'){4}')
    function getLevel(line) {
        var level = 0;
        while (TABREG.test(line)) {
            line = line.replace(TABREG, '');
            level++;
        }

        return level;
    }


var t = $("pre > code").each(
	function(index){
		var e = $(this)
		var p = e.parent()
		u = e.text()
		var text = e.text()


		// .replace(/\s{2}/g, "+")

		console.log(text)

		// var tn = (text.match(/p/g) || []).length
		// var tn2 = (text.match(/pp/g) || []).length
		// tn && (tn == tn2 * 2) && (text = text.replace(/pp/g, "+") )
		// console.log( text)
		var t = text.split(LINE_ENDING_SPLITER)
		t[0] || t.shift()
		t.pop()

		var r = "";

		for(var i =0; i< t.length; i++){
			// console.log(t[i])
      if(i){r+='<br/>'}
			var ti = t[i]
			var level = getLevel(ti)
			var si = ti.trim()
			ti = ti.replace(/\s/g, '&nbsp')
			r+='<span class="x'+level%6+'">'+ti+'</span>'
		}
		p.replaceWith('<blockquote><p class="markx">'+r+'</p></blockquote>')
		console.log( r)
		// console.log(this)
	}
	)

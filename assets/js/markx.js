(function() {
    var LINE_ENDING = '\r',
        LINE_ENDING_SPLITER = /\r\n|\r|\n/

    var V = "\t";
    var TABREG = new RegExp('^(' + String.fromCharCode(32) + '|' + String.fromCharCode(160) + '){4}')

    function getLevel(line) {
        var level = 0;
        while (TABREG.test(line)) {
            line = line.replace(TABREG, '');
            level++;
        }

        return level;
    }

    $("pre > code").each(
        function(index) {
            var e = $(this)
            var p = e.parent()
            u = e.text()
            var text = e.text()
            text = (text || '')
                .replace(/\{/g, '<b class="x-p x-p-l">｛ </b>')
                .replace(/\}/g, '<b class="x-p x-p-r">｝</b>')
                .replace(/([\|\[\]\(\)])/g,
                    function(x) {
                        x = String.fromCharCode(x.charCodeAt(0) + 65248);
                        return '<a class="x-ps">' + x + '</a>'
                    }

                )

            var t = text.split(LINE_ENDING_SPLITER)
            t[0] || t.shift()
            t.pop()

            var r = "",
                level = 0;

            for (var i = 0; i < t.length; i++) {
                // console.log(t[i])
                var ti = (t[i]||'').replace(/(\s*$)/g, ''),
                    si = ti.trim(),
                    left_length = (ti || '').length - (si || '').length
                if (si.match(/^[\`\,\-]/)) {
                  si = si.replace(/^[\`\,]+/, '')
                } else {
                  level = getLevel(ti)
                }
                r += '<span class="x x' + level % 5 + '" style="margin-left:' + left_length / 2 + 'em">' + si + '</span>'

                // var space = ''
                // for (var s = 0; s < left_length; s++) {
                //   space += '&nbsp'
                // }
                // if(i){r+='<br/>'}
                // r+='<span><span class="x">'+space+'</span><span class="x x'+level%5+'">'+si+'</span></span>'

            }
            p.replaceWith('<blockquote class="markx" oncopy="return false"><p>' + r + '</p></blockquote>')
                // console.log( r)
                // console.log(this)
        }
    )

})()

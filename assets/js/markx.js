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

    $('.remark-code-line').replaceWith(function() {
        return $(this).text + '/n'
    })

    $.ajaxSetup({
        cache: true
    });

    function initKm(p) {
        var target = p
        var minder = new kityminder.Minder();
        var protocol = 'text';
        var data = target.textContent;
        target.textContent = null;
        minder.renderTo(target);
        minder.importData(protocol, data);
        minder.disable();
        setTimeout(
                function() {
                    minder.useTemplate('right')
                    minder.setTheme('snow-compact');
                    minder.select(minder.getRoot(), true);
                    minder.execCommand('hand');
                    minder.execCommand('Move', 'right')
                    minder.refresh()
                }, 500) //in
    }

    function loadKm() {
        $.getScript('/assets/js/kity.min.js').done(function() {
            $.getScript('/assets/js/kityminder.core.min.js').done(function() {
                setTimeout(function() {
                  [].forEach.call(document.querySelectorAll(".language-km"),
                  function(target){initKm(target)})
                    }, 1) //22
            })
        })
    }

    var hasKm = false

    $("pre > code").each(

        function(index) {
            var e = $(this)
            var p = e.parent()
            if (e.hasClass('language-km')) {
                p.addClass('language-km')
                p.text(e.text())
                p.css('height',(p.height()/1.8 + 100)+'px')
                hasKm = true
                return
            }

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
                var ti = (t[i] || '').replace(/(\s*$)/g, ''),
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
        })

if(hasKm){
  loadKm()
}
})()

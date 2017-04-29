(function() {
    var LINE_ENDING = '\r',
        LINE_ENDING_SPLITER = /\r\n|\r|\n/

    var V = "\t";
    var TABREG = new RegExp('^(' + String.fromCharCode(32) + '|' + String.fromCharCode(160) + '){2}')

    $.ajaxSetup({
            cache: true
        })
        // marked.setOptions({})

    function getXLevel(line) {
        var level = 0;
        while (TABREG.test(line)) {
            line = line.replace(TABREG, '');
            level++;
        }

        return level;
    }

    $('.remark-code-line').replaceWith(function() {
        // console.log($(this).text())
        return $(this).text() + '\r'
    })


    window.hasKm = false
    window.hasChart = false

    $("pre > code").each(

        function(index) {
            var e = $(this)
            var p = e.parent()
            if (e.hasClass('language-km') || e.hasClass('language-mm') || e.hasClass('mm')) {
                p.addClass('language-km')
                p.text(e.text())
                hasKm = true
                return
            }

            if (e.hasClass('language-chart')||e.hasClass('language-mermaid')) {
                p.addClass('mermaid')
                p.text(e.text())
                hasChart = true
                return
            }

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
                level = 0,
                level0= 0;


            for (var i = 0; i < t.length; i++) {
                // console.log(t[i])
                var ti = (t[i] || '').replace(/(\s*$)/g, ''),
                    si = ti.trim(),
                    left_length = (ti || '').length - (si || '').length,
                    li = getXLevel(ti)
                if (si.match(/^[\`\,\~\-]/)) {
                    si = si.replace(/^[\`\,\~]+/, '')
                } else {
                    if((level0-li)%2==0){
                      level= li
                    }

                }
                level0 = li
                // si = $(marked(si)).html() || '<br/>'
                si = si || '<br/>'
                r += '<span class="x x' + (Math.floor(level/2 )%5) + '" style="margin-left:' + left_length / 2 + 'em">' + si + '</span>'

                // var space = ''
                // for (var s = 0; s < left_length; s++) {
                //   space += '&nbsp'
                // }
                // if(i){r+='<br/>'}
                // r+='<span><span class="x">'+space+'</span><span class="x x'+level%5+'">'+si+'</span></span>'

            }
            p.replaceWith('<blockquote class="markx" oncopy="return false"><p>' + r + '</p></blockquote>')
                // console.log(this)
        })

    hasKm && loadKm();
    hasChart = hasChart ||  $('.mermaid').length

    hasChart && loadMermaid();

    function decodeWrap(text) {
        if (!text) {
            return '';
        }
        var textArr = [],
            WRAP_TEXT = ['\\', '\\', 'n'];
        for (var i = 0, j = 0, l = text.length; i < l; i++) {
            if (text[i] === WRAP_TEXT[j]) {
                j++;
                if (j === 3) {
                    j = 0;
                    textArr.push('\\n');
                }
                continue;
            }
            switch (j) {
                case 0:
                    {
                        textArr.push(text[i]);
                        j = 0;
                        break;
                    }
                case 1:
                    {
                        if (text[i] === 'n') {
                            textArr.push('\n');
                        } else {
                            textArr.push(text[i - 1], text[i]);
                        }
                        j = 0;
                        break;
                    }
                case 2:
                    {
                        textArr.push(text[i - 2]);
                        if (text[i] !== '\\') {
                            j = 0;
                            textArr.push(text[i - 1], text[i]);
                        }
                        break;
                    }
            }
        }
        return textArr.join('');
    }

    function isEmpty(line) {
        return !/\S/.test(line);
    }


    function getLevel(line) {
        var TAB_CHAR2 = /^(\t|\x20{4})/;
        var level = 0;
        while (TAB_CHAR2.test(line)) {
            line = line.replace(TAB_CHAR2, '');
            level++;
        }

        return level;
    }

    function getNode(line) {
        return {
            data: {
                text: decodeWrap(line.replace(/^(\t|\x20{4})+/, ""))
            }
        };
    }

    function decodeText(local) {
        var json,
            parentMap = {},
            lines = local.split(LINE_ENDING_SPLITER),
            line, level, node;

        function addChild(parent, child) {
            var children = parent.children || (parent.children = []);
            children.push(child);
        }

        for (var i = 0; i < lines.length; i++) {
            line = lines[i];
            if (isEmpty(line)) continue;

            level = getLevel(line);
            node = getNode(line);

            if (level === 0) {
                if (json) {
                    throw new Error('Invalid local format');
                }
                json = node;
            } else {
                if (!parentMap[level - 1]) {
                    throw new Error('Invalid local format');
                }
                addChild(parentMap[level - 1], node);
            }
            parentMap[level] = node;
        }
        return json;
    }


    function initKm(target, height) {
        var $target = $(target),
            minder = new kityminder.Minder({
                enableKeyReceiver: false,
                enableAnimation: false
            }),
            protocol = 'json',
            data = $target.data('text') || target.textContent,
            json = decodeText(data);
        json.template = 'right'
        json.theme = 'classic-compact'
            // console.log(json)

        height = height || ($target.height())
            // console.log(height)
        $target.css('height', height + 'px')
        $target.empty()
        minder.renderTo(target);
        // minder.setTheme('classic-compact');
        minder.importData(protocol, JSON.stringify(json));
        minder.disable();
        $target.data({
            km: minder,
            text: data,
            init: function() {
                initKm(target)
            }
        })
        minder.select(minder.getRoot(), true);
        minder.execCommand('hand');
        minder.execCommand('Move', 'right')
        minder.refresh()

    }

    window.initKm = initKm

    function loadKm() {
        $.getScript('/assets/js/kity.min.js').done(function() {
            $.getScript('/assets/js/kityminder.core.min.js').done(function() {
                setTimeout(function() {
                        // if(window.isSlide) {return}
                        [].forEach.call(document.querySelectorAll(".language-km"),
                            function(target) {
                                initKm(target)
                            })
                    }, 100) //22
            })
        })
    }

    function loadMermaid() {
      if(window.mermaid) {return}
      $.getScript('/assets/js/mermaid.min.js').done(function() {
          setTimeout(function(){
          mermaid.initialize({startOnLoad:false})
          mermaid.init(undefined,$('.mermaid'))}, 10)
        })
    }

})()

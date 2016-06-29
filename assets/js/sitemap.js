---
layout: nil
permalink:
---

window._posts = [
{% for post in site.posts %}['{{ post.title }}','{{ post.url }}','{{post.tags|join : ","}}','{{post.categories|join : ","}}', '{{post.content|size}}'],{% endfor %}
]

TITLE =0, URL =1, TAGS=2, CATS=3; SIZE=4

window._sitemap0 ={}
for (pi in _posts){
  var post = _posts[pi]
  _sitemap0[post[TITLE]]=post[URL]
}

function text_clear(text){
  return (text||'').replace(/[\[\]\-\+\_\'\"\<\>\s]/g,'')
}
function get_sitemap(){
  if(!window._sitemap){
    window._sitemap = {}
    for (var key in _sitemap0){
      window._sitemap[text_clear(key)] = _sitemap0[key]
    }
  }
  return window._sitemap
}


$("p code").each(
	function(index){
    var sitemap = get_sitemap()
		var title = $(this).text()
    var ct = text_clear(title)
    var url = sitemap[ct]
    if(!url){
      for (var key in sitemap){
        if(key.indexOf(ct)>=0){
        url = sitemap[key]
        break
      }
      }
    }
    if(url){
		$(this).replaceWith('<a href="'+url+'">'+title+'</a>')
  }
		// console.log( title)
	}
)

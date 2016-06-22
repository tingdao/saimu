---
layout: nil
permalink:
---

window.__sitemap = {
{% for post in site.posts %}'{{ post.title }}':'{{ post.url }}',{% endfor %}
}

function text_clear(text){
  return (text||'').replace(/[\[\]\-\+\_\'\"\<\>\s]/g,'')
}
function get_sitemap(){
  if(!window.sitemap){
    for (var key in _sitemap){
      window.sitemap = {}
      window.sitemap[text_clear(key)] = _sitemap[key]
    }
  }
  return window.sitemap
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
		console.log( title)
	}
)

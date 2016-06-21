---
layout: nil
permalink:
---

window._sitemap = {
{% for post in site.posts %}'{{ post.title }}':'{{ post.url }}',{% endfor %}
}

function text_clear(text){
  return (text||'').replace(/[\[\]\-\+\_\'\"\<\>\s]/g,'')
}
window.sitemap = {}
for (var key in _sitemap){
  sitemap[text_clear(key)] = _sitemap[key]
}

$("p code").each(
	function(index){
		var title = $(this).text()
    var url = sitemap[text_clear(title)]
    if(url){
		$(this).replaceWith('<a src="'+url+'">'+title+'</a>')
  }
		console.log( title)
	}
)

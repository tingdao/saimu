---
layout: nil
permalink:
---

window.td_sitemap = {
{% for post in site.posts %}{{ post.title }}:'{{ post.url }}',{% endfor %}
}
$("p code").each(
	function(index){
		var title = $(this).text()
    var url = td_sitemap[title]
    if(url){
		$(this).replaceWith('<a src="'+url+'">'+title+'</a>')
  }
		console.log( title)
	}
)

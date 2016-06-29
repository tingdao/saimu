// window._posts = [
// {% for post in site.posts %}[{{ post.title }},{{ post.url }},{{post.tags}},{{post.categories}}],{% endfor %}
// ]
//
// TITLE =0, URL =1, TAGS=2, CATS=3;
var cats = {}, tags = {}, posts = _posts;
window.arch={cats:cats,tags:tags,posts:posts}
console.log(arch)
for(i in posts){
  var post = arch.posts[i]
  var tg = post[TAGS] = post[TAGS].split(',')
  var ct = post[CATS] = post[CATS].split(',')
  for(j in tg){
    var t = tg[j]
    tags[t] || (tags[t] =[])
    tags[t].push(post)
  }
  for(j in ct){var t = ct[j]
    cats[t] || (cats[t] =[])
    cats[t].push(post)
  }

}

var hash = window.location.hash.replace(/#/g,'') || '圣经'
// for(var i in arch.cats){
var cat = arch.cats[hash] || arch.tags[hash]
fresh_list(cat)()

$('.category.list').each(cats_menu('cats'))
$('.tag.list').each(cats_menu('tags'))

function cats_menu(cat_type){
  return function(index){
  var _this = $(this).empty()
  var post_list = arch[cat_type]
    for(var ct in post_list){
      // var cat_i = post_list[ct]
      var li = $('<li><a href="#'+ct+'">'+ct+' <span>'+post_list[ct].length+'</span></a></li>').click(fresh_list(post_list[ct], ct))
      _this.append(li)
    }
  }
}


function fresh_list(cat, title){
  return function(){
  // console.log(cat[0][0])

  title && $('.cat-title').text(title)

  $('.post-list').each(function(index){
    // console.log(index)
    var ul = $('<ul></ul>')
    for(var j in cat){
      var post = cat[j]
      ul.append('<li><a href="'+post[URL]+'">'+post[TITLE]+'</a></li>')
    }
    $(this).empty().append(ul)
    // }

  })

}
}

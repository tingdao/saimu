// window._posts = [
// {% for post in site.posts %}[{{ post.title }},{{ post.url }},{{post.tags}},{{post.categories}}],{% endfor %}
// ]
//
// TITLE =0, URL =1, TAGS=2, CATS=3;
var cats = {}, tags = {}, posts = _posts;
window.arch={cats:cats,tags:tags,posts:posts}
// console.log(arch)
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

hash_fresh(window.location.hash)

function hash_fresh(hash){
  hash = decodeURI((hash||'').replace(/#/g,''))
console.log(hash)
if(hash){
    var cat = arch.cats[hash] || arch.tags[hash] || arch.cats['圣经']
    fresh_list(cat, hash)()
  }
}

$('.meta .list a').click(function(){
  console.log('111')
hash_fresh( $(this)[0].hash )
})


// .each(function(){
//   var _this = $(this)
//   _this.click(function(){}
//
//   })
// })

$('.category-nav').each(cats_menu('cats'))
$('.tag-nav').each(cats_menu('tags'))

function cats_menu(cat_type){
  return function(index){
  var _this = $(this).empty()
  var _cats = arch[cat_type]
    for(var ct in _cats){
      if(!ct || ct.match(/[\:\,]/g)){continue}
      // var cat_i = _cats[ct]
      var li = $('<li><a href="#">'+ct+' <span>'+_cats[ct].length+'</span></a></li>').click(fresh_list(_cats[ct], ct))
      _this.append(li)
    }
  }
}


function fresh_list(cat, title){
  return function(){
  // console.log(cat[0][0])

    if(title){
      $('.nav-cat-title').text(title).attr('id', title)
    }
    $('.nav-post-list').each(function(index){
      // console.log(index)
      var ul = $('<ul></ul>')
      for(var j in cat){
        var post = cat[j]
        ul.append('<li><a href="'+post[URL]+'">'+post[TITLE]+'</a></li>')
      }
      $(this).empty().append(ul)
    })
  }
}

$.ajaxSetup({
        cache: true
    })
if( location.hostname.indexOf('tingdao') && location.pathname.indexOf('post') ){

$.getScript("//hm.baidu.com/hm.js?2251d711953631d85fd5bf3842dbf72a")

window.clicky_site_ids = window.clicky_site_ids || [];
clicky_site_ids.push(100967986);
$.getScript('//static.getclicky.com/js')

}

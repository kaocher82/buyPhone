!function(){for(var t,n=function(){},e=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],a=e.length,i=window.console=window.console||{};a--;)t=e[a],i[t]||(i[t]=n)}(),document.addEventListener("DOMContentLoaded",function(){var t=function(){var t=1,n=[],e=function(t){for(i=0;i<t.length;i++){var e={id:t[i].id,name:t[i].name.toLowerCase()};n.push(e)}};return{getData:function(n){$.ajax({type:"POST",url:"productsHandler.php",data:{setPage:t,setPageSize:3},dataType:"json",cache:!1,success:function(a){t++,e(a),$.isFunction(n)&&n(a)},error:function(t){console.log("Error"),console.log(t)}})},getPhonesData:function(){return n}}}(),n=function(){var n={contentPhones:".content--phones",mainButtonContent:".main-button--content",searchBtn:".searchBtn",searchInput:".searchInput",searchInputOn:".searchInputOn",navbarRight:".navbar-right"};return{getDOMstrings:function(){return n},printPhone:function(t){for(i=0;i<t.length;i++){var e='<div data-id="%id%" class="phone-box"><p class="phone-box--name">%name%</p><img class="phoneImg" src="img/telefon.png" alt="telefon"><p class="phone-box--price">%price% PLN</p><div class="phone-box-more"><div class="phone-box-more--text"><p>Ekran %ekran%</p><p>Aparat %aparat%</p><p>Bateria %bateria%</p><p>%ram%</p></div><div class="phone-box-more--buttons"><button class="main-button main-button__black"><img class="svg cart" src="img/icon cart.svg" alt="card" ></button><button class="main-button main-button__white">PORÓWNAJ</button></div></div></div>',a=e.replace("%name%",t[i].name),a=a.replace("%id%",t[i].id),a=a.replace("telefon.png",t[i].image),a=a.replace("%price%",t[i].price.value),a=a.replace("PLN",t[i].price.currency),a=a.replace("%ekran%",t[i].information.display),a=a.replace("%aparat%",t[i].information.camera),a=a.replace("%bateria%",t[i].information.battery),a=a.replace("%ram%",t[i].information.memory);$(n.contentPhones).append(a)}},searchInputActive:function(){""==$(n.searchInput).val()&&($(n.searchInput).toggleClass("searchInputOn"),$(n.navbarRight+">li:not(:last)").toggleClass("opacityFlag"))},searchPhone:function(){var e=t.getPhonesData(),a=$(n.searchInput).val(),r=a.toLowerCase();for(i=0;i<e.length;i++){var o='*[data-id="'+e[i].id+'"]';e[i].name.indexOf(r)<0?0==$(o).hasClass("displayFlag")&&$(o).addClass("displayFlag"):1==$(o).hasClass("displayFlag")&&$(o).removeClass("displayFlag")}},changeSVG:function(){jQuery("img.svg").each(function(){console.log("abc");var t=jQuery(this),n=t.attr("id"),e=t.attr("class"),a=t.attr("src");jQuery.get(a,function(a){var i=jQuery(a).find("svg");void 0!==n&&(i=i.attr("id",n)),void 0!==e&&(i=i.attr("class",e+" replaced-svg")),i=i.removeAttr("xmlns:a"),!i.attr("viewBox")&&i.attr("height")&&i.attr("width")&&i.attr("viewBox","0 0 "+i.attr("height")+" "+i.attr("width")),t.replaceWith(i)},"xml")})}}}();(function(n,e){var a=e.getDOMstrings(),i=function(){$(a.mainButtonContent).click(function(){r()}),$(a.searchBtn).click(e.searchInputActive),$(a.searchInput).keyup(e.searchPhone)},r=function(){t.getData(function(t){e.printPhone(t),e.searchPhone(),e.changeSVG()})};return{init:function(){console.log("App has started"),i(),r()}}})(0,n).init()});
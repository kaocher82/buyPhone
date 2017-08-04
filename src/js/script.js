document.addEventListener("DOMContentLoaded", function () {

  // PAGE CONTROLLER
  var pageController = (function(){

    var pageFlag = 1;
    var pageSize = 3;

    var data = [];

    var getNameAndId = function(newData){
      for(i=0; i < newData.length; i++){
        var phoneData = {id: newData[i].id, name: newData[i].name.toLowerCase()};
        data.push(phoneData);
      }
    };

    // public methods
    return{
      getData: function (callback){

        $.ajax({
          type: "POST",
          url: "productsHandler.php",
          data: {'setPage': pageFlag, 'setPageSize': pageSize},
          dataType:'json',
          cache: false,

          success: function(data) {
            pageFlag++;
            getNameAndId(data);

            //function callback
            if($.isFunction(callback)) {callback(data);};
          },
          error: function(err) {
            console.log( "Error");
            console.log(err);
          }
        });
      },

      getPhonesData: function(){
        return data;
      },

    // end of public methods
    }
  })();
  // END PAGE CONTROLLER


  // UI CONTROLLER
  var UIController = (function(){

    var DOMstrings = {
      contentPhones: ".content--phones",
      mainButtonContent: ".main-button--content",
      searchBtn: ".searchBtn",
      searchInput: ".searchInput",
      searchInputOn: ".searchInputOn",
      navbarRight: ".navbar-right",
    };

    // public methods
    return {
      getDOMstrings: function(){
        return DOMstrings;
      },

      printPhone: function (data){

        for (i=0; i < data.length; i++){
          var html = '<div data-id="%id%" class="phone-box"><p class="phone-box--name">%name%</p><img class="phoneImg" src="img/telefon.png" alt="telefon"><p class="phone-box--price">%price% PLN</p><div class="phone-box-more"><div class="phone-box-more--text"><p>Ekran %ekran%</p><p>Aparat %aparat%</p><p>Bateria %bateria%</p><p>%ram%</p></div><div class="phone-box-more--buttons"><button class="main-button main-button__black"><img class="svg cart" src="img/icon cart.svg" alt="card" ></button><button class="main-button main-button__white">PORÓWNAJ</button></div></div></div>';
          
          var newHtml = html.replace('%name%', data[i].name);
          var newHtml = newHtml.replace('%id%', data[i].id);
          var newHtml = newHtml.replace('telefon.png', data[i].image);
          var newHtml = newHtml.replace('%price%', data[i].price.value);
          var newHtml = newHtml.replace('PLN', data[i].price.currency);
          var newHtml = newHtml.replace('%ekran%', data[i].information.display);
          var newHtml = newHtml.replace('%aparat%', data[i].information.camera);
          var newHtml = newHtml.replace('%bateria%', data[i].information.battery);
          var newHtml = newHtml.replace('%ram%', data[i].information.memory);
          $(DOMstrings.contentPhones).append(newHtml);
        }

      },
      
      // search input active
      searchInputActive: function(){
        
        // check is input empty
        if ($(DOMstrings.searchInput).val() == "") {
          $(DOMstrings.searchInput).toggleClass('searchInputOn');
          $(DOMstrings.navbarRight + ">li:not(:last)").toggleClass("opacityFlag");
        }
      },
      // search phone from input
      searchPhone: function(){  
        var data = pageController.getPhonesData();
        var search = $(DOMstrings.searchInput).val();
        var searchLowerCase = search.toLowerCase();

        // search in data
        for (i=0; i< data.length; i++){
        
          // id phones
          var id = '*[data-id="'+ data[i].id+'"]';

          // check is searched phone is in data  
          if (data[i].name.indexOf(searchLowerCase) < 0 ){

            // hide phones
            if ($(id).hasClass("displayFlag") == false) {
               $(id).addClass("displayFlag");
            }

          } else {
            // remove hide phones
            if ($(id).hasClass("displayFlag") == true){
              $(id).removeClass("displayFlag");
            }
          }
        }
      },
      
      changeSVG: function(){
      
        //Replace all SVG images with inline SVG
 
        jQuery('img.svg').each(function(){
          console.log("abc")
          var $img = jQuery(this);
          var imgID = $img.attr('id');
          var imgClass = $img.attr('class');
          var imgURL = $img.attr('src');

          jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
              $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

          }, 'xml');

        });
      },

    // end of public methods
    }
  })();
  // END UI CONTROLLER


  // GLOBAL APP CONTROLLER
  var controller = (function(weatherController, UIController){
    
    // get DOMstrings
    var DOMstrings = UIController.getDOMstrings();

    // events listeners
    var setupEventListeners = function(){

      // button doładuj więcej produktów
      $(DOMstrings.mainButtonContent).click(function(){
        putPhones();
      });

      //search button
      $(DOMstrings.searchBtn).click(UIController.searchInputActive);

      //search input
      $(DOMstrings.searchInput).keyup(UIController.searchPhone);
    };

    var putPhones = function(){
      pageController.getData(function(data){
        UIController.printPhone(data);
        
        // search and press button "get more product" case
        UIController.searchPhone();
        
        //change svg (cart issue)
        UIController.changeSVG();
      })
    };

    return {
      init: function(){
        console.log("App has started");
          setupEventListeners();
          putPhones();
        }
    };

  })(pageController, UIController);
  // END GLOBAL APP CONTROLLER

  controller.init();

  // end DOMContentLoaded
});


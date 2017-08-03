document.addEventListener("DOMContentLoaded", function () {


  // PAGE CONTROLLER
  var pageController = (function(){

    var pageFlag = 1;
    var pageSize = 3;

    var data = [];

    var getNameAndId = function(newData){
      for(i=0; i < newData.length; i++){
        var phoneData = [newData[i].id, newData[i].name.toLowerCase()];
        data.push(phoneData);
      }
    }

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
          var html = '<div data-id="%id%" class="phone-box"><p class="phone-box--name">%name%</p><img src="img/telefon.png" alt="telefon"><p class="phone-box--price">%price% PLN</p><div class="phone-box-more"><div class="phone-box-more--text"><p>Ekran %ekran%</p><p>Aparat %aparat%</p><p>Bateria %bateria%</p><p>%ram%</p></div><div class="phone-box-more--buttons"><button class="main-button main-button__black"><img class="card" src="img/icon cart_white.svg" alt="card" ></button><button class="main-button main-button__white">PORÓWNAJ</button></div></div></div>'
          var newHtml = html.replace('%name%', data[i].name);
          var newHtml = newHtml.replace('%id%', data[i].id);
          var newHtml = newHtml.replace('telefon.png', data[i].image);
          var newHtml = newHtml.replace('%price%', data[i].price.value);
          var newHtml = newHtml.replace('PLN', data[i].price.currency);
          var newHtml = newHtml.replace('%ekran%', data[i].information.display);
          var newHtml = newHtml.replace('%aparat%', data[i].information.camera);
          var newHtml = newHtml.replace('%bateria%', data[i].information.battery);
          var newHtml = newHtml.replace('%ram%', data[i].information.memory);
          $(DOMstrings.contentPhones).append(newHtml)
        }

      }

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
      $(DOMstrings.searchBtn).click(searchActive)

      //search input
      $(DOMstrings.searchInput).keyup(function(){
              searchPhone()

      });

    };

    var putPhones = function(){
      pageController.getData(function(data){
        UIController.printPhone(data);
      })
    };

    var searchActive = function(){
      if ($(DOMstrings.searchInput).val() == "")
        {
          $(DOMstrings.searchInput).toggleClass('searchInputOn');
          $(DOMstrings.navbarRight + ">li:not(:last)").toggleClass("opacityFlag");
        }

    };

    var searchPhone = function(){
      var data = pageController.getPhonesData();
      var search = $(DOMstrings.searchInput).val();
      var serachLowerCase = search.toLowerCase();

      for (i=0; i< data.length; i++){
        if (data[i][1].indexOf(serachLowerCase) < 0 ){

          if ($('*[data-id="'+(i+1)+'"]').hasClass("displayFlag") == false){
            $('*[data-id="'+(i+1)+'"]').addClass("displayFlag");
          }

        } else {
          if ($('*[data-id="'+(i+1)+'"]').hasClass("displayFlag") == true){
            $('*[data-id="'+(i+1)+'"]').removeClass("displayFlag");
          }
        }
      }
    }


    return {
      init: function(){
        console.log("App has started");
          setupEventListeners();
          putPhones();
        }
    }


  })(pageController, UIController);
  // END GLOBAL APP CONTROLLER

  controller.init();



  // end DOMContentLoaded
});


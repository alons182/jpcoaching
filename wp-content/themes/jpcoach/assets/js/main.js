;(function($){

  var btnMenu = $('#btn-menu'),
      menu = $('.header__menu');
     
      new WOW().init();
      
       btnMenu.on('click', function(){
            menu.toggle();
           
        });
    $('.top__languages').hoverIntent({
      over: function() {
            $('.top__languages__container').slideDown(200 );
          },
      out:  function() {
            $('.top__languages__container').slideUp(200);
          },
      timeout: 200

       });
    /*menu.find(".parent").hoverIntent({
          over: function() {

                $(this).find(">.sub-menu").slideDown(200 );
              },
          out:  function() {
                
                $(this).find(">.sub-menu").slideUp(200);
              },
          timeout: 200

           });*/





     

    // SMOOTH ANCHOR SCROLLING
    var $root = $('html, body');
    $('a.anchor').click(function(e) {
        var href = $.attr(this, 'href');
        if (typeof($(href)) != 'undefined' && $(href).length > 0) {
            var anchor = '';

            if (href.indexOf("#") != -1) {
                anchor = href.substring(href.lastIndexOf("#"));
            }

            if (anchor.length > 0) {
                //console.log($(anchor).offset().top);
                //console.log(anchor);
                $root.animate({
                    scrollTop: $(anchor).offset().top - $('.header').height()
                }, 500, function() {
                    window.location.hash = anchor;
                });
                e.preventDefault();
            }
        }
    });


   // Forms with ajax process
    $('form[data-remote]').on('submit', function(e){
        var form =$(this);
        var method = form.find('input[name="_method"]').val() || 'POST';
        var url = form.prop('action');
        form.find('.loader').show();
        $.ajax({
            type: method,
            url: url,
            data: form.serialize(),
            success: function(){
                var message = form.data('remote-success-message');
                form.find('.loader').hide();
                if(message)
                {

                    $('.response').removeClass('message-error').addClass('message-success').html(message).fadeIn(300).delay(4500).fadeOut(300);
                }
            },
            error:function(){
                form.find('.loader').hide();
                $('.response').removeClass('message-success').addClass('message-error').html('Whoops, looks like something went wrong.').fadeIn(300).delay(4500).fadeOut(300);

            }
        });

        limpiaForm(form);

        e.preventDefault();
    });

    $('input[data-confirm], button[data-confirm]').on('click', function(e){
       var input = $(this);

        input.prop('disabled','disabled');

        if(! confirm(input.data('confirm'))){
            e.preventDefault();
        }
    });

    function limpiaForm(miForm) {

        // recorremos todos los campos que tiene el formulario
        $(":input", miForm).each(function() {
            var type = this.type;
            var tag = this.tagName.toLowerCase();
            //limpiamos los valores de los campos…
            if (type == 'text' || type == 'password'  || type == 'email' || tag == 'textarea')
                this.value = "";
            // excepto de los checkboxes y radios, le quitamos el checked
            // pero su valor no debe ser cambiado
            else if (type == 'checkbox' || type == 'radio')
                this.checked = false;
            // los selects le ponesmos el indice a -
            else if (tag == 'select')
                this.selectedIndex = -1;
        });
    }
      
      
      

    //$(".chosen-select").chosen();
    
    //SCROLL WINDOW FUNCTIONALITY

    $(window).scroll(function () {
          if ($(this).scrollTop() > 50) {
              $('.header').addClass("header--fixed");
              
          } else {
              $('.header').removeClass("header--fixed");
              
          }
          if ($(this).scrollTop() > 300) {
              
              $('.scroll-top').addClass("on");
          } else {
             
              $('.scroll-top').removeClass("on");
          }
      });

    

   /* $(window).load(function() {
     
     
      resizes();

    });

    $(window).resize(resizes);

    function resizes()
     {
      
      
        if(getWindowWidth() > 900){
         
        
          $('.intro__banner').height($(".intro__featured").height());
          //$('.intro__banner__slide img').height($(".intro__featured").height());
        
        
        }else{
          $('.intro__banner').height('auto');
        } 
          
      

     }*/






})(jQuery);


function getScrollerWidth() {
  var scr = null;
  var inn = null;
  var wNoScroll = 0;
  var wScroll = 0;

  // Outer scrolling div
  scr = document.createElement('div');
  scr.style.position = 'absolute';
  scr.style.top = '-1000px';
  scr.style.left = '-1000px';
  scr.style.width = '100px';
  scr.style.height = '50px';
  // Start with no scrollbar
  scr.style.overflow = 'hidden';

  // Inner content div
  inn = document.createElement('div');
  inn.style.width = '100%';
  inn.style.height = '200px';

  // Put the inner div in the scrolling div
  scr.appendChild(inn);
  // Append the scrolling div to the doc
  document.body.appendChild(scr);

  // Width of the inner div sans scrollbar
  wNoScroll = inn.offsetWidth;
  // Add the scrollbar
  scr.style.overflow = 'auto';
  // Width of the inner div width scrollbar
  wScroll = inn.offsetWidth;

  // Remove the scrolling div from the doc
  document.body.removeChild(
    document.body.lastChild);

  // Pixel width of the scroller
  return (wNoScroll - wScroll);
}

function getWindowHeight() {
  var windowHeight=0;
  if (typeof(window.innerHeight)=='number') {
    windowHeight=window.innerHeight;
  } else {
    if (document.documentElement && document.documentElement.clientHeight) {
      windowHeight = document.documentElement.clientHeight;
    } else {
      if (document.body && document.body.clientHeight) {
        windowHeight=document.body.clientHeight;
      }
    }
  }
  return windowHeight;
}

function getWindowWidth() {
  var windowWidth=0;
  if (typeof(window.innerWidth)=='number') {
    windowWidth=window.innerWidth;
  } else {
    if (document.documentElement && document.documentElement.clientWidth) {
      windowWidth = document.documentElement.clientWidth;
    } else {
      if (document.body && document.body.clientWidth) {
        windowWidth=document.body.clientWidth;
      }
    }
  }
  return windowWidth;
}


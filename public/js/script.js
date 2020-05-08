$(document).ready(function(){
    //background Overlap 
    $(".dropdown").hover(function(){
        $(".chang").css({
            "position": "absolute",
            "height": $("body").height(),
            "width": "100%",
            "opacity": "0.3",
            "background": "rgba(0,0,0,.5)",
            "top": "0%",
            "left": "0%",
            "z-index":"2" ,
            "transition": "all 0.5s"
        });
    }
    , function(){
        $(".chang").css({
            "opacity" : "0" ,
            "width" : "0px",
            "height" : "0px" ,
            "transition": "all 0.01s"
        });
    }
    );
    //end of overlay Functions

    // size buttons on product page
    function rem(){
        $("#b1").removeClass("Highlight") ;
        $("#b2").removeClass("Highlight") ;
        $("#b3").removeClass("Highlight") ;
        $("#b4").removeClass("Highlight") ;
      }
    
      document.getElementById("b1").onclick = function() {
          rem() ;
          $("#b1").addClass("Highlight") ;
      };
      document.getElementById("b2").onclick = function() {
          rem() ;
          $("#b2").addClass("Highlight") ;
      };
      document.getElementById("b3").onclick = function() {
          rem() ;
          $("#b3").addClass("Highlight") ;
      };
      document.getElementById("b4").onclick = function() {
          rem() ;
          $("#b4").addClass("Highlight") ;
      };
    // end of size buttons on product page

//end of jQuery
});
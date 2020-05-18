$(document).ready(function(){
    //background Overlap 
    $(".dropdown , .dropdownPF").hover(function(){
        $(".chang").css({
            "position": "absolute",
            "margin-top" : "80px",
            "width": "100%",
            "height": $("body").height(),
            "opacity": "0.4",
            "background": "rgba(0,0,0,.6)",
            "top": "0%",
            "left": "0%",
            "z-index":"2" ,
            "transition": "all 0.7s"
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
      $("#add_to_bag").click(function(){
          let size = document.getElementsByClassName("Highlight")[0].value;
          // console.log("submit attempt " + size) ;
          document.getElementById("product_size").value = size ;
          $("#bag_form").submit() ;
      })
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
      document.getElementById("b5").onclick = function() {
          rem() ;
          $("#b5").addClass("Highlight") ;
      };

      
      // end of size buttons on product page
      //end of jQuery
});
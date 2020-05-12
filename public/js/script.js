$(document).ready(function(){
    //background Overlap 
    $(".dropdown").hover(function(){
        $(".chang").css({
            "position": "absolute",
            "margin-top" : "90px",
            "height": $("body").height(),
            "width": "100%",
            "opacity": "0.3",
            "background": "rgba(0,0,0,.6)",
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
          $("#product_size1").val("38") ;
          $("#product_size2").val("38") ;
      };
      document.getElementById("b2").onclick = function() {
          rem() ;
          $("#b2").addClass("Highlight") ;
          $("#product_size1").val("40") ;
          $("#product_size2").val("40") ;
      };
      document.getElementById("b3").onclick = function() {
          rem() ;
          $("#b3").addClass("Highlight") ;
          $("#product_size1").val("42") ;
          $("#product_size2").val("42") ;
      };
      document.getElementById("b4").onclick = function() {
          rem() ;
          $("#b4").addClass("Highlight") ;
          $("#product_size1").val("44") ;
          $("#product_size2").val("44") ;
      };
      $("#add_to_bag").click(function(){
        //   console.log("----> bag submitted") ;
          $("#bag_form").submit() ;
      })
      $("#add_to_wishlist").click(function(){
        // console.log("----> wishlist submitted") ;
          $("#wishlist_form").submit() ;
      })

      //form submit options 
    //   $("#add_to_bag").onclick( function() {
    //         $("#size_form").attr("action","/add_to")
    //   })
    //   document.getElementById("#add_to_bag").onClick = function(prodId) {
        
    //   }
    //   document.getElementById("#wishlist").onClick = function(prodId) {

    //   }
      // end of size buttons on product page
      //end of jQuery
});

    // function addToBag(prodId){
    //     console.log("--> here") ;
    //     $("#size_form").attr("action","/add-to-bag/" + prodId) ;
    //     document.getElementById("#size_form").submit() ;
    // }
    // function addToWishlsit(prodId){

    // }
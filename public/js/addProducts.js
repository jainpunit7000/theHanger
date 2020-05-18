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

    //add product form handling
    $('#c38').click(function(){
        if($(this).is(":checked")){
            console.log("added class") ;
            $("#c38q").prop("disabled",false) ;
        }
        else if($(this).is(":not(:checked)")){
            $("#c38q").prop("disabled",true) ;
            console.log("Checkbox is unchecked.");
        }
    });
    $('#c40').click(function(){
        if($(this).is(":checked")){
            console.log("added class") ;
            $("#c40q").prop("disabled",false) ;
        }
        else if($(this).is(":not(:checked)")){
            $("#c40q").prop("disabled",true) ;
            console.log("Checkbox is unchecked.");
        }
    });
    $('#c42').click(function(){
        if($(this).is(":checked")){
            console.log("added class") ;
            $("#c42q").prop("disabled",false) ;
        }
        else if($(this).is(":not(:checked)")){
            $("#c42q").prop("disabled",true) ;
            console.log("Checkbox is unchecked.");
        }
    });
    $('#c44').click(function(){
        if($(this).is(":checked")){
            console.log("added class") ;
            $("#c44q").prop("disabled",false) ;
        }
        else if($(this).is(":not(:checked)")){
            $("#c44q").prop("disabled",true) ;
            console.log("Checkbox is unchecked.");
        }
    });
    $("#men").click(function(){
        if( $(this).is(":checked") ){
            $(".m-men-fade").css("display","block");
            $(".m-women-fade").css("display","none");
            $(".m-kids-fade").css("display","none");
        }
    })
    $("#women").click(function(){
        if( $(this).is(":checked") ){
            console.log("women" ) ;
            $(".m-men-fade").css("display","none");
            $(".m-women-fade").css("display","block");
            $(".m-kids-fade").css("display","none");
        }
    })
    $("#kids").click(function(){
        if( $(this).is(":checked") ){
            $(".m-men-fade").css("display","none");
            $(".m-women-fade").css("display","none");
            $(".m-kids-fade").css("display","block");
        }
    })
    //end of add Product form handling 
    //sub-sub category
        //MEN
        $("#menstop").click(function(){
            if( $(this).is(":checked") ){
                $(".m-men-one-fade").css("display","block");
                $(".m-men-two-fade").css("display","none");
                $(".m-men-three-fade").css("display","none");
            }
        })
        $("#mensbottom").click(function(){
            if( $(this).is(":checked") ){
                $(".m-men-one-fade").css("display","none");
                $(".m-men-two-fade").css("display","block");
                $(".m-men-three-fade").css("display","none");
            }
        })
        $("#mensfoot").click(function(){
            if( $(this).is(":checked") ){
                $(".m-men-one-fade").css("display","none");
                $(".m-men-two-fade").css("display","none");
                $(".m-men-three-fade").css("display","block");
            }
        })

        //WOMEN
        $("#womenswestern").click(function(){
            if( $(this).is(":checked") ){
                $(".m-women-one-fade").css("display","block");
                $(".m-women-two-fade").css("display","none");
                $(".m-women-three-fade").css("display","none");
            }
        })
        $("#womensindian").click(function(){
            if( $(this).is(":checked") ){
                $(".m-women-one-fade").css("display","none");
                $(".m-women-two-fade").css("display","block");
                $(".m-women-three-fade").css("display","none");
            }
        })
        $("#womensfoot").click(function(){
            if( $(this).is(":checked") ){
                $(".m-women-one-fade").css("display","none");
                $(".m-women-two-fade").css("display","none");
                $(".m-women-three-fade").css("display","block");
            }
        })

        //KIDS
        $("#kidsbc").click(function(){
            if( $(this).is(":checked") ){
                $(".m-kids-one-fade").css("display","block");
                $(".m-kids-two-fade").css("display","none");
                $(".m-kids-three-fade").css("display","none");
                $(".m-kids-four-fade").css("display","none");
            }
        })
        $("#kidsbf").click(function(){
            if( $(this).is(":checked") ){
                $(".m-kids-one-fade").css("display","none");
                $(".m-kids-two-fade").css("display","block");
                $(".m-kids-three-fade").css("display","none");
                $(".m-kids-four-fade").css("display","none");
            }
        })
        $("#kidsgc").click(function(){
            if( $(this).is(":checked") ){
                $(".m-kids-one-fade").css("display","none");
                $(".m-kids-two-fade").css("display","none");
                $(".m-kids-three-fade").css("display","block");
                $(".m-kids-four-fade").css("display","none");
            }
        })
        $("#kidsgf").click(function(){
            if( $(this).is(":checked") ){
                $(".m-kids-one-fade").css("display","none");
                $(".m-kids-two-fade").css("display","none");
                $(".m-kids-three-fade").css("display","none");
                $(".m-kids-four-fade").css("display","block");
            }
        })
    //end of sub-sub category

//end of jQuery
});
   


    var currentTab = 0 ;
    showTab(currentTab);

    function showTab(n) {
        console.log("----> showTab " + n) ;
        var x = document.getElementsByClassName("m-tab");
        x[n].style.display = "block";
        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
        }
        else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        if (n == (x.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Submit";
        }
        else {
            document.getElementById("nextBtn").innerHTML = "Next";
        }
        fixStepIndicator(n)
    }
    
    function fixStepIndicator(n) {
        var i, x = document.getElementsByClassName("m-step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        console.log("making active") ;
        x[n].className += " active";
    }
    var nextPrev = function(n) {
        var x = document.getElementsByClassName("m-tab");
        if (currentTab+n >= x.length) {
            document.getElementById("adp").submit();
            return false;
        }
        x[currentTab].style.display = "none";
        document.getElementsByClassName("m-step")[currentTab].className += " finish";
        currentTab = currentTab + n;
        showTab(currentTab);
    }
    function validateForm() {
        // var x, y, i, valid = true;
        // x = document.getElementsByClassName("m-tab");
        // y = x[currentTab].getElementsByTagName("input");
        // for (i = 0; i < y.length; i++) {
        //     if (y[i].value == "") {
        //         y[i].className += " invalid";
        //         valid = false;
        //     }
        // }
        // if (valid) {
            console.log("curr tab " + currentTab) ;
            document.getElementsByClassName("m-step")[currentTab].className += " finish";
        // }
        // return valid;
    }
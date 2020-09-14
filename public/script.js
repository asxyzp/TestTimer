let time = 25;  //minutes
$(document).ready(function(){
    $(".time").html(`${time}`);
    $(".inc").click(function(){
        ++time;
        $(".time").html(`${time}`);   
    });
    $(".dec").click(function(){
        --time;
        $(".time").html(`${time}`);    
    });
    $(".start").click(function(){
        $(".inc").prop("disabled",true);
        $(".dec").prop("disabled",true);
        $(this).prop("disabled",true);
    });
});
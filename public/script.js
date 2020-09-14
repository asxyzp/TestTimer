let time = 25;  //minutes
$(document).ready(function(){

    $(".pause").prop("disabled",true);  //Pause button is disabled by default
    
    $(".time").html(`${time}`);         //Time div shows the default time

    //Increasing time
    $(".inc").click(function(){
        ++time;
        $(".time").html(`${time}`);   
    });
    
    //Increasing time
    $(".dec").click(function(){
        --time;
        $(".time").html(`${time}`);    
    });
    
    let timerStartTime;     //Stores time at which timer starts
    let totalTime;          //Stores total time for the timer
    let currentTime;        //Stores current time
    let blinkCount = 0;     //Counts how many times the counter blinks
    
    $(".start").click(function(){
        
        $(".pause").prop("disabled",false);     //Activates the pause button
        $(".inc").prop("disabled",true);        //Disables increase button
        $(".dec").prop("disabled",true);        //Disables decrease button
        $(this).prop("disabled",true);          //Disables start button

        timerStartTime = Date.now();
        totalTime = Number($(".time").html())*60000;
        

        let timer = window.setInterval(()=>{
            
            //Adding basic animation to make it appear the time text blink
            if(blinkCount%2==0){
                $(".time").css("transform","scale(0.9)");
                $(".min").css("transform","scale(0.9)");
                ++blinkCount;
            }
            else{
                $(".time").css("transform","scale(1)");
                $(".min").css("transform","scale(1)");
                ++blinkCount;
            }
            currentTime = Date.now();
            
        },1000);
    });
});
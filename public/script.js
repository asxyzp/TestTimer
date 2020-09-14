let time = 25;  //minutes
$(document).ready(function(){

    $(".restart").prop("disabled",true);  //Pause button is disabled by default
    $(".restart").click(function(){
        location.reload();
    });

    $(".time").html(`${time}`);         //Time div shows the default time

    //Increasing time
    $(".inc").click(function(){
        if(Number($(".time").html())<60){
            ++time;
            $(".time").html(`${time}`);
        }
           
    });
    
    //Decreasing time
    $(".dec").click(function(){
        if(Number($(".time").html())>0){
            --time;
            $(".time").html(`${time}`);
        }    
    });
    
    let timerStartTime;     //Stores time at which timer starts
    let totalTime;          //Stores total time for the timer
    let currentTime;        //Stores current time
    let timeElapsed;        //Stores the amount of time which has elapsed
    let timeElapsedPercent; //Stores time which has elapsed
    let minutesElapsed;     //Stores the number of minutes which have been elapsed


    $(".start").click(function(){
        
        //Changing properties of buttons
        $(".pause").prop("disabled",false);     //Activates the pause button
        $(".inc").prop("disabled",true);        //Disables increase button
        $(".dec").prop("disabled",true);        //Disables decrease button
        $(this).prop("disabled",true);          //Disables start button
        

        timerStartTime = Date.now();            //Records time at which timer has started
        totalTime = Number($(".time").html())*60000;    //Records total time for which timer should run 
        
        //Checks the elapsed time every 1s
        let timer = setInterval(()=>{
            currentTime = Date.now();
            timeElapsed = currentTime-timerStartTime;
            timeElapsedPercent = (timeElapsed/totalTime)*100;
            minutesElapsed = Number(Math.floor(timeElapsed/60000));
            
            console.log(minutesElapsed);
            $(".time").html(`${time-minutesElapsed}`);
            
            if(timeElapsed>totalTime){
                //Changing properties of buttons
                $(".restart").prop("disabled",false);     //Activates the pause button
                clearInterval(timer);
            }
            $(".timer-bg").css("height",`${timeElapsedPercent}vh`);
        },1000);
    });
});
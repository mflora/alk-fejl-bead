$(function(){
    var change = false
    var notForm = true

    $('.form-vertical').on('submit', function(event){
        notForm = false
    });

    $('.form-control').on('input', function(event){
        change = true
    });

    window.onbeforeunload = function(){
         if(change && notForm){
             return "Mentetlen módosítások!";
         }
         return
    }
});
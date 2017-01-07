$(function(){
    var $form=$('#finish');

    $('.modal .modal-ok').on('click', function(){
        $.ajax({
            url: '/ajax'+'/todoes/create',
            data: $form.serializeArray(),
            type: 'POST',
            dataType: 'html',
        }).done(function(resp){
            var data=JSON.parse(resp);
            $('.container').html(data.message);
            location.assign('/todoes/byme');
        })
        .fail(function(){
            alert('hiba!')
        });
    });

    $form.on('submit', function(event){
        $('.modal').modal('show');       
        
        event.preventDefault();
    });
});
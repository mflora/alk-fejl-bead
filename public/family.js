$(function(){
    var $loginDialog = $(`
        <div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="loginModal">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
            <div class="modal-body">
                <div class="alert alert-danger">A megadott adatok hibásak!</div>
                <div class="form-area"></div>
            </div>
            </div>
        </div>
        </div>`);

    var $loginAlert = $loginDialog.find('.alert');
    $loginAlert.hide();

    $loginDialog.find('.form-area').load('/family/create .create-form', function(){
        $loginForm=$loginDialog.find('.create-form');
        $loginForm.on('submit', function(e){
            e.preventDefault();

            $.ajax({
                url: '/ajax/family/create',
                data: $loginForm.serializeArray(),
                type: 'POST',
                dataType: 'json',
            }).done(function(resp){
                if(resp.success){
                    $loginDialog.modal('hide');
                    $('.navbar-collapse').load('/ .navbar-collapse');
                    top.location = "/family";
                }else{
                    console.log('...')
                    $loginDialog.modal('show');
                    $loginAlert.show();
                }
            })
            .fail(function(){
                console.log('...')
                $loginDialog.modal('show');
            });
        });
    });

    $loginDialog.on('hidden.bs.modal', function () {
        $loginDialog.modal('show');
    })

    $('document').ready(function() {
        $loginDialog.modal('show');
    });
})
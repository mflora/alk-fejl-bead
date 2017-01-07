$(function(){
    var label = $("<label>Szűrő</label>");
    var input = $("<input />");
    $("#inputCell").append(label);
    $("#inputCell").append(input);

    input.on('propertychange change click keyup input paste', function(){
        var filter = input.val();

        $("tr.item").each(function() {
            $this = $(this);

            var value = $this.find("td:first-child").html();

            if (value.indexOf(filter) === -1) {
                $this.hide();
            } else {
                $this.show();
            }
        });
    });
})
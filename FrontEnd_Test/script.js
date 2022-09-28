var deletedCust = [];

$(document).ready(function() {
    
    loadTable();

    $(document).on("click", ".viewcust-btn" , function() {
        $('#detailpage').removeClass('hide');
        $("#viewpage").addClass('hide');

        var id = $(this).data('id');
        var request = new XMLHttpRequest();
        request.open("GET", 'https://gorest.co.in/public/v1/users/'+id);
        request.onload = function() {
            if(request.status === 200) {
                customers = JSON.parse(request.responseText);
                //console.log(customers.data);
                $('#id_cust').val(customers.data.id);
                $('#fullname').text(customers.data.name);
                $('#accountid').text(getAccId(customers.data.name));
                $('#gender').text(customers.data.gender);
                $('#email').text(customers.data.email);
                $('#status').text(customers.data.status);
                $("#status").removeClass();
                customers.data.status == 'active'? $("#status").addClass("status-col-active"):$("#status").addClass("status-col-inactive");
                
            } else {
                alert("API Error");
            }
        };
        request.send(null);

        
    });

    $(document).on("click", ".return-btn" , function() {
        $("#viewpage").removeClass('hide');
        $('#detailpage').addClass('hide');
        loadTable();
    });

    $(document).on("click", ".delete-btn" , function() {
        var id = $('#id_cust').val();
        deletedCust.push(id);
        alert('Customer dengan ID: #'+id+' Berhasil Dihapus');
    });

    $(document).on("click", ".pagination > button" , function(el) {
        var page = $(this).data("page");
        var request = new XMLHttpRequest();
        request.open("GET", 'https://gorest.co.in/public/v1/users?page='+page);
        request.onload = function() {
            if(request.status === 200) {
                customers = JSON.parse(request.responseText);
                //console.log(customers.data);
                var added_row = '';
                $.each(customers.data,function(index, item){
                    //console.log(item);
                    var status = item.status == 'active' ? 'active':'inactive';
                    new_row = '<tr><td colspan="3">'
                    + '<div class="row-container">'
                    + '<span class="cust-col"><span>' + item.name + '</span><br><small>'+getAccId(item.name)+'</small></span>'
                    + '<span class="stat-col"><span class="point '+status+'"></span><span>' + item.status +  '</span></span>'
                    + '<span class="act-col"><button class="viewcust-btn" type="button" data-id="'+item.id+'">view cust</button></span>'
                    + '</div>'
                    + '</td></tr>';
                    added_row += new_row;
                });

                //$(el.target).classList.remove("active");
                //console.log($(el.target).parent().find('button')[page]);
                $(el.target).parent().find('button')[page].classList.add("active");
                $(el.target).parent().find('button')[page-1].classList.remove("active");
                $(el.target).parent().find('button')[0].setAttribute("data-page", page-1);
                $(el.target).parent().find('button')[6].setAttribute("data-page", page+1);
                $("#viewtable > tbody").empty();
                $("#viewtable > tbody").append(added_row);
                
            } else {
                alert("API Error");
            }
        };
        request.send(null);
    
    });

    $(document).on("click", ".pagination > .prevnext" , function(el) {
        var page = $(this).data("page");
        var request = new XMLHttpRequest();
        request.open("GET", 'https://gorest.co.in/public/v1/users?page='+page);
        request.onload = function() {
            if(request.status === 200) {
                customers = JSON.parse(request.responseText);
                //console.log(customers.data);
                var added_row = '';
                $.each(customers.data,function(index, item){
                    //console.log(item);
                    var status = item.status == 'active' ? 'active':'inactive';
                    new_row = '<tr><td colspan="3">'
                    + '<div class="row-container">'
                    + '<span class="cust-col"><span>' + item.name + '</span><br><small>'+getAccId(item.name)+'</small></span>'
                    + '<span class="stat-col"><span class="point '+status+'"></span><span>' + item.status +  '</span></span>'
                    + '<span class="act-col"><button class="viewcust-btn" type="button" data-id="'+item.id+'">view cust</button></span>'
                    + '</div>'
                    + '</td></tr>';
                    added_row += new_row;
                });

                //$(el.target).classList.remove("active");
                //console.log($(el.target).parent().find('button')[page]);
                $(el.target).parent().find('button')[page].classList.add("active");
                $(el.target).parent().find('button')[page-1].classList.remove("active");
                $(el.target).parent().find('button')[0].setAttribute("data-page", page-1);
                $(el.target).parent().find('button')[6].setAttribute("data-page", page+1);
                $("#viewtable > tbody").empty();
                $("#viewtable > tbody").append(added_row);
                
            } else {
                alert("API Error");
            }
        };
        request.send(null);
    
    });
});

function getAccId(text){
    const myArray = text.toLowerCase().split(" ");
    return "@"+  myArray[0] + "_" + myArray[myArray.length-1];
}

function loadTable(){
    var request = new XMLHttpRequest();
    request.open("GET", 'https://gorest.co.in/public/v1/users?limit=20');
    request.onload = function() {
        if(request.status === 200) {
            customers = JSON.parse(request.responseText);
            //console.log(customers.data);
            var added_row = '';
            $.each(customers.data,function(index, item){
                //console.log(item);
                var isDeleted = false;
                if(deletedCust.length > 0){
                    $.each(deletedCust,function(i, e){
                        //console.log(e);
                        //console.log(item.id);
                        if(e==item.id){
                            isDeleted = true;
                        }
                    })
                }
                
                if(!isDeleted){
                    var status = item.status == 'active' ? 'active':'inactive';
                    new_row = '<tr><td colspan="3">'
                    + '<div class="row-container">'
                    + '<span class="cust-col"><span>' + item.name + '</span><br><small>'+getAccId(item.name)+'</small></span>'
                    + '<span class="stat-col"><span class="point '+status+'"></span><span>' + item.status +  '</span></span>'
                    + '<span class="act-col"><button class="viewcust-btn" type="button" data-id="'+item.id+'">view cust</button></span>'
                    + '</div>'
                    + '</td></tr>';
                    added_row += new_row;
                }
            });
            $("#viewtable > tbody").empty();
            $("#viewtable > tbody").append(added_row);
            
        } else {
            alert("API Error");
        }
    };
    request.send(null);
}
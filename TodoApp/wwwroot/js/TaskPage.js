
GetDataWithAjax("All")
///Events///
$('#optionselect').change(function () {
    var value = $("#optionselect option:selected").val();
    
    console.log(value)
    GetDataWithAjax(value.toString())
});


var Div = document.querySelector("#TableDiv")
let checkbox = Div.getElementsByTagName('input')

$("input:checkbox[name^='foo']").on('change', function () {
    alert(this.value + ' --- ' + this.checked);
    

    console.log("vaaaaaaaaaaaay")
});
//if (event.checked) {
//    ChangeStatusAjax($('.StatusCheck').val(), true)

//} else {
//    ChangeStatusAjax($('.StatusCheck').val(), false)

//}

///Ajaxs///
function GetDataWithAjax(taskType) {
    $.ajax({
        type: 'GET',
        url: "/api/TaskApi/GetTaskByType",
        data: { TaskType: taskType }
    }).done(function (result) {

        console.log(result)

        $("#TaskDiv").remove();
        createTable(result)
    
    })
}


function ChangeStatusAjax(id, check)
{
    $.ajax({
        type: 'GET',
        url: "/api/TaskApi/TaskStatus",
        data: {
            status: check,
            Id : id,
        }
    }).done(function (result) {

        console.log(result)

        //$("#TaskDiv").remove();
        createTable(result)

    })
}
///Table///  
function createTable(result) {
    jQuery('<div>', {
        id: 'TaskDiv',
    }).appendTo('#TableDiv');
    var count = 1;
    $("#TaskDiv").append(
        `
        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="row">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">TaskType</th>
                    <th scope="col">Status</th>
                    <th scope="col">Reminder</th>
                    <th scope="col">Date </th>
                </tr>
            </thead>
            <tbody>
           
            ${
                
                result.map(item => {
                    var stringg = `<tr>
                        <td scope="row">${count}</td>
                        <td>${item.name}</td>
                        <td>${item.taskType}</td>
            
                        <td>${IsDone(item,count)}</td>
                        <td>${item.Reminder}</td>
                        <td>${item.date}</td>
            
                    </tr>`
                count++
                return stringg
                })
                //${IsDone(item.status)}
            }
            
            
        
        </tbody>
        </table>`);

}

function IsDone(item,count){
    if (item.status == true) {
    //     return `<td><i class="bi bi-check"></i></td>`
        return `<input type="checkbox" name="StatusCheck" value="${item.id}"  class="StatusCheck"  id="Check${count}"checked onclick="ChangeStatusAjax(${item.id},true)">`

    }else if (item.status == false) {
        return `<input type="checkbox" name="StatusCheck" value="${item.id}"  class="StatusCheck"  id="check${count}" onclick="ChangeStatusAjax(${item.id},false)">`


    //     return `<td><i class="bi bi-x-lg"></i></td>`
    }

}
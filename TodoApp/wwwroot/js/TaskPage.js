
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
        
        result.map(item => {

        var result = 
        `
            <div class="TaskContainer">
            <div id="TaskContent" class="col-md-8">
                <h2 class="Taskh2">${item.name}</h2>
                <h4 class="Taskh4">${item.taskType}</h4>
                <!-- ///////////////// -->
                <!-- Trigger the modal with a button -->
                <button type="button" class="btn btn-info btn-md" data-toggle="modal" data-target="#myModal${count}">Show All</button>
    
                <!-- Modal -->
                <div class="modal fade" id="myModal${count}" role="dialog">
                    <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title Taskh4">All Task Data</h4>
                        </div>
                        <div class="modal-body">
                        <p>
                            <h2 class="Taskh2">${item.name}</h2>
                            <h4 class="Taskh4">${item.taskType}</h4>
                            <h4 class="Taskh4">Reminder : ${DateChanger(item.reminder) }</h4>
                        <h4 class="Taskh4">Date : ${DateChanger(item.date) }</h4>

                        </p>
                        </div>
                        <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div> -->
                    </div>
                    </div>
                </div>
                <!-- ///////////////// -->
            </div>
            <div id="TaskCheck" class="col-md-4" style="height: 100%;">
                <div style="height: 100%;">
                    <!-- <div class="DivCenter" style="height: 100%;"> -->
                    <div class="DivCenter">
                        ${IsDone(item,count)}
                    </div>
                        
                    <!-- </div> -->
                </div>
            </div>
        </div>
        `
            console.log(DateChanger(item.reminder))
            console.log("dddd")
            console.log(DateChanger(item.date))
            count++
        return result
        })
    

    );
        }
        



function IsDone(item,count){
    if (item.status == true) {
    //     return `<td><i class="bi bi-check"></i></td>`
        return `<input type="checkbox" name="StatusCheck" value="${item.id}"  class="StatusCheck"  id="Check${count}"checked onclick="ChangeStatusAjax(${item.id},true)">
        
        `

    }else if (item.status == false) {
        return `<input type="checkbox" name="StatusCheck" value="${item.id}"  class="StatusCheck"  id="check${count}" onclick="ChangeStatusAjax(${item.id},false)">`


    //     return `<td><i class="bi bi-x-lg"></i></td>`
    }

}

function TaskTypeStyleFunction(item) {
    return `${item.taskType}`
}


function DateChanger(date)
{
    
    if (date != null) {
        var ReplacedToSlash = date.replaceAll('-', '/')
        var ReplacedAll = ReplacedToSlash.replace('T', ' ')
        return ReplacedAll;
        
    } else {
        return date;
    }
    
}


function Modal(item)
{
    var modal =
        `
        <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title Taskh4">All Task Data</h4>
                        </div>
                        <div class="modal-body">
                        <p>
                            <h2 class="Taskh2">${item.name}</h2>
                            <h4 class="Taskh4">${item.taskType}</h4>
                            <h4 class="Taskh4">Reminder : ${item.reminder}</h4>
                        <h4 class="Taskh4">Date : ${item.date}</h4>

                        </p>
                        </div>
                        <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div> -->
                    </div>
                    </div>
                </div>
         `

    return modal
}
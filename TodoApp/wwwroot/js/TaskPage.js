//Gets All Task from Api
GetDataWithAjax("All")


///events///
// Handle Select Event for Task Selection
$('#optionselect').change(function () {
    var value = $("#optionselect option:selected").val();

    GetDataWithAjax(value.toString())
});
///Ajaxs///

// Get Data From Api Using jquery Ajax
function GetDataWithAjax(taskType) {
    $.ajax({
        type: 'GET',
        url: "/api/TaskApi/GetTaskByType",
        data: { TaskType: taskType }
    }).done(function (result) {

        console.log(result)

        $("#TaskDiv").remove();
        createTask(result)
    
    })
}

// Change status of is done checkbox
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
        createTask(result)

    })
}
///Tasks Creation///  
function createTask(result) {
    // Make a div using Jquery
    jQuery('<div>', {
        id: 'TaskDiv',
    }).appendTo('#TableDiv');
    var count = 1;
    $("#TaskDiv").append(
        
        // Mapping Json to html code
        result.map(item => {

        var result = 
        `
            <div class="TaskContainer">
            <div id="TaskContent" class="col-md-8">
                <h3 class="Taskh3">${item.name}</h3>
                ${TaskTypeStyleFunction(item.taskType)}
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
                            <h3 class="Taskh3">${item.name}</h3>
                            ${TaskTypeStyleFunction(item.taskType)}
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
            
            count++
        return result
        })
    

    );
        }
        


// Get task status and Check status and make checkboxs 
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

// This function change Task type h4 colors
function TaskTypeStyleFunction(Type) {
    if (Type == 'Important') {

        return `<h4 class="Taskh4 text-danger">${Type}</h4>`
    } else if (Type == 'Daily') {
        return `<h4 class="Taskh4 text-primary">${Type}</h4>`

    } else if (Type == 'none') {
        return `<h4 class="Taskh4 text-dark">${Type}</h4>`
    } else if (Type == 'weekly') {
        return `<h4 class="Taskh4 text-warning">${Type}</h4>`
    } else {
        return `<h4 class="Taskh4 text-success">${Type}</h4>`
    }
       
    

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
                            <h3 class="Taskh3">${item.name}</h3>
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
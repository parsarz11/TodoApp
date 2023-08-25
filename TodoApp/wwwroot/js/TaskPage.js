
GetDataWithAjax("All")

$('#optionselect').change(function () {
    var value = $("#optionselect option:selected").val();

    console.log(value)
    GetDataWithAjax(value.toString())
});

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
            
                        ${Test(item.status)}
                        <td>${item.Reminder}</td>
                        <td>${item.date}</td>
            
                    </tr>`
                count++
                return stringg
                })
            }
            
            
        
        </tbody>
        </table>`);

}

function Test(status){
    if (status == true) {
        return `<td><i class="bi bi-check"></i></td>`

    }else if (status == false) {

        return `<td><i class="bi bi-x-lg"></i></td>`
    }
}
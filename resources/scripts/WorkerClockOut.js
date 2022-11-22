const baseUrl = "https://crimsonsnacksapi321.herokuapp.com/api/TimeStamps/"
const ClockInButton = document.getElementById("ClockOutTime");
message = document.getElementById("textareainput");
var selectMenu = document.getElementById("jobTypes");
worker = JSON.parse(localStorage.getItem('employee'))

if(worker == null) //no worker in local storage, must sign in
{
    window.location.replace("Login.html")
}
else if (worker.onTheClock == false ) //Worker is on the clock, Needs to clock out!!!!!! //May not be needed anymore
{
    window.location.replace("WorkerClockIn.html")
}
else
{
    ClockInButton.addEventListener("click", (e) => {
        e.preventDefault()
        UpdateClockOutEvent()
    })

}

function UpdateClockOutEvent()
{
    if(selectMenu.options[selectMenu.selectedIndex].text == 'Select')
    {
        Description = null
    }
    else
    {
        Description = selectMenu.options[selectMenu.selectedIndex].text
    }
    if(message.value == '')
    {
        tempMessage = null
    }
    else
    {
        tempMessage = message.value
    }

    let putURL = baseUrl + "UpdateOutTime"
    console.log(worker.employee_ID)

    const sendTimeCard = {
        "ClockInTime" : null,
        "ClockOutTime" : null, //Taken care of in the api
        "TimeSpent" : null,
        "Description" : Description, 
        "TimeEvent_ID" : null,
        "Employee_ID" : worker.employee_ID,
        "Message" : tempMessage,
        "Employee_Name" : null
    }
    fetch(putURL,{
        method: 'PUT',
        headers: {
            "Accept" : 'application/json',
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify(sendTimeCard)
    }).then((response)=> {
        if(response.status == 200)
        {
            window.alert(`Sucessful clock out`) //200 means made it to the back end
            worker.onTheClock = false;
            localStorage.clear()
            localStorage.setItem('employee', JSON.stringify(worker))
            window.location.href = "WorkerClockIn.html"
        }
        else
        {
            window.alert("error")
        }
    })
}
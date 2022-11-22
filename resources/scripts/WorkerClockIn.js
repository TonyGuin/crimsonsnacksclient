const baseUrl = "https://crimsonsnacksapi321.herokuapp.com/api/TimeStamps/"
const ClockInButton = document.getElementById("ClockInTime");
worker = JSON.parse(localStorage.getItem('employee'))

if(worker == null) //no worker in local storage, must sign in
{
    window.location.replace("Login.html")
}
else if (worker.onTheClock == true ) //Worker is on the clock, Needs to clock out!!!!!! //May not be needed anymore
{
    window.location.replace("WorkerClockOut.html")
}
else
{
    ClockInButton.addEventListener("click", (e) => {
        e.preventDefault()
        CreateClockInEvent()
    })
}



function CreateClockInEvent()
{
    let postURL = baseUrl + "CreateInTime"
    console.log(worker.employee_ID)

    const sendEmployee = {
        "Employee_ID" : worker.employee_ID,
        "Department_Name" : null,
        "Employee_Type" : null,
        "Password" : null,
        "Email" : null,
        "Phone" : null,
        "BirthDate" : null, 
        "F_Name" : null,
        "L_Name" : null,
        "OnTheClock" : false,
        "Hired" : true
    }
    fetch(postURL,{
        method: 'POST',
        headers: {
            "Accept" : 'application/json',
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify(sendEmployee)
    }).then((response)=> {
        if(response.status == 200)
        {
            window.alert(`Sucessful clock in`) //200 means made it to the back end
            worker.onTheClock = true;
            localStorage.clear();
            localStorage.setItem('employee', JSON.stringify(worker))
            window.location.replace("WorkerClockOut.html")
        }
        else
        {
            window.alert("error")
        }
        console.log('response from the save', response)
    })
}
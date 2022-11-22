var home = document.getElementById('HomeHRef')
var accountselected = document.getElementById('')
var editorhistory = document.getElementById('EditOrHistory')

account = JSON.parse(localStorage.getItem('employee'))
console.log(account)

if(account.employee_Type == "worker") //no worker in local storage, must sign in
{
    if(account.onTheClock)
    {
        editorhistory.innerHTML = "History"
        editorhistory.href = "./WorkerHistory.html"
        home.href = "./WorkerClockOut.html"
    }
    else
    {
        editorhistory.innerHTML = "History"
        editorhistory.href = "./WorkerHistory.html"
        home.href = "./WorkerClockIn.html"
    }
}
else if (account.employee_Type == "manager") //Worker is on the clock, Needs to clock out!!!!!! //May not be needed anymore
{
    editorhistory.innerHTML = "Edit"
    editorhistory.href = "./EditEmployee.html"
    home.href = "./ManagerView.html"
}
else
{
    editorhistory.innerHTML = "Edit"
    editorhistory.href = "./EditEmployee.html"
    home.href = "./DirectorView.html"
}
if(account.employee_Type == 'dirrector') //misspelt in database
{
    account.employee_Type = 'director'
}


var empid = document.getElementById('input-Employee_ID')
var dptname = document.getElementById('input-Department_Name')
var fname = document.getElementById('input-First_Name')
var lname = document.getElementById('input-Last_Name')
var emptype = document.getElementById('input-Employee_Type')
var email = document.getElementById('input-Email')
var phone = document.getElementById('input-Phone')
var bday = document.getElementById('input-BirthDate')
var password = document.getElementById('input-Password')

empid.value = account.employee_ID
dptname.value = account.department_Name
fname.value = account.f_Name
lname.value = account.l_Name
emptype.value = account.employee_Type
email.value = account.email
phone.value = account.phone
bday.value = account.birthDate
password.value = account.password


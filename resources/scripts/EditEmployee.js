var home = document.getElementById('HomeHRef')
var editorhistory = document.getElementById('EditOrHistory')
const baseUrl = "https://crimsonsnacksapi321.herokuapp.com/api/employees/GetEmp/"
const fireURL = "https://crimsonsnacksapi321.herokuapp.com/api/employees/UpdateEmpHired"


var editView = document.getElementById('editviewform')
const searchButton = document.getElementById("empSearchBoxGo");
const searchBox = document.getElementById("empSearchBox");

ManDir = JSON.parse(localStorage.getItem('employee'))
console.log(ManDir)


if (ManDir.employee_Type == "manager")
{
    home.href = "./ManagerView.html"
}
else
{
    home.href = "./DirectorView.html"
}
if(ManDir.employee_Type == 'dirrector') //misspelt in database
{
    ManDir.employee_Type = 'director'
}







searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const empID = searchBox.value;
    const empLogin =  baseUrl + `${empID}`

    fetch(empLogin).then(
        function(response)
        {
            console.log(response)
            return response.json()
        }).then(
            function(json)
            {
            console.log(json)
            employee = json

            if (employee.f_Name!=null && employee.hired == true) {
                searchBox.value = '';
                ShowForm(employee)
            } 
            else {
                searchBox.value = '';
                window.alert("Employee not found/fired")

            }

        })
})


function ShowForm(employee)
{
    account = employee
    const accountForm = document.getElementById('editviewform')
    accountForm.innerHTML = ''
    accountForm.innerHTML = "<div class='main-content'><div class='container-fluid mt--7'><div class='row'><div class='col-xl-8 order-xl-1'><div class='card bg-secondary shadow'><div class='card-body'>  <form><div class='pl-lg-4'><div class='row'><div class='col-lg-6'><div class='form-group focused'><label class='form-control-label' for='input-Employee_ID'>Employee ID</label><input type='text' id='input-Employee_ID' class='form-control form-control-alternative'  value='' readonly></div></div><div class='col-lg-6'><div class='form-group'><label class='form-control-label' for='input-Department_Name'>Department Name</label><input type='email' id='input-Department_Name' class='form-control form-control-alternative' value='' readonly></div></div></div><div class='row'><div class='col-lg-6'><div class='form-group focused'><label class='form-control-label' for='input-First_Name'>First Name</label><input type='text' id='input-First_Name' class='form-control form-control-alternative' value='' readonly></div></div><div class='col-lg-6'><div class='form-group focused'><label class='form-control-label' for='input-Last_Name'>Last Name</label><input type='text' id='input-Last_Name' class='form-control form-control-alternative' value='' readonly></div></div></div><div class='row'><div class='col-lg-6'><div class='form-group focused'><label class='form-control-label' for='input-Employee_Type'>Employee Type</label><input type='text' id='input-Employee_Type' class='form-control form-control-alternative' value='' readonly></div></div><div class='col-lg-6'><div class='form-group focused'><label class='form-control-label' for='input-Email'>Email</label><input type='text' id='input-Email' class='form-control form-control-alternative' value='' readonly></div></div></div><div class='row'><div class='col-lg-6'><div class='form-group focused'><label class='form-control-label' for='input-Phone'>Phone</label><input type='text' id='input-Phone' class='form-control form-control-alternative' value='' readonly></div></div><div class='col-lg-6'><div class='form-group focused'><label class='form-control-label' for='input-BirthDate'>BirthDate</label><input type='text' id='input-BirthDate' class='form-control form-control-alternative' value='' readonly></div></div></div><div class='row'><div class='col-lg-6'><div class='form-group focused'><label class='form-control-label' for='input-Password'>Password</label><input type='text' id='input-Password' class='form-control form-control-alternative' value='' readonly></div></div></div></div></form></div></div></div></div></div></div>"

    accountForm.innerHTML += "<input type='submit' id='fire' class='btn btn-danger' value='FIRE'>"

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



    const fireButton = document.getElementById("fire");
    fireButton.addEventListener("click", (e) => {
        e.preventDefault();
    
        const sendEmployee = {
            "employee_ID" : account.employee_ID, 
            "department_Name" : null,
            "employee_Type" : null,
            "password" : null,
            "email" : null,
            "phone" : null,
            "birthDate" : null, 
            "f_Name" : null,
            "l_Name" : null,
            "onTheClock" : null,
            "hired" : null
        }
        fetch(fireURL,{
            method: 'PUT',
            headers: {
                "Accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(sendEmployee)
        }).then((response)=> {
            if(response.status == 200)
            {
                window.alert(`Employee has been fired`) //200 means made it to the back end
            }
            else
            {
                window.alert("Error. Contact IT for assistance")
            }
            console.log('response from the save', response)
            accountForm.innerHTML = ''
            })
        })
}






























const changepasswordForm = document.getElementById("changepassword-form");
const changepasswordSubmitButton = document.getElementById("changepassword-form-submit");
const changepasswordErrorMsg = document.getElementById("changepassword-error-msg");

var changepassword = document.getElementById("changepassword-error-msg")
var changepassword2 = document.getElementById("error-msg-second-line")

const baseUrl = "https://crimsonsnacksapi321.herokuapp.com/api/employees/UpdateEmpPassword"

changepasswordSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    CheckEntry()

})

function CheckEntry()
{
    if(changepasswordForm.empID.value == null || changepasswordForm.empID.value == '')
    {
        changepassword.innerHTML = "Enter your employee ID"
        changepassword.style.opacity = 1
    }
    else if(changepasswordForm.password1.value == '' || changepasswordForm.password2.value == '')
    {
        changepassword.innerHTML = "Password can not be blank"
        changepassword.style.opacity = 1

    }
    else if(changepasswordForm.password1.value != changepasswordForm.password2.value)
    {
        changepassword.innerHTML = "Paswords do not match"
        changepassword.style.opacity = 1

    }
    else if(changepasswordForm.password1.value.length <= 2)
    {
        changepassword.innerHTML = "Password length must be 3 or more"
        changepassword.style.opacity = 1

    }
    else
    {
        empID = changepasswordForm.empID.value
        password1 = changepasswordForm.password1.value
        SubmitUpdate(empID, password1)
    }
}


function SubmitUpdate(empID, password1)
{
    let putURL = baseUrl

    const sendEmployee = {
        "employee_ID" : empID, 
        "department_Name" : null,
        "employee_Type" : null,
        "password" : password1,
        "email" : null,
        "phone" : null,
        "birthDate" : null, 
        "f_Name" : null,
        "l_Name" : null,
        "onTheClock" : null,
        "hired" : null
    }
    fetch(putURL,{
        method: 'PUT',
        headers: {
            "Accept" : 'application/json',
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify(sendEmployee)
    }).then((response)=> {
        if(response.status == 200)
        {
            window.alert(`Password has been updated`) //200 means made it to the back end
        }
        else
        {
            window.alert("Active driver not found")
        }
        console.log('response from the save', response)
        changepassword.style.opacity = 0
        changepasswordForm.empID.value = ''
        changepasswordForm.password1.value = ''
        changepasswordForm.password2.value= ''
        

    })
}
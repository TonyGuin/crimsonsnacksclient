const createEmpForm = document.getElementById("createform");
const createButton = document.getElementById("create-form-submit");
var selectMenu = document.getElementById("selectBDay");

const baseUrl = "https://crimsonsnacksapi321.herokuapp.com/api/employees/"

var createmessage = document.getElementById("createemp-error-msg")

createButton.addEventListener("click", (e) => {
    e.preventDefault();
    CheckEntry()

})

function CheckEntry()
{
    if(createEmpForm.firstname.value == '')
    {
        createmessage.innerHTML = "Enter your first name"
        createmessage.style.opacity = 1
    }
    else if(createEmpForm.lastname.value == '')
    {
        createmessage.innerHTML = "Enter your last name"
        createmessage.style.opacity = 1
    }
    else if(createEmpForm.email.value == '')
    {
        createmessage.innerHTML = "Enter your email"
        createmessage.style.opacity = 1
    }
    else if(createEmpForm.bday.value == '')
    {
        createmessage.innerHTML = "Enter your Birthday"
        createmessage.style.opacity = 1
    }
    else if(createEmpForm.phone.value == '')
    {
        createmessage.innerHTML = "Enter your Phone"
        createmessage.style.opacity = 1
    }
    else if(createEmpForm.phone.value.length > 10 || createEmpForm.phone.value.length < 10)
    {
        createmessage.innerHTML = "Max 10 phone length"
        createmessage.style.opacity = 1
    }
    else if(selectMenu.options[selectMenu.selectedIndex].text == 'Choose a Department')
    {
        createmessage.innerHTML = "Enter your Department"
        createmessage.style.opacity = 1
    }
    else if(createEmpForm.password1.value == '' || createEmpForm.password2.value == '')
    {
        createmessage.innerHTML = "Passwords can not be blank"
        createmessage.style.opacity = 1

    }
    else if(createEmpForm.password1.value != createEmpForm.password2.value)
    {
        createmessage.innerHTML = "Paswords do not match"
        createmessage.style.opacity = 1

    }
    else if(createEmpForm.password1.value.length <= 2)
    {
        createmessage.innerHTML = "Password length must be 3 or more"
        createmessage.style.opacity = 1

    }
    else if(!isBeforeToday(createEmpForm.bday.value))
    {
        createmessage.innerHTML = "Birthday must be before today"
        createmessage.style.opacity = 1
    }
    else
    {
        window.alert("Please Wait")
        createmessage.style.opacity = 0
        SubmitCreate()
    }
}


function SubmitCreate()
{

    let postURL = baseUrl + "CreateEmp"

    const sendEmployee = {
        "employee_ID" : null, 
        "department_Name" : selectMenu.options[selectMenu.selectedIndex].text,
        "employee_Type" : "worker",
        "password" : createEmpForm.password1.value,
        "email" : createEmpForm.email.value,
        "phone" : createEmpForm.phone.value,
        "birthDate" : createEmpForm.bday.value, 
        "f_Name" : createEmpForm.firstname.value,
        "l_Name" : createEmpForm.lastname.value,
        "onTheClock" : false,
        "hired" : true
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
            window.alert(`Employee has been created`) //200 means made it to the back end
        }
        else
        {
            window.alert("error")
        }
        console.log('response from the save', response)
        GiveUserID()
        Finish()
    })
}

function isBeforeToday(date){
    // var today = new Date((new Date()));
    // window.alert(date)
    // window.alert(today)
    // return date > today;
    return new Date(date).valueOf() < new Date().valueOf();
  }

  function GiveUserID()
  {
    const f_Name = createEmpForm.firstname.value;
    const l_Name = createEmpForm.lastname.value;
    const phone = createEmpForm.phone.value;
    const password = createEmpForm.password1.value;
    const dpt = selectMenu.options[selectMenu.selectedIndex].text;
    let getURL = baseUrl + `GetCreatedEmp/${f_Name}/${l_Name}/${phone}/${password}/${dpt}`

    fetch(getURL).then(
        function(response)
        {
            console.log(response)
            return response.json()
        }).then(
            function(json)
            {
            console.log(json)
            employee = json
            window.alert("***** Next Alert Important ******")
            window.alert("***** Make note: Your employee id is " + employee.employee_ID)

        })

  }
















function Finish()
{
    createEmpForm.firstname.value = ''
    createEmpForm.lastname.value = ''
    createEmpForm.email.value = ''
    createEmpForm.bday.value = ''
    createEmpForm.phone.value = ''
    selectMenu.options[selectMenu.selectedIndex].text = 'Choose a Department'
    createEmpForm.password1.value = '' 
    createEmpForm.password2.value = ''
}
localStorage.clear()
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const baseUrl = "https://crimsonsnacksapi321.herokuapp.com/api/employees/GetEmpLogin/"

const forgotPasswordButton = document.getElementById("login-form-forgot");
const newUserButton = document.getElementById("login-form-newUser");


loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const empID = loginForm.empID.value;
    const password = loginForm.password.value;
    const empLogin =  baseUrl + `${empID}/${password}`

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
                localStorage.setItem('employee', JSON.stringify(employee)) //local storage now has the current employee that is signed in
                // test = localStorage.getItem('employee')
                // console.log(JSON.parse(test))
                // window.alert(test)
                loginForm.empID.value = '';
                loginForm.password.value = '';
                if(employee.employee_Type == 'manager')
                {
                    window.location.href = "ManagerView.html";

                }
                else if(employee.employee_Type == 'dirrector')
                {
                    window.location.href = "DirectorView.html";

                }
                else if(employee.onTheClock == false)
                {
                    window.location.href = "WorkerClockIn.html";
                }
                else
                {
                    window.location.href = "WorkerClockOut.html"
                }
            } 
            else {
                loginErrorMsg.style.opacity = 1;

            }

        })







})


forgotPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "ChangePassword.html";
})

newUserButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "CreateEmp.html";
})
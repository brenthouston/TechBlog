//signup form
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        email:document.querySelector("#signup-email").value,
        name:document.querySelector("#signup-username").value,
        password:document.querySelector("#signup-password").value,
    }
    console.log(userObj);
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/";
           console.log(userObj);
        } else {
            alert("Error Occured")
        }
    })
})


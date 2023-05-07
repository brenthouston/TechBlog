
document.querySelector("form").addEventListener("submit",e=>{
    e.preventDefault();
    const projObj = {
        name:document.querySelector("#name").value,
        needed_funding:document.querySelector("#funding").value,
        description:document.querySelector("#description").value,
    }
    fetch("/api/post",{
        method:"POST",
        body:JSON.stringify(postObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})

const allDelBtns = document.querySelectorAll(".del-btn");
allDelBtns.forEach(button=>{
    button.addEventListener("click",()=>{
        const idToDel = button.getAttribute("data-proj-id");
        fetch(`/api/post/${idToDel}`,{
            method:"DELETE",
        }).then(res=>{
            if(res.ok){
                location.reload()
            } else {
                alert("trumpet sound")
            }
        })
    })
})
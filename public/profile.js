
document.querySelector("form").addEventListener("submit",e=>{
    e.preventDefault();
    const postObj = {
        name:document.querySelector("#name").value,
        description:document.querySelector("#description").value,
    }
     fetch("/api/posts",{
        method:"POST",
        body:JSON.stringify(postObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
           
        } else {
            alert("An error occured")
        }
    })
})

const allDelBtns = document.querySelectorAll(".del-btn");
allDelBtns.forEach(button=>{
    button.addEventListener("click",()=>{
        const idToDel = button.getAttribute("data-post-id");
        console.log(idToDel);
        fetch(`/post/${idToDel}`,{
            method:"DELETE",
        }).then(res=>{
            if(res.ok){
                location.reload()
            } else {
                alert("Error Occured")
            }
        })
    })
})


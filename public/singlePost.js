

const postEl = document.querySelector('#post')


document.querySelector('#comment').addEventListener('submit', e=>{
    e.preventDefault();
    const body = document.querySelector('#myTextarea').value
    const newComment = document.createElement('p');
    newComment.setAttribute('style','color:grey;')
    newComment.append(body)
    postEl.append(newComment)
    const data= postEl.getAttribute("data-post-id")
    console.log(data);
    fetch(`/api/posts/${data}/comment`,{
        method:'POST',
        body:JSON.stringify({body}),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            // location.reload()
        }else{
            alert("An error occured")
        }
    })
})


const postEl = document.querySelector('.container')


document.querySelector('#comment').addEventListener('submit', e=>{
    e.preventDefault();
    const body = document.querySelector('#myTextarea').value
    const newComment = document.createElement('p');
    newComment.setAttribute('style','color:grey;')
    newComment.append(body)
    postEl.append(newComment)
    console.log(body);
    fetch(`/api/posts/${hbsData.id}`,{
        method:'POST',
        body:JSON.stringify({body}),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.reload()
        }else{
            alert("An error occured")
        }
    })
})
const postElement = document.querySelectorAll('.container');
const postEl = document.querySelector('#post')

postElement.forEach(post => {
  const postId = post.getAttribute('data-post-id');
  console.log('Post ID:', postId);
 
  
  post.addEventListener('click', () => {
    location.href = `api/posts/${postId}`;
  });
});

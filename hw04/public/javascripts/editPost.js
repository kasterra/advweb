document.addEventListener('DOMContentLoaded', function() {
  // URL에서 게시물의 ID를 추출하는 함수
  function getPostIdFromUrl() {
    // 현재 URL을 '/'로 분할하고 마지막 요소를 게시물 ID로 사용
    const pathSegments = window.location.pathname.split('/');
    return pathSegments.pop(); // 또는 pathSegments[pathSegments.length - 1];
  }

  const form = document.querySelector('form');
  form.action = `/posts/edit/${getPostIdFromUrl()}`

  function fetchAndDisplayPost(postId) {
    fetch(`/api/post/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Post not found or error retrieving the post');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayPost(data.post);
        })
        .catch(error => {
            console.error('Error:', error);
            document.body.innerHTML = '<p>게시물을 불러올 수 없습니다.</p>';
        });
}

  function displayPost(post) {
    document.querySelector('#user_name').value = post.user_name;
    document.querySelector('#title').value = post.title;
    document.querySelector('#content').value = post.content;
  }
const postId = getPostIdFromUrl();
if (postId) {
    fetchAndDisplayPost(postId);
} else {
    console.error('No post ID found in URL');
    document.body.innerHTML = '<p>잘못된 접근입니다.</p>';
}
})
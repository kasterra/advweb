document.addEventListener('DOMContentLoaded', function() {
  // URL에서 게시물의 ID를 추출하는 함수
  function getPostIdFromUrl() {
    // 현재 URL을 '/'로 분할하고 마지막 요소를 게시물 ID로 사용
    const pathSegments = window.location.pathname.split('/');
    return pathSegments.pop(); // 또는 pathSegments[pathSegments.length - 1];
}

  // 게시물 데이터를 불러와 페이지에 표시하는 함수
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

  // 게시물을 페이지에 표시하는 함수
  function displayPost(post) {
      document.querySelector('h1').textContent = post.title;
      document.querySelector('h2').textContent = `글쓴이 ${post.user_name}`;
      document.querySelector('h3').textContent = `작성시간: ${new Date(post.post_date).toLocaleString()}`;
      document.querySelectorAll('p')[1].textContent = post.content; // 첫 번째 <p>는 "내용"이므로, 두 번째 <p>에 내용을 채웁니다.

      if(post.image_path1){
        const images = document.querySelector("#images")
        images.innerHTML = '';
        const img1 = document.createElement('img')
        img1.src = post.image_path1;
        images.appendChild(img1);
        if(post.image_path2){
            const img2 = document.createElement('img')
            img2.src = post.image_path2;
            images.appendChild(img2);
        }
      }

      // 수정하기 및 삭제하기 링크의 href 속성 업데이트
      const editLink = document.querySelector('#edit');
      const deleteLink = document.querySelector('#delete');
      editLink.href = `/posts/edit/${post.ID}`;
      deleteLink.href = `/posts/delete/${post.ID}`;
      deleteLink.setAttribute('onclick', "return confirm('정말 삭제하시겠습니까?');");
  }

  const postId = getPostIdFromUrl();
  if (postId) {
      fetchAndDisplayPost(postId);
  } else {
      console.error('No post ID found in URL');
      document.body.innerHTML = '<p>잘못된 접근입니다.</p>';
  }
});

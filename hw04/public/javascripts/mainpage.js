document.addEventListener('DOMContentLoaded', (event) => {
        const urlParams = new URLSearchParams(window.location.search);
        const limit = urlParams.get('limit') || '10'; // 기본값으로 '10'을 사용
        const selectedLimit = document.querySelector(`input[name="limit"][value="${limit}"]`);
        if (selectedLimit) {
          selectedLimit.checked = true;
        }
        
        // 라디오 버튼 값 변경 시 페이지 리다이렉트
        document.querySelectorAll('input[name="limit"]').forEach(button => {
          button.addEventListener('change', function() {
            const currentUrl = new URL(window.location);
            currentUrl.searchParams.set('limit', this.value);
            window.location = currentUrl.href;
          });
        });
})

document.addEventListener('DOMContentLoaded', function() {
  const limitForm = document.getElementById('limitForm');
  const queryParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(queryParams.get('page') || '1', 10) || 1;
  const limit = parseInt(queryParams.get('limit') || '10', 10) || 10;

  // 게시물 목록을 불러오는 함수
  function fetchPosts(page, limit) {
      fetch(`api/posts?idx=${page}&limit=${limit}`)
          .then(response => response.json())
          .then(data => {
              renderPosts(data.posts);
              renderPagination(data.totalPages, page);
          })
          .catch(error => console.error('Error fetching posts:', error));
  }

  // 게시물 렌더링 함수
  function renderPosts(posts) {
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = ''; // 내용 초기화
      posts.forEach(post => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td>${post.user_name}</td>
              <td><a href="/posts/${post.ID}">${post.title}</a></td>
              <td>${new Date(post.post_date).toLocaleString()}</td>
              <td><a href="/posts/edit/${post.ID}">수정하기</a></td>
              <td><a href="/posts/delete/${post.ID}" onclick="return confirm('정말 삭제하시겠습니까?');">삭제하기</a></td>
          `;
          tbody.appendChild(tr);
      });
  }

  // 페이지네이션 렌더링 함수
  function renderPagination(totalPages, currentPage) {
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = ''; // 내용 초기화
      for (let n = 1; n <= totalPages; n++) {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `#`;
          a.innerText = `${n} page`;
          a.addEventListener('click', function(event) {
              event.preventDefault();
              fetchPosts(n, limit);
          });
          if (n === currentPage) {
              a.style.fontWeight = 'bold';
          }
          li.appendChild(a);
          pagination.appendChild(li);
      }
  }

  // 페이지 로드 시 게시물 목록을 처음 불러옴
  fetchPosts(currentPage, limit);

  // 게시물 개수 선택 이벤트 리스너
  limitForm.addEventListener('change', function(event) {
      if (event.target.name === 'limit') {
          limit = parseInt(event.target.value);
          fetchPosts(currentPage, limit);
      }
  });
});

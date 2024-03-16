// Fetch and display users
async function fetchUsers() {
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      const userList = document.getElementById('userList');
      userList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.username} (${user.email})`;
        userList.appendChild(li);
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  // Fetch and display posts
  async function fetchPosts() {
    try {
      const response = await fetch('/api/posts');
      const posts = await response.json();
      const postList = document.getElementById('postList');
      postList.innerHTML = '';
      posts.forEach(post => {
        const li = document.createElement('li');
        li.textContent = post.title;
        postList.appendChild(li);
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  // Fetch and display comments
  async function fetchComments() {
    try {
      const response = await fetch('/api/comments');
      const comments = await response.json();
      const commentList = document.getElementById('commentList');
      commentList.innerHTML = '';
      comments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment.content;
        commentList.appendChild(li);
      });
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  // Create a new user
  async function createUser(event) {
    event.preventDefault();
    const username = document.getElementById('usernameInput').value;
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const bio = document.getElementById('bioInput').value;

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, bio }),
      });

      if (response.ok) {
        document.getElementById('userForm').reset();
        await fetchUsers();
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

// Create a new post
async function createPost(event) {
    event.preventDefault();
    const title = document.getElementById('titleInput').value;
    const content = document.getElementById('contentInput').value;
    const userId = document.getElementById('userIdInput').value;

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, userId }),
      });

      if (response.ok) {
        document.getElementById('postForm').reset();
        await fetchPosts();
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  // Create a new comment
  async function createComment(event) {
    event.preventDefault();
    const content = document.getElementById('commentInput').value;
    const postId = document.getElementById('postIdInput').value;
    const userId = document.getElementById('userIdInput').value;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, postId, userId }),
      });

      if (response.ok) {
        document.getElementById('commentForm').reset();
        await fetchComments();
      } else {
        console.error('Failed to create comment');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  }

  // Update a user
  async function updateUser(event) {
    event.preventDefault();
    const userId = document.getElementById('updateUserId').value;
    const username = document.getElementById('updateUsername').value;
    const email = document.getElementById('updateEmail').value;
    const password = document.getElementById('updatePassword').value;
    const bio = document.getElementById('updateBio').value;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, bio }),
      });

      if (response.ok) {
        document.getElementById('updateUserForm').reset();
        await fetchUsers();
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  // Delete a user
  async function deleteUser(event) {
    event.preventDefault();
    const userId = document.getElementById('deleteUserId').value;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.getElementById('deleteUserForm').reset();
        await fetchUsers();
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  // Update a post
  async function updatePost(event) {
    event.preventDefault();
    const postId = document.getElementById('updatePostId').value;
    const title = document.getElementById('updateTitle').value;
    const content = document.getElementById('updateContent').value;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        document.getElementById('updatePostForm').reset();
        await fetchPosts();
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  // Delete a post
  async function deletePost(event) {
    event.preventDefault();
    const postId = document.getElementById('deletePostId').value;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.getElementById('deletePostForm').reset();
        await fetchPosts();
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  // Update a comment
  async function updateComment(event) {
    event.preventDefault();
    const commentId = document.getElementById('updateCommentId').value;
    const content = document.getElementById('updateCommentContent').value;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        document.getElementById('updateCommentForm').reset();
        await fetchComments();
      } else {
        console.error('Failed to update comment');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  }

  // Delete a comment
  async function deleteComment(event) {
    event.preventDefault();
    const commentId = document.getElementById('deleteCommentId').value;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.getElementById('deleteCommentForm').reset();
        await fetchComments();
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }

  // Event listeners
  document.getElementById('userForm').addEventListener('submit', createUser);
  document.getElementById('postForm').addEventListener('submit', createPost);
  document.getElementById('commentForm').addEventListener('submit', createComment);
  document.getElementById('updateUserForm').addEventListener('submit', updateUser);
  document.getElementById('deleteUserForm').addEventListener('submit', deleteUser);
  document.getElementById('updatePostForm').addEventListener('submit', updatePost);
  document.getElementById('deletePostForm').addEventListener('submit', deletePost);
  document.getElementById('updateCommentForm').addEventListener('submit', updateComment);
  document.getElementById('deleteCommentForm').addEventListener('submit', deleteComment);

  // Initial fetch
  fetchUsers();
  fetchPosts();
  fetchComments();
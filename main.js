$(document).ready( () => {
  let postData =[];
  let commentData = [];
  let postTitle = $("#postTitle")[0];
  let commentTitle = $("#commentTitle")[0];
  let postList = $("#postList")[0];
  let commentList = $("#commentList")[0];
  $("#submit").click( () => {
    while(postList.hasChildNodes()) {
      postList.removeChild(postList.lastChild);
    }
    while(commentList.hasChildNodes()) {
      commentList.removeChild(commentList.lastChild);
    }
    let username = $("#username")[0].value;
    $.ajax({
      url: `https://www.reddit.com/user/${username}/submitted.json`,
      success: (data) => {
        let posts = data.data.children;
        posts = posts.slice(0, Math.min(posts.length, 25));
        sortedPosts = posts.sort( (a,b) => {
          if(a.data.score < b.data.score) {
            return 1;
          } else if(a.data.score > b.data.score) {
            return -1;
          } else {
            return 0;
          }
        });
        postTitle.innerHTML = `Showing top 25 posts by "${username}"`
        for(let i=0; i<sortedPosts.length; i++) {
          let post = posts[i];
          let postInfo= document.createElement("li");
          let postTitle = document.createElement("h3");
          postTitle.innerHTML = `${post.data.title}`;
          let postScore = document.createElement("p");
          postScore.innerHTML = `Score: ${post.data.score}`;
          let postLink = document.createElement("a");
          postLink.innerHTML = "Link";
          postLink.href = `${post.data.url}`;
          postInfo.append(postTitle, postScore, postLink);
          postList.append(postInfo);
        }
      },
      error: () => {postTitle.innerHTML = `No posts by "${username}"   found!`}
    });
    $.ajax({
      url: `https://www.reddit.com/user/${username}/comments.json`,
      success: (data) => {
        let comments = data.data.children;
        comments = comments.slice(0, Math.min(comments.length, 25));
        sortedComments = comments.sort( (a,b) => {
          if(a.data.score < b.data.score) {
            return 1;
          } else if(a.data.score > b.data.score) {
            return -1;
          } else {
            return 0;
          }
        });
        commentTitle.innerHTML = `Showing top 25 comments by "${username}"`
        for(let i=0; i<sortedComments.length; i++) {
          let comment = comments[i];
          let commentInfo= document.createElement("li");
          let commentBody = document.createElement("p");
          commentBody.innerHTML = `${comment.data.body}`;
          let commentScore = document.createElement("p");
          commentScore.innerHTML = `Score: ${comment.data.score}`;
          let commentLink = document.createElement("a");
          commentLink.innerHTML = "Link";
          commentLink.href = `${comment.data.link_url}`;
          commentInfo.append(commentBody, commentScore, commentLink);
          commentList.append(commentInfo);
        }
      },
      error: () => {commentTitle.innerHTML = `No comments by "${username}" found!` }
    });
  });
});

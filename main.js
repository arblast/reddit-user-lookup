$(document).ready( () => {
  let postData =[];
  let commentData = [];
  $("#submit").click( () => {
    let username = $("#username")[0].value;
    $.get(`https://www.reddit.com/user/${username}/submitted.json`,
    (data) => {
      let posts = data.data.children.slice(0,25);
      sortedPosts = posts.sort( (a,b) => {
        if(a.data.score < b.data.score) {
          return 1;
        } else if(a.data.score > b.data.score) {
          return -1;
        } else {
          return 0;
        }
      });
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
        $("#postList")[0].append(postInfo);
      }
    });
    $.get(`https://www.reddit.com/user/${username}/comments.json`,
    (data) => {
      let posts = data.data.children.slice(0,25);
      sortedPosts = posts.sort( (a,b) => {
        if(a.data.score < b.data.score) {
          return 1;
        } else if(a.data.score > b.data.score) {
          return -1;
        } else {
          return 0;
        }
      });
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
        $("#postList")[0].append(postInfo);
      }
    });
  });
});

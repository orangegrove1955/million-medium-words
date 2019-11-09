const millionValue = 1000000;

const getUserPosts = async _ => {
  // Get username from user input, and trim any whitespace
  const username = document.getElementById("username").value.trim();

  // Only process when user has entered a name
  if (username.length > 0) {
    // Fetch from API
    await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
    )
      .then(res => {
        // Check response status is ok, or else throw error
        if (!res.ok) {
          //TODO: Handle errors gracefully
          throw Error("Error occurred in API call", res.statusText);
        } else {
          return res.json();
        }
      })
      // Iterate through posts, replacing HTML tags, and count words
      .then(data => {
        let totalCount = 0;
        let bodyStyle = document.body.style;
        // TODO: Access icon with body style simultaneously
        let icon = document.getElementById("github-icon").style;
        const posts = data.items.filter(item => item.categories.length > 0);

        posts.forEach(post => {
          const postContent = post.content.replace(/<[^>]*>/g, "");
          totalCount += postContent.split(" ").length;
        });

        // Colour background based on word count
        switch (true) {
          case totalCount < 1000:
            bodyStyle.backgroundColor = "blue";
            bodyStyle.color = "white";
            icon.color = "white";
            break;
          case totalCount < 10000:
            bodyStyle.backgroundColor = "lightGreen";
            break;
          default:
            bodyStylebackgroundColor = "white";
        }
        bodyStyle.transition = "background-color 1.5s ease, color 1.5s ease";
        icon.transition = "color 1.5s ease";
        document.getElementById("countTotal").innerText = totalCount;
        document.getElementById("countTotal").style.display = "block";
        document.getElementById("userNameInput").style.display = "none";
      });
    // If field is empty, request a username
  } else {
    console.log("enter a username");
  }
};

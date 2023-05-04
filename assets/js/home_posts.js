{
    //method to submit form data to new post using Ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDOM(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    //method to create post in DOM

    let newPostDOM = function(post){
        return `<li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete Post</a>
            </small>

            ${post.content}
            <small> post by
                ${post.user.name}
            </small>
        </p>
    
    </li>
    <div class="post-comment">
        
        <form action="/comments/create" method="post">
            <input type="text" name="content" placeholder="type your comments here... " required>
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="Add Comment">
        </form>
        
        <!-- comment need to be shown even if user is not logged in -->
        <div class="post-comment-list">
            <ul id="post-comment-${post._id}">
                
            </ul>
        </div>
    </div>`
    }

    createPost();
}
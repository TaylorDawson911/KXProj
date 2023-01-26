var config = {
    host: 'localhost',
    port: 8000
};  



function reply_click(clicked_id)
  {
    console.log(clicked_id)
    const username = clicked_id;
    var message = $('#message').val();
    var follow = $('#follow').val();
    if (follow == "on") {
        follow = true;
    } else {
        follow = false;
    }

    const params = new URLSearchParams({username, message, follow});
    fetch(`http://${config.host}:${config.port}/api/v1/instagram/message?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var button = document.getElementById(clicked_id)
            button.classList.remove("button--loading");
                
        })
        .catch(error => {
            console.error(error);
        });
      }
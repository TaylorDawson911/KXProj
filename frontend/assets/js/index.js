var config = {
    host: 'localhost',
    port: 8000
};


function search() {
    var username = $('#username').val();
    var amounts = $('#amounts').val();
    var params = new URLSearchParams({username});

    fetch(`http://${config.host}:${config.port}/api/v1/instagram?username=${username}&amounts=${amounts}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            length = Object.keys(data).length

            for (let i = 0; i < length; i++) {
                var user = Object.keys(data)[i]
                var username = data[user].username
                var fullname = data[user].full_name
                var followers = data[user].follower_count
                var following = data[user].following_count
                var profilepic = data[user].profile_pic_url
                if (data[user].is_private == true) {
                    var private = 'true <i class="fas fa-check-circle" style="color: #198754;"></i>'
                } else {
                   var private = 'false <i class="fas fa-times-circle" style="color: #dc3545;"></i>'
                }
                var messagebutton = `<button id="${username}" class="button" type="button" onclick="this.classList.toggle(&quot;button--loading&quot;); reply_click(this.id);"><span class="button__text">Message</span></button>
            `


                var profilelink = `<a href="https://www.instagram.com/${username}/">Go to Profile</a>`

                $("#myTable tbody").append(`<tr>
                    <td><img class="profile" crossorigin="anonymous" src="${profilepic}"> ${username}</div></td>
                    <td>${fullname}</td>
                    <td>${followers}</td>
                    <td>${following}</td>
                    <td>${private}</td>
                    <td>${messagebutton}</td>
                    <td>${profilelink}</td>

                </tr>`);

            }
        })
        .catch(error => {
            console.error(error);
        });
}


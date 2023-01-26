import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';


function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  function check() {
    console.log('check')
  // clear paginationList ul

   const postsPerPage = 10;
   const pageNumbers = []

    // get the total number of "tr" elements in the table
    const totalTr = document.querySelectorAll('#myTable tbody tr').length
    console.log('totalTr: ' + totalTr)
    // divide the total number of "tr" elements by the number of posts per page
    const totalPage = Math.ceil(totalTr / postsPerPage)
    console.log('totalPage: ' + totalPage)
    // create an array of page numbers
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i)
    }
    console.log('pageNumbers: ' + pageNumbers)
    // create a "li" element for each page number using pagination ul
    pageNumbers.forEach(number => {
      const li = document.createElement('li')
      li.className = 'page-item'
      li.innerHTML = `<a class="page-link" href="#">${number}</a>`
      document.getElementById('pagination').appendChild(li)
    })
    // add a function to each "li" element to display the correct page from react
    document.querySelectorAll('#pagination li').forEach(item => {
      item.addEventListener('click', event => {
        // get the page number from the "li" element
        const pageNumber = event.target.textContent
        console.log('pageNumber: ' + pageNumber)
        // set the current page to the page number
        setCurrentPage(pageNumber)
        paginate(pageNumber)
      })
    }
    )
  }

  function paginate(pageNumber) {
    // add an active class to the current page
    document.querySelectorAll('#pagination li').forEach(item => {
      item.classList.remove('active')
    })
    // try to add an active class to the current page
    try {
      document.querySelectorAll('#pagination li')[pageNumber - 1].classList.add('active')
    } catch (error) {
      console.log('error: ' + error)
    }
    
    
    // depending on the page number, display the correct posts
    const indexOfLastPost = pageNumber * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    // hide all posts
    document.querySelectorAll('#myTable tbody tr').forEach(item => {
      item.style.display = 'none'
    }
    )
    // show the posts for the current page
    for (let i = indexOfFirstPost; i < indexOfLastPost; i++) {
      document.querySelectorAll('#myTable tbody tr')[i].style.display = 'table-row'
    }

  }

     
  const theme = localStorage.getItem('data-theme')
  const follow = localStorage.getItem('follow')
  
  console.log('theme: ' + theme)
  if (theme === null) {
    console.log('theme is null')
    // if there is no saved 'data-theme' in local storage, use 'lightTheme'
    document.documentElement.setAttribute('data-theme', 'lightTheme')
    // save the data-theme to local storage
    localStorage.setItem('data-theme', 'lightTheme')
    console.log("Setting theme to 'lightTheme'")
  } else {
    console.log('theme is not null')
    // if there is a saved 'data-theme' in local storage, use it
    document.documentElement.setAttribute('data-theme', theme)
    console.log("Setting theme to '" + theme + "'")
    // set the value of the select element to the saved 'data-theme'
    // wait for the page to load before setting the value of the select element
    
    window.onload = () => {
      document.getElementById('username').value = localStorage.getItem('username')
      document.getElementById('message').value = localStorage.getItem('message')
      document.getElementById('amounts').value = localStorage.getItem('amounts')
      document.getElementById('theme').value = localStorage.getItem('data-theme')
      if (follow === 'true') {
        $("#follow").prop( "checked", true );
    }
  }
  }

  function randomName() {
    const names = [
      "Emma", "Noah", "Olivia", "Liam", "Ava", "Sophia", "Mason", "Isabella", "Jacob", "Mia",
      "William", "Charlotte", "Ethan", "Amelia", "James", "Harper", "Alexander", "Evelyn", "Michael", "Abigail",
      "Benjamin", "Emily", "Elijah", "Elizabeth", "Daniel", "Avery", "Matthew", "Ella", "Aiden", "Madison",
      "Henry", "Scarlett", "Joseph", "Victoria", "Jackson", "Aria", "Samuel", "Grace", "Sebastian", "Chloe",
      "David", "Addison", "Carter", "Natalie", "Wyatt", "Lily", "Jayden", "Aubree", "John", "Brooklyn"
    ];

    const randomName = names[Math.floor(Math.random() * names.length)];
    return randomName
  }

  function randomNum() {
    // create a random number
    const num = Math.floor(Math.random() * 100)
    return num
  }
  


  function dummyData() {
    // fill the table with dummy data and randomize the text 
    for (let i = 0; i < 10; i++) {
      $("#myTable tbody").append(`<tr>
        <td><img class="profile" crossorigin="anonymous" src="https://instagram.fybz1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120769772_108300487924841_667278562774183157_n.jpg?_nc_ht=instagram.fybz1-1.fna.fbcdn.net&_nc_ohc=9XW1g4jvL7MAX9gH1m-&tp=1&oh=6a5d5c5f6f8f3c5b6e7f1d2c2a8a6e5f&oe=5FFA0E3C"> username</div></td>
        <td>${randomName()}</td>
        <td>${randomNum()}</td>
        <td>${randomNum()}</td>
        <td>private</td>
        <td>messagebutton</td>
        <td>profilelink</td>
      </tr>`);
    }
    check()
    paginate(1)

    

  }

  function themeSwitch() {
    // log the value of the select element
    console.log(document.getElementById('theme').value)
    // set attribute data-theme to the value of the select element
    document.documentElement.setAttribute('data-theme', document.getElementById('theme').value)

  }
  function save() {
    const theme = document.getElementById('theme').value
    // see if checkbox is checked
    if (document.getElementById('follow').checked) {
      localStorage.setItem('follow', 'true')
      console.log('follow is checked')
    } else {
      localStorage.setItem('follow', 'false')
      console.log('follow is not checked')
    }
    // save the variables to local storage
    localStorage.setItem('username', document.getElementById('username').value)
    localStorage.setItem('message', document.getElementById('message').value)
    localStorage.setItem('amounts', document.getElementById('amounts').value)
    localStorage.setItem('data-theme', theme)
    console.log('saved')
  }
  function search() {
    var username = $('#username').val();
    var amounts = $('#amounts').val();
    var params = new URLSearchParams({username});

    fetch(`http://127.0.0.1:8000/api/v1/instagram?username=${username}&amounts=${amounts}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const len = Object.keys(data).length

            for (let i = 0; i < len; i++) {
                var user = Object.keys(data)[i]
                var username = data[user].username
                var fullname = data[user].full_name
                var followers = data[user].follower_count
                var following = data[user].following_count
                var profilepic = data[user].profile_pic_url
                if (data[user].is_private == true) {
                    var priv = 'true <i class="fas fa-check-circle" style="color: #198754;"></i>'
                } else {
                   var priv = 'false <i class="fas fa-times-circle" style="color: #dc3545;"></i>'
                }
                var messagebutton = `<button id="${username}" class="button" type="button" onclick="this.classList.toggle(&quot;button--loading&quot;); reply_click(this.id);"><span class="button__text">Message</span></button>
            `


                var profilelink = `<a href="https://www.instagram.com/${username}/">Go to Profile</a>`

                $("#myTable tbody").append(`<tr>
                    <td><img class="profile" crossorigin="anonymous" src="${profilepic}"> ${username}</div></td>
                    <td>${fullname}</td>
                    <td>${followers}</td>
                    <td>${following}</td>
                    <td>${priv}</td>
                    <td>${messagebutton}</td>
                    <td>${profilelink}</td>

                </tr>`);
                <div id="div"></div>

            }
            check()
            paginate(1)
        })
        .catch(error => {
            console.error(error);
        });
  }

  return (
    <div className="App">
<div>
  <div>
  <a role="button" className="button" href="#myModal" data-bs-toggle="modal">Settings</a>
  <button className="button" type="button" onClick={search}>Search</button>
    <div className="modal fade" role="dialog" tabIndex={-1} id="myModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Settings</h4><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <label className="plabel" htmlFor='username'>Targets Username</label>
            <input type="text" id="username" />
            <label className="plabel" htmlFor="message">Message to be sent</label>
            <input type="text" id="message" />
            <label className="plabel" htmlFor="amounts">How Many Results to page</label>
            <input type="number" id="amounts" />
            <br/>
            <label className="plabel" htmlFor="amounts">Theme</label>
            <select id="theme" className="theme-select" onChange={themeSwitch}>
              <option value="lightTheme">Light Mode</option>
              <option value="darkTheme">Dark Mode</option>
              <option value="leetTheme">1337</option>
            </select>
          <br/>
        <label className="plabel" htmlFor="follow">Follow Before Message?</label>
        <input className="checkbox" type="checkbox" id="follow" name="follow"/>
          </div>
          <div className="modal-footer"><button type="button" data-bs-dismiss="modal">Close</button>
          <button type="button" onClick={save}>Save</button></div>
        </div>
      </div>
    </div>
  </div>
<i className="fas fa-times-circle d-none" style={{color: '#dc3545'}} />
  <div className="table-responsive" id="myTable">
    <table className="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Full Name</th>
          <th>Followers</th>
          <th>Following</th>
          <th>Private?</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody />
    </table>
  </div>
  <div id="pagination">
    <ul id="paginationList" className="pagination">
    </ul>
    </div>
</div>
{/* <button className="button" type="button" onClick={dummyData}>Dummy Data</button>
<button className="button" type="button" onClick={check}>paginate</button> */}




    </div>
  );
}

export default App;

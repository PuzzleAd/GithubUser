


const form = document.getElementById("form");



form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const input = document.querySelector(".input");


    let inputValue = input.value.trim();
    inputValue = inputValue.split(" ").join("");

    const url = `https://api.github.com/users/${inputValue}`;

    fetch(url, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {

        const notFound = document.getElementById("not-Found");

        if(inputValue !== "") {

            if(data.message === "Not Found") {
                const buttonBox = document.getElementById("button-box");
                const button = document.getElementById("form-button");

                notFound.classList.add("not-Found-block");
                notFound.classList.remove("not-Found-none");

                
                buttonBox.insertBefore(notFound, button);
            }else {
                notFound.classList.remove("not-Found-block");
                notFound.classList.add("not-Found-none");
                getImgBio(data.avatar_url, data.bio);
                getUsername(data.name, data.login, data.created_at)
                getFollRes(data.following, data.followers, data.public_repos);
                locLinkTweetCompany(data.location, data.blog, data.twitter_username, data.company);
            }
        }
    })

});

function getUsername (user, nick, date) {
    const userP = document.getElementById("user-p");
    userP.textContent = user;

    const userA = document.getElementById("user-a");
    userA.textContent = nick;

    let monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
      ];
    
    let monthIndex = date.slice(5, 7);
    if(monthIndex[0] === "0") {
        monthIndex = monthIndex.slice(1);
    }
    date = `Joined ${date.slice(8, 10)} ${monthNames[monthIndex]} ${date.slice(0, 4)} `
      
    const dateP = document.getElementById("date-p")
    dateP.textContent = date;
}

function getImgBio (img, bio) {
    const img375 = document.querySelector(".img-375");
    const img1024 = document.querySelector(".img-1024");

    img1024.src = img;
    img375.src = img;

    const bio1 = document.getElementById("bio");
    if(bio === null) {
        bio1.textContent = "No bio avaliable";
    }else {
        bio1.textContent = bio;
    }
}

function getFollRes(folling, foller, repos) {
    const following = document.getElementById("following");
    following.textContent = folling

    const follower = document.getElementById("follower");
    follower.textContent = foller;

    const repository = document.getElementById("repos");
    repository.textContent = repos;
}

function locLinkTweetCompany (loc, link, tweet, com) {
    const location = document.getElementById("location-p");
    loc === null ? location.textContent = "Not Available" : location.textContent = loc;

    const blog = document.getElementById("link-p");
    link === "" ? blog.textContent === "Not Available" : blog.textContent = link;

    const tweeter = document.getElementById("tweeter-p");
    tweet === null ? tweeter.textContent = "Not Available" : tweeter.textContent = tweet;

    const company = document.getElementById("company-p");
    com === null ? company.textContent = "Not Available" : company.textContent = com;
}
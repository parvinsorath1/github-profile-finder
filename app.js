let searchBtn = document.querySelector(".search")
let usernameinp = document.querySelector(".usernameinp");

let card = document.querySelector(".card")

function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("User not found.")
    return raw.json();
  })
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(raw => {
    if (!raw.ok) throw new Error("Faild to fetch repos..")
    return raw.json()
  })
}

function showRepos(repos) {
  let html = `
    <div class="mt-6">
      <h3 class="text-xl font-semibold mb-2 text-indigo-700">Latest Repositories</h3>
      <ul class="list-disc pl-6 space-y-1">`;

  // bas 5 latest repo dikhayenge
  repos.slice(0, 5).forEach(repo => {
    html += `
      <li>
        <a href="${repo.html_url}" target="_blank" class="text-blue-600 hover:underline">
          ${repo.name}
        </a>
      </li>`;
  });

  html += `</ul></div>`;

  // repo list ko profile ke neeche add karo
  card.innerHTML += html;
}





function decorateProfileData(details) {
  console.log(details)
  let data = ` <div class="flex-shrink-0">
        <img 
          src="${details.avatar_url}" 
          alt="User Avatar" 
          class="w-40 h-40 rounded-full object-cover border-4 border-indigo-500"
        />
      </div>
            <!-- User Details -->
      <div class="flex-1">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-800">${details.name ? details.name : ""}</h2>
          <p class="text-gray-500">@${details.login}</p>
        </div>
        <p class="mt-2 text-gray-600">${details.bio ? details.bio : "Sorry there is no bio"}</p>
    
              <!-- Stats -->
        <div class="bg-gray-100 rounded-xl p-4 mt-4 grid grid-cols-3 gap-4 text-center text-sm font-medium text-gray-700">
          <div>
            <p class="text-lg font-bold text-indigo-600">${details.public_repos}</p>
            <p>Repos</p>
          </div>
          <div>
            <p class="text-lg font-bold text-indigo-600">${details.followers}</p>
            <p>Followers</p>
          </div>
          <div>
            <p class="text-lg font-bold text-indigo-600">${details.following}</p>
            <p>Following</p>
          </div>
         
        </div> 

        <!-- Additional Info -->
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
          <p><strong>Location:</strong> ${details.location ? details.location : "Not mentioned"}</p>
          <p><strong>Company:</strong> ${details.company ? details.company : "Not mentioned"}</p>
          
          
        </div>
      </div>



      `
  card.innerHTML = data;
}




searchBtn.addEventListener("click", function () {
  let username = usernameinp.value.trim()
  if (username.length > 0) {
    getProfileData(username)
      .then(data => decorateProfileData(data))
      .catch(err => alert(err.message));


    getRepos(username).then(repos => {
      showRepos(repos); // ye naya function banayenge
    });

  }
  else {
    alert("Please enter a valid username")
  }
})






















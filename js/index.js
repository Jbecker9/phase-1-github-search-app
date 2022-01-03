document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form")
    console.log("hi")
    form.addEventListener("submit", (e) => searchUser(e))
})

function searchUser(e){
    e.preventDefault()
    console.log(e.target.search.value)
    fetch(`https://api.github.com/search/users?q=${e.target.search.value}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json"
        },
    })
    .then(response => response.json()).then(obj =>{
    console.log(obj)
    const userList = document.getElementById("user-list")
    obj.items.forEach(item => {
        const li = document.createElement("li")
        li.innerText = item.login
        userList.append(li)
        li.addEventListener("click", () => {
            fetch(`${item.repos_url}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/vnd.github.v3+json"
                }
            })
        .then(response => response.json())
        .then(data => {
            const repoList = document.getElementById("repos-list")
            data.forEach((x) => {
                const repo = document.createElement('li')
                repoList.append(repo)
                repo.innerText = x.name
                // console.log(x.name)
            })
        })
        })
    })
    })
}



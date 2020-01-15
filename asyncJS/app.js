console.log("before")
let user = getUser(5, function(user) {
    console.log(user)
    getRepositories(user.name, (resultRepo) => {
        console.log(resultRepo)
    })
})
console.log("after")

function getUser(id, callback) {
    setTimeout(() => {
        user = {
            id: id,
            name: 'AkshayCHD'
        }
        callback(user);
    }, 2000);
}

function getRepositories(username, callback) {
    let repo = {
        "AkshayCHD" : {
            "folders" : 15   
        }
    }
    setTimeout(() => {
        let resultRepo = repo[username]
        if(!resultRepo) {
            callback("Not found")
        } else {
            callback(resultRepo)
        }
    }, 2000);
}
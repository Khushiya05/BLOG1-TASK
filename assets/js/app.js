let cl = console.log;

const blogFrom = document.getElementById("blogFrom");
const titleControl = document.getElementById("title");
const containtControl = document.getElementById("containt");
const bolgConataner = document.getElementById("bolgConataner");

let bolgArr = [{
    title: "Angular",
    containt: "i am angular"
}]

function createBlog(blogObj) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() >= .3 ? false : true;
            if (!err) {
                resolve(blogObj)
            } else {
                reject("something went wrong creating blog...")
            }
        }, 1500);
    })
    return promise
}

function readBlog() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() >= .3 ? false : true;
            if (!err) {
                resolve(bolgArr)
            } else {
                reject("something went wrong creating blog... try again")
            }
        }, 2000);

    })
    return promise
}

function templating(arr) {
    let result = ``;
    arr.forEach(blog => {
        result += `
        <div class="card mb-4">
        <div class="card-header">
             ${blog.title}
        </div>
        <div class="card-body">
            ${blog.containt}
        </div>
        <div class="card-footer">
            <button class="btn btn-success">Edit</button>
            <button class="btn btn-danger">Delete</button>
        </div>
    </div>
        `
    })
    bolgConataner.innerHTML = result;
}
const onBlogsub = (eve) => {
    eve.preventDefault();
    let obj = {
        title: titleControl.value,
        containt: containtControl.value.trim()
    }
    cl(obj)
    createBlog(obj)
        .then((res) => {
            bolgArr.push(res)
            return readBlog()
        })
        .then((res) => {
            templating(res);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch((err) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: err,
                showConfirmButton: false,
                timer: 1500
            })
        })
        .finally(() => {
            blogFrom.reset()
        })
}
blogFrom.addEventListener("submit", onBlogsub);
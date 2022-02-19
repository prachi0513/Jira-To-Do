const dialog = document.getElementById("dialog-b");
const add = document.getElementById("add");
const close = document.getElementById("close")
const task_box = document.getElementById("cont");
const title_text = document.getElementById("title_text");
const todo_title = document.getElementById("todo_title");
const error = document.querySelector(".error")
let editMode = -1;
let counter = 0;


// get the todos from local storage
let data = JSON.parse(localStorage.getItem("todos")) || [];

counter = data.length;

for (let i = 0; i < data.length; i++) {
    // add i the index
    let todo_text = `<div class="box" id="task_box" todo_id="${i}">
    <div class="box-header">
        <div class="heading">${data[i].title}</div>
        <div class="btn-container">
            <i class="fa fa-edit" style="font-size:24px"></i>
            <button id='cut' >x</button>
        </div>
    </div>
    <div class="text" id='text-in-box'>${data[i].text}</div>
    </div>` ;
    task_box.innerHTML = task_box.innerHTML + todo_text;
}
deleteItem()

add.addEventListener("click", function () {
    dialog.style.display = 'flex';
})

close.addEventListener("click", function () {
    dialog.style.display = 'none';
    error.classList.add("off");
    title_text.value = "";
    todo_title.value = "";
    // todo__text.value = "";
    // title.value = "";
})



// add functionallity //

function addtask() {
    if (title_text.value !== "" && todo_title.value !== "") {
        let todos = JSON.parse(localStorage.getItem("todos")) || [];

        if (editMode !== -1) {
            // update the old data
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id == editMode) {
                    todos[i].title = title_text.value;
                    todos[i].text = todo_title.value;
                }
            }
            // set the new data to local storage
            localStorage.setItem("todos", JSON.stringify(todos));

            // set it on the view
            let todo = document.querySelector(`[todo_id='${editMode}']`);
            todo.querySelector(".heading").innerText = title_text.value;
            todo.querySelector(".text").innerText = todo_title.value;
            editMode = -1;
            dialog.style.display = "none";
            return;
        }

        let todo_text = `<div class="box" id="task_box" todo_id="${counter}">
        <div class="box-header">
        <div class="heading">${title_text.value}</div>
        <div class="btn-container">
           <i class="fa fa-edit" style="font-size:24px" ></i>
            <button id='cut'>x</button>
        </div>
        </div>
       <div class="text" id='text-in-box'>${todo_title.value}</div>
      </div>` ;
        task_box.innerHTML = task_box.innerHTML + todo_text;

        deleteItem()
        //getting existing todos

        todos.push({
            id: counter,
            title: title_text.value,
            text: todo_title.value
        });
        counter = counter + 1;

        // set the new push todo  
        localStorage.setItem("todos", JSON.stringify(todos));
        title_text.value = "";
        todo_title.value = "";
        dialog.style.display = 'none';
    } else {
        error.classList.remove("off");

    }
}



// delete functionallity//

function deleteItem() {
    const delArr = document.querySelectorAll("#cut");
    const editarr = document.querySelectorAll(".btn-container i");
    // console.log(editarr);
    for (let i = 0; i < delArr.length; i++) {
        delArr[i].addEventListener("click", function (e) {
            let todo = e.target.closest(".box");
            // console.log(todo);
            let id = todo.getAttribute('todo_id');
            console.log(`id of post ${id}`);
            let data = JSON.parse(localStorage.getItem("todos"));
            // console.log(data);
            let newData = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].id != id) {
                    newData.push(data[i]);
                }
            }
            console.log(newData);
            localStorage.setItem("todos", JSON.stringify(newData));
            todo.classList.add("off");
        })


        // console.log(editarr);
        editarr[i].addEventListener("click", function (e) {
            dialog.style.display = "flex";
            let todo = e.target.closest("#task_box")
            console.log(todo);
            let id = todo.getAttribute("todo_id");
            editMode = id;
            title_text.value = todo.querySelector(".heading").innerText;
            todo_title.value = todo.querySelector(".text").innerText;

        })

    }


}
deleteItem();

let taskData = [];
const server = 'http://localhost:3000/tasks/';
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let taskTitle = document.querySelector('#title');
let taskNote = document.querySelector('#note');
let taskDuedate = document.querySelector('#date');
let taskImportance = document.querySelector('#importance');

function getData() {
    fetch(server)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            const tasks = { tasks: data };
            taskData = tasks.tasks;
            getTemplate();
        });
}
getData();

function clearForm() {
    taskTitle.value = '';
    taskNote.value = '';
    taskDuedate.value = '';
    document.querySelector('#update').style.display = 'none';
    document.querySelector('#save').style.display = 'block';
};

function getTemplate() {
    let storedTemplate = window.localStorage.getItem('Template');
    if (storedTemplate === 'finished') {
        justFinished();
    } else if (storedTemplate === 'pending') {
        justUndone();
    } else if (storedTemplate === 'byFinishDate') {
        FinishDate();
    } else if (storedTemplate === 'byCreatedDate') {
        createdDate();
    } else {
        byImportance();
    }
};

function pushData() {
    const importanceValue = document.querySelector('#importance').value;
    let dDate = new Date(taskDuedate.value);
    let day = dDate.getDate();
    let year = dDate.getFullYear();
    let today = new Date().toLocaleDateString('de-DE');

    fetch(server, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "title": taskTitle.value,
            "note": taskNote.value,
            "importance": (() => {
                if (importanceValue === 'high') { return 3 + ' high' };
                if (importanceValue === 'medium') { return 2 + ' medium' };
                if (importanceValue === 'low') { return 1 + ' low' };
            })(),
            "dueDate": taskDuedate.value,
            "dueDateDay": day,
            "dueDateMonth": months[dDate.getMonth()],
            "dueDateYear": year,
            "created": today,
            "done": false
        })
    })
    setTimeout(getData, 10)
};

function deleteTask() {
    if (event.target.classList.contains('delete')) {
        let confirmDelete = confirm('Wollen Sie diesen Task wirklich löschen');
        if (confirmDelete == true) {
            const itemKey = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
            fetch(server + itemKey, {
                method: 'DELETE'
            })
            setTimeout(getData, 10)
        }
    }
};

function checkTask(event) {
    if (event.target.classList.contains('check')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.dataset.id;
        if (event.target.classList.contains('false')) {
            fetch(server + itemKey, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "done": true }),
            })

            setTimeout(getData, 50)

        } else {
            fetch(server + itemKey, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "done": false }),
            })
            setTimeout(getData, 50)
        }
    }
};

function editTask(event) {
    if (event.target.classList.contains('edit')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id
        const fillTitle = event.target.parentElement.parentElement.parentElement.children[0].innerText
        const fillNote = event.target.parentElement.parentElement.parentElement.children[1].innerText
        const fillImportance = event.target.parentElement.parentElement.parentElement.parentElement.classList[2]
        const fillDuedate = event.target.parentElement.parentElement.parentElement.parentElement.dataset.date

        document.querySelector('#modalForm').style.left = '0';
        document.querySelector('#save').style.display = 'none';
        document.querySelector('#update').style.display = 'block';
        document.querySelector('#key').value = itemKey;

        taskImportance.value = fillImportance;
        taskTitle.value = fillTitle;
        taskNote.value = fillNote;
        taskDuedate.value = fillDuedate;
    }
};

function updateTask() {
    const itemKey = document.querySelector('#key').value;
    const importanceValue = document.querySelector('#importance').value;
    const dDate = new Date(taskDuedate.value);
    let day = dDate.getDate();
    let month = dDate.getMonth() + 1;
    let year = dDate.getFullYear();

    fetch(server + itemKey, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "title": taskTitle.value,
            "note": taskNote.value,
            "importance": (() => {
                if (importanceValue === 'high') { return 3 + ' high' };
                if (importanceValue === 'medium') { return 2 + ' medium' };
                if (importanceValue === 'low') { return 1 + ' low' };
            })(),
            "dueDate": taskDuedate.value,
            "dueDateDay": day,
            "dueDateMonth": months[dDate.getMonth()],
            "dueDateYear": year,
            "created": new Date().toLocaleDateString('de-DE'),
            "done": false
        })
    });
    setTimeout(getData, 10)
};
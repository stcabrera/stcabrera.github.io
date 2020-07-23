let saveButton = document.querySelector('#save');
let updateButton = document.querySelector('#update');

container.addEventListener('click', checkTask);
container.addEventListener('click', deleteTask);
container.addEventListener('click', editTask);

saveButton.addEventListener("click", () => {
    if (taskTitle.value != '' && taskNote.value != '' && taskDuedate.value != '') {
        document.querySelector('#modalForm').style.left = '-100%';
        pushData();
        clearForm();
    } else {
        alert('The form is incomplete')
    }
});

updateButton.addEventListener('click', () => {
    if (taskTitle.value != '' && taskNote.value != '' && taskDuedate.value != '') {
        document.querySelector('#modalForm').style.left = '-100%';
        updateTask();
        clearForm();
    } else {
        alert('The form is incomplete')
    }
});

document.querySelector('#sortFinished').addEventListener('click', () => {
    clearFilterButtons();
    document.querySelector('#sortFinished').classList.add('activeFilter');
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        justFinished();
        container.removeAttribute('class', 'rotation')
    }, 300)
    window.localStorage.setItem('Template', 'finished');
});

document.querySelector('#sortPending').addEventListener('click', () => {
    clearFilterButtons();
    document.querySelector('#sortPending').classList.add('activeFilter');
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        justUndone();
        container.removeAttribute('class', 'rotation')
    }, 300)
    window.localStorage.setItem('Template', 'pending');
});

document.querySelector('#sortFinishDate').addEventListener('click', () => {
    clearFilterButtons();
    document.querySelector('#sortFinishDate').classList.add('activeFilter');
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        FinishDate();
        container.removeAttribute('class', 'rotation')
    }, 300)
    window.localStorage.setItem('Template', 'byFinishDate');
});

document.querySelector('#sortcreatedDate').addEventListener('click', () => {
    clearFilterButtons();
    document.querySelector('#sortcreatedDate').classList.add('activeFilter');
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        createdDate();
        container.removeAttribute('class', 'rotation')
    }, 300)
    window.localStorage.setItem('Template', 'byCreatedDate');
});

document.querySelector('#sortIMP').addEventListener('click', () => {
    clearFilterButtons();
    document.querySelector('#sortIMP').classList.add('activeFilter');
    container.setAttribute('class', 'rotation')
    setTimeout(() => {
        byImportance();
        container.removeAttribute('class', 'rotation')
    }, 300)
    window.localStorage.setItem('Template', 'byImportance');
});
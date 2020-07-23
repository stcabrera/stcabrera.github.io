const container = document.querySelector('#container');
const source = document.querySelector('#task-list-template').innerHTML;
const template = Handlebars.compile(source);
const source2 = document.querySelector('#task-list-done-template').innerHTML;
const template2 = Handlebars.compile(source2);
const source3 = document.querySelector('#task-list-undone-template').innerHTML;
const template3 = Handlebars.compile(source3);

function FinishDate() {
    (function renderTasksFinishDate() { container.innerHTML = template(() => { return [...taskData].sort(compareTasks); }); })();

    function compareTasks(t1, t2) {
        if (t1.dueDate < t2.dueDate) { return -1 }
        if (t1.dueDate > t2.dueDate) { return 1 }
        return 0;
    }
}

function byImportance() {
    (function renderTasksASC() { container.innerHTML = template(() => { return [...taskData].sort(compareTasks); }); })();

    function compareTasks(t1, t2) {
        if (t1.importance > t2.importance) { return -1 }
        if (t1.importance < t2.importance) { return 1 }
        return 0;
    }
}


function createdDate() {
    (function renderTaskscreatedDate() { container.innerHTML = template(() => { return [...taskData].sort(compareTasks); }); })();

    function compareTasks(t1, t2) {
        if (t1.created < t2.created) { return -1 }
        if (t1.created > t2.created) { return 1 }
        return 0;
    }
}


function justFinished() {
    (function renderTaskscreatedDate() { container.innerHTML = template2(() => { return [...taskData].sort(compareTasks); }); })();

    function compareTasks(t1, t2) {
        if (t1.dueDate < t2.dueDate) { return -1 }
        if (t1.dueDate > t2.dueDate) { return 1 }
        return 0;
    }
}

function justUndone() {
    (function renderTaskscreatedDate() { container.innerHTML = template3(() => { return [...taskData].sort(compareTasks); }); })();

    function compareTasks(t1, t2) {
        if (t1.dueDate < t2.dueDate) { return -1 }
        if (t1.dueDate > t2.dueDate) { return 1 }
        return 0;
    }
}
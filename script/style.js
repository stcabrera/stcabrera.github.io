let darkButton = document.querySelector('#colorChangerDark');
let lightButton = document.querySelector('#colorChangerLight');
let button = document.querySelector('#add');
let closeButton = document.querySelector('.closeForm');
let date = new Date();
let year = date.getFullYear();

darkButton.addEventListener('click', () => {
    window.localStorage.setItem('darkMode', 'on');
    changeColor();
});
lightButton.addEventListener('click', () => {
    window.localStorage.setItem('darkMode', 'off');
    changeColor();
});

closeButton.addEventListener("click", function() {
    document.querySelector('#modalForm').style.left = '-100%';
    clearForm();
});

button.addEventListener("click", function() {
    document.querySelector('#modalForm').style.left = '0';
});

function changeColor() {
    let storedColorMode = window.localStorage.getItem('darkMode');
    let body = document.body;
    let top = document.querySelector('.top');
    let form = document.querySelector('.modalFormInner')
    if (storedColorMode === 'on') {
        darkButton.style.display = 'none';
        lightButton.style.display = 'block';
        body.classList.toggle('darkMode');
        top.classList.toggle('darkModeTop');
        form.classList.toggle('formDark');
    } else {
        darkButton.style.display = 'block';
        lightButton.style.display = 'none';
        body.classList.remove('darkMode');
        top.classList.remove('darkModeTop');
        form.classList.remove('formDark')
    }
};
changeColor();

function clearFilterButtons() {
    document.querySelector('#sortPending').classList.remove('activeFilter');
    document.querySelector('#sortFinished').classList.remove('activeFilter');
    document.querySelector('#sortFinishDate').classList.remove('activeFilter');
    document.querySelector('#sortcreatedDate').classList.remove('activeFilter');
    document.querySelector('#sortIMP').classList.remove('activeFilter');
}

(() => {
    let copyDiv = document.querySelector('.copy');
    copyDiv.innerHTML = '©' + year + ' Stephan Cabrera <br> CASFEE2020 <br> Projekt 1'
})();
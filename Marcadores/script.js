const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container')

let bookmarks = [];


// mostrar modal y focalicalizar en el primer input
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}


modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', ()=> modal.classList.remove('show-modal'));
window.addEventListener('click', (e)=> (e.target === modal ? modal.classList.remove('show-modal') : false));

function validate(nameValue, urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!nameValue || !urlValue){
        alert('Por favor ingrese valores para ambos campos');
        return false;
    }    

    if(!urlValue.match(regex)){
        alert("Por favor ingrese una direcccion valida");
        return false;
    }
    return true;
}
function buildBookmarks(){
    bookmarksContainer.textContent = '';
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark;
        //item
        const item = document.createElement('div');
        item.classList.add('item');
        //cerrar icono
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas','fa-times');
        closeIcon.setAttribute('title', 'Borrar Marcador');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        // favicon container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        //favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        //link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        // 
        linkInfo.append(favicon,link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);

    });
}


function fetchBookmarks(){
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else{
        bookmarks = [
            {
                name: 'Nahuel',
                url: 'https://nahuelfrustaglia.com.ar'
            }
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}


function deleteBookmark(url){
    bookmarks.forEach((bookmark, i) =>{
        if(bookmark.url === url){
            bookmarks.splice(i, 1);
        }
    });
    //
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if(!urlValue.includes('http://','https://')){
        urlValue = `https://${urlValue}`;
    }
    if(!validate(nameValue, urlValue)){
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    }
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
    
}


bookmarkForm.addEventListener('submit', storeBookmark);
fetchBookmarks();
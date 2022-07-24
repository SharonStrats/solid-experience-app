// https://www.youtube.com/watch?v=RHQfmpBEKf8
// HTML
<div id="context-menu">
<div className="item">
    <i className="fa fa-clone">Clone...</i>
</div>
</div>

//CSS
/*
body {
    margin: 0px;
    font-family: "Open Sans", sans-serif;
}
#context-menu {
    position: fixed;
    z-index: 10000;
    width: 150px;
    background: #1b1a1a;
    transform:scale(0);
    transform-origin: top left;
}
#context-menu.active {
    transform:scale(1);
    transition:transform 200ms ease-in-out;
}
#context-menu .item {
    padding: 8px 10px;
    font-size: 15px;
    color: #eee;
}
#context-menu .item:hover {
    background: #555;
}
#context-menu .item i {
    display: inline-block;
    margin-right: 5px;
}
#context-menu hr {
   margin: 2px 0px;
   border-color: #555;
}
*/

//JS
window.addEventListener("contextmenu", function(event){
    event.preventDefault();
    const contextElement = document.getElementById("context-menu");
    // look at pageY and pageX or different ways of doing the offset.
    if (contextElement) {
        contextElement.style.top = event.offsetY + "px";
        contextElement.style.left = event.offsetX + "px";
        contextElement.classList.add('active')
    }
});
window.addEventListener("click", function() {
    document.getElementById("context-menu")?.classList.remove("active")
})
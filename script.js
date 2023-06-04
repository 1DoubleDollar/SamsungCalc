const input = document.querySelectorAll('input');

input.forEach((e)=>{e.addEventListener('click',() => {
    if(e.id === 'equalTo')
    {   e.style.backgroundColor = "rgb(0,251,0)";
        e.style.transform = "scale(0.9)";
        setTimeout(() => {
            e.style.transform= "scale(1)";
            e.style.backgroundColor = "rgb(0, 202, 0)";
        }, 100);
    }
    else if(e.id=== 'backspace')
    {  
         e.style.backgroundColor = "#4e4e4e";

        e.style.transform = "scale(0.9)";
        setTimeout(() => {
            e.style.background = "transparent";
            e.style.transform= "scale(1)";
        }, 100);
    }
    else if(e.id === 'evalution')
    {
        e.background= "black";
        
    }
    else
    {   e.style.backgroundColor = "#4e4e4e";
        e.style.transform = "scale(0.9)";
        setTimeout(() => {
            e.style.transform= "scale(1)";
            e.style.backgroundColor = "#212121";
        }, 100);
    }
    })
});
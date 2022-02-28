const gradientMain = document.querySelector('.gradient-top');
const footerMain = document.getElementsByClassName('butHolder');
const randomizeButt =  document.querySelector('#mainButton');
const linearButt = document.querySelector('#linear-gradient');
const radialButt = document.querySelector('#radial-gradient');
const showLogButton = document.querySelector('.log');

const gradientCurrent = gradientMain.style.background;

const min = 0;
const max = 255;

gradientLog = [];
itemObj = {};

let ng = 0;
let gradtype = true;

randomizeButt.focus();

const getGradient = function(randGrad, typeGradient) {
    let gradFirst = randGrad.slice(0, 3).toString();
    let gradSec = randGrad.slice(3).toString();

    let type = `${typeGradient}`;

    switch (gradtype) {
        case true :
        gradCreated = {typ:`${type}`, grad1:`${gradFirst}`, grad2:`${gradSec}`};
        case false:
            gradCreated = {typ:`${type}`, grad1:`${gradFirst}`, grad2:`${gradSec}`};
    }

    gradientLog.push(gradCreated);
    gradientMain.style.background = `${gradientLog[ng].typ}(rgb(${gradientLog[ng].grad1}) 0%, rgb(${gradientLog[ng].grad2}) 100%)`;

    ++ng;  
}

const typeOfGradient =  () => {
    
    const defaul = 'linear-gradient';
    const linear = 'linear-gradient';
    const radial = 'radial-gradient';
    let type = defaul;
    if (gradtype === true) {
        type = linear;
        
    } else if (gradtype === false){
        type = radial;
    }
    return type;
    
}

const typeGradSwitcherHandler = (typeOfGradient) => {
    if (typeOfGradient === 'linear') {
        gradtype = true;
        return gradtype;
    } else if (typeOfGradient === 'radial') {
        gradtype = false;
        return gradtype;
    } else {
        gradtype = true;
    }
}

const instaUpdaterHandler = (type) => {
    type = type
    
    if (type == false) {
        gradientMain.style.background = gradientMain.style.background.replace('linear', 'radial');
        randomizeButt.focus();
        return;
    } else if (type == true) {
        gradientMain.style.background = gradientMain.style.background.replace('radial', 'linear');
        randomizeButt.focus();
        return;
    }
    console.log('update me pls');
}


const randomGradient = (min, max) => {
    const arrayHex =[];
    for (let i = 0; i < 6; i++) {
        let arrItem = Math.floor(Math.random() * (max - min) + min);
        arrayHex.push(arrItem);
    }
return arrayHex;

}

const randButtHandler= () => {
    getGradient(randomGradient(0, 255), typeOfGradient());
}

randomizeButt.addEventListener('click', randButtHandler);
linearButt.addEventListener('click', () => {typeGradSwitcherHandler('linear'); instaUpdaterHandler(true) }, );
radialButt.addEventListener('click', function() {typeGradSwitcherHandler('radial'); instaUpdaterHandler(false)});

window.onload = () => {
    gradientMain.style.background = 'black';
    

};


const creatingLogElement = () => {
    const numberOfLogged = document.getElementById('number-log');
    const numberOfGradients = document.querySelectorAll('li').length;
    const gradientEl = document.createElement('li');

    gradientEl.innerHTML = 
    `<div class="li-style" style="background: ${gradientLog[ng-1].typ}(rgb(${gradientLog[ng-1].grad1}) 0%, rgb(${gradientLog[ng-1].grad2}) 100%);"></div>
    <p> ${gradientLog[ng-1].typ} </p>
    <p> rgb(${gradientLog[ng-1].grad1}) rgb(${gradientLog[ng-1].grad2}) </p>
    `;

    const listOfLog = document.querySelector('ul');
    listOfLog.append(gradientEl);

    numberOfLogged.style.display = 'flex';
    numberOfLogged.innerHTML = numberOfGradients + 1;
};

// Creating visible selection for created log elements
document.getElementById("log-history").addEventListener('mouseover', ()=> {
    document.querySelectorAll('.log-holder li').forEach(elem => { 
        elem.addEventListener('mouseenter', () => {
            elem.classList.add('li-selected');
        });

        elem.addEventListener('mouseleave', () => {
            elem.classList.remove('li-selected');
        });

        elem.addEventListener('click', function() {
        gradientMain.style.background = elem.querySelector('li div').style.background;
    })});

})

randomizeButt.addEventListener('click', creatingLogElement);

//scrolling horizontal

const scrollToLog = document.getElementById("log-history");
  
window.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
        scrollToLog.scrollLeft += 20;
    }else { 
        scrollToLog.scrollLeft -= 20;
    }
});
    

// При нажатии кнопки лога до рандомайза, выскакивает крестик закрытия ;(
const closingLogHistory = () => {
    const logHolder = document.getElementById('log-history');
    if(logHolder.className === 'log-holder-invisible') {
        logHolder.className = 'log-holder';
        randomizeButt.focus();
    } else {
        logHolder.className = 'log-holder-invisible';
        randomizeButt.focus();
    }
}

showLogButton.addEventListener('click', closingLogHistory);
document.querySelector('.close-holder svg').addEventListener('click', closingLogHistory);

const copyLoggedGradient = () => {
    
   const gradElem = document.querySelector('ul').lastChild;
   gradElem.addEventListener('click', () => {

    //checking for clipboard API support
    if(navigator.clipboard){
        const dataToCopy = gradElem.querySelector('div').style.background;
            //Copynig to a clipboard
            const localDiv = document.createElement('div');
            localDiv.className = 'local-storage';
            localDiv.textContent = dataToCopy;
            const text = localDiv.textContent; 
            navigator.clipboard.writeText(text);
    } else {
        alert('cant copy instantly, use yours mouse :(')
    }

            //antispam notifer 'copied!' protection
            const chekTheCopied = gradElem.querySelectorAll('a').length;
            if(chekTheCopied <1) {
                const popUpNoteOfCopyed =  document.createElement('a');
                popUpNoteOfCopyed.className = 'popUp';
                popUpNoteOfCopyed.textContent = 'Copied!';
                gradElem.querySelector('div').append(popUpNoteOfCopyed);

                gradElem.addEventListener('mouseleave', function() {
                    popUpNoteOfCopyed.className = 'popUpDissapear';
                });
                setTimeout(() => {popUpNoteOfCopyed.remove()}, 2000);
            } else {
                return;
            }

    })
};

randomizeButt.addEventListener('click', copyLoggedGradient);
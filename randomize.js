const gradientMain = document.querySelector('.gradient-top');
const footerMain = document.getElementsByClassName('butHolder');
const randomizeButt =  document.querySelector('#mainButton');
const linearButt = document.querySelector('#linear-gradient');
const radialButt = document.querySelector('#radial-gradient');
const showLogButton = document.querySelector('.log');

// const getScroll = document.querySelector('ul');

const gradientCurrent = gradientMain.style.background;

const min = 0;
const max = 255;

gradientLog = [];
itemObj = {};

let ng = 0;
let gradtype = true;

randomizeButt.focus();
// getScroll.scroll(0, 100);



// const getGradient = function(randGrad, typeGradient) {
//     let gradFirst = randGrad.slice(0, 3).toString();
//     let gradSec = randGrad.slice(3).toString();
//     let type = typeGradient;
//     let gradCreated = `${type}(0deg, rgb(${gradFirst}) 0%, rgb(${gradSec}) 100%)`;
//     // console.log(gradCreated);

//     gradientLog.push(gradCreated);
//     console.log(gradientLog);

//     gradientMain.style.background = gradCreated;
// };

const getGradient = function(randGrad, typeGradient) {
    let gradFirst = randGrad.slice(0, 3).toString();
    let gradSec = randGrad.slice(3).toString();

    let type = `${typeGradient}`;
    // let gradCreated = `${type}(0deg, rgb(${gradFirst}) 0%, rgb(${gradSec}) 100%)`;
    // console.log(gradCreated);
    // console.log(type)

    switch (gradtype) {
        case true :
        // gradCreated = {typ: `${type}`, grad: ` rgb(${gradFirst}) 0%, rgb(${gradSec}) 100%)`};
        gradCreated = {typ:`${type}`, grad1:`${gradFirst}`, grad2:`${gradSec}`};
        // break;
        case false:
            // gradCreated = {typ: `${type}`, grad: `rgb(${gradFirst}) 0%, rgb(${gradSec}) 100%)`};
            gradCreated = {typ:`${type}`, grad1:`${gradFirst}`, grad2:`${gradSec}`};
            // break;
    }


    gradientLog.push(gradCreated);
    // console.log(gradientLog);
    
    gradientMain.style.background = `${gradientLog[ng].typ}(rgb(${gradientLog[ng].grad1}) 0%, rgb(${gradientLog[ng].grad2}) 100%)`;

    ++ng;
    
    // console.log(ng);
    
}



// типа так и работает стрелка?
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
    // console.log(type);
    return type;
    
}

// typeOfGradient();

const typeGradSwitcherHandler = (typeOfGradient) => {
    if (typeOfGradient === 'linear') {
        gradtype = true;
        // console.log(gradtype);
        return gradtype;
    } else if (typeOfGradient === 'radial') {
        gradtype = false;
        // console.log(gradtype);
        return gradtype;
    } else {
        gradtype = true;
    }
}

const instaUpdaterHandler = (type) => {
    type = type
    
    if (type == false) {

  
        gradientMain.style.background = gradientMain.style.background.replace('linear', 'radial');
        // gradientMain.style.background = gradientMain.style.background.replace('0deg,', '');
        console.log(gradientMain.style.background);

        randomizeButt.focus();
        return;
    // console.log(gradientMain.style.background);

    } else if (type == true) {

        gradientMain.style.background = gradientMain.style.background.replace('radial', 'linear');
        // const currentGradient = gradientMain.style.background;
        // currentGradient.replace('radial', 'linear');
    
        // // currentGradient.replace('0deg,', '');
        // console.log(currentGradient);
        // // return gradientMain.style.background = currentGradient;
        // console.log('Linear should be working')

        randomizeButt.focus();
        return;
    }
    // console.log(currentGradien);
    console.log('update me pls');
}


const randomGradient = (min, max) => {
    const arrayHex =[];
    for (let i = 0; i < 6; i++) {
        let arrItem = Math.floor(Math.random() * (max - min) + min);
        arrayHex.push(arrItem);
        // console.log(arrayHex);
    }
// console.log(arrayHex);
return arrayHex;

}

const randButtHandler= () => {
    getGradient(randomGradient(0, 255), typeOfGradient());
    // alert('Button was clicked');
}

randomizeButt.addEventListener('click', randButtHandler);
linearButt.addEventListener('click', () => {typeGradSwitcherHandler('linear'); instaUpdaterHandler(true) }, );
radialButt.addEventListener('click', function() {typeGradSwitcherHandler('radial'); instaUpdaterHandler(false)});

window.onload = () => {
    gradientMain.style.background = 'black';
    

};

// Creating gradient log history

// const gradientLogHandler = () => {
//     const numOfGradient = gradientLog.length;
    
// }

const creatingLogElement = () => {
    const numberOfLogged = document.getElementById('number-log');
    const numberOfGradients = document.querySelectorAll('li').length;
    // console.log(ng);
    const gradientEl = document.createElement('li');
    // gradientEl.className = 'log-item';
    gradientEl.innerHTML = 
    `<div class="li-style" style="background: ${gradientLog[ng-1].typ}(rgb(${gradientLog[ng-1].grad1}) 0%, rgb(${gradientLog[ng-1].grad2}) 100%);"></div>
    <p> ${gradientLog[ng-1].typ} </p>
    <p> rgb(${gradientLog[ng-1].grad1}) rgb(${gradientLog[ng-1].grad2}) </p>
    `;

    const listOfLog = document.querySelector('ul');
    listOfLog.append(gradientEl);
    // console.log(ng);

    numberOfLogged.style.display = 'flex';

    // console.log(typeof numberOfGradients);
    numberOfLogged.innerHTML = numberOfGradients + 1;
 


};

// Creating visible selection of created log elements
document.getElementById("log-history").addEventListener('mouseover', ()=> {
    document.querySelectorAll('.log-holder li').forEach(elem => { 
        // console.log(elem);
        elem.addEventListener('mouseenter', () => {
            // elem.style.background = 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))'
            elem.classList.add('li-selected');
            // setTimeout(function() {
        //     elem.style.background = 'purple';
        // }, 500);
        });

        elem.addEventListener('mouseleave', () => {
            // elem.style.background = ''
            elem.classList.remove('li-selected');
        });

        elem.addEventListener('click', function() {
            // console.log(elem.querySelector('li div'));
        gradientMain.style.background = elem.querySelector('li div').style.background;
    })});

})

// document.querySelectorAll('.log-holder li').forEach(elem => { 
//     // console.log(elem);
//     elem.addEventListener('click', function() {
//         // console.log(elem.querySelector('li div'));
//     gradientMain.style.background = elem.querySelector('li div').style.background;
// })});


randomizeButt.addEventListener('click', creatingLogElement);

//scrolling horizontal

const scrollToLog = document.getElementById("log-history");

  
window.addEventListener("wheel", function (e) {
        // e.preventDefault();
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
        // closingLogBlock.style.display = 'block';
    } else {
        logHolder.className = 'log-holder-invisible';
        randomizeButt.focus();
        // closingLogBlock.style.display = 'none';
    }
}

showLogButton.addEventListener('click', closingLogHistory);
document.querySelector('.close-holder svg').addEventListener('click', closingLogHistory);

const logLenghtUpdateHandler = () => {
    const numberOfLogged = document.getElementById('number-log');
    


}
const fruits = ['img/abricot.png','img/banane.png','img/kiwi.jpg','img/orange.jpg','img/pomme.png','img/poire.jpg','img/ananas.jpg','img/cerise.jpg','img/raisin.jpg'];
const CPPLeaders = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg','img/6.jpg','img/7.jpg']
const frozen = ['img/elsa.jpg','img/anna.jpg','img/olaf.png','img/kristoff.jpg','img/sven.png','img/hans.png']

const booSounds = ['sound/boo.mp3','sound/boo2.mp3','sound/boo3.mp3'];

const themeSelect = document.getElementById('theme-select');
const cards = document.querySelector('.cards');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

const createGame = (arrayOfItems) => {

    cards.innerHTML = ''; // delete all childs from card if user selects another theme

    const stats = {
        wins:0,
        currentImg: '',
        currentId:'',
        count:0,
        tries:0,
        clickable:true
    };

    
    if(stats.tries===0){
        document.querySelector('.score').style.visibility = "hidden";
    } else document.querySelector('.score').style.visibility = "visible";

    var previousImg;

    for(let i=0;i<2;i++){
        shuffle(arrayOfItems);
        arrayOfItems.map(item => {
            const cardItem = document.createElement('div');
            cardItem.classList.add('.cardItem');
            const defaultImg = document.createElement('img');
            defaultImg.src = 'img/questionMark.png';
            defaultImg.classList.add(item);
            defaultImg.id = Math.floor(Math.random() * Math.floor(10000));
            cardItem.appendChild(defaultImg);
            cards.appendChild(cardItem);

            defaultImg.addEventListener('click',function clicked(){
                const imgSrc = defaultImg.classList[0];


                if(defaultImg.classList[1] === "toRemove"){
                    defaultImg.removeEventListener('click',clicked,true);
                    return;
                }


                stats.count += 1;
                if(stats.count===2){
                    stats.tries += 1;
                    stats.count = 0;
                    document.querySelector('.tries').innerHTML = `TRIES : ${stats.tries}`;
                }
                // if first img
                if (!stats.currentImg && stats.clickable === true){
                    console.log('first case')
                    stats.currentImg = defaultImg.classList[0];
                    stats.currentId = defaultImg.id;
                    defaultImg.src = imgSrc;
                    previousImg = defaultImg;



                } else if(stats.clickable ===false){
                    return false;
                }  
                else if (stats.currentImg === defaultImg.classList[0] && stats.currentId !== defaultImg.id){
                    console.log('case 3')

                    let clap = new Audio('sound/applause.mp3');
                    clap.play();  

                    stats.wins = stats.wins+1;
                    document.querySelector('.hits').innerHTML = `HIT${stats.wins>1?"S":""} : ${stats.wins} `;
                    console.log(stats.wins);
                    stats.currentImg = "";
                    stats.currentId = "";
                    defaultImg.src = imgSrc;
                    defaultImg.removeEventListener('click',clicked,true);
                    // previousImg.removeEventListener('click',clicked,true);
                    previousImg.classList.add('toRemove');
                    // previousImg = undefined;
                    


                } else if(stats.currentImg !== defaultImg.classList[0]){
                    console.log('case 4')

                    let randomBoo = Math.floor(Math.random() * Math.floor(2));
                    console.log('randomBoo : ' +randomBoo)
                    if(randomBoo===1){
                            shuffle(booSounds);
                            let boo = new Audio(booSounds[0]);
                            boo.play(); 
                        }

                    stats.clickable = false;

        
                    stats.currentImg = "";
                    stats.currentId = "";
                    defaultImg.src = imgSrc;

                    setTimeout(()=>{
                        defaultImg.src = 'img/questionMark.png';
                        previousImg.src = 'img/questionMark.png';
                        stats.clickable = true;

                    },1000);
                    
                    


                }

                if(stats.wins === arrayOfItems.length){
                    document.querySelector('.main').style.display = "none";
                    document.querySelector('.score').style.display = "none";
                    document.querySelector('.themeForm').style.display = "none";
                    document.querySelector('.result').style.display = "block";

                    document.querySelector('.result').innerHTML = `YOU WIN !<br/><span class="nbTries">TRIES : ${stats.tries}</span><br/><a href='index.html'>Play again</a>`;
                }


                if(stats.tries===0){
                    document.querySelector('.score').style.visibility = "hidden";
                } else document.querySelector('.score').style.visibility = "visible";

            },true);
        })
    }
}


themeSelect.addEventListener('change',(e) => {
    createGame(eval(e.target.value));
});


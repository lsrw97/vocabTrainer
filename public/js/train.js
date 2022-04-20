let answer_btn = document.getElementById('start-btn')
let answer = document.getElementById('start-btn')
let database = []
let done = 0
let listLen = 0
let index = 0


// first you get the data from the database via serverrequest and store it in database array
fetch('/api')
    .then(res => res.json())
    .then(data => {
        database = data
        listLen = data.length
        index = listLen
    })


document.getElementById('start-btn').addEventListener('click', () => {
    document.querySelector('.container').innerHTML = 
    `
        <h1>Vocabulary Training</h1>
        <div class="word">
            <span id="vocab">${getRandomVocab(database, index)}</span>
        </div>
        <div id="answer-line">
            <input type="text" id="answer-input" name="translation" placeholder="translation" style="padding-left: 1em;" required>
            <button id="answer-btn">ok</button>
        </div>
        <div id="bottom-line">
            <p id="stack">Stack: ${database.length}</p>
            <a href="index.html"><button id="stack-btn">Stack</button></a>
            <button id="restart-btn">Restart</button>
        </div>
    `
    answer = document.getElementById('answer-input')
    answer_btn = document.getElementById('answer-btn')
    document.getElementById('restart-btn').addEventListener('click', () => {
        window.location.reload();
    })
    answer_btn.addEventListener('click', () => {
        const answerText = answer.value
        if(database[index].translation === answerText)
            {
                console.log('you are right!')
                document.getElementById('vocab').style.border = "solid 3px rgb(8, 201, 30)"
                setTimeout(() => {
                    database.splice(index, 1)
                    document.getElementById('vocab').style.border = "solid 3px rgba(180, 174, 174, 0.462)"
                    document.getElementById('vocab').innerHTML = `${getRandomVocab(database, index)}`
                    document.getElementById('stack').textContent = `Stack: ${database.length}`
                    answer.value = ''
                    done++
                    document.querySelector('.container').style.borderImage = `linear-gradient(to top, grey 0% ${(database.length/listLen)*100}%, green ${(database.length/listLen)*100}%) 2`
                }, 2000)
            }
        else {
            console.log('you are wrong!')
            document.getElementById('vocab').style.border = "solid 3px rgb(234, 46, 46)"
            setTimeout(() => {
                document.getElementById('vocab').style.border = "solid 3px rgba(180, 174, 174, 0.462)"
                document.getElementById('vocab').innerHTML = `${getRandomVocab(database, index)}`
                answer.value = ''
            }, 2000)
        }
    })
})

// getRandomVocab returns a random word from database (String)

function getRandomVocab(vocabList, index2){
    if(vocabList.length === 0)
        return 'You finished!'
    index = Math.floor(Math.random() * (vocabList.length))
    while(index === index2 && vocabList.length != 1){
        index = Math.floor(Math.random() * vocabList.length)
    }
    return vocabList[index].word
}



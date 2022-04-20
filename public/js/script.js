const wordsCollection = document.getElementById('words-collector')
const vocabList = document.getElementById('voc-list')

// here we have a GET request to the server (index.js)
// -> response is: Database as JSON 

fetch('/api')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // creating word - translation lines for each item in html
        data.forEach(voc => {
            vocabList.innerHTML += 
            `
                <div class="voc-item">
                    <span>${voc.word}</span>
                    <span>${voc.translation}</span>
                </div>
            `
        })

    })

// if you press the button 'submit' the data, which is in the form will be posted to the server

wordsCollection.addEventListener('submit', (event) => {
    const input = new FormData(event.target)
    const word = input.get('word')
    const translation = input.get('translation')
    const datas = {word, translation}
    const options = {
        method: 'POST', 
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datas)
    }

    // post request that pushes the data to the server
    fetch('/api', options)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    window.location.reload();
})


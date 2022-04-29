document.getElementById('stack').addEventListener('click', (e) => {
    const lang1 = document.getElementById('lang-one').value
    const lang2 = document.getElementById('lang-two').value
    console.log(lang1)
    const datas = [lang1, lang2]
    const options = {
        method: 'POST', 
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datas)
    }
    fetch('/lang', options)
})

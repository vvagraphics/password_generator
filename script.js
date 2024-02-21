const resultEle = document.getElementById('result')
const lengthEle = document.getElementById('length')
const uppercaseEle = document.getElementById('uppercase')
const lowercaseEle = document.getElementById('lowercase')
const numbersEle = document.getElementById('numbers')
const symbolsEle = document.getElementById('symbols')
const generateEle = document.getElementById('generate')
const clipboardEle = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEle.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEle.innerText

    if (!password) {
        return
    }
    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!')
})

generateEle.addEventListener('click', () => {
    //add the + so its not a string
    const length = +lengthEle.value
    const hasUpper = uppercaseEle.checked
    const hasLower = lowercaseEle.checked
    const hasNumber = numbersEle.checked
    const hasSymbol = symbolsEle.checked
    // console.log(length)
    // console.log(hasUpper, hasLower, hasNumber, hasSymbol)
    resultEle.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length)
})

function generatePassword(upper, lower, number, symbol, length){
    let generatePassword = ''
    const typesCount = upper + lower + number + symbol
    // console.log(typesCount)
    //filter out unchecked
    const typesArray = [{upper}, {lower},{number},{symbol}].filter(item => Object.values(item)[0])
    // console.log(typesArray)
    if (typesCount === 0) {
        return ''
    }
    //todo make return random
    for (let index = 0; index < length; index += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0]
            // console.log(funcName)
            generatePassword += randomFunc[funcName]()
        })
        
    }
    const finalPassword = generatePassword.slice(0, length)
    return finalPassword
}




function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol(){
    const symbols = ' ~`!@#$%^&*()_-+={[}]|:;"<,>.?/'
    return symbols[Math.floor(Math.random() * symbols.length)]
}


// console.log(getRandomSymbol())
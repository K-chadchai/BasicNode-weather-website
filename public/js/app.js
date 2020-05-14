const selectForm = document.querySelector('form') // select form 
const input = document.querySelector('input') // select input
const messageOne = document.querySelector('#Message1') // select message <p>
const messageTwo = document.querySelector('#Message2')  // select message <p>
const messageThree = document.querySelector('#Message3')  // select message <p>

messageOne.textContent = '' //default empty string
messageTwo.textContent = ''
messageThree.textContent = ''


selectForm.addEventListener('submit',(e) => {
    e.preventDefault() // press submit it will not reload page

    const location = input.value // .value = user input something in textfiled

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch('/weather?address='+ location).then((response) => {
    response.json({json:true}).then((data)=>{

        const {temperature, location, weather_descriptions, error} = data 

        if (data.error) {
            messageOne.textContent = error
        } else {
            messageOne.textContent = temperature
            messageTwo.textContent = weather_descriptions
            messageThree.textContent = location
        }
    })  
})
})
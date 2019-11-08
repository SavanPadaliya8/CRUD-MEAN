
const weatherForm =  document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')
const messageThree = document.querySelector('#msg-3')
const messageFour = document.querySelector('#msg-4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''


    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
            messageThree.textContent = ''
            messageFour.textContent = ''
        } else {
            messageOne.textContent = 'Location: ' + data.Place
            messageTwo.textContent = 'Temeparture: ' + data.Temperature
            messageThree.textContent = 'Visibility: ' + data.Visibility
            messageFour.textContent = 'Humidity: ' + data.Humidity
        }
    })
})
})
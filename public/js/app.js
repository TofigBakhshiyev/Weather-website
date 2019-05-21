const weather_form =  document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#error')
const message2 = document.querySelector('#message') 

weather_form.addEventListener('submit', (event) => {
    // prevent refreshing page
    event.preventDefault()

    const location = search.value
    
    message1.textContent = 'Loading...'
    message2.textContent = ''
    // http requests with fetch
    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else { 
                message1.textContent = data.location
                message2.textContent = data.weather 
            }
        })
    }) 
})
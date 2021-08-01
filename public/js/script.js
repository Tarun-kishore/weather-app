
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorBox = document.querySelector('#error')
const finalOutput = document.querySelector('#data')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/weather?address=${search.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                finalOutput.innerHTML =''
                
                errorBox.textContent = data.error
            }
            else{
                errorBox.innerHTML=''

                const location = document.createElement('div');
                location.setAttribute('id','location')
                location.textContent=data.location
                
                const condition = document.createElement('div');
                condition.setAttribute('id','condition')
                condition.textContent=data.condition
                
                const figures = document.createElement('div');
                figures.setAttribute('id','figures')

                const wrapper = document.createElement('div');
                wrapper.setAttribute('id','wrapper')

                const imgCond = document.createElement('div');
                imgCond.setAttribute('id','imgCond')

                const humid = document.createElement('p')
                humid.textContent='humidity :'+data.humidity

                const feelslike = document.createElement('p')
                feelslike.textContent='feels like : '+data.feelsLike
                
                const temp = document.createElement('p')
                temp.textContent='temperature : '+data.temp

                const icon = document.createElement('img')
                icon.setAttribute('src',data.icon)
                icon.setAttribute('id','icon')

                figures.appendChild(humid)
                figures.appendChild(temp)
                figures.appendChild(feelslike)

                imgCond.appendChild(icon)
                imgCond.appendChild(condition)

                wrapper.appendChild(imgCond)
                wrapper.appendChild(figures)

                finalOutput.innerHTML =''

                finalOutput.appendChild(location)
                finalOutput.appendChild(wrapper)

                
                
            }
        })
    })
})
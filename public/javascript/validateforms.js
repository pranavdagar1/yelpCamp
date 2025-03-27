
    (function(){
        'use strict'
        bsCustomFileInput.init()

        //fetch forms we want to apply custom boorstrap validation
        const forms=document.querySelectorAll('.validated-form')
        
        //loop over them and prevent submission
        Array.from(forms)
        .forEach(function (form){
            form.addEventListener('submit',function(event){
                if(!form.checkValidity()){
                    event.preventDefault()
                    event.stop.Propagation()
                }
                form.classList.add('was-validated')
            },false)

        })
    })()

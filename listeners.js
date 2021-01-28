document.addEventListener('DOMContentLoaded', function (e) {
        People.all();
        Modal.init();
        Panel.init();
    })


document.addEventListener('click', function(e){
    let target = e.target;

    if (target.matches('#addFamilyOrFriend')){
        e.preventDefault();
        Modal.populate({title: "Add Person", content: People.addPersonForm()})
        Modal.toggle();
    }else if (target.matches('#modal-close')){
        e.preventDefault();
        Modal.toggle();
    }else if (target.matches('#fullName')){
        e.preventDefault();
        let people = People.findById(target.dataset.personId)
        Panel.open();
        people.show();
    }else if (target.matches('#panel-close')) {
        e.preventDefault();
        Panel.close()
        People.sidePanel().firstElementChild.remove()
    }  
})

document.addEventListener('submit', function(e) {
    let target = e.target;

    if (target.matches('.createPersonForm')) {
        e.preventDefault();
        let formData = {};
        target.querySelectorAll('input').forEach(function(input) {
            formData[input.name] = input.value;
        });

        People.create(formData)
            .then(() => {
                target.reset()
                Modal.toggle()            
            })
    }
})
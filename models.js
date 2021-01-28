class People {
    constructor(attributes) {
        let whitelist = ['id', "first_name", 'last_name', 'relationship', 'birthdate', 'street_address', 
                'city', 'state', 'postal_code', 'email_address', 'avatar_url']
        whitelist.forEach(attr => this[attr] = attributes[attr])  
    }

    static mainPage() {
        return this.p1 ||= document.querySelector('#personInfo');
    }

    static all() {
        return fetch("http://localhost:3000/people", {
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            }
        })
        .then(resp => {
            if (resp.ok){
                return resp.json()
            }
            else {
                return resp.text().then(error => Promise.reject(error))
            }
        }).then(peopleArray => {
            this.collection = peopleArray.map(attrs => new People(attrs))
            let renderedInfo1 = this.collection.map(people => people.tableRender())
            this.mainPage().append(...renderedInfo1)
            return this.collection
        })
    }

    tableRender(){
        this.element ||= document.createElement('tr')
        this.element.id = this.id

        this.personData ||= document.createElement('td')
        this.personData.id = 'personInfo';
        this.personData.classList.add(..."px-6 py-4 whitespace-nowrap".split(' '));

        this.personColumn ||= document.createElement('div') 
        this.personColumn.classList.add(..."flex items-center".split(' '))
        this.personData.appendChild(this.personColumn)

        this.imageAttr ||= document.createElement('div')
        this.imageAttr.classList.add(..."flex-shrink-0 h-10 w-10".split(' '))
        this.personColumn.appendChild(this.imageAttr)

        this.image ||= document.createElement('img')
        this.image.classList.add(..."h-10 w-10 rounded-full".split(' '))
        this.image.src = this.avatar_url
        this.image.alt = ""
        this.imageAttr.appendChild(this.image)

        this.nameData ||= document.createElement('div')
        this.nameData.classList.add("ml-4")
        this.personColumn.appendChild(this.nameData)

        this.fullName ||= document.createElement('div')
        this.fullName.classList.add(..."text-sm font-medium text-gray-900".split(' '))
        this.nameData.appendChild(this.fullName)

        this.fullNameLink ||= document.createElement('a')
        this.fullNameLink.href = '#'
        this.fullNameLink.id = 'fullName'
        this.fullNameLink.classList.add(..."text-blue-600 hover:text-blue-900 visited:text-purple-600".split(' '))
        this.fullNameLink.textContent = `${this.first_name}  ${this.last_name}`
        this.fullNameLink.dataset.personId = this.id;
        this.fullName.appendChild(this.fullNameLink)
        

        this.personEmail ||= document.createElement('div')
        this.personEmail.classList.add(..."text-sm text-gray-500".split(' '))
        this.personEmail.textContent = this.email_address
        this.nameData.appendChild(this.personEmail)

        this.relationColumn ||= document.createElement('td')
        this.relationColumn.classList.add(..."text-sm text-center text-gray-px-6 py-4 whitespace-nowrap".split(' '))
        this.relationColumn.id = 'relationship'
        
        this.personRelated ||= document.createElement('div')
        this.personRelated.classList.add(..."text-sm text-gray-900".split(' '))
        this.personRelated.textContent = this.relationship
        this.relationColumn.appendChild(this.personRelated)

        this.addressColumn ||= document.createElement('td')
        this.addressColumn.classList.add(..."px-6 py-4 whitespace-nowrap".split(' '))
        this.addressColumn.id = 'address'

        this.personAddress ||= document.createElement('div')
        this.personAddress.classList.add(..."text-sm text-gray-900".split(' '))
        this.personAddress.textContent = `${this.street_address}, ${this.city}, ${this.state} ${this.postal_code}`
        this.addressColumn.appendChild(this.personAddress)

        this.birthdayColumn ||= document.createElement('td')
        this.birthdayColumn.classList.add(..."px-6 py-4 whitespace-nowrap text-sm text-gray-500".split(' '))
        this.birthdayColumn.id = 'birthday'
        this.birthdayColumn.textContent = this.birthdate
        debugger

        this.editColumn ||= document.createElement('td')
        this.editColumn.classList.add(..."px-6 py-4 whitespace-nowrap text-right text-sm font-medium".split(' '))
        this.editColumn.id = 'edit'
        
        this.editLink ||= document.createElement('a')
        this.editLink.classList.add(..."text-indigo-600 hover:text-indigo-900".split(' '))
        this.editLink.href = "#"
        this.editLink.innerHTML = 'Edit'
        this.editColumn.appendChild(this.editLink)

        this.element.append(this.personData, this.relationColumn, this.addressColumn, this.birthdayColumn, this.editColumn)

        return this.element
    }
    
    static addPersonForm() {
        this.createForm ||= document.createElement('form')
        this.createForm.classList.add('createPersonForm')
        
        this.formBox ||= document.createElement('div')
        this.formBox.classList.set('shadow overflow-hidden sm:rounded-md')
        this.createForm.appendChild(this.formBox)

        this.formInfo ||= document.createElement('div')
        this.formInfo.classList.set('px-4 py-5 bg-white sm:p-6')
        this.formBox.appendChild(this.formInfo)

        this.formAttrs ||= document.createElement('div')
        this.formAttrs.classList.set('grid grid-cols-6 gap-6')
        this.formInfo.appendChild(this.formAttrs)
        
        this.firstNameDiv ||= document.createElement('div')
        this.firstNameDiv.classList.set('col-span-6 sm:col-span-3')

        this.firstNameLabel ||= document.createElement('label')
        this.firstNameLabel.classList.set('block text-sm font-medium text-gray-700')
        this.firstNameLabel.htmlFor = 'first_name'
        this.firstNameLabel.innerHTML = "First Name"

        this.firstNameInput ||= document.createElement('input')
        this.firstNameInput.classList.set('border-2 border-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md')
        this.firstNameInput.id = 'first_name'
        this.firstNameInput.type = 'text'
        this.firstNameInput.name = 'first_name'
        this.firstNameInput.autocomplete ='given-name'

        this.firstNameDiv.append(this.firstNameLabel, this.firstNameInput)

        this.lastNameDiv ||= document.createElement('div')
        this.lastNameDiv.classList.set('col-span-6 sm:col-span-3')

        this.lastNameLabel ||= document.createElement('label')
        this.lastNameLabel.classList.set('block text-sm font-medium text-gray-700')
        this.lastNameLabel.htmlFor = 'last_name'
        this.lastNameLabel.innerHTML = "Last Name"

        this.lastNameInput ||= document.createElement('input')
        this.lastNameInput.classList.set('border-2 border-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md')
        this.lastNameInput.id = 'last_name'
        this.lastNameInput.type = 'text'
        this.lastNameInput.name = 'last_name'
        this.lastNameInput.autocomplete ='family-name'

        this.lastNameDiv.append(this.lastNameLabel, this.lastNameInput)

        this.relationshipDiv ||= document.createElement('div')
        this.relationshipDiv.classList.set('col-span-6 sm:col-span-3')

        this.relationshipLabel ||= document.createElement('label')
        this.relationshipLabel.classList.set('block text-sm font-medium text-gray-700')
        this.relationshipLabel.htmlFor = 'relationship'
        this.relationshipLabel.innerHTML = "Relationship"

        this.relationshipInput ||= document.createElement('input')
        this.relationshipInput.classList.set('border-2 border-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md')
        this.relationshipInput.id = 'relationship'
        this.relationshipInput.type = 'text'
        this.relationshipInput.name = 'relationship'
        this.relationshipInput.autocomplete ='personal-relation'

        this.relationshipDiv.append(this.relationshipLabel, this.relationshipInput)

        this.birthdayDiv ||= document.createElement('div')
        this.birthdayDiv.classList.set('col-span-6 sm:col-span-3')

        this.birthdayLabel ||= document.createElement('label')
        this.birthdayLabel.classList.set('block text-sm font-medium text-gray-700')
        this.birthdayLabel.htmlFor = 'birthday'
        this.birthdayLabel.innerHTML = "Birthday"

        this.birthdayInput ||= document.createElement('input')
        this.birthdayInput.classList.set('border-2 border-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md')
        this.birthdayInput.id = 'birthday'
        this.birthdayInput.type = 'text'
        this.birthdayInput.name = 'birthday'
        this.birthdayInput.autocomplete ='day-of-birth'

        this.birthdayDiv.append(this.birthdayLabel, this.birthdayInput)

        this.photoDiv ||= document.createElement('div')
        this.photoDiv.classList.set('col-span-6 sm:col-span-3')

        this.photoLabel ||= document.createElement('label')
        this.photoLabel.classList.set('block text-sm font-medium text-gray-700')
        this.photoLabel.htmlFor = 'avatar_url'
        this.photoLabel.innerHTML = "Photo URL"

        this.photoInput ||= document.createElement('input')
        this.photoInput.classList.set('border-2 border-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md')
        this.photoInput.id = 'avatar_url'
        this.photoInput.type = 'text'
        this.photoInput.name = 'avatar_url'
        this.photoInput.autocomplete ='url'

        this.photoDiv.append(this.photoLabel, this.photoInput)

        this.emailDiv ||= document.createElement('div')
        this.emailDiv.classList.set('col-span-6 sm:col-span-4')

        this.emailLabel ||= document.createElement('label')
        this.emailLabel.classList.set('block text-sm font-medium text-gray-700')
        this.emailLabel.htmlFor = 'email_address'
        this.emailLabel.innerHTML = "Email Address"

        this.emailInput ||= document.createElement('input')
        this.emailInput.classList.set('border-2 border-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md')
        this.emailInput.id = 'email_address'
        this.emailInput.type = 'text'
        this.emailInput.name = 'email_address'
        this.emailInput.autocomplete ='email'

        this.emailDiv.append(this.emailLabel, this.emailInput)

        this.streetAddressDiv ||= document.createElement('div')
        this.streetAddressDiv.classList.set('col-span-6')

        this.streetAddressLabel ||= document.createElement('label')
        this.streetAddressLabel.classList.set('block text-sm font-medium text-gray-700')
        this.streetAddressLabel.htmlFor = 'street_address'
        this.streetAddressLabel.innerHTML = "Street Address"

        this.streetAddressInput ||= document.createElement('input')
        this.streetAddressInput.classList.set('border-2 border-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md')
        this.streetAddressInput.id = 'street_address'
        this.streetAddressInput.type = 'text'
        this.streetAddressInput.name = 'street_address'
        this.streetAddressInput.autocomplete ='street-address'

        this.streetAddressDiv.append(this.streetAddressLabel, this.streetAddressInput)

        this.cityDiv ||= document.createElement('div')
        this.cityDiv.classList.set('col-span-6 sm:col-span-6 lg:col-span-2')

        this.cityLabel ||= document.createElement('label')
        this.cityLabel.classList.set('block text-sm font-medium text-gray-700')
        this.cityLabel.htmlFor = 'city'
        this.cityLabel.innerHTML = "City"

        this.cityInput ||= document.createElement('input')
        this.cityInput.classList.set('border-2 border-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md')
        this.cityInput.id = 'city'
        this.cityInput.type = 'text'
        this.cityInput.name = 'city'

        this.cityDiv.append(this.cityLabel, this.cityInput)

        this.stateDiv ||= document.createElement('div')
        this.stateDiv.classList.set('col-span-6 sm:col-span-3 lg:col-span-2')

        this.stateLabel ||= document.createElement('label')
        this.stateLabel.classList.set('block text-sm font-medium text-gray-700')
        this.stateLabel.htmlFor = 'state'
        this.stateLabel.innerHTML = "State"

        this.stateInput ||= document.createElement('input')
        this.stateInput.classList.set('border-2 border-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md')
        this.stateInput.id = 'state'
        this.stateInput.type = 'text'
        this.stateInput.name = 'state'

        this.stateDiv.append(this.stateLabel, this.stateInput)
        
        this.zipDiv ||= document.createElement('div')
        this.zipDiv.classList.set('col-span-6 m:col-span-3 lg:col-span-2')

        this.zipLabel ||= document.createElement('label')
        this.zipLabel.classList.set('block text-sm font-medium text-gray-700')
        this.zipLabel.htmlFor = 'postal_code'
        this.zipLabel.innerHTML = "Zip Code"

        this.zipInput ||= document.createElement('input')
        this.zipInput.classList.set('border-2 border-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md')
        this.zipInput.id = 'postal_code'
        this.zipInput.type = 'text'
        this.zipInput.name = 'postal_code'
        this.zipInput.autocomplete ='postal-code'

        this.zipDiv.append(this.zipLabel, this.zipInput)

        this.submitDiv ||= document.createElement('div')
        this.submitDiv.classList.set('px-4 py-3 bg-gray-50 text-right sm:px-6')

        this.saveButton  ||= document.createElement('button')
        this.saveButton.classList.set('inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500')
        this.saveButton.id = 'submit'
        this.saveButton.type = 'submit'
        this.saveButton.innerHTML = "Save"

        this.formAttrs.append(this.firstNameDiv, this.lastNameDiv, this.birthdayDiv, this.relationshipDiv,
            this.emailDiv, this.photoDiv, this.streetAddressDiv, this.cityDiv, this.stateDiv, this.zipDiv, this.saveButton)

    return this.createForm    
    }

    static findById(id){
        return this.collection.find(people => people.id == id)
    }

    show() {
        return fetch(`http://localhost:3000/people/${this.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return res.text().then(errors => Promise.reject(errors))
            }
        })
        .then(data => {
            let person = new People(data)
            People.sidePanel().appendChild(person.panelRender())
            return person
        })
    }

    static create(formData) {
        
        return fetch("http://localhost:3000/people", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({person: formData})
        })
        .then(resp => {
            if (resp.ok){
                return resp.json()
            }
            else {
                return resp.text().then(error => Promise.reject(error))
            }
        })
        .then(peopleAttributes => {
            let people = new People(peopleAttributes);
            this.collection.push(people);
            this.mainPage().appendChild(people.tableRender());
            new FlashMessage({type: 'success', message: 'Friend/Family member added successfully'})
            return people;
        })
        .catch(error => {
            new FlashMessage({type: 'error', message: error})
        })
    }

    static sidePanel() {
        return this.p2 ||= document.querySelector('#panelInfo');
    }


    

    panelRender(){
        this.element ||= document.createElement('div')
        this.element.id = this.id

        this.panelTitleDiv ||= document.createElement('div')
        this.panelTitleDiv.id = 'panel-title'
        this.panelTitleDiv.classList.set('container mx-auto bg-cover py-20 px-2 sm:px-6')
        this.panelTitleDiv.style.backgroundImage = `url(${this.avatar_url})`;

        this.panelTitleHeader ||= document.createElement('h2')
        this.panelTitleHeader.id ="slide-over-heading" 
        this.panelTitleHeader.classList.set('ext-lg font-medium text-white')
        this.panelTitleHeader.textContent = `${this.first_name} ${this.last_name}`
        this.panelTitleDiv.appendChild(this.panelTitleHeader)

        this.panelContentDiv ||= document.createElement('div')
        this.panelContentDiv.id = 'panel-content'
        this.panelContentDiv.classList.set('t-6 relative flex-1 px-4 sm:px-6')

        this.panelContentChild ||= document.createElement('div')
        this.panelContentChild.classList.set('bg-white shadow-lg mt-10 overflow-hidden sm:rounded-lg')
        this.panelContentDiv.appendChild(this.panelContentChild)

        this.panelContent ||= document.createElement('div')
        this.panelContent.classList.set('border-t border-gray-200')
        this.panelContentChild.appendChild(this.panelContent)

        this.panelList ||= document.createElement('dl')
        this.panelContent.appendChild(this.panelList)

        this.relationDiv ||= document.createElement('div')
        this.relationDiv.classList.set('bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6')

        this.relationTerm ||= document.createElement('dt')
        this.relationTerm.classList.set('text-sm font-medium text-gray-500')
        this.relationTerm.innerText = 'Relationship'

        this.relationInfo ||= document.createElement('dd')
        this.relationInfo.classList.set('mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2')
        this.relationInfo.textContent = this.relationship

        this.relationDiv.append(this.relationTerm, this.relationInfo)

        this.addressDiv ||= document.createElement('div')
        this.addressDiv.classList.set('bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6')
        
        this.addressTerm ||= document.createElement('dt')
        this.addressTerm.classList.set('text-sm font-medium text-gray-500')
        this.addressTerm.innerText = 'Address'

        this.addressInfo ||= document.createElement('dd')
        this.addressInfo.classList.set('mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2')
        this.addressInfo.textContent = `${this.street_address}, ${this.city}, ${this.state} ${this.postal_code}`


        this.addressDiv.append(this.addressTerm, this.addressInfo)

        this.emailAddressDiv ||= document.createElement('div')
        this.emailAddressDiv.classList.set('bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6')
        
        this.emailAddressTerm ||= document.createElement('dt')
        this.emailAddressTerm.classList.set('text-sm font-medium text-gray-500')
        this.emailAddressTerm.innerText = 'Email Address'

        this.emailAddressInfo ||= document.createElement('dd')
        this.emailAddressInfo.classList.set('mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2')
        this.emailAddressInfo.textContent = this.email_address


        this.emailAddressDiv.append(this.emailAddressTerm, this.emailAddressInfo)

        this.birthdayDiv ||= document.createElement('div')
        this.birthdayDiv.classList.set('bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6')
        
        this.birthdayTerm ||= document.createElement('dt')
        this.birthdayTerm.classList.set('text-sm font-medium text-gray-500')
        this.birthdayTerm.innerText = 'Birthday'

        this.birthdayInfo ||= document.createElement('dd')
        this.birthdayInfo.classList.set('mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2')
        this.birthdayInfo.textContent = this.birthdate


        this.birthdayDiv.append(this.birthdayTerm, this.birthdayInfo)

        this.panelList.append(this.relationDiv, this.addressDiv, this.emailAddressDiv,
            this.birthdayDiv)
        

        this.element.append(this.panelTitleDiv, this.panelContentDiv);
        return this.element
    }
}

class Notes {
    constructor(attributes) {
        let whitelist = ['id', 'content', 'created_at']
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static plip() {
        return this.p ||= document.querySelector('#pageTwo');
    }

    render(){

    }
}

class User {
    constructor(attributes) {
        let whitelist = ['name', 'email', 'address', 'birthdate', 'avatar_url']
        whitelist.forEach(attr => this[attr] = attributes(attr))
    }

    render(){

    }
}

class FlashMessage {
    constructor({type, message}) {
        this.error = type === 'error';
        this.message = message;
        this.render();
    }

    container() {
        return this.c ||= document.querySelector('#flash')
    }

    render() {
        this.container().textContent = this.message
        this.toggleMessage();
        setTimeout(() => this.toggleMessage(), 5000);        
    }

    toggleMessage() {
        this.container().classList.toggle(this.error ? 'bg-red-600' : 'bg-blue-600');
        this.container().classList.toggle('opacity-0')
    }
}
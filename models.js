class People {
    constructor(attributes) {
        let whitelist = ['id', "first_name", 'last_name', 'relationship', 'birthdate', 'address', 'avatar_url']
        whitelist.forEach(attr => this[attr] = attributes[attr])  
    }

    static page1() {
        return this.p ||= document.querySelector('#personInfo');
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
            let renderedInfo = this.collection.map(people => people.render())
            this.page1().append(...renderedInfo)
            debugger
        })
    }

    static page2() {
        return this.p ||= document.querySelector('#pageTwo');
    }

    /*
    <tr id='personInfo'> 
                                
                                
                               
                                
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                                </td>
                              </tr>
    */

    render(){
        this.element ||= document.createElement('tr')
        this.element.id = this.id

        this.personData ||= document.createElement('td')
        this.personData.id = 'name';
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
        this.fullNameLink.classList.add(..."text-blue-600 hover:text-blue-900 visited:text-purple-600".split(' '))
        this.fullNameLink.textContent = `${this.first_name}  ${this.last_name}`
        this.fullName.appendChild(this.fullNameLink)
        

        this.personEmail ||= document.createElement('div')
        this.personEmail.classList.add(..."text-sm text-gray-500".split(' '))
        this.personEmail.textContent = 'seeme@gmail.com'
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
        this.personAddress.textContent = this.address
        this.addressColumn.appendChild(this.personAddress)

        this.birthdayColumn ||= document.createElement('td')
        this.birthdayColumn.classList.add(..."px-6 py-4 whitespace-nowrap text-sm text-gray-500".split(' '))
        this.birthdayColumn.id = 'birthday'
        this.birthdayColumn.textContent = this.birthdate

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
}

class Notes {
    constructor(attributes) {
        let whitelist = ['id', 'content', 'created_at']
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static page2() {
        return this.p ||= document.querySelector('#pageTwo');
    }

    render(){

    }
}

class User {
    constructor(attributes) {
        let whitelist = ['name', 'email', 'address', 'birthday', 'avatar_url']
        whitelist.forEach(attr => this[attr] = attributes(attr))
    }

    render(){

    }
}
class Panel {

    static init(){
        this.body ||= document.body
        this.panel ||= document.querySelector('#panel')
        this.title ||= document.querySelector('#panel-title')
        this.content ||= document.querySelector('#panel-content')
    }

    static open(){
        this.panel.classList.replace('hidden', 'block')
    }

    static close() {
        this.panel.classList.replace('block', 'hidden')
    }
}
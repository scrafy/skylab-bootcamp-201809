class Postit {
    constructor(postit) {
        const {body} = postit
        this.id = Date.now()
        this.body = body
    }
}

module.exports = Postit
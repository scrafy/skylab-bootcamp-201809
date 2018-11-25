const { Subject } = require('rxjs');

const EventsManagement = {

    Subjects:{
        hiveUpdateInfo:  new Subject()
    },

    selectSubject(name){

        return this.Subjects[name]
    }
}

module.exports = EventsManagement

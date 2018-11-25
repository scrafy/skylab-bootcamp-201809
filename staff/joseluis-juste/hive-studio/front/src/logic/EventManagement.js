import { Subject } from 'rxjs';

const EventsManagement = {

    Subjects:{
        hiveUpdateInfo:  new Subject()
    },

    selectSubject(name){

        return this.Subjects[name]
    }
}

export default EventsManagement

import { Subject } from 'rxjs';

const EventsManagement = {

    Subjects:{
        honeycomb:  new Subject()
    },

    selectSubject(name){

        return this.Subjects[name]
    }
}

export default EventsManagement


  this.honeycomb = EventsManagement.selectSubject("honeycomb")
        this.honeycomb.subscribe({next: this.showUserId, complete: () => console.log("done"), error: err => {console.log(err)}})
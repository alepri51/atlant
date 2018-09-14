const EventEmitter = require('events');

class Emitter extends EventEmitter {
    constructor({ io }) {
        super();
        //internal server singlton  to create at start up
        this.io = io;

        
        this.timer = {};
        this.counter = {};

        //this.cycle(interval);

    }

    cycle({ event, interval = 1000, immediate = true, count = Infinity } ) {
        let first_interval = immediate ? 0 : interval;
        this.counter[event] = count;

        !this.timer[event] && this.timer[event] !== 'STOP' && (this.timer[event] = setTimeout(async () => {
            clearTimeout(this.timer[event]);
            
            this.emit(event, this.io, (params) => {
                this.counter[event] -= 1;
            
                !this.counter[event] && (this.timer[event] = 'STOP');
    
                this.timer[event] !== 'STOP' && (this.timer[event] = void 0);
    
                this.cycle({ event, interval, immediate: false });
            });

        }, first_interval));
    }

    stop(event) {
        this.timer[event] && (this.timer[event] = 'STOP');
    }

}

module.exports = Emitter;
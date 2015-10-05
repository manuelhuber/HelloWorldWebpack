import WorldWanderer from './world-interface';

class HelloWorld implements    WorldWanderer{
    isWandering () : boolean {
        return true;
    }

    message : String;

    constructor (input : String) {
        this.message = input;
    }

    printMessage () {
        return this.message;
    }

    getTested () {
        return "I got tested!";
    }

    getNotTested () {
        return "You will never read this!";
    }
}

export default HelloWorld;

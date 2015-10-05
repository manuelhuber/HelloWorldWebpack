import HelloWorld from './hello-world';
import WorldWanderer from './world-interface';

class GoodbyeWorld implements WorldWanderer{
    theWorld : HelloWorld;

    isWandering () : boolean {
        return false;
    }

    constructor (world : HelloWorld) {
        this.theWorld = world;
    }

    currentWorld () : string {
        return "My current world says: " + this.theWorld.printMessage();
    }

}


export default GoodbyeWorld;

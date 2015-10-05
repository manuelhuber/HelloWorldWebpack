import HelloWorld from './hello-world';
import GoodbyeWorld from './goodbye-world';

var helloWorld : HelloWorld;
var goodbyeWorld : GoodbyeWorld;
helloWorld = new HelloWorld("Hello World");
goodbyeWorld = new GoodbyeWorld(helloWorld);
document.write(goodbyeWorld.currentWorld());


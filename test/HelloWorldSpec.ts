/// <reference path ="..\typings\jasmine\jasmine.d.ts" />
/**
 * Created by Manuel on 23.09.2015.
 */
import HelloWorld from '../src/hello-world';
import GoodbyeWorld from '../src/goodbye-world';

describe("Testing HelloWorld", function () {
        var testWorld: HelloWorld;
        beforeAll(function(){
            testWorld = new HelloWorld("TestMessage");
        })
        it("create HelloWorld & Message", function () {
                expect(testWorld.printMessage()).toBe("TestMessage");
                expect(testWorld.getTested()).toBe("I got tested!");
                expect(testWorld.isWandering()).toBe(true);
            }
        )
        it("create GoodbyeWorld", () => {
            var testGoodbye = new GoodbyeWorld(testWorld);
            expect(testGoodbye.currentWorld()).toBe("My current world says: TestMessage");
            expect(testGoodbye.isWandering()).toBe(false);
        })
    }
)

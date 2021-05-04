const Component = (selector: string) => (target: any) => {
    window.customElements.define(selector, target);
}

const Injectable = (name?: string) => (target: any) => {
    console.log(name, target)
}

const Input = (target: any, key: string) => {
    target.prototype.inputProp = key;
}

@Injectable()
class Sample { }

@Injectable()
class Test {
    constructor(sample: Sample) {
        console.log(sample);
    }
}

const footest = () => {
    @Component('text-foo')
    class FooElement {

        @Input foo: string = 'hey foo';

        constructor(test: Test) {
            console.log(test);
        }
    }
}
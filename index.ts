const Component = (selector: string) => (target: any) => {
    window.customElements.define(selector, target);
}

const Service = (name?: string) => (target: any) => {
    console.log(name, target)
}

const Input = (target: any, key: string) => {
    target.prototype.inputProp = key;
}

@Service()
class Sample { }

@Service()
class Test {
    constructor(sample: Sample) {
        console.log(sample);
    }
}

@Component('text-foo')
class FooElement {

    @Input foo: string = 'hey foo';

    constructor(test: Test) {
        console.log(test);
    }
}
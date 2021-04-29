const Component = (selector: string) => (target: any) => {
    window.customElements.define(selector, target);
}

const Service = (name?: string) => (target: any) => {
    console.log(target)
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
    constructor(test: Test) {
        console.log(test);
    }
}
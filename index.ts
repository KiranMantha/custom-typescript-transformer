const customElement = (selector: string) => (target: any) => {
    window.customElements.define(selector, target);
}

class Test { }

@customElement('x-foo')
class FooElement {
    constructor(test: Test) {
        console.log(test);
    }
}
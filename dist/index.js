const Component = (selector) => (target) => {
    window.customElements.define(selector, target);
};
const Injectable = (name) => (target) => {
    console.log(name, target);
};
const Input = (target, key) => {
    target.prototype.inputProp = key;
};
class Sample {
}
Injectable("Sample")([Sample]);
class Test {
    constructor(sample) {
        console.log(sample);
    }
}
Injectable("Test")(["Sample", Test]);
const footest = () => {
    class FooElement {
        constructor(test) {
            this.foo = 'hey foo';
            console.log(test);
        }
        static get inputProp() {
            return "foo";
        }
    }
    Component('text-foo')(["Test", FooElement]);
};

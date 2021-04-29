const Component = (selector) => (target) => {
    window.customElements.define(selector, target);
};
const Service = (name) => (target) => {
    console.log(target);
};
class Sample {
}
Service("Sample")([Sample]);
class Test {
    constructor(sample) {
        console.log(sample);
    }
}
Service("Test")(["Sample", Test]);
class FooElement {
    constructor(test) {
        console.log(test);
    }
}
Component("text-foo")(["Test", FooElement]);

class EventEmitter extends rxjs.Subject {
    constructor(isAsync = false) {
        super();
    }
    emit(value) {
        super.next(value);
    }
    subscribe(generatorOrNext, error, complete) {
        let schedulerFn = generatorOrNext
        let errorFn = (err) => null;
        let completeFn = () => null;
        return super.subscribe(schedulerFn, errorFn, completeFn);
    }
}
class CustomZone {
    constructor() {
        this.onMicrotaskEmpty = new EventEmitter(false);
        const self = this;
        self._outer = Zone.current;
        self._inner = self._outer;
        forkCustomZoneInner(self);
    }
    run(fn) {
        this._inner.run(fn)
    }
    runOutsideZ(fn) {
        this._outer.run(fn)
    }
}

function forkCustomZoneInner(zone) {
    zone._inner = zone._inner.fork({
        name: 'z',
        onInvokeTask: (delegate, current, target, task, applyThis,
            applyArgs) => {
            try {
                return delegate.invokeTask(target, task, applyThis, applyArgs);
            } finally {
                checkStable(zone)
            }
        },
    })
}

function checkStable(zone) {
    zone.onMicrotaskEmpty.emit(null);
}
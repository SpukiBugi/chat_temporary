let lockBodyLastPosition = null;

export function scrollbarWidth() {
    if (typeof document === 'undefined') {
        return 0;
    }

    const div = document.createElement('div');

    div.style.position = 'fixed';
    div.style.left = 0;
    div.style.visibility = 'hidden';
    div.style.overflowY = 'scroll';

    document.body.appendChild(div);
    const width = div.getBoundingClientRect().right;
    document.body.removeChild(div);

    return width;
}

export function lockBody(isFixed, timeout = 0) {
    lockBodyLastPosition = window?.scrollY;
    const lock = () => {
        document.documentElement.style.height = 'auto';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.height = '100%';
        document.body.style.overflow = 'hidden';
        if (isFixed) {
            document.body.style.position = 'fixed';
        }
        document.body.style.paddingRight = `${scrollbarWidth()}px`;
    };

    if (timeout) {
        setTimeout(lock, timeout);
    } else {
        lock();
    }
}

export function unlockBody(timeout = 0, scroll = true) {
    const unlock = () => {
        document.documentElement.style.height = '';
        document.documentElement.style.overflow = '';
        document.body.style.height = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.style.position = '';

        if (scroll && lockBodyLastPosition && window) {
            window.scrollTo(0, lockBodyLastPosition);
        }
    };

    if (timeout && scroll) {
        setTimeout(unlock, timeout);
    } else {
        unlock();
    }
}

export function scrollTo(id = false, offset = 0, force = false) {
    if (!id) {
        window.scroll({ top: 0, left: 0, behavior: force ? 'instant' : 'smooth' });
    } else {
        const target = document.getElementById(id);
        if (target) {
            const position =
                target.getBoundingClientRect().top + window.pageYOffset;
            window.scroll({
                top: position - offset,
                left: 0,
                behavior: force ? 'instant' : 'smooth',
            });
        }
    }
}

export function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        // eslint-disable-next-line
        const context = this;
        const args = arguments;

        function later() {
            timeout = null;

            if (!immediate) {
                func.apply(context, args);
            }
        }

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args);
        }
    };
}

/* eslint-disable */
export function throttle(func, ms) {
    let isThrottled = false;
    let savedArgs;
    let savedThis;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

/* eslint-enable */

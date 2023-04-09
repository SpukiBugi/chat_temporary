export function objectToQuery(obj) {
    let qs = '?';
    for (const name in obj) {
        if (obj[name] || obj[name] === 0 || obj[name] === false) {
            if (Array.isArray(obj[name])) {
                qs += `${name}=${obj[name]}&`;
            } else {
                qs += `${name}=${obj[name]}&`;
            }
        }
    }
    return qs.slice(0, -1);
}

export function queryToObject(qs) {
    const obj = {};

    if (qs) {
        const params = qs.split('&');

        params.forEach(param => {
            const name = param.split('=')[0];
            const value = param.split('=')[1];

            if (name && value) {
                const valueArray = value.split(',').map(val => (val === 'true' || val === 'false') ? val === 'true' : (isNaN(val) ? val : Number(val)));

                if (valueArray.length === 1) {
                    obj[name] = valueArray[0];
                } else {
                    obj[name] = valueArray;
                }
            }
        });
    }
    return obj;
}

export function cleanQueryObject(currentValues, newValues) {
    const currentCopy = JSON.parse(JSON.stringify(currentValues));

    for (const key in newValues) {
        if (Array.isArray(newValues[key])) {
            if (newValues[key].length) {
                currentCopy[key] = newValues[key];
            } else {
                delete currentCopy[key];
            }
        } else {
            if (newValues[key] === '') {
                delete currentCopy[key];
            } else {
                currentCopy[key] = newValues[key];
            }
        }
    }

    return currentCopy;
}

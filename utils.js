const debounce = (func) => {
    let timeoutId;
    //...args takes in all the arguements, instead of just 1
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            //apply method will pull all the arguements, manual way(arg1, arg2, arg3...)
            func.apply(null, args);
        }, 1000);
    };
};

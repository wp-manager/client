function debounce(callback: Function, waitMs = 20) {
    let timeout: any = null;
    let callable = (...args: any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), waitMs);
    };
    return callable;
}

export default debounce;
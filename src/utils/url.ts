function isValidURL(url: string) {
    if (!url || typeof url !== "string") {
        return false;
    }

    // Check if URL is valid
    const regex = new RegExp(/^(https?:\/\/)?(www\.)?([a-z0-9]+(-?[a-z0-9])*\.)+[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i);

    if (!regex.test(url)) {
        return false;
    }

    return true;
}

function sanitiseURL(url: string) {
    if(!isValidURL(url)) {
        throw new Error("Invalid URL.");
    }

    url = url
        .trim()
        .toLowerCase()
        .replace(/^(https?:\/\/)?/i, "")
        .replace(/\/$/, "")
        .trim();

    return url;
}

export { isValidURL, sanitiseURL };
class TextUtils {
    static toSentenceCase(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export default new TextUtils();
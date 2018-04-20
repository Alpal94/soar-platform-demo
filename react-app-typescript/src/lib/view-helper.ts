export default class ViewHelper {

    public static truncateMiddle(fullStr: string, strLen: number) {
        if (!fullStr || fullStr.length <= strLen) {
            return fullStr;
        } 

        var separator = '...';

        var sepLen = separator.length,
            charsToShow = strLen - sepLen,
            frontChars = Math.ceil(charsToShow / 2),
            backChars = Math.floor(charsToShow / 2);

        return fullStr.substr(0, frontChars) +
            separator +
            fullStr.substr(fullStr.length - backChars);
    }
    
}
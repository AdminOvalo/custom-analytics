export function formatedDate(data: string | undefined) {
    if (!data) return "-"
    let [text] = [data];
    text = text.replace("T", " ");
    text = text.replace("Z", "");
    text = text.slice(0, 19);
    return text
}
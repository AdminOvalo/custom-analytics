export function formatedDate(data: string | undefined) {
    if (!data) return "-"
    let [text] = [data];
    text = text.replace("T", " ");
    text = text.replace("Z", "");
    text = text.slice(0, 19);
    return text
}

export function addDaysToDateTime(data: Date, days: number = 31) {
    const [now] = [data];
    const inNDays = new Date(new Date(now).setDate(now.getDate() + days))
    return inNDays
}
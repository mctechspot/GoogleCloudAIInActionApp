export const prettifyDate = (dateString: string, includeTime: boolean) => {
    const dateStringReformatted: string = `${dateString.split(" ")[0]}T${dateString.split(" ")[1]}Z`;
    const date: Date = new Date(dateStringReformatted);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...(includeTime && {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        })
    };
    return `${date.toLocaleString("en-US", options)}${includeTime ? "h":""}`;
}
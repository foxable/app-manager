export default class Utils
{
    public static parseJson<T>(file: Buffer | string): T
    {
        return JSON.parse(file.toString());
    }

    public static contains(text: string, value: string): boolean
    {
        return text.indexOf(value) > -1;
    }

    public static joinBy(leftItems: SystemApp[], rightItems: RegisteredApp[], by: (l: SystemApp, r: RegisteredApp) => boolean): (SystemApp & RegisteredApp)[]
    {
        const joinedItems: (SystemApp & RegisteredApp)[] = [];

        leftItems.forEach(leftItem =>
        {
            const rightItem = rightItems.find(rightItem => by(leftItem, rightItem));

            if (rightItem === undefined)
                return;

            joinedItems.push({ ...leftItem, ...rightItem });
        });

        return joinedItems;
    }
}

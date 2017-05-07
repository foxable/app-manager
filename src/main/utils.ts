import * as fs from "fs";

export default class Utils
{
    public static readJsonFiles<T>(dirPath: string, readFile: (file: string) => Promise<T> = Utils.readJsonFile): Promise<T[]>
    {
        return new Promise<T[]>((resolve, reject) =>
        {
            fs.readdir(dirPath, (err, files) =>
            {
                if (err)
                    reject(err.message);
                else
                    resolve(Promise.all(files.map(file => readFile(file))));
            });
        });
    }

    public static readJsonFile<T>(filePath: string): Promise<T>
    {
        return new Promise<T>((resolve, reject) =>
        {
            fs.readFile(filePath, (err, data) =>
            {
                if (err)
                    reject(err.message);
                else
                    resolve(Utils.parseJson<T>(data));
            });
        });
    }

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

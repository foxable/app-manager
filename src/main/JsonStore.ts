import * as fs from "fs";
import * as path from "path";

export abstract class JsonStore
{
    protected static readDir<T>(dirPath: string): Promise<T[]>
    {
        return new Promise<T[]>((resolve, reject) =>
        {
            fs.readdir(dirPath, (err, files) =>
            {
                if (err)
                    reject(err.message);
                else
                    resolve(JsonStore.chainPromises(files.map(file => JsonStore.readFile<T>(path.join(dirPath, file)))));
            });
        });
    }

    protected static readFile<T>(filePath: string): Promise<T>
    {
        return new Promise<T>((resolve, reject) =>
        {
            fs.readFile(filePath, (err, data) =>
            {
                if (err)
                    reject(err.message);
                else
                    resolve(JsonStore.parseAsJson<T>(data));
            });
        });
    }

    private static chainPromises<T>(promises: Promise<T>[]): Promise<T[]>
    {
        let chainedPromise = new Promise<T[]>(resolve => resolve([]));

        promises.forEach(promise => chainedPromise = chainedPromise
            .then(result => promise
                .then(item => JsonStore.append<T>(item, result))
            )
        );

        return chainedPromise;
    }

    private static append<T>(item: T, result: T[]): T[]
    {
        result.push(item);
        return result;
    }

    private static parseAsJson<T>(file: Buffer): T
    {
        return JSON.parse(file.toString());
    }
}

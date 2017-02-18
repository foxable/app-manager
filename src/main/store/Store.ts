import * as fs from "fs";
import {Promise} from "core-js";

import * as utils from "../utils";

export class Store
{
    public static readJsonFiles<T>(dirPath: string, readFile: (file: string) => Promise<T> = Store.readJsonFile): Promise<T[]>
    {
        return new Promise<T[]>((resolve, reject) =>
        {
            fs.readdir(dirPath, (err, files) =>
            {
                if (err)
                    reject(err.message);
                else
                    resolve(Store.chainPromises(files.map(file => readFile(file))));
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
                    resolve(utils.parseJson<T>(data));
            });
        });
    }

    private static chainPromises<T>(promises: Promise<T>[]): Promise<T[]>
    {
        let chainedPromise = new Promise<T[]>(resolve => resolve([]));

        promises.forEach(promise => chainedPromise = chainedPromise
            .then(result => promise
                .then(item => Store.append<T>(item, result))
            )
        );

        return chainedPromise;
    }

    private static append<T>(item: T, result: T[]): T[]
    {
        result.push(item);
        return result;
    }
}

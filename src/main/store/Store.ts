import * as fs from "fs";
import {Promise} from "core-js";

import Utils from "../Utils";

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
}

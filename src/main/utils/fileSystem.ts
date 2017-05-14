import * as fs from "fs";

type Handler<TValue> = (err: NodeJS.ErrnoException, result: TValue) => any;

function toPromise<TValue>(inject: (handler: Handler<TValue>) => any): Promise<TValue>
{
    return new Promise<TValue>((resolve, reject) => inject((err, value) => err ? reject(err.message) : resolve(value)));
}

export function readDir(dirPath: string): Promise<string[]>
{
    return toPromise<string[]>(handler => fs.readdir(dirPath, handler));
}

export function readFile(filePath: string): Promise<Buffer>
{
    return toPromise<Buffer>(handler => fs.readFile(filePath, handler));
}

export function parseJson<T>(file: Buffer | string): T
{
    return JSON.parse(file.toString());
}
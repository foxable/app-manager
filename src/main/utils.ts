export function parseJson<T>(file: Buffer | string): T
{
    return JSON.parse(file.toString());
}

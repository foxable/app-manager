export default class VersionComparer
{
    public constructor(private readonly version: string) {}

    public compareTo(version: string): number
    {
        return this.compare(this.parse(this.version), this.parse(version));
    }

    public equals(version: string): boolean
    {
        return this.compareTo(version) === 0;
    }

    public isLesserThan(version: string): boolean
    {
        return this.compareTo(version) === -1;
    }

    public isGreaterThan(version: string): boolean
    {
        return this.compareTo(version) === 1;
    }

    private parse(version: string): string[]
    {
        if (!version)
            return [];

        return version.split(".");
    }

    private compare(a: string[], b: string[]): number
    {
        let i = 0;

        while (i < a.length && i < b.length)
        {
            if (a[i] > b[i])
                return 1;

            if (a[i] < b[i])
                return -1;
            
            i++;

            if (i > a.length)
                return -1;

            if (i > b.length)
                return 1;
        }

        return 0;
    }
}
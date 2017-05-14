export function toFetched<T>(apps: T[]): AppListState<T>
{
    return { isFetching: false, apps };
}
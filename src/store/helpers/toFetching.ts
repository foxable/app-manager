export function toFetching<T>(appListState: AppListState<T>): AppListState<T>
{
    return { ...appListState, isFetching: true };
}
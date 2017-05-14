export function createLocalAction(action: AppAction): AppAction
{
    return { ...action, scope: "local" };
}
export default function createLocalAction(action: AppAction): AppAction
{
    return { ...action, scope: "local" };
}
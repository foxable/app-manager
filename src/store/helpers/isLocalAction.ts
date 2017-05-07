/// <reference path="../store.d.ts"/>

export default function isLocalAction(action: Action): boolean
{
    return action.isLocalScope;
}
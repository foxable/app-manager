/// <reference path="../store.d.ts"/>

export default function createLocalAction(action: Action): Action
{
    return { ...action, isLocalScope: true };
}
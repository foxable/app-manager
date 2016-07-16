export const allAppsTemplate = `
    <div class="container" ng-controller="AppsController">
        <h1>All Applications</h1>
        <button class="btn btn-sm btn-primary" ng-click="openCreateAppModal()">
            <i class="fa fa-plus"></i> Add Application
        </button>
        <table class="table table-striped table-hover" ng-hide="apps.length === 0">
            <thead>
                <tr>
                    <th>Application</th>
                    <th>Latest Version</th>         
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="app in apps">
                    <td>{{ app.name }}</td>
                    <td>{{ app.latest_version }}</td>
                    <td>
                        <button class="btn btn-sm btn-warning">
                            <i class="fa fa-refresh" aria-hidden="true"></i> Update Version
                        </button>
                        <button class="btn btn-sm btn-primary">
                            <i class="fa fa-edit" aria-hidden="true"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-danger">
                            <i class="fa fa-trash"></i> Delete
                        </button>              
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
`;
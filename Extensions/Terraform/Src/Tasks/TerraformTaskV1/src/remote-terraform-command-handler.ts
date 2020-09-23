import tasks = require('azure-pipelines-task-lib/task');
import {ToolRunner} from 'azure-pipelines-task-lib/toolrunner';
import {TerraformAuthorizationCommandInitializer} from './terraform-commands';
import {BaseTerraformCommandHandler} from './base-terraform-command-handler';

export class TerraformCommandHandlerRemote extends BaseTerraformCommandHandler {
    constructor() {
        super();
        this.providerName = "remote";
    }

    private setupBackend(backendServiceName: string) {
        this.backendConfig.set('hostname', tasks.getEndpointAuthorizationParameter(backendServiceName, "hostname", true));
        this.backendConfig.set('organization', tasks.getEndpointAuthorizationParameter(backendServiceName, "organization", false));
        this.backendConfig.set('token', tasks.getEndpointAuthorizationParameter(backendServiceName, "token", false));
        this.backendConfig.set('workspaces.name', tasks.getInput("backendRemoteWorkspace", false));
    }

    public handleBackend(terraformToolRunner: ToolRunner): void {
        let backendServiceName = tasks.getInput("backendServiceRemote", true);
        this.setupBackend(backendServiceName);

        for (let [key, value] of this.backendConfig.entries()) {
            terraformToolRunner.arg(`-backend-config=${key}=${value}`);
        }
    }

    public handleProvider(command: TerraformAuthorizationCommandInitializer) {
        throw new Error("Remote provider can only be used with init command");
    }
}
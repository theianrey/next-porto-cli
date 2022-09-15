"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
require("module-alias/register");
const core_1 = require("@oclif/core");
class Project extends core_1.Command {
    async run() {
        this.log('Create a project boilerplate.');
    }
}
exports.Project = Project;
// * disable variable argument validation
Project.strict = false;
// *
Project.description = 'Create a container';

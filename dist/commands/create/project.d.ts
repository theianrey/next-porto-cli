import 'module-alias/register';
import { Command } from '@oclif/core';
export declare class Project extends Command {
    static strict: boolean;
    static description: string;
    run(): Promise<void>;
}

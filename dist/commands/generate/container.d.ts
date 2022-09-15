import 'module-alias/register';
import { Command } from '@oclif/core';
/**
 * Container command class
 */
export declare class Container extends Command {
    static strict: boolean;
    static description: string;
    static flags: {
        section: import("@oclif/core/lib/interfaces").OptionFlag<string>;
        container: import("@oclif/core/lib/interfaces").OptionFlag<string>;
        force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    run(): Promise<void>;
}

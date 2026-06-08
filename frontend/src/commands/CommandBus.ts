import type { Command } from "./Command";

export class CommandBus {

    execute(command: Command){
        command.execute()
    }
}
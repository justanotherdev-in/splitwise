import fs from 'fs';
import { join } from 'path';
import readLine from 'readline';
import CommandController from './controller/command-controller';
import UserExpenseController from './controller/user-expense-controller';

function readCommand() {
    const fileName = process.argv[2];
    const file = join(process.cwd(), fileName);
    if (!fs.existsSync(file)) {
        throw new Error(`${file} File not found`);
    }

    const rl = readLine.createInterface({
        input: fs.createReadStream(file)
    })
    const splitwise = new UserExpenseController();
    const users = [
        {
            id: 'u1',
            name: 'Raj'
        },
        {
            id: 'u2',
            name: 'Ravi'
        },
        {
            id: 'u3',
            name: 'Rohan'
        },
        {
            id: 'u4',
            name: 'Rohit'
        }
    ];
    users.forEach(user => splitwise.addUser(user.id, user.name));
    console.log(splitwise.userMap);
    const commandController = new CommandController(splitwise);
    rl.on('line', (command) => {
        
        if (command === 'exit') {
            console.log('Exiting!!');
            return rl.close();
        }
        let resp;
        try {
            resp = commandController.parseAndExecuteCommand(command);
            if (resp)
                console.log(Array.isArray(resp) ? resp.join('\n') : resp);
        } catch (e) {
            console.log(e);
            resp = 'Unknow Error';
            if (e instanceof Error) {
                resp = e.message
            }
        }
    });
}

readCommand();
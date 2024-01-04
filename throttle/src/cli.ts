import figlet from "figlet";
console.log(figlet.textSync("Throttle"));

import { program } from 'commander';
import * as readline from 'readline'; // Be careful with this import
import { throttle } from './throttle';

// Crear interfície readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

program
    .version('1.0.0')
    .description('CLI for the throttle function'); 

program
    .command('run')
    .description('Execute the throttle function')
    .option('-t, --timeout <milliseconds>', "Specify the time between each call")
    .action(() => {
        rl.question(
            "What wait time between each call do you want to use? (in milliseconds, " +
            "press enter to use the default value 1000): ",
            (answer) => {
                // Converteix el temps de demora a un número, 
                // si no es proporciona cap resposta, utilitza el valor per defecte 
                const timeout = parseInt(answer, 10) || 1000;

                // Executa la funció throttle amb el temps de demora proporcionat
                const throttledFunction = throttle(() => {
                    console.log(`Throttle function with a wait time of ${timeout} ` + 
                    "milliseconds between calls successfully executed");
                }, timeout);

                throttledFunction();
                // Tanca la interfície de lectura
                rl.close();
            });

    });

// Analitza els arguments de la línia de comandes
program.parse(process.argv);

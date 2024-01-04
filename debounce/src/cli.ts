import figlet from "figlet";
console.log(figlet.textSync("Debounce"));

import { program } from 'commander';
import * as readline from 'readline'; // compte amb aquesta importació
import { debounce } from './debounce';

// Crear interfície readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

program
    .version('1.0.0')
    .description('CLI for the debounce function');

program
    .command('run')
    .description('Execute the debounce function')
    .option('-t, --timeout <milliseconds>', "Specify the time between each call")
    .action(() => {
        // Preguntem a l'usuari quin temps de demora vol
        rl.question(
            "What wait time do you want to use? (in milliseconds, press enter " +
            "to use the default value 1000): ",
            (answer) => {
                // Converteix el temps de demora a un número, 
                // si no es proporciona cap resposta, utilitza el valor per defecte 
                const timeout = parseInt(answer, 10) || 1000;

                // Executa la funció debounce amb el temps de demora proporcionat
                const debouncedFunction = debounce(() => {
                    console.log(`Debounce function with a wait time of ${timeout} ` + 
                    "milliseconds successfully executed,");
                }, timeout);

                debouncedFunction();
                // Tanca la interfície de lectura
                rl.close();
            });

    });

// Analitza els arguments de la línia de comandes
program.parse(process.argv);

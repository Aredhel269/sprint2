// Importem la llibreria 'figlet' per a l'art de text i la utilitzem per mostrar "Memoize" a la consola.
import figlet from 'figlet';
console.log(figlet.textSync('Memoize'));

// Importem les llibreries necessàries.
import { program } from 'commander';
import * as readline from 'readline';
import { memoize, clearCache } from './memoize';

// Creem una interfície readline per gestionar l'entrada/sortida.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Definim la versió i la descripció del programa.
program
  .version('1.0.0')
  .description('CLI for the memoize function');

// Definim la comanda 'run' que executa la funció memoize.
program
  .command('run')
  .description('Execute the memoize function')
  .option('-t, --timeout <milliseconds>', "Specify the time between each call")
  .action(() => {
    // Defineix una funció per preguntar l'usuari per un valor.
    const askForValue = () => {
        rl.question('Enter a value to memoize: ', (answer) => {
            // Crea una funció memoitzada i executa la lògica memoitzada amb la resposta de l'usuari.
        const memoizedFunction = memoize((value: string) => {
            console.log(`Memoized value: ${value}`);
            return `Result for ${value}`;
        });

        const result = memoizedFunction(answer);
        console.log(result);

        // Pregunta si l'usuari vol memoitzar un altre valor.
        rl.question("Do you want to memoize another value? (yes/no): ", (again) => {
            if (again.toLowerCase() === 'yes') {
            clearCache(); // Neteja la memòria cau abans de continuar amb un nou valor.
            console.log("Cache cleared. Enter another value.");
            // Torna a preguntar per un altre valor.
            askForValue();
          } else {
            // Si la resposta és no, tanca la interfície de lectura.
            console.log("End of the application.")
            rl.close();
          }
        });
      });
    };
    // Inicia el procés preguntant per un valor.
    askForValue();
  });

// Analitza els arguments de la línia de comandes.
program.parse(process.argv);
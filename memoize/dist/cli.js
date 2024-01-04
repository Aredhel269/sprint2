"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
console.log(figlet_1.default.textSync('Memoize'));
const commander_1 = require("commander");
const readline = __importStar(require("readline"));
const memoize_1 = require("./memoize");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
commander_1.program
    .version('1.0.0')
    .description('CLI for the memoize function');
commander_1.program
    .command('run')
    .description('Execute the memoize function')
    .option('-t, --timeout <milliseconds>', "Specify the time between each call")
    .action(() => {
    const askForValue = () => {
        rl.question('Enter a value to memoize: ', (answer) => {
            const memoizedFunction = (0, memoize_1.memoize)((value) => {
                console.log(`Memoized value: ${value}`);
                return `Result for ${value}`;
            });
            const result = memoizedFunction(answer);
            console.log(result);
            rl.question("Do you want to memoize another value? (yes/no): ", (again) => {
                if (again.toLowerCase() === 'yes') {
                    (0, memoize_1.clearCache)();
                    console.log("Cache cleared. Enter another value.");
                    askForValue();
                }
                else {
                    console.log("End of the application.");
                    rl.close();
                }
            });
        });
    };
    askForValue();
});
commander_1.program.parse(process.argv);
//# sourceMappingURL=cli.js.map
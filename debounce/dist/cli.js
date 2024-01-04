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
console.log(figlet_1.default.textSync("Debounce"));
const commander_1 = require("commander");
const readline = __importStar(require("readline"));
const debounce_1 = require("./debounce");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
commander_1.program
    .version('1.0.0')
    .description('CLI for the debounce function');
commander_1.program
    .command('run')
    .description('Execute the debounce function')
    .option('-t, --timeout <milliseconds>', "Specify the time between each call")
    .action(() => {
    rl.question("What wait time do you want to use? (in milliseconds, press enter " +
        "to use the default value 1000): ", (answer) => {
        const timeout = parseInt(answer, 10) || 1000;
        const debouncedFunction = (0, debounce_1.debounce)(() => {
            console.log(`Debounce function with a wait time of ${timeout} ` +
                "milliseconds successfully executed,");
        }, timeout);
        debouncedFunction();
        rl.close();
    });
});
commander_1.program.parse(process.argv);
//# sourceMappingURL=cli.js.map
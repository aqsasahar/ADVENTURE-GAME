import inquirer from "inquirer";
import chalk from "chalk";
//first we construct player classes  
class player {
    name;
    fuel = 100;
    constructor(myPlayerName) {
        this.name = myPlayerName;
    }
    //now we make function/method of fuel
    fuelDecrease() {
        this.fuel = this.fuel - 25;
    }
    fuelIncrease() {
        this.fuel = this.fuel + 25;
    }
}
//class of opponent
class Opponent {
    name;
    fuel = 100;
    constructor(opponentName) {
        this.name = opponentName;
    }
    // we use only decreease function for opponent 
    fuelDecrease() {
        this.fuel = this.fuel - 25;
    }
}
//******* CLASSES DONE **********//
// ASK USER NAME AND OPPONENT NAME
let userInput = await inquirer.prompt([
    {
        type: "input",
        name: "myName",
        message: "Enter Your Name:"
    },
    {
        type: "list",
        name: "opponentName",
        message: "Select Your Opponent",
        choices: ["Alien", "Ghost", "Zombie"]
    }
]);
let { myName, opponentName } = userInput;
console.log(`${chalk.bold.greenBright(myName)} vs ${chalk.bold.redBright(opponentName)}\n`);
// now make objected from classes you create above:
let myPlayer1 = new player(myName);
let myOpponent1 = new Opponent(opponentName);
//while loop start
while (true) {
    let startMatch = await inquirer.prompt({
        type: `list`,
        name: `options`,
        message: `Select Your Option`,
        choices: ["Attack", "Increase Health", "Run For Life.."]
    });
    let { options } = startMatch;
    //reconstruct our code 
    // applying conditions
    if (options === "Attack")
        attackFun();
    if (options === `Increase Health`)
        IncreaseHealthFun();
    if (options === `Run For Life...`)
        RunForLifeFun();
    //function start //ATTACK
    function attackFun() {
        // generate random number which print 1 or 0 just
        let number = Math.floor(Math.random() * 2); // every time answer is 1 or 0
        //when the random nuber is equal to 0 ,decrease the fuel of my player.
        if (number === 0) {
            myPlayer1.fuelDecrease();
            console.log(`${myPlayer1.name} fuel is ${chalk.bold.red(myPlayer1.fuel)}\n`);
            console.log(`${myOpponent1.name} fuel is ${chalk.bold.green(myOpponent1.fuel)}\n`);
            if (myPlayer1.fuel === 0) {
                console.log(`${chalk.bold.red(myPlayer1.name)}lost! better luck next time\n`);
                //  process.exit();
            }
        }
        //when the random nuber is equal to 1 ,decrease the fuel of my player.
        if (number === 1) {
            myOpponent1.fuelDecrease();
            console.log(`${myPlayer1.name} fuel is ${chalk.bold.green(myPlayer1.fuel)}`);
            console.log(`${myOpponent1.name} fuel is ${chalk.bold.red(myOpponent1.fuel)}`);
            if (myOpponent1.fuel === 0) {
                console.log(`CONGRATULATIONS ${chalk.bold.green(myPlayer1.name)}!you won the game\n`); // code is runing succesfully
                //   process.exit();
            }
        }
    } //   ******** attack function done/end**********
    //increase health function start
    function IncreaseHealthFun() {
        myPlayer1.fuelIncrease();
        console.log(`${myPlayer1.name}fuel is increase to ${chalk.bold.green(myPlayer1.fuel)}\n`);
    }
    //run for life function
    function RunForLifeFun() {
        console.log(`${chalk.bold.red(myPlayer1.name)}lost! better luck next time\n`);
        process.exit();
    }
} // while loop curlybraces

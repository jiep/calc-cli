#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

const { add, sub, mul, div } = require('../lib');

const isNumeric = a => typeof(a) === 'number' && !isNaN(a);

const checkParams = (a,b) => {
  if(!isNumeric(+a) || !isNumeric(+b)) {
    console.log(chalk.red('Params must be numeric'));
    process.exit(-1);
  }
}

const print = (a,b,op,f) => console.log(`%s ${chalk.blue(f(a,b))}`, chalk.grey(`${a} ${op} ${b} is`));

const doAction = (a,b,op,f) => {
  checkParams(a,b);
  print(a, b, op, f);
}

const commands = [
  {
    name: 'add',
    alias: 'a',
    description: 'Sum two numbers',
    action: (a, b) =>  doAction(+a, +b, '+', add)
  },
  {
    name: 'sub',
    alias: 's',
    description: 'Sub two numbers',
    action: (a, b) =>  doAction(+a, +b, '-', sub)
  },
  {
    name: 'mul',
    alias: 'm',
    description: 'Mul two numbers',
    action: (a, b) =>  doAction(+a, +b, '*', mul)
  },
  {
    name: 'div',
    alias: 'd',
    description: 'Div two numbers',
    action: (a, b) =>  doAction(+a, +b, '/', div)
  }
]

const createCommand = (command) => {
  const { name, alias, description, action } = command;
  program
    .command(name)
    .alias(alias)
    .description(description)
    .action(action)
}

commands.forEach(command => createCommand(command));

program.parse(process.argv);

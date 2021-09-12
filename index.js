#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const usuarios = [];

console.log(
  chalk.yellow(figlet.textSync('Teste node', { horizontalLayout: 'full' }))
);

function run() {
  try {
    clear();

    rl.question(
      `
    ${chalk.green('1 - Listar usuários')}\n
    ${chalk.green('2 - Cadastrar usuário')}\n
    ${chalk.green('3 - Deletar usuário')}\n
    ${chalk.green('4 - Finalizar programa')}\n
      `,
      (answer) => {
        switch (answer) {
          case '1':
            if (usuarios.length === 0) {
              console.log(chalk.blue('Nenhum usuário cadastrado'));
            } else {
              usuarios.forEach(function(item, index, usuario){                
                 console.log(chalk.blue(index+1,'-', item))               
                });
            }
            setTimeout(() => {
              run();
            }, 2000);
            break;
          case '2':
            rl.question('Digite o nome do usuário\n', (r) => {
              const usuario = usuarios.find((u) => u === r);
              if (!usuario) {
                usuarios.push(r);
                console.log(chalk.blue('Usuário cadastrado.'));
              } else {
                console.log(chalk.red('Usuário com esse nome já cadastrado'));
              }
              setTimeout(() => {
                run();
              }, 1500);
            });
            break;
          case '3':
            rl.question(
              'Informe o nome do usuário que quer deletar.\n',
              (r) => {
                const resp = usuarios.findIndex((u) => u === r);

                if (resp === -1) {
                  console.log(
                    chalk.red('Não existe usuário com o nome informado.')
                  );
                } else {
                  usuarios.splice(resp, 1);
                  console.log(chalk.blue('Usuário deletado.'));
                }
                setTimeout(() => {
                  run();
                }, 1500);
              }
            );
            break;
          case '4':
            rl.close();
          default:
            run();
            break;
        }
      }
    );
  } catch (err) {
    console.log(chalk.red(err.message));
  }
}

run();

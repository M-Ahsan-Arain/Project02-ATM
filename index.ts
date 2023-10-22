import inquirer from 'inquirer';

// Define a simple bank object to hold user account balances
const bank: Record<string, number> = {
  user1: 1000,
  user2: 1500,
};

async function main() {
  console.log('Welcome to the ATM');

  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Check Balance', 'Withdraw', 'Signup', 'Exit'],
      },
    ]);

    if (action === 'Exit') {
      console.log('Thank you for using the ATM. Goodbye!');
      break;
    }

    if (action === 'Signup') {
      await signup();
    }

    if (action === 'Check Balance') {
      const { user } = await inquirer.prompt([
        {
          type: 'input',
          name: 'user',
          message: 'Enter your username:',
        },
      ]);

      if (bank[user]) {
        console.log(`Your balance is: $${bank[user]}`);
      } else {
        console.log('User not found.');
      }
    }

    if (action === 'Withdraw') {
      const { user, amount } = await inquirer.prompt([
        {
          type: 'input',
          name: 'user',
          message: 'Enter your username:',
        },
        {
          type: 'input',
          name: 'amount',
          message: 'Enter the amount to withdraw:',
        },
      ]);

      if (bank[user]) {
        const withdrawalAmount = parseFloat(amount);
        if (withdrawalAmount > 0 && withdrawalAmount <= bank[user]) {
          bank[user] -= withdrawalAmount;
          console.log(`Withdrawal successful. Your new balance is: $${bank[user]}`);
        } else {
          console.log('Invalid amount or insufficient funds.');
        }
      } else {
        console.log('User not found.');
      }
    }
  }
}

async function signup() {
  const { username, initialBalance } = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Enter a username:',
    },
    {
      type: 'input',
      name: 'initialBalance',
      message: 'Enter the initial balance:',
    },
  ]);

  const initialBalanceValue = parseFloat(initialBalance);

  if (!username || initialBalanceValue <= 0) {
    console.log('Invalid username or initial balance.');
    return;
  }

  if (bank[username]) {
    console.log('Username is already taken.');
  } else {
    bank[username] = initialBalanceValue;
    console.log('Signup successful. Your account is created.');
  }
}

main();


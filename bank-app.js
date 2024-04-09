class BankAccount {
  constructor(acctID, initialDeposit) {
    this.acctID = acctID;
    this.balance = initialDeposit;
  }

  deposit(amount) {
    if (amount < 0) {
      throw new Error("Deposit amount should be greater than 0.");
    }
    this.balance += amount;
  }

  withdraw(amount) {
    if (amount < 0) {
      throw new Error("Withdrawal amount should be greater than 0.");
    }

    if (this.balance < amount) {
      throw new Error("Insufficient funds");
    }

    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }
}

class BankService {
  constructor() {
    this.accounts = {};
  }
  //account creation
  createAccount(initialDeposit) {
    if (initialDeposit < 0) {
      throw new Error("Initial Deposit amount should be greater than 0.");
    }

    const acctID = Object.keys(this.accounts).length + 1;
    this.accounts[acctID] = new BankAccount(acctID, initialDeposit);
    return acctID;
  }

  //deposit to account
  depositToAccount(acctID, amount) {
    this.getAccount(acctID).deposit(amount);
  }

  //withdraw from account
  withdrawFromAccount(acctID, amount) {
    this.getAccount(acctID).withdraw(amount);
  }

  //tranfer fund between 2 accounts
  transferBetweenAccount(fromAcctID, toAcctID, amount) {
    const fromAccountID = this.getAccount(fromAcctID);
    const toAccounttID = this.getAccount(toAcctID);

    if (fromAccountID.getBalance() < amount) {
      throw new Error("Insufficient funds to transfer.");
    }

    fromAccountID.withdraw(amount);
    toAccounttID.deposit(amount);
  }

  getAccountBalance(acctID) {
    return this.getAccount(acctID).getBalance();
  }

  getAccount(accountId) {
    const account = this.accounts[accountId];

    if (!account) {
      throw new Error(`Account ${accountId} does not exist.`);
    }
    return account;
  }
}

/**
 * TEST SCENARIOS
 */

function createAccountTest() {
  const account = new BankAccount(1, 100);
  console.assert(
    account.getBalance() === 100,
    "Failed to initialize account with correct balance"
  );
}

function depositTest() {
  const account = new BankAccount(2, 100);
  account.deposit(50);
  console.assert(account.getBalance() === 150, "Failed to deposit");
}

function withdrawTest() {
  const account = new BankAccount(2, 150);
  account.withdraw(30);
  console.assert(account.getBalance() === 120, "Failed to withdraw");
}

function overdraftTest() {
  const account = new BankAccount(4, 100);
  try {
    account.withdraw(150);
    console.error("Failed to throw error on overdraft");
  } catch (e) {
    console.assert(
      e.message === "Insufficient funds",
      "Failed to handle overdraft correctly"
    );
  }

}


function invalidDepositTest() {
  const account = new BankAccount(0.4, 100);
  try {
    account.deposit(-50);
    console.error("Failed to throw error on invalid deposit amount");
  } catch (e) {
    console.assert(
      e.message === "Deposit amount should be greater than 0.",
      "Failed to handle invalid deposit amount correctly"
    );
  }
}

// Running the tests
function runTests() {
  createAccountTest();
  depositTest();
  withdrawTest();
  overdraftTest();
  invalidDepositTest();

  console.log("All tests completed.");
}

runTests();

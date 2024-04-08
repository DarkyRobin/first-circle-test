class BankAccount {
  constructor(acctID, initialDeposit) {
    this.acctID = acctID;
    this.balance = initialDeposit;
  }

  deposit(amount){
    if (amount < 0) {
      throw new Error("Deposit amount should be greater than 0.");
    }
    this.balance += amount;
  }

  withdraw(amount) {
    if (amount < 0) {
      throw new Error("Withdrawal amount should be greater than 0.");
    } else (this.balance < amount ) {
      throw new Error("Withdrawal amount should not be greater than your balance.");
    }
    this.balance -= amount;
  }
}
import { createContext, useContext, useState } from "react";

// Context ဖန်တီးမယ်
const BalanceContext = createContext();

// Provider component ဖန်တီးမယ်
export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(12543.74); // မူလလက်ကျန်က 12543.74
  const [transactions, setTransactions] = useState([]);

  const addTransaction = ({ to, amount, note }) => {
    const parsedAmount = parseFloat(amount);
    const newTransaction = {
      id: Date.now(),
      to,
      amount: -parsedAmount, // လွှဲထုတ်မှုအတွက် negative
      note,
      date: new Date().toISOString(),
    };
    setTransactions([newTransaction, ...transactions]);
    setBalance(balance - parsedAmount);
  };

  return (
    <BalanceContext.Provider value={{ balance, transactions, addTransaction }}>
      {children}
    </BalanceContext.Provider>
  );
}

// Custom hook ဖန်တီးမယ်
export function useBalance() {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance ကို BalanceProvider ထဲမှာ သုံးရပါမယ်။");
  }
  return context;
}

// Default export ထည့်မယ်
export default BalanceProvider;
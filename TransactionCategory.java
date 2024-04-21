public class TransactionCategory {
    public String name;
    Boolean income; // there's gotta be a better way to represent this
    Transaction[] transactionList;

     public TransactionCategory(String name, Boolean income) {
        this.name = name;
        this.income = income;
    }
}

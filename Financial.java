public class Financial {
    public static void main(String[] args) {
        Transaction groceryRun1 = new Transaction(50.24, "WinCo Foods", new TransactionCategory("groceries", false));
        System.out.println(groceryRun1);
    }
}

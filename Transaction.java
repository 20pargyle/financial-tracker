import java.time.*;

public class Transaction {
    private double amount;
    private String name;
    private LocalDateTime date;
    private TransactionCategory category;
    private String note;

    public Transaction(double amount, String name, LocalDate date) {
        this.amount = amount;
        this.name = name;
        this.date = date;
    }
    public Transaction(double amount, String name, LocalDate date, TransactionCategory category) {
        this.amount = amount;
        this.name = name;
        this.date = date;
        this.category = category;
    }

    public double getAmount(){ return this.amount; }
    public void setAmount(double newAmount){ this.amount = newAmount; }
    public String getName(){ return this.name; }
    public void setName(String newName){ this.name = newName; }
    public String getCategory(){ return this.category.toString(); }
    public String getNote(){ return this.note; }
    public void setNote(String newNote){ this.note = newNote; }
    public String getDate(){ return date.toString(); }
    public void setDate(LocalDate newDate){ this.date = newDate; }

    public String toString(){
        return "Transaction from " + this.name + " for $" + this.amount + " happened " + this.date.toString() + ", in category \"" + this.category.name + "\".";  
    }
}
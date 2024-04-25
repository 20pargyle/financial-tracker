import javax.swing.*;

import java.awt.Button;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Financial extends JFrame {
    
    public Financial(){
        setTitle("Financial");
        setSize(400, 300);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        createForm();
    }
    
    private void createForm() {
        JPanel panel = new JPanel();
        getContentPane().add(panel);

        JLabel label = new JLabel("Name:");
        panel.add(label);

        JTextField textField = new JTextField(20);
        panel.add(textField);

        JButton button = new JButton("Submit");
        panel.add(button);
        button.addActionListener(new ButtonClickListener());
    }

    private class ButtonClickListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            String name = "Ethan";
            System.out.println("Hello, " + name);
        }
    }    

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            Financial ui = new Financial();
            ui.setVisible(true);
        });

    }
}

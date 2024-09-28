import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons



const { width, height } = Dimensions.get('window');
const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isScientific, setIsScientific] = useState(false);
  const [isLoan, setIsLoan] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [loanResult, setLoanResult] = useState('');
  const [history, setHistory] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const Sidebar = ({ visible, onClose }) => {
    if (!visible) return null;
    
    return (
        <View style={styles.overlay}>

        <View style={styles.sidebar}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {
          setIsLoan(false);
          setIsScientific(false); // Switch back to basic mode
          onClose();
        }}>

        <Text style={styles.sidebarItem}>Basic Calculator</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setIsLoan(true);
          setIsScientific(false); // Disable scientific mode when loan mode is active
          onClose(); // Close the sidebar after selection
        }}>
        
        <Text style={styles.sidebarItem}>Loan Calculator</Text>
        </TouchableOpacity>

          <Text style={styles.sidebarItem}>Option 1</Text>
          <Text style={styles.sidebarItem}>Option 2</Text>
          <Text style={styles.sidebarItem}>Option 3</Text>
        </View>
      </View>
      );
    };
    

  const handlePress = (value) => {
    setInput(prevInput => prevInput + value);
  };

  const handleBackspace = () => {
    setInput(prevInput => prevInput.slice(0, -1));
  };

  const calculate = () => {
    try {
      const calculatedResult = eval(input); // Be cautious with eval
      setResult(calculatedResult);
      setHistory(prevHistory => [...prevHistory, { input, result: calculatedResult }]);
    } catch (e) {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setLoanResult('');
  };

  const toggleCalculator = () => {
    setIsScientific(false);
    setIsLoan(false);
  };

  const toggleScientific = () => {
    setIsScientific(!isScientific);
    setIsLoan(false);
  };

  const toggleLoan = () => {
    setIsLoan(!isLoan);
    setIsScientific(false);
  };

  const calculateLoan = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;
    const monthlyPayment = (P * r) / (1 - Math.pow(1 + r, -n));
    setLoanResult(monthlyPayment.toFixed(2));
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text>{item.input} = {item.result}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
       {/* Menu Icon */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setIsSidebarVisible(!isSidebarVisible)}>
          <Icon name="menu" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      <Sidebar visible={isSidebarVisible} onClose={() => setIsSidebarVisible(false)} />

      <FlatList
        data={history}
        ListHeaderComponent={
          <View> 
            {!isLoan && (
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Enter calculation"
          editable={false}  // Disables keyboard and input
        />
      )}
            
            {!isLoan && <Text style={styles.result}>{result}</Text>}
            {isLoan && (
              <View style={styles.loanContainer}>

                <TextInput
                  style={styles.input}
                  value={loanAmount}
                  onChangeText={setLoanAmount}
                  placeholder="Loan Amount"
                  editable={false}  // Disables keyboard and input
                />
                <TextInput
                  style={styles.input}
                  value={interestRate}
                  onChangeText={setInterestRate}
                  placeholder="Interest Rate (%)"
                  editable={false}  // Disables keyboard and input
                />
                <TextInput
                  style={styles.input}
                  value={loanTerm}
                  onChangeText={setLoanTerm}
                  placeholder="Loan Term (Years)"
                  editable={false}  // Disables keyboard and input
                />
                <TouchableOpacity style={styles.button} onPress={calculateLoan}>
                  <Text>Calculate Loan</Text>
                </TouchableOpacity>
                <Text style={styles.result}>Monthly Payment: ${loanResult}</Text>
              </View>
            )}
          </View>
        }
        renderItem={renderHistoryItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.historyList}
        ListHeaderComponentStyle={{ marginBottom: 10 }}
      />
      <View style={styles.buttonsContainer}>
        
        <View style={styles.row}>
          <TouchableOpacity style={styles.button2} onPress={toggleLoan}>
            <Icon name="camera" size={25} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={toggleScientific}>
            <Icon isScientific name="refresh" size={25} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={handleBackspace}>
          <Icon name="history" size={25} color="#333" />
            </TouchableOpacity>
        </View>

        {isScientific && (
          <>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button1} onPress={() => handlePress('Math.sin(')}>
                <Text style={styles.buttonText}>sin</Text>
                </TouchableOpacity>
              <TouchableOpacity style={styles.button1} onPress={() => handlePress('Math.cos(')}>
                <Text style={styles.buttonText}>cos</Text>
                </TouchableOpacity>
              <TouchableOpacity style={styles.button1} onPress={() => handlePress('Math.tan(')}>
                <Text style={styles.buttonText}>tan</Text>
                </TouchableOpacity>
              <TouchableOpacity style={styles.button1} onPress={() => handlePress('Math.exp(')}>
                <Text style={styles.buttonText}>exp</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button1} onPress={() => handlePress('Math.sqrt(')}>
                <Text style={styles.buttonText}>√</Text>
                </TouchableOpacity>
              <TouchableOpacity style={styles.button1} onPress={() => handlePress('Math.log(')}>
                <Text style={styles.buttonText}>log</Text>
                </TouchableOpacity>
              <TouchableOpacity style={styles.button1} onPress={() => handlePress('Math.PI')}>
                <Text style={styles.buttonText}>π</Text>
                </TouchableOpacity>
              <TouchableOpacity style={styles.button1} onPress={() => handlePress('Math.E')}>
                <Text style={styles.buttonText}>e</Text>
                </TouchableOpacity>
            </View>
          </>
        )}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button1} onPress={handleClear}>
          <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={() => handlePress('(')}>
          <Text style={styles.buttonText}>(</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={() => handlePress(')')}>
          <Text style={styles.buttonText}>)</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={() => handlePress('/')}>
          <Text style={styles.buttonText}>/</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
          <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
          <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
          <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={() => handlePress('*')}>
          <Text style={styles.buttonText}>*</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
          <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
          <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
          <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={() => handlePress('-')}>
          <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
          <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
          <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
          <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={() => handlePress('+')}>
          <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('.')}>
          <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
          <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleBackspace}>
            <Icon name="backspace" size={25} color="#fff" />
            </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={calculate}>
          <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
          
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width * 0.05,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  input: {
    fontSize: 24,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'right',
  },
  result: {
    fontSize: 30,
    margin: 10,
    textAlign: 'right',
    color: '#333',
  },
  historyList: {
    flex: 1,
    width: '100%',
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loanContainer: {
    marginVertical: 10,
  },
  buttonsContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: width * 0.07,
    color: '#fff',
  },
  button: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.2,
    height: height * 0.08,
  },

  button1: {
    width: width * 0.2,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA161',
    borderRadius: 10,
  },
  button2: {
    width: width * 0.2,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button3: {
    width: width * 0.2,
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA161',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
    zIndex: 1, // Ensure sidebar is above everything else
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '60%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  closeButton: {
    fontSize: 18,
    marginBottom: 20,
  },
  sidebarItem: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Calculator;

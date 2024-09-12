import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native';

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
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Enter calculation"
          keyboardType="numeric"
          editable={!isLoan}
        />
        {!isLoan && <Text style={styles.result}>{result}</Text>}
        {isLoan && (
          <View style={styles.loanContainer}>
            <TextInput
              style={styles.input}
              value={loanAmount}
              onChangeText={setLoanAmount}
              placeholder="Loan Amount"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={interestRate}
              onChangeText={setInterestRate}
              placeholder="Interest Rate (%)"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={loanTerm}
              onChangeText={setLoanTerm}
              placeholder="Loan Term (Years)"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={calculateLoan}>
              <Text>Calculate Loan</Text>
            </TouchableOpacity>
            <Text style={styles.result}>Monthly Payment: ${loanResult}</Text>
          </View>
        )}
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.historyList}
          ListHeaderComponent={<Text style={styles.historyHeader}>History:</Text>}
        />
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={toggleCalculator}>
            <Text>{isScientific || isLoan ? 'Normal' : 'Calculator'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleScientific}>
            <Text>{isScientific ? 'Basic' : 'Scientific'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleLoan}>
            <Text>{isLoan ? 'Basic' : 'Loan'}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleBackspace}><Text>←</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleClear}><Text>C</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('(')}><Text>(</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress(')')}><Text>)</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('/')}><Text>/</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}><Text>7</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}><Text>8</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}><Text>9</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('*')}><Text>*</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}><Text>4</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}><Text>5</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}><Text>6</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('-')}><Text>-</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}><Text>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}><Text>2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}><Text>3</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('+')}><Text>+</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}><Text>0</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('.')}><Text>.</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={calculate}><Text>=</Text></TouchableOpacity>
        </View>
        {isScientific && (
          <>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => handlePress('Math.sin(')}><Text>sin</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handlePress('Math.cos(')}><Text>cos</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handlePress('Math.tan(')}><Text>tan</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handlePress('Math.exp(')}><Text>exp</Text></TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => handlePress('Math.sqrt(')}><Text>√</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handlePress('Math.log(')}><Text>log</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handlePress('Math.PI')}><Text>π</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handlePress('Math.E')}><Text>e</Text></TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  input: {
    fontSize: 24,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'right',
  },
  result: {
    fontSize: 30,
    margin: 10,
    padding: 10,
    textAlign: 'right',
  },
  loanContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  buttonsContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  historyList: {
    marginVertical: 10,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  historyHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
});

export default Calculator;

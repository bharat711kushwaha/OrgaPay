import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  BadgeIndianRupee,
  Search
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Transaction = () => {
  const insets = useSafeAreaInsets();
  
  // Sample data - extremely simple
  const transactions = [
    {
      id: 1,
      title: "Salary Deposit",
      date: "Today, 10:30 AM",
      amount: 45000,
      type: "income",
      category: "Bank Deposit"
    },
    {
      id: 2,
      title: "BigBasket Groceries",
      date: "Today, 3:45 PM",
      amount: -2680,
      type: "expense",
      category: "Shopping"
    },
    {
      id: 3,
      title: "ATM Withdrawal",
      date: "Yesterday, 2:45 PM",
      amount: -10000,
      type: "expense",
      category: "Withdrawal"
    },
    {
      id: 4,
      title: "Swiggy Order",
      date: "Yesterday, 8:15 PM",
      amount: -450,
      type: "expense",
      category: "Food"
    },
    {
      id: 5,
      title: "Electricity Bill",
      date: "May 05, 2025",
      amount: -2450,
      type: "expense",
      category: "Utilities"
    },
    {
      id: 6,
      title: "Transfer to Savings",
      date: "May 03, 2025",
      amount: -15000,
      type: "expense",
      category: "Transfer"
    }
  ];

  // Calculate totals
  const income = transactions.reduce((sum, tx) => tx.amount > 0 ? sum + tx.amount : sum, 0);
  const expenses = transactions.reduce((sum, tx) => tx.amount < 0 ? sum + Math.abs(tx.amount) : sum, 0);
  const balance = income - expenses;

  // Group transactions for display
  const todayTransactions = transactions.filter(tx => tx.date.includes('Today'));
  const yesterdayTransactions = transactions.filter(tx => tx.date.includes('Yesterday'));
  const olderTransactions = transactions.filter(tx => 
    !tx.date.includes('Today') && !tx.date.includes('Yesterday'));

  // Simple transaction group component
  const TransactionGroup = ({ title, transactions }) => {
    return (
      <View style={styles.transactionGroup}>
        <Text style={styles.groupTitle}>{title}</Text>
        <View style={styles.transactionList}>
          {transactions.map((tx) => (
            <View 
              key={tx.id} 
              style={styles.transactionCard}
            >
              <View style={styles.transactionContent}>
                <View>
                  <Text style={styles.transactionTitle}>{tx.title}</Text>
                  <Text style={styles.transactionDate}>{tx.date}</Text>
                  <View style={styles.categoryTag}>
                    <Text style={styles.categoryText}>{tx.category}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  tx.amount > 0 ? styles.incomeText : styles.expenseText
                ]}>
                  {tx.amount > 0 ? `+₹${tx.amount.toLocaleString()}` : `-₹${Math.abs(tx.amount).toLocaleString()}`}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8b5cf6" />
      
      {/* Basic Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        
        {/* Summary Cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryCardsContainer}
        >
          <View style={styles.summaryCard}>
            <View style={styles.summaryCardHeader}>
              <ArrowDownCircle size={16} color="#86efac" style={styles.summaryCardIcon} />
              <Text style={styles.summaryCardLabel}>Income</Text>
            </View>
            <Text style={styles.summaryCardValue}>₹{income.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryCardHeader}>
              <ArrowUpCircle size={16} color="#fca5a5" style={styles.summaryCardIcon} />
              <Text style={styles.summaryCardLabel}>Expenses</Text>
            </View>
            <Text style={styles.summaryCardValue}>₹{expenses.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryCardHeader}>
              <BadgeIndianRupee size={16} color="#93c5fd" style={styles.summaryCardIcon} />
              <Text style={styles.summaryCardLabel}>Balance</Text>
            </View>
            <Text style={styles.summaryCardValue}>₹{balance.toLocaleString()}</Text>
          </View>
        </ScrollView>
      </View>

      {/* Basic Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveTab}>
          <Text style={styles.inactiveTabText}>Statistics</Text>
        </TouchableOpacity>
      </View>

      {/* Simple Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={18} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            placeholder="Search transactions..."
            style={styles.searchInput}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Transaction Lists */}
      <ScrollView style={styles.transactionsContainer}>
        {todayTransactions.length > 0 && 
          <TransactionGroup title="Today" transactions={todayTransactions} />}
        
        {yesterdayTransactions.length > 0 && 
          <TransactionGroup title="Yesterday" transactions={yesterdayTransactions} />}
        
        {olderTransactions.length > 0 && 
          <TransactionGroup title="Earlier" transactions={olderTransactions} />}
          
        {/* Add bottom padding to ensure all content is visible */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Simple Floating Action Button */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab}>
          <BadgeIndianRupee size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  header: {
    backgroundColor: '#8b5cf6',
    padding: 16,
    paddingTop: 20,
    paddingBottom: 24
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16
  },
  summaryCardsContainer: {
    paddingBottom: 8,
    paddingRight: 8
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    minWidth: 140
  },
  summaryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  summaryCardIcon: {
    marginRight: 4
  },
  summaryCardLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)'
  },
  summaryCardValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  tabsContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  activeTab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#8b5cf6'
  },
  inactiveTab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  activeTabText: {
    color: '#8b5cf6',
    fontWeight: '600'
  },
  inactiveTabText: {
    color: '#4b5563',
    fontWeight: '600'
  },
  searchContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  searchInputContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
    padding: 0
  },
  transactionsContainer: {
    padding: 16
  },
  transactionGroup: {
    marginBottom: 16
  },
  groupTitle: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8
  },
  transactionList: {
    gap: 12
  },
  transactionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 12
  },
  transactionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  transactionTitle: {
    fontWeight: '500',
    fontSize: 15,
    color: '#1f2937'
  },
  transactionDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2
  },
  categoryTag: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4
  },
  categoryText: {
    fontSize: 11,
    color: '#4b5563'
  },
  transactionAmount: {
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'right'
  },
  incomeText: {
    color: '#10b981'
  },
  expenseText: {
    color: '#ef4444'
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    zIndex: 10
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  }
});

export default Transaction;
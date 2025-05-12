import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Image,
  SafeAreaView, 
  StatusBar, 
  Animated, 
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
 
  Switch
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  BanknoteIcon, 
  CreditCard, 
  QrCode, 
  Coins,
  Shield,
  Bell,
  Menu,
  Clock,
  BadgeIndianRupee,
  ArrowUpRight,
  ChevronRight,
  Copy,
  Check,
  ArrowRight,
  AlertTriangle,
  Camera,
  X,
  FileText,
  Lock,
  Info,
  CheckCircle,
  Users,
  Star,
  MapPin
} from 'lucide-react-native';
import { Svg, Circle, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Custom Button Component
const Button = ({
  children,
  variant = 'default',
  size = 'default',
  onPress,
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  style = {}
}) => {
  const variantStyles = {
    default: styles.buttonDefault,
    secondary: styles.buttonSecondary,
    outline: styles.buttonOutline,
    ghost: styles.buttonGhost,
    danger: styles.buttonDanger,
    success: styles.buttonSuccess
  };
  
  const sizeStyles = {
    xs: styles.buttonXs,
    sm: styles.buttonSm,
    default: styles.buttonDefault,
    lg: styles.buttonLg,
    xl: styles.buttonXl
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && styles.buttonFullWidth,
        disabled && styles.buttonDisabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.buttonContent}>
        {leftIcon && <View style={styles.buttonIconLeft}>{leftIcon}</View>}
        <Text 
          style={[
            styles.buttonText, 
            variant === 'outline' && styles.buttonTextOutline,
            variant === 'ghost' && styles.buttonTextGhost,
          ]}
        >
          {children}
        </Text>
        {rightIcon && <View style={styles.buttonIconRight}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

// Custom Input Component
const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChangeText,
  error,
  required = false,
  icon = null,
  helper = null,
  style = {}
}) => (
  <View style={styles.inputContainer}>
    {label && (
      <View style={styles.labelContainer}>
        <Text style={styles.inputLabel}>{label} {required && <Text style={styles.requiredStar}>*</Text>}</Text>
      </View>
    )}
    <View style={[
      styles.inputWrapper,
      error && styles.inputError,
      style
    ]}>
      {icon && <View style={styles.inputIcon}>{icon}</View>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        keyboardType={type === 'number' ? 'numeric' : 'default'}
        secureTextEntry={type === 'password'}
        style={[
          styles.input,
          icon && styles.inputWithIcon
        ]}
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
    {helper && !error && <Text style={styles.helperText}>{helper}</Text>}
  </View>
);

// Custom Textarea Component
const Textarea = ({
  label,
  name,
  placeholder,
  value,
  onChangeText,
  error,
  required = false,
  rows = 3,
  helper = null,
  style = {}
}) => (
  <View style={styles.inputContainer}>
    {label && (
      <View style={styles.labelContainer}>
        <Text style={styles.inputLabel}>{label} {required && <Text style={styles.requiredStar}>*</Text>}</Text>
      </View>
    )}
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      multiline
      numberOfLines={rows}
      style={[
        styles.textarea,
        error && styles.textareaError,
        style
      ]}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
    {helper && !error && <Text style={styles.helperText}>{helper}</Text>}
  </View>
);

// Alert Component
const Alert = ({
  variant = 'info',
  title,
  children,
  icon = null
}) => {
  const variantStyles = {
    info: styles.alertInfo,
    success: styles.alertSuccess,
    warning: styles.alertWarning,
    error: styles.alertError,
    neutral: styles.alertNeutral
  };
  
  const iconMap = {
    info: <Info size={18} color="#3b82f6" />,
    success: <CheckCircle size={18} color="#10b981" />,
    warning: <AlertTriangle size={18} color="#f59e0b" />,
    error: <AlertTriangle size={18} color="#ef4444" />,
    neutral: <Info size={18} color="#6b7280" />
  };
  
  return (
    <View style={[styles.alert, variantStyles[variant]]}>
      <View style={styles.alertContent}>
        <View style={styles.alertIconContainer}>
          {icon || iconMap[variant]}
        </View>
        <View style={styles.alertTextContainer}>
          {title && <Text style={styles.alertTitle}>{title}</Text>}
          <Text style={styles.alertText}>{children}</Text>
        </View>
      </View>
    </View>
  );
};

// Radio Button Component
const RadioGroup = ({ children, value, onValueChange }) => {
  return (
    <View style={styles.radioGroup}>
      {children}
    </View>
  );
};

const RadioItem = ({ label, value, selected, onSelect, description, icon, disabled = false }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.radioItem,
        selected && styles.radioItemSelected,
        disabled && styles.radioItemDisabled
      ]}
      onPress={() => !disabled && onSelect(value)}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View style={styles.radioItemContent}>
        <View style={styles.radioButtonContainer}>
          <View style={[
            styles.radioButton,
            selected && styles.radioButtonSelected
          ]}>
            {selected && <View style={styles.radioButtonInner} />}
          </View>
        </View>
        
        <View style={styles.radioLabelContainer}>
          {icon && <View style={styles.radioItemIcon}>{icon}</View>}
          <View>
            <Text style={styles.radioLabel}>{label}</Text>
            {description && <Text style={styles.radioDescription}>{description}</Text>}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Checkbox Component
const Checkbox = ({ label, checked, onValueChange }) => {
  return (
    <TouchableOpacity 
      style={styles.checkboxContainer}
      onPress={() => onValueChange(!checked)}
      activeOpacity={0.7}
    >
      <View style={[
        styles.checkbox,
        checked && styles.checkboxChecked
      ]}>
        {checked && <Check size={12} color="#fff" />}
      </View>
      {label && <Text style={styles.checkboxLabel}>{label}</Text>}
    </TouchableOpacity>
  );
};

// Select Component
const Select = ({ label, value, onValueChange, options, error, placeholder, required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <View style={styles.selectContainer}>
      {label && (
        <Text style={styles.inputLabel}>
          {label} {required && <Text style={styles.requiredStar}>*</Text>}
        </Text>
      )}
      
      <TouchableOpacity 
        style={[
          styles.selectButton,
          error && styles.inputError
        ]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.selectText,
          !value && styles.selectPlaceholder
        ]}>
          {value ? options.find(opt => opt.value === value)?.label : placeholder}
        </Text>
        <ChevronRight 
          size={18} 
          color="#6b7280" 
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }} 
        />
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionItem,
                value === option.value && styles.optionItemSelected
              ]}
              onPress={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}
            >
              <Text style={[
                styles.optionText,
                value === option.value && styles.optionTextSelected
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// Card component
const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

// Tab Component
const Tabs = ({ children, activeTab, onTabChange }) => {
  return (
    <View style={styles.tabsContainer}>
      {children}
    </View>
  );
};

const TabsList = ({ children }) => {
  return (
    <View style={styles.tabsList}>
      {children}
    </View>
  );
};

const TabTrigger = ({ label, value, icon, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.tabTrigger,
        isActive && styles.tabTriggerActive
      ]}
      onPress={() => onPress(value)}
      activeOpacity={0.7}
    >
      {icon}
      <Text style={[
        styles.tabTriggerText,
        isActive && styles.tabTriggerTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const TabContent = ({ children, value, activeTab }) => {
  if (value !== activeTab) return null;
  
  return (
    <View style={styles.tabContent}>
      {children}
    </View>
  );
};

// Main Deposit Page Component
const Deposit = () => {
  const router = useRouter();
  const scrollRef = useRef(null);
  const scaleAnims = useRef({});
  
  const [activeTab, setActiveTab] = useState('online');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  
  // Recent deposit transactions
  const recentDeposits = [
    {
      id: 'dep-001',
      method: "Bank Transfer",
      amount: "₹25,000",
      date: "Today, 10:30 AM",
      status: "completed",
      icon: <BanknoteIcon size={16} color="#3b82f6" />,
      time: "6 hours ago",
      bank: "HDFC Bank",
      bgColor: "#dbeafe",
      textColor: "#3b82f6"
    },
    {
      id: 'dep-002',
      method: "Credit Card",
      amount: "₹7,500",
      date: "Yesterday, 2:45 PM",
      status: "completed",
      icon: <CreditCard size={16} color="#8b5cf6" />,
      time: "24 hours ago",
      bank: "ICICI Bank",
      bgColor: "#f3e8ff",
      textColor: "#8b5cf6"
    },
    {
      id: 'dep-003',
      method: "Cash Deposit",
      amount: "₹10,000",
      date: "May 05, 2023",
      status: "pending",
      icon: <BanknoteIcon size={16} color="#f59e0b" />,
      time: "12 hours ago",
      bank: "Agent: Raj Kumar",
      bgColor: "#fef3c3",
      textColor: "#f59e0b"
    }
  ];
  
  // Payment options for online deposits
  const paymentOptions = [
    { 
      id: 'upi', 
      name: 'UPI',
      icon: <QrCode size={20} color="#8b5cf6" />,
      description: 'Instant transfer using UPI apps' 
    },
    { 
      id: 'card', 
      name: 'Credit/Debit Card',
      icon: <CreditCard size={20} color="#3b82f6" />,
      description: 'Visa, Mastercard, RuPay & more' 
    },
    { 
      id: 'netbanking', 
      name: 'Net Banking',
      icon: <BanknoteIcon size={20} color="#10b981" />,
      description: 'All major banks supported' 
    },
    { 
      id: 'wallet', 
      name: 'Mobile Wallet',
      icon: <BanknoteIcon size={20} color="#8b5cf6" />,
      description: 'Paytm, PhonePe, MobiKwik & more' 
    }
  ];
  
  // Bank options for bank deposit
  const banks = [
    { 
      id: 'hdfc', 
      name: 'HDFC Bank',
      accountNumber: 'XXXX XXXX 1234',
      ifsc: 'HDFC0000123',
    },
    { 
      id: 'icici', 
      name: 'ICICI Bank',
      accountNumber: 'XXXX XXXX 5678',
      ifsc: 'ICIC0000789',
    },
    { 
      id: 'sbi', 
      name: 'State Bank of India',
      accountNumber: 'XXXX XXXX 9012',
      ifsc: 'SBIN0000456',
    }
  ];
  
  // List of cash deposit agents
  const cashAgents = [
    { id: "agent-a", name: "Raj Kumar", location: "Mumbai Central", rating: 4.9, transactions: 520 },
    { id: "agent-b", name: "Priya Singh", location: "Delhi NCR", rating: 4.8, transactions: 412 },
    { id: "agent-c", name: "Vikram Patel", location: "Bangalore East", rating: 4.7, transactions: 356 },
    { id: "agent-d", name: "Anjali Sharma", location: "Chennai City", rating: 4.9, transactions: 490 },
    { id: "agent-e", name: "Arjun Reddy", location: "Hyderabad", rating: 4.8, transactions: 380 }
  ];
  
  // Crypto options
  const cryptoOptions = [
    { id: 'btc', name: 'Bitcoin (BTC)', icon: 'BTC', address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5' },
    { id: 'eth', name: 'Ethereum (ETH)', icon: 'ETH', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
    { id: 'usdt', name: 'Tether (USDT)', icon: 'USDT', address: 'TNPxvCeNKgmaFS5YJEdAJPQEbKNYTYp8ya' },
    { id: 'bnb', name: 'Binance Coin (BNB)', icon: 'BNB', address: 'bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23' }
  ];
  
  // Animation utility function
  const animateElement = (id) => {
    if (!scaleAnims.current[id]) {
      scaleAnims.current[id] = new Animated.Value(1);
    }
    
    Animated.sequence([
      Animated.timing(scaleAnims.current[id], {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims.current[id], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Common validations
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    // Tab-specific validations
    if (activeTab === 'online') {
      if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
      // Add more validations based on payment method
    } else if (activeTab === 'bank') {
      if (!formData.selectedBank) newErrors.selectedBank = 'Please select a bank';
      // Add more bank-specific validations
    } else if (activeTab === 'code') {
      if (!formData.referenceId) newErrors.referenceId = 'Transaction reference is required';
      // Add more QR code-specific validations
    } else if (activeTab === 'cash') {
      if (!formData.selectedAgent) newErrors.selectedAgent = 'Please select an agent';
      // Add more cash-specific validations
    } else if (activeTab === 'crypto') {
      if (!formData.selectedCrypto) newErrors.selectedCrypto = 'Please select a cryptocurrency';
      // Add more crypto-specific validations
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        setIsSubmitting(false);
        
        // Show success message
        Alert.alert(
          "Success",
          `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} deposit request submitted successfully!`,
          [{ text: "OK" }]
        );
        
        // Reset form
        setFormData({});
      }, 1500);
    }
  };
  
  // Method-specific components
  const renderOnlineDepositMethod = () => (
    <View style={styles.methodContainer}>
      <Alert variant="info">
        Online payments are processed instantly. Funds typically reflect within 15 minutes.
      </Alert>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>
          Select Payment Method <Text style={styles.requiredStar}>*</Text>
        </Text>
        
        <RadioGroup
          value={formData.paymentMethod}
          onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
        >
          {paymentOptions.map((option, index) => (
            <Animated.View
              key={option.id}
              style={[
                scaleAnims.current[`payment-${index}`] ? 
                  { transform: [{ scale: scaleAnims.current[`payment-${index}`] }] } : 
                  undefined
              ]}
            >
              <RadioItem
                label={option.name}
                description={option.description}
                value={option.id}
                selected={formData.paymentMethod === option.id}
                onSelect={(value) => {
                  setFormData({...formData, paymentMethod: value});
                  animateElement(`payment-${index}`);
                }}
                icon={option.icon}
              />
            </Animated.View>
          ))}
        </RadioGroup>
        
        {errors.paymentMethod && (
          <Text style={styles.errorText}>{errors.paymentMethod}</Text>
        )}
      </View>
      
      {formData.paymentMethod && (
        <Animated.View 
          style={[
            styles.fadeInView,
            scaleAnims.current[`details-${formData.paymentMethod}`] ? 
              { transform: [{ scale: scaleAnims.current[`details-${formData.paymentMethod}`] }] } : 
              undefined
          ]}
        >
          <View style={styles.paymentDetailsCard}>
            <View style={styles.paymentDetailsHeader}>
              <Text style={styles.paymentDetailsTitle}>Payment Details</Text>
              <View style={styles.securePaymentBadge}>
                <Lock size={12} color="#8b5cf6" />
                <Text style={styles.securePaymentText}>Secure Payment</Text>
              </View>
            </View>
            
            {formData.paymentMethod === 'upi' && (
              <View style={styles.paymentDetailsContent}>
                <Input
                  label="UPI ID"
                  name="upiId"
                  value={formData.upiId || ''}
                  onChangeText={(value) => setFormData({...formData, upiId: value})}
                  placeholder="username@bank"
                  required
                  error={errors.upiId}
                />
                <Text style={styles.smallHelperText}>
                  Enter your UPI ID (e.g., yourname@okhdfcbank, 9876543210@ybl)
                </Text>
              </View>
            )}
            
            {formData.paymentMethod === 'card' && (
              <View style={styles.paymentDetailsContent}>
                <Input
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber || ''}
                  onChangeText={(value) => setFormData({...formData, cardNumber: value})}
                  placeholder="1234 5678 9012 3456"
                  required
                  error={errors.cardNumber}
                  icon={<CreditCard size={20} color="#9ca3af" />}
                />
                
                <View style={styles.twoColumnRow}>
                  <View style={styles.columnHalf}>
                    <Input
                      label="Expiry Date"
                      name="expiryDate"
                      value={formData.expiryDate || ''}
                      onChangeText={(value) => setFormData({...formData, expiryDate: value})}
                      placeholder="MM/YY"
                      required
                      error={errors.expiryDate}
                    />
                  </View>
                  <View style={styles.columnHalf}>
                    <Input
                      label="CVV"
                      name="cvv"
                      value={formData.cvv || ''}
                      onChangeText={(value) => setFormData({...formData, cvv: value})}
                      placeholder="123"
                      required
                      error={errors.cvv}
                    />
                  </View>
                </View>
                
                <Input
                  label="Name on Card"
                  name="nameOnCard"
                  value={formData.nameOnCard || ''}
                  onChangeText={(value) => setFormData({...formData, nameOnCard: value})}
                  placeholder="John Doe"
                  required
                  error={errors.nameOnCard}
                />
              </View>
            )}
            
            {formData.paymentMethod === 'netbanking' && (
              <View style={styles.paymentDetailsContent}>
                <Select
                  label="Select Bank"
                  value={formData.bank}
                  onValueChange={(value) => setFormData({...formData, bank: value})}
                  placeholder="Select your bank"
                  required
                  error={errors.bank}
                  options={[
                    { value: 'hdfc', label: 'HDFC Bank' },
                    { value: 'sbi', label: 'State Bank of India' },
                    { value: 'icici', label: 'ICICI Bank' },
                    { value: 'axis', label: 'Axis Bank' },
                    { value: 'kotak', label: 'Kotak Mahindra Bank' }
                  ]}
                />
                <Text style={styles.smallHelperText}>
                  You will be redirected to your bank's secure website to complete the payment.
                </Text>
              </View>
            )}
            
            {formData.paymentMethod === 'wallet' && (
              <View style={styles.paymentDetailsContent}>
                <Select
                  label="Select Wallet"
                  value={formData.wallet}
                  onValueChange={(value) => setFormData({...formData, wallet: value})}
                  placeholder="Select your wallet"
                  required
                  error={errors.wallet}
                  options={[
                    { value: 'paytm', label: 'Paytm' },
                    { value: 'phonepe', label: 'PhonePe' },
                    { value: 'mobikwik', label: 'MobiKwik' },
                    { value: 'amazonpay', label: 'Amazon Pay' },
                    { value: 'freecharge', label: 'Freecharge' }
                  ]}
                />
                <Text style={styles.smallHelperText}>
                  You will be redirected to complete the payment through your chosen wallet.
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
  
  const renderBankDepositMethod = () => (
    <View style={styles.methodContainer}>
      <Alert variant="info">
        Bank transfers may take 1-24 hours to process depending on your bank and time of day.
      </Alert>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>
          Select Bank Account <Text style={styles.requiredStar}>*</Text>
        </Text>
        
        <RadioGroup
          value={formData.selectedBank}
          onValueChange={(value) => setFormData({...formData, selectedBank: value})}
        >
          {banks.map((bank, index) => (
            <Animated.View
              key={bank.id}
              style={[
                scaleAnims.current[`bank-${index}`] ? 
                  { transform: [{ scale: scaleAnims.current[`bank-${index}`] }] } : 
                  undefined
              ]}
            >
              <RadioItem
                label={bank.name}
                description={`A/C: ${bank.accountNumber}`}
                value={bank.id}
                selected={formData.selectedBank === bank.id}
                onSelect={(value) => {
                  setFormData({...formData, selectedBank: value});
                  animateElement(`bank-${index}`);
                }}
                icon={
                  <View style={styles.bankIconContainer}>
                    <Text style={styles.bankIconText}>{bank.name.charAt(0)}</Text>
                  </View>
                }
              />
            </Animated.View>
          ))}
        </RadioGroup>
        
        {errors.selectedBank && (
          <Text style={styles.errorText}>{errors.selectedBank}</Text>
        )}
      </View>
      
      {formData.selectedBank && (
        <Animated.View 
          style={styles.fadeInView}
        >
          <View style={styles.bankDetailsCard}>
            <View style={styles.bankDetailsSection}>
              <Text style={styles.bankDetailsSectionTitle}>Bank Account Details</Text>
              
              <View style={styles.bankDetailsGrid}>
                <View style={styles.bankDetailItem}>
                  <Text style={styles.bankDetailLabel}>Account Name</Text>
                  <Text style={styles.bankDetailValue}>ACME Financials Ltd.</Text>
                </View>
                <View style={styles.bankDetailItem}>
                  <Text style={styles.bankDetailLabel}>Account Number</Text>
                  <Text style={styles.bankDetailValue}>
                    {banks.find(b => b.id === formData.selectedBank)?.accountNumber}
                  </Text>
                </View>
                <View style={styles.bankDetailItem}>
                  <Text style={styles.bankDetailLabel}>IFSC Code</Text>
                  <Text style={styles.bankDetailValue}>
                    {banks.find(b => b.id === formData.selectedBank)?.ifsc}
                  </Text>
                </View>
                <View style={styles.bankDetailItem}>
                  <Text style={styles.bankDetailLabel}>Account Type</Text>
                  <Text style={styles.bankDetailValue}>Current Account</Text>
                </View>
              </View>
              
              <View style={styles.copyButtonContainer}>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Copy size={14} color="#8b5cf6" />}
                  onPress={() => {}}
                  style={styles.purpleOutlineButton}
                >
                  Copy Details
                </Button>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.transactionDetailsSection}>
              <Text style={styles.bankDetailsSectionTitle}>Transaction Details</Text>
              
              <View style={styles.transactionDetailsForm}>
                <Input
                  label="Transaction Reference Number"
                  name="transactionId"
                  value={formData.transactionId || ''}
                  onChangeText={(value) => setFormData({...formData, transactionId: value})}
                  placeholder="e.g., UTR Number, Transaction ID"
                  required
                  error={errors.transactionId}
                  helper="This helps us match your transfer with our bank statement"
                />
                
                <Input
                  label="Account Name Used for Transfer"
                  name="senderName"
                  value={formData.senderName || ''}
                  onChangeText={(value) => setFormData({...formData, senderName: value})}
                  placeholder="Name as it appears on your bank account"
                  required
                  error={errors.senderName}
                />
                
                <Select
                  label="Transfer Method"
                  value={formData.transferMethod}
                  onValueChange={(value) => setFormData({...formData, transferMethod: value})}
                  placeholder="Select transfer method"
                  required
                  error={errors.transferMethod}
                  options={[
                    { value: 'neft', label: 'NEFT' },
                    { value: 'rtgs', label: 'RTGS' },
                    { value: 'imps', label: 'IMPS' },
                    { value: 'upi', label: 'UPI' }
                  ]}
                />
              </View>
            </View>
          </View>
          
          <Alert
            variant="warning"
            icon={<AlertTriangle size={18} color="#f59e0b" />}
          >
            Make the transfer from your bank and then submit this form with the transaction details.
          </Alert>
        </Animated.View>
      )}
    </View>
  );
  
  const renderCodeDepositMethod = () => (
    <View style={styles.methodContainer}>
      <Alert
        variant="info"
        icon={<QrCode size={18} color="#3b82f6" />}
        title="Scan QR Code to Deposit"
      >
        Scan this QR code to make a deposit, then fill in the details below.
      </Alert>
      
      <View style={styles.qrCodeContainer}>
        <View style={styles.qrCodeCard}>
          <View style={styles.qrImageContainer}>
            <View style={styles.qrPlaceholder}>
              <QrCode size={120} color="#6b7280" style={{ opacity: 0.5 }} />
            </View>
            <View style={styles.qrShieldBadge}>
              <Shield size={16} color="#10b981" />
            </View>
          </View>
          
          <View style={styles.qrInfoContainer}>
            <Text style={styles.qrCompanyName}>ACME Financial Services</Text>
            <Text style={styles.qrUpiId}>UPI ID: acme@hdfcbank</Text>
          </View>
          
          <View style={styles.qrButtonsRow}>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Copy size={14} color="#8b5cf6" />}
              style={styles.halfWidthButton}
            >
              Copy UPI ID
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Camera size={14} color="#8b5cf6" />}
              style={styles.halfWidthButton}
            >
              Save QR
            </Button>
          </View>
        </View>
      </View>
      
      <View style={styles.depositFormContainer}>
        <Text style={styles.formSectionTitle}>Deposit Details</Text>
        
        <View style={styles.depositForm}>
          <Input
            label="Deposit Amount"
            name="amount"
            type="number"
            icon={<BadgeIndianRupee size={20} color="#9ca3af" />}
            value={formData.amount || ''}
            onChangeText={(value) => setFormData({...formData, amount: value})}
            placeholder="0.00"
            required
            error={errors.amount}
            style={styles.largeInput}
          />
          
          <Input
            label="Transaction Reference ID / UTR Number"
            name="referenceId"
            value={formData.referenceId || ''}
            onChangeText={(value) => setFormData({...formData, referenceId: value})}
            placeholder="Enter transaction reference ID from your payment app"
            required
            error={errors.referenceId}
            helper="You can find this in your payment app confirmation"
          />
          
          <Select
            label="Payment App Used"
            value={formData.paymentApp}
            onValueChange={(value) => setFormData({...formData, paymentApp: value})}
            placeholder="Select payment app"
            required
            error={errors.paymentApp}
            options={[
              { value: 'gpay', label: 'Google Pay' },
              { value: 'phonepe', label: 'PhonePe' },
              { value: 'paytm', label: 'Paytm' },
              { value: 'amazonpay', label: 'Amazon Pay' },
              { value: 'bhim', label: 'BHIM UPI' },
              { value: 'other', label: 'Other' }
            ]}
          />
          
          {formData.paymentApp === 'other' && (
            <Input
              label="Specify Payment App"
              name="otherPaymentApp"
              value={formData.otherPaymentApp || ''}
              onChangeText={(value) => setFormData({...formData, otherPaymentApp: value})}
              placeholder="Enter the name of the payment app"
              required
              error={errors.otherPaymentApp}
            />
          )}
          
          <Select
            label="When did you make this payment?"
            value={formData.depositTime}
            onValueChange={(value) => setFormData({...formData, depositTime: value})}
            placeholder="Select time"
            required
            error={errors.depositTime}
            options={[
              { value: 'just-now', label: 'Just now' },
              { value: '5min', label: 'About 5 minutes ago' },
              { value: '30min', label: 'About 30 minutes ago' },
              { value: '1hour', label: 'About 1 hour ago' },
              { value: '3hours', label: 'About 3 hours ago' },
              { value: 'today', label: 'Earlier today' },
              { value: 'yesterday', label: 'Yesterday' }
            ]}
          />
          
          <Textarea
            label="Notes (Optional)"
            name="notes"
            value={formData.notes || ''}
            onChangeText={(value) => setFormData({...formData, notes: value})}
            placeholder="Add any additional information about this payment"
            rows={3}
          />
          
          <View style={styles.uploadSection}>
            <Text style={styles.uploadLabel}>Upload Payment Screenshot (Optional)</Text>
            <TouchableOpacity 
              style={styles.uploadArea}
              activeOpacity={0.7}
            >
              <FileText size={28} color="#8b5cf6" style={styles.uploadIcon} />
              <Text style={styles.uploadText}>Click to upload screenshot or drag and drop</Text>
              <Text style={styles.uploadHint}>JPG, PNG (MAX. 5MB)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <Alert variant="info">
        QR code payments are verified automatically. Your deposit will be processed within 5-15 minutes after confirmation.
      </Alert>
    </View>
  );
  
  const renderCashDepositMethod = () => (
    <View style={styles.methodContainer}>
      <Alert
        variant="info"
        icon={<Users size={18} color="#3b82f6" />}
      >
        Cash deposits are verified by authorized agents in your area
      </Alert>
      
      <View style={styles.amountInputSection}>
        <Input
          label="Deposit Amount"
          name="amount"
          type="number"
          icon={<BadgeIndianRupee size={20} color="#9ca3af" />}
          value={formData.amount || ''}
          onChangeText={(value) => setFormData({...formData, amount: value})}
          placeholder="0.00"
          required
          error={errors.amount}
          style={styles.largeInput}
        />
        
        <View style={styles.quickAmountButtons}>
          <TouchableOpacity 
            style={styles.quickAmountButton}
            onPress={() => setFormData({...formData, amount: "1000"})}
            activeOpacity={0.7}
          >
            <Text style={styles.quickAmountText}>₹1,000</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickAmountButton}
            onPress={() => setFormData({...formData, amount: "5000"})}
            activeOpacity={0.7}
          >
            <Text style={styles.quickAmountText}>₹5,000</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickAmountButton}
            onPress={() => setFormData({...formData, amount: "10000"})}
            activeOpacity={0.7}
          >
            <Text style={styles.quickAmountText}>₹10,000</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>
          Select Cash Deposit Agent <Text style={styles.requiredStar}>*</Text>
        </Text>
        
        <RadioGroup
          value={formData.selectedAgent}
          onValueChange={(value) => setFormData({...formData, selectedAgent: value})}
        >
          {cashAgents.map((agent, index) => (
            <Animated.View
              key={agent.id}
              style={[
                scaleAnims.current[`agent-${index}`] ? 
                  { transform: [{ scale: scaleAnims.current[`agent-${index}`] }] } : 
                  undefined
              ]}
            >
              <TouchableOpacity 
                style={[
                  styles.agentItem,
                  formData.selectedAgent === agent.id && styles.agentItemSelected
                ]}
                onPress={() => {
                  setFormData({...formData, selectedAgent: agent.id});
                  animateElement(`agent-${index}`);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.agentRadioButton}>
                  <View style={[
                    styles.radioButton,
                    formData.selectedAgent === agent.id && styles.radioButtonSelected
                  ]}>
                    {formData.selectedAgent === agent.id && <View style={styles.radioButtonInner} />}
                  </View>
                </View>
                
                <View style={styles.agentDetailsContainer}>
                  <View style={styles.agentHeader}>
                    <Text style={styles.agentName}>{agent.name}</Text>
                    <View style={styles.ratingBadge}>
                      <Star size={12} color="#f59e0b" />
                      <Text style={styles.ratingText}>{agent.rating}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.agentLocation}>
                    <MapPin size={12} color="#6b7280" />
                    <Text style={styles.agentLocationText}>{agent.location}</Text>
                  </View>
                  
                  <Text style={styles.agentTransactions}>
                    {agent.transactions}+ transactions
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </RadioGroup>
        
        {errors.selectedAgent && (
          <Text style={styles.errorText}>{errors.selectedAgent}</Text>
        )}
      </View>
      
      <View style={styles.cashDepositForm}>
        <Select
          label="When did you make this deposit?"
          value={formData.depositTime}
          onValueChange={(value) => setFormData({...formData, depositTime: value})}
          placeholder="Select time"
          required
          error={errors.depositTime}
          options={[
            { value: '6', label: 'About 6 hours ago' },
            { value: '12', label: 'About 12 hours ago' },
            { value: '24', label: 'About 24 hours ago' },
            { value: '48', label: 'About 48 hours ago' }
          ]}
        />
        
        <Input
          label="Transaction Reference ID"
          name="referenceId"
          value={formData.referenceId || ''}
          onChangeText={(value) => setFormData({...formData, referenceId: value})}
          placeholder="Enter transaction reference number"
          required
          error={errors.referenceId}
          helper="You can find this on your receipt or ask the agent for the reference ID"
        />
        
        <Textarea
          label="Notes (Optional)"
          name="notes"
          value={formData.notes || ''}
          onChangeText={(value) => setFormData({...formData, notes: value})}
          placeholder="Add any additional notes about this transaction"
          rows={2}
        />
        
        <View style={styles.receiptContainer}>
          <Checkbox
            label="I have a receipt for this transaction"
            checked={formData.hasReceipt || false}
            onValueChange={(checked) => setFormData({...formData, hasReceipt: checked})}
          />
          
          {formData.hasReceipt && (
            <View style={styles.receiptUploadContainer}>
              {!uploadedFile ? (
                <TouchableOpacity 
                  style={styles.receiptUploadArea}
                  activeOpacity={0.7}
                >
                  <ReceiptText size={28} color="#8b5cf6" style={styles.uploadIcon} />
                  <Text style={styles.uploadText}>Click to upload receipt or drag and drop</Text>
                  <Text style={styles.uploadHint}>JPG, PNG or PDF (MAX. 5MB)</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.uploadedFileContainer}>
                  <View style={styles.uploadedFileInfo}>
                    <FileText size={20} color="#8b5cf6" style={{ marginRight: 8 }} />
                    <View>
                      <Text style={styles.uploadedFileName}>{uploadedFile.name}</Text>
                      <Text style={styles.uploadedFileSize}>
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setUploadedFile(null)}
                    style={styles.removeFileButton}
                  >
                    <X size={20} color="#9ca3af" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
        
        <View style={styles.termsContainer}>
          <Checkbox
            label="I confirm that I have made this cash deposit with the selected agent and all information provided is accurate."
            checked={formData.acceptTerms || false}
            onValueChange={(checked) => setFormData({...formData, acceptTerms: checked})}
          />
          {errors.acceptTerms && (
            <Text style={styles.errorText}>{errors.acceptTerms}</Text>
          )}
        </View>
      </View>
      
      <Alert 
        variant="info" 
        icon={<Shield size={18} color="#3b82f6" />}
      >
        For your security, cash deposits are verified by our team against agent records. Confirmation typically takes 15-30 minutes during business hours.
      </Alert>
    </View>
  );
  
  const renderCryptoDepositMethod = () => (
    <View style={styles.methodContainer}>
      <Alert variant="warning">
        <Text style={styles.alertBoldText}>Important: Verification Required</Text>
        <Text style={styles.alertText}>Crypto deposits require additional KYC verification. Please ensure your account is fully verified before proceeding.</Text>
      </Alert>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>
          Select Cryptocurrency <Text style={styles.requiredStar}>*</Text>
        </Text>
        
        <RadioGroup
          value={formData.selectedCrypto}
          onValueChange={(value) => setFormData({...formData, selectedCrypto: value})}
        >
          {cryptoOptions.map((crypto, index) => (
            <Animated.View
              key={crypto.id}
              style={[
                scaleAnims.current[`crypto-${index}`] ? 
                  { transform: [{ scale: scaleAnims.current[`crypto-${index}`] }] } : 
                  undefined
              ]}
            >
              <RadioItem
                label={crypto.name}
                value={crypto.id}
                selected={formData.selectedCrypto === crypto.id}
                onSelect={(value) => {
                  setFormData({...formData, selectedCrypto: value});
                  animateElement(`crypto-${index}`);
                }}
                icon={
                  <View style={styles.cryptoIconContainer}>
                    <Text style={styles.cryptoIconText}>{crypto.icon}</Text>
                  </View>
                }
              />
            </Animated.View>
          ))}
        </RadioGroup>
        
        {errors.selectedCrypto && (
          <Text style={styles.errorText}>{errors.selectedCrypto}</Text>
        )}
      </View>
      
      {formData.selectedCrypto && (
        <Animated.View style={styles.fadeInView}>
          <View style={styles.cryptoDepositCard}>
            <Text style={styles.cryptoDepositTitle}>Deposit Address</Text>
            
            <View style={styles.cryptoQrContainer}>
              <View style={styles.cryptoQrCode}>
                <View style={styles.qrPlaceholder}>
                  <QrCode size={100} color="#6b7280" style={{ opacity: 0.5 }} />
                </View>
              </View>
              <Text style={styles.cryptoQrInstructions}>
                Scan this QR code with your wallet app to deposit
              </Text>
              
              <View style={styles.cryptoAddressContainer}>
                <TextInput
                  value={cryptoOptions.find(c => c.id === formData.selectedCrypto)?.address}
                  editable={false}
                  style={styles.cryptoAddressInput}
                />
                <TouchableOpacity 
                  style={styles.cryptoCopyButton}
                  activeOpacity={0.7}
                >
                  <Copy size={14} color="#4b5563" />
                  <Text style={styles.cryptoCopyText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <Alert variant="warning" title="Important">
              <View style={styles.cryptoWarningList}>
                <View style={styles.cryptoWarningItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.cryptoWarningText}>
                    Only send {formData.selectedCrypto?.toUpperCase()} to this address
                  </Text>
                </View>
                <View style={styles.cryptoWarningItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.cryptoWarningText}>
                    Sending any other cryptocurrency may result in permanent loss
                  </Text>
                </View>
                <View style={styles.cryptoWarningItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.cryptoWarningText}>
                    Minimum deposit: 0.001 BTC / 0.01 ETH / 10 USDT / 0.05 BNB
                  </Text>
                </View>
              </View>
            </Alert>
          </View>
          
          <View style={styles.cryptoFormContainer}>
            <Input
              label="Transaction Hash/ID"
              name="transactionHash"
              value={formData.transactionHash || ''}
              onChangeText={(value) => setFormData({...formData, transactionHash: value})}
              placeholder="Enter the transaction hash/ID from your wallet"
              required
              error={errors.transactionHash}
              helper="This helps us track your deposit on the blockchain"
            />
            
            <Select
              label="When did you make this transaction?"
              value={formData.cryptoDepositTime}
              onValueChange={(value) => setFormData({...formData, cryptoDepositTime: value})}
              placeholder="Select time"
              required
              error={errors.cryptoDepositTime}
              options={[
                { value: '6', label: 'About 6 hours ago' },
                { value: '12', label: 'About 12 hours ago' },
                { value: '24', label: 'About 24 hours ago' },
                { value: '48', label: 'About 48 hours ago' }
              ]}
            />
            
            <Input
              label="Amount Sent"
              name="cryptoAmount"
              value={formData.cryptoAmount || ''}
              onChangeText={(value) => setFormData({...formData, cryptoAmount: value})}
              placeholder={`Amount in ${formData.selectedCrypto?.toUpperCase()}`}
              required
              error={errors.cryptoAmount}
            />
          </View>
        </Animated.View>
      )}
      
      <Alert variant="info">
        Crypto deposits typically require 2-6 network confirmations before being credited to your account. This usually takes 10-60 minutes depending on network conditions.
      </Alert>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8b5cf6" />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Header with gradient background */}
        <LinearGradient
          colors={['#8b5cf6', '#7c3aed', '#4338ca']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          {/* Background pattern */}
          <View style={styles.patternTop}>
            <Svg width={250} height={250} viewBox="0 0 200 200">
              <Circle cx={100} cy={100} r={80} stroke="white" strokeWidth={8} opacity={0.05} />
              <Circle cx={100} cy={100} r={40} stroke="white" strokeWidth={8} opacity={0.05} />
            </Svg>
          </View>
          <View style={styles.patternBottom}>
            <Svg width={150} height={150} viewBox="0 0 100 100">
              <Path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="white" strokeWidth={8} opacity={0.05} />
            </Svg>
          </View>
          
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Deposit Funds</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => animateElement("notification-btn")}
                activeOpacity={0.7}
              >
                <Bell size={22} color="white" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>3</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => {
                  animateElement("menu-btn");
                  setShowSidebar(true);
                }}
                activeOpacity={0.7}
              >
                <Menu size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Security notice in header */}
          <View style={styles.securityNotice}>
            <Shield size={20} color="#86efac" />
            <View style={styles.securityTextContainer}>
              <Text style={styles.securityTitle}>100% Secure Transactions</Text>
              <Text style={styles.securitySubtitle}>All deposits are protected with 256-bit encryption</Text>
            </View>
          </View>
        </LinearGradient>
        
        {/* Balance Card - positioned to overlap with header */}
        <View style={styles.balanceCardWrapper}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <View>
                <Text style={styles.balanceLabel}>Available Balance</Text>
                <Text style={styles.balanceAmount}>₹82,465.57</Text>
              </View>
              <TouchableOpacity
                style={styles.historyButton}
                onPress={() => animateElement("history-btn")}
                activeOpacity={0.7}
              >
                <Clock size={14} color="#8b5cf6" />
                <Text style={styles.historyButtonText}>History</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.balanceDetails}>
              <View style={styles.balanceTags}>
                <View style={styles.balanceTag}>
                  <Text style={styles.blueTagText}>UPI: ₹32,420</Text>
                </View>
                <View style={[styles.balanceTag, styles.greenTag]}>
                  <Text style={styles.greenTagText}>Bank: ₹48,260</Text>
                </View>
                <View style={[styles.balanceTag, styles.purpleTag]}>
                  <Text style={styles.purpleTagText}>Reward: ₹1,785</Text>
                </View>
              </View>
              <View style={styles.updateInfo}>
                <Clock size={12} color="#6b7280" />
                <Text style={styles.updateInfoText}>Updated just now</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Main content */}
        <View style={styles.mainContent}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionHeaderTitle}>Select Deposit Method</Text>
              <Text style={styles.sectionHeaderSubtitle}>Choose your preferred way to add funds</Text>
            </View>
            <View style={styles.currencyBadge}>
              <BadgeIndianRupee size={12} color="#8b5cf6" />
              <Text style={styles.currencyBadgeText}>₹ Indian Rupee</Text>
            </View>
          </View>
          
          {/* Tabs */}
          <View style={styles.depositTabs}>
            <TabsList>
              <TabTrigger
                label="Online"
                value="online"
                icon={<CreditCard size={18} color={activeTab === 'online' ? "#8b5cf6" : "#6b7280"} />}
                isActive={activeTab === 'online'}
                onPress={setActiveTab}
              />
              <TabTrigger
                label="Code"
                value="code"
                icon={<QrCode size={18} color={activeTab === 'code' ? "#8b5cf6" : "#6b7280"} />}
                isActive={activeTab === 'code'}
                onPress={setActiveTab}
              />
              <TabTrigger
                label="Bank"
                value="bank"
                icon={<BanknoteIcon size={18} color={activeTab === 'bank' ? "#8b5cf6" : "#6b7280"} />}
                isActive={activeTab === 'bank'}
                onPress={setActiveTab}
              />
              <TabTrigger
                label="Cash"
                value="cash"
                icon={<BanknoteIcon size={18} color={activeTab === 'cash' ? "#8b5cf6" : "#6b7280"} />}
                isActive={activeTab === 'cash'}
                onPress={setActiveTab}
              />
              <TabTrigger
                label="Crypto"
                value="crypto"
                icon={<Coins size={18} color={activeTab === 'crypto' ? "#8b5cf6" : "#6b7280"} />}
                isActive={activeTab === 'crypto'}
                onPress={setActiveTab}
              />
            </TabsList>
            
            <Card style={styles.depositMethodCard}>
              {/* Tab Content */}
              <TabContent value="online" activeTab={activeTab}>
                {renderOnlineDepositMethod()}
              </TabContent>
              
              <TabContent value="code" activeTab={activeTab}>
                {renderCodeDepositMethod()}
              </TabContent>
              
              <TabContent value="bank" activeTab={activeTab}>
                {renderBankDepositMethod()}
              </TabContent>
              
              <TabContent value="cash" activeTab={activeTab}>
                {renderCashDepositMethod()}
              </TabContent>
              
              <TabContent value="crypto" activeTab={activeTab}>
                {renderCryptoDepositMethod()}
              </TabContent>
              
              {/* Submit button */}
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  isSubmitting && styles.submitButtonDisabled
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting}
                activeOpacity={0.8}
              >
                {isSubmitting ? (
                  <View style={styles.submitButtonContent}>
                    <ActivityIndicator color="white" size="small" style={styles.spinner} />
                    <Text style={styles.submitButtonText}>Processing...</Text>
                  </View>
                ) : (
                  <Text style={styles.submitButtonText}>
                    Submit {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Deposit
                  </Text>
                )}
              </TouchableOpacity>
            </Card>
          </View>
          
          {/* Recent Deposits */}
          <View style={styles.recentDepositsSection}>
            <View style={styles.recentDepositsHeader}>
              <Text style={styles.recentDepositsTitle}>Recent Deposits</Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => animateElement("view-all-btn")}
                activeOpacity={0.7}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <ChevronRight size={16} color="#8b5cf6" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.recentDepositsList}>
              {recentDeposits.map((deposit, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.depositItemContainer,
                    scaleAnims.current[`deposit-${index}`] ? 
                      { transform: [{ scale: scaleAnims.current[`deposit-${index}`] }] } : 
                      undefined
                  ]}
                >
                  <TouchableOpacity
                    style={styles.depositItem}
                    onPress={() => animateElement(`deposit-${index}`)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.depositItemLeft}>
                      <View style={[styles.depositIconContainer, { backgroundColor: deposit.bgColor }]}>
                        {deposit.icon}
                      </View>
                      <View>
                        <Text style={styles.depositMethod}>{deposit.method}</Text>
                        <View style={styles.depositInfo}>
                          <Text style={styles.depositDate}>{deposit.date}</Text>
                          <View style={styles.depositBank}>
                            <Text style={styles.depositBankText}>{deposit.bank}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.depositItemRight}>
                      <Text style={styles.depositAmount}>{deposit.amount}</Text>
                      <View style={styles.depositStatus}>
                        <View 
                          style={[
                            styles.statusBadge,
                            deposit.status === 'completed' ? styles.completedBadge : styles.pendingBadge
                          ]}
                        >
                          <Text 
                            style={[
                              styles.statusText,
                              deposit.status === 'completed' ? styles.completedText : styles.pendingText
                            ]}
                          >
                            {deposit.status === 'completed' ? 'Completed' : 'Pending'}
                          </Text>
                        </View>
                        <Text style={styles.depositTime}>{deposit.time}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>
          
          {/* Help & Support Section */}
          <LinearGradient
            colors={['#ede9fe', '#e0e7ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.supportSection}
          >
            <Text style={styles.supportTitle}>Need Help?</Text>
            <Text style={styles.supportText}>Our support team is available 24/7 to assist with your deposit</Text>
            <View style={styles.supportButtons}>
              <TouchableOpacity
                style={styles.faqButton}
                onPress={() => animateElement("faq-btn")}
                activeOpacity={0.7}
              >
                <Text style={styles.faqButtonText}>FAQ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() => animateElement("support-btn")}
                activeOpacity={0.7}
              >
                <Text style={styles.contactButtonText}>Contact Support</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 12 : 28,
    paddingBottom: 80,
    position: 'relative',
    overflow: 'hidden',
  },
  patternTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.05,
  },
  patternBottom: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    opacity: 0.05,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },
  securityTextContainer: {
    marginLeft: 12,
  },
  securityTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  securitySubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  balanceCardWrapper: {
    marginTop: -50,
    paddingHorizontal: 16,
    marginBottom: 24,
    zIndex: 10,
  },
  balanceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    color: '#6b7280',
    fontSize: 14,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e7ff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  historyButtonText: {
    color: '#8b5cf6',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 4,
  },
  balanceDetails: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  balanceTag: {
    backgroundColor: '#dbeafe',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  blueTagText: {
    color: '#3b82f6',
    fontSize: 12,
  },
  greenTag: {
    backgroundColor: '#dcfce7',
  },
  greenTagText: {
    color: '#10b981',
    fontSize: 12,
  },
  purpleTag: {
    backgroundColor: '#f3e8ff',
  },
  purpleTagText: {
    color: '#8b5cf6',
    fontSize: 12,
  },
  updateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateInfoText: {
    color: '#6b7280',
    fontSize: 12,
    marginLeft: 4,
  },
  mainContent: {
    paddingHorizontal: 16,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  sectionHeaderSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  currencyBadge: {
    backgroundColor: '#f3e8ff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  currencyBadgeText: {
    color: '#8b5cf6',
    fontSize: 12,
    marginLeft: 4,
  },
  depositTabs: {
    marginBottom: 24,
  },
  depositMethodCard: {
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
    marginTop: 24,
    padding: 0,
    overflow: 'hidden',
  },
  submitButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#c4b5fd',
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  recentDepositsSection: {
    marginBottom: 24,
  },
  recentDepositsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentDepositsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#8b5cf6',
    fontSize: 14,
    marginRight: 4,
  },
  recentDepositsList: {
    marginBottom: 8,
  },
  depositItemContainer: {
    marginBottom: 8,
  },
  depositItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  depositItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  depositIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  depositMethod: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1f2937',
  },
  depositInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  depositDate: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 6,
  },
  depositBank: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  depositBankText: {
    fontSize: 10,
    color: '#4b5563',
  },
  depositItemRight: {
    alignItems: 'flex-end',
  },
  depositAmount: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1f2937',
  },
  depositStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginRight: 6,
  },
  completedBadge: {
    backgroundColor: '#dcfce7',
  },
  pendingBadge: {
    backgroundColor: '#fef3c3',
  },
  statusText: {
    fontSize: 10,
  },
  completedText: {
    color: '#10b981',
  },
  pendingText: {
    color: '#f59e0b',
  },
  depositTime: {
    fontSize: 10,
    color: '#6b7280',
  },
  supportSection: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#d8b4fe',
    marginBottom: 16,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 16,
  },
  supportButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  faqButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d8b4fe',
    backgroundColor: 'white',
  },
  faqButtonText: {
    color: '#8b5cf6',
    fontWeight: '500',
  },
  contactButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8b5cf6',
  },
  contactButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  // Tab Styles
  tabsContainer: {
    width: '100%',
  },
  tabsList: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 8,
  },
  tabTrigger: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  tabTriggerActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabTriggerText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  tabTriggerTextActive: {
    color: '#8b5cf6',
    fontWeight: '500',
  },
  tabContent: {
    padding: 16,
  },
  // Card Components
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
    padding: 16,
    marginBottom: 16,
  },
  // Button component styles
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDefault: {
    backgroundColor: '#8b5cf6',
  },
  buttonSecondary: {
    backgroundColor: '#f3f4f6',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonDanger: {
    backgroundColor: '#ef4444',
  },
  buttonSuccess: {
    backgroundColor: '#10b981',
  },
  buttonXs: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  buttonSm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonLg: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonXl: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  buttonFullWidth: {
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  buttonTextOutline: {
    color: '#6b7280',
  },
  buttonTextGhost: {
    color: '#6b7280',
  },
  buttonIconLeft: {
    marginRight: 8,
  },
  buttonIconRight: {
    marginLeft: 8,
  },
  // Input styles
  inputContainer: {
    marginBottom: 16,
  },
  labelContainer: {
    marginBottom: 6,
  },
  inputLabel: {
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '500',
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: 'white',
  },
  inputIcon: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    color: '#1f2937',
    fontSize: 14,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 4,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    color: '#1f2937',
    height: 100,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  textareaError: {
    borderColor: '#ef4444',
  },
  // Alert styles
  alert: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  alertContent: {
    flexDirection: 'row',
  },
  alertIconContainer: {
    marginRight: 12,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  alertText: {
    fontSize: 13,
    lineHeight: 18,
  },
  alertBoldText: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
    color: '#1f2937',
  },
  alertInfo: {
    backgroundColor: '#eff6ff',
    borderColor: '#dbeafe',
  },
  alertSuccess: {
    backgroundColor: '#f0fdf4',
    borderColor: '#dcfce7',
  },
  alertWarning: {
    backgroundColor: '#fffbeb',
    borderColor: '#fef3c3',
  },
  alertError: {
    backgroundColor: '#fef2f2',
    borderColor: '#fee2e2',
  },
  alertNeutral: {
    backgroundColor: '#f9fafb',
    borderColor: '#f3f4f6',
  },
  // Radio Group styles
  radioGroup: {
    gap: 12,
  },
  radioItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'white',
  },
  radioItemSelected: {
    borderColor: '#8b5cf6',
    backgroundColor: '#f5f3ff',
    borderWidth: 2,
  },
  radioItemDisabled: {
    opacity: 0.6,
  },
  radioItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButtonContainer: {
    marginRight: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#8b5cf6',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8b5cf6',
  },
  radioLabelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioItemIcon: {
    marginRight: 12,
  },
  radioLabel: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '500',
  },
  radioDescription: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },
  // Checkbox styles
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  checkboxLabel: {
    color: '#4b5563',
    fontSize: 14,
    flex: 1,
  },
  // Select styles
  selectContainer: {
    marginBottom: 16,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 6,
    backgroundColor: 'white',
  },
  selectText: {
    fontSize: 14,
    color: '#1f2937',
  },
  selectPlaceholder: {
    color: '#9ca3af',
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 100,
    maxHeight: 200,
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  optionItemSelected: {
    backgroundColor: '#f5f3ff',
  },
  optionText: {
    color: '#1f2937',
    fontSize: 14,
  },
  optionTextSelected: {
    color: '#8b5cf6',
    fontWeight: '500',
  },
  // Method-specific styles
  methodContainer: {
    paddingVertical: 20,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  requiredStar: {
    color: '#ef4444',
  },
  // Fade in animation
  fadeInView: {
    opacity: 1,
    marginTop: 16,
  },
  // Payment details card
  paymentDetailsCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  paymentDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentDetailsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  securePaymentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e8ff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  securePaymentText: {
    color: '#8b5cf6',
    fontSize: 10,
    marginLeft: 4,
  },
  paymentDetailsContent: {
    gap: 16,
  },
  smallHelperText: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: -10,
  },
  twoColumnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  columnHalf: {
    flex: 1,
  },
  // QR code styles
  qrCodeContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    marginBottom: 16,
  },
  qrCodeCard: {
    alignItems: 'center',
    width: '100%',
  },
  qrImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  qrPlaceholder: {
    width: 180,
    height: 180,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  qrShieldBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  qrInfoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  qrCompanyName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  qrUpiId: {
    fontSize: 12,
    color: '#6b7280',
  },
  qrButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  halfWidthButton: {
    flex: 1,
  },
  purpleOutlineButton: {
    borderColor: '#e0e7ff',
  },
  // Deposit form styles
  depositFormContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  depositForm: {
    gap: 16,
  },
  formSectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: 12,
  },
  largeInput: {
    fontSize: 18,
  },
  uploadSection: {
    marginTop: 8,
  },
  uploadLabel: {
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  uploadArea: {
    height: 120,
    borderWidth: 2,
    borderColor: '#d8b4fe',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#f5f3ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  uploadIcon: {
    marginBottom: 8,
  },
  uploadText: {
    color: '#8b5cf6',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  uploadHint: {
    color: '#8b5cf6',
    fontSize: 12,
    opacity: 0.7,
  },
  // Bank deposit styles
  bankDetailsCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  bankDetailsSection: {
    padding: 16,
  },
  bankDetailsSectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: 12,
  },
  bankDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  bankDetailItem: {
    width: '45%',
  },
  bankDetailLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  bankDetailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginTop: 2,
  },
  copyButtonContainer: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  transactionDetailsSection: {
    padding: 16,
  },
  transactionDetailsForm: {
    gap: 16,
  },
  // Bank icon
  bankIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bankIconText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563',
  },
  // Amount input section
  amountInputSection: {
    marginBottom: 20,
  },
  quickAmountButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },
  quickAmountButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  quickAmountText: {
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '500',
  },
  // Agent items
  agentItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  agentItemSelected: {
    borderColor: '#8b5cf6',
    backgroundColor: '#f5f3ff',
    borderWidth: 2,
  },
  agentRadioButton: {
    marginRight: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  agentDetailsContainer: {
    flex: 1,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 10,
    color: '#10b981',
    marginLeft: 2,
    fontWeight: '500',
  },
  agentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  agentLocationText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  agentTransactions: {
    fontSize: 12,
    color: '#6b7280',
  },
  // Cash deposit form
  cashDepositForm: {
    marginBottom: 16,
    gap: 16,
  },
  // Receipt upload
  receiptContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  receiptUploadContainer: {
    marginTop: 12,
  },
  receiptUploadArea: {
    height: 120,
    borderWidth: 2,
    borderColor: '#d8b4fe',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#f5f3ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  uploadedFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  uploadedFileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadedFileName: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '500',
  },
  uploadedFileSize: {
    color: '#6b7280',
    fontSize: 12,
  },
  removeFileButton: {
    padding: 4,
  },
  // Terms container
  termsContainer: {
    marginBottom: 8,
  },
  // Crypto styles
  cryptoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cryptoIconText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563',
  },
  cryptoDepositCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  cryptoDepositTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: 12,
  },
  cryptoQrContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  cryptoQrCode: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cryptoQrInstructions: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  cryptoAddressContainer: {
    position: 'relative',
    width: '100%',
  },
  cryptoAddressInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingRight: 70,
    fontSize: 12,
    color: '#4b5563',
  },
  cryptoCopyButton: {
    position: 'absolute',
    right: 4,
    top: 4,
    backgroundColor: '#f3f4f6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoCopyText: {
    fontSize: 12,
    color: '#4b5563',
    marginLeft: 4,
  },
  cryptoWarningList: {
    marginTop: 4,
  },
  cryptoWarningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#f59e0b',
    marginTop: 6,
    marginRight: 6,
  },
  cryptoWarningText: {
    fontSize: 12,
    color: '#78716c',
    flex: 1,
  },
  cryptoFormContainer: {
    gap: 16,
    marginBottom: 16,
  }
});
export default Deposit;
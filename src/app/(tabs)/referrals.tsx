import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
} from "../../../constants/theme";

const DFS_APPS = ["Sleeper", "Chalkboard"];
const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export default function SubmitReferralScreen() {
  const [dfsApp, setDfsApp] = useState("");
  const [refereeUsername, setRefereeUsername] = useState("");
  const [state, setState] = useState("");
  const [depositConfirmed, setDepositConfirmed] = useState(false);
  const [proofImage, setProofImage] = useState<string | null>(null);

  // Payment methods
  const [cashapp, setCashapp] = useState("");
  const [venmo, setVenmo] = useState("");
  const [paypal, setPaypal] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProofImage(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    if (!dfsApp) {
      Alert.alert("Error", "Please select a DFS platform");
      return false;
    }
    if (!refereeUsername.trim()) {
      Alert.alert("Error", "Please enter the referee username");
      return false;
    }
    if (!state) {
      Alert.alert("Error", "Please select a state");
      return false;
    }
    if (!depositConfirmed) {
      Alert.alert("Error", "Please confirm minimum deposit");
      return false;
    }

    // Check at least one payment method
    const hasPaymentMethod = cashapp.trim() || venmo.trim() || paypal.trim();
    if (!hasPaymentMethod) {
      Alert.alert("Error", "Please provide at least one payment method");
      return false;
    }

    if (!paymentConfirmed) {
      Alert.alert("Error", "Please confirm your payment details are correct");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // TODO: Submit to Supabase
      Alert.alert("Success", "Referral submitted for review!");
      console.log({
        dfsApp,
        refereeUsername,
        state,
        depositConfirmed,
        proofImage,
        cashapp,
        venmo,
        paypal,
      });
    }
  };

  const showStateInfo = () => {
    Alert.alert(
      "State Bonus Info",
      "Florida residents receive $20 per referral instead of the standard $100 due to state regulations.",
      [{ text: "Got it" }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>Submit Referral</Text>
        <Text style={styles.subtitle}>
          Fill out the form to submit your referral
        </Text>

        {/* DFS Platform */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>DFS Platform *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={dfsApp}
              onValueChange={setDfsApp}
              style={styles.picker}
              dropdownIconColor={colors.text}
            >
              <Picker.Item label="Select platform..." value="" />
              {DFS_APPS.map((app) => (
                <Picker.Item key={app} label={app} value={app} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Referee Username */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Referee Username *</Text>
          <TextInput
            style={styles.input}
            placeholder="Username of person who signed up"
            placeholderTextColor={colors.textTertiary}
            value={refereeUsername}
            onChangeText={setRefereeUsername}
          />
        </View>

        {/* State Selection */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>State *</Text>
            <TouchableOpacity onPress={showStateInfo}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={state}
              onValueChange={setState}
              style={styles.picker}
              dropdownIconColor={colors.text}
            >
              <Picker.Item label="Select state..." value="" />
              {US_STATES.map((st) => (
                <Picker.Item key={st} label={st} value={st} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Proof Image */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Proof of Signup (Optional)</Text>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            {proofImage ? (
              <Image source={{ uri: proofImage }} style={styles.previewImage} />
            ) : (
              <>
                <AntDesign
                  name="picture"
                  size={32}
                  color={colors.textSecondary}
                />
                <Text style={styles.imageButtonText}>
                  Tap to upload screenshot
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Deposit Confirmed */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setDepositConfirmed(!depositConfirmed)}
        >
          <View
            style={[
              styles.checkbox,
              depositConfirmed && styles.checkboxChecked,
            ]}
          >
            {depositConfirmed && (
              <AntDesign name="check" size={16} color={colors.text} />
            )}
          </View>
          <Text style={styles.checkboxLabel}>
            User has deposited the minimum required *
          </Text>
        </TouchableOpacity>

        {/* Payment Methods */}
        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <Text style={styles.sectionSubtitle}>
          Provide{" "}
          <Text style={{ color: colors.primary, fontWeight: "bold" }}>
            at least one
          </Text>{" "}
          payment method
        </Text>

        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <FontAwesome6
              name="dollar-sign"
              size={14}
              color={colors.textSecondary}
            />
            <Text style={styles.label}>Cash App</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="$username"
            placeholderTextColor={colors.textTertiary}
            value={cashapp}
            onChangeText={setCashapp}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <FontAwesome6 name="v" size={14} color={colors.textSecondary} />
            <Text style={styles.label}>Venmo</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="@username"
            placeholderTextColor={colors.textTertiary}
            value={venmo}
            onChangeText={setVenmo}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <FontAwesome6
              name="paypal"
              size={14}
              color={colors.textSecondary}
            />
            <Text style={styles.label}>PayPal</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="email@example.com"
            placeholderTextColor={colors.textTertiary}
            value={paypal}
            onChangeText={setPaypal}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Payment Confirmation */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setPaymentConfirmed(!paymentConfirmed)}
        >
          <View
            style={[
              styles.checkbox,
              paymentConfirmed && styles.checkboxChecked,
            ]}
          >
            {paymentConfirmed && (
              <AntDesign name="check" size={16} color={colors.text} />
            )}
          </View>
          <Text style={styles.checkboxLabel}>
            I confirm all payment details are correct *
          </Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Referral</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    margin: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
  },
  pickerContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    overflow: "hidden",
  },
  picker: {
    color: colors.text,
    height: 50,
  },
  imageButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    borderStyle: "dashed",
    padding: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 150,
  },
  imageButtonText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: borderRadius.md,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 6,
    marginRight: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: "center",
    marginTop: spacing.md,
  },
  submitButtonText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
});

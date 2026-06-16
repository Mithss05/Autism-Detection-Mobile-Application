import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { app } from "../services/firebase"; // ✅ Import Firebase app instance

const PeerSupportScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const db = getDatabase(app); // ✅ Use the initialized Firebase app
    const messagesRef = ref(db, "messages");

    // Listen for real-time updates
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesList = data ? Object.values(data) : [];
      setMessages(messagesList);
    });

    return () => unsubscribe(); // ✅ Cleanup the listener when the component unmounts
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const db = getDatabase(app); // ✅ Ensure we are using the correct database instance
    const messagesRef = ref(db, "messages");
    push(messagesRef, { text: message });
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Peer Support Chat</Text>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  header: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  messageBubble: { backgroundColor: "#007bff", padding: 10, borderRadius: 8, marginVertical: 5 },
  messageText: { color: "#fff" },
  inputContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5 },
  sendButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, marginLeft: 5 },
  sendText: { color: "#fff", fontWeight: "bold" },
});

export default PeerSupportScreen;

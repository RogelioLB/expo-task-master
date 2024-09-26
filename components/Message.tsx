import { MessageProps } from "@/db/messages";
import { getUserById, MappedUser } from "@/db/users";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import Avatar from "./Avatar";

export interface IMessage extends Omit<MessageProps, "created_by"> {
  created_by: string;
  created_at: Timestamp;
}

export default function Message({ message }: { message: IMessage }) {
  const [user, setUser] = useState<MappedUser>();
  const [isUserMessage, setIsUserMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUserById(message.created_by)
      .then((user) => {
        setUser(user);
        setIsUserMessage(user?.uid === message.created_by);
      })
      .finally(() => setLoading(true));
  }, []);

  if (loading) return <View className="bg-white rounded "></View>;

  return (
    <View
      className={`flex-row items-end gap-8 py-2 flex-1 ${
        isUserMessage ? "flex-row-reverse" : ""
      }`}
    >
      <Avatar size={42} url={user?.photoUrl as string} />
      <View
        className="bg-white w-4/5 rounded-md p-4 gap-1 relative shadow-sm shadow-black/30 z-10"
        style={{
          elevation: Platform.OS == "android" ? 4 : 0,
        }}
      >
        <Text className="text-lime-700 text-sm">{user?.displayName}</Text>
        <Text>{message.content}</Text>
        <Text className="text-sm">
          {new Date(message.created_at.toDate()).toLocaleTimeString()}
        </Text>
        <View
          className="shadow-sm shadow-black/30"
          style={[
            styles.triangle,
            !isUserMessage ? styles.triangleLeft : styles.triangleRight,
          ]}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 16,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    position: "absolute",
  },
  triangleRight: {
    elevation: Platform.OS === "android" ? -4 : 0,
    shadowColor: "black",
    shadowOffset: { height: 4, width: 3 },
    shadowRadius: 4,
    shadowOpacity: 0.3,
    bottom: 8,
    right: -15,
    transform: [{ rotate: "90deg" }],
    borderBottomColor: "white",
  },
  triangleLeft: {
    elevation: Platform.OS === "android" ? -4 : 0,
    shadowColor: "black",
    shadowOffset: { height: 4, width: 3 },
    shadowRadius: 4,
    shadowOpacity: 0.3,
    bottom: 8,
    left: -15,
    transform: [{ rotate: "-90deg" }],
  },
});

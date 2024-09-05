import Ionicons from "@expo/vector-icons/Ionicons";
import { requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker"
import { StyleSheet, Platform, View, Text, TouchableOpacity } from "react-native";
import { ExternalLink } from "@/components/ExternalLink";
import { useState } from "react";
import { Image } from "expo-image"

export default function TabTwoScreen() {
    const [image, setImage] = useState('')
    async function selectImage() {
        const result = await requestMediaLibraryPermissionsAsync()
        if (result.granted) {
            const { assets } = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images
            })
            if (assets === null) return

            setImage(assets[0].uri)
        }
    }
    return (
        <View style={styles.container}>
            {/* Aquí podrías agregar otros componentes */}
            <View style={styles.iconContainer}><Ionicons name="settings-outline" size={64} color="gray" style={styles.icon} /></View>
            <View style={styles.circleContainer}>
                <TouchableOpacity onPress={selectImage}>
                    {image ?  <Image source={{uri:image}} style={styles.imageUser}></Image> : <View style={styles.circle}/>}
                    <View style={styles.iconContainer}>
                        <Ionicons name="image" size={32} color="gray" style={styles.iconCircle}></Ionicons>
                    </View>
                </TouchableOpacity>
                <Text style={styles.nameUser}>Rogelio</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    icon: {
        marginBottom: 20,
    },
    iconContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
    circleContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
        gap: 16,
    },
    circle: {
        width: 100, // Ancho del círculo
        height: 100, // Alto del círculo
        borderRadius: 50, // Radio del borde para hacer el círculo
        backgroundColor: "blue", // Color del círculo
    },
    imageUser:{
        width: 100, // Ancho del círculo
        height: 100, // Alto del círculo
        borderRadius: 50, // Radio del borde para hacer el círculo
    },
    nameUser: {
        fontSize: 28,
        fontWeight: "bold"
    },
    iconCircle: {
    },
});
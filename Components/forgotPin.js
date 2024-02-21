import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native"

import realm, {
    getAllQuestions,
    getQuestionById,
} from "../Database";

export default function ForgotPin({ handleInput, close }) {
    const [id, setId] = useState(0);
    const [answer, setAnswer] = useState('');
    const [showHint, setShowHint] = useState(getQuestionById(id).showHint);
    const [incorrect, setIncorrect] = useState(false);
    const changeId = (_id) => {
        if (_id == getAllQuestions().length - 1) {
            _id = 0;
        } else {
            _id++;
        }
        return _id;
    }
    const changeHint = () => {
        setShowHint(getQuestionById(id).showHint)
    }
    useEffect(() => {
        changeHint();
    })
    return (
        <View>
            <Text
                style={{
                    marginVertical: 20,
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 32,
                    paddingHorizontal: 5,
                }}>
                SECURITY QUESTION
            </Text>
            <Text style={{
                marginHorizontal: 10,
                fontSize: 32,
                textAlign: 'center',
                color: 'black',
                textAlign: "left"
            }}>{getQuestionById(id).question}</Text>
            <View style={styles.textInputStyle}>
                <TextInput
                    onChangeText={(inputText) => {
                        setAnswer(inputText);
                    }}
                    placeholder="Your Answer"
                    style={{ fontSize: 25, paddingBottom: 8 }}
                />
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    setId(changeId(id));
                    setIncorrect(false);
                }}>
                    <Text style={{ marginHorizontal: 40, marginBottom: 20, fontSize: 25, textDecorationLine: "underline" }}>Skip?</Text>
                </TouchableOpacity>
                {showHint &&
                    <Text style={{ marginHorizontal: 10, fontSize: 25, marginTop: 10, marginBottom: 30 }}>Hint: {getQuestionById(id).hint}</Text>
                }
                {incorrect && <Text style={{ marginHorizontal: 10, fontSize: 25, marginVertical: 5, color: "#FF0000" }}>*Incorrect Answer</Text>}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 25, marginBottom: 40 }}>
                <TouchableOpacity style={{
                    backgroundColor: '#70FFA9', width: 120, height: 45, justifyContent: 'center', borderRadius: 20,
                    alignItems: 'center', alignSelf: 'center', borderColor: '#000000', borderWidth: 1
                }} onPress={() => {
                    if (answer == getQuestionById(id).answer) {
                        handleInput();
                    } else {
                        setIncorrect(true);
                    }
                }}>
                    <Text style={{ fontSize: 27 }}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: '#FFA6A6', width: 100, height: 45, justifyContent: 'center', borderRadius: 20,
                    alignItems: 'center', alignSelf: 'center', borderColor: '#000000', borderWidth: 1
                }}
                    onPress={() => { close() }}>
                    <Text style={{ fontSize: 27 }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    textInputStyle: {
        marginVertical: 20,
        backgroundColor: '#DBBFFF',
        width: 300,
        alignSelf: 'center',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 1,
        shadowRadius: 13.51,
        elevation: 15,
    },
})
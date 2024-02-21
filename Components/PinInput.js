import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    Image
} from 'react-native';
import DualButtons from './DualButtons';

/**
 * PARAMS TO PASS IN IF CODE IS PASSED IN
 * @param {code} code if a code is passed as a JSX element, the completedEvent is ignored and PIN is immediately submitted to system for validation
 * @param {handlePinInput} handlePinInput function called after immediately after the 6 digit is entered and a code is passed
 * 
 * PARAMS TO PASS IN IF CODE IS NOT PASSED IN
 * @param {completeEvent} completeEvent if there is no code passed in, completeEvent will be called upon confirmation of the 6-digit PIN and returns the entered PIN
 * 
 * @returns PIN Input format for popup
 */

export default function PinInput({ code, handlePinInput, completeEvent, close, forgot }) {

    const [passwords, setPassword] = useState(['', '', '', '', '', '']);
    const [pin, setPin] = useState('')
    const [maskedView, setMaskedView] = useState(true)
    const shake = useRef(new Animated.Value(0.5)).current;
    const [showPassword, setShowPassword] = useState(false)
    const [subtle, setSubtle] = useState(true);
    const [auto, setAuto] = useState(false);
    const [isFilled, setIsFilled] = useState(false)
    console.log(code)
    const [hasCode, setHasCode] = useState(!(isNaN(code)))
    console.log("HAS CODE??: " + hasCode)
    const translateXAnim = shake.interpolate({
        inputRange: [0, 1],
        outputRange: [subtle ? -8 : -16, subtle ? 8 : 16],
    });

    const getAnimationStyles = () => ({
        transform: [
            {
                translateX: translateXAnim,
            },
        ],
    });

    useEffect(() => {
        if (!passwords.includes('')) {
            handleOnComplete();
        } else {
            setIsFilled(false)
        }
    }, [passwords]);

    // render password input
    const onPressNumber = (num) => {
        console.log(num)
        if (num == 0) {
            num = '0'
        }
        // get the current password in the container
        let tempPassCode = [...passwords];

        for (var i = 0; i < tempPassCode.length; i++) {
            if (tempPassCode[i] == '') {
                tempPassCode[i] = num;
                console.log(tempPassCode)
                break;
            } else {
                continue;
            }
        }
        setPassword(tempPassCode)
    }

    // masking
    const onPressMask = () => {
        setMaskedView(!maskedView)
    }
    // backspace
    const onPressBack = () => {
        // get the current password in the container
        let tempPassCode = [...passwords];
        for (var i = tempPassCode.length - 1; i >= 0; i--) {
            if (tempPassCode[i] != '') {
                tempPassCode[i] = '';
                break;
            } else {
                continue;
            }
        }
        setPassword(tempPassCode);
    }

    const numkeyPadData = [
        {
            id: '1',
            content: 1
        },
        {
            id: '2',
            content: 2
        },
        {
            id: '3',
            content: 3
        },
        {
            id: '4',
            content: 4
        },
        {
            id: '5',
            content: 5
        },
        {
            id: '6',
            content: 6
        },
        {
            id: '7',
            content: 7
        },
        {
            id: '8',
            content: 8
        },
        {
            id: '9',
            content: 9
        },
        {
            id: 'maskedview',
            content: maskedView ? require('../images/buttons/view-icon.png') : require('../images/buttons/view-icon-2.png')
        },
        {
            id: '0',
            content: 0
        },
        {
            id: 'backspace',
            content: require('../images/buttons/backspace.png')
        },

    ];
    // NumberPad FlatList
    const renderNumberKeyPad = () => {

        return (
            <View>
                <FlatList
                    style={{ marginHorizontal: 40 }}
                    numColumns={3}
                    data={numkeyPadData}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => (
                        <View style={{ backgroundColor: 'black', height: 1.5 }} />
                    )}
                    renderItem={({ item }) => {
                        if (item.id != 'placeholder') {
                            return (
                                <TouchableOpacity
                                    onPress={item.id != 'backspace' ? item.id != 'maskedview' ? () => onPressNumber(item.content) : () => onPressMask() : () => onPressBack()}
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: 'black',
                                        borderLeftWidth: 1,
                                        height: 70,
                                        backgroundColor: '#DBBFFF',
                                        borderTopWidth: (item.id == '1' || item.id == '2' || item.id == '3') ? 1 : 0,
                                        borderRightWidth: (item.id == '3' || item.id == '6' || item.id == '9' || item.id == 'backspace') ? 1 : 0,
                                        borderBottomWidth: (item.id == '0' || item.id == 'backspace' || item.id == 'maskedview') ? 1.5 : 0
                                    }}
                                >
                                    {(item.id != 'backspace') ? (item.id != 'maskedview') ? <Text style={{ color: 'black', fontSize: 40, fontWeight: '700' }}>{item.content}</Text> : <Image style={{ height: 40, width: 50 }} source={item.content} /> : <Image style={{ height: 40, width: 50 }} source={item.content} />}
                                </TouchableOpacity>
                            )
                        }
                        else {
                            return (
                                <View style={{ flex: 1, opacity: 0, padding: 0.5 }}></View>
                            )
                        }
                    }}
                />
            </View>
        );
    }

    const handleOnComplete = () => {
        // link passwords up
        const passCodeStringVal = passwords.join('');

        // if code parameter is not passed in
        if (hasCode) {
            if (passCodeStringVal !== code) {
                runAnimation();
                setSubtle(false);
                setAuto(true);
                // alert(passCodeStringVal)
            } else {
                handlePinInput()
            }
            handleClearPassCode();
        } else {
            setIsFilled(true)
            setPin(passCodeStringVal)
        }

    }

    const handleClearPassCode = () => {
        setPassword(['', '', '', '', '', '']);
        setAuto(false)
    }

    const runAnimation = () => {
        Animated.sequence([
            Animated.timing(shake, {
                delay: 300,
                toValue: 1,
                duration: subtle ? 300 : 200,
                easing: Easing.out(Easing.sin),
                useNativeDriver: true,
            }),
            Animated.timing(shake, {
                toValue: 0,
                duration: subtle ? 200 : 100,
                easing: Easing.out(Easing.sin),
                useNativeDriver: true,
            }),
            Animated.timing(shake, {
                toValue: 1,
                duration: subtle ? 200 : 100,
                easing: Easing.out(Easing.sin),
                useNativeDriver: true,
            }),
            Animated.timing(shake, {
                toValue: 0,
                duration: subtle ? 200 : 100,
                easing: Easing.out(Easing.sin),
                useNativeDriver: true,
            }),
            Animated.timing(shake, {
                toValue: 0.5,
                duration: subtle ? 300 : 200,
                easing: Easing.out(Easing.sin),
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (auto) runAnimation();
        });
    };

    return (
        <View style={styles.containerWrap}>

            <Animated.View style={styles.passCodeContainer}>
                {passwords.map(pItem => {
                    return (
                        <Animated.View
                            key={pItem + Math.random()}
                            style={[styles.passCodeBox, getAnimationStyles()]}
                        >
                            <Text style={{ color: pItem ? 'black' : 'black', fontWeight: 'bold', fontSize: 30, opacity: pItem ? 1 : 0.2 }}>
                                {pItem ? maskedView ? '*' : pItem : '_'}
                            </Text>
                        </Animated.View>
                    )
                })}
            </Animated.View>

            <View style={{ marginTop: 12 }}>
                {renderNumberKeyPad()}
            </View>
            {hasCode ?
                <View>
                    <TouchableOpacity onPress={forgot}>
                        <Text style={{ marginHorizontal: 50, fontSize: 25, textAlign: "right", textDecorationLine: "underline" }}
                        >
                            Forgot your PIN?
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 50 }}>
                        <TouchableOpacity
                            onPress={() => close()}
                            style={styles.clearStyle}
                        >
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleClearPassCode()}
                            style={styles.clearStyle}
                        >
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                isFilled ?
                    <DualButtons
                        mt={20}
                        padding={55}
                        leftText={"Confirm"}
                        rightText={"Clear"}
                        leftEvent={() => completeEvent(pin)}
                        rightEvent={() => handleClearPassCode()}
                        leftSize={100}
                        rightSize={100} />
                    :
                    <TouchableOpacity
                        onPress={() => handleClearPassCode()}
                        style={styles.clearStyle}
                    >
                        <Text style={{ fontSize: 27, color: 'black' }}>Clear</Text>
                    </TouchableOpacity>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    containerWrap: {
        flex: 1,
    },
    passCodeContainer: {
        backgroundColor: '#DBACFF',
        marginHorizontal: 70,
        borderRadius: 8,
        marginBottom: 27,
        paddingVertical: 12,
        flexDirection: 'row'

    },
    passCodeBox: {
        alignItems: 'center',
        marginHorizontal: 6,
        flex: 1,
    },
    clearStyle: {
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: '#FFA6A6',
        width: 100,
        height: 45,
        justifyContent: 'center',
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000000'
    }

});
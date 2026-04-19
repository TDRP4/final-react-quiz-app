import React from "react";
import { View, Text } from "react-native";

export default function Summary({ route }) {
    const { questions, answers, score } = route.params;

    return (
        <View style={{ flex: 1, padding: 80, alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Summary</Text>
            <Text testID="total" style={{ fontSize: 25, fontWeight: "bold" }}>
                Score: {score}
            </Text>

            {questions.map((e, index) => (
                <View key={index} style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>{e.question}</Text>

                    {e.choices.map((choice, i) => {
                        const userAnswer = answers[index];
                        const correct = e.correct;

                        const isCorrect = Array.isArray(correct)
                            ? correct.includes(i)
                            : correct === i;

                        const wasSelected = Array.isArray(userAnswer)
                            ? userAnswer.includes(i)
                            : userAnswer === i;

                        return (
                            <Text
                                key={i}
                                style={{
                                    color: isCorrect ? 'green' : 'black',
                                    textDecorationLine:
                                        wasSelected && !isCorrect ? "line-through" : "none"
                                }}
                            >
                                {choice}
                            </Text>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}
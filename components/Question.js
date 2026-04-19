import React, { useState, useEffect, useCallback } from "react";
import { View, Text, BackHandler } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";

export default function Question({ navigation, route }) {
  const { data, index: startIndex } = route.params;

  const [index, setIndex] = useState(startIndex);
  const [selected, setSelected] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const question = data[index];

  useEffect(() => {
    navigation.setOptions({ gestureEnabled: false });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  function nextQuestion() {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = selected;

    const correct = question.correct;

    let isCorrect = false;

    if (Array.isArray(correct)) {
      const sortedA = [...selected].sort();
      const sortedB = [...correct].sort();
      isCorrect =
        sortedA.length === sortedB.length &&
        sortedA.every((v, i) => v === sortedB[i]);
    } else {
      isCorrect = selected === correct;
    }

    const updatedScore = score + (isCorrect ? 1 : 0);

    setAnswers(updatedAnswers);
    setScore(updatedScore);

    if (index < data.length - 1) {
      setIndex(index + 1);
      setSelected([]);
    } else {
      navigation.navigate("Summary", {
        questions: data,
        answers: updatedAnswers,
        score: updatedScore
      });
    }
  }

  const selectedIndex =
    Array.isArray(selected) ? selected : selected === null ? [] : [selected];

  return (
    <View style={{ flex: 1, padding: 50, alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
        {question.question}
      </Text>

      <ButtonGroup
        testID="choices"
        buttons={question.choices}
        vertical
        selectedIndexes={selectedIndex}
        onPress={(value) => {
          if (Array.isArray(question.correct)) {
            setSelected((prev) =>
              prev.includes(value)
                ? prev.filter((x) => x !== value)
                : [...prev, value]
            );
          } else {
            setSelected(value);
          }
        }}
        buttonStyle={{ width: 350 }}
      />

      <View>
        <ButtonGroup
          buttons={["Next Question"]}
          onPress={nextQuestion}
          buttonStyle={{ width: 350 }}
        />
      </View>
    </View>
  );
}
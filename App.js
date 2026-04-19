import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Question from "./components/Question";
import Summary from "./components/Summary";

const Stack = createNativeStackNavigator();

const questions = [
  {
    question: "What is a way of typing quotes in JavaScript?",
    type: "multiple-choice",
    choices: [`" "`, `' '`, "` `", "All of the above"],
    correct: 3
  },
  {
    question: "Which of the following are loops in JavaScript?",
    type: "multiple-answer",
    choices: ["while (true)", "forEach()", "function()", "for ()"],
    correct: [0, 1, 3]
  },
  {
    question: "True or False: JavaScript is both scripting and programming.",
    type: "true-false",
    choices: ["True", "False"],
    correct: 0
  },
  {
    question: "True or False: To check if one statement OR another is true, you use two ampersands (&&).",
    type: "true-false",
    choices: ["True", "False"],
    correct: 1
  },
  {
    question: "Which of the following functions would NOT return an error?",
    type: "multiple-answer",
    choices: ["console.log(`Cookies: ${cookies}`);",
              "console.log(cookies);",
              "console.log('Cookies');",
              `console.log("cookies");`],
    correct: [0, 1, 2, 3]
  }
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{ data: questions, index: 0 }}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import React, { useState } from 'react';
import { Brain, CheckCircle, XCircle, BookOpen } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    text: 'AIの略称は何ですか？',
    options: ['Artificial Intelligence', 'Automated Information', 'Advanced Integration', 'Algorithmic Iteration'],
    correctAnswer: 0,
  },
  {
    id: 2,
    text: '機械学習の主要な3つのタイプは何ですか？',
    options: [
      '教師あり学習、教師なし学習、強化学習',
      'データマイニング、パターン認識、ディープラーニング',
      'ニューラルネットワーク、決定木、サポートベクターマシン',
      'クラスタリング、回帰分析、分類',
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    text: 'ディープラーニングで使用される主要なネットワーク構造は何ですか？',
    options: ['CNN', 'RNN', 'GAN', 'すべて正解'],
    correctAnswer: 3,
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerClick = (selected: number) => {
    if (answered) return;
    
    setSelectedAnswer(selected);
    setAnswered(true);

    const newUserAnswers = [...userAnswers, selected];
    setUserAnswers(newUserAnswers);

    if (selected === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswered(false);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setQuizStarted(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        {!quizStarted ? (
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <h2 className="text-3xl font-bold">AI知識クイズ</h2>
              <BookOpen className="text-blue-500 ml-4" size={32} />
            </div>
            <p className="text-lg mb-6">
              このクイズでは、AIに関する基本的な知識を試します。全部で{questions.length}問あります。
              各質問には4つの選択肢があり、その中から正解だと思うものを1つ選んでください。
              全ての質問に答え終わると、最後に結果が表示されます。
              準備ができたら「開始」ボタンをクリックしてください。
            </p>
            <button
              onClick={startQuiz}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              開始
            </button>
          </div>
        ) : showScore ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">クイズ結果</h2>
            <p className="text-xl mb-4">
              {questions.length}問中{score}問正解しました
            </p>
            <div className="space-y-4 mb-6">
              {questions.map((question, index) => (
                <div key={question.id} className="text-left">
                  <p className="font-semibold">{index + 1}. {question.text}</p>
                  <p className={userAnswers[index] === question.correctAnswer ? "text-green-600" : "text-red-600"}>
                    あなたの回答: {question.options[userAnswers[index]]}
                  </p>
                  {userAnswers[index] !== question.correctAnswer && (
                    <p className="text-green-600">
                      正解: {question.options[question.correctAnswer]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={resetQuiz}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              もう一度挑戦する
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">AI知識クイズ</h2>
              <Brain className="text-blue-500" size={32} />
            </div>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">
                質問 {currentQuestion + 1}/{questions.length}
              </p>
              <p className="text-xl">{questions[currentQuestion].text}</p>
            </div>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className={`w-full text-left p-4 rounded transition duration-300 flex items-center
                    ${answered 
                      ? index === selectedAnswer
                        ? 'bg-blue-100'
                        : 'bg-gray-100'
                      : 'bg-gray-100 hover:bg-gray-200'
                    }
                    ${answered && 'cursor-default'}
                  `}
                  disabled={answered}
                >
                  {option}
                </button>
              ))}
            </div>
            {answered && (
              <div className="mt-6 text-center">
                <button
                  onClick={nextQuestion}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  {currentQuestion === questions.length - 1 ? '結果を見る' : '次の質問へ'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
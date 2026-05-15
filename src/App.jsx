import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lessons = [
  {
    type: "speak",
    title: "Say the word",
    content: "Rocket",
    helper: "Lift your tongue slightly for the R sound.",
  },

  {
    type: "choice",
    title: "Choose the stronger R sound",
    helper: "Select the pronunciation that sounds clearer.",
  },

  {
    type: "practice",
    title: "Slow syllable practice",
    helper: "Tap each syllable slowly and clearly.",
  },

  {
    type: "mirror",
    title: "Mirror mode",
    helper: "Observe your mouth posture while speaking.",
  },
];

export default function App() {
  const [step, setStep] = useState(0);

  const [feedback, setFeedback] = useState("");
  const [recording, setRecording] = useState(false);

  const [selectedChoice, setSelectedChoice] = useState("");
  const [selectedSyllable, setSelectedSyllable] = useState("");

  const [mirrorActive, setMirrorActive] = useState(false);

  const progress = ((step + 1) / lessons.length) * 100;

  // NEXT LESSON
  function nextLesson() {
    setFeedback("Great progress ✨");

    setTimeout(() => {
      setFeedback("");

      setSelectedChoice("");
      setSelectedSyllable("");

      setMirrorActive(false);
      setRecording(false);

      setStep((prev) => prev + 1);
    }, 1000);
  }

  // RECORD AUDIO
  async function handleRecord() {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      setRecording(true);

      setFeedback(
        "Listening to your pronunciation..."
      );

      const mediaRecorder =
        new MediaRecorder(stream);

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();

        setRecording(false);

        setFeedback(
          "Your R pronunciation sounded steadier ✨"
        );

        // STOP MICROPHONE
        stream.getTracks().forEach((track) =>
          track.stop()
        );
      }, 3000);

    } catch (error) {

      setFeedback(
        "Microphone permission denied"
      );
    }
  }

  // CHOICE CARD
  function handleChoice(choice) {
    setSelectedChoice(choice);

    setFeedback(
      "Nice listening accuracy 👏"
    );
  }

  // PRACTICE CARD
  function handleSyllable(text) {
    setSelectedSyllable(text);

    setFeedback(
      `${text} sounded smoother 🌱`
    );
  }

  // MIRROR MODE
  function handleMirror() {
    setMirrorActive(!mirrorActive);

    setFeedback(
      "Great mouth posture detected ✨"
    );
  }

  // FINAL SCREEN
  if (step >= lessons.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center p-6">

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-800 p-8 rounded-3xl w-full max-w-md text-center shadow-2xl"
        >
          <div className="text-6xl mb-4">
            🎉
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Lesson Complete
          </h1>

          <p className="text-slate-300">
            Your pronunciation confidence improved today.
          </p>

          <div className="mt-6 bg-slate-700 rounded-2xl p-4">

            <p className="text-3xl font-bold text-emerald-400">
              +40 XP
            </p>

            <p className="text-orange-300 mt-2">
              🔥 7 Day Streak
            </p>

          </div>

          <button className="mt-8 bg-emerald-400 text-slate-900 w-full py-4 rounded-2xl text-xl font-bold hover:scale-[1.02] transition">
            See You Tomorrow 🌱
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">

      {/* HEADER */}
      <div className="p-4">

        <div className="flex justify-between mb-3">

          <p className="text-slate-300">
            Daily R Practice
          </p>

          <p className="text-emerald-400 font-semibold">
            {step + 1}/{lessons.length}
          </p>

        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">

          <motion.div
            className="bg-emerald-400 h-full"
            animate={{ width: `${progress}%` }}
            transition={{
              type: "spring",
              stiffness: 100,
            }}
          />

        </div>
      </div>

      {/* CARD CONTAINER */}
      <div className="flex-1 flex items-center justify-center p-5">

        <AnimatePresence mode="wait">

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl"
          >

            <h2 className="text-3xl font-bold mb-2">
              {lessons[step].title}
            </h2>

            <p className="text-slate-300 mb-8">
              {lessons[step].helper}
            </p>

            {/* SPEAK CARD */}
            {lessons[step].type === "speak" && (
              <div className="flex flex-col items-center">

                <div className="bg-slate-700 rounded-3xl p-10 text-center mb-6 w-full">

                  <h1 className="text-5xl font-bold">
                    Rocket
                  </h1>

                </div>

                <motion.button
                  onClick={handleRecord}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: recording
                      ? [1, 1.1, 1]
                      : 1,
                  }}
                  transition={{
                    repeat: recording
                      ? Infinity
                      : 0,
                    duration: 1,
                  }}
                  className={`w-32 h-32 rounded-full text-5xl shadow-2xl ${
                    recording
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }`}
                >
                  🎤
                </motion.button>

                <p className="mt-5 text-xl">
                  {recording
                    ? "Recording..."
                    : "Tap to Record"}
                </p>

              </div>
            )}

            {/* CHOICE CARD */}
            {lessons[step].type === "choice" && (
              <div className="space-y-4">

                <button
                  onClick={() =>
                    handleChoice("A")
                  }
                  className={`w-full p-5 rounded-2xl text-lg transition ${
                    selectedChoice === "A"
                      ? "bg-emerald-400 text-slate-900"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  🔊 Version A
                </button>

                <button
                  onClick={() =>
                    handleChoice("B")
                  }
                  className={`w-full p-5 rounded-2xl text-lg transition ${
                    selectedChoice === "B"
                      ? "bg-emerald-400 text-slate-900"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  🔊 Version B
                </button>

              </div>
            )}

            {/* PRACTICE CARD */}
            {lessons[step].type === "practice" && (
              <div className="flex justify-center gap-3">

                {["RA", "RO", "REE"].map(
                  (item) => (
                    <motion.button
                      key={item}
                      whileTap={{
                        scale: 0.9,
                      }}
                      onClick={() =>
                        handleSyllable(item)
                      }
                      className={`p-6 rounded-2xl text-2xl font-bold transition ${
                        selectedSyllable === item
                          ? "bg-emerald-400 text-slate-900"
                          : "bg-slate-700 hover:bg-slate-600"
                      }`}
                    >
                      {item}
                    </motion.button>
                  )
                )}

              </div>
            )}

            {/* MIRROR MODE */}
            {lessons[step].type === "mirror" && (
              <button
                onClick={handleMirror}
                className={`h-72 rounded-3xl flex items-center justify-center text-center p-6 w-full transition ${
                  mirrorActive
                    ? "bg-emerald-400 text-slate-900"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              >

                <div>

                  <div className="text-6xl mb-4">
                    🪞
                  </div>

                  <p className="text-xl">
                    {mirrorActive
                      ? "Great mouth posture!"
                      : "Watch your lips stay relaxed while your tongue lifts."}
                  </p>

                </div>

              </button>
            )}

            {/* FEEDBACK */}
            {feedback && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="bg-emerald-400/10 border border-emerald-400/30 rounded-2xl p-4 mt-8"
              >

                <p className="text-emerald-300 text-center">
                  {feedback}
                </p>

              </motion.div>
            )}

            {/* CONTINUE BUTTON */}
            <button
              onClick={nextLesson}
              className="bg-emerald-400 text-slate-900 mt-8 w-full py-5 rounded-2xl text-xl font-bold hover:scale-[1.02] transition"
            >
              Continue
            </button>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
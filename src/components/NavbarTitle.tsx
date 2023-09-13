"use client";

import Typewriter from "typewriter-effect";

const pauseString = 10000;
const deleteSpeed = 20;
const delay = 40;
const typeSpeedFactor = 2;

let firstWaitText = true;
let waitTexts: string[] = ["I'm a ", "Sometimes a ", "Or even a ", "Maybe be a "];
waitTexts = [waitTexts, waitTexts, waitTexts, waitTexts].reduce((acc, curVal) => {
  return acc.concat(curVal);
}, []);

const getWaitText = () => {
  let i = Math.floor(Math.random() * (waitTexts.length - 1));
  if (firstWaitText) {
    firstWaitText = false;
    i = 0;
  }
  return waitTexts[i];
};

const Typing = ({ texts, className }: { texts: Array<string>; className?: string }) => {
  return (
    <div className={className ? className : ""}>
      <Typewriter
        onInit={(typewriter) => {
          texts.map((text) => {
            typewriter
              .changeDelay(delay)
              .changeDeleteSpeed(deleteSpeed)
              .typeString(text)
              .pauseFor(pauseString)
              .deleteAll()
              .pauseFor(500)
              .changeDelay(delay * typeSpeedFactor)
              .changeDeleteSpeed(0.001)
              .typeString(getWaitText())
              .changeDelay(1000)
              .typeString("..")
              .changeDelay(1)
              .typeString(".")
              .pauseFor(500)
              .deleteAll();
            // .pauseFor(50);
          });
          typewriter.start();
        }}
        options={{
          strings: texts,
          loop: true,
          cursorClassName: "typing-cursor",
        }}
      />
    </div>
  );
};

export default Typing;

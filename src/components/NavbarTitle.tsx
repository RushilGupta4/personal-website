'use client';

import Typewriter from 'typewriter-effect';

const pauseString = 6000;
const delSpeed = 20;
const delay = 50;
const typeSpeedFactor = 0.6;
const descriptions = ['Student Developer', 'Caffeine Addict', 'Chess Enthusiast', 'Problem Solver', 'Software Developer', 'Data Scientist'];

let firstWaitText = true;
let waitTexts: string[] = ["I'm a ", 'Sometimes a ', 'Or even a ', 'Maybe a ', 'Often a '];
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

const Typing = ({ className }: { className?: string }) => {
  return (
    <div className={className ? className : ''}>
      <Typewriter
        onInit={typewriter => {
          descriptions.map(text => {
            typewriter
              .changeDelay(delay)
              .changeDeleteSpeed(delSpeed)
              .typeString(text)
              .pauseFor(pauseString)
              .deleteAll()
              .pauseFor(300)
              .changeDelay(delay * typeSpeedFactor)
              .changeDeleteSpeed(0.001)
              .typeString(getWaitText())
              .changeDelay(275)
              .typeString('..')
              .changeDelay(1)
              .typeString('.')
              .pauseFor(300)
              .deleteAll();
            // .pauseFor(50);
          });
          typewriter.start();
        }}
        options={{
          loop: true,
          cursorClassName: 'typing-cursor'
        }}
      />
    </div>
  );
};

export default Typing;

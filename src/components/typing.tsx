"use client";

import Typewriter from "typewriter-effect";

const pauseString = 8000;
const deleteSpeed = 25;
const delay = 40;
const speedFactor = 0.5;

const Typing = ({ texts, className }: { texts: Array<string>; className?: string }) => {
  return (
    <div className={className ? className : ""}>
      <Typewriter
        onInit={(typewriter) => {
          typewriter.changeDelay(delay);
          texts.map((text) => {
            typewriter
              .changeDeleteSpeed(deleteSpeed)
              .typeString(text)
              .pauseFor(pauseString)
              .deleteAll()
              .pauseFor(800)
              .changeDeleteSpeed(deleteSpeed * speedFactor)
              .typeString("I'm a...")
              .pauseFor(300)
              .deleteAll()
              .pauseFor(100);
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

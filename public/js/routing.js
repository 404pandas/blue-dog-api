// Routing for keyboard/swipe listeners to navigate doorways
// https://www.section.io/engineering-education/keyboard-events-in-javascript/#:~:text=To%20record%20a%20keypress%20event,key%3B%20var%20code%20%3D%20event.
// keyboardjs on npm
keyboardJS.bind(
  "a",
  (e) => {
    e.preventRepeat();

    console.log("a is pressed");
  },
  (e) => {
    console.log("a is released");
  }
);

keyboardJS.bind(
  "a",
  (e) => {
    e.preventRepeat();

    console.log("a is pressed");
  },
  (e) => {
    console.log("a is released");
  }
);

keyboardJS.bind(
  "a",
  (e) => {
    e.preventRepeat();

    console.log("a is pressed");
  },
  (e) => {
    console.log("a is released");
  }
);

// if we have a router we can activate these contexts when appropriate
myRouter.on("/", (e) => {
  keyboardJS.setContext("index");
});
myRouter.on("/foo", (e) => {
  keyboardJS.setContext("foo");
});

// you can always figure out your context too
const contextName = keyboardJS.getContext();

// bind to the window and document in the current window
keyboardJS.watch();

// the keyboard will no longer trigger bindings
keyboardJS.pause();

// the keyboard will once again trigger bindings
keyboardJS.resume();

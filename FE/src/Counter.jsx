import React, { useState } from "react";

// Define the logging decorator
function LogMethod(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    console.log(`Calling ${propertyKey} with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result of ${propertyKey}:`, result);
    return result;
  };

  return descriptor;
}

class CounterComponent {
  @LogMethod
  increment(count, incrementBy = 1) {
    return count + incrementBy;
  }
}

function Counter() {
  const [count, setCount] = useState(0);
  const counter = new CounterComponent();

  const handleIncrement = () => {
    const newCount = counter.increment(count, 2);
    setCount(newCount);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export default Counter;

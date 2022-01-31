let txt = document.getElementById("text");

let data = {
  userInput: txt.value,
  splittedInput: [],
};

function splitUserInput(stringData) {
  let splittedData = stringData.match(/[()*x\/+-]|\d+(?:\.\d+)?/g);
  console.log(splittedData);
  data.splittedInput = splittedData;
  console.log(typeof splittedData); //object

  return splittedData;
}

function Compute(data) {
  let token = splitUserInput(data);

  Array.prototype.peek = function () {
    if (this.length === 0) {
      throw new Error("out of bounds");
    }
    return this[this.length - 1];
  };

  let operator = ["+", "-", "*", "/", "^", "x"];

  let operatorArray = ["$"];
  console.log("First pushed operator " + operatorArray);

  let outputArray = [];

  const lastOperator = operator.peek();
  console.log(lastOperator); // ^

  // define a precedent function

  function prec(token) {
    if (token == "$") {
      return 0;
    }
    if (token == "(") {
      return 1;
    }
    if (token == "+") {
      return 2;
    }
    if (token == "-") {
      return 2;
    }
    if (token == "*" || "x") {
      return 3;
    }
    if (token == "/" || "÷") {
      return 3;
    }
  }

  token.forEach((token) => {
    let isNumber = false;

    if (
      token.includes("0") ||
      token.includes("1") ||
      token.includes("2") ||
      token.includes("3") ||
      token.includes("4") ||
      token.includes("5") ||
      token.includes("6") ||
      token.includes("7") ||
      token.includes("8") ||
      token.includes("9")
    ) {
      isNumber = true;
    }

    if (isNumber) {
      outputArray.push(token);
    }
    if (token == "(") {
      operatorArray.push(token);
    }

    let topOp = operatorArray.peek();
    
    if (operator.includes(token) && token !== "(") {
        
        while (prec(topOp) >= prec(token)) {
            
          let tempOp = operatorArray.pop(topOp);
          outputArray.push(tempOp);
          if (prec(topOp) >= prec(token)&&operatorArray.length>1) {
            outputArray.push(operatorArray.pop());
            console.log("Pandas length " +operatorArray.length)
            
          }
          break;
      }
      console.log("Ebe outputarray" + outputArray);
      console.log("ebe operator array before push" + operatorArray);
      operatorArray.push(token);
      console.log("ebe operator array after push" + operatorArray);

      if (token == ")") {
        while (topOp !== "(" && operatorArray.length > 0) {
          let temp = operatorArray.pop(topOp);

          outputArray.push(temp);

          outputArray.push(operatorArray.pop(topOp));
        }
        return;
      }
    }
  });

  let filteredOperator = operatorArray.filter((e) => e !== "$" && e !== "(");

  let reversedfilteredOperator = filteredOperator.reverse();
  outputArray.push.apply(outputArray, reversedfilteredOperator);

  document.getElementById("postfix").textContent = outputArray;

  //Postfix to result Algorithm

  const numoutputArray = outputArray.map((v) => (isNaN(v) ? v : Number(v)));

  let resultArray = [];
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    x: (a, b) => a * b,
    "/": (a, b) => a / b,
    "÷": (a, b) => a / b,
  };

  for (const value of numoutputArray) {
    if (value in operators) {
      (b = resultArray.pop()), (a = resultArray.pop());
      resultArray.push(operators[value](a, b));
      continue;
    }
    resultArray.push(value);
  }

  let resultRounded = Math.round(resultArray * 100) / 100;
  theResult.textContent = resultRounded;

  //Creating the Async Function

  const getUrl = (num) => `http://numbersapi.com/${num}`;
  const getFacts = async (num) => {
    try {
      const resp = await fetch(getUrl(num));
      const data = await resp.text();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // You have to wrap the dom manipulation with an async function
  (async () => {
    let theQuote = document.getElementById("quote");
    let quoteNumber = Math.round(resultArray); // or else directly pushing resultArray will result in sth else
    theQuote.textContent = await getFacts(quoteNumber);
  })();

  console.log("HERE " + getFacts(resultArray)); // [object promise]

  return resultArray;
}

let btnEqual = document.getElementById("compute");
btnEqual.addEventListener("click", (event) => Compute(txt.value));

let theResult = document.getElementById("result");

function display(val) {
  document.getElementById("text").value += val;

  return val;
}

let userInput = document.getElementById("text");

function Operate() {}
function clearScreen() {
  document.getElementById("text").value = "";
  theResult.textContent = "";
  theQuote.textContent = "";
}

//Enters the power of toggle functions

function toggleFunction() {
  let t = document.getElementById("tap2");
  let y = document.getElementById("tap");
  let x = document.getElementById("calculator");
  let z = document.getElementById("equals");
  let a = document.getElementById("compute");

  if (y.style.display === "none") {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "block";
    a.style.display = "block";
    //t.style.display ="none"
  } else {
    x.style.display = "block";
    y.style.display = "none";
    z.style.display = "block";
    a.style.display = "none";
    t.style.display = "block";
  }
}

function toggle2() {
  let t = document.getElementById("tap2");
  let y = document.getElementById("tap");
  let x = document.getElementById("calculator");
  let z = document.getElementById("equals");
  let a = document.getElementById("compute");
  x.style.display = "none";
  t.style.display = "none";
  a.style.display = "block";
  y.style.display = "block";
}

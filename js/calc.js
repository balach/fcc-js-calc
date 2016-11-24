// Set up global variables
var calculator = {
  "entry": "0",
  "entries": [],
  "total": 0,
  "history": "0",
  "realHistory": "0",
  "lastOperand": "",
  "operations" : {
    "+" : function(a,b) {
      return  parseFloat(parseFloat(a) + parseFloat(b));
    },
    "-" : function(a,b) {
      return parseFloat(parseFloat(a) - parseFloat(b));
    },
    "x" : function(a,b) {
      return parseFloat(parseFloat(a) * parseFloat(b));
    },
    "÷" : function (a,b) {
      if (parseFloat(b) == 0) {
        alert("Division by Zero is not cool.");
        return parseFloat(a);
      } 
      return parseFloat(parseFloat(a) / parseFloat(b));
    },
    "=" : function() {
      return true;
    }
  },
  "updateView" : function(){
    console.log("Updating Display");
    $(".result").html(calculator.total);
    $(".history").html(calculator.history);
  },
  "clearEntry" : function() {
    console.log("Clearing Entry");
    calculator.entry = "0";
    calculator.history = calculator.realHistory;
    op = "";
    calculator.updateView();
  },
  "reset" : function(){
    console.log("Reseting Everything");
    calculator.entry = "0";
    calculator.entries = [];
    calculator.total = 0;
    calculator.history = "0";
    calculator.realHistory = "0";
    calculator.lastOperand = "";
    calculator.updateView();
  }
};

// Start the engines
$(document).ready(function() {

  $("button.surprise").on("click", function(){
    $("button").toggleClass("magic");
  });
  $("button.digit").on("click", function(){
    var digit = $(this).val();
    calculator.entry += digit;
    calculator.history += digit;
    calculator.updateView();
    $(".result").html(calculator.entry);
  });
  $("button.reset").on("click", function(){
    calculator.reset();
  });
  $("button.clear-entry").on("click", function(){
    calculator.clearEntry();
  });
  $("button.operator").on("click", function(){
    var op = $(this).val();
    var dontRecord = false;
    if (calculator.operations.hasOwnProperty(op)) {
      if (calculator.entries.length <= 1 && calculator.lastOperand === "") {
        if (calculator.entries[0] !== calculator.total) {
          calculator.entries[0] = parseFloat(calculator.entry);
          calculator.entry = "0";
        }
      }
      else if (calculator.lastOperand !== "") {
        if (calculator.entries.length === 1 && calculator.entry !== "0") {
          calculator.entries[1] = parseFloat(calculator.entry);
          calculator.total = parseFloat(calculator.operations[calculator.lastOperand](calculator.entries[0], calculator.entries[1]).toFixed(3));
          calculator.entries = [calculator.total];
          calculator.entry = "0";
        }
        else if (calculator.entry === "0") {
          console.log("Hit operation with out entry", calculator.realHistory, op, calculator.history);
          dontRecord = true;
        }  
      }
      if (op !== "=") {
        calculator.lastOperand = op;
        if (!!dontRecord) {
          calculator.history = calculator.history.slice(0, -1);
        }
        calculator.history += op;
      }
      else if (op === "=") {
        calculator.lastOperand = "";
        calculator.history = calculator.total;
      }
      calculator.realHistory = calculator.history;
      calculator.updateView();
    }
  });
});
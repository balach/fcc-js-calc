// Set up global variables
var results = [];

var calculator = {
  "entry": "0",
  "entries": [],
  "total": 0,
  "history": "0",
  "realHistory": "0",
  "lastOperand": "",
  "operations" : {
    "+" : function(a,b) {
      return a + b;
    },
    "-" : function(a,b) {
      return a - b;
    },
    "x" : function(a,b) {
      return a * b;
    },
    "÷" : function (a,b) {
      return a / b;
    },
    "=" : function() {
      return true;
    }
  },
  "updateView" : function(){
    $(".result").html(calculator.total);
    $(".history").html(calculator.history);
  }
};

// Start the engines
$(document).ready(function() {
  $(".clear").on("click", function(){
    calculator.entry = "0";
    calculator.total = 0;
    calculator.history = "";
    calculator.lastOperand = "";
    calculator.updateView();
  });
  $("button").on("click", function(){
    var op = $(this).val();
    console.log($(this).val());
    if (calculator.operations.hasOwnProperty(op)) {
      calculator.entries.push(calculator.entry);
      if (calculator.entries.length === 1) {
        calculator.total = parseFloat(calculator.entry);
      }
      else {
        calculator.total = calculator.operations[calculator.lastOperand](parseFloat(calculator.entries[0].toPrecision(3)), parseFloat(calculator.entries[1].toPrecision(3)));
      }
      calculator.entry = "0";
      calculator.lastOperand = op;
      calculator.realHistory = calculator.history;
    }
    else if (op === "ce") {
      calculator.entry = "0";
      calculator.history = calculator.realHistory;
      op = "";
    }
    else if (op === "c") {
      calculator.entry = "0";
      calculator.total = 0;
      calculator.history = "0";
      calculator.realHistory = "0";
      calculator.lastOperand = "";
    }
    else {
      calculator.entry += op;
    }
    if (["ce", "c", "="].indexOf(op) === -1) calculator.history += op;
    calculator.updateView();
  });
});


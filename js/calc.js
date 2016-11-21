// Set up global variables
var results = [];

var calculator = {
  "entry": "0",
  "total": 0,
  "history": "0",
  "realHistory": "0",
  "lastOperand": "",
  "operations" : {
    "+" : function(n) {
      return calculator.total + n;
    },
    "-" : function(n) {
      return calculator.total - n;
    },
    "x" : function(n) {
      return calculator.total * n;
    },
    "÷" : function (n) {
      return calculator.total / n;
    }
  },
  "calculate" : function() {

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
      if (calculator.entry === calculator.history) {
        calculator.total = parseFloat(calculator.entry);
      }
      else {
        calculator.total = calculator.operations[calculator.lastOperand](parseFloat(calculator.entry));
      }
      calculator.entry = "0";
      calculator.lastOperand = op;
      calculator.realHistory = calculator.history;
    }
    else if (op === "ce") {
      calculator.entry = "";
      calculator.history = calculator.realHistory;
      op = "";
    }
    else if (op === "c") {
      calculator.entry = "0";
      calculator.total = 0;
      calculator.history = "";
      calculator.lastOperand = "";
    }
    else {
      calculator.entry += op;
    }
    calculator.history += op;
    calculator.updateView();
  });

  
});


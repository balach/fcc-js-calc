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
      return  parseFloat(parseFloat(parseFloat(a) + parseFloat(b)).toPrecision(3));
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

  $("button.digit").on("click", function(){
    var digit = $(this).val();
    console.log("Entered Digit", digit);
    calculator.entry += digit;
    calculator.history += digit;
    calculator.updateView();
    $(".result").html(calculator.entry);
  });
  $("button.reset").on("click", function(){
    console.log("Reset Pressed");
    calculator.reset();
  });
  $("button.clear-entry").on("click", function(){
    console.log("Clear Entry Pressed");
    calculator.clearEntry();
  });
  $("button.operator").on("click", function(){
    var op = $(this).val();
    var dontRecord = false;
    console.log("Operation Requested", op);
    if (calculator.operations.hasOwnProperty(op)) {

      if (calculator.entries.length <= 1 && calculator.lastOperand === "") {
        if (calculator.entries[0] !== calculator.total) {
          calculator.entries[0] = parseFloat(calculator.entry).toPrecision(3);
          calculator.entry = "0";
        }
      }
      else if (calculator.lastOperand !== "") {
        if (calculator.entries.length === 1 && calculator.entry !== "0") {
          calculator.entries[1] = parseFloat(calculator.entry).toPrecision(3);
          calculator.total = parseFloat(calculator.operations[calculator.lastOperand](parseFloat(calculator.entries[0]).toPrecision(3), parseFloat(calculator.entries[1]).toPrecision(3))).toPrecision(3);
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
          //TODO: Remove last operation character from calculator.history
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


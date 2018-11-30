var currentField = "";
var memory1 = "";
var action = "";
var result = "";
var istorija = new Array();
var istorijaItem = new Object();
var equalsWasPressed = false;

function updateResultField(field) {
    document.getElementById('result').innerHTML = field;
}

function updateTable() {
    var table = document.getElementById('secondTable');

    table.innerHTML = "<tr>" +
        "<th>A</th>" +
        "<th>Veiksmas</th>" +
        "<th>B</th>" +
        "<th>Rezultatas<input type='submit' id='up' value='up' onclick='sortResultUp()'>" +
        "<input type='submit' id='down' value='down' onclick='sortResultDown()'></th>" +
        "</tr>";

    istorija.forEach(item => {
        var row = "<tr>"
            + "<td>" + item.number1 + "</td>"
            + "<td>" + item.historyAction + "</td>"
            + "<td>" + item.number2 + "</td>"
            + "<td>" + item.rezultatas + "</td>"
            + "</tr>";
        table.innerHTML += row;
    });
}

function handleClick(id) {
    if (equalsWasPressed) {
        currentField = "";
        equalsWasPressed = false;

        if (id != 'dalinti' && id != 'dauginti' && id != 'atimti' && id != 'sudeti') {
            if (id == 'dot' && currentField.indexOf(".") == -1) {
                currentField += ".";
            } else if (!isNaN(id.valueOf())) {
                currentField += id.valueOf();
                updateResultField(currentField);
            }
        } else {
            performAction(id);
        }

    } else {

        if (id != 'dalinti' && id != 'dauginti' && id != 'atimti' && id != 'sudeti') {
            if (id == 'dot' && currentField.indexOf(".") == -1) {
                currentField += ".";
            } else if (!isNaN(id.valueOf())) {
                currentField += id.valueOf();
                updateResultField(currentField);
            }
        } else {
            performAction(id);
        }
    }
}

function performAction(id) {
    switch (id) {
        case 'dalinti':
            action = "/"
            if (currentField != "") {
                memory1 = currentField;
            }
            currentField = "";
            updateResultField(currentField);
            break;
        case 'dauginti':
            action = "*"
            if (currentField != "") {
                memory1 = currentField;
            }
            currentField = "";
            updateResultField(currentField);
            break;
        case 'atimti':
            action = "-"
            if (currentField != "") {
                memory1 = currentField;
            }
            currentField = "";
            updateResultField(currentField);
            break;
        case 'sudeti':
            action = "+"
            if (currentField != "") {
                memory1 = currentField;
            }
            currentField = "";
            updateResultField(currentField);

            break;
        default:
            return;
    }
}

function calculate() {
    switch (action) {
        case '/':
            equalsWasPressed = true;
            result = Number(memory1) / Number(currentField);
            updateResultField(result);
            addToHistory(istorijaItem = {
                number1: memory1,
                historyAction: action,
                number2: currentField,
                rezultatas: result
            });
            console.log(istorijaItem);
            action = "";
            memory1 = "";
            currentField = result;
            break;
        case '*':
            equalsWasPressed = true;
            result = Number(memory1) * Number(currentField);
            updateResultField(result);
            addToHistory(istorijaItem = {
                number1: memory1,
                historyAction: action,
                number2: currentField,
                rezultatas: result
            });

            action = "";
            memory1 = "";
            currentField = result;
            break;
        case '-':
            equalsWasPressed = true;
            result = Number(memory1) - Number(currentField);
            updateResultField(result);
            addToHistory(istorijaItem = {
                number1: memory1,
                historyAction: action,
                number2: currentField,
                rezultatas: result
            });

            action = "";
            memory1 = "";
            currentField = result;
            break;
        case '+':
            equalsWasPressed = true;
            result = Number(memory1) + Number(currentField);
            updateResultField(result);
            addToHistory(istorijaItem = {
                number1: memory1,
                historyAction: action,
                number2: currentField,
                rezultatas: result
            });

            action = "";
            memory1 = "";
            currentField = result;
            break;
        default:
            return;
    }
}

function addToHistory(item) {
    istorija.push(item);
    updateTable();
}

function sortResultUp() {
    istorija = istorija.sort(function (obj1, obj2) {
        return obj1.rezultatas - obj2.rezultatas;
    });
    updateTable();
}

function sortResultDown() {
    istorija = istorija.sort(function (obj1, obj2) {
        return obj2.rezultatas - obj1.rezultatas;
    });
    updateTable();
}
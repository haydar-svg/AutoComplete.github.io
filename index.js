const myArray = ['aaa', 'bbb', 'ccc', 'aaa bbb', 'aaa ccc', 'bbb ccc', 'aaa bbb ccc', 'abc', 'aaee']

function $(id) {
    return document.getElementById(id)
}

function returnMatch(val = '') {
    let array = myArray.filter((element) => {
        return element.slice(0, val.length).toLowerCase() == val.toLowerCase() && val.length != 0
    });
    return array;
}

function returnMatchInMiddle(htmlElement) {
    var value = new RegExp(htmlElement.value.toLowerCase());
    let array = [];
    myArray.forEach((element) => {
        element = element.toLowerCase();
        if (value.exec(element) && htmlElement.value.length > 1) {
            array.push(value.exec(element));
        }
    });
    return array;
}

function AutoComplete(searchBox) {
    $('getResults').innerHTML = '';
    if (returnMatch(searchBox.value).length > 0) {
        $('form').style.borderRadius = "7px 7px 0px 0px"
        returnMatch(searchBox.value).forEach(element => {
            var result = document.createElement(`p`);
            result.innerHTML = element;
            result.setAttribute(`onclick`, `choose(this)`);
            result.setAttribute(`class`, `oneResult`);
            $('getResults').appendChild(result);
        });
    } else
        maybeAResult(searchBox)
}

function choose(result) {
    $('form').style.borderRadius = "100px";
    var resultText = result.innerHTML;
    $('searchBox').value = resultText;
    $('getResults').innerHTML = '';
}

function chooseByName(result) {
    $('form').style.borderRadius = "100px";
    var resultText = result.getAttribute('name');
    $('searchBox').value = resultText;
    $('getResults').innerHTML = '';
}

function hiddeResult() {
    $('form').style.borderRadius = "100px";
    $('getResults').innerHTML = '';
}

function maybeAResult(htmlElement) {
    if (returnMatchInMiddle(htmlElement).length > 0) {
        returnMatchInMiddle(htmlElement).forEach(element => {
            $('form').style.borderRadius = "7px 7px 0px 0px";
            var result = document.createElement(`p`);
            // this line here becouse this script doesnt write space when he need to collect the argumnet to the first state
            var space;
            /\s/.test(element.input.slice(element.index - 1, element.index)) == true ? space = '\xa0' : space = '';
            result.innerHTML = `${element.input.slice(0, element.index)}${space} <span style="color:#338bd3; text-transform:none;">${element[0]}</span> <span style="text-transform:none;">${element.input.slice(element.index + element[0].length)}</span>`
            result.setAttribute(`onclick`, `chooseByName(this)`);
            result.setAttribute(`class`, `oneResult`);
            result.setAttribute(`name`, element.input);
            $('getResults').appendChild(result);
        });
    } else $('form').style.borderRadius = "100px";
}

window.addEventListener('click', hiddeResult);
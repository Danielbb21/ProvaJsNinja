(function(DOM, doc) {
    "use strict";

    var $gameBtn = new DOM('[data-js="btns"]');
    var $betName = new DOM('[data-js="betName"]');
    var $betInformation = new DOM('[data-js="betInformation"]');
    var $gameNumbers = new DOM('[data-js="gameNumbers"]');

    $gameBtn.on('click', handlegameBtnClick);


    function handlegameBtnClick() {

        fillBetName.call(this);
        handleAjax(this.textContent);
    }


    function fillBetName() {
        $betName.get()[0].textContent = ' FOR ' + this.textContent.toUpperCase();
    }

    function handleAjax(obj) {

        var ajax = new XMLHttpRequest();
        ajax.open('GET', '../games.json');
        ajax.send();
        ajax.onreadystatechange = function() {

            if (isRequestOk(this)) {
                var dataParsed = JSON.parse(ajax.responseText);
                var array = dataParsed.types;
                var element = choseElements(obj, array);
                console.log('elemento retornado', element);
                placeInformationIntoHtml(element);
            }
        }
    }

    function placeInformationIntoHtml(args) {
        $betInformation.get()[0].textContent = args.description;

        var numeros = fillNumbersIntoHtml(args.range, args.range);

        cleanDiv($gameNumbers.get()[0]);
        numeros.sort(comparaNumeros).forEach(function(number) {
            var span = doc.createElement('span');
            var spText = doc.createTextNode(number);
            span.appendChild(spText);
            span.setAttribute('class', 'numbers');

            span.className = 'numbers';
            span.style.maxWidth = '63px';
            span.style.maxWidth = '63px';
            span.style.width = '63px';
            span.style.height = '65px';
            span.style.display = 'flex';
            span.style.alignItems = 'center';
            span.style.justifyContent = 'center';
            span.style.marginLeft = '12px';
            span.style.marginBottom = '20px';

            span.style.textAlign = 'left';

            span.style.borderRadius = '30px';
            span.style.backgroundColor = args.color;
            span.style.color = '#FFFFFF';
            $gameNumbers.get()[0].appendChild(span);
        })
    }

    function cleanDiv(obj) {
        var len = obj.children.length;
        if (obj.hasChildNodes()) {

            while (obj.firstChild) {
                obj.removeChild(obj.lastChild);
            }
        }
    }

    function comparaNumeros(a, b) { if (a == b) return 0; if (a < b) return -1; if (a > b) return 1; }

    function fillNumbersIntoHtml(maxNumbers, range) {
        var numeros = [];
        while (numeros.length < maxNumbers) {
            var aleatorio = Math.floor(Math.random() * range) + 1;
            if (numeros.indexOf(aleatorio) == -1)
                numeros.push(aleatorio);
        }
        return numeros;
    }


    function choseElements(obj, array) {
        switch (obj) {
            case 'Lotofácil':
                return array[0];
            case 'Mega-Sena':
                return array[1];
            case 'Lotomania':
                return array[2];
        }
    }

    function isRequestOk(obj) {
        if (obj.readyState === 4 && obj.status === 200) {
            return true;
        }

    }


})(window.DOM, document);
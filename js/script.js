(function(DOM, doc) {
    "use strict";

    var $gameBtn = new DOM('[data-js="btns"]');
    var $betName = new DOM('[data-js="betName"]');
    var $betInformation = new DOM('[data-js="betInformation"]');
    var $gameNumbers = new DOM('[data-js="gameNumbers"]');
    var $complet = new DOM('[data-js="complet"]');
    var $clear = new DOM('[data-js="clear"]');
    var $addCart = new DOM('[data-js="addCart"]');
    var $cart = new DOM('[data-js="cart"]');
    var $totalPrice = new DOM('[data-js="totalPrice"]');
    var $priceElement = new DOM('[data-js="priceElement"]');

    var colorElement;
    var elementos = [];
    var chosingNumbers = [];
    var cart = [];
    var totalPrice = 0;

    $gameBtn.on('click', handlegameBtnClick);
    $complet.on('click', handleCompletNumbers);
    $clear.on('click', handleClearSelectedNumbers);
    $addCart.on('click', handleAddCart);

    function verifyDivContent() {
        return $gameNumbers.get()[0].children.length > 0 ? true : false;
    }

    function handleAddCart() {
        console.log(elementos);
        console.log(chosingNumbers.sort(comparaNumeros).toString());
        cart.push({
            numbers: chosingNumbers.sort(comparaNumeros).toString(),
            type: elementos.type,
            color: elementos.color,
            price: elementos.price
        });
        console.log(cart);
        addElementsIntoCartSection(cart[cart.length - 1]);
        handleClearSelectedNumbers();
    }

    //Criar fragmentHtml
    function addElementsIntoCartSection(cartElement) {
        totalPrice += cartElement.price;
        console.log('price', cartElement.price.toString());
        var div = doc.createElement('div');
        var $p = doc.createElement('p');
        var $type = doc.createElement('span');
        var textType = doc.createTextNode(cartElement.type);
        var pText = doc.createTextNode(cartElement.numbers);
        var $price = doc.createElement('span');

        var textPrice = ' R$ ' + cartElement.price.toString();

        $p.appendChild(pText);
        $type.appendChild(textType);

        $price.textContent = textPrice;

        div.appendChild($p);
        div.appendChild($type);
        div.appendChild($price);

        div.style.maxWidth = '234px';
        div.style.maxHeight = '86px';
        div.style.paddingLeft = '12px';
        div.style.marginTop = '40px';

        $p.style.fontSize = '15px';
        $type.style.color = cartElement.color;
        div.style.borderLeft = `4px solid ${cartElement.color}`;
        $cart.get()[0].insertBefore(div, $priceElement.get()[0]);
        // $cart.get()[0].appendChild(div);
        // console.log('totalPrice', totalPrice.toString().replace('.', ','));
        var formaredPrice = formatPriceToDisplay(totalPrice);
        $totalPrice.get()[0].textContent = formaredPrice;
    }

    function formatPriceToDisplay(price) {
        var priceFormated = price.toFixed(2);
        return priceFormated.toString().replace('.', ',');
    }

    function handleCompletNumbers() {
        try {
            if (!verifyDivContent()) {
                throw new Error('Nenhum jogo selecionado');
            }

            handleClearSelectedNumbers();
            console.log(elementos.range, elementos.maxNumber);
            chosingNumbers = fillNumbersIntoHtml(elementos.maxNumber, elementos.range);
            console.log('elementos esoclhidos', chosingNumbers);

            Array.prototype.forEach.call($gameNumbers.get()[0].children, function(element) {
                for (var i = 0; i < chosingNumbers.length; i++) {
                    if (chosingNumbers[i] === +element.textContent) {
                        element.style.backgroundColor = 'red';
                        console.log(chosingNumbers[i], element.textContent);
                    }
                }
            });
        } catch (err) {
            alert(err.message);
        }
    }


    function handleClearSelectedNumbers() {



        var numbersQuantty = chosingNumbers.length;
        if (numbersQuantty > 0) {
            for (var i = 0; i < numbersQuantty; i++) {
                chosingNumbers.pop();
            }

            console.log(chosingNumbers);
            cleanColorFields();
        }


    }

    function cleanColorFields() {
        Array.prototype.forEach.call($gameNumbers.get()[0].children, function(element) {
            element.style.backgroundColor = colorElement;
        });
    }

    function handlegameBtnClick() {
        handleClearSelectedNumbers();
        console.log('selected numbers', chosingNumbers)
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
                elementos = choseElements(obj, array);

                placeInformationIntoHtml(elementos);
            }
        }
    }

    function placeInformationIntoHtml(args) {
        $betInformation.get()[0].textContent = args.description;
        colorElement = args.color;
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
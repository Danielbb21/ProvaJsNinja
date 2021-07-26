(function (DOM, doc) {
    "use strict";

    var $gameButton = new DOM('[data-js="buttons"]');
    var $betName = new DOM('[data-js="betName"]');
    var $betInformation = new DOM('[data-js="betInformation"]');
    var $gameNumbers = new DOM('[data-js="gameNumbers"]');
    var $complet = new DOM('[data-js="complet"]');
    var $clear = new DOM('[data-js="clear"]');
    var $addCart = new DOM('[data-js="addCart"]');
    var $cart = new DOM('[data-js="cart"]');
    var $totalPrice = new DOM('[data-js="totalPrice"]');
    var $priceElement = new DOM('[data-js="priceElement"]');
    var $cartContent = doc.createElement('div');
    var $saveCart = new DOM('[data-js="saveCart"]');
    var objectName = [];
    var colorElement;
    var elementos = [];
    var chosingNumbers = [];
    var cart = [];
    var totalPrice = 0;

    function init() {
        placingButtons();
        // console.log(objectName);
        // addingActionToTheButton(objectName[0]);
    }

    init();
    $complet.on('click', handleCompletNumbers);
    $clear.on('click', handleClearSelectedNumbers);
    $addCart.on('click', handleAddCart);
    $saveCart.on('click', handleSaveCart);

    function verifyDivContent() {
        return $gameNumbers.get()[0].children.length > 0 ? true : false;
    }

    function handleSaveCart() {
        try {
            verifyTotalPrice();
        }
        catch (err) {
            alert(err.message);
        }
    }

    function verifyTotalPrice() {


        if (cart.length <= 0) {
            throw new Error('Você ainda não tem nenhum jogo no carrinho');
        }

        if (totalPrice < elementos.minCartValue) {
            throw new Error(`Você ainda não possui o valor mínimo pedido que é ${elementos.minCartValue}`)
        }

        alert('Parabéns, desejamos muita sorte para você');
        cleanCart();
    }

    function cleanCart() {
        while ($cartContent.firstChild) {
            $cartContent.removeChild($cartContent.lastChild);
            cart.pop();

        }
        totalPrice = 0;
        var formaredPrice = formatPriceToDisplay(totalPrice);

        $totalPrice.get()[0].textContent = formaredPrice;
    }

    function handleAddCart() {
        try {
            if (!verfifyChosenNumbers()) {
                throw new Error('Você ainda nãp escolheu todos os números');
            }

            cart.push({
                numbers: sortNumber(chosingNumbers).toString(),
                type: elementos.type,
                color: elementos.color,
                price: elementos.price
            });

            addElementsIntoCartSection(cart[cart.length - 1]);
            handleClearSelectedNumbers();
        }
        catch (err) {
            alert(err.message);
        }

    }


    function verfifyChosenNumbers() {

        return chosingNumbers.length === elementos.maxNumber ? true : false;
    }

    function addElementsIntoCartSection(cartElement) {

        totalPrice += cartElement.price;

        var a = doc.createElement('a');
        var principalDiv = doc.createElement('div');
        var div = doc.createElement('div');
        var $p = doc.createElement('p');
        var $type = doc.createElement('span');
        var textType = doc.createTextNode(cartElement.type);
        var pText = doc.createTextNode(cartElement.numbers);
        var $price = doc.createElement('span');
        var img = doc.createElement('img');
        var textPrice = ' R$ ' + formatPriceToDisplay(cartElement.price);

        img.src = '../images/caixote-de-lixo.png';
        img.setAttribute('class', 'trashElement');
        a.appendChild(img);
        $p.appendChild(pText);
        $type.appendChild(textType);

        $price.textContent = textPrice;

        principalDiv.appendChild(a);

        div.appendChild($p);
        div.appendChild($type);
        div.appendChild($price);
        div.setAttribute('class', 'cartElements');
        principalDiv.setAttribute('class', 'divCart');
        $p.setAttribute('class', 'cartNumbers');
        $type.setAttribute('class', 'cartNumbers');
        $price.setAttribute('class', 'cartNumbers');
        $price.style.fontWeight = 'normal';
        $type.style.fontSize = '16px';
        $type.style.color = cartElement.color;
        div.style.borderLeft = `4px solid ${cartElement.color}`;

        principalDiv.appendChild(div);
        $cartContent.appendChild(principalDiv);
        $cartContent.setAttribute('class', 'cartContent');
        var empityCartText = new DOM('[data-js="empityCart"]');
        if (empityCartText.get()[0]) {
            $cart.get()[0].removeChild(empityCartText.get()[0]);
        }

        $cart.get()[0].insertBefore($cartContent, $priceElement.get()[0]);

        var formaredPrice = formatPriceToDisplay(totalPrice);
        $totalPrice.get()[0].textContent = formaredPrice;
        a.addEventListener('click', handleDeleteButton);

    }

    function handleDeleteButton() {
        var numbers = this.nextElementSibling.children[0].textContent.split(',');
        searachIntoCartNumbers(cart, numbers);
    }

    function searachIntoCartNumbers(cart, number) {


        var cartNumbers = cart.map(function (element) {
            return element.numbers;
        })

        var position = cartNumbers.indexOf(number.toString());
        var element = cart.splice(position, 1);
        removeElementInsideTheCart(element[0]);
    }

    function removeElementInsideTheCart(obj) {

        Array.prototype.map.call($cartContent.children, function (t) {
            if (t.children[1].children[0].textContent === obj.numbers) {
                $cartContent.removeChild(t);
                return;
            }
        });

        totalPrice -= obj.price;
        var formaredPrice = formatPriceToDisplay(totalPrice);
        $totalPrice.get()[0].textContent = formaredPrice;
    }

    function formatPriceToDisplay(price) {
        var priceFormated = price.toFixed(2);
        return priceFormated.toString().replace('.', ',');
    }
    function sortNumber(arr){
        var sortedArray = [];
        arr.forEach(function (element) {
            sortedArray.push(parseInt(element));
        });
        
        return  sortedArray.sort(comparaNumeros);
        
    }
    function handleCompletNumbers() {
        try {
            if (!verifyDivContent()) {
                throw new Error('Nenhum jogo selecionado');
            }

            
            chosingNumbers = fillNumbers(elementos.maxNumber, elementos.range);
           

            Array.prototype.forEach.call($gameNumbers.get()[0].children, function (element) {
                for (var i = 0; i < chosingNumbers.length; i++) {
                    if (chosingNumbers[i] === element.textContent) {

                        element.style.backgroundColor = '#00FFFF';
                    }
                }
            });
        } catch (err) {
            alert(err.message);
        }
    }



    function fillNumbers(maxNumber, range) {
        var arr = chosingNumbers;
        while (arr.length < maxNumber) {
            var aleatorio = Math.floor(Math.random() * range) + 1;
            console.log('elemento', aleatorio);
            console.log('resultado', arr.indexOf(aleatorio.toString()))
            if (arr.indexOf(aleatorio.toString()) === -1) {
                arr.push(aleatorio.toString());
            }
        }

        return arr;

    }


    function handleClearSelectedNumbers() {
        var numbersQuantty = chosingNumbers.length;

        if (numbersQuantty > 0) {
            for (var i = 0; i < numbersQuantty; i++) {
                chosingNumbers.pop();
            }
            cleanColorFields();
        }
    }

    function cleanColorFields() {
        Array.prototype.forEach.call($gameNumbers.get()[0].children, function (element) {
            element.style.backgroundColor = colorElement;
        });
    }

    function handlegameBtnClick() {
        handleClearSelectedNumbers();
        var content = this.textContent;
        fillBetName(content);
        addingActionToTheButton(this.textContent);
    }


    function placingButtons() {
        var array = ajax().then(function (response) {
            createButtons(response);

        });


    }

    async function ajax() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', '../games.json');
        ajax.send();
        return new Promise(function (resolve, reject) {
            ajax.onreadystatechange = function () {

                if (isRequestOk(this)) {
                    var dataParsed = JSON.parse(ajax.responseText);
                    var array = dataParsed.types;
                    resolve(array);
                }
            }
        })

    }


    function createButtons(array) {

        var buttonName = array.map(function (btn) {
            var button = doc.createElement('button');
            objectName.push(btn.type);
            button.textContent = btn.type;
            button.style.borderColor = `${btn.color}`;
            button.style.color = `${btn.color}`;
            $gameButton.get()[0].appendChild(button);
            button.addEventListener('click', handlegameBtnClick);
        });
        fillBetName(objectName[0])
        addingActionToTheButton(objectName[0]);
    }

    function fillBetName(element) {
        $betName.get()[0].textContent = ' FOR ' + element.toString().toUpperCase();
    }

    async function addingActionToTheButton(obj) {

        var array = ajax().then(function (response) {

            elementos = choseElements(obj, response);

            placeInformationIntoHtml(elementos);
        });

    }

    function placeInformationIntoHtml(args) {
        $betInformation.get()[0].textContent = args.description;
        colorElement = args.color;
        var numeros = fillNumbersIntoHtml(args.range, args.range);

        cleanDiv($gameNumbers.get()[0]);

        numeros.sort(comparaNumeros).forEach(function (number) {

            var span = doc.createElement('span');
            var spText = doc.createTextNode(number);
            span.appendChild(spText);
            span.setAttribute('class', 'numbers');
            span.style.backgroundColor = args.color;
            span.style.color = '#FFFFFF';
            span.addEventListener('click', handleChoseNumber);
            $gameNumbers.get()[0].appendChild(span);
        })
    }

    function handleChoseNumber() {
        console.log(chosingNumbers.length, elementos.maxNumber);
        console.log(elementos);

        if (chosingNumbers.length < elementos.maxNumber) {

            addElement.apply(this, chosingNumbers);


        }
        else {
            alert('Você já selecionou todos os números');
        }
    }

    function addElement() {

        if (chosingNumbers.indexOf(this.textContent.toString()) === -1) {

            chosingNumbers.push(this.textContent);
            console.log('chosing', chosingNumbers)
            this.style.backgroundColor = '#00FFFF';
        }
        else {
            alert('você já possui esse número');
        }


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
        var index;
        objectName.forEach(function (element, indexButton) {

            if (element === obj) {
                index = indexButton;
            }
        });
        return array[index];

    }

    function isRequestOk(obj) {
        if (obj.readyState === 4 && obj.status === 200) {
            return true;
        }

    }


})(window.DOM, document);
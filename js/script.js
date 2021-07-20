(function(DOM, doc) {
    "use strict";

    var $gameBtn = new DOM('[data-js="btns"]');
    var $betName = new DOM('[data-js="betName"]');
    var $beforeBetInfo = new DOM('[data-js="beforeBetInfo"]');
    var $main = new DOM('main');
    var $betInformation = new DOM('[data-js="betInformation"]');
    console.log('bet info', $betInformation.get()[0].value = 'teste');
    $gameBtn.on('click', handlegameBtnClick);


    function handlegameBtnClick() {

        fillBetName.call(this);
        handleAjax(this.textContent);
    }


    function fillBetName() {
        $betName.get()[0].textContent = ' FOR ' + this.textContent.toUpperCase();
    }

    function handleAjax(obj) {
        console.log('entreiu aqui')
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

        var decription = doc.createTextNode(args.description);


        $betInformation.get()[0].textContent = args.description;

    }

    function insertAfter(element, newNode, existingNode) {
        element.insertBefore(newNode, existingNode.nextSibling);
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
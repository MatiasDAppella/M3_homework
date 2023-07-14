'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor){
    this._state = "pending",
    this._value,

    this._internalResolve = function(someData){
        if (this._state === "pending"){
            this._state = "fulfilled"
            this._value = someData
        }
    }.bind(this),

    this._internalReject = function(myReason){
        if (this._state === "pending"){
            this._state = "rejected"
            this._value = myReason
        }
    }.bind(this)

    if (typeof executor !== "function") throw TypeError("executor must be a function")
    executor(this._internalResolve, this._internalReject)
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
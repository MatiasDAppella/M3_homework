'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor){
    this._state = "pending",
    this._value,
    this._handlerGroups = [],

    this.then = function(successCb, errorCb){
        const isFunction = (cb) => {
            if (typeof cb === "function") return cb
        }
        const downstreamPromise = new $Promise(() => {})

        this._handlerGroups.push({
            successCb: isFunction(successCb),
            errorCb: isFunction(errorCb),
            downstreamPromise: downstreamPromise
        })

        if (this._state !== "pending") this._callHandlers()
        return downstreamPromise
    },

    this.catch = function(errorCb){
        return this.then(null, errorCb)
    },
    
    this._callHandlers = function(){
        while (this._handlerGroups.length) {
            const handler = this._handlerGroups.shift(), v = this._value
            if (this._state === "fulfilled" && handler.successCb) {
                try {
                    const aux = handler.successCb(v)
                    if (aux instanceof $Promise) {
                        handler.downstreamPromise = aux
                    }
                    else handler.downstreamPromise._internalResolve(aux) 
                } catch (error){
                    handler.downstreamPromise._internalReject(error)
                }
            }
            if (this._state === "fulfilled" && !handler.successCb) {
                handler.downstreamPromise._internalResolve(v)
            }
            if (this._state === "rejected" && handler.errorCb) {
                try {
                    handler.downstreamPromise._internalResolve(handler.errorCb(v))
                } catch (error) {
                    handler.downstreamPromise._internalReject(error)
                }
            }
            if (this._state === "rejected" && !handler.errorCb) {
                handler.downstreamPromise._internalReject(v)
            }
        }
    }.bind(this),
    
    this._internalResolve = function(someData){
        if (this._state === "pending"){
            this._state = "fulfilled"
            this._value = someData
            this._callHandlers()
        }
    }.bind(this),
    
    this._internalReject = function(myReason){
        if (this._state === "pending"){
            this._state = "rejected"
            this._value = myReason
            this._callHandlers()
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
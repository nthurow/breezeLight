(function (scope) {

    var objector = function (prototype) {

        var self = this;
        var closuresToAdd = [];
        var prototypeMethodsToAdd = [];

        self.extend = function (methodsToAddOrClosureToCall) {
            if (typeof methodsToAddOrClosureToCall === 'function') {
                closuresToAdd.push(methodsToAddOrClosureToCall);
            } else {
                for (var methodName in methodsToAddOrClosureToCall) {
                    prototypeMethodsToAdd.push({
                        methodName: methodName,
                        method: methodsToAddOrClosureToCall[methodName]
                    });
                }
            }

            return self;
        };

        self.create = function () {
            var objectedResult = Object.create(prototype);

            closuresToAdd.forEach(function (closure) {
                closure.call(objectedResult, closure);
            });

            prototypeMethodsToAdd.forEach(function (method) {
                objectedResult[method.methodName] = method.method;
            });

            return objectedResult;
        };

        return this;
    };

    var validator = function (validator) {

        var self = this;

        self.execute = function () {
            return validator.apply(validator, arguments);
        };

        return self;
    };

    var objectValidator = function () {
        var propList = [];
        var validatorFunction = arguments[arguments.length - 1];
        var validateHelper = validator(validatorFunction);

        for (var x = 0; x < arguments.length - 1; x++) {
            propList.push(arguments[x]);
        }

        return {
            execute: function(targetObj) {
                var argList = propList.map(function(prop) {
                    return targetObj[prop];
                });
                return validateHelper.execute.apply(targetObj, argList);
            }
        };
    };

    var documentPrototype = {
        protoMethod1: function () {
            return 'Called proto method 1';
        }
    };

    var invalidDocument = objector(documentPrototype)
        .extend({
            extensionMethod1: function () {
                return 'Called extention method 1';
            }
        })
        .extend(function() {
            var privateVar = 'first private';
            this.getFirstPrivateVar = function() {
                return privateVar;
            };
        })
        .extend(function() {
            var privateVar = 'second private';
            this.getSecondPrivateVar = function() {
              return privateVar;
            };
        })
        .create();

    invalidDocument.type = 'create';
    invalidDocument.createdDate = new Date('2015-12-12');

    var validDocument = objector(documentPrototype);
    validDocument.type = 'edit';
    validDocument.createdDate = new Date('2015-12-12');

    var documentValidator = objectValidator('type', 'createdDate', function (type, createdDate) {
        if (type === 'create') {
            return createdDate.valueOf() < new Date().valueOf();
        } else {
            return createdDate.valueOf() > new Date().valueOf();
        }
    });

    var firstResult = documentValidator.execute(invalidDocument);
    var secondResult = documentValidator.execute(validDocument);

})(window);
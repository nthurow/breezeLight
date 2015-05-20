var documentType = entityManager.createPrototype('DocumentRm');
documentType.extend(function () {

    var privateVar = 'it\'s a secret';

    this.getSecret = function () {
        return privateVar;
    };

    this.setSecret = function (value) {
        privateVar = value;
    };

}).extend({

    doWork: function () {

    },

    computeSomething: function (firstVal, secondVal) {

    }

}).property('fullName', {

    parser: function (plainValue) {

        return plainValue.toString();
    },
    get: function (valueToReturn) {

        return valueToReturn;
    },
    set: function (typedValue) {

    }

}).validate('firstProp', 'secondProp.value', function(firstProp, secondPropValue, context) {

    return firstProp === secondPropValue;
});

//metadata.forEach(function (entityMetadata) {
//
//    var entityPrototype = {
//        _metadata: entityMetadata
//    };
//
//    entityMetadata.properties.forEach(function (propDef) {
//        addGetterSetterPropertyToObject(entityPrototype, createGetterSetterProperty(propDef));
//
//        propDef.custom.validations.forEach(function (validationDef) {
//            var validator = createValidator(validationDef);
//            entityPrototype.addValidator(validator);
//        });
//    });
//
//    entityManager.registerTypeFactory(entityMetadata.shortName, entityMetadata.namespace, entityPrototype);
//});
//
//var documentObj = makeNewEntity('DocumentRm_Healthland_Resources_Document_DocumentRm');
//documentObj.CreatedDateTime = '2014-01-01';
//documentObj.LatestContentLog = {
//    CreatedDateTime: '2014-05-05',
//    CreatedBy: 'Nick Thurow'
//};
//var anotherDoc = makeNewEntity('DocumentRm_Healthland_Resources_Document_DocumentRm', {
//    LatestContentLog: {
//        CreatedDateTime: '2014-05-05',
//        CreatedBy: 'Nick Thurow'
//    }
//});
//var temp = document;
function createEntityType(name, namespace, properties) {

    window.types = window.types || {};
    var entityName = name + '_' + (namespace.replace(/\./igm, '_'));
    var ctor;

    if (!window.types[entityName]) {
        ctor = window.types[entityName] = Function('return function ' + entityName + '() {}')();
    } else {
        throw 'An entity with the name ' + entityName + ' already exists.';
    }

    properties.forEach(function (property) {
        registerEntityProperty(ctor.prototype, property);
    });

    ctor.prototype._metadata = {
        properties: properties
    };
}

function registerEntityProperty(obj, propertyDef) {

    var typeFactory = getTypeFactory(propertyDef);
    obj._backingStore = obj._backingStore || {};

    Object.defineProperty(obj, propertyDef.name, {
        enumerable: true,
        get: function () {
            return obj._backingStore[propertyDef.name];
        },
        set: function (value) {
            var typedValue = typeFactory(value);
            obj._backingStore[propertyDef.name] = typedValue;
            return typedValue;
        }
    });
}

function getTypeFactory(typeDef) {

    var typeFactory;

    switch (typeDef.type) {
        case 'DateTime':
            typeFactory = typeFactoryFunc(function (value) {
                return new Date(value);
            });
            break;
        case 'Int32':
            typeFactory = typeFactoryFunc(function (value) {
                return parseInt(value);
            });
            break;
        case 'String':
            typeFactory = typeFactoryFunc(function (value) {
                return value.toString();
            });
            break;
        default:
            typeFactory = typeFactoryFunc(function (value) {
                return makeNewEntity(typeDef.type, value);
            });
    }

    return typeFactory;
}

function typeFactoryFunc(typeConverterFunc) {

    return function (value) {
        if (value !== null && value !== undefined) {
            return typeConverterFunc(value);
        } else {
            return value;
        }
    }
}

function makeNewEntity(fullTypeName, initValue) {

    var entity = new window.types[fullTypeName]();

    for (var prop in initValue) {
        entity[prop] = initValue[prop];
    }

    return entity;
}
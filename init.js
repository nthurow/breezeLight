metadata.forEach(function (entityMetadata) {
    createEntityType(entityMetadata.shortName, entityMetadata.namespace, entityMetadata.properties);
});

var documentObj = makeNewEntity('DocumentRm_Healthland_Resources_Document_DocumentRm');
documentObj.CreatedDateTime = '2014-01-01';
documentObj.LatestContentLog = {
    CreatedDateTime: '2014-05-05',
    CreatedBy: 'Nick Thurow'
};
var anotherDoc = makeNewEntity('DocumentRm_Healthland_Resources_Document_DocumentRm', {
    LatestContentLog: {
        CreatedDateTime: '2014-05-05',
        CreatedBy: 'Nick Thurow'
    }
});
var temp = document;
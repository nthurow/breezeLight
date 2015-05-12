var metadata = [{
    shortName: 'DocumentRm',
    namespace: 'Healthland.Resources.Document.DocumentRm',
    properties: [
        {
            name: 'CreatedDateTime',
            type: 'DateTime',
            nullable: true
        },
        {
            name: 'DocumentId',
            type: 'Int32',
            nullable: false
        },
        {
            name: 'ContentLogs',
            type: 'ContentLogRm_Healthland_Resources_ContentLog_ContentLogRm',
            isScalar: false
        },
        {
            name: 'LatestContentLog',
            type: 'ContentLogRm_Healthland_Resources_ContentLog_ContentLogRm'
        }
    ]
}, {
    shortName: 'ContentLogRm',
    namespace: 'Healthland_Resources_ContentLog_ContentLogRm',
    properties: [
        {
            name: 'CreatedDateTime',
            type: 'DateTime'
        },
        {
            name: 'CreatedBy',
            type: 'String'
        }
    ]
}];
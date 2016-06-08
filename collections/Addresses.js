Schemas.Address = new SimpleSchema({
    text: {
        type: String,
        label: 'Text',
        index: 1
    },
    lat: {
        type: Number,
        decimal: true,
        label: 'Latitude'
    },
    lng: {
        type: Number,
        decimal: true,
        label: 'Longitude'
    },
    postalCode: {
        type: String,
        optional: true,
        label: 'Postal Code',
        index: 1
    },
    country: {
        type: String,
        label: 'Country',
        optional: true,
        index: 1
    },
    state: {
        type: String,
        label: 'State/Province',
        optional: true,
        index: 1
    },
    city: {
        type: String,
        label: 'City',
        optional: true,
        index: 1
    },
    district: {
        type: String,
        optional: true,
        label: 'District',
        index: 1
    },
    neighborhood: {
        type: String,
        optional: true,
        label: 'Neighborhood',
        index: 1
    },
    streetName: {
        type: String,
        optional: true,
        label: 'Street Name',
        index: 1
    },
    streetNumber: {
        type: String,
        optional: true,
        label: 'Street Number'
    },
    majorIntersection: {
        type: String,
        optional: true,
        label: 'Major Intersection',
        index: 1
    }
});
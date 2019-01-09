"use strict";
module.exports = {
    transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'hakaton.medicine@gmail.com',
            pass: 'hakaton1!',
        },
    },
    defaults: {
        forceEmbeddedImages: true,
        from: 'Neo4gig service',
    },
    templateDir: './src/common/email-templates',
};

var JoiTranslation = require('joi-i18n');
var Joi = require('joi');

module.exports = app => {
    
    // Português - Brasil
    Joi.addLocaleData('pt_BR', {
        any: {
            unknown: t({phrase: 'joi', locale: 'pt_BR'}).any.unknown,
            invalid: t({phrase: 'joi', locale: 'pt_BR'}).any.invalid,
            empty: t({phrase: 'joi', locale: 'pt_BR'}).any.empty,
            required: t({phrase: 'joi', locale: 'pt_BR'}).any.required,
            allowOnly: t({phrase: 'joi', locale: 'pt_BR'}).any.allowOnly,
            default: t({phrase: 'joi', locale: 'pt_BR'}).any.default
        },
        string: {
            base: t({phrase: 'joi', locale: 'pt_BR'}).string.base,
            min: t({phrase: 'joi', locale: 'pt_BR'}).string.min,
            max: t({phrase: 'joi', locale: 'pt_BR'}).string.max,
            length: t({phrase: 'joi', locale: 'pt_BR'}).string.length,
            alphanum: t({phrase: 'joi', locale: 'pt_BR'}).string.alphanum,
            token: t({phrase: 'joi', locale: 'pt_BR'}).string.token,
            regex: {
                base: t({phrase: 'joi', locale: 'pt_BR'}).string.regex.base,
                name: t({phrase: 'joi', locale: 'pt_BR'}).string.regex.name
            },
            email: t({phrase: 'joi', locale: 'pt_BR'}).string.email,
            uri: t({phrase: 'joi', locale: 'pt_BR'}).string.uri,
            uriCustomScheme: t({phrase: 'joi', locale: 'pt_BR'}).string.uriCustomScheme,
            isoDate: t({phrase: 'joi', locale: 'pt_BR'}).string.isoDate,
            guid: t({phrase: 'joi', locale: 'pt_BR'}).string.guid,
            hex: t({phrase: 'joi', locale: 'pt_BR'}).string.hex,
            hostname: t({phrase: 'joi', locale: 'pt_BR'}).string.hostname,
            lowercase: t({phrase: 'joi', locale: 'pt_BR'}).string.lowercase,
            uppercase: t({phrase: 'joi', locale: 'pt_BR'}).string.uppercase,
            trim: t({phrase: 'joi', locale: 'pt_BR'}).string.trim,
            creditCard: t({phrase: 'joi', locale: 'pt_BR'}).string.creditCard,
            ref: t({phrase: 'joi', locale: 'pt_BR'}).string.ref,
            ip: t({phrase: 'joi', locale: 'pt_BR'}).string.ip,
            ipVersion: t({phrase: 'joi', locale: 'pt_BR'}).string.ipVersion
        },
        alternatives: {
            base: t({phrase: 'joi', locale: 'pt_BR'}).alternatives
        },
        array: {
            base: t({phrase: 'joi', locale: 'pt_BR'}).array.base,
            includes: t({phrase: 'joi', locale: 'pt_BR'}).array.includes,
            includesSingle: t({phrase: 'joi', locale: 'pt_BR'}).array.includesSingle,
            includesOne: t({phrase: 'joi', locale: 'pt_BR'}).array.includesOne,
            includesOneSingle: t({phrase: 'joi', locale: 'pt_BR'}).array.includesOneSingle,
            includesRequiredUnknowns: t({phrase: 'joi', locale: 'pt_BR'}).array.includesRequiredUnknowns,
            includesRequiredKnowns: t({phrase: 'joi', locale: 'pt_BR'}).array.includesRequiredKnowns,
            includesRequiredBoth: t({phrase: 'joi', locale: 'pt_BR'}).array.includesRequiredBoth,
            excludes: t({phrase: 'joi', locale: 'pt_BR'}).array.excludes,
            excludesSingle: t({phrase: 'joi', locale: 'pt_BR'}).array.excludesSingle,
            min: t({phrase: 'joi', locale: 'pt_BR'}).array.min,
            max: t({phrase: 'joi', locale: 'pt_BR'}).array.max,
            length: t({phrase: 'joi', locale: 'pt_BR'}).array.length,
            ordered: t({phrase: 'joi', locale: 'pt_BR'}).array.ordered,
            orderedLength: t({phrase: 'joi', locale: 'pt_BR'}).array.orderedLength,
            sparse: t({phrase: 'joi', locale: 'pt_BR'}).array.sparse,
            unique: t({phrase: 'joi', locale: 'pt_BR'}).array.unique
        },
        boolean: {
            base: t({phrase: 'joi', locale: 'pt_BR'}).boolean.base
        },
        binary: {
            base: t({phrase: 'joi', locale: 'pt_BR'}).binary.base,
            min: t({phrase: 'joi', locale: 'pt_BR'}).binary.min,
            max: t({phrase: 'joi', locale: 'pt_BR'}).binary.max,
            length: t({phrase: 'joi', locale: 'pt_BR'}).binary.length
        },
        date: {
            base: t({phrase: 'joi', locale: 'pt_BR'}).date.base,
            min: t({phrase: 'joi', locale: 'pt_BR'}).date.min,
            max: t({phrase: 'joi', locale: 'pt_BR'}).date.max,
            isoDate: t({phrase: 'joi', locale: 'pt_BR'}).date.isoDate,
            ref: t({phrase: 'joi', locale: 'pt_BR'}).date.ref
        },
        function: {
            base: t({phrase: 'joi', locale: 'pt_BR'}).function.base
        },
        object: {
            base: t({phrase: 'joi', locale: 'pt_BR'}).object.base,
            child: t({phrase: 'joi', locale: 'pt_BR'}).object.child,
            min: t({phrase: 'joi', locale: 'pt_BR'}).object.min,
            max: t({phrase: 'joi', locale: 'pt_BR'}).object.max,
            length: t({phrase: 'joi', locale: 'pt_BR'}).object.length,
            allowUnknown: t({phrase: 'joi', locale: 'pt_BR'}).object.allowUnknown,
            with: t({phrase: 'joi', locale: 'pt_BR'}).object.with,
            without: t({phrase: 'joi', locale: 'pt_BR'}).object.without,
            missing: t({phrase: 'joi', locale: 'pt_BR'}).object.missing,
            xor: t({phrase: 'joi', locale: 'pt_BR'}).object.xor,
            or: t({phrase: 'joi', locale: 'pt_BR'}).object.or,
            and: t({phrase: 'joi', locale: 'pt_BR'}).object.and,
            nand: t({phrase: 'joi', locale: 'pt_BR'}).object.nand,
            assert: t({phrase: 'joi', locale: 'pt_BR'}).object.assert,
            rename: {
                multiple: t({phrase: 'joi', locale: 'pt_BR'}).object.rename.multiple,
                override: t({phrase: 'joi', locale: 'pt_BR'}).object.rename.override
            },
            type: t({phrase: 'joi', locale: 'pt_BR'}).object.type
        },
        number: {
            base: t({phrase: 'joi', locale: 'pt_BR'}).number.base,
            min: t({phrase: 'joi', locale: 'pt_BR'}).number.min,
            max: t({phrase: 'joi', locale: 'pt_BR'}).number.max,
            less: t({phrase: 'joi', locale: 'pt_BR'}).number.less,
            greater: t({phrase: 'joi', locale: 'pt_BR'}).number.greater,
            float: t({phrase: 'joi', locale: 'pt_BR'}).number.float,
            integer: t({phrase: 'joi', locale: 'pt_BR'}).number.integer,
            negative: t({phrase: 'joi', locale: 'pt_BR'}).number.negative,
            positive: t({phrase: 'joi', locale: 'pt_BR'}).number.positive,
            precision: t({phrase: 'joi', locale: 'pt_BR'}).number.precision,
            ref: t({phrase: 'joi', locale: 'pt_BR'}).number.ref,
            multiple: t({phrase: 'joi', locale: 'pt_BR'}).number.multiple
        }
    });

    // Inglês
    Joi.addLocaleData('en', {
        any: {
            unknown: t({phrase: 'joi', locale: 'en'}).any.unknown,
            invalid: t({phrase: 'joi', locale: 'en'}).any.invalid,
            empty: t({phrase: 'joi', locale: 'en'}).any.empty,
            required: t({phrase: 'joi', locale: 'en'}).any.required,
            allowOnly: t({phrase: 'joi', locale: 'en'}).any.allowOnly,
            default: t({phrase: 'joi', locale: 'en'}).any.default
        },
        string: {
            base: t({phrase: 'joi', locale: 'en'}).string.base,
            min: t({phrase: 'joi', locale: 'en'}).string.min,
            max: t({phrase: 'joi', locale: 'en'}).string.max,
            length: t({phrase: 'joi', locale: 'en'}).string.length,
            alphanum: t({phrase: 'joi', locale: 'en'}).string.alphanum,
            token: t({phrase: 'joi', locale: 'en'}).string.token,
            regex: {
                base: t({phrase: 'joi', locale: 'en'}).string.regex.base,
                name: t({phrase: 'joi', locale: 'en'}).string.regex.name
            },
            email: t({phrase: 'joi', locale: 'en'}).string.email,
            uri: t({phrase: 'joi', locale: 'en'}).string.uri,
            uriCustomScheme: t({phrase: 'joi', locale: 'en'}).string.uriCustomScheme,
            isoDate: t({phrase: 'joi', locale: 'en'}).string.isoDate,
            guid: t({phrase: 'joi', locale: 'en'}).string.guid,
            hex: t({phrase: 'joi', locale: 'en'}).string.hex,
            hostname: t({phrase: 'joi', locale: 'en'}).string.hostname,
            lowercase: t({phrase: 'joi', locale: 'en'}).string.lowercase,
            uppercase: t({phrase: 'joi', locale: 'en'}).string.uppercase,
            trim: t({phrase: 'joi', locale: 'en'}).string.trim,
            creditCard: t({phrase: 'joi', locale: 'en'}).string.creditCard,
            ref: t({phrase: 'joi', locale: 'en'}).string.ref,
            ip: t({phrase: 'joi', locale: 'en'}).string.ip,
            ipVersion: t({phrase: 'joi', locale: 'en'}).string.ipVersion
        },
        alternatives: {
            base: t({phrase: 'joi', locale: 'en'}).alternatives
        },
        array: {
            base: t({phrase: 'joi', locale: 'en'}).array.base,
            includes: t({phrase: 'joi', locale: 'en'}).array.includes,
            includesSingle: t({phrase: 'joi', locale: 'en'}).array.includesSingle,
            includesOne: t({phrase: 'joi', locale: 'en'}).array.includesOne,
            includesOneSingle: t({phrase: 'joi', locale: 'en'}).array.includesOneSingle,
            includesRequiredUnknowns: t({phrase: 'joi', locale: 'en'}).array.includesRequiredUnknowns,
            includesRequiredKnowns: t({phrase: 'joi', locale: 'en'}).array.includesRequiredKnowns,
            includesRequiredBoth: t({phrase: 'joi', locale: 'en'}).array.includesRequiredBoth,
            excludes: t({phrase: 'joi', locale: 'en'}).array.excludes,
            excludesSingle: t({phrase: 'joi', locale: 'en'}).array.excludesSingle,
            min: t({phrase: 'joi', locale: 'en'}).array.min,
            max: t({phrase: 'joi', locale: 'en'}).array.max,
            length: t({phrase: 'joi', locale: 'en'}).array.length,
            ordered: t({phrase: 'joi', locale: 'en'}).array.ordered,
            orderedLength: t({phrase: 'joi', locale: 'en'}).array.orderedLength,
            sparse: t({phrase: 'joi', locale: 'en'}).array.sparse,
            unique: t({phrase: 'joi', locale: 'en'}).array.unique
        },
        boolean: {
            base: t({phrase: 'joi', locale: 'en'}).boolean.base
        },
        binary: {
            base: t({phrase: 'joi', locale: 'en'}).binary.base,
            min: t({phrase: 'joi', locale: 'en'}).binary.min,
            max: t({phrase: 'joi', locale: 'en'}).binary.max,
            length: t({phrase: 'joi', locale: 'en'}).binary.length
        },
        date: {
            base: t({phrase: 'joi', locale: 'en'}).date.base,
            min: t({phrase: 'joi', locale: 'en'}).date.min,
            max: t({phrase: 'joi', locale: 'en'}).date.max,
            isoDate: t({phrase: 'joi', locale: 'en'}).date.isoDate,
            ref: t({phrase: 'joi', locale: 'en'}).date.ref
        },
        function: {
            base: t({phrase: 'joi', locale: 'en'}).function.base
        },
        object: {
            base: t({phrase: 'joi', locale: 'en'}).object.base,
            child: t({phrase: 'joi', locale: 'en'}).object.child,
            min: t({phrase: 'joi', locale: 'en'}).object.min,
            max: t({phrase: 'joi', locale: 'en'}).object.max,
            length: t({phrase: 'joi', locale: 'en'}).object.length,
            allowUnknown: t({phrase: 'joi', locale: 'en'}).object.allowUnknown,
            with: t({phrase: 'joi', locale: 'en'}).object.with,
            without: t({phrase: 'joi', locale: 'en'}).object.without,
            missing: t({phrase: 'joi', locale: 'en'}).object.missing,
            xor: t({phrase: 'joi', locale: 'en'}).object.xor,
            or: t({phrase: 'joi', locale: 'en'}).object.or,
            and: t({phrase: 'joi', locale: 'en'}).object.and,
            nand: t({phrase: 'joi', locale: 'en'}).object.nand,
            assert: t({phrase: 'joi', locale: 'en'}).object.assert,
            rename: {
                multiple: t({phrase: 'joi', locale: 'en'}).object.rename.multiple,
                override: t({phrase: 'joi', locale: 'en'}).object.rename.override
            },
            type: t({phrase: 'joi', locale: 'en'}).object.type
        },
        number: {
            base: t({phrase: 'joi', locale: 'en'}).number.base,
            min: t({phrase: 'joi', locale: 'en'}).number.min,
            max: t({phrase: 'joi', locale: 'en'}).number.max,
            less: t({phrase: 'joi', locale: 'en'}).number.less,
            greater: t({phrase: 'joi', locale: 'en'}).number.greater,
            float: t({phrase: 'joi', locale: 'en'}).number.float,
            integer: t({phrase: 'joi', locale: 'en'}).number.integer,
            negative: t({phrase: 'joi', locale: 'en'}).number.negative,
            positive: t({phrase: 'joi', locale: 'en'}).number.positive,
            precision: t({phrase: 'joi', locale: 'en'}).number.precision,
            ref: t({phrase: 'joi', locale: 'en'}).number.ref,
            multiple: t({phrase: 'joi', locale: 'en'}).number.multiple
        }
    });

    Joi.setDefaultLocale('pt_BR');
}
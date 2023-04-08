const { GraphQLDateTime } = require("graphql-iso-date")
const Query = require("./query")
const Mutation = require("./mutation")
const Note = require("./note")
const User = require("./user")

module.exports = {
    Query,
    Mutation,
    Note,
    User,
    DateTime: GraphQLDateTime // todo: 原理是什么？ Appollo Server 文档的 "Custom Scalar Types" 一节
}
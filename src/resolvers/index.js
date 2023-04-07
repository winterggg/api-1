const Query = require("./query")
const Mutation = require("./mutation")
const { GraphQLDateTime } = require("graphql-iso-date")

module.exports = {
    Query,
    Mutation,
    DateTime: GraphQLDateTime // todo: 原理是什么？ Appollo Server 文档的 "Custom Scalar Types" 一节
}
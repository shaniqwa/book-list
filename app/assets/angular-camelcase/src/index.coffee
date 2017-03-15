capitalizeFirstLetter = (str) ->
  return '' if str.length is 0
  "#{str.substr(0, 1).toUpperCase()}#{str.substr(1)}"

module.exports = angular.module 'filters.camelcase', []

.filter 'toCamelCase', ->
  # Convert a space delimited string of tokens into camelCase.
  (string) ->
    tokens = string.split(" ")
    return '' if tokens.length is 0

    firstToken = tokens[0]
    otherTokens = tokens[1..]

    "#{firstToken.toLowerCase()}#{otherTokens.map(capitalizeFirstLetter).join('')}"

.filter 'titleFromCamelCase', ->
  # Convert a camelCase string into a english title string, e.g. "Camel Case".
  # Considers two sequential uppercase characters in the camelcase string to be the same token.

  # http://stackoverflow.com/questions/4149276/javascript-camelcase-to-regular-form
  (camelCase) ->
    camelCase
    # insert a space before all caps
    .replace(/([A-Z]+)/g, ' $1')
    # uppercase the first character
    .replace(/^./, (str) -> str.toUpperCase())
    # fix leading whitespace off-by-ones
    .trim()

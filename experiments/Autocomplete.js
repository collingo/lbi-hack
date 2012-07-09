module.exports = function(redisClient,prefix) {
  var Autocomplete = {};
  
  Autocomplete.prefix = prefix;
  Autocomplete.terminal = "+";
  
  Autocomplete.add = function(word, next) {
    function add(letters, key, last, x) {
      var letter = last ? Autocomplete.terminal : letters[x];
      var score = last ? 0 : letter.charCodeAt(0);
      redisClient.zadd(key, score, letter, function(reply) {
        x++;
        if (x < letters.length) {
          add(letters, key+letter, false, x);
        } else {
          if (x == letters.length) {
            add(letters, key+letter, true, x);
          } else {
            if (typeof(next) == "function") next();
          }
        }
      })
    }
    var letters = word.split("");
    var key = Autocomplete.prefix+letters[0];
    add(letters, key, false, 1);
  }
  
  Autocomplete.suggest = function(query, limit, next) {
    var more = 1;
    var suggestions = [];
    function suggest(query) {
      var key = Autocomplete.prefix+query;
      redisClient.zrange(key, 0, -1, function(err, reply) {
        if(err) throw err;
        more--;
        reply.forEach(function(c) {
          if (c == Autocomplete.terminal) { 
            suggestions.push(query);
          } else {
            if (suggestions.length < limit) {
              more++;
              suggest(query + c);
            }
          }
        })
        if (more <= 0) next(suggestions);
      })
    }
    suggest(query);
  }
  
  return Autocomplete;
}
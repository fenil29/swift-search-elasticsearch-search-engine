const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://143.198.43.192:9200/" });

var indexName = "database_9";
(function init() {
  Promise.resolve()
    .then(deleteOldIndexIfExist, onError)
    .then(createNewIndex, onError)
    .then(checkStatus, onError)
    .then(closeIndex, onError)
    .then(putMapping, onError)
    .then(openIndex, onError);
})();
function deleteOldIndexIfExist() {
  console.log("Deleting index if exist -");
  return client.indices
    .delete({
      index: indexName,
      ignore_unavailable: true,
    })
    .then(resolveHandler);
}

function createNewIndex() {
  console.log("Creating Index");
  return client.indices
    .create({
      index: indexName,
      body: {
        settings: {
          number_of_shards: 6,
          number_of_replicas: 1,
          analysis: {
            filter: {
              autocomplete_filter: {
                type: "edge_ngram",
                min_gram: 1,
                max_gram: 20,
              },
            },
            analyzer: {
              autocomplete: {
                type: "custom",
                tokenizer: "standard",
                filter: ["lowercase", "autocomplete_filter"],
              },
            },
          },
        },
      },
    })
    .then(resolveHandler);
}

function checkStatus() {
  console.log("Verifying status");

  return client.cluster
    .health({
      index: indexName,
    })
    .then(resolveHandler);
}

function closeIndex() {
  console.log("Closing index -");

  return client.indices
    .close({
      index: indexName,
    })
    .then(resolveHandler);
}

function putMapping() {
  console.log("Creating Mapping");

  return client.indices
    .putMapping({
      index: indexName,
      body: {
        properties: {
          author_id: {
            type: "keyword",
          },
          author_name: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256,
              },
            },
          },
          authors: {
            properties: {
              id: {
                type: "keyword",
              },
              name: {
                type: "text",
              },
              role: {
                type: "keyword",
              },
            },
          },
          average_rating: {
            type: "float",
          },
          description: {
            type: "text",
          },
          edition_information: {
            type: "keyword",
          },
          format: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256,
              },
            },
          },
          id: {
            enabled: false,
          },
          image_url: {
            enabled: false,
          },
          isbn: {
            enabled: false,
          },
          isbn13: {
            enabled: false,
          },
          language: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256,
              },
            },
          },
          num_pages: {
            type: "long",
          },
          original_publication_date: {
            type: "date",
          },
          publication_date: {
            type: "date",
          },
          publisher: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256,
              },
            },
          },
          rating_dist: {
            enabled: false,
          },

          ratings_count: {
            type: "long",
          },
          series_id: {
            enabled: false,
          },
          series_name: {
            type: "keyword",
          },
          series_position: {
            enabled: false,
          },
          text_reviews_count: {
            type: "long",
          },
          // "title": { "type": "search_as_you_type" },
          title: {
            type: "text",
            analyzer: "autocomplete",
            search_analyzer: "standard",
          },

          work_id: {
            enabled: false,
          },
        },
      },
    })
    .then(resolveHandler);
}

function openIndex() {
  console.log("Open index -");
  return client.indices
    .open({
      index: indexName,
    })
    .then(resolveHandler);
}
function resolveHandler(body) {
  if (!body.error) {
    console.log("Success");
  } else {
    console.log("Failed");
  }
  return Promise.resolve();
}

function onError(err) {
  console.log(err);
  return Promise.reject();
}

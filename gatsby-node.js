const path = require('path');
const _ = require('lodash');
const { slugify } = require('./src/utils/utilities');
const authors = require('./src/utils/authors');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slugFromTitle = slugify(node.frontmatter.title);

    createNodeField({
      node,
      name: 'slug',
      value: slugFromTitle
    });
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const templates = {
    singlePostTemplate : path.resolve('src/templates/SinglePost.js'),
    tagsPage: path.resolve('src/templates/TagsPage.js')
  }

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  .then(res => {
    if (res.errors) return Promise.reject(res.errors);

    const posts = res.data.allMarkdownRemark.edges;

    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePostTemplate,
        context: {
          slug: node.fields.slug,
          // Find author image from authors and pass it to the singlepost template
          image: authors.find(a => a.name === node.frontmatter.author).image,
          author: authors.find(a => a.name === node.frontmatter.author)
        }
      });
    })

    // Get all tags on the website
    // ['design', 'code', 'design', ...]
    let tags = [];

    _.each(posts, edge => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    });

    // { design: 5, code: 2 }
    let tagPostCounts = {}

    tags.forEach(tag => {
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1;
    });

    tags = _.uniq(tags);

    createPage({
      path: '/tags',
      component: templates.tagsPage,
      context: {
        tags,
        tagPostCounts
      }
    });
  })
}
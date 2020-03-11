const path = require('path')
const { slugify } = require('./src/utils/utilities')
const authors = require('./src/utils/authors');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slugFromTitle = slugify(node.frontmatter.title);

    createNodeField({
      node,
      name: 'slug',
      value: slugFromTitle
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const singlePostTemplate = path.resolve('src/templates/SinglePost.js');

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
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
        component: singlePostTemplate,
        context: {
          slug: node.fields.slug,
          // Find author image from authors and pass it to the singlepost template
          image: authors.find(a => a.name === node.frontmatter.author).image,
          author: authors.find(a => a.name === node.frontmatter.author)
        }
      })
    })
  })
}
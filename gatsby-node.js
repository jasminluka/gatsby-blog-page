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
    tagsPage: path.resolve('src/templates/TagsPage.js'),
    tagPost: path.resolve('src/templates/TagPost.js'),
    postList: path.resolve('src/templates/PostList.js'),
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

    // Create Single Post page
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


    // Create TagsPage
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


    // Create Tag Post page
    tags.forEach(tag => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: templates.tagPost,
        context: {
          tag
        }
      });
    });


    // Create Post List page
    const postsPerPage = 2;
    const numberOfPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numberOfPages }).forEach((_, index) => {
      const isFirstPage = index === 0;
      const currentPage = index + 1;

      if (isFirstPage) return;

      createPage({
        path: `/page/${currentPage}`,
        component: templates.postList,
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          currentPage
        }
      });
    });
  })
}
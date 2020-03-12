import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Post from '../components/Post'
import PaginationLinks from '../components/PaginationLinks'

const PostList = ({ data, pageContext: { currentPage, numberOfPages } }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout title={`Page: ${currentPage}`}>
      {
        posts.map(({ node }) => (
          <Post
            key={node.id}
            {...node.frontmatter}
            body={node.excerpt}
            slug={node.fields.slug}
          />
        ))
      }
      <PaginationLinks currentPage={currentPage} numberOfPages={numberOfPages} />
    </Layout>
  )
}

export default PostList

export const query = graphql`
  query postList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 650, maxHeight: 370) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
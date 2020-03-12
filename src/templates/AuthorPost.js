import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Post from '../components/Post'

const AuthorPost = ({ data, pageContext: { author } }) => {
  const { totalCount } = data.allMarkdownRemark;
  const pageTitle = `${totalCount} post${totalCount === 1 ? '' : 's'} by "${author.name}"`

  return (
    <Layout
      title={pageTitle}
      postAuthor={author}
      authorImage={data.file.childImageSharp.fluid}
    >
      {
        data.allMarkdownRemark.edges.map(({ node }) => (
          <Post
            key={node.id}
            {...node.frontmatter}
            body={node.excerpt}
            slug={node.fields.slug}
          />
        ))
      }
    </Layout>
  )
}

export default AuthorPost

export const query = graphql`
  query author($authorName: String!, $authorImage: String!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { author: { eq: $authorName } } }
    ) {
      totalCount
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
    file(relativePath: { eq: $authorImage }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
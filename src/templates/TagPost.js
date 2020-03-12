import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Post from '../components/Post'

const TagPost = ({ data, pageContext: { tag } }) => {
  const { totalCount } = data.allMarkdownRemark
  const pageTitle = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`

  return (
    <Layout title={pageTitle}>
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

export default TagPost

export const query = graphql`
  query tagPost($tag: String!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC },
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
  }
`
import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from '../components/Post'

const IndexPage = ({ data }) => (
  <Layout title="Blog Page">
    <SEO title="Home" />
    <div>
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
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            author
            date(formatString: "MMM Do YYYY")
            title
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`
import React from "react"
import { useStaticQuery, graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from '../components/Post'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div>
      {
        data.allMarkdownRemark.edges.map(({ node }) => (
          <Post {...node.frontmatter} body={node.excerpt} />
        ))
      }
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            author
            date(formatString: "MMM Do YYYY")
            path
            title
          }
          excerpt
        }
      }
    }
  }
`
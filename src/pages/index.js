import React from "react"
import { graphql } from 'gatsby'
import { 
  Row,
  Col
} from 'reactstrap'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from '../components/Post'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Row>
      <Col md="8">
        <div>
          {
            data.allMarkdownRemark.edges.map(({ node }) => (
              <Post {...node.frontmatter} body={node.excerpt} />
            ))
          }
        </div>
      </Col>
      <Col md="4">
        <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,.4" }}></div>
      </Col>
    </Row>
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
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`
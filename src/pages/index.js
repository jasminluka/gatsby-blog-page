import React from "react"
import { graphql } from 'gatsby'
import { 
  Row,
  Col
} from 'reactstrap'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Home Page</h1>
    <Row>
      <Col md="8">
        <div>
          {
            data.allMarkdownRemark.edges.map(({ node }) => (
              <Post key={node.id} {...node.frontmatter} body={node.excerpt} slug={node.fields.slug} />
            ))
          }
        </div>
      </Col>
      <Col md="4">
        <Sidebar />
      </Col>
    </Row>
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
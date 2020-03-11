import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import {
  Card,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Input
} from 'reactstrap'

const query = graphql`
  query sidebarQuery {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, limit: 3) {
      edges {
        node {
          id
          frontmatter {
            author
            title
            image {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

const Sidebar = () => {
  const { allMarkdownRemark } = useStaticQuery(query);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            Newsletter
          </CardTitle>
          <Form className="text-center">
            <FormGroup>
              <Input type="email" name="email" placeholder="Your email address..." />
            </FormGroup>
            <button className="btn btn-outline-success text-uppercase">Subscribe</button>
          </Form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase">
            Advertisement
          </CardTitle>
          <img src="https://via.placeholder.com/320x200" alt="Advert" style={{ width: '100%' }} />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">Recent Posts</CardTitle>
          <div>
            {
              allMarkdownRemark.edges.map(({ node }) => (
                <Card key={node.id}>
                  <Link to={node.fields.slug}>
                    <Img className="card-image-top" fluid={node.frontmatter.image.childImageSharp.fluid} />
                  </Link>
                  <CardBody>
                    <CardTitle>
                      <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                    </CardTitle>
                  </CardBody>
                </Card>
              ))
            }
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Sidebar
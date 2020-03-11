import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import {
  Card,
  CardBody,
  CardSubtitle,
  Badge
} from 'reactstrap'

import Layout from "../components/layout"
import Seo from '../components/seo'

import { slugify } from '../utils/utilities'

const SinglePost = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter;

  // We can access page context slug with pageContext prop
  // console.log(pageContext.slug)

  return (
    <Layout title={post.title}>
      <Seo title={post.title} />
      <Card>
        <Img className="card-image-top" fluid={post.image.childImageSharp.fluid} />
        <CardBody>
          <CardSubtitle>
            <span className="text-info">{post.date}</span> by <span className="text-info">{post.author}</span>
          </CardSubtitle>
          
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          
          <ul className="post-tags">
            {
              post.tags.map(tag => (
                <li key={tag}>
                  <Link to={`/tag/${slugify(tag)}`}>
                    <Badge color="primary" className="text-uppercase">{tag}</Badge>
                  </Link>
                </li>
              ))
            }
          </ul>
        </CardBody>
      </Card>
    </Layout>
  )
}

export const query = graphql`
  query blogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      id
      html
      frontmatter {
        author
        date(formatString: "MMM Do YYYY")
        title
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default SinglePost
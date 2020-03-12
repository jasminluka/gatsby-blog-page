import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from '../components/Post'
import PaginationLinks from '../components/PaginationLinks'

const IndexPage = ({ data }) => {
  const postsPerPage = 2;
  const numberOfPages = Math.ceil(data.allMarkdownRemark.totalCount / postsPerPage);

  return (
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
        <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 2
    ) {
      totalCount
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
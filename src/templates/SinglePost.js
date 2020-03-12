import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import {
  Card,
  CardBody,
  CardSubtitle,
  Badge
} from 'reactstrap'
import { DiscussionEmbed } from 'disqus-react'

import Layout from "../components/layout"
import Seo from '../components/seo'

import { slugify } from '../utils/utilities'
// import authors from '../utils/authors'

const SinglePost = ({ data, pageContext: { slug, author } }) => {
  const post = data.markdownRemark.frontmatter;
  // const author = authors.find(a => a.name === post.author);
  const baseUrl = 'https://gatsbyblog.co.uk/';

  const disqusShortName = 'blogpage-2';
  const disqusConfig = {
    url: baseUrl + slug,
    identifier: data.markdownRemark.id,
    title: post.title,
};

  // We can access page context slug with pageContext prop
  // console.log(slug)

  return (
    <Layout
      title={post.title}
      postAuthor={author}
      authorImage={data.file.childImageSharp.fluid}
    >
      <Seo title={post.title} />
      <Card>
        <Img className="card-image-top" fluid={post.image.childImageSharp.fluid} />
        <CardBody>
          <CardSubtitle>
            <span className="text-info">{post.date}</span> by <span className="text-info"><Link to={`/author/${slugify(post.author)}`}>{post.author}</Link></span>
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
      <h1 className="text-center">
        Share this post
      </h1>
      <div className="text-center social-share-links">
        <ul>
          <li>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${baseUrl}${slug}`} target="_blank" rel="noopener noreferrer" className="facebook"><i className="fab fa-facebook-f fa-2x"></i></a>
          </li>
          <li>
            <a href={`https://www.twitter.com/share?url=${baseUrl}${slug}&text=${post.title}&via=${post.author}`} target="_blank" rel="noopener noreferrer" className="twitter"><i className="fab fa-twitter fa-2x"></i></a>
          </li>
          <li>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${baseUrl}${slug}`} target="_blank" rel="noopener noreferrer" className="linkedin"><i className="fab fa-linkedin fa-2x"></i></a>
          </li>
        </ul>
      </div>
      <DiscussionEmbed shortname={disqusShortName} config={disqusConfig} />
    </Layout>
  )
}

export const query = graphql`
  query blogPostBySlug($slug: String!, $image: String!) {
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
    file(relativePath: { eq: $image }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default SinglePost
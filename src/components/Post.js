import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Badge
} from 'reactstrap'

import { slugify } from '../utils/utilities'

const Post = ({ title, author, path, date, tags, image, body }) => {
  return (
    <Card>
      <Link to={path}>
        <Img className="card-image-top" fluid={image.childImageSharp.fluid} />
      </Link>
      <CardBody>
        <CardTitle>
          <Link to={path}>
            {title}
          </Link>
        </CardTitle>
        <CardSubtitle>
          <span className="text-info">{date}</span> by <span className="text-info">{author}</span>
        </CardSubtitle>
        <CardText>
          {body}
        </CardText>
        <ul className="post-tags">
          {
            tags.map(tag => (
              <li>
                <Link to={`/tag/${slugify(tag)}`}><Badge color="primary" className="text-uppercase">{tag}</Badge></Link>
              </li>
            ))
          }
        </ul>
        <Link to={path} className="btn btn-outline-primary float-right">Read More</Link>
      </CardBody>
    </Card>
  )
}

export default Post